// Shared constants + slide scaffolding for "Il Ritratto Consapevole" deck.
// Palette: warm cream, deep ink, sepia accent.
// Typography: Cormorant Garamond (titles/poetic), Inter (meta/body).

const TYPE_SCALE = {
  display: 120,   // huge section titles
  title: 64,      // standard slide title
  subtitle: 44,
  body: 34,
  small: 28,
  meta: 24,       // footer/page number only
};

const SPACING = {
  paddingTop: 100,
  paddingBottom: 80,
  paddingX: 120,
  titleGap: 52,
  itemGap: 28,
};

const COLORS = {
  bg: '#F2ECE0',           // warm cream
  bgAlt: '#1A1714',        // deep ink for inverted slides
  bgWarm: '#E8DFCE',       // slightly deeper cream
  ink: '#1A1714',
  inkSoft: '#4A433B',
  inkMuted: '#857C6E',
  accent: '#C79A3E',       // warm gold — matches book cover
  accentSoft: '#E3BE7A',
  hairline: '#C8BEAB',
  inverseInk: '#F2ECE0',
  inverseMuted: '#A89E8D',
};

const FONTS = {
  serif: '"Cormorant Garamond", "EB Garamond", Georgia, serif',
  sans: '"Inter", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// ---------- Building blocks ----------

const SlideFrame = ({ children, bg = COLORS.bg, ink = COLORS.ink, label, chapter, pad = true, style = {} }) => (
  <div
    data-screen-label={label}
    style={{
      width: '100%',
      height: '100%',
      background: bg,
      color: ink,
      fontFamily: FONTS.serif,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: pad
        ? `${SPACING.paddingTop}px ${SPACING.paddingX}px ${SPACING.paddingBottom}px`
        : 0,
      ...style,
    }}
  >
    {chapter && (
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: SPACING.paddingX,
          fontFamily: FONTS.sans,
          fontSize: TYPE_SCALE.meta,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: ink === COLORS.ink ? COLORS.inkMuted : COLORS.inverseMuted,
          fontWeight: 500,
        }}
      >
        {chapter}
      </div>
    )}
    {children}
  </div>
);

const Eyebrow = ({ children, color }) => (
  <div
    style={{
      fontFamily: FONTS.sans,
      fontSize: TYPE_SCALE.meta,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: color || COLORS.accent,
      fontWeight: 500,
      marginBottom: 28,
    }}
  >
    {children}
  </div>
);

const Title = ({ children, size = TYPE_SCALE.title, color, style = {} }) => (
  <h1
    style={{
      fontFamily: FONTS.serif,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.06,
      letterSpacing: '-0.01em',
      margin: 0,
      color: color || 'inherit',
      ...style,
    }}
  >
    {children}
  </h1>
);

const Body = ({ children, size = TYPE_SCALE.body, color, style = {} }) => (
  <p
    style={{
      fontFamily: FONTS.serif,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.45,
      margin: 0,
      color: color || COLORS.inkSoft,
      textWrap: 'pretty',
      ...style,
    }}
  >
    {children}
  </p>
);

const Rule = ({ color = COLORS.accent, width = 96, thick = 2, style = {} }) => (
  <div
    style={{
      width,
      height: thick,
      background: color,
      ...style,
    }}
  />
);

// Portrait / image frame. If `src` is provided, renders the image;
// otherwise falls back to a striped placeholder with `label`.
const PortraitPlaceholder = ({
  label = 'Ritratto',
  ratio = '3/4',
  src,
  alt = '',
  objectPosition = 'center top',
  caption,
  style = {},
}) => (
  <div
    style={{
      position: 'relative',
      aspectRatio: ratio,
      width: '100%',
      overflow: 'hidden',
      background: src
        ? '#0C0B0A'
        : `repeating-linear-gradient(135deg, ${COLORS.bgWarm} 0 14px, ${COLORS.hairline}33 14px 15px)`,
      border: src ? 'none' : `1px solid ${COLORS.hairline}`,
      boxShadow: src
        ? '0 30px 70px rgba(0,0,0,0.38), 0 0 0 1px rgba(242,236,224,0.05)'
        : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: COLORS.inkMuted,
      fontFamily: FONTS.mono,
      fontSize: 18,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      ...style,
    }}
  >
    {src ? (
      <>
        <img
          src={src}
          alt={alt || label}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition,
            display: 'block',
          }}
        />
        {caption && (
          <div style={{
            position: 'absolute',
            left: 18,
            bottom: 16,
            fontFamily: FONTS.mono,
            fontSize: 13,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(242,236,224,0.82)',
            mixBlendMode: 'difference',
          }}>
            {caption}
          </div>
        )}
      </>
    ) : (
      label
    )}
  </div>
);

Object.assign(window, {
  TYPE_SCALE,
  SPACING,
  COLORS,
  FONTS,
  SlideFrame,
  Eyebrow,
  Title,
  Body,
  Rule,
  PortraitPlaceholder,
});
