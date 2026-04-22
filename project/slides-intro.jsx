// Slides for "Il Ritratto Consapevole"
// Components and tokens are on window from components.jsx.

// -------------------- PART I — COVER --------------------

const SlideCover = () => (
  <SlideFrame label="01 Copertina" pad={false}>
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
      }}
    >
      <div
        style={{
          padding: `${SPACING.paddingTop}px ${SPACING.paddingX}px ${SPACING.paddingBottom}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: TYPE_SCALE.meta,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: COLORS.accent,
            fontWeight: 500,
          }}
        >
          Metodo Osmel Fabre · 2026
        </div>
        <div>
          <Title size={150} style={{ lineHeight: 0.98 }}>
            Il Ritratto<br/>
            <em style={{ fontStyle: 'italic', color: COLORS.accent }}>Consapevole</em>
          </Title>
          <Rule style={{ marginTop: 48, marginBottom: 36 }} width={140} thick={2} />
          <Body size={34} style={{ maxWidth: 640 }}>
            PNL, Prossemica e Psicologia nel Ritratto.<br/>
            Un seminario sul Metodo Osmel Fabre.
          </Body>
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: TYPE_SCALE.small,
            color: COLORS.inkSoft,
          }}
        >
          Osmel Fabre — Seminario di presentazione
        </div>
      </div>
      <div
        style={{
          background: COLORS.bgAlt,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src="assets/copertina.jpg"
          alt="Copertina del libro Il Ritratto Consapevole"
          style={{
            maxHeight: 'calc(100% - 160px)',
            maxWidth: 'calc(100% - 160px)',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.4)',
          }}
        />
      </div>
    </div>
  </SlideFrame>
);

// -------------------- WHY / OPENING --------------------

const SlideEpigraph = () => (
  <SlideFrame label="02 Epigrafe" bg={COLORS.bgAlt} ink={COLORS.inverseInk}>
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 1500,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.serif,
          fontSize: 140,
          color: COLORS.accentSoft,
          lineHeight: 0.5,
          marginBottom: 20,
        }}
      >
        «
      </div>
      <Title size={82} color={COLORS.inverseInk} style={{ fontStyle: 'italic', lineHeight: 1.15 }}>
        Non c'è nulla di più complesso<br/>
        che fotografare un essere umano.<br/>
        Non per la luce, non per la tecnica —<br/>
        ma per tutto ciò che la luce non può illuminare:<br/>
        i pensieri, le difese, i silenzi.
      </Title>
      <Rule color={COLORS.accentSoft} width={120} thick={1} style={{ marginTop: 56, marginBottom: 28 }} />
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: TYPE_SCALE.small,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: COLORS.inverseMuted,
        }}
      >
        Dalla prefazione
      </div>
    </div>
  </SlideFrame>
);

const SlideWhy = () => (
  <SlideFrame label="03 Perche questo libro">
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>Perché questo libro</Eyebrow>
      <Title size={84} style={{ maxWidth: 1400 }}>
        Viviamo in un mondo che produce miliardi di fotografie,
        eppure sempre meno <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>ritratti veri</em>.
      </Title>
      <Rule style={{ marginTop: 56, marginBottom: 40 }} />
      <Body size={34} style={{ maxWidth: 1200 }}>
        Ciò che manca non sono gli strumenti.
        È la presenza. È la relazione. È l'ascolto.
        Il Ritratto Consapevole parla di questo — e di come si può apprendere.
      </Body>
    </div>
  </SlideFrame>
);

const SlideMethod = () => {
  const cols = [
    {
      n: '01',
      title: 'PNL',
      sub: 'Programmazione Neuro-Linguistica',
      body: 'Il linguaggio, le ancore emotive, il ricalco: parole che evocano stati interiori invece di dare istruzioni.',
    },
    {
      n: '02',
      title: 'Prossemica',
      sub: 'Lo spazio tra i corpi',
      body: 'La distanza fisica come strumento narrativo. Intima, personale, sociale, pubblica: ogni distanza racconta un tipo di verità.',
    },
    {
      n: '03',
      title: 'Psicologia della luce',
      sub: 'La luce che ascolta',
      body: 'Ogni qualità di luce è un diverso modo di guardare l\'altro. Prima ascolta il soggetto, poi scegli la luce.',
    },
  ];
  return (
    <SlideFrame label="04 Il metodo">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow>Il Metodo Osmel Fabre</Eyebrow>
        <Title size={82} style={{ maxWidth: 1400 }}>
          Un solo metodo,<br/>
          <em style={{ fontStyle: 'italic', color: COLORS.accent }}>tre linguaggi</em> che si parlano.
        </Title>
        <Rule style={{ marginTop: 52, marginBottom: 56 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 56 }}>
          {cols.map((c) => (
            <div key={c.n}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.accent, letterSpacing: '0.15em', marginBottom: 16 }}>
                {c.n}
              </div>
              <div style={{ fontFamily: FONTS.serif, fontSize: 48, lineHeight: 1.05, marginBottom: 8 }}>
                {c.title}
              </div>
              <div style={{ fontFamily: FONTS.sans, fontSize: 24, letterSpacing: '0.04em', color: COLORS.inkMuted, marginBottom: 20 }}>
                {c.sub}
              </div>
              <Body size={28}>{c.body}</Body>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
};

const SlideStructure = () => {
  const parts = [
    { roman: 'I', title: 'Le Radici della Consapevolezza', desc: 'Filosofia del Metodo: cosa significa davvero fotografare un essere umano.' },
    { roman: 'II', title: 'La Prossemica', desc: 'Lo spazio fisico tra le persone come terreno di fiducia e autenticità.' },
    { roman: 'III', title: 'La PNL Applicata', desc: 'Linguaggio, ancore, ritmo: evocare stati invece di impartire istruzioni.' },
    { roman: 'IV', title: 'Fotografia come Pratica', desc: 'La fotografia come forma di meditazione, come via di conoscenza di sé.' },
  ];
  return (
    <SlideFrame label="05 Struttura del libro">
      <Eyebrow>Quattro parti, quattro livelli di consapevolezza</Eyebrow>
      <Title size={76} style={{ marginBottom: 64 }}>
        La mappa del viaggio.
      </Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px 96px' }}>
        {parts.map((p) => (
          <div key={p.roman} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, alignItems: 'start' }}>
            <div style={{ fontFamily: FONTS.serif, fontSize: 110, lineHeight: 0.9, color: COLORS.accent, fontStyle: 'italic' }}>
              {p.roman}
            </div>
            <div>
              <div style={{ fontFamily: FONTS.serif, fontSize: 44, lineHeight: 1.1, marginBottom: 12 }}>
                {p.title}
              </div>
              <Body size={26} style={{ maxWidth: 520 }}>{p.desc}</Body>
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
};

Object.assign(window, {
  SlideCover,
  SlideEpigraph,
  SlideWhy,
  SlideMethod,
  SlideStructure,
});
