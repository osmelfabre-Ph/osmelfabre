-- Seed: importa i PDF dall'archivio Manus
-- Esegui questo script nel MySQL di Railway dopo la prima migrazione (db:push)

INSERT INTO `pdfs` (`id`, `title`, `description`, `pdfUrl`, `pdfKey`, `coverUrl`, `coverKey`, `previewUrl`, `previewKey`, `stripePaymentLink`, `stripeProductId`, `stripePriceId`, `price`, `isLatest`, `active`, `createdAt`) VALUES

(60003, 'Il Nuovo Mercato dell\'Immagine Maschile', 'Cosa è davvero cambiato dal 2016 al 2026',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-pdfs/1775840877856-cu4zqq741d5.pdf',
  'osmel-pdfs/1775840877856-cu4zqq741d5.pdf',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-covers/1775840878266-vaagix1f2rh.jpg',
  'osmel-covers/1775840878266-vaagix1f2rh.jpg',
  NULL, NULL,
  'https://buy.stripe.com/00weVd7v3gEugMAcoH3Je0z',
  'prod_UJLD5MwCr9Fkux', 'price_1TKiXCDlukl50UvCGqf9UHAE',
  '5', 0, 1, '2026-04-10 17:07:58'),

(60004, 'Guida al Ritratto Fotografico', 'Un piccolo e pratico manuale per iniziare a fare fotografia di ritratto, dalla storia alla pratica',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-pdfs/1775840964338-nukhmo8oc2s.pdf',
  'osmel-pdfs/1775840964338-nukhmo8oc2s.pdf',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-covers/1775840965151-djjz3aabjqq.jpg',
  'osmel-covers/1775840965151-djjz3aabjqq.jpg',
  NULL, NULL,
  'https://buy.stripe.com/7sY9AT7v31JA0NCdsL3Je0A',
  'prod_UJLFjnjhkBgSmQ', 'price_1TKiYbDlukl50UvCE2ym1LDc',
  '9', 0, 1, '2026-04-10 17:09:25'),

(90001, 'La Fotografia Non è Neutrale', 'L\'ERRORE DELLA NEUTRALITÀ • La fotografia non è solo un gesto tecnico di luce e composizione. • Solevare la macchina fotografica attiva uno stato e cambia la RELAZIONE. • Ogni scatto è un ATTO che va oltre la semplice abilità.',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-pdfs/1775948417506-veudw5iapc.pdf',
  'osmel-pdfs/1775948417506-veudw5iapc.pdf',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-covers/1775948419114-9brdlcl88a.jpg',
  'osmel-covers/1775948419114-9brdlcl88a.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-previews/1775948418915-m8ml55zzqus.pdf',
  'osmel-previews/1775948418915-m8ml55zzqus.pdf',
  'https://buy.stripe.com/9B64gzcPn2NEaoc3Sb3Je0B',
  'prod_UJo7HIT395VSF4', 'price_1TLAVjDlukl50UvCuDfCYghD',
  '5', 0, 1, '2026-04-11 23:00:19'),

(120001, 'Le 10 domande magiche', 'Nel ritratto consapevole, la tecnica fotografica è solo la metà del lavoro. L\'altra metà consiste nel creare una connessione autentica con il soggetto e guidarlo verso la sua espressione più vera.',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-pdfs/1775953764543-p30r2la2xw.pdf',
  'osmel-pdfs/1775953764543-p30r2la2xw.pdf',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-covers/1775953765305-3j24hyh9kuk.jpg',
  'osmel-covers/1775953765305-3j24hyh9kuk.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-previews/1775953765115-gmjm8u44q3.pdf',
  'osmel-previews/1775953765115-gmjm8u44q3.pdf',
  'https://buy.stripe.com/9B600j3eNdsi9k8gEX3Je0C',
  'prod_UJpZkb0HlWG111', 'price_1TLBtxDlukl50UvCo7Y646DP',
  '5', 0, 1, '2026-04-12 00:29:25'),

(120002, 'Perché gli uomini non amano essere fotografati', 'LA RESISTENZA È INFORMAZIONE • Ciò che il fotografo percepisce come "problema" è in realtà informazione.',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-pdfs/1775953841515-2zj42r13xfs.pdf',
  'osmel-pdfs/1775953841515-2zj42r13xfs.pdf',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-covers/1775953842723-jxf1uok82u.jpg',
  'osmel-covers/1775953842723-jxf1uok82u.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-previews/1775953842497-fscq9xeoziq.pdf',
  'osmel-previews/1775953842497-fscq9xeoziq.pdf',
  'https://buy.stripe.com/fZu14n3eN1JA7c088r3Je0D',
  'prod_UJpaucqhCgdEvV', 'price_1TLBvDDlukl50UvCBi7cH5XG',
  '5', 0, 1, '2026-04-12 00:30:42'),

(150002, 'IL RITUALE DEL FOTOGRAFO', 'La routine pre-shooting per diventare uno strumento limpido. Prima di parlare di luce, tecnica o composizione, c\'è una verità che pochi fotografi accettano davvero: tu sei lo strumento principale dello scatto.',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-pdfs/1776250947179-7s42sg5adsm.pdf',
  'osmel-pdfs/1776250947179-7s42sg5adsm.pdf',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-covers/1776250948234-qrsp71ritr.jpg',
  'osmel-covers/1776250948234-qrsp71ritr.jpg',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-previews/1776250947966-ehwgon0xydq.pdf',
  'osmel-previews/1776250947966-ehwgon0xydq.pdf',
  'https://buy.stripe.com/8x28wPeXv9c23ZOgEX3Je0E',
  'prod_UL7SDEBuuf5757', 'price_1TMRDEDlukl50UvCS5ZCtvBH',
  '5', 1, 1, '2026-04-15 11:02:28');

-- Reset AUTO_INCREMENT sopra l'ID più alto
ALTER TABLE `pdfs` AUTO_INCREMENT = 200001;

-- ── PURCHASES ────────────────────────────────────────────────────────────────
INSERT INTO `purchases` (`id`, `stripeSessionId`, `pdfId`, `customerEmail`, `customerName`, `downloadCount`, `createdAt`) VALUES

(30001, 'cs_live_b1dUUztQp3SgaDjrcqQdqekG3eNjRH71oaHolvZbE4XMHQGAH9UzFhRp2P', 60003, 'osmel.fabre@gmail.com', NULL, 0, '2026-04-10 17:39:56'),
(30002, 'cs_live_b1GpyXyDxB2GQSaX6r6nsjodfO3fo4WLhBi9wpKOlpKLnU3Rhtjyg8noxw', 60004, 'osmel.fabre@gmail.com', NULL, 0, '2026-04-10 17:40:37'),
(60001, 'cs_live_b1jgmEPYMNu5LYcoJmG09qI9n5cJy3kUGwIsEze38iFf4INfYfFh0WCyhm', 150002, 'iletravani@gmail.com', NULL, 1, '2026-04-16 15:55:16'),
(90001, 'cs_live_b1BrmDb44NPmT6rKNjwCzzTk0rUrsFU2DwzhEH60wLvnrHwGt2G21YEIwn', 90001, 'osmel.fabre@gmail.com', 'Osmel Fred Fabre De Leon', 0, '2026-04-17 00:18:05'),
(90002, 'cs_live_b1faDFSBzgWtqbLoF1AnNCXd5kva59fvTsNVlXhqWnfiw2Edb94ZJAzlZq', 90001, 'osmel.fabre@gmail.com', 'Osmel Fred Fabre De Leon', 0, '2026-04-17 00:21:15');

ALTER TABLE `purchases` AUTO_INCREMENT = 200001;
