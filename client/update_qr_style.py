with open('src/App.jsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('bg-white p-2.5 rounded-2xl shadow-xl shadow-indigo-500/10 border-2 border-indigo-500/30', 'bg-black p-2 rounded-2xl shadow-2xl border-2 border-indigo-500/40')
c = c.replace('className="w-44 h-44 object-contain rounded-lg"', 'className="w-48 h-48 object-contain rounded-xl block mx-auto"')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated App.jsx successfully!')
