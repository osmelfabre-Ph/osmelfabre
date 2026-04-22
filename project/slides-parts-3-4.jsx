// Part III — PNL Applicata + Psicologia della luce
// Part IV — La fotografia come pratica di vita + chiusura

const SlidePartIII = () => (
  <SlideFrame label="16 Parte III" bg={COLORS.bgAlt} ink={COLORS.inverseInk}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ fontFamily: FONTS.sans, fontSize: TYPE_SCALE.meta, letterSpacing: '0.32em', textTransform: 'uppercase', color: COLORS.accentSoft }}>
        Parte III · Capitoli 9 – 12
      </div>
      <div>
        <div style={{ fontFamily: FONTS.serif, fontSize: 260, lineHeight: 0.85, color: COLORS.accentSoft, fontStyle: 'italic' }}>III.</div>
        <Title size={140} color={COLORS.inverseInk} style={{ marginTop: 20, lineHeight: 1.0 }}>
          La PNL applicata<br/>alla fotografia.
        </Title>
      </div>
      <div style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 34, color: COLORS.inverseMuted, maxWidth: 1200 }}>
        "Le parole che usiamo modellano la realtà che viviamo." — Richard Bandler
      </div>
    </div>
  </SlideFrame>
);

const SlideParolaSvela = () => {
  const pairs = [
    { bad: '"Rilassati."', good: '"Lascia che le spalle si appoggino al respiro."' },
    { bad: '"Non ti muovere."', good: '"Resta nel punto dove ti senti stabile."' },
    { bad: '"Sorridi."', good: '"Pensa a qualcosa che ti fa stare bene dentro."' },
    { bad: '"Guarda qui."', good: '"Lascia che lo sguardo arrivi dove si sente bene."' },
  ];
  return (
    <SlideFrame label="17 La parola che svela">
      <Eyebrow>Dal comando all'invito</Eyebrow>
      <Title size={64} style={{ marginBottom: 56, maxWidth: 1500 }}>
        Il corpo risponde meglio
        alle <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>sensazioni </em>
        che agli ordini.
      </Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {pairs.map((p, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 80px 1.5fr',
              alignItems: 'center',
              padding: '20px 0',
              borderTop: i === 0 ? `1px solid ${COLORS.hairline}` : 'none',
              borderBottom: `1px solid ${COLORS.hairline}`,
            }}
          >
            <div style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 34, color: COLORS.inkMuted, textDecoration: 'line-through', textDecorationColor: `${COLORS.inkMuted}55`, textDecorationThickness: 1 }}>
              {p.bad}
            </div>
            <div style={{ textAlign: 'center', fontFamily: FONTS.mono, fontSize: 24, color: COLORS.accent, letterSpacing: '0.3em' }}>→</div>
            <div style={{ fontFamily: FONTS.serif, fontSize: 36, color: COLORS.ink, lineHeight: 1.2 }}>
              {p.good}
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
};

const SlideRapport = () => (
  <SlideFrame label="18 Rapport e ricalco">
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '0.85fr 1.6fr', gap: 80, alignItems: 'center' }}>
      <PortraitPlaceholder
        src="assets/giampaolo.jpg"
        alt="Ritratto · Giampaolo Bianchi"
        ratio="3/4"
        objectPosition="center 25%"
        style={{ maxHeight: 880 }}
      />
      <div>
      <Eyebrow>Rapport · la scienza della sintonia</Eyebrow>
      <Title size={60} style={{ marginBottom: 48 }}>
        Ricalcare, poi guidare.
        Prima <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>essere con</em>,
        poi invitare altrove.
      </Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 26 }}>
        {[
          {
            t: 'Ricalco fisico',
            d: 'Postura, respirazione, micro-movimenti. Una sincronia che comunica "siamo connessi" al livello biologico più profondo.',
          },
          {
            t: 'Ricalco vocale',
            d: 'Tono, volume, velocità, pause. Calibra il tuo parlare su quello del soggetto — poi rallenta di mezzo gradino.',
          },
          {
            t: 'Ricalco linguistico',
            d: 'Le sue parole, le sue metafore, i suoi predicati sensoriali. Parla la sua lingua, anche la più piccola.',
          },
        ].map((c, i) => (
          <div key={i} style={{ borderTop: `1px solid ${COLORS.accent}`, paddingTop: 18, display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32, alignItems: 'baseline' }}>
            <div style={{ fontFamily: FONTS.serif, fontSize: 32, lineHeight: 1.1 }}>
              {c.t}
            </div>
            <Body size={22}>{c.d}</Body>
          </div>
        ))}
      </div>
      </div>
    </div>
  </SlideFrame>
);

