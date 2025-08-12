# Python Cell Outline

Displays titles for Python script cells delimited by formats like `#%%`, `# <codecell>`, `# In[123]`, etc., for quick navigation in the sidebar.

## Features

- Automatically scans the currently open Python script and extracts cell titles that match the delimiters.
- Displays all cell titles in the "iPython Cells" view in the sidebar.
- Clicking a title navigates to the corresponding line of code.
- Supports various common cell comment formats found in Jupyter/IPython scripts.
- **Configurable**: Option to show/hide "first cell" and "last cell" titles for untitled cells. (This feature was recently added/discussed)

## Usage

1.  Install and enable this extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=qiujv.pycell-outline).

2.  Open a `.py` file (containing `#%%` or similar delimiters).
3.  Open the "iPython Cells" panel in the sidebar to browse the list of cells.
4.  Click a title to jump to the corresponding code location.

## Configuration

- Customize the matching regular expression via `pycellOutline.pattern` in VS Code settings.
  Default: `^(#\s*%%|#\s*<codecell>|#\s*In\[\d*?\]|#\s*In\[ \])(.*)$`
- Toggle displaying "first cell" and "last cell" titles for untitled cells using `pycellOutline.showSpecialCells` in VS Code settings.
  Default: `true`

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
- **可配置**：可通过设置选择是否为无标题单元格显示“first cell”和“last cell”标题。

## 使用方法

1.  从 [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=qiujv.pycell-outline) 安装并启用本插件。
2.  打开 `.py` 文件（带有 `#%%` 或类似分隔符）。
3.  打开侧边栏“iPython Cells”面板，浏览单元格列表。
4.  点击标题即可跳转到对应代码位置。

## 配置

- 通过 VS Code 设置中的 `pycellOutline.pattern` 自定义匹配正则表达式。
  默认：`^(#\s*%%|#\s*<codecell>|#\s*In\[\d*?\]|#\s*In\[ \])(.*)$`
- 通过 VS Code 设置中的 `pycellOutline.showSpecialCells` 控制是否为无标题单元格显示“first cell”和“last cell”标题。
  默认：`true`

## 反馈与贡献

欢迎提出问题和贡献代码！
GitHub 仓库地址：https://github.com/Qiujv/vscode-pycell-outline

## 许可协议

MIT License
