// /**
//  * Tetto94 — Services + Locations Data Layer
//  * Single source of truth for all programmatic SEO pages.
//  * All service pages, location pages, sitemap, structured data
//  * and internal links are generated from this config.
//  */

// export interface ServicePriceRow {
//   tipo: string
//   prezzoMin: string
//   prezzoMax: string
//   note: string
// }

// export interface ServiceConfig {
//   slug: string
//   name: string                    // "Rifacimento Tetto"
//   nameFull: string                // "Rifacimento Completo del Tetto"
//   headline: string                // Hero H1 prefix
//   subheadline: string             // Hero subtitle
//   description: string             // Short meta description base (used for metadata)
//   metaTitle: string               // Full SEO title tag
//   metaDescription: string         // Full SEO meta description
//   longDescription: string         // Paragraph for page body
//   icon: string                    // Lucide icon name
//   heroKeyword: string             // Main keyword for H1
//   faqItems: { q: string; a: string }[]
//   benefits: string[]
//   steps: { title: string; desc: string }[]
//   priceFrom: string               // current price "6.500€" — empty string = no price shown
//   oldPrice?: string               // strikethrough price "9.500€" — optional
//   checklistItems?: string[]       // package checklist — shown only when present
//   prezziTable?: ServicePriceRow[] // "Quanto costa?" table shown on service page
//   doveOperiamoIntro?: string      // Intro sentence for "Dove Operiamo" section
// }

// export interface LocationConfig {
//   slug: string                    // "venezia"
//   name: string                    // "Venezia"
//   province: string                // "VE"
//   region: string                  // "Veneto"
//   lat: number
//   lng: number
//   population: string              // "250.000"
//   description: string             // City-specific sentence for SEO
//   nearbyCity?: string             // "Mestre, Marghera"
// }

