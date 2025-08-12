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
    private _onDidChangeTreeData: vscode.EventEmitter<CellNode | undefined | null | void> = new vscode.EventEmitter();
    readonly onDidChangeTreeData: vscode.Event<CellNode | undefined | null | void> = this._onDidChangeTreeData.event;

    private editor: vscode.TextEditor | undefined;

    constructor() {
        this.editor = vscode.window.activeTextEditor;
        vscode.window.onDidChangeActiveTextEditor(e => {
            this.editor = e;
            this.refresh();
        });
        vscode.workspace.onDidChangeTextDocument(e => {
            if (this.editor && e.document === this.editor.document) {
                this.refresh();
            }
        });
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: CellNode): vscode.TreeItem {
        return element;
    }

    getChildren(element?: CellNode): Thenable<CellNode[]> {
        if (!this.editor) {
            return Promise.resolve([]);
        }
        const doc = this.editor.document;
        const cells: CellNode[] = [];
        const regex = /^(#\s*%%|#\s*\<codecell\>|#\s*In\[\d*?\]|#\s*In\[ \])(.*)$/;

        for (let i = 0; i < doc.lineCount; i++) {
            const lineText = doc.lineAt(i).text;
            const m = lineText.match(regex);
            if (m) {
                const label = m[2].trim() || 'Untitled Cell';  // 第2个捕获组是标题内容
                cells.push(new CellNode(label, i));
            }
        }
        return Promise.resolve(cells);
    }
}

export function activate(context: vscode.ExtensionContext) {
    const provider = new PyCellProvider();
    vscode.window.registerTreeDataProvider('pycellOutlineView', provider);

    context.subscriptions.push(vscode.commands.registerCommand('pycellOutline.revealLine', (line: number) => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        const pos = new vscode.Position(line, 0);
        editor.selection = new vscode.Selection(pos, pos);
        editor.revealRange(new vscode.Range(pos, pos));
    }));
}

