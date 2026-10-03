#!/usr/bin/env python3
"""ix5_scan.py — يحدّث media/fx/ix5_map.json للعناصر التفاعلية v5 (js/el/ix5.js) بلا شبكة ولا 404:
   files: كلّ ملفّ في media/img/v5/ و media/img/vis5/ · audio: كلّ media/audio/bariq_L1-01_v5_*.mp3
   img: خريطة يدوية {مفتاح ART: مسار} — تُحفظ كما هي (لاستبدال صورة بملفّ اسمه مختلف بلا تعديل شيفرة).
   شغّله من أيّ مكان:  python3 site_v5/media/fx/ix5_scan.py"""
import json, os
FX = os.path.dirname(os.path.abspath(__file__)); SITE = os.path.dirname(os.path.dirname(FX))
P = os.path.join(FX, 'ix5_map.json')
m = json.load(open(P, encoding='utf-8')) if os.path.exists(P) else {}
files = []
for d in ('media/img/v5', 'media/img/vis5'):
    a = os.path.join(SITE, d)
    if os.path.isdir(a):
        files += [d + '/' + f for f in sorted(os.listdir(a)) if os.path.isfile(os.path.join(a, f))]
aud = os.path.join(SITE, 'media/audio')
audio = sorted(f[:-4] for f in os.listdir(aud) if f.startswith('bariq_L1-01_v5_') and f.endswith('.mp3'))
out = {'_note': 'يولّده ix5_scan.py — img يدويّ (مفتاح ART في js/el/ix5.js ← مسار)', 'img': m.get('img', {}), 'files': files, 'audio': audio}
json.dump(out, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(files), 'files ·', len(audio), 'audio ·', len(out['img']), 'manual img keys')