// /* ─────────────────────────────────────────────────────────────
//    SERVICES — 3 core offerings
// ───────────────────────────────────────────────────────────── */
// export const SERVICES: ServiceConfig[] = [
//   {
//     slug: 'rifacimento-tetto',
//     name: 'Rifacimento Tetto',
//     nameFull: 'Rifacimento Completo del Tetto',
//     headline: 'RIFACIMENTO TETTO',
//     subheadline: 'Copertura nuova, materiali certificati, garanzia scritta 10 anni.',
//     description:
//       'Rifacimento completo del tetto con materiali certificati CE di prima scelta. Garanzia scritta 10 anni. Preventivo gratuito entro 24 ore.',
//     metaTitle: 'Rifacimento Tetto Veneto | Prezzi, Garanzia 10 Anni — Tetto94 dal 1994',
//     metaDescription:
//       'Rifacimento tetto completo in Veneto a partire da 6.500€. Tegole certificate CE, smaltimento incluso, garanzia scritta 10 anni. Preventivo gratuito entro 24 ore con sopralluogo drone. Tetto94 dal 1994.',
//     doveOperiamoIntro:
//       'Rifacimento tetto in tutto il Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Clicca sulla tua città per vedere prezzi, materiali e bonus fiscali disponibili nella tua zona.',
//     prezziTable: [
//       { tipo: 'Rifacimento completo tegole/coppi', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
//       { tipo: 'Rifacimento con coibentazione', prezzoMin: '€ 9.500', prezzoMax: '€ 22.000', note: 'Isolamento termico + cappotto tetto' },
//       { tipo: 'Impermeabilizzazione guaine', prezzoMin: '€ 2.800', prezzoMax: '€ 7.500', note: '35€–95€ al mq' },
//       { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
//       { tipo: 'Riparazione urgente infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Entro 24 ore, drone incluso' },
//     ],
//     longDescription:
//       "Il rifacimento completo del tetto è l'intervento più importante per la longevità della tua abitazione. Tetto94 utilizza esclusivamente materiali certificati CE — tegole in cotto, guaine bituminose e polimeriche, membrane traspiranti — posati da artigiani con oltre 32 anni di esperienza. Ogni rifacimento include ispezione drone pre-intervento, smaltimento del materiale rimosso, posa in opera certificata e garanzia scritta 10 anni.",
//     icon: 'Layers',
//     heroKeyword: 'RIFACIMENTO',
//     faqItems: [
//       {
//         q: 'Quanto dura un rifacimento completo del tetto?',
//         a: 'In media 3–7 giorni lavorativi per un tetto residenziale standard, in base alle dimensioni e alla complessità della copertura.',
//       },
//       {
//         q: 'Cosa include il rifacimento completo del tetto?',
//         a: "Il servizio include rimozione e smaltimento della copertura esistente, ispezione della struttura portante, posa di manto traspirante, listelli, tegole certificate e collaudo finale con garanzia scritta 10 anni.",
//       },
//       {
//         q: 'Quanto costa il rifacimento del tetto?',
//         a: "Il costo dipende da superficie, tipo di materiale e accessibilità. Offriamo pacchetti a partire da 6.500€. Preventivo gratuito entro 24 ore.",
//       },
//       {
//         q: 'Serve il permesso edilizio per rifare il tetto?',
//         a: "In molti casi è sufficiente la CILA (Comunicazione Inizio Lavori Asseverata). Vi assistiamo nella gestione burocratica completa.",
//       },
//       {
//         q: 'È possibile rifare il tetto senza ponteggi?',
//         a: "Sì. Tetto94 opera esclusivamente con sistemi di accesso su fune (rope access) certificati, eliminando la necessità del ponteggio tradizionale. Il risparmio può arrivare fino all'80% del costo del ponteggio, con tempi di intervento dimezzati.",
//       },
//       {
//         q: 'Quali bonus fiscali si applicano al rifacimento tetto nel 2025?',
//         a: "Nel 2025 è possibile accedere al Bonus Ristrutturazione 50% (fino a 96.000€ in 10 anni) e all'Ecobonus 65% se l'intervento include coibentazione. Tetto94 vi assiste nella documentazione per il bonus.",
//       },
//       {
//         q: 'Come si sceglie il materiale giusto per il rifacimento?',
//         a: "La scelta dipende dal tipo di edificio, dal clima della zona e dai vincoli paesaggistici. Il nostro tecnico valuta gratuitamente con drone la situazione e propone i materiali certificati CE più adatti — tegole in laterizio, coppi, lastre in ardesia o sistemi misti.",
//       },
//     ],
//     benefits: [
//       'Garanzia scritta 10 anni su materiali e manodopera',
//       'Materiali certificati CE di prima scelta',
//       'Smaltimento incluso della copertura rimossa',
//       'Ispezione drone gratuita pre-intervento',
//       'Assistenza burocratica per permessi',
//       'Intervento senza ponteggi (risparmio fino all\'80%)',
//     ],
//     steps: [
//       { title: 'Ispezione Drone Gratuita', desc: 'Sopralluogo con drone per rilievo completo dello stato della copertura. Report fotografico incluso.' },
//       { title: 'Preventivo Trasparente', desc: 'Preventivo dettagliato entro 24 ore, senza costi nascosti.' },
//       { title: 'Rimozione e Smaltimento', desc: 'Rimozione della copertura esistente e smaltimento certificato.' },
//       { title: 'Posa e Collaudo', desc: 'Installazione con materiali certificati e collaudo finale garantito.' },
//     ],
//     priceFrom: '6.500€',
//     oldPrice: '9.500€',
//     checklistItems: [
//       'Risanamento professionale',
//       'Linea vita provvisoria compresa nel pacchetto',
//       'Sostituzione di tegole e coppi rotti',
//       'Fissaggio 1 ad 1 di tutte le tegole/coppi',
//       'Impermeabilizzazione lucernari',
//       'Impermeabilizzazione canne fumarie',
//       'Pulizia e sigillatura grondaie e canali',
//       'Certificato di garanzia',
//       'POS (piano operativo di sicurezza)',
//       'Pulizia del cantiere a fine lavoro e smaltimento materiali di risulta',
//     ],
//   },
//   {
//     slug: 'impermeabilizzazione-tetto',
//     name: 'Impermeabilizzazione Tetto',
//     nameFull: 'Impermeabilizzazione e Guaine per Tetto',
//     headline: 'IMPERMEABILIZZAZIONE',
//     subheadline: 'Protezione totale contro infiltrazioni. Guaine certificate, garanzia scritta 10 anni.',
//     description:
//       "Impermeabilizzazione tetto con guaine e membrane certificate. Stop definitivo alle infiltrazioni d'acqua. Garanzia scritta 10 anni.",
//     metaTitle: "Impermeabilizzazione Tetto Veneto | Stop Infiltrazioni, Garanzia 10 Anni — Tetto94",
//     metaDescription:
//       "Impermeabilizzazione tetto professionale in Veneto con guaine bituminose, EPDM e membrane polimeriche certificate CE. Stop definitivo alle infiltrazioni. Garanzia scritta 10 anni. Preventivo gratuito entro 24 ore.",
//     doveOperiamoIntro:
//       "Impermeabilizzazione tetto in tutto il Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Clicca sulla tua città per un preventivo personalizzato con i prezzi al mq della tua zona.",
//     prezziTable: [
//       { tipo: 'Guaina bituminosa APP/SBS', prezzoMin: '€ 35/mq', prezzoMax: '€ 65/mq', note: 'Posa inclusa, primer incluso' },
//       { tipo: 'Membrana EPDM', prezzoMin: '€ 55/mq', prezzoMax: '€ 95/mq', note: 'Durata 25+ anni, ideale tetti piani' },
//       { tipo: 'Sistema poliuretanico liquido', prezzoMin: '€ 45/mq', prezzoMax: '€ 85/mq', note: 'Applicabile senza smontare il tetto' },
//       { tipo: 'Impermeabilizzazione terrazza', prezzoMin: '€ 2.500', prezzoMax: '€ 8.000', note: 'Incluso collaudo idraulico' },
//       { tipo: 'Risanamento grondaie incluso', prezzoMin: '€ 300', prezzoMax: '€ 900', note: 'A intervento, grondaie standard' },
//     ],
//     longDescription:
//       "L'impermeabilizzazione del tetto è la soluzione definitiva contro infiltrazioni, umidità e danni strutturali causati dall'acqua. Tetto94 applica guaine bituminose, polimeriche e membrane traspiranti di ultima generazione, certificate CE, con garanzia scritta 10 anni. Il trattamento include pulizia completa, applicazione di primer specifico, posa in opera con risvolti su tutti i punti critici (camini, abbaini, gronde) e collaudo idraulico finale.",
//     icon: 'Droplets',
//     heroKeyword: 'IMPERMEABILIZZAZIONE',
//     faqItems: [
//       {
//         q: "Quanto dura l'impermeabilizzazione di un tetto?",
//         a: "Un'impermeabilizzazione professionale con guaine di qualità dura 15–25 anni. Con la nostra garanzia scritta 10 anni siete coperti per un decennio.",
//       },
//       {
//         q: "Che tipo di guaine utilizzate per l'impermeabilizzazione?",
//         a: 'Utilizziamo guaine bituminose APP e SBS, membrane EPDM e sistemi poliuretanici, tutti certificati CE. La scelta dipende dal tipo di copertura e dalle condizioni climatiche.',
//       },
//       {
//         q: "È possibile impermeabilizzare senza smontare il tetto?",
//         a: "In molti casi sì, applicando guaine liquide o membrane a freddo direttamente sulla copertura esistente. Il drone ci aiuta a valutare lo stato prima di decidere.",
//       },
//       {
//         q: "Quanto costa l'impermeabilizzazione del tetto?",
//         a: 'I costi variano in base alla superficie e al sistema scelto. Preventivo gratuito entro 24 ore con ispezione drone inclusa.',
//       },
//       {
//         q: "Qual è la differenza tra guaina bituminosa e membrana EPDM?",
//         a: "La guaina bituminosa (APP o SBS) è la soluzione più diffusa e conveniente, ideale per tetti a falda e terrazze residenziali. La membrana EPDM ha durata superiore (25+ anni), maggiore flessibilità e resistenza agli UV — è preferita per tetti piani e ambienti con forti escursioni termiche come il clima alpino.",
//       },
//       {
//         q: "L'impermeabilizzazione si può fare senza rimuovere il vecchio manto?",
//         a: "In molti casi sì. Con il sistema poliuretanico liquido o le membrane autoadesive è possibile impermeabilizzare sopra il manto esistente, evitando i costi di rimozione. Il drone verifica prima se il substrato è idoneo a ricevere il nuovo trattamento.",
//       },
//       {
//         q: "Come si riconosce un tetto non impermeabilizzato correttamente?",
//         a: "I segnali principali sono: macchie di umidità sul soffitto interno, muffa sul perimetro delle pareti, rigonfiamenti sulla guaina, danni alle tegole vicino ai comignoli o agli abbaini. Tetto94 diagnostica il problema esatto con drone e termocamera prima di qualsiasi intervento.",
//       },
//     ],
//     benefits: [
//       'Stop definitivo alle infiltrazioni d\'acqua',
//       'Guaine e membrane certificate CE',
//       'Applicazione su tutti i punti critici',
//       'Collaudo idraulico finale incluso',
//       'Garanzia scritta 10 anni',
//       'Ispezione drone gratuita pre-intervento',
//     ],
//     steps: [
//       { title: 'Diagnosi con Drone', desc: 'Individuazione di ogni punto critico con ispezione aerea gratuita.' },
//       { title: 'Preparazione Superfici', desc: 'Pulizia, applicazione primer e trattamento anti-muschio.' },
//       { title: 'Posa Guaine', desc: 'Applicazione membrane con risvolti su tutti i punti critici.' },
//       { title: 'Collaudo Idraulico', desc: 'Test di tenuta idraulica e consegna garanzia scritta.' },
//     ],
//     priceFrom: '',
//   },
//   {
//     slug: 'riparazione-tetto',
//     name: 'Riparazione Tetto',
//     nameFull: 'Riparazione e Manutenzione Tetti',
//     headline: 'RIPARAZIONE TETTO',
//     subheadline: 'Intervento rapido entro 24 ore. Tegole, infiltrazioni, grondaie. Garanzia scritta.',
//     description:
//       "Riparazione tetto urgente entro 24 ore. Tegole rotte, infiltrazioni, stop perdite d'acqua. Garanzia scritta su ogni intervento.",
//     metaTitle: 'Riparazione Tetto Urgente Veneto | Intervento 24h, Garanzia Scritta — Tetto94',
//     metaDescription:
//       "Riparazione tetto urgente entro 24 ore in Veneto. Tegole rotte, infiltrazioni, stop perdite d'acqua. Diagnosi drone gratuita, garanzia scritta su ogni intervento. Tetto94 dal 1994.",
//     doveOperiamoIntro:
//       "Riparazione tetto urgente in tutto il Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Interveniamo entro 24 ore — seleziona la tua città per contattarci direttamente.",
//     prezziTable: [
//       { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Per zona limitata, drone incluso' },
//       { tipo: 'Riparazione infiltrazione localizzata', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Diagnosi + riparazione definitiva' },
//       { tipo: 'Riparazione post-temporale urgente', prezzoMin: '€ 500', prezzoMax: '€ 3.000', note: 'Intervento entro 24 ore' },
//       { tipo: 'Riparazione grondaie e pluviali', prezzoMin: '€ 180', prezzoMax: '€ 900', note: 'Sostituzione o riparazione giunti' },
//       { tipo: 'Sigillatura comignoli e abbaini', prezzoMin: '€ 200', prezzoMax: '€ 800', note: 'Punti critici di infiltrazione' },
//     ],
//     longDescription:
//       "La riparazione del tetto richiede velocità e precisione. Tetto94 interviene entro 24 ore per emergenze — tegole rotte, perdite d'acqua, infiltrazioni post-temporale — con materiali certificati e garanzia scritta su ogni intervento. Operiamo senza ponteggi, riducendo costi e tempi. L'ispezione drone ci permette di diagnosticare il problema esatto prima di intervenire, evitando costi inutili.",
//     icon: 'Hammer',
//     heroKeyword: 'RIPARAZIONE',
//     faqItems: [
//       {
//         q: 'In quanto tempo intervenite per una riparazione urgente?',
//         a: "Garantiamo risposta entro 24 ore. Per emergenze post-temporale cerchiamo di intervenire in giornata. Contattateci al +39 351 651 9363.",
//       },
//       {
//         q: 'Come si individua la causa di un\'infiltrazione dal tetto?',
//         a: "Utilizziamo il drone per ispezione aerea e, se necessario, termocamera per individuare l'esatta origine del problema prima di qualsiasi intervento.",
//       },
//       {
//         q: 'Sostituite tegole singole senza rifare tutto il tetto?',
//         a: 'Sì, la sostituzione di tegole singole o in zone limitate è uno dei nostri interventi più comuni. Utilizziamo tegole compatibili per colore e tipologia.',
//       },
//       {
//         q: "Riparate anche perdite d'acqua da grondaie e pluviali?",
//         a: 'Sì, offriamo pulizia, riparazione e sostituzione di grondaie e pluviali, inclusi giunti, staffe e bocchettoni di scarico.',
//       },
//       {
//         q: "Quanto costa riparare un tetto che perde dopo un temporale?",
//         a: "Una riparazione urgente post-temporale in Veneto costa in media tra 500€ e 3.000€ a seconda del danno. Interveniamo entro 24 ore, diagnostichiamo con drone e ripariamo solo la zona danneggiata senza smontare il tetto intero.",
//       },
//       {
//         q: "Come faccio a sapere se il tetto ha bisogno di riparazione o rifacimento completo?",
//         a: "Se il danno è localizzato (2–3 tegole rotte, infiltrazione da un solo punto) la riparazione è sufficiente. Se il manto ha più di 20 anni, ci sono danni diffusi o infiltrazioni in più punti, il rifacimento completo è la soluzione più economica a lungo termine. Il drone ci permette di valutare gratuitamente.",
//       },
//       {
//         q: "La riparazione del tetto è detraibile fiscalmente?",
//         a: "Sì. La riparazione del tetto rientra nel Bonus Ristrutturazione 50% (IRPEF, 10 rate annuali) se eseguita su abitazione principale o di proprietà. Tetto94 fornisce tutta la documentazione necessaria per accedere al bonus.",
//       },
//     ],
//     benefits: [
//       'Intervento urgente entro 24 ore',
//       'Diagnosi precisa con drone prima dell\'intervento',
//       'Lavoro senza ponteggi (risparmio fino all\'80%)',
//       'Sostituzione tegole compatibili per colore e tipo',
//       'Stop definitivo a infiltrazioni e perdite',
//       'Garanzia scritta su ogni intervento',
//     ],
//     steps: [
//       { title: 'Contatto Rapido', desc: 'Rispondiamo entro 2 ore e pianifichiamo il sopralluogo.' },
//       { title: 'Diagnosi Drone', desc: 'Ispezione aerea gratuita per individuare il problema esatto.' },
//       { title: 'Intervento Mirato', desc: 'Riparazione precisa senza smontare parti non danneggiate.' },
//       { title: 'Garanzia Scritta', desc: 'Consegna garanzia scritta su materiali e manodopera.' },
//     ],
//     priceFrom: '',
//   },
//   {
//     slug: 'infiltrazioni-tetto',
//     name: 'Infiltrazioni Tetto',
//     nameFull: 'Stop Infiltrazioni dal Tetto',
//     headline: 'STOP INFILTRAZIONI',
//     subheadline: 'Diagnosi gratuita con drone. Riparazione definitiva entro 24 ore. Garanzia scritta.',
//     description:
//       "Stop infiltrazioni dal tetto entro 24 ore. Diagnosi drone gratuita, riparazione definitiva, garanzia scritta su ogni intervento.",
//     metaTitle: 'Stop Infiltrazioni dal Tetto | Riparazione Urgente 24h — Tetto94',
//     metaDescription:
//       "Infiltrazioni dal tetto? Tetto94 interviene entro 24 ore in tutto il Veneto. Diagnosi drone gratuita, riparazione definitiva del punto di infiltrazione, garanzia scritta. Dal 1994.",
//     doveOperiamoIntro:
//       "Interveniamo contro le infiltrazioni tetto in tutto il Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Seleziona la tua città per un intervento urgente entro 24 ore.",
//     longDescription:
//       "Le infiltrazioni dal tetto sono un'emergenza che peggiora rapidamente: ogni pioggia aumenta il danno strutturale. Tetto94 interviene entro 24 ore con diagnosi drone gratuita per individuare il punto esatto dell'infiltrazione — comignoli, abbaini, gronde, giunti di gronda — e risolve definitivamente il problema con materiali certificati CE. Nessun intervento invasivo inutile: repariamo solo la zona danneggiata, con garanzia scritta.",
//     icon: 'CloudRain',
//     heroKeyword: 'INFILTRAZIONI',
//     prezziTable: [
//       { tipo: 'Diagnosi drone + relazione tecnica', prezzoMin: 'Gratuita', prezzoMax: 'Gratuita', note: 'Inclusa in ogni intervento' },
//       { tipo: 'Riparazione infiltrazione da comignolo', prezzoMin: '€ 250', prezzoMax: '€ 900', note: 'Sigillatura e impermeabilizzazione' },
//       { tipo: 'Riparazione infiltrazione da abbaino', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Rifacimento scossalina e guaina' },
//       { tipo: 'Riparazione infiltrazione diffusa', prezzoMin: '€ 800', prezzoMax: '€ 4.000', note: 'Impermeabilizzazione zona interessata' },
//       { tipo: 'Intervento urgente post-temporale', prezzoMin: '€ 500', prezzoMax: '€ 3.000', note: 'Entro 24 ore, garanzia inclusa' },
//     ],
//     faqItems: [
//       {
//         q: "Da dove arriva l'infiltrazione se non vedo tegole rotte?",
//         a: "Le infiltrazioni più comuni non vengono da tegole rotte ma da punti di giunzione: base del comignolo, scossaline degli abbaini, giunti di gronda o aree dove la guaina si è deteriorata. Il drone con termocamera individua il punto esatto senza smontare nulla.",
//       },
//       {
//         q: "Quanto tempo ci vuole per riparare un'infiltrazione?",
//         a: "La maggior parte delle riparazioni localizzate viene completata in mezza giornata. Interveniamo entro 24 ore dalla chiamata, diagnosi drone inclusa. Per infiltrazioni diffuse su larga area i tempi possono essere di 1–2 giorni.",
//       },
//       {
//         q: "L'infiltrazione può danneggiare la struttura portante del tetto?",
//         a: "Sì. L'acqua che penetra ripetutamente attacca il legno dei travetti (carie del legno), i listelli di supporto e può raggiungere i solai. Prima si interviene, più limitato è il danno strutturale. Per questo garantiamo intervento entro 24 ore.",
//       },
//       {
//         q: "Come si distingue un'infiltrazione da condensa?",
//         a: "L'infiltrazione produce macchie circolari o lineari che appaiono durante o dopo la pioggia. La condensa produce umidità diffusa, soprattutto negli angoli, senza relazione diretta con le precipitazioni. Il drone e la termocamera ci permettono di distinguerle con certezza prima di intervenire.",
//       },
//     ],
//     benefits: [
//       'Diagnosi gratuita con drone — individuazione punto esatto',
//       'Intervento entro 24 ore dall\'emergenza',
//       'Riparazione definitiva senza smontare tutto il tetto',
//       'Materiali certificati CE specifici per ogni tipo di infiltrazione',
//       'Garanzia scritta su ogni riparazione',
//       'Nessun intervento inutile — repariamo solo la zona danneggiata',
//     ],
//     steps: [
//       { title: 'Chiamata Urgente', desc: 'Rispondiamo entro 2 ore — pianifichiamo il sopralluogo per il giorno stesso o il giorno seguente.' },
//       { title: 'Diagnosi Drone + Termocamera', desc: 'Ispezione aerea gratuita per individuare il punto esatto di infiltrazione senza interventi invasivi.' },
//       { title: 'Riparazione Localizzata', desc: 'Intervento chirurgico sul punto di infiltrazione con materiali certificati CE.' },
//       { title: 'Garanzia Scritta', desc: 'Consegna garanzia scritta con foto prima/dopo e relazione tecnica.' },
//     ],
//     priceFrom: '250€',
//     checklistItems: [
//       'Sopralluogo drone gratuito con relazione fotografica',
//       'Identificazione punto esatto di infiltrazione',
//       'Riparazione scossaline, comignoli e abbaini',
//       'Impermeabilizzazione zona interessata',
//       'Sigillatura giunti e punti critici',
//       'Test tenuta idraulica post-intervento',
//       'Garanzia scritta su ogni riparazione',
//       'Pulizia cantiere a fine lavori',
//     ],
//   },
//   {
//     slug: 'pulizia-grondaie',
//     name: 'Pulizia Grondaie',
//     nameFull: 'Pulizia Grondaie e Pluviali',
//     headline: 'PULIZIA GRONDAIE',
//     subheadline: 'Senza salire sul tetto. Grondaie pulite, pluviali liberi, scorrimento garantito.',
//     description:
//       'Pulizia grondaie e pluviali professionale senza ponteggi. Prevenzione infiltrazioni, rimozione foglie e detriti. Preventivo gratuito.',
//     metaTitle: 'Pulizia Grondaie e Pluviali | Senza Salire sul Tetto — Tetto94',
//     metaDescription:
//       'Pulizia grondaie e pluviali professionale in Veneto senza ponteggi. Rimozione foglie, detriti e muschio. Prevenzione infiltrazioni e danni strutturali. Da 2,50€/ml. Tetto94 dal 1994.',
//     doveOperiamoIntro:
//       'Pulizia grondaie in tutto il Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Servizio rapido, senza ponteggi, preventivo gratuito entro 24 ore.',
//     longDescription:
//       "La pulizia regolare delle grondaie è la manutenzione preventiva più efficace per evitare infiltrazioni, danni alle facciate e problemi strutturali. Tetto94 esegue la pulizia completa di grondaie e pluviali senza ponteggi — con sistemi su fune certificati — rimuovendo foglie, detriti, muschio e incrostazioni. L'intervento include verifica dello scorrimento idraulico e segnalazione di eventuali danni o ostruzioni.",
//     icon: 'Wind',
//     heroKeyword: 'GRONDAIE',
//     prezziTable: [
//       { tipo: 'Pulizia grondaie (per metro lineare)', prezzoMin: '€ 2,50/ml', prezzoMax: '€ 4,00/ml', note: 'Minimo 50 ml per intervento' },
//       { tipo: 'Villetta unifamiliare (~40 ml)', prezzoMin: '€ 100', prezzoMax: '€ 180', note: 'Grondaie + discendenti' },
//       { tipo: 'Casa bifamiliare (~70 ml)', prezzoMin: '€ 175', prezzoMax: '€ 280', note: 'Grondaie + pluviali + controllo' },
//       { tipo: 'Condominio (per scala)', prezzoMin: '€ 250', prezzoMax: '€ 600', note: 'In base a piani e perimetro' },
//       { tipo: 'Pulizia + trattamento anti-muschio', prezzoMin: '€ 150', prezzoMax: '€ 350', note: 'Prevenzione 2 anni garantita' },
//     ],
//     faqItems: [
//       {
//         q: "Ogni quanto bisogna pulire le grondaie?",
//         a: "In Veneto, con la presenza diffusa di alberi ad alto fusto, consigliamo la pulizia almeno una volta l'anno, preferibilmente in autunno dopo la caduta delle foglie. Per case vicino a boschi o con alberi molto alti, due volte l'anno (primavera e autunno).",
//       },
//       {
//         q: "Cosa succede se le grondaie non vengono pulite?",
//         a: "Le grondaie intasate causano: trabocco dell'acqua sulla facciata con danni all'intonaco, infiltrazioni alle fondamenta, peso eccessivo con distacco della grondaia, proliferazione di muschio e zanzare nei ristagni. La pulizia annuale costa molto meno di qualsiasi riparazione successiva.",
//       },
//       {
//         q: "Pulite anche i pluviali ostruiti internamente?",
//         a: "Sì. Oltre alla pulizia esterna delle grondaie, verifichiamo il flusso nei pluviali e, in caso di ostruzione interna, utilizziamo idropulitura ad alta pressione per liberare il condotto. Segnaliamo eventuali rotture o giunti allentati.",
//       },
//       {
//         q: "La pulizia grondaie si può fare senza ponteggi?",
//         a: "Sì, Tetto94 opera sempre senza ponteggi. Utilizziamo sistemi su fune certificati che ci permettono di raggiungere grondaie anche su edifici alti senza necessità di allestire impalcature — risparmio di tempo e costo garantito.",
//       },
//     ],
//     benefits: [
//       'Intervento senza ponteggi — più veloce e meno costoso',
//       'Pulizia completa: foglie, detriti, muschio e incrostazioni',
//       'Verifica scorrimento idraulico inclusa',
//       'Trattamento anti-muschio preventivo disponibile',
//       'Segnalazione gratuita di danni o giunti allentati',
//       'Preventivo gratuito entro 24 ore',
//     ],
//     steps: [
//       { title: 'Sopralluogo Gratuito', desc: 'Valutazione visiva dell\'intero perimetro di grondaie e pluviali.' },
//       { title: 'Pulizia Completa', desc: 'Rimozione manuale di foglie, detriti e muschio, con raccolta e smaltimento.' },
//       { title: 'Verifica Idraulica', desc: 'Test di scorrimento con acqua per confermare la completa pulizia dei pluviali.' },
//       { title: 'Report e Preventivo Manutenzione', desc: 'Relazione fotografica e eventuale preventivo per riparazioni rilevate.' },
//     ],
//     priceFrom: '100€',
//     checklistItems: [
//       'Rimozione manuale foglie e detriti dalle grondaie',
//       'Pulizia e verifica pluviali e discendenti',
//       'Rimozione muschio e incrostazioni',
//       'Test scorrimento idraulico',
//       'Trattamento anti-muschio preventivo (opzionale)',
//       'Raccolta e smaltimento materiale rimosso',
//       'Report fotografico con segnalazione danni',
//       'Preventivo gratuito per eventuali riparazioni',
//     ],
//   },
// ]