const SlideAncore = () => (
  <SlideFrame label="19 Ancore emotive">
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 96, alignItems: 'center' }}>
      <div>
        <Eyebrow>Ancore emotive</Eyebrow>
        <Title size={72} style={{ marginBottom: 36 }}>
          Parole che <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>risvegliano</em>,
          non parole che dirigono.
        </Title>
        <Rule style={{ marginBottom: 36 }} />
        <Body size={28}>
          Non stai chiedendo niente. Stai evocando. Gli occhi si riempiono di memoria,
          non di posa. Il corpo risponde come se sapesse cosa fare da solo.
        </Body>
      </div>
      <div style={{ background: COLORS.bgWarm, padding: 56, borderLeft: `3px solid ${COLORS.accent}` }}>
        {[
          'Pensa a un luogo in cui ti senti libero.',
          'C\'è un momento che ti ha fatto ridere di cuore?',
          'Lascia che la luce ti trovi.',
          'Non fare nulla, lascia accadere.',
        ].map((q, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONTS.serif,
              fontStyle: 'italic',
              fontSize: 34,
              lineHeight: 1.35,
              color: COLORS.ink,
              paddingBottom: 24,
              marginBottom: 24,
              borderBottom: i < 3 ? `1px solid ${COLORS.hairline}` : 'none',
            }}
          >
            "{q}"
          </div>
        ))}
      </div>
    </div>
  </SlideFrame>
);

const SlideLuce = () => {
  const lights = [
    { t: 'Morbida laterale 45°', m: '«Ti vedo con tenerezza, con profondità.»' },
    { t: 'Dura, laterale stretta', m: '«Vedo il tuo carattere, la tua forza.»' },
    { t: 'Frontale diffusa', m: '«Siamo in un dialogo aperto, senza ombre.»' },
    { t: 'Dall\'alto, morbida', m: '«Contemplazione. Raccoglimento.»' },
    { t: 'Controluce tenue', m: '«Memoria. Sogno. Sospensione.»' },
  ];
  return (
    <SlideFrame label="20 Psicologia della luce">
      <Eyebrow>Psicologia della luce</Eyebrow>
      <Title size={72} style={{ marginBottom: 28, maxWidth: 1500 }}>
        Prima ascolta il soggetto.<br/>
        Poi <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>scegli la luce</em>.
      </Title>
      <Body size={28} style={{ marginBottom: 48, maxWidth: 1200 }}>
        Ogni qualità di luce è un diverso modo di guardare l'altro.
        La luce non impone un'estetica: risponde alla verità emotiva.
      </Body>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }}>
        {lights.map((l, i) => (
          <div key={i} style={{ background: COLORS.bgWarm, padding: 24, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: `radial-gradient(circle at ${['30% 30%','70% 40%','50% 30%','50% 20%','50% 80%'][i]}, #fff 0%, ${COLORS.accent} 40%, ${COLORS.bgAlt} 100%)`,
                marginBottom: 20,
              }}
            />
            <div>
              <div style={{ fontFamily: FONTS.serif, fontSize: 26, lineHeight: 1.15, marginBottom: 14 }}>
                {l.t}
              </div>
              <div style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 24, color: COLORS.inkSoft, lineHeight: 1.3 }}>
                {l.m}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
};

// -------------------- PART IV --------------------

const SlidePartIV = () => (
  <SlideFrame label="21 Parte IV" bg={COLORS.bgAlt} ink={COLORS.inverseInk}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ fontFamily: FONTS.sans, fontSize: TYPE_SCALE.meta, letterSpacing: '0.32em', textTransform: 'uppercase', color: COLORS.accentSoft }}>
        Parte IV · Capitoli 13 – 16
      </div>
      <div>
        <div style={{ fontFamily: FONTS.serif, fontSize: 260, lineHeight: 0.85, color: COLORS.accentSoft, fontStyle: 'italic' }}>IV.</div>
        <Title size={132} color={COLORS.inverseInk} style={{ marginTop: 20, lineHeight: 1.0 }}>
          La fotografia<br/>come pratica di vita.
        </Title>
      </div>
      <div style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 34, color: COLORS.inverseMuted, maxWidth: 1200 }}>
        "Non fotografiamo solo ciò che vediamo. Fotografiamo ciò che siamo."
      </div>
    </div>
  </SlideFrame>
);

const SlideMeditazione = () => (
  <SlideFrame label="22 Fotografia come meditazione">
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 96, alignItems: 'center' }}>
      <div>
        <Eyebrow>Quando fotografare diventa meditazione</Eyebrow>
        <Title size={76} style={{ marginBottom: 40 }}>
          Il tempo si dilata.<br/>
          La mente si spegne.<br/>
          <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>L'anima si accende.</em>
        </Title>
        <Rule style={{ marginBottom: 36 }} />
        <Body size={30}>
          Non pensi più alla luce, alla composizione, alle impostazioni.
          Ti muovi per istinto, come se ogni gesto fosse la continuazione del respiro.
        </Body>
      </div>
      <PortraitPlaceholder
        src="assets/gianni.jpg"
        alt="Ritratto · Gianni Rosato"
        ratio="4/5"
        objectPosition="center 15%"
        style={{ maxHeight: 880, justifySelf: 'end' }}
      />
    </div>
  </SlideFrame>
);

