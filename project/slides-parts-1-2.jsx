// Part I — Le Radici della Consapevolezza
// Part II — Prossemica

const SlidePartI = () => (
  <SlideFrame label="06 Parte I" bg={COLORS.bgAlt} ink={COLORS.inverseInk}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: TYPE_SCALE.meta,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: COLORS.accentSoft,
        }}
      >
        Parte I · Capitoli 1 – 4
      </div>
      <div>
        <div style={{ fontFamily: FONTS.serif, fontSize: 260, lineHeight: 0.85, color: COLORS.accentSoft, fontStyle: 'italic' }}>
          I.
        </div>
        <Title size={140} color={COLORS.inverseInk} style={{ marginTop: 20, lineHeight: 1.0 }}>
          Le radici<br/>della consapevolezza
        </Title>
      </div>
      <div
        style={{
          fontFamily: FONTS.serif,
          fontStyle: 'italic',
          fontSize: 34,
          color: COLORS.inverseMuted,
          maxWidth: 1100,
        }}
      >
        "Il fotografo è sempre presente nella sua immagine, visibile o no." — Susan Sontag
      </div>
    </div>
  </SlideFrame>
);

const SlideFotografoConsapevole = () => (
  <SlideFrame label="07 Il fotografo consapevole">
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 96, alignItems: 'center' }}>
      <div>
        <Eyebrow>Un atto di resistenza</Eyebrow>
        <Title size={78} style={{ marginBottom: 44 }}>
          Il fotografo consapevole restituisce
          <em style={{ color: COLORS.accent, fontStyle: 'italic' }}> tempo, silenzio e verità </em>
          all'immagine.
        </Title>
        <Rule style={{ marginBottom: 40 }} />
        <Body size={30} style={{ marginBottom: 24 }}>
          Non corre dietro allo scatto. Si ferma, respira, osserva.
          Ascolta prima di guardare. Riconosce prima di comporre.
        </Body>
        <Body size={30} style={{ fontStyle: 'italic', color: COLORS.ink }}>
          "La fotografia è la forma più silenziosa di empatia."
        </Body>
      </div>
      <PortraitPlaceholder
        src="assets/lorenzo-balducci.jpg"
        alt="Ritratto · Lorenzo Balducci"
        ratio="4/5"
        objectPosition="center 20%"
        style={{ maxHeight: 860, justifySelf: 'end' }}
      />
    </div>
  </SlideFrame>
);

const SlideTecnicaPresenza = () => {
  const rows = [
    { left: 'Tecnica', right: 'Presenza' },
    { left: 'Scatto', right: 'Incontro' },
    { left: 'Controllo', right: 'Abbandono consapevole' },
    { left: 'Cattura', right: 'Restituzione' },
    { left: 'Immagine perfetta', right: 'Essere reale' },
  ];
  return (
    <SlideFrame label="08 Dalla tecnica alla presenza">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow>Dalla tecnica alla presenza</Eyebrow>
        <Title size={76} style={{ maxWidth: 1400, marginBottom: 56 }}>
          La verità non sta nell'immagine.<br/>
          Sta <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>nell'incontro</em>.
        </Title>
        <div style={{ borderTop: `1px solid ${COLORS.hairline}` }}>
          {rows.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 1fr',
                alignItems: 'center',
                padding: '22px 0',
                borderBottom: `1px solid ${COLORS.hairline}`,
                fontFamily: FONTS.serif,
                fontSize: 40,
              }}
            >
              <div style={{ color: COLORS.inkMuted, fontStyle: 'italic' }}>{r.left}</div>
              <div style={{ textAlign: 'center', fontFamily: FONTS.mono, fontSize: 24, color: COLORS.accent, letterSpacing: '0.3em' }}>
                →
              </div>
              <div style={{ color: COLORS.ink }}>{r.right}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
};

const SlideTreRespiri = () => (
  <SlideFrame label="09 Rituale dei tre respiri">
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>Esercizio del Metodo</Eyebrow>
      <Title size={88} style={{ marginBottom: 64 }}>
        Il rituale dei <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>tre respiri</em>.
      </Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 56 }}>
        {[
          { n: 'Primo', text: 'Lascio andare ciò che non serve.' },
          { n: 'Secondo', text: 'Torno nel corpo, nel presente.' },
          { n: 'Terzo', text: 'Mi apro all\'incontro, senza aspettative.' },
        ].map((r, i) => (
            <div key={i} style={{ borderLeft: `2px solid ${COLORS.accent}`, paddingLeft: 32 }}>
              <div style={{ fontFamily: FONTS.sans, fontSize: 24, letterSpacing: '0.28em', textTransform: 'uppercase', color: COLORS.accent, marginBottom: 24 }}>
                Respiro {['Uno', 'Due', 'Tre'][i]}
              </div>
              <Body size={38} style={{ color: COLORS.ink, fontStyle: 'italic' }}>
                {r.text}
              </Body>
            </div>
        ))}
      </div>
      <div style={{ marginTop: 72, fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 32, color: COLORS.inkSoft, maxWidth: 1200 }}>
        Dopo quei tre respiri, la stanza è diversa. Non perché sia cambiata davvero —
        perché sei cambiato tu. E tutto risponde di conseguenza.
      </div>
    </div>
  </SlideFrame>
);

