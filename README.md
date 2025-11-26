# Python Cell Outline

Displays titles for Python script cells delimited by formats like `#%%`, `# <codecell>`, `# In[123]`, etc., for quick navigation in the sidebar.

## Features

- Automatically scans the currently open Python script and extracts cell titles that match the delimiters.
- Displays all cell titles in the "iPython Cells" view in the sidebar.
- Clicking a title navigates to the corresponding line of code.
- Supports various common cell comment formats found in Jupyter/IPython scripts.
- **Flexible handling of untitled cells**: Choose to skip them, show the next comment line, or show any next line content.
- **Configurable**: Customize cell pattern matching and display behavior.

## Usage

1.  Install and enable this extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=qiujv.pycell-outline).

2.  Open a `.py` file (containing `#%%` or similar delimiters).
3.  Open the "iPython Cells" panel in the sidebar to browse the list of cells.
4.  Click a title to jump to the corresponding code location.

## Configuration

- **`pycellOutline.pattern`**: Customize the matching regular expression.
  - Default: `^(#\s*%%|#\s*<codecell>|#\s*In\[\d*?\]|#\s*In\[ \])(.*)$`
  
- **`pycellOutline.cellWithoutTitle`**: How to handle cells without explicit titles.
  - `"skip"`: Skip cells without titles (but still show first/last cell if `showSpecialCells` is enabled)
  - `"show next comment"` (default): Show the next line if it starts with `#`
  - `"show next line"`: Show the next line content regardless of whether it's a comment
  
- **`pycellOutline.showSpecialCells`**: Toggle displaying "first cell" and "last cell" labels for untitled cells when other methods fail.
  - Default: `true`

## Feedback and Contributions

Feel free to raise issues and contribute code!
GitHub Repository: https://github.com/Qiujv/vscode-pycell-outline

## License

MIT License

---

# Python 单元格大纲

显示带有 `#%%`、`# <codecell>`、`# In[123]` 等格式分隔的 Python 脚本单元格标题，方便在侧边栏快速跳转。

## 功能

- 自动扫描当前打开的 Python 脚本，提取符合分隔符的单元格标题。
- 在侧边栏“iPython Cells”视图中展示所有单元格标题。
- 点击标题即可跳转到对应代码行。
- 支持 Jupyter/IPython 脚本中常见的多种单元格注释格式。
- **灵活处理无标题单元格**：可选择跳过、显示下一行注释或显示下一行任意内容。
- **可配置**：自定义单元格模式匹配和显示行为。

## 使用方法

1.  从 [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=qiujv.pycell-outline) 安装并启用本插件。
2.  打开 `.py` 文件（带有 `#%%` 或类似分隔符）。
3.  打开侧边栏“iPython Cells”面板，浏览单元格列表。
4.  点击标题即可跳转到对应代码位置。

## 配置

- **`pycellOutline.pattern`**: 自定义匹配正则表达式。
  - 默认：`^(#\s*%%|#\s*<codecell>|#\s*In\[\d*?\]|#\s*In\[ \])(.*)$`
  
- **`pycellOutline.cellWithoutTitle`**: 如何处理没有显式标题的单元格。
  - `"skip"`: 跳过无标题单元格（但如果启用 `showSpecialCells` 仍会显示首/尾单元格）
  - `"show next comment"` (默认): 如果下一行以 `#` 开头，则显示下一行内容
  - `"show next line"`: 显示下一行内容，无论是否为注释
  
- **`pycellOutline.showSpecialCells`**: 当其他方法失败时，是否为无标题单元格显示 "first cell" 和 "last cell" 标签。
  - 默认：`true`

## 反馈与贡献

欢迎提出问题和贡献代码！
GitHub 仓库地址：https://github.com/Qiujv/vscode-pycell-outline

## 许可协议

MIT License