// /* ─────────────────────────────────────────────────────────────
//    LOCATIONS — All cities from structured data + priority order
//    Priority 1: Venezia area
//    Priority 2: Veneto cities
//    Priority 3: Emilia-Romagna, Friuli, Trentino
// ───────────────────────────────────────────────────────────── */
// export const LOCATIONS: LocationConfig[] = [
//   // ── Priority 1: Venezia area ──────────────────────────────
//   {
//     slug: 'venezia',
//     name: 'Venezia',
//     province: 'VE',
//     region: 'Veneto',
//     lat: 45.4408,
//     lng: 12.3155,
//     population: '250.000',
//     description: 'Venezia, con il suo clima umido lagunare e le frequenti precipitazioni, richiede coperture specializzate resistenti all\'acqua salina e alle escursioni termiche.',
//     nearbyCity: 'Mestre, Marghera, Chioggia',
//   },
//   {
//     slug: 'mestre',
//     name: 'Mestre',
//     province: 'VE',
//     region: 'Veneto',
//     lat: 45.4900,
//     lng: 12.2422,
//     population: '180.000',
//     description: 'Mestre è il cuore residenziale della terraferma veneziana, con un alto numero di abitazioni anni \'60-\'80 che richiedono interventi di manutenzione e rifacimento.',
//     nearbyCity: 'Venezia, Marghera, Spinea',
//   },
//   {
//     slug: 'padova',
//     name: 'Padova',
//     province: 'PD',
//     region: 'Veneto',
//     lat: 45.4064,
//     lng: 11.8768,
//     population: '210.000',
//     description: 'Padova combina un centro storico ricco di edifici medievali e una cintura residenziale moderna, con esigenze diverse che richiedono competenze specializzate.',
//     nearbyCity: 'Abano Terme, Este, Monselice',
//   },
//   {
//     slug: 'treviso',
//     name: 'Treviso',
//     province: 'TV',
//     region: 'Veneto',
//     lat: 45.6669,
//     lng: 12.2430,
//     population: '85.000',
//     description: 'Treviso e la sua marca, con ville storiche e abitazioni in campagna, richiedono interventi rispettosi dei materiali tradizionali e delle normative locali.',
//     nearbyCity: 'Conegliano, Castelfranco Veneto',
//   },
//   {
//     slug: 'verona',
//     name: 'Verona',
//     province: 'VR',
//     region: 'Veneto',
//     lat: 45.4386,
//     lng: 10.9916,
//     population: '260.000',
//     description: 'Verona, seconda città del Veneto per popolazione, presenta un mercato delle ristrutturazioni molto attivo con numerose ville e condomini da rinnovare.',
//     nearbyCity: 'Villafranca di Verona, Legnago',
//   },
//   {
//     slug: 'vicenza',
//     name: 'Vicenza',
//     province: 'VI',
//     region: 'Veneto',
//     lat: 45.5455,
//     lng: 11.5354,
//     population: '110.000',
//     description: 'Vicenza, città del Palladio, con il suo patrimonio architettonico unico, richiede operatori specializzati nel rispetto dei vincoli architettonici storici.',
//     nearbyCity: 'Bassano del Grappa, Thiene',
//   },
//   {
//     slug: 'rovigo',
//     name: 'Rovigo',
//     province: 'RO',
//     region: 'Veneto',
//     lat: 45.0707,
//     lng: 11.7901,
//     population: '51.000',
//     description: 'Rovigo e il basso Polesine, con il clima umido del Delta del Po, richiedono impermeabilizzazioni di alta qualità per proteggere le coperture dall\'umidità persistente.',
//     nearbyCity: 'Adria, Porto Viro',
//   },
//   {
//     slug: 'belluno',
//     name: 'Belluno',
//     province: 'BL',
//     region: 'Veneto',
//     lat: 46.1406,
//     lng: 12.2158,
//     population: '36.000',
//     description: 'Belluno e le Dolomiti bellunesi, con neve abbondante e temperature rigide, richiedono coperture rinforzate e impermeabilizzazioni specifiche per il clima alpino.',
//     nearbyCity: 'Feltre, Vittorio Veneto',
//   },
//   {
//     slug: 'chioggia',
//     name: 'Chioggia',
//     province: 'VE',
//     region: 'Veneto',
//     lat: 45.2188,
//     lng: 12.2783,
//     population: '50.000',
//     description: 'Chioggia, "Piccola Venezia", condivide le stesse sfide lagunari di Venezia: umidità, salsedine e acqua alta richiedono soluzioni impermeabilizzanti di massima qualità.',
//     nearbyCity: 'Cavarzere, Sottomarina',
//   },
//   {
//     slug: 'mirano',
//     name: 'Mirano',
//     province: 'VE',
//     region: 'Veneto',
//     lat: 45.4984,
//     lng: 12.1078,
//     population: '27.000',
//     description: 'Mirano, cuore della Riviera del Brenta, è circondata da ville venete storiche che richiedono interventi specializzati nel rispetto dei materiali originali.',
//     nearbyCity: 'Dolo, Noale, Santa Maria di Sala',
//   },
//   {
//     slug: 'san-dona-di-piave',
//     name: 'San Donà di Piave',
//     province: 'VE',
//     region: 'Veneto',
//     lat: 45.6298,
//     lng: 12.5640,
//     population: '41.000',
//     description: 'San Donà di Piave, capoluogo del Veneto Orientale, serve un vasto territorio che include Jesolo e Portogruaro, con molte seconde case da mantenere.',
//     nearbyCity: 'Jesolo, Portogruaro, Eraclea',
//   },
//   {
//     slug: 'mogliano-veneto',
//     name: 'Mogliano Veneto',
//     province: 'TV',
//     region: 'Veneto',
//     lat: 45.5606,
//     lng: 12.2355,
//     population: '28.000',
//     description: 'Mogliano Veneto, tra Venezia e Treviso, è un\'area residenziale ad alta densità con ville e abitazioni unifamiliari che richiedono manutenzione periodica.',
//     nearbyCity: 'Marcon, Spinea, Zero Branco',
//   },
//   // ── Priority 2: Friuli-Venezia Giulia ─────────────────────
//   {
//     slug: 'udine',
//     name: 'Udine',
//     province: 'UD',
//     region: 'Friuli-Venezia Giulia',
//     lat: 46.0711,
//     lng: 13.2350,
//     population: '99.000',
//     description: 'Udine, capoluogo friulano, con la sua architettura storica e il clima che alterna piogge intense a forti venti, richiede coperture robuste e ben impermeabilizzate.',
//     nearbyCity: 'Cividale del Friuli, Codroipo',
//   },
//   {
//     slug: 'trieste',
//     name: 'Trieste',
//     province: 'TS',
//     region: 'Friuli-Venezia Giulia',
//     lat: 45.6495,
//     lng: 13.7768,
//     population: '200.000',
//     description: 'Trieste, con la Bora — il vento carsico fino a 200 km/h — richiede coperture con sistemi di fissaggio rinforzati e impermeabilizzazioni ad alta resistenza al vento.',
//     nearbyCity: 'Muggia, Duino-Aurisina',
//   },
//   {
//     slug: 'pordenone',
//     name: 'Pordenone',
//     province: 'PN',
//     region: 'Friuli-Venezia Giulia',
//     lat: 45.9635,
//     lng: 12.6640,
//     population: '51.000',
//     description: 'Pordenone, con le sue zone industriali e residenziali in espansione, è un mercato in crescita per ristrutturazioni di capannoni e abitazioni.',
//     nearbyCity: 'Sacile, Spilimbergo',
//   },
//   // ── Priority 3: Emilia-Romagna ────────────────────────────
//   {
//     slug: 'bologna',
//     name: 'Bologna',
//     province: 'BO',
//     region: 'Emilia-Romagna',
//     lat: 44.4949,
//     lng: 11.3426,
//     population: '400.000',
//     description: 'Bologna, capitale dell\'Emilia-Romagna, con i suoi portici storici e il patrimonio UNESCO, richiede interventi specializzati rispettosi dell\'architettura bolognese.',
//     nearbyCity: 'Modena, Ferrara, Imola',
//   },
//   {
//     slug: 'modena',
//     name: 'Modena',
//     province: 'MO',
//     region: 'Emilia-Romagna',
//     lat: 44.6471,
//     lng: 10.9252,
//     population: '185.000',
//     description: 'Modena, città del Motor Valley e delle produzioni d\'eccellenza, ha un tessuto edilizio importante con numerose ville storiche da mantenere.',
//     nearbyCity: 'Carpi, Sassuolo, Reggio Emilia',
//   },
//   {
//     slug: 'parma',
//     name: 'Parma',
//     province: 'PR',
//     region: 'Emilia-Romagna',
//     lat: 44.8015,
//     lng: 10.3279,
//     population: '195.000',
//     description: 'Parma, città d\'arte e gastronomia, con un centro storico di grande pregio, richiede competenze specifiche per il restauro e la manutenzione di edifici storici.',
//     nearbyCity: 'Fidenza, Salsomaggiore Terme',
//   },
//   {
//     slug: 'ferrara',
//     name: 'Ferrara',
//     province: 'FE',
//     region: 'Emilia-Romagna',
//     lat: 44.8347,
//     lng: 11.6198,
//     population: '133.000',
//     description: 'Ferrara, Patrimonio UNESCO, con la sua pianta rinascimentale e le mura storiche, richiede interventi che rispettino i vincoli del centro storico.',
//     nearbyCity: 'Cento, Comacchio',
//   },
// ]

