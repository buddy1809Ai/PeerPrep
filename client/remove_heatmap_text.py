with open('src/App.jsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('Explore Bank & Heatmap →', 'Explore Question Bank →')
c = c.replace('Practice 470-Company LeetCode Questions & Heatmap →', 'Practice 470-Company LeetCode Questions →')
c = c.replace('LeetCode Hub & Heatmap', '470-Company LeetCode Bank')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(c)

print('Removed Heatmap text from buttons in App.jsx successfully!')
