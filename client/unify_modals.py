with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any setIsCatalogOpen(true) with setMainView('leetcode')
content = content.replace("setIsCatalogOpen(true)", "setMainView('leetcode')")

# In renderCompanyCatalogModal, return null to completely prevent double screen
content = content.replace(
    "function renderCompanyCatalogModal() {",
    "function renderCompanyCatalogModal() {\n    return null;\n    /* eslint-disable-next-line */"
)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('App.jsx unified - double screen eradicated!')