// /* ─────────────────────────────────────────────────────────────
//    HELPER — Get service + location by slug
// ───────────────────────────────────────────────────────────── */
// export function getService(slug: string): ServiceConfig | undefined {
//   return SERVICES.find((s) => s.slug === slug)
// }

// export function getLocation(slug: string): LocationConfig | undefined {
//   return LOCATIONS.find((l) => l.slug === slug)
// }

// /** All valid slug combinations for generateStaticParams */
// /* All services get a service+city page. Rich city SEO data (pricing tables,
//    extra FAQs) currently only exists for 'rifacimento-tetto' — other services
//    fall back to the generic service template with the city name injected.
//    See app/[servizio]/[citta]/page.tsx, which only attaches citySeoData when
//    servizio === 'rifacimento-tetto'. */
// export const CITY_PAGE_SERVICES = new Set(SERVICES.map((s) => s.slug))

// export function getAllCombinations(): { servizio: string; citta: string }[] {
//   return SERVICES.filter((s) => CITY_PAGE_SERVICES.has(s.slug)).flatMap((s) =>
//     LOCATIONS.map((l) => ({ servizio: s.slug, citta: l.slug }))
//   )
// }


/**
 * Tetto94 — Services + Locations Data Layer
 * Single source of truth for all programmatic SEO pages.
 * All service pages, location pages, sitemap, structured data
 * and internal links are generated from this config.
 */

