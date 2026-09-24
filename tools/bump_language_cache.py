from pathlib import Path
p=Path('/home/ubuntu/portif-lio/index.html')
s=p.read_text().replace('script.js?v=lang-03','script.js?v=lang-04')
p.write_text(s)
print('cache bumped')
