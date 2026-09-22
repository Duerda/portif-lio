from pathlib import Path
p = Path('/home/ubuntu/portif-lio/index.html')
s = p.read_text()
share = 'https://manus.im/share/file/e5f5e8cd-4b84-4201-8ea0-7e54975149cd'
s = s.replace('assets/curriculo-eduarda-teixeira.pdf', share)
p.write_text(s)
print('resume links updated to shared document')
