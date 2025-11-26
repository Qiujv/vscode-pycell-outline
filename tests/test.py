# %% Test Case 1: Cell with explicit title
print('This cell has a title')

# %%
# This is a comment - should show with 'show next comment'
a = 1

# %%
print('Not a comment')  # Should show with 'show next line' only

# %% Test Case 2: Another titled cell
x = 10
y = 20

# %%
# Multiple
# comments
result = x + y

# %%

print('Empty line above - may show as last cell')

# %% Test Case 3: Markdown style
def calculate():
    return 42

# %% Test Case 4: IPython style
class MyClass:
    pass

# %%
# Final comment cell
print('Testing complete')