const SlideRelazioneImmagine = () => (
  <SlideFrame label="10 La relazione come immagine">
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 120, alignItems: 'center' }}>
      <PortraitPlaceholder
        src="assets/lavinia.jpg"
        alt="Ritratto · Lavinia"
        ratio="4/5"
        objectPosition="center 30%"
        style={{ maxHeight: 880 }}
      />
      <div>
        <Eyebrow>La relazione come immagine</Eyebrow>
        <Title size={72} style={{ marginBottom: 40 }}>
          La fotografia non è <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>l'obiettivo</em>.
          È la conseguenza.
        </Title>
        <Rule style={{ marginBottom: 36 }} />
        <Body size={30} style={{ marginBottom: 24 }}>
          La qualità del ritratto è proporzionale alla qualità della relazione
          che si stabilisce tra fotografo e soggetto.
        </Body>
        <Body size={30} style={{ fontStyle: 'italic', color: COLORS.ink }}>
          La foto è l'ombra di un incontro. La traccia che resta
          dopo un dialogo profondo.
        </Body>
      </div>
    </div>
  </SlideFrame>
);

const SlideCasoPaolo = () => (
  <SlideFrame label="11 Il caso di Paolo">
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 88, alignItems: 'center' }}>
      <div>
        <Eyebrow>Il caso di Paolo — Torino</Eyebrow>
        <Title size={52} style={{ marginBottom: 40 }}>
          Paolo dirigeva: "Guarda qui", "Alza il mento", "Sorridi appena".
          Ogni scatto vuoto, rigido, distante.
        </Title>
        <div
          style={{
            borderLeft: `4px solid ${COLORS.accent}`,
            paddingLeft: 36,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.serif,
              fontStyle: 'italic',
              fontSize: 42,
              lineHeight: 1.2,
              color: COLORS.ink,
            }}
          >
            "Paolo, smetti di dirgli cosa deve fare.<br/>
            Prova a chiedergli chi è."
          </div>
        </div>
        <Body size={26}>
          Paolo chiese: <em>"C'è un momento della tua vita in cui ti sei sentito veramente libero?"</em>
          {' '}Il ragazzo fece un respiro profondo, abbassò le spalle, sorrise.
          Non aveva cambiato luce né lente. Aveva cambiato <strong style={{ color: COLORS.accent, fontWeight: 500 }}>intenzione</strong>.
        </Body>
      </div>
      <PortraitPlaceholder
        src="assets/paolo.jpg"
        alt="Ritratto · Paolo Bernardini"
        ratio="4/5"
        objectPosition="center 20%"
        style={{ maxHeight: 880, justifySelf: 'end' }}
      />
    </div>
  </SlideFrame>
);

// -------------------- PART II --------------------

const SlidePartII = () => (
  <SlideFrame label="12 Parte II" bg={COLORS.bgAlt} ink={COLORS.inverseInk}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ fontFamily: FONTS.sans, fontSize: TYPE_SCALE.meta, letterSpacing: '0.32em', textTransform: 'uppercase', color: COLORS.accentSoft }}>
        Parte II · Capitoli 5 – 8
      </div>
      <div>
        <div style={{ fontFamily: FONTS.serif, fontSize: 260, lineHeight: 0.85, color: COLORS.accentSoft, fontStyle: 'italic' }}>II.</div>
        <Title size={140} color={COLORS.inverseInk} style={{ marginTop: 20, lineHeight: 1.0 }}>
          La prossemica.<br/>Lo spazio che parla.
        </Title>
      </div>
      <div style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 34, color: COLORS.inverseMuted, maxWidth: 1200 }}>
        "La distanza non è una linea, ma un respiro che si espande e si ritrae con te."
      </div>
    </div>
  </SlideFrame>
);

