#!/usr/bin/env python3
"""
Optimize images for screen resolution, then rebuild the standalone HTML.
Portrait slots are at most ~860px tall at 1920x1080 design size.
Target: max 1200px on longest side, JPEG quality 82.
"""
import base64
import io
import os
import re
from PIL import Image

PROJECT_DIR = '/home/claude/repo/project'
OUTPUT_PATH = '/home/claude/repo/Il Ritratto Consapevole.html'
MAX_PX = 1400   # max dimension in pixels (generous for retina)
QUALITY = 82


def optimize_image(fpath):
    with open(fpath, 'rb') as f:
        raw = f.read()
    img = Image.open(io.BytesIO(raw)).convert('RGB')
    w, h = img.size
    ratio = min(MAX_PX / w, MAX_PX / h, 1.0)  # never upscale
    if ratio < 1.0:
        img = img.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format='JPEG', quality=QUALITY, optimize=True)
    optimized = buf.getvalue()
    pct = 100 * len(optimized) / len(raw)
    print(f'  {os.path.basename(fpath)}: {len(raw)/1024:.0f} KB → {len(optimized)/1024:.0f} KB  ({pct:.0f}%)')
    return optimized


def load_images():
    images = {}
    assets_dir = os.path.join(PROJECT_DIR, 'assets')
    for fname in sorted(os.listdir(assets_dir)):
        ext = fname.rsplit('.', 1)[-1].lower() if '.' in fname else ''
        if ext not in ('jpg', 'jpeg', 'png'):
            continue
        fpath = os.path.join(assets_dir, fname)
        data = optimize_image(fpath)
        b64 = base64.b64encode(data).decode('ascii')
        images[fname] = f'data:image/jpeg;base64,{b64}'
    return images


def read_file(name):
    with open(os.path.join(PROJECT_DIR, name), encoding='utf-8') as f:
        return f.read()


def replace_assets(code, images):
    def replacer(m):
        q, fname = m.group(1), m.group(2)
        if fname in images:
            return f'{q}{images[fname]}{q}'
        print(f'  WARNING: asset not found: {fname}')
        return m.group(0)
    return re.sub(r'(["\'])assets/([^"\']+)\1', replacer, code)


def add_deck_cover_attr(code, copertina_url):
    target = f'src="{copertina_url}"'
    replacement = f'src="{copertina_url}" data-deck-cover="1"'
    return code.replace(target, replacement)


def build():
    print('Optimizing images…')
    images = load_images()

    print('\nInlining source files…')
    deck_stage   = read_file('deck-stage.js')
    components   = replace_assets(read_file('components.jsx'),         images)
    slides_intro = replace_assets(read_file('slides-intro.jsx'),       images)
    slides_1_2   = replace_assets(read_file('slides-parts-1-2.jsx'),  images)
    slides_3_4   = replace_assets(read_file('slides-parts-3-4.jsx'),  images)

    copertina_url = images.get('copertina.jpg', '')
    if copertina_url:
        slides_intro = add_deck_cover_attr(slides_intro, copertina_url)
        slides_3_4   = add_deck_cover_attr(slides_3_4,   copertina_url)

    with open(os.path.join(PROJECT_DIR, 'Il Ritratto Consapevole.html'), encoding='utf-8') as f:
        html = f.read()

    html = html.replace('<script src="deck-stage.js"></script>',
                        f'<script>\n{deck_stage}\n</script>')

    for fname, code in [
        ('components.jsx',       components),
        ('slides-intro.jsx',     slides_intro),
        ('slides-parts-1-2.jsx', slides_1_2),
        ('slides-parts-3-4.jsx', slides_3_4),
    ]:
        old = f'<script type="text/babel" src="{fname}"></script>'
        html = html.replace(old, f'<script type="text/babel">\n{code}\n</script>')

    html = html.replace('img[src*="copertina"]', '[data-deck-cover]')
    return html


output = build()
with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    f.write(output)

size_mb = len(output.encode('utf-8')) / 1_048_576
print(f'\nWrote {size_mb:.1f} MB → {OUTPUT_PATH}')
