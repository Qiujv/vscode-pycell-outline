import * as vscode from 'vscode';

class CellNode extends vscode.TreeItem {
    line: number;
    constructor(label: string, line: number) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.line = line;
        this.command = {
            command: 'pycellOutline.revealLine',
            title: 'Reveal Line',
            arguments: [line]
        };
    }
}

class PyCellProvider implements vscode.TreeDataProvider<CellNode> {
    private _onDidChangeTreeData = new vscode.EventEmitter<CellNode | undefined | null | void>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    private editor: vscode.TextEditor | undefined;
    private refreshTimeout: NodeJS.Timeout | undefined;

    constructor() {
        this.editor = vscode.window.activeTextEditor;
        vscode.window.onDidChangeActiveTextEditor(editor => {
            this.editor = editor;
            this.refresh();
        });

        vscode.workspace.onDidChangeTextDocument(e => {
            if (this.editor && e.document === this.editor.document) {
                this.debounceRefresh();
            }
        });

        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('pycellOutline.showSpecialCells') || e.affectsConfiguration('pycellOutline.pattern')) {
                this.refresh();
            }
        });
    }

    refresh(): void {
        if (this.refreshTimeout) {
            clearTimeout(this.refreshTimeout);
            this.refreshTimeout = undefined;
        }
        this._onDidChangeTreeData.fire();
    }

    debounceRefresh(): void {
        if (this.refreshTimeout) {
            clearTimeout(this.refreshTimeout);
        }
        // Trigger refresh 200 milliseconds later. The timer is reset if called again within this period.
        this.refreshTimeout = setTimeout(() => {
            this._onDidChangeTreeData.fire();
            this.refreshTimeout = undefined;
        }, 200);
    }

    getTreeItem(element: CellNode): vscode.TreeItem {
        return element;
    }

    getChildren(): Thenable<CellNode[]> {
        if (!this.editor) {
            return Promise.resolve([]);
        }

        const doc = this.editor.document;
        const rawCells: { line: number; label: string }[] = [];

        const config = vscode.workspace.getConfiguration('pycellOutline');
        const showSpecialCells = config.get<boolean>('showSpecialCells', true);
        const userPattern = config.get<string>('pattern');

        let regex: RegExp;
        try {
            regex = new RegExp(userPattern!);
        } catch (e: any) {
            vscode.window.showErrorMessage(`Invalid regex pattern: ${userPattern}. Using default pattern.`);
            regex = /^(#\s*%%|#\s*\<codecell\>|#\s*In\[\d*?\]|#\s*In\[ \])(.*)$/;
        }

        for (let i = 0; i < doc.lineCount; i++) {
            const lineText = doc.lineAt(i).text;
            const m = lineText.match(regex);
            if (m) {
                rawCells.push({ line: i, label: m[2].trim() });
            }
        }

        const finalCells: CellNode[] = [];

        for (let i = 0; i < rawCells.length; i++) {
            let currentLabel = rawCells[i].label;
            const currentLine = rawCells[i].line;

            // If cell comes without title, add special label if enabled.
            if (!currentLabel) {
                if (showSpecialCells) {
                    if (i === 0) {
                        currentLabel = 'first cell';
                    } else if (i === rawCells.length - 1) {
                        currentLabel = 'last cell';
                    } else {
                        continue;
                    }
                } else {
                    continue;  // Otherwise skip the cell.
                }
            }
            finalCells.push(new CellNode(currentLabel, currentLine));
        }

        return Promise.resolve(finalCells);
    }
}

export function activate(context: vscode.ExtensionContext) {
    const provider = new PyCellProvider();
    vscode.window.registerTreeDataProvider('pycellOutlineView', provider);

    context.subscriptions.push(
        vscode.commands.registerCommand('pycellOutline.revealLine', (line: number) => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            const pos = new vscode.Position(line, 0);
            editor.selection = new vscode.Selection(pos, pos);
            editor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.AtTop);
        })
    );
}

