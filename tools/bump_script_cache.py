from pathlib import Path
p = Path('/home/ubuntu/portif-lio/index.html')
s = p.read_text()
s = s.replace('<script src="script.js"></script>', '<script src="script.js?v=portfolio-final-04"></script>')
p.write_text(s)
print('script cache bumped')