export interface ServicePriceRow {
  tipo: string
  prezzoMin: string
  prezzoMax: string
  note: string
}

export interface ServiceConfig {
  slug: string
  name: string                    // "Rifacimento Tetto"
  nameFull: string                // "Rifacimento Completo del Tetto"
  headline: string                // Hero H1 prefix
  subheadline: string             // Hero subtitle
  description: string             // Short meta description base (used for metadata)
  metaTitle: string               // Full SEO title tag
  metaDescription: string         // Full SEO meta description
  longDescription: string         // Paragraph for page body
  icon: string                    // Lucide icon name
  heroKeyword: string             // Main keyword for H1
  faqItems: { q: string; a: string }[]
  benefits: string[]
  steps: { title: string; desc: string }[]
  priceFrom: string               // current price "6.500€" — empty string = no price shown
  oldPrice?: string               // strikethrough price "9.500€" — optional
  checklistItems?: string[]       // package checklist — shown only when present
  prezziTable?: ServicePriceRow[] // "Quanto costa?" table shown on service page
  doveOperiamoIntro?: string      // Intro sentence for "Dove Operiamo" section
}

export interface LocationConfig {
  slug: string                    // "venezia"
  name: string                    // "Venezia"
  province: string                // "VE"
  region: string                  // "Veneto"
  lat: number
  lng: number
  population: string              // "250.000"
  description: string             // City-specific sentence for SEO
  nearbyCity?: string             // "Mestre, Marghera"
}