const SlideOcchio = () => (
  <SlideFrame label="23 L'occhio che sente">
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>Esercizio del Metodo · "L'occhio che sente"</Eyebrow>
      <Title size={72} style={{ marginBottom: 56, maxWidth: 1500 }}>
        Fotografare con presenza empatica
        e <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>intenzione consapevole</em>.
      </Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 1400 }}>
        {[
          'Siediti per un minuto in silenzio, prima di scattare.',
          'Respira e chiediti: "Perché sto per scattare questa foto?"',
          'Quando hai la risposta, non pensarci più.',
          'Guarda la persona davanti a te come un vecchio amico che non vedi da anni.',
          'Scatta solo quando senti che il tuo cuore ha detto "sì".',
        ].map((step, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'baseline', borderBottom: `1px solid ${COLORS.hairline}`, paddingBottom: 18 }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 28, color: COLORS.accent, letterSpacing: '0.1em' }}>
              0{i + 1}
            </div>
            <div style={{ fontFamily: FONTS.serif, fontSize: 32, lineHeight: 1.3, color: COLORS.ink }}>
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  </SlideFrame>
);

const SlidePerChi = () => (
  <SlideFrame label="24 Per chi e questo libro">
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>Per chi è questo libro</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <Title size={62} style={{ marginBottom: 80, lineHeight: 1.18 }}>
            Per chi ha già padronanza tecnica
            e sente che <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>manca qualcosa</em>.
          </Title>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
            {[
              'Per chi non vuole più limitarsi a scattare, ma desidera vedere davvero.',
              'Per chi ha fotografato centinaia di persone e vuole finalmente fotografare le loro anime.',
              'Per chi crede che la fotografia, prima di essere arte, sia relazione.',
            ].map((t, i) => (
              <div key={i} style={{ borderTop: `1px solid ${COLORS.ink}`, paddingTop: 22 }}>
                <div style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 26, lineHeight: 1.35 }}>
                  {t}
                </div>
              </div>
            ))}
          </div>
        </div>
        <PortraitPlaceholder
          src="assets/andrea.jpg"
          alt="Ritratto · Andrea"
          ratio="4/5"
          objectPosition="center 20%"
          style={{ maxHeight: 820, justifySelf: 'end' }}
        />
      </div>
    </div>
  </SlideFrame>
);

const SlideFine = () => (
  <SlideFrame label="25 Grazie" bg={COLORS.bgAlt} ink={COLORS.inverseInk} pad={false}>
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div
        style={{
          padding: `${SPACING.paddingTop}px ${SPACING.paddingX}px ${SPACING.paddingBottom}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ fontFamily: FONTS.sans, fontSize: TYPE_SCALE.meta, letterSpacing: '0.32em', textTransform: 'uppercase', color: COLORS.accentSoft, marginBottom: 40 }}>
          Il Ritratto Consapevole
        </div>
        <Title size={74} color={COLORS.inverseInk} style={{ maxWidth: 820, lineHeight: 1.18 }}>
          "Fotografare è dire<br/>
          all'altro: <em style={{ fontStyle: 'italic', color: COLORS.accentSoft }}>ti vedo</em>.<br/>
          Ma anche dire a sé stessi: <em style={{ fontStyle: 'italic', color: COLORS.accentSoft }}>io ci sono</em>."
        </Title>
        <Rule color={COLORS.accentSoft} width={120} thick={1} style={{ margin: '56px 0 32px' }} />
        <div style={{ fontFamily: FONTS.sans, fontSize: 28, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.inverseMuted }}>
          Grazie · Osmel Fabre
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src="assets/copertina.jpg"
          alt="Il Ritratto Consapevole"
          style={{
            maxHeight: 'calc(100% - 160px)',
            maxWidth: 'calc(100% - 160px)',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            boxShadow: '0 40px 80px rgba(0,0,0,0.65), 0 20px 40px rgba(0,0,0,0.4)',
          }}
        />
      </div>
    </div>
  </SlideFrame>
);

Object.assign(window, {
  SlidePartIII,
  SlideParolaSvela,
  SlideRapport,
  SlideAncore,
  SlideLuce,
  SlidePartIV,
  SlideMeditazione,
  SlideOcchio,
  SlidePerChi,
  SlideFine,
});