const SlideDistanze = () => {
  const zones = [
    { name: 'Intima', range: '0 – 45 cm', use: 'Vulnerabilità, intimità, fiducia totale.', w: 30 },
    { name: 'Personale', range: '45 – 120 cm', use: 'Conversazione calda, ritratto ravvicinato.', w: 55 },
    { name: 'Sociale', range: '120 – 360 cm', use: 'Relazione professionale, ritratto ambientato.', w: 75 },
    { name: 'Pubblica', range: 'oltre 360 cm', use: 'Figura intera, contesto, narrazione.', w: 100 },
  ];
  return (
    <SlideFrame label="13 Le quattro distanze">
      <Eyebrow>Le quattro distanze di Hall</Eyebrow>
      <Title size={72} style={{ marginBottom: 56, maxWidth: 1500 }}>
        Ogni distanza è una <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>diversa verità</em>.
      </Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {zones.map((z, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: FONTS.serif, fontSize: 46, lineHeight: 1 }}>{z.name}</div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.accent, marginTop: 6 }}>{z.range}</div>
            </div>
            <div>
              <div style={{ height: 14, background: COLORS.hairline, position: 'relative', marginBottom: 14 }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${z.w}%`, background: COLORS.accent }} />
              </div>
              <Body size={26} style={{ fontStyle: 'italic' }}>{z.use}</Body>
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
};

const SlideDistanzaCorpo = () => (
  <SlideFrame label="14 La distanza che il corpo sceglie">
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>Esercizio del Metodo · "La distanza giusta"</Eyebrow>
      <Title size={72} style={{ marginBottom: 48, maxWidth: 1500 }}>
        La distanza ideale non è quella "bella".
        È quella in cui l'altro si sente <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>visto e rispettato</em>.
      </Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 32 }}>
        {[
          { n: '01', t: 'Allontanati', d: 'Mettiti a 3 metri dal soggetto.' },
          { n: '02', t: 'Avvicinati piano', d: 'Passo dopo passo, con respiro calmo.' },
          { n: '03', t: 'Ascolta il confine', d: 'Una microvariazione di respiro o sguardo ti dice: fermati.' },
          { n: '04', t: 'Resta lì', d: 'Aspetta che il corpo dell\'altro si rilassi di nuovo.' },
        ].map((s) => (
          <div key={s.n} style={{ background: COLORS.bgWarm, padding: 32 }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.accent, letterSpacing: '0.15em', marginBottom: 16 }}>
              {s.n}
            </div>
            <div style={{ fontFamily: FONTS.serif, fontSize: 32, marginBottom: 14, lineHeight: 1.1 }}>
              {s.t}
            </div>
            <Body size={24}>{s.d}</Body>
          </div>
        ))}
      </div>
    </div>
  </SlideFrame>
);

const SlideVoceSilenzio = () => (
  <SlideFrame label="15 La voce il silenzio il ritmo">
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1.1fr 0.8fr', gap: 64 }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow>La voce come regia</Eyebrow>
        <Title size={46} style={{ marginBottom: 44, lineHeight: 1.15 }}>
          Un volume <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>appena più basso</em>
          {' '}del normale trasmette intimità.
        </Title>
        <Body size={22} style={{ marginBottom: 18 }}>
          Ricalca prima il ritmo del soggetto. Poi rallenta di mezzo gradino.
          Il corpo, quasi senza accorgersene, ti segue.
        </Body>
        <Body size={22}>
          Le pause sono parte della direzione. Non riempirle.
        </Body>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: `1px solid ${COLORS.hairline}`, paddingLeft: 48 }}>
        <Eyebrow>Il silenzio che guida</Eyebrow>
        <Title size={46} style={{ marginBottom: 44, lineHeight: 1.15 }}>
          Un silenzio di <em style={{ color: COLORS.accent, fontStyle: 'italic' }}>tre secondi</em>
          {' '}vale più di dieci istruzioni.
        </Title>
        <Body size={22} style={{ fontStyle: 'italic' }}>
          "Il silenzio è la più potente forma di ascolto."
        </Body>
      </div>
      <PortraitPlaceholder
        src="assets/luca.jpg"
        alt="Ritratto · Luca Pantini"
        ratio="3/4"
        objectPosition="center 25%"
        style={{ maxHeight: 860, alignSelf: 'center' }}
      />
    </div>
  </SlideFrame>
);

Object.assign(window, {
  SlidePartI,
  SlideFotografoConsapevole,
  SlideTecnicaPresenza,
  SlideTreRespiri,
  SlideRelazioneImmagine,
  SlideCasoPaolo,
  SlidePartII,
  SlideDistanze,
  SlideDistanzaCorpo,
  SlideVoceSilenzio,
});
