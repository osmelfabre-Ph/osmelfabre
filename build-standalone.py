#!/usr/bin/env python3
"""
Build a fully standalone HTML from the Il Ritratto Consapevole project.
- Inlines deck-stage.js, components.jsx and all slides-*.jsx
- Embeds every image in assets/ as a base64 data URL
- Fixes the cover-image CSS/JS selector (src*=copertina → data-deck-cover attr)
"""
import base64
import os
import re

PROJECT_DIR = '/home/claude/repo/project'
OUTPUT_PATH = '/home/claude/repo/Il Ritratto Consapevole.html'


def load_images():
    images = {}
    assets_dir = os.path.join(PROJECT_DIR, 'assets')
    for fname in sorted(os.listdir(assets_dir)):
        ext = fname.rsplit('.', 1)[-1].lower() if '.' in fname else ''
        if ext not in ('jpg', 'jpeg', 'png', 'gif', 'webp'):
            continue
        with open(os.path.join(assets_dir, fname), 'rb') as f:
            data = f.read()
        mime = 'image/jpeg' if ext in ('jpg', 'jpeg') else f'image/{ext}'
        b64 = base64.b64encode(data).decode('ascii')
        images[fname] = f'data:{mime};base64,{b64}'
        print(f'  {fname}: {len(data):,} bytes  →  data URL {len(images[fname]):,} chars')
    return images


def read_file(name):
    with open(os.path.join(PROJECT_DIR, name), encoding='utf-8') as f:
        return f.read()


def replace_assets(code, images):
    """Replace "assets/filename" string literals with base64 data URLs."""
    def replacer(m):
        q, fname = m.group(1), m.group(2)
        if fname in images:
            return f'{q}{images[fname]}{q}'
        print(f'  WARNING: asset not found: {fname}')
        return m.group(0)
    return re.sub(r'(["\'])assets/([^"\']+)\1', replacer, code)


def add_deck_cover_attr(code, copertina_data_url):
    """Add data-deck-cover attribute next to src=<copertina data URL> in JSX."""
    target = f'src="{copertina_data_url}"'
    replacement = f'src="{copertina_data_url}" data-deck-cover="1"'
    return code.replace(target, replacement)


def build():
    print('Loading images…')
    images = load_images()

    print('\nReading source files…')
    deck_stage   = read_file('deck-stage.js')
    components   = replace_assets(read_file('components.jsx'),          images)
    slides_intro = replace_assets(read_file('slides-intro.jsx'),        images)
    slides_1_2   = replace_assets(read_file('slides-parts-1-2.jsx'),   images)
    slides_3_4   = replace_assets(read_file('slides-parts-3-4.jsx'),   images)

    # Tag cover images so the Tweaks selector can find them after src becomes a data URL.
    copertina_url = images.get('copertina.jpg', '')
    if copertina_url:
        slides_intro = add_deck_cover_attr(slides_intro, copertina_url)
        slides_3_4   = add_deck_cover_attr(slides_3_4,   copertina_url)

    print('\nBuilding standalone HTML…')
    with open(os.path.join(PROJECT_DIR, 'Il Ritratto Consapevole.html'), encoding='utf-8') as f:
        html = f.read()

    # ── 1. Inline deck-stage.js ──────────────────────────────────────────────
    html = html.replace(
        '<script src="deck-stage.js"></script>',
        f'<script>\n{deck_stage}\n</script>'
    )

    # ── 2. Inline every JSX file ─────────────────────────────────────────────
    replacements = [
        ('components.jsx',        components),
        ('slides-intro.jsx',      slides_intro),
        ('slides-parts-1-2.jsx',  slides_1_2),
        ('slides-parts-3-4.jsx',  slides_3_4),
    ]
    for fname, code in replacements:
        old = f'<script type="text/babel" src="{fname}"></script>'
        new = f'<script type="text/babel">\n{code}\n</script>'
        if old not in html:
            print(f'  WARNING: could not find script tag for {fname}')
        html = html.replace(old, new)

    # ── 3. Fix cover-image selectors (src*=copertina → data-deck-cover attr) ─
    html = html.replace('img[src*="copertina"]', '[data-deck-cover]')

    return html


output = build()
with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    f.write(output)

size_mb = len(output.encode('utf-8')) / 1_048_576
print(f'\nWrote {len(output):,} chars  ({size_mb:.1f} MB)  →  {OUTPUT_PATH}')
