from pathlib import Path
p = Path('/home/ubuntu/portif-lio/script.js')
s = p.read_text()
s = s.replace("setText('.game-stats span:first-child'", "set('.game-stats span:first-child'")
s = s.replace("setText('.game-stats span:nth-child(2)'", "set('.game-stats span:nth-child(2)'")
p.write_text(s)
print('language game bindings fixed')