/* ─────────────────────────────────────────────────────────────
   SERVICES — 3 core offerings
───────────────────────────────────────────────────────────── */
export const SERVICES: ServiceConfig[] = [
  {
    slug: 'rifacimento-tetto',
    name: 'Rifacimento Tetto',
    nameFull: 'Rifacimento Completo del Tetto',
    headline: 'RIFACIMENTO TETTO',
    subheadline: 'Copertura nuova, materiali certificati, garanzia scritta 10 anni.',
    description:
      'Rifacimento completo del tetto con materiali certificati CE di prima scelta. Garanzia scritta 10 anni. Preventivo gratuito entro 24 ore.',
    metaTitle: 'Rifacimento Tetto Veneto | Prezzi, Garanzia 10 Anni — Tetto94 dal 1994',
    metaDescription:
      'Rifacimento tetto completo in Veneto a partire da 6.500€. Tegole certificate CE, smaltimento incluso, garanzia scritta 10 anni. Preventivo gratuito entro 24 ore con sopralluogo drone. Tetto94 dal 1994.',
    doveOperiamoIntro:
      'Rifacimento tetto in tutto il Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Clicca sulla tua città per vedere prezzi, materiali e bonus fiscali disponibili nella tua zona.',
    prezziTable: [
      { tipo: 'Rifacimento completo tegole/coppi', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
      { tipo: 'Rifacimento con coibentazione', prezzoMin: '€ 9.500', prezzoMax: '€ 22.000', note: 'Isolamento termico + cappotto tetto' },
      { tipo: 'Impermeabilizzazione guaine', prezzoMin: '€ 2.800', prezzoMax: '€ 7.500', note: '35€–95€ al mq' },
      { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
      { tipo: 'Riparazione urgente infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Entro 24 ore, drone incluso' },
    ],
    longDescription:
      "Il rifacimento completo del tetto è l'intervento più importante per la longevità della tua abitazione. Tetto94 utilizza esclusivamente materiali certificati CE — tegole in cotto, guaine bituminose e polimeriche, membrane traspiranti — posati da artigiani con oltre 32 anni di esperienza. Ogni rifacimento include ispezione drone pre-intervento, smaltimento del materiale rimosso, posa in opera certificata e garanzia scritta 10 anni.",
    icon: 'Layers',
    heroKeyword: 'RIFACIMENTO',
    faqItems: [
      {
        q: 'Quanto dura un rifacimento completo del tetto?',
        a: 'In media 3–7 giorni lavorativi per un tetto residenziale standard, in base alle dimensioni e alla complessità della copertura.',
      },
      {
        q: 'Cosa include il rifacimento completo del tetto?',
        a: "Il servizio include rimozione e smaltimento della copertura esistente, ispezione della struttura portante, posa di manto traspirante, listelli, tegole certificate e collaudo finale con garanzia scritta 10 anni.",
      },
      {
        q: 'Quanto costa il rifacimento del tetto?',
        a: "Il costo dipende da superficie, tipo di materiale e accessibilità. Offriamo pacchetti a partire da 6.500€. Preventivo gratuito entro 24 ore.",
      },
      {
        q: 'Serve il permesso edilizio per rifare il tetto?',
        a: "In molti casi è sufficiente la CILA (Comunicazione Inizio Lavori Asseverata). Vi assistiamo nella gestione burocratica completa.",
      },
      {
        q: 'È possibile rifare il tetto senza ponteggi?',
        a: "Sì. Tetto94 opera esclusivamente con sistemi di accesso su fune (rope access) certificati, eliminando la necessità del ponteggio tradizionale. Il risparmio può arrivare fino all'80% del costo del ponteggio, con tempi di intervento dimezzati.",
      },
      {
        q: 'Quali bonus fiscali si applicano al rifacimento tetto nel 2025?',
        a: "Nel 2025 è possibile accedere al Bonus Ristrutturazione 50% (fino a 96.000€ in 10 anni) e all'Ecobonus 65% se l'intervento include coibentazione. Tetto94 vi assiste nella documentazione per il bonus.",
      },
      {
        q: 'Come si sceglie il materiale giusto per il rifacimento?',
        a: "La scelta dipende dal tipo di edificio, dal clima della zona e dai vincoli paesaggistici. Il nostro tecnico valuta gratuitamente con drone la situazione e propone i materiali certificati CE più adatti — tegole in laterizio, coppi, lastre in ardesia o sistemi misti.",
      },
    ],
    benefits: [
      'Garanzia scritta 10 anni su materiali e manodopera',
      'Materiali certificati CE di prima scelta',
      'Smaltimento incluso della copertura rimossa',
      'Ispezione drone gratuita pre-intervento',
      'Assistenza burocratica per permessi',
      'Intervento senza ponteggi (risparmio fino all\'80%)',
    ],
    steps: [
      { title: 'Ispezione Drone Gratuita', desc: 'Sopralluogo con drone per rilievo completo dello stato della copertura. Report fotografico incluso.' },
      { title: 'Preventivo Trasparente', desc: 'Preventivo dettagliato entro 24 ore, senza costi nascosti.' },
      { title: 'Rimozione e Smaltimento', desc: 'Rimozione della copertura esistente e smaltimento certificato.' },
      { title: 'Posa e Collaudo', desc: 'Installazione con materiali certificati e collaudo finale garantito.' },
    ],
    priceFrom: '6.500€',
    oldPrice: '9.500€',
    checklistItems: [
      'Risanamento professionale',
      'Linea vita provvisoria compresa nel pacchetto',
      'Sostituzione di tegole e coppi rotti',
      'Fissaggio 1 ad 1 di tutte le tegole/coppi',
      'Impermeabilizzazione lucernari',
      'Impermeabilizzazione canne fumarie',
      'Pulizia e sigillatura grondaie e canali',
      'Certificato di garanzia',
      'POS (piano operativo di sicurezza)',
      'Pulizia del cantiere a fine lavoro e smaltimento materiali di risulta',
    ],
  },
  {
    slug: 'impermeabilizzazione-tetto',
    name: 'Impermeabilizzazione Tetto',
    nameFull: 'Impermeabilizzazione e Guaine per Tetto',
    headline: 'IMPERMEABILIZZAZIONE',
    subheadline: 'Protezione totale contro infiltrazioni. Guaine certificate, garanzia scritta 10 anni.',
    description:
      "Impermeabilizzazione tetto con guaine e membrane certificate. Stop definitivo alle infiltrazioni d'acqua. Garanzia scritta 10 anni.",
    metaTitle: "Impermeabilizzazione Tetto Veneto | Stop Infiltrazioni, Garanzia 10 Anni — Tetto94",
    metaDescription:
      "Impermeabilizzazione tetto professionale in Veneto con guaine bituminose, EPDM e membrane polimeriche certificate CE. Stop definitivo alle infiltrazioni. Garanzia scritta 10 anni. Preventivo gratuito entro 24 ore.",
    doveOperiamoIntro:
      "Impermeabilizzazione tetto in tutto il Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Clicca sulla tua città per un preventivo personalizzato con i prezzi al mq della tua zona.",
    prezziTable: [
      { tipo: 'Guaina bituminosa APP/SBS', prezzoMin: '€ 35/mq', prezzoMax: '€ 65/mq', note: 'Posa inclusa, primer incluso' },
      { tipo: 'Membrana EPDM', prezzoMin: '€ 55/mq', prezzoMax: '€ 95/mq', note: 'Durata 25+ anni, ideale tetti piani' },
      { tipo: 'Sistema poliuretanico liquido', prezzoMin: '€ 45/mq', prezzoMax: '€ 85/mq', note: 'Applicabile senza smontare il tetto' },
      { tipo: 'Impermeabilizzazione terrazza', prezzoMin: '€ 2.500', prezzoMax: '€ 8.000', note: 'Incluso collaudo idraulico' },
      { tipo: 'Risanamento grondaie incluso', prezzoMin: '€ 300', prezzoMax: '€ 900', note: 'A intervento, grondaie standard' },
    ],
    longDescription:
      "L'impermeabilizzazione del tetto è la soluzione definitiva contro infiltrazioni, umidità e danni strutturali causati dall'acqua. Tetto94 applica guaine bituminose, polimeriche e membrane traspiranti di ultima generazione, certificate CE, con garanzia scritta 10 anni. Il trattamento include pulizia completa, applicazione di primer specifico, posa in opera con risvolti su tutti i punti critici (camini, abbaini, gronde) e collaudo idraulico finale.",
    icon: 'Droplets',
    heroKeyword: 'IMPERMEABILIZZAZIONE',
    faqItems: [
      {
        q: "Quanto dura l'impermeabilizzazione di un tetto?",
        a: "Un'impermeabilizzazione professionale con guaine di qualità dura 15–25 anni. Con la nostra garanzia scritta 10 anni siete coperti per un decennio.",
      },
      {
        q: "Che tipo di guaine utilizzate per l'impermeabilizzazione?",
        a: 'Utilizziamo guaine bituminose APP e SBS, membrane EPDM e sistemi poliuretanici, tutti certificati CE. La scelta dipende dal tipo di copertura e dalle condizioni climatiche.',
      },
      {
        q: "È possibile impermeabilizzare senza smontare il tetto?",
        a: "In molti casi sì, applicando guaine liquide o membrane a freddo direttamente sulla copertura esistente. Il drone ci aiuta a valutare lo stato prima di decidere.",
      },
      {
        q: "Quanto costa l'impermeabilizzazione del tetto?",
        a: 'I costi variano in base alla superficie e al sistema scelto. Preventivo gratuito entro 24 ore con ispezione drone inclusa.',
      },
      {
        q: "Qual è la differenza tra guaina bituminosa e membrana EPDM?",
        a: "La guaina bituminosa (APP o SBS) è la soluzione più diffusa e conveniente, ideale per tetti a falda e terrazze residenziali. La membrana EPDM ha durata superiore (25+ anni), maggiore flessibilità e resistenza agli UV — è preferita per tetti piani e ambienti con forti escursioni termiche come il clima alpino.",
      },
      {
        q: "L'impermeabilizzazione si può fare senza rimuovere il vecchio manto?",
        a: "In molti casi sì. Con il sistema poliuretanico liquido o le membrane autoadesive è possibile impermeabilizzare sopra il manto esistente, evitando i costi di rimozione. Il drone verifica prima se il substrato è idoneo a ricevere il nuovo trattamento.",
      },
      {
        q: "Come si riconosce un tetto non impermeabilizzato correttamente?",
        a: "I segnali principali sono: macchie di umidità sul soffitto interno, muffa sul perimetro delle pareti, rigonfiamenti sulla guaina, danni alle tegole vicino ai comignoli o agli abbaini. Tetto94 diagnostica il problema esatto con drone e termocamera prima di qualsiasi intervento.",
      },
    ],
    benefits: [
      'Stop definitivo alle infiltrazioni d\'acqua',
      'Guaine e membrane certificate CE',
      'Applicazione su tutti i punti critici',
      'Collaudo idraulico finale incluso',
      'Garanzia scritta 10 anni',
      'Ispezione drone gratuita pre-intervento',
      'Intervento senza ponteggi — risparmio fino all\'80%',
    ],
    steps: [
      { title: 'Diagnosi con Drone', desc: 'Individuazione di ogni punto critico con ispezione aerea gratuita.' },
      { title: 'Preparazione Superfici', desc: 'Pulizia, applicazione primer e trattamento anti-muschio.' },
      { title: 'Posa Guaine', desc: 'Applicazione membrane con risvolti su tutti i punti critici.' },
      { title: 'Collaudo Idraulico', desc: 'Test di tenuta idraulica e consegna garanzia scritta.' },
    ],
    priceFrom: '',
  },
  {
    slug: 'riparazione-tetto',
    name: 'Riparazione Tetto',
    nameFull: 'Riparazione e Manutenzione Tetti',
    headline: 'RIPARAZIONE TETTO',
    subheadline: 'Intervento rapido entro 24 ore. Tegole, infiltrazioni, grondaie. Garanzia scritta.',
    description:
      "Riparazione tetto urgente entro 24 ore. Tegole rotte, infiltrazioni, stop perdite d'acqua. Garanzia scritta su ogni intervento.",
    metaTitle: 'Riparazione Tetto Urgente Veneto | Intervento 24h, Garanzia Scritta — Tetto94',
    metaDescription:
      "Riparazione tetto urgente entro 24 ore in Veneto. Tegole rotte, infiltrazioni, stop perdite d'acqua. Diagnosi drone gratuita, garanzia scritta su ogni intervento. Tetto94 dal 1994.",
    doveOperiamoIntro:
      "Riparazione tetto urgente in tutto il Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Interveniamo entro 24 ore — seleziona la tua città per contattarci direttamente.",
    prezziTable: [
      { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Per zona limitata, drone incluso' },
      { tipo: 'Riparazione infiltrazione localizzata', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Diagnosi + riparazione definitiva' },
      { tipo: 'Riparazione post-temporale urgente', prezzoMin: '€ 500', prezzoMax: '€ 3.000', note: 'Intervento entro 24 ore' },
      { tipo: 'Riparazione grondaie e pluviali', prezzoMin: '€ 180', prezzoMax: '€ 900', note: 'Sostituzione o riparazione giunti' },
      { tipo: 'Sigillatura comignoli e abbaini', prezzoMin: '€ 200', prezzoMax: '€ 800', note: 'Punti critici di infiltrazione' },
    ],
    longDescription:
      "La riparazione del tetto richiede velocità e precisione. Tetto94 interviene entro 24 ore per emergenze — tegole rotte, perdite d'acqua, infiltrazioni post-temporale — con materiali certificati e garanzia scritta su ogni intervento. Operiamo senza ponteggi, riducendo costi e tempi. L'ispezione drone ci permette di diagnosticare il problema esatto prima di intervenire, evitando costi inutili.",
    icon: 'Hammer',
    heroKeyword: 'RIPARAZIONE',
    faqItems: [
      {
        q: 'In quanto tempo intervenite per una riparazione urgente?',
        a: "Garantiamo risposta entro 24 ore. Per emergenze post-temporale cerchiamo di intervenire in giornata. Contattateci al +39 351 651 9363.",
      },
      {
        q: 'Come si individua la causa di un\'infiltrazione dal tetto?',
        a: "Utilizziamo il drone per ispezione aerea e, se necessario, termocamera per individuare l'esatta origine del problema prima di qualsiasi intervento.",
      },
      {
        q: 'Sostituite tegole singole senza rifare tutto il tetto?',
        a: 'Sì, la sostituzione di tegole singole o in zone limitate è uno dei nostri interventi più comuni. Utilizziamo tegole compatibili per colore e tipologia.',
      },
      {
        q: "Riparate anche perdite d'acqua da grondaie e pluviali?",
        a: 'Sì, offriamo pulizia, riparazione e sostituzione di grondaie e pluviali, inclusi giunti, staffe e bocchettoni di scarico.',
      },
      {
        q: "Quanto costa riparare un tetto che perde dopo un temporale?",
        a: "Una riparazione urgente post-temporale in Veneto costa in media tra 500€ e 3.000€ a seconda del danno. Interveniamo entro 24 ore, diagnostichiamo con drone e ripariamo solo la zona danneggiata senza smontare il tetto intero.",
      },
      {
        q: "Come faccio a sapere se il tetto ha bisogno di riparazione o rifacimento completo?",
        a: "Se il danno è localizzato (2–3 tegole rotte, infiltrazione da un solo punto) la riparazione è sufficiente. Se il manto ha più di 20 anni, ci sono danni diffusi o infiltrazioni in più punti, il rifacimento completo è la soluzione più economica a lungo termine. Il drone ci permette di valutare gratuitamente.",
      },
      {
        q: "La riparazione del tetto è detraibile fiscalmente?",
        a: "Sì. La riparazione del tetto rientra nel Bonus Ristrutturazione 50% (IRPEF, 10 rate annuali) se eseguita su abitazione principale o di proprietà. Tetto94 fornisce tutta la documentazione necessaria per accedere al bonus.",
      },
    ],
    benefits: [
      'Intervento urgente entro 24 ore',
      'Diagnosi precisa con drone prima dell\'intervento',
      'Lavoro senza ponteggi (risparmio fino all\'80%)',
      'Sostituzione tegole compatibili per colore e tipo',
      'Stop definitivo a infiltrazioni e perdite',
      'Garanzia scritta su ogni intervento',
    ],
    steps: [
      { title: 'Contatto Rapido', desc: 'Rispondiamo entro 2 ore e pianifichiamo il sopralluogo.' },
      { title: 'Diagnosi Drone', desc: 'Ispezione aerea gratuita per individuare il problema esatto.' },
      { title: 'Intervento Mirato', desc: 'Riparazione precisa senza smontare parti non danneggiate.' },
      { title: 'Garanzia Scritta', desc: 'Consegna garanzia scritta su materiali e manodopera.' },
    ],
    priceFrom: '',
  },
  {
    slug: 'infiltrazioni-tetto',
    name: 'Infiltrazioni Tetto',
    nameFull: 'Stop Infiltrazioni dal Tetto',
    headline: 'STOP INFILTRAZIONI',
    subheadline: 'Diagnosi gratuita con drone. Riparazione definitiva entro 24 ore. Garanzia scritta.',
    description:
      "Stop infiltrazioni dal tetto entro 24 ore. Diagnosi drone gratuita, riparazione definitiva, garanzia scritta su ogni intervento.",
    metaTitle: 'Stop Infiltrazioni dal Tetto | Riparazione Urgente 24h — Tetto94',
    metaDescription:
      "Infiltrazioni dal tetto? Tetto94 interviene entro 24 ore in tutto il Veneto. Diagnosi drone gratuita, riparazione definitiva del punto di infiltrazione, garanzia scritta. Dal 1994.",
    doveOperiamoIntro:
      "Interveniamo contro le infiltrazioni tetto in tutto il Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Seleziona la tua città per un intervento urgente entro 24 ore.",
    longDescription:
      "Le infiltrazioni dal tetto sono un'emergenza che peggiora rapidamente: ogni pioggia aumenta il danno strutturale. Tetto94 interviene entro 24 ore con diagnosi drone gratuita per individuare il punto esatto dell'infiltrazione — comignoli, abbaini, gronde, giunti di gronda — e risolve definitivamente il problema con materiali certificati CE. Nessun intervento invasivo inutile: repariamo solo la zona danneggiata, con garanzia scritta.",
    icon: 'CloudRain',
    heroKeyword: 'INFILTRAZIONI',
    prezziTable: [
      { tipo: 'Diagnosi drone + relazione tecnica', prezzoMin: 'Gratuita', prezzoMax: 'Gratuita', note: 'Inclusa in ogni intervento' },
      { tipo: 'Riparazione infiltrazione da comignolo', prezzoMin: '€ 250', prezzoMax: '€ 900', note: 'Sigillatura e impermeabilizzazione' },
      { tipo: 'Riparazione infiltrazione da abbaino', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Rifacimento scossalina e guaina' },
      { tipo: 'Riparazione infiltrazione diffusa', prezzoMin: '€ 800', prezzoMax: '€ 4.000', note: 'Impermeabilizzazione zona interessata' },
      { tipo: 'Intervento urgente post-temporale', prezzoMin: '€ 500', prezzoMax: '€ 3.000', note: 'Entro 24 ore, garanzia inclusa' },
    ],
    faqItems: [
      {
        q: "Da dove arriva l'infiltrazione se non vedo tegole rotte?",
        a: "Le infiltrazioni più comuni non vengono da tegole rotte ma da punti di giunzione: base del comignolo, scossaline degli abbaini, giunti di gronda o aree dove la guaina si è deteriorata. Il drone con termocamera individua il punto esatto senza smontare nulla.",
      },
      {
        q: "Quanto tempo ci vuole per riparare un'infiltrazione?",
        a: "La maggior parte delle riparazioni localizzate viene completata in mezza giornata. Interveniamo entro 24 ore dalla chiamata, diagnosi drone inclusa. Per infiltrazioni diffuse su larga area i tempi possono essere di 1–2 giorni.",
      },
      {
        q: "L'infiltrazione può danneggiare la struttura portante del tetto?",
        a: "Sì. L'acqua che penetra ripetutamente attacca il legno dei travetti (carie del legno), i listelli di supporto e può raggiungere i solai. Prima si interviene, più limitato è il danno strutturale. Per questo garantiamo intervento entro 24 ore.",
      },
      {
        q: "Come si distingue un'infiltrazione da condensa?",
        a: "L'infiltrazione produce macchie circolari o lineari che appaiono durante o dopo la pioggia. La condensa produce umidità diffusa, soprattutto negli angoli, senza relazione diretta con le precipitazioni. Il drone e la termocamera ci permettono di distinguerle con certezza prima di intervenire.",
      },
    ],
    benefits: [
      'Diagnosi gratuita con drone — individuazione punto esatto',
      'Intervento entro 24 ore dall\'emergenza',
      'Riparazione definitiva senza smontare tutto il tetto',
      'Materiali certificati CE specifici per ogni tipo di infiltrazione',
      'Garanzia scritta su ogni riparazione',
      'Nessun intervento inutile — repariamo solo la zona danneggiata',
    ],
    steps: [
      { title: 'Chiamata Urgente', desc: 'Rispondiamo entro 2 ore — pianifichiamo il sopralluogo per il giorno stesso o il giorno seguente.' },
      { title: 'Diagnosi Drone + Termocamera', desc: 'Ispezione aerea gratuita per individuare il punto esatto di infiltrazione senza interventi invasivi.' },
      { title: 'Riparazione Localizzata', desc: 'Intervento chirurgico sul punto di infiltrazione con materiali certificati CE.' },
      { title: 'Garanzia Scritta', desc: 'Consegna garanzia scritta con foto prima/dopo e relazione tecnica.' },
    ],
    priceFrom: '250€',
    checklistItems: [
      'Sopralluogo drone gratuito con relazione fotografica',
      'Identificazione punto esatto di infiltrazione',
      'Riparazione scossaline, comignoli e abbaini',
      'Impermeabilizzazione zona interessata',
      'Sigillatura giunti e punti critici',
      'Test tenuta idraulica post-intervento',
      'Garanzia scritta su ogni riparazione',
      'Pulizia cantiere a fine lavori',
    ],
  },
  {
    slug: 'pulizia-grondaie',
    name: 'Pulizia Grondaie',
    nameFull: 'Pulizia Grondaie e Pluviali',
    headline: 'PULIZIA GRONDAIE',
    subheadline: 'Senza salire sul tetto. Grondaie pulite, pluviali liberi, scorrimento garantito.',
    description:
      'Pulizia grondaie e pluviali professionale senza ponteggi. Prevenzione infiltrazioni, rimozione foglie e detriti. Preventivo gratuito.',
    metaTitle: 'Pulizia Grondaie e Pluviali | Senza Salire sul Tetto — Tetto94',
    metaDescription:
      'Pulizia grondaie e pluviali professionale in Veneto senza ponteggi. Rimozione foglie, detriti e muschio. Prevenzione infiltrazioni e danni strutturali. Da 2,50€/ml. Tetto94 dal 1994.',
    doveOperiamoIntro:
      'Pulizia grondaie in tutto il Veneto, Emilia-Romagna e Friuli-Venezia Giulia. Servizio rapido, senza ponteggi, preventivo gratuito entro 24 ore.',
    longDescription:
      "La pulizia regolare delle grondaie è la manutenzione preventiva più efficace per evitare infiltrazioni, danni alle facciate e problemi strutturali. Tetto94 esegue la pulizia completa di grondaie e pluviali senza ponteggi — con sistemi su fune certificati — rimuovendo foglie, detriti, muschio e incrostazioni. L'intervento include verifica dello scorrimento idraulico e segnalazione di eventuali danni o ostruzioni.",
    icon: 'Wind',
    heroKeyword: 'GRONDAIE',
    prezziTable: [
      { tipo: 'Pulizia grondaie (per metro lineare)', prezzoMin: '€ 2,50/ml', prezzoMax: '€ 4,00/ml', note: 'Minimo 50 ml per intervento' },
      { tipo: 'Villetta unifamiliare (~40 ml)', prezzoMin: '€ 100', prezzoMax: '€ 180', note: 'Grondaie + discendenti' },
      { tipo: 'Casa bifamiliare (~70 ml)', prezzoMin: '€ 175', prezzoMax: '€ 280', note: 'Grondaie + pluviali + controllo' },
      { tipo: 'Condominio (per scala)', prezzoMin: '€ 250', prezzoMax: '€ 600', note: 'In base a piani e perimetro' },
      { tipo: 'Pulizia + trattamento anti-muschio', prezzoMin: '€ 150', prezzoMax: '€ 350', note: 'Prevenzione 2 anni garantita' },
    ],
    faqItems: [
      {
        q: "Ogni quanto bisogna pulire le grondaie?",
        a: "In Veneto, con la presenza diffusa di alberi ad alto fusto, consigliamo la pulizia almeno una volta l'anno, preferibilmente in autunno dopo la caduta delle foglie. Per case vicino a boschi o con alberi molto alti, due volte l'anno (primavera e autunno).",
      },
      {
        q: "Cosa succede se le grondaie non vengono pulite?",
        a: "Le grondaie intasate causano: trabocco dell'acqua sulla facciata con danni all'intonaco, infiltrazioni alle fondamenta, peso eccessivo con distacco della grondaia, proliferazione di muschio e zanzare nei ristagni. La pulizia annuale costa molto meno di qualsiasi riparazione successiva.",
      },
      {
        q: "Pulite anche i pluviali ostruiti internamente?",
        a: "Sì. Oltre alla pulizia esterna delle grondaie, verifichiamo il flusso nei pluviali e, in caso di ostruzione interna, utilizziamo idropulitura ad alta pressione per liberare il condotto. Segnaliamo eventuali rotture o giunti allentati.",
      },
      {
        q: "La pulizia grondaie si può fare senza ponteggi?",
        a: "Sì, Tetto94 opera sempre senza ponteggi. Utilizziamo sistemi su fune certificati che ci permettono di raggiungere grondaie anche su edifici alti senza necessità di allestire impalcature — risparmio di tempo e costo garantito.",
      },
    ],
    benefits: [
      'Intervento senza ponteggi — più veloce e meno costoso',
      'Pulizia completa: foglie, detriti, muschio e incrostazioni',
      'Verifica scorrimento idraulico inclusa',
      'Trattamento anti-muschio preventivo disponibile',
      'Segnalazione gratuita di danni o giunti allentati',
      'Preventivo gratuito entro 24 ore',
    ],
    steps: [
      { title: 'Sopralluogo Gratuito', desc: 'Valutazione visiva dell\'intero perimetro di grondaie e pluviali.' },
      { title: 'Pulizia Completa', desc: 'Rimozione manuale di foglie, detriti e muschio, con raccolta e smaltimento.' },
      { title: 'Verifica Idraulica', desc: 'Test di scorrimento con acqua per confermare la completa pulizia dei pluviali.' },
      { title: 'Report e Preventivo Manutenzione', desc: 'Relazione fotografica e eventuale preventivo per riparazioni rilevate.' },
    ],
    priceFrom: '100€',
    checklistItems: [
      'Rimozione manuale foglie e detriti dalle grondaie',
      'Pulizia e verifica pluviali e discendenti',
      'Rimozione muschio e incrostazioni',
      'Test scorrimento idraulico',
      'Trattamento anti-muschio preventivo (opzionale)',
      'Raccolta e smaltimento materiale rimosso',
      'Report fotografico con segnalazione danni',
      'Preventivo gratuito per eventuali riparazioni',
    ],
  },
]

/* ─────────────────────────────────────────────────────────────
   LOCATIONS — All cities from structured data + priority order
   Priority 1: Venezia area
   Priority 2: Veneto cities
   Priority 3: Emilia-Romagna, Friuli, Trentino
───────────────────────────────────────────────────────────── */
export const LOCATIONS: LocationConfig[] = [
  // ── Priority 1: Venezia area ──────────────────────────────
  {
    slug: 'venezia',
    name: 'Venezia',
    province: 'VE',
    region: 'Veneto',
    lat: 45.4408,
    lng: 12.3155,
    population: '250.000',
    description: 'Venezia, con il suo clima umido lagunare e le frequenti precipitazioni, richiede coperture specializzate resistenti all\'acqua salina e alle escursioni termiche.',
    nearbyCity: 'Mestre, Marghera, Chioggia',
  },
  {
    slug: 'mestre',
    name: 'Mestre',
    province: 'VE',
    region: 'Veneto',
    lat: 45.4900,
    lng: 12.2422,
    population: '180.000',
    description: 'Mestre è il cuore residenziale della terraferma veneziana, con un alto numero di abitazioni anni \'60-\'80 che richiedono interventi di manutenzione e rifacimento.',
    nearbyCity: 'Venezia, Marghera, Spinea',
  },
  {
    slug: 'padova',
    name: 'Padova',
    province: 'PD',
    region: 'Veneto',
    lat: 45.4064,
    lng: 11.8768,
    population: '210.000',
    description: 'Padova combina un centro storico ricco di edifici medievali e una cintura residenziale moderna, con esigenze diverse che richiedono competenze specializzate.',
    nearbyCity: 'Abano Terme, Este, Monselice',
  },
  {
    slug: 'treviso',
    name: 'Treviso',
    province: 'TV',
    region: 'Veneto',
    lat: 45.6669,
    lng: 12.2430,
    population: '85.000',
    description: 'Treviso e la sua marca, con ville storiche e abitazioni in campagna, richiedono interventi rispettosi dei materiali tradizionali e delle normative locali.',
    nearbyCity: 'Conegliano, Castelfranco Veneto',
  },
  {
    slug: 'verona',
    name: 'Verona',
    province: 'VR',
    region: 'Veneto',
    lat: 45.4386,
    lng: 10.9916,
    population: '260.000',
    description: 'Verona, seconda città del Veneto per popolazione, presenta un mercato delle ristrutturazioni molto attivo con numerose ville e condomini da rinnovare.',
    nearbyCity: 'Villafranca di Verona, Legnago',
  },
  {
    slug: 'vicenza',
    name: 'Vicenza',
    province: 'VI',
    region: 'Veneto',
    lat: 45.5455,
    lng: 11.5354,
    population: '110.000',
    description: 'Vicenza, città del Palladio, con il suo patrimonio architettonico unico, richiede operatori specializzati nel rispetto dei vincoli architettonici storici.',
    nearbyCity: 'Bassano del Grappa, Thiene',
  },
  {
    slug: 'rovigo',
    name: 'Rovigo',
    province: 'RO',
    region: 'Veneto',
    lat: 45.0707,
    lng: 11.7901,
    population: '51.000',
    description: 'Rovigo e il basso Polesine, con il clima umido del Delta del Po, richiedono impermeabilizzazioni di alta qualità per proteggere le coperture dall\'umidità persistente.',
    nearbyCity: 'Adria, Porto Viro',
  },
  {
    slug: 'belluno',
    name: 'Belluno',
    province: 'BL',
    region: 'Veneto',
    lat: 46.1406,
    lng: 12.2158,
    population: '36.000',
    description: 'Belluno e le Dolomiti bellunesi, con neve abbondante e temperature rigide, richiedono coperture rinforzate e impermeabilizzazioni specifiche per il clima alpino.',
    nearbyCity: 'Feltre',
  },
  {
    slug: 'chioggia',
    name: 'Chioggia',
    province: 'VE',
    region: 'Veneto',
    lat: 45.2188,
    lng: 12.2783,
    population: '50.000',
    description: 'Chioggia, "Piccola Venezia", condivide le stesse sfide lagunari di Venezia: umidità, salsedine e acqua alta richiedono soluzioni impermeabilizzanti di massima qualità.',
    nearbyCity: 'Cavarzere, Sottomarina',
  },
  {
    slug: 'mirano',
    name: 'Mirano',
    province: 'VE',
    region: 'Veneto',
    lat: 45.4984,
    lng: 12.1078,
    population: '27.000',
    description: 'Mirano, cuore della Riviera del Brenta, è circondata da ville venete storiche che richiedono interventi specializzati nel rispetto dei materiali originali.',
    nearbyCity: 'Dolo, Noale, Santa Maria di Sala',
  },
  {
    slug: 'san-dona-di-piave',
    name: 'San Donà di Piave',
    province: 'VE',
    region: 'Veneto',
    lat: 45.6298,
    lng: 12.5640,
    population: '41.000',
    description: 'San Donà di Piave, capoluogo del Veneto Orientale, serve un vasto territorio che include Jesolo e Portogruaro, con molte seconde case da mantenere.',
    nearbyCity: 'Jesolo, Portogruaro, Eraclea',
  },
  {
    slug: 'mogliano-veneto',
    name: 'Mogliano Veneto',
    province: 'TV',
    region: 'Veneto',
    lat: 45.5606,
    lng: 12.2355,
    population: '28.000',
    description: 'Mogliano Veneto, tra Venezia e Treviso, è un\'area residenziale ad alta densità con ville e abitazioni unifamiliari che richiedono manutenzione periodica.',
    nearbyCity: 'Marcon, Spinea, Zero Branco',
  },
  // ── Priority 2: Friuli-Venezia Giulia ─────────────────────
  {
    slug: 'udine',
    name: 'Udine',
    province: 'UD',
    region: 'Friuli-Venezia Giulia',
    lat: 46.0711,
    lng: 13.2350,
    population: '99.000',
    description: 'Udine, capoluogo friulano, con la sua architettura storica e il clima che alterna piogge intense a forti venti, richiede coperture robuste e ben impermeabilizzate.',
    nearbyCity: 'Cividale del Friuli, Codroipo',
  },
  {
    slug: 'trieste',
    name: 'Trieste',
    province: 'TS',
    region: 'Friuli-Venezia Giulia',
    lat: 45.6495,
    lng: 13.7768,
    population: '200.000',
    description: 'Trieste, con la Bora — il vento carsico fino a 200 km/h — richiede coperture con sistemi di fissaggio rinforzati e impermeabilizzazioni ad alta resistenza al vento.',
    nearbyCity: 'Muggia, Duino-Aurisina',
  },
  {
    slug: 'pordenone',
    name: 'Pordenone',
    province: 'PN',
    region: 'Friuli-Venezia Giulia',
    lat: 45.9635,
    lng: 12.6640,
    population: '51.000',
    description: 'Pordenone, con le sue zone industriali e residenziali in espansione, è un mercato in crescita per ristrutturazioni di capannoni e abitazioni.',
    nearbyCity: 'Sacile, Spilimbergo',
  },
  // ── Priority 3: Emilia-Romagna ────────────────────────────
  {
    slug: 'bologna',
    name: 'Bologna',
    province: 'BO',
    region: 'Emilia-Romagna',
    lat: 44.4949,
    lng: 11.3426,
    population: '400.000',
    description: 'Bologna, capitale dell\'Emilia-Romagna, con i suoi portici storici e il patrimonio UNESCO, richiede interventi specializzati rispettosi dell\'architettura bolognese.',
    nearbyCity: 'Modena, Ferrara, Imola',
  },
  {
    slug: 'modena',
    name: 'Modena',
    province: 'MO',
    region: 'Emilia-Romagna',
    lat: 44.6471,
    lng: 10.9252,
    population: '185.000',
    description: 'Modena, città del Motor Valley e delle produzioni d\'eccellenza, ha un tessuto edilizio importante con numerose ville storiche da mantenere.',
    nearbyCity: 'Carpi, Sassuolo, Reggio Emilia',
  },
  {
    slug: 'parma',
    name: 'Parma',
    province: 'PR',
    region: 'Emilia-Romagna',
    lat: 44.8015,
    lng: 10.3279,
    population: '195.000',
    description: 'Parma, città d\'arte e gastronomia, con un centro storico di grande pregio, richiede competenze specifiche per il restauro e la manutenzione di edifici storici.',
    nearbyCity: 'Fidenza, Salsomaggiore Terme',
  },
  {
    slug: 'ferrara',
    name: 'Ferrara',
    province: 'FE',
    region: 'Emilia-Romagna',
    lat: 44.8347,
    lng: 11.6198,
    population: '133.000',
    description: 'Ferrara, Patrimonio UNESCO, con la sua pianta rinascimentale e le mura storiche, richiede interventi che rispettino i vincoli del centro storico.',
    nearbyCity: 'Cento, Comacchio',
  },
]

/* ─────────────────────────────────────────────────────────────
   HELPER — Get service + location by slug
───────────────────────────────────────────────────────────── */
export function getService(slug: string): ServiceConfig | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function getLocation(slug: string): LocationConfig | undefined {
  return LOCATIONS.find((l) => l.slug === slug)
}

/** All valid slug combinations for generateStaticParams */
/* All services get a service+city page. Rich city SEO data (pricing tables,
   extra FAQs) currently only exists for 'rifacimento-tetto' — other services
   fall back to the generic service template with the city name injected.
   See app/[servizio]/[citta]/page.tsx, which only attaches citySeoData when
   servizio === 'rifacimento-tetto'. */
export const CITY_PAGE_SERVICES = new Set(SERVICES.map((s) => s.slug))

export function getAllCombinations(): { servizio: string; citta: string }[] {
  return SERVICES.filter((s) => CITY_PAGE_SERVICES.has(s.slug)).flatMap((s) =>
    LOCATIONS.map((l) => ({ servizio: s.slug, citta: l.slug }))
  )
}
