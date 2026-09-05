// /**
//  * Tetto94 — City SEO Data Layer
//  * Extended data for rifacimento-tetto pages targeting the 6 priority cities.
//  * Structured to be extensible: add more cities by following the same interface.
//  *
//  * Data used by: CitySeoSections component + page.tsx metadata/schema
//  */

// export interface CityPriceRow {
//   tipo: string          // "Rifacimento completo (tegole/coppi)"
//   prezzoMin: string     // "€ 6.500"
//   prezzoMax: string     // "€ 14.000"
//   note: string          // "IVA inclusa, smaltimento incluso"
// }

// export interface CityMaterial {
//   nome: string
//   descrizione: string
//   adatto: string        // why this material is good for THIS city climate
// }

// export interface CityBonus {
//   nome: string          // "Superbonus 90%"
//   percentuale: string   // "50%"
//   massimale: string     // "€ 96.000"
//   scadenza: string      // "31/12/2025"
//   note: string
// }

// export interface CityFaqExtra {
//   q: string
//   a: string
// }

// export interface CityTotalCostRow {
//   superficie: string    // "~80 mq"
//   prezzoMin: string     // "€ 5.800"
//   prezzoMax: string     // "€ 9.600"
//   note: string
// }

// export interface CitySenzaPonteggi {
//   titolo: string        // "Lavoriamo senza ponteggi a Venezia"
//   intro: string         // 1–2 sentences on why no scaffolding matters HERE
//   vantaggi: string[]    // 3 bullet benefits
//   risparmio: string     // "fino all'80%"
// }

// export interface CitySeoData {
//   citySlug: string                    // must match LocationConfig.slug
//   ogImage: string                     // /images/og/rifacimento-tetto-{slug}.png
//   beforeImage: string                 // /images/cities/{slug}-before.png
//   afterImage: string                  // /images/cities/{slug}-after.png
//   mapsEmbedSrc: string                // Google Maps embed URL (no API key needed)
//   mapsCaption?: string                // "Interveniamo in tutta la provincia di [City]"
//   heroLongText: string                // Extended H1 area description (2 sentences, city-specific)
//   priceIntro: string                  // Sentence before price table (mention price in first sentence per SEO doc)
//   prezzi: CityPriceRow[]
//   costiTotali?: CityTotalCostRow[]    // Batch 2: esempi costo totale ~100mq
//   senzaPonteggi: CitySenzaPonteggi    // "Lavoriamo senza ponteggi" section (required for all)
//   comuniCoperti: string[]             // 15–20 comuni covered
//   materiali: CityMaterial[]
//   bonus: CityBonus[]
//   faqExtra: CityFaqExtra[]            // 2–3 extra FAQ items city-specific
//   reviewExtra?: {                     // optional 3rd review specific to city
//     name: string
//     city: string
//     rating: number
//     text: string
//   }
// }

// /* ─────────────────────────────────────────────────────────────
//    VENEZIA
// ───────────────────────────────────────────────────────────── */
// const venezia: CitySeoData = {
//   citySlug: 'venezia',
//   ogImage: '/images/og/rifacimento-tetto-venezia.png',
//   beforeImage: '/images/cities/venezia-before.png',
//   afterImage: '/images/cities/venezia-after.png',
//   mapsEmbedSrc:
//     'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45025.49!2d12.3155!3d45.4408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb1daf1d63d89%3A0x729c36a5f91cb609!2sVenezia%20VE!5e0!3m2!1sit!2sit!4v1700000000000',
//   heroLongText:
//     "A Venezia, il clima lagunare con umidità superiore all'80% e la salsedine dell'aria marina degradano le coperture fino al 40% più rapidamente rispetto alle zone interne. Tetto94 opera a Venezia dal 1994 con tecniche specializzate per l'ambiente marino: materiali resistenti alla corrosione salina, sigillature rinforzate e ispezione drone per ogni intervento.",
//   mapsCaption: 'Interveniamo in tutta la provincia di Venezia',
//   priceIntro:
//     "Il costo del rifacimento tetto a Venezia parte da 6.500€ per un'abitazione standard. I prezzi includono smaltimento, posa certificata e garanzia scritta 10 anni.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Venezia',
//     intro: "A Venezia, montare ponteggi nelle calli e nei campi è spesso impossibile o richiede permessi comunali con iter lunghissimi. Tetto94 opera esclusivamente con sistemi di accesso su fune (rope access) certificati, eliminando ogni necessità di impalcatura.",
//     vantaggi: [
//       'Nessuna occupazione di suolo pubblico nelle calli — zero pratiche al Comune',
//       'Risparmio fino all\'80% rispetto al costo del ponteggio tradizionale',
//       'Intervento completato in metà del tempo: meno disagio per condomini e vicini',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
//     { tipo: 'Impermeabilizzazione con guaina', prezzoMin: '€ 2.800', prezzoMax: '€ 7.500', note: 'Per m² da 35€ a 95€' },
//     { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
//     { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
//     { tipo: 'Pulizia e manutenzione grondaie', prezzoMin: '€ 180', prezzoMax: '€ 600', note: 'Per abitazione unifamiliare' },
//   ],
//   comuniCoperti: [
//     'Venezia', 'Mestre', 'Marghera', 'Murano', 'Burano', 'Lido di Venezia',
//     'Chioggia', 'Jesolo', 'Cavallino-Treporti', 'Quarto d\'Altino',
//     'Mirano', 'Spinea', 'Marcon', 'Dolo', 'Mira',
//     'Vigonovo', 'Salzano', 'Santa Maria di Sala', 'Pianiga', 'Noale',
//   ],
//   materiali: [
//     {
//       nome: 'Tegole in cotto smaltato',
//       descrizione: 'Tegole tradizionali veneziane con trattamento anti-salino in superficie',
//       adatto: 'Resistono alla corrosione salina del clima marino veneziano e mantengono l\'estetica storica lagunare',
//     },
//     {
//       nome: 'Guaina polimerica APP',
//       descrizione: 'Membrana bituminosa modificata con polipropilene attattico',
//       adatto: 'Massima resistenza all\'umidità persistente della laguna e alle escursioni termiche stagionali',
//     },
//     {
//       nome: 'Coppi in terracotta naturale',
//       descrizione: 'Coppi tradizionali in cotto non trattato per edifici storici con vincolo paesaggistico',
//       adatto: 'Obbligatori per molti edifici del centro storico veneziano soggetti a vincolo della Soprintendenza',
//     },
//   ],
//   bonus: [
//     {
//       nome: 'Bonus Ristrutturazione 50%',
//       percentuale: '50%',
//       massimale: '€ 96.000',
//       scadenza: '31/12/2025',
//       note: 'Detrazione IRPEF in 10 rate annuali. Applicabile a rifacimento tetto abitazione principale.',
//     },
//     {
//       nome: 'Ecobonus 65%',
//       percentuale: '65%',
//       massimale: '€ 100.000',
//       scadenza: '31/12/2025',
//       note: 'Per interventi con miglioramento classe energetica. Include isolamento sottotetto.',
//     },
//     {
//       nome: 'Sismabonus',
//       percentuale: '70–80%',
//       massimale: '€ 96.000',
//       scadenza: '31/12/2025',
//       note: 'Per zone sismiche. Venezia è zona 3. Combinabile con altri bonus.',
//     },
//   ],
//   faqExtra: [
//     {
//       q: 'Come si rifà il tetto a Venezia senza ponteggi?',
//       a: "A Venezia, l'impossibilità di montare ponteggi tradizionali in molte calle e campielli rende il nostro sistema senza ponteggi ancora più vantaggioso. Utilizziamo attrezzature specializzate per accesso in quota e drone per l'ispezione, riducendo tempi e costi del 60% rispetto ai metodi tradizionali.",
//     },
//     {
//       q: 'Servono permessi speciali per rifare il tetto a Venezia storica?',
//       a: "Sì. Per il centro storico di Venezia è spesso necessaria l'autorizzazione della Soprintendenza ai Beni Culturali. Tetto94 gestisce tutta la burocrazia: dalla CILA all'autorizzazione paesaggistica, utilizzando esclusivamente materiali approvati per le zone vincolate.",
//     },
//     {
//       q: "L'acqua alta danneggia il tetto?",
//       a: "L'acqua alta diretta non raggiunge i tetti, ma l'umidità saline e i venti marini accelerano la degradazione. Consigliamo ispezioni annuali e utilizziamo sigillanti specifici per ambienti marini che durano 3 volte di più rispetto ai prodotti standard.",
//     },
//   ],
// }

// /* ─────────────────────────────────────────────────────────────
//    MESTRE
// ───────────────────────────────────────────────────────────── */
// const mestre: CitySeoData = {
//   citySlug: 'mestre',
//   ogImage: '/images/og/rifacimento-tetto-mestre.png',
//   beforeImage: '/images/cities/mestre-before.png',
//   afterImage: '/images/cities/mestre-after.png',
//   mapsEmbedSrc:
//     'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22514.0!2d12.2422!3d45.4900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb1daf1d63d89%3A0x5555!2sMestre%20VE!5e0!3m2!1sit!2sit!4v1700000000001',
//   heroLongText:
//     "A Mestre, il patrimonio edilizio degli anni '60–'80 presenta tetti piani con guaine bituminose spesso giunte a fine vita tecnica, causa principale di infiltrazioni nei condomini veneziani. Tetto94 è specializzata nel risanamento di questi edifici con tecnologie di impermeabilizzazione di ultima generazione e interventi rapidi senza evacuazione degli inquilini.",
//   mapsCaption: 'Interveniamo a Mestre, Marghera e in tutta la terraferma veneziana',
//   priceIntro:
//     "Il costo del rifacimento tetto a Mestre parte da 6.500€ per abitazioni unifamiliari. Per i condomini, offriamo preventivi dedicati con gestione delle pratiche condominiali inclusa.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Mestre',
//     intro: "Nei condomini di Mestre, un ponteggio tradizionale blocca i parcheggi condominiali per settimane e richiede occupazione di suolo pubblico con iter burocratici complessi. Tetto94 interviene con rope access certificato: nessun ponteggio, nessun parcheggio occupato, lavori completati in metà del tempo.",
//     vantaggi: [
//       'Nessuna occupazione del parcheggio condominiale durante i lavori',
//       'Risparmio fino all\'80% rispetto al costo del ponteggio tradizionale',
//       'Meno disturbo per i condomini: intervento silenzioso e rapido',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 13.500', note: 'IVA inclusa, smaltimento incluso' },
//     { tipo: 'Impermeabilizzazione tetto piano', prezzoMin: '€ 3.200', prezzoMax: '€ 8.000', note: 'Guaina polimerica + primer' },
//     { tipo: 'Rifacimento tetto condominiale', prezzoMin: '€ 12.000', prezzoMax: '€ 45.000', note: 'Prezzo per intero edificio, variabile per piani' },
//     { tipo: 'Sostituzione tegole parziale', prezzoMin: '€ 280', prezzoMax: '€ 1.100', note: 'Zona localizzata' },
//     { tipo: 'Diagnosi infiltrazioni condominiali', prezzoMin: '€ 0', prezzoMax: '€ 0', note: 'Ispezione drone GRATUITA' },
//   ],
//   comuniCoperti: [
//     'Mestre', 'Marghera', 'Zelarino', 'Chirignago', 'Favaro Veneto',
//     'Carpenedo', 'Bissuola', 'Spinea', 'Mirano', 'Salzano',
//     'Zero Branco', 'Marcon', 'Quarto d\'Altino', 'Pianiga', 'Noale',
//     'Martellago', 'Scorzè', 'Vigonovo', 'Dolo', 'Mira',
//   ],
//   materiali: [
//     {
//       nome: 'Guaina ardesiata SBS',
//       descrizione: 'Membrana bituminosa modificata con gomma SBS, flessibile anche a -20°C',
//       adatto: 'Ideale per i tetti piani degli edifici degli anni \'60-\'80 di Mestre, resistente alle escursioni termiche padane',
//     },
//     {
//       nome: 'Sistema EPDM monostrato',
//       descrizione: 'Membrana in gomma sintetica durata prevista 50+ anni',
//       adatto: 'Perfetto per grandi superfici piane condomini Mestre, riduce costi di manutenzione nel lungo periodo',
//     },
//     {
//       nome: 'Tegole in calcestruzzo vibrato',
//       descrizione: 'Tegole cementizie di alta resistenza con finitura colorata',
//       adatto: 'Scelta economica e duratura per le abitazioni unifamiliari della periferia di Mestre',
//     },
//   ],
//   bonus: [
//     {
//       nome: 'Bonus Ristrutturazione 50%',
//       percentuale: '50%',
//       massimale: '€ 96.000',
//       scadenza: '31/12/2025',
//       note: 'Detrazione IRPEF in 10 rate. Ideale per interventi condominiali tramite delibera assembleare.',
//     },
//     {
//       nome: 'Superbonus Condomini',
//       percentuale: '70%',
//       massimale: '€ 40.000 per unità',
//       scadenza: '31/12/2025',
//       note: 'Per condomini con più unità abitative. Richiede miglioramento di 2 classi energetiche.',
//     },
//     {
//       nome: 'Ecobonus 65%',
//       percentuale: '65%',
//       massimale: '€ 100.000',
//       scadenza: '31/12/2025',
//       note: 'Applicabile se il rifacimento include isolamento termico del tetto (cappotto tetto).',
//     },
//   ],
//   faqExtra: [
//     {
//       q: 'Come si gestisce il rifacimento del tetto in un condominio a Mestre?',
//       a: "Il rifacimento condominiale richiede delibera assembleare con maggioranza qualificata. Tetto94 supporta l'amministratore nella preparazione dei preventivi per l'assemblea, nella richiesta dei bonus fiscali e nella gestione del cantiere con interruzione minima per gli inquilini.",
//     },
//     {
//       q: 'Quanto tempo richiede il rifacimento di un tetto piano a Mestre?',
//       a: "Per un tetto piano standard di 150–250 m² il nostro intervento richiede 2–4 giorni lavorativi. Per condomini più grandi stimiamo 1–2 settimane. Lavoriamo senza ponteggi esterni, quindi non ostruiamo i parcheggi condominiali.",
//     },
//     {
//       q: 'I lavori sul tetto creano disturbo agli inquilini a Mestre?',
//       a: "I rumori sono limitati alle ore 8:00–18:00 come da normativa. Non utilizziamo fiamma libera per la posa delle guaine (sistema a freddo o ad aria calda) riducendo odori e rischi. Non è necessario evacuare gli appartamenti sottostanti.",
//     },
//   ],
// }

// /* ─────────────────────────────────────────────────────────────
//    PADOVA
// ───────────────────────────────────────────────────────────── */
// const padova: CitySeoData = {
//   citySlug: 'padova',
//   ogImage: '/images/og/rifacimento-tetto-padova.png',
//   beforeImage: '/images/cities/padova-before.png',
//   afterImage: '/images/cities/padova-after.png',
//   mapsEmbedSrc:
//     'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45204.0!2d11.8768!3d45.4064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eda6561313e2b%3A0x1%2CPadova!5e0!3m2!1sit!2sit!4v1700000000002',
//   heroLongText:
//     "A Padova il rifacimento tetto parte da 6.500€ e include ispezione drone gratuita, materiali certificati CE e garanzia scritta 10 anni. Il centro storico patavino e la Riviera del Brenta presentano edifici storici con coperture in tegole e coppi che richiedono interventi specializzati nel rispetto dei vincoli della Soprintendenza.",
//   mapsCaption: 'Interveniamo a Padova, nella Riviera del Brenta e in tutta la provincia',
//   priceIntro:
//     "Il costo del rifacimento tetto a Padova parte da 6.500€ per superfici standard. Il preventivo include smaltimento dell'esistente, ispezione drone e garanzia decennale senza costi nascosti.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Padova',
//     intro: "Nel centro storico di Padova, con i suoi portici tutelati dall'UNESCO, i ponteggi tradizionali creano problemi di ingombro e richiedono autorizzazioni comunali specifiche. Tetto94 usa sistemi su fune certificati che permettono di operare senza toccare i portici e senza alcuna pratica di occupazione suolo.",
//     vantaggi: [
//       'Nessun intralcio ai portici storici e ai passaggi pedonali tutelati UNESCO',
//       'Risparmio fino all\'80% sul costo del ponteggio — meno spesa per il cliente',
//       'Autorizzazione comunale non necessaria: lavori avviabili subito',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 15.000', note: 'IVA inclusa, smaltimento e posa' },
//     { tipo: 'Impermeabilizzazione e guaine', prezzoMin: '€ 2.500', prezzoMax: '€ 7.200', note: 'Guaina bituminosa o polimerica' },
//     { tipo: 'Restauro copertura storica', prezzoMin: '€ 8.500', prezzoMax: '€ 22.000', note: 'Materiali per edifici vincolati' },
//     { tipo: 'Riparazione parziale', prezzoMin: '€ 380', prezzoMax: '€ 2.200', note: 'Zona localizzata con garanzia scritta' },
//     { tipo: 'Manutenzione programmata annuale', prezzoMin: '€ 250', prezzoMax: '€ 800', note: 'Ispezione + piccoli interventi' },
//   ],
//   comuniCoperti: [
//     'Padova', 'Abano Terme', 'Montegrotto Terme', 'Albignasego', 'Selvazzano Dentro',
//     'Rubano', 'Vigodarzere', 'Cadoneghe', 'Vigonza', 'Noventa Padovana',
//     'Ponte San Nicolò', 'Saonara', 'Campodarsego', 'Este', 'Monselice',
//     'Conselve', 'Piove di Sacco', 'Cittadella', 'Camposampiero', 'Dolo',
//   ],
//   materiali: [
//     {
//       nome: 'Coppi in cotto padovano',
//       descrizione: 'Coppi tradizionali in terracotta prodotti in fornaci del territorio patavino',
//       adatto: 'Rispettano i vincoli paesaggistici del centro storico e della Riviera del Brenta, con ottime prestazioni termiche',
//     },
//     {
//       nome: 'Tegole portoghesi',
//       descrizione: 'Tegole curve in cotto ad alta resistenza per coperture inclinate',
//       adatto: 'Soluzione classica per le ville della Riviera del Brenta, con eccellente drenaggio delle piogge padane',
//     },
//     {
//       nome: 'Guaina liquida poliuretanica',
//       descrizione: 'Sistema impermeabilizzante liquido applicato a freddo, continuo senza giunti',
//       adatto: 'Perfetto per le terrazze e i tetti piani delle abitazioni moderne di Padova, applicazione rapida senza disturbi',
//     },
//   ],
//   bonus: [
//     {
//       nome: 'Bonus Ristrutturazione 50%',
//       percentuale: '50%',
//       massimale: '€ 96.000',
//       scadenza: '31/12/2025',
//       note: 'La più utilizzata a Padova. Detrazione in 10 anni, trasferibile in caso di vendita.',
//     },
//     {
//       nome: 'Ecobonus 65%',
//       percentuale: '65%',
//       massimale: '€ 100.000',
//       scadenza: '31/12/2025',
//       note: 'Applicabile con isolamento cappotto tetto. Ottimo per le ville padovane degli anni \'70.',
//     },
//     {
//       nome: 'Cessione del credito',
//       percentuale: '50%',
//       massimale: 'Variabile',
//       scadenza: '31/12/2025',
//       note: 'Tetto94 vi aiuta a verificare la disponibilità di cessione tramite istituti bancari convenzionati.',
//     },
//   ],
//   faqExtra: [
//     {
//       q: 'Quanto costa rifare il tetto a Padova centro storico?',
//       a: "Per gli edifici storici del centro di Padova il costo è superiore alla media (da 8.500€) perché richiede materiali specifici approvati dalla Soprintendenza e tecnici specializzati nel restauro. Il sopralluogo drone è sempre gratuito e il preventivo viene emesso entro 24 ore.",
//     },
//     {
//       q: 'Operate anche nelle terme euganee vicino a Padova?',
//       a: "Sì, operiamo ad Abano Terme, Montegrotto Terme e in tutti i comuni dei Colli Euganei. Le ville e gli alberghi termali richiedono spesso coperture di qualità per proteggere strutture ad alto valore economico.",
//     },
//     {
//       q: 'Come funziona il bonus ristrutturazione per il tetto a Padova?',
//       a: "Il Bonus Ristrutturazione 50% è detraibile in 10 quote annuali dall'IRPEF. Tetto94 vi fornisce tutta la documentazione necessaria: fatture con codice fiscale, descrizione lavori, pagamento con bonifico parlante. Vi assistiamo anche nella comunicazione all'Agenzia delle Entrate.",
//     },
//   ],
// }

// /* ─────────────────────────────────────────────────────────────
//    TREVISO
// ───────────────────────────────────────────────────────────── */
// const treviso: CitySeoData = {
//   citySlug: 'treviso',
//   ogImage: '/images/og/rifacimento-tetto-treviso.png',
//   beforeImage: '/images/cities/treviso-before.png',
//   afterImage: '/images/cities/treviso-after.png',
//   mapsEmbedSrc:
//     'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45122.0!2d12.2430!3d45.6669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477955b60c5f6555%3A0x1!2sTreviso%20TV!5e0!3m2!1sit!2sit!4v1700000000003',
//   heroLongText:
//     "A Treviso il rifacimento tetto parte da 6.500€ con garanzia decennale e ispezione drone gratuita. La Marca Trevigiana, con le sue ville storiche, i rustici e le abitazioni della campagna tra il Piave e il Montello, richiede operatori specializzati nel rispetto dei materiali tradizionali e delle normative paesaggistiche locali.",
//   mapsCaption: 'Interveniamo a Treviso, nella Marca Trevigiana e in tutta la provincia',
//   priceIntro:
//     "Il rifacimento tetto a Treviso parte da 6.500€ tutto incluso. I prezzi sono fissi e trasparenti: nessuna sorpresa a fine lavori, preventivo gratuito entro 24 ore.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Treviso',
//     intro: "Nelle ville e nei rustici della Marca Trevigiana, un ponteggio tradizionale richiede settimane di allestimento e spesso non è compatibile con i giardini privati e le recinzioni. Tetto94 interviene con rope access certificato direttamente dalla copertura, preservando il giardino e riducendo i tempi di intervento.",
//     vantaggi: [
//       'Nessun danno al giardino o alle recinzioni delle ville della Marca',
//       'Risparmio fino all\'80% rispetto ai ponteggi tradizionali',
//       'Intervento completato in 2–4 giorni contro le 2–3 settimane con ponteggio',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.500', note: 'IVA, smaltimento e linea vita inclusi' },
//     { tipo: 'Impermeabilizzazione con guaina', prezzoMin: '€ 2.600', prezzoMax: '€ 6.800', note: 'Per tetti piani e terrazze' },
//     { tipo: 'Restauro villa storica', prezzoMin: '€ 9.000', prezzoMax: '€ 25.000', note: 'Materiali artigianali, vincoli paesaggistici' },
//     { tipo: 'Riparazione post-grandinata', prezzoMin: '€ 600', prezzoMax: '€ 3.500', note: 'Intervento rapido, gestione assicurativa' },
//     { tipo: 'Pulizia muschio e trattamento', prezzoMin: '€ 200', prezzoMax: '€ 900', note: 'Trattamento anti-muschio 5 anni' },
//   ],
//   comuniCoperti: [
//     'Treviso', 'Conegliano', 'Vittorio Veneto', 'Oderzo', 'Castelfranco Veneto',
//     'Montebelluna', 'Mogliano Veneto', 'Villorba', 'Silea', 'Roncade',
//     'Quinto di Treviso', 'Preganziol', 'Zero Branco', 'Paese', 'Breda di Piave',
//     'Spresiano', 'Susegana', 'San Vendemiano', 'Cordignano', 'Valdobbiadene',
//   ],
//   materiali: [
//     {
//       nome: 'Coppi marsigliesi',
//       descrizione: 'Tegole piane in cotto di tradizione trevigiana con aggancio meccanico',
//       adatto: 'La soluzione più diffusa nella Marca Trevigiana per ville e rustici, ottima resistenza alle piogge intense del Piave',
//     },
//     {
//       nome: 'Tegole canadesi (asfalto)',
//       descrizione: 'Tegole bituminose leggere con graniglie minerali colorate',
//       adatto: 'Ideali per le pendenze elevate delle case di campagna trevigiana e per le grandinata frequenti della zona pedemontana',
//     },
//     {
//       nome: 'Lose in pietra di Marostica',
//       descrizione: 'Lastre in pietra locale per coperture tradizionali dell\'area pedemontana',
//       adatto: 'Materiale storico della pedemontana trevigiana, durata 80+ anni, consigliato per rustici e malghe',
//     },
//   ],
//   bonus: [
//     {
//       nome: 'Bonus Ristrutturazione 50%',
//       percentuale: '50%',
//       massimale: '€ 96.000',
//       scadenza: '31/12/2025',
//       note: 'Ottimo per le ville storiche della Marca. Detraibile in 10 anni anche in caso di locazione.',
//     },
//     {
//       nome: 'Sismabonus',
//       percentuale: '70%',
//       massimale: '€ 96.000',
//       scadenza: '31/12/2025',
//       note: 'Treviso è zona 3 sismica. Il rifacimento tetto con rinforzo strutturale può accedere a questo bonus.',
//     },
//     {
//       nome: 'Contributo Comuni Marca Trevigiana',
//       percentuale: 'Variabile',
//       massimale: 'Fino a € 5.000',
//       scadenza: 'Variabile per comune',
//       note: 'Alcuni comuni della Marca offrono contributi locali per il recupero del patrimonio edilizio rurale.',
//     },
//   ],
//   faqExtra: [
//     {
//       q: 'Come ci si difende dalla grandine sul tetto a Treviso?',
//       a: "La zona pedemontana trevigiana è tra le più colpite da grandinate in Veneto. Consigliamo tegole con resistenza alla grandine certificata Classe 4 (la massima), oppure membrane bituminose con ardesia di protezione per i tetti piani. In caso di danno da grandine, gestiamo anche la pratica assicurativa.",
//     },
//     {
//       q: 'Operate anche nel Prosecco DOCG e sulle Colline del Prosecco?',
//       a: "Sì, operiamo in tutta la zona UNESCO delle Colline del Prosecco di Conegliano Valdobbiadene. Per gli edifici rurali e le cantine vinicole utilizziamo materiali tradizionali approvati per le zone paesaggisticamente vincolate.",
//     },
//     {
//       q: 'Quanto dura un tetto rifatto a Treviso?',
//       a: "Con i materiali certificati che utilizziamo, un tetto rifatto a Treviso dura 30–50 anni in condizioni normali. La nostra garanzia scritta copre 10 anni su materiali e manodopera. Con la manutenzione programmata annuale (da 250€) potete estendere la vita del tetto oltre i 50 anni.",
//     },
//   ],
// }

// /* ─────────────────────────────────────────────────────────────
//    VERONA
// ───────────────────────────────────────────────────────────── */
// const verona: CitySeoData = {
//   citySlug: 'verona',
//   ogImage: '/images/og/rifacimento-tetto-verona.png',
//   beforeImage: '/images/cities/verona-before.png',
//   afterImage: '/images/cities/verona-after.png',
//   mapsEmbedSrc:
//     'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44855.0!2d10.9916!3d45.4386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47781586b1f81d7d%3A0x1!2sVerona%20VR!5e0!3m2!1sit!2sit!4v1700000000004',
//   heroLongText:
//     "A Verona il rifacimento tetto parte da 6.500€ con garanzia decennale, ispezione drone gratuita e preventivo entro 24 ore. Seconda città del Veneto per popolazione, Verona presenta un mercato delle ristrutturazioni molto attivo con numerose ville in Valpolicella, Bardolino e nelle zone collinari che richiedono coperture di alta qualità.",
//   mapsCaption: 'Interveniamo a Verona, in Valpolicella, Bardolino e in tutta la provincia',
//   priceIntro:
//     "Il costo del rifacimento tetto a Verona parte da 6.500€ per un'abitazione standard. I nostri prezzi sono trasparenti e fissi: nessun costo nascosto, preventivo gratuito con sopralluogo drone entro 24 ore.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Verona',
//     intro: "Nel centro storico di Verona e nelle ville della Valpolicella, i ponteggi richiedono permessi comunali e ZTL speciali che allungano i tempi di 4–8 settimane. Tetto94 opera senza ponteggi con rope access certificato, avviando i lavori entro 48 ore dall'accettazione del preventivo.",
//     vantaggi: [
//       'Nessuna pratica di occupazione suolo in ZTL e centro storico — lavori subito',
//       'Risparmio fino all\'80% sul ponteggio: budget destinato alla qualità della copertura',
//       'Zero intralcio al traffico nelle strette vie del centro scaligero',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 16.000', note: 'IVA, smaltimento e collaudo inclusi' },
//     { tipo: 'Impermeabilizzazione villa', prezzoMin: '€ 3.000', prezzoMax: '€ 8.500', note: 'Guaina polimerica certificata CE' },
//     { tipo: 'Restauro tetto storico', prezzoMin: '€ 9.500', prezzoMax: '€ 28.000', note: 'Centro storico, materiali vincolati' },
//     { tipo: 'Rifacimento parziale', prezzoMin: '€ 500', prezzoMax: '€ 3.200', note: 'Zona danneggiata localizzata' },
//     { tipo: 'Ispezione drone + report', prezzoMin: '€ 0', prezzoMax: '€ 0', note: 'SEMPRE GRATUITA prima del preventivo' },
//   ],
//   comuniCoperti: [
//     'Verona', 'Villafranca di Verona', 'Bardolino', 'Garda', 'Peschiera del Garda',
//     'Soave', 'San Bonifacio', 'Legnago', 'Bussolengo', 'Sona',
//     'Sommacampagna', 'Castelnuovo del Garda', 'Lazise', 'Valeggio sul Mincio', 'Pescantina',
//     'Negrar di Valpolicella', 'Sant\'Ambrogio di Valpolicella', 'San Pietro in Cariano', 'Fumane', 'Marano di Valpolicella',
//   ],
//   materiali: [
//     {
//       nome: 'Tegole marsigliesi in cotto',
//       descrizione: 'Tegole piane in terracotta di tradizione veronese ad alta densità',
//       adatto: 'La soluzione più richiesta per le ville veronesi e le cantine della Valpolicella, resistente al gelo e al disgelo tipici dell\'inverno veronese',
//     },
//     {
//       nome: 'Coppi veronesi in cotto',
//       descrizione: 'Coppi a doppia curvatura della tradizione edilizia veronese',
//       adatto: 'Obbligatori per il centro storico di Verona e per molti edifici rurali del Garda, con eccellente drenaggio delle piogge',
//     },
//     {
//       nome: 'Tegole in cemento ad alto spessore',
//       descrizione: 'Tegole cementizie di ultima generazione con trattamento impermeabilizzante',
//       adatto: 'Scelta economica e durevole per le zone residenziali periferiche di Verona, resistenti alle grandinate della pianura padana',
//     },
//   ],
//   bonus: [
//     {
//       nome: 'Bonus Ristrutturazione 50%',
//       percentuale: '50%',
//       massimale: '€ 96.000',
//       scadenza: '31/12/2025',
//       note: 'Il più utilizzato a Verona. Verona ha uno dei tassi di utilizzo bonus edilizi più alti del Veneto.',
//     },
//     {
//       nome: 'Ecobonus 65%',
//       percentuale: '65%',
//       massimale: '€ 100.000',
//       scadenza: '31/12/2025',
//       note: 'Per le ville con tetto a falda in Valpolicella e Bardolino, combinabile con isolamento a cappotto.',
//     },
//     {
//       nome: 'Bonus Facciate (se applicabile)',
//       percentuale: '50%',
//       massimale: '€ 40.000',
//       scadenza: 'Verifica annuale',
//       note: 'Per interventi che includono anche facciata e grondaie. Verificate disponibilità con il nostro team.',
//     },
//   ],
//   faqExtra: [
//     {
//       q: 'Quanto costa rifare il tetto a Verona nel 2025?',
//       a: "A Verona nel 2025 il rifacimento tetto completo costa tra 6.500€ e 16.000€ per un'abitazione unifamiliare standard (80–150 m²). I fattori che influenzano il prezzo sono: tipo di materiale, pendenza, accessibilità e distanza dal centro. Preventivo gratuito con drone entro 24 ore.",
//     },
//     {
//       q: 'Operate anche sul lago di Garda vicino a Verona?',
//       a: "Sì, copriamo tutta la sponda veronese del Garda: Bardolino, Lazise, Castelnuovo del Garda, Peschiera, Valeggio. Per le ville gardesane utilizziamo materiali resistenti all'umidità lacustre e ai venti nord-sud del lago.",
//     },
//     {
//       q: 'Come funziona il rifacimento tetto in Valpolicella?',
//       a: "In Valpolicella molti edifici rurali e cantine vinicole hanno vincoli paesaggistici che impongono materiali tradizionali. Tetto94 è specializzata in questo tipo di interventi: utilizziamo coppi veronesi certificati e gestiamo le pratiche con la Soprintendenza. Sopralluogo drone gratuito anche in zona collinare.",
//     },
//   ],
// }

// /* ─────────────────────────────────────────────────────────────
//    VICENZA
// ───────────────────────────────────────────────────────────── */
// const vicenza: CitySeoData = {
//   citySlug: 'vicenza',
//   ogImage: '/images/og/rifacimento-tetto-vicenza.png',
//   beforeImage: '/images/cities/vicenza-before.png',
//   afterImage: '/images/cities/vicenza-after.png',
//   mapsEmbedSrc:
//     'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45210.0!2d11.5354!3d45.5455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47793e5069f0e2c5%3A0x1!2sVicenza%20VI!5e0!3m2!1sit!2sit!4v1700000000005',
//   heroLongText:
//     "A Vicenza il rifacimento tetto parte da 6.500€ con garanzia scritta 10 anni e ispezione drone gratuita. Città del Palladio e Patrimonio UNESCO, Vicenza richiede operatori con competenze specifiche nel rispetto dei vincoli architettonici delle ville palladiane e degli edifici storici del centro.",
//   mapsCaption: 'Interveniamo a Vicenza, nelle ville palladiane e in tutta la provincia',
//   priceIntro:
//     "Il costo del rifacimento tetto a Vicenza parte da 6.500€. Per gli edifici storici e le ville palladiane il preventivo viene definito dopo il sopralluogo drone gratuito, con rispetto dei vincoli UNESCO e della Soprintendenza.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Vicenza',
//     intro: "Sulle ville palladiane UNESCO di Vicenza, un ponteggio tradizionale potrebbe danneggiare le facciate storiche e richiede autorizzazione preventiva della Soprintendenza. Tetto94 lavora esclusivamente con rope access: nessun contatto con le facciate, nessuna autorizzazione speciale, massimo rispetto del patrimonio storico.",
//     vantaggi: [
//       'Nessun rischio di danni alle facciate palladiane — intervento non invasivo',
//       'Risparmio fino all\'80% rispetto al ponteggio, mantenendo qualità massima',
//       'Nessuna autorizzazione Soprintendenza per il ponteggio — iter semplificato',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 15.500', note: 'IVA inclusa, smaltimento certificato' },
//     { tipo: 'Restauro villa palladiana', prezzoMin: '€ 11.000', prezzoMax: '€ 35.000', note: 'Materiali storici, lavori vincolati UNESCO' },
//     { tipo: 'Impermeabilizzazione tetto piano', prezzoMin: '€ 2.800', prezzoMax: '€ 7.000', note: 'Membrane certificate per zona sismica' },
//     { tipo: 'Intervento urgente', prezzoMin: '€ 400', prezzoMax: '€ 2.800', note: 'Risposta entro 24h, garanzia scritta' },
//     { tipo: 'Manutenzione programmata', prezzoMin: '€ 220', prezzoMax: '€ 750', note: 'Contratto annuale con ispezione drone' },
//   ],
//   comuniCoperti: [
//     'Vicenza', 'Bassano del Grappa', 'Thiene', 'Schio', 'Valdagno',
//     'Arzignano', 'Valdagno', 'Montecchio Maggiore', 'Lonigo', 'Noventa Vicentina',
//     'Lugo di Vicenza', 'Breganze', 'Mason Vicentino', 'Marostica', 'Asiago',
//     'Gallio', 'Roana', 'Chiampo', 'Montorso Vicentino', 'Orgiano',
//   ],
//   materiali: [
//     {
//       nome: 'Coppi romani in cotto',
//       descrizione: 'Coppi semicircolari di tradizione romana, materiale autentico per le ville palladiane',
//       adatto: 'L\'unico materiale accettato dalla Soprintendenza UNESCO per il restauro delle ville palladiane di Vicenza',
//     },
//     {
//       nome: 'Tegole a doppia onda in cotto',
//       descrizione: 'Tegole di tradizione veneta per coperture a falda multipla',
//       adatto: 'Perfette per le ville vicentine dell\'Ottocento e le abitazioni storiche del centro, resistenti alle piogge pre-alpine',
//     },
//     {
//       nome: 'Lose in pietra di Chiampo',
//       descrizione: 'Lastre in marmo calcareo locale estratto dalle cave vicentine',
//       adatto: 'Materiale storico della Pedemontana Vicentina, usato da secoli per malghe e rustici dell\'Altopiano di Asiago',
//     },
//   ],
//   bonus: [
//     {
//       nome: 'Bonus Ristrutturazione 50%',
//       percentuale: '50%',
//       massimale: '€ 96.000',
//       scadenza: '31/12/2025',
//       note: 'Applicabile anche per il restauro delle ville storiche vicentine con materiali certificati.',
//     },
//     {
//       nome: 'Sismabonus',
//       percentuale: '75–85%',
//       massimale: '€ 96.000',
//       scadenza: '31/12/2025',
//       note: 'Vicenza è zona 2–3 sismica. Il miglioramento strutturale del tetto può dare accesso a percentuali elevate.',
//     },
//     {
//       nome: 'Contributo Comune di Vicenza',
//       percentuale: 'Variabile',
//       massimale: 'Fino a € 8.000',
//       scadenza: 'Bando annuale',
//       note: 'Il Comune di Vicenza eroga contributi per il restauro edilizio del centro storico e delle ville palladiane.',
//     },
//   ],
//   faqExtra: [
//     {
//       q: 'Si può rifare il tetto di una villa palladiana a Vicenza?',
//       a: "Sì, ma richiede autorizzazione preventiva della Soprintendenza ai Beni Culturali e utilizzo di materiali storici certificati (coppi romani in cotto di dimensioni originali). Tetto94 gestisce l'intero iter burocratico e dispone di materiali approvati per le ville UNESCO. Il processo richiede 4–8 settimane per le autorizzazioni.",
//     },
//     {
//       q: 'Operate anche sull\'Altopiano di Asiago?',
//       a: "Sì, siamo presenti sull'Altopiano dei Sette Comuni: Asiago, Roana, Gallio, Enego. Per le malghe e le abitazioni alpine utilizziamo materiali specifici per il clima montano: tegole resistenti al gelo certificato classe F (fino a -40°C) e impermeabilizzazioni rinforzate per la neve.",
//     },
//     {
//       q: 'Quanto costa il sopralluogo a Vicenza?',
//       a: "Il sopralluogo con drone a Vicenza è completamente gratuito, incluso per ogni cliente che richiede un preventivo. Utilizziamo drone con camera ad alta risoluzione per rilievo completo — il report fotografico vi viene consegnato via email entro 2 ore dal sopralluogo.",
//     },
//   ],
// }

// /* ─────────────────────────────────────────────────────────────
//    BATCH 2 CITIES
// ───────────────────────────────────────────────────────────── */
// const rovigo: CitySeoData = {
//   citySlug: 'rovigo',
//   ogImage: '/images/og/rifacimento-tetto-rovigo.png',
//   beforeImage: '/images/cities/rovigo-before.png',
//   afterImage: '/images/cities/rovigo-after.png',
//   mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46175!2d11.7903!3d45.0710!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb8000000001%3A0x1!2sRovigo%20RO!5e0!3m2!1sit!2sit!4v1700000000000',
//   mapsCaption: 'Interveniamo a Rovigo e in tutto il Polesine',
//   heroLongText: "A Rovigo, nel cuore del Polesine, il clima umido della pianura padana con frequenti nebbie e l'escursione termica tra estate e inverno degradano rapidamente le coperture in laterizio. Tetto94 opera a Rovigo con materiali certificati per climi umidi continentali e interventi completi senza ponteggi, garanzia scritta 10 anni inclusa.",
//   priceIntro: "Il costo del rifacimento tetto a Rovigo parte da 6.500€ per un'abitazione standard del Polesine. Preventivo gratuito entro 24 ore con ispezione drone inclusa.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Rovigo',
//     intro: "Nelle abitazioni e nei rustici del Polesine, il montaggio di un ponteggio su terreni agricoli e nei centri storici rodigini richiede permessi complessi. Tetto94 opera con rope access certificato: nessun ponteggio, intervento rapido, risparmio garantito.",
//     vantaggi: [
//       'Nessun permesso di occupazione suolo nei centri storici polesani',
//       'Risparmio fino all\'80% rispetto al costo del ponteggio tradizionale',
//       'Intervento completato in 2–3 giorni senza intralciare il terreno circostante',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   costiTotali: [
//     { superficie: '~60 mq', prezzoMin: '€ 4.800', prezzoMax: '€ 7.200', note: 'Casa singola piano terra' },
//     { superficie: '~80 mq', prezzoMin: '€ 5.800', prezzoMax: '€ 9.600', note: 'Abitazione standard Polesine' },
//     { superficie: '~100 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 12.000', note: 'Villa unifamiliare' },
//     { superficie: '~130 mq', prezzoMin: '€ 8.500', prezzoMax: '€ 15.500', note: 'Rustico o casolare agricolo' },
//     { superficie: '~160 mq', prezzoMin: '€ 10.500', prezzoMax: '€ 19.000', note: 'Villa grande o capannone' },
//   ],
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
//     { tipo: 'Impermeabilizzazione con guaina', prezzoMin: '€ 2.800', prezzoMax: '€ 7.500', note: 'Per m² da 35€ a 95€' },
//     { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
//     { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
//     { tipo: 'Pulizia e manutenzione grondaie', prezzoMin: '€ 180', prezzoMax: '€ 600', note: 'Per abitazione unifamiliare' },
//   ],
//   comuniCoperti: [
//     'Rovigo', 'Adria', 'Porto Viro', 'Taglio di Po', 'Porto Tolle',
//     'Badia Polesine', 'Lendinara', 'Occhiobello', 'Castelmassa', 'Ficarolo',
//     'Gavello', 'Ceregnano', 'Villamarzana', 'Fratta Polesine', 'Guarda Veneta',
//     'San Martino di Venezze', 'Pontecchio Polesine', 'Arquà Polesine', 'Costa di Rovigo', 'Villanova del Ghebbo',
//   ],
//   materiali: [
//     { nome: 'Tegole in laterizio anti-umido', descrizione: 'Tegole in cotto certificato con bassa porosità e trattamento idrofugo', adatto: 'Resistono all\'umidità persistente del Polesine e alle frequenti nebbie del Po' },
//     { nome: 'Guaina bituminosa rinforzata', descrizione: 'Membrana polimerica SBS con armatura in poliestere', adatto: 'Massima tenuta idraulica per le abbondanti precipitazioni della pianura padana rodigina' },
//     { nome: 'Coibentazione in lana di roccia', descrizione: 'Isolante termoacustico resistente all\'umidità e traspirante', adatto: 'Contrasta le escursioni termiche estive e le gelate invernali tipiche del clima continentale polesano' },
//   ],
//   bonus: [
//     { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate. Applicabile a rifacimento tetto abitazione principale.' },
//     { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Per interventi con miglioramento classe energetica. Include isolamento sottotetto.' },
//     { nome: 'Sismabonus — Zona 3', percentuale: '70%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Rovigo è zona sismica 3. Combinabile con Bonus Ristrutturazione.' },
//   ],
//   faqExtra: [
//     { q: 'Quanto costa il rifacimento tetto a Rovigo per 100 mq?', a: 'Per una superficie di 100 mq a Rovigo, il costo del rifacimento tetto completo è compreso tra 6.500€ e 12.000€, IVA inclusa e smaltimento incluso. Il prezzo finale dipende dal tipo di materiale e dalla pendenza della falda. Tetto94 offre preventivo gratuito entro 24 ore con sopralluogo drone.' },
//     { q: 'Operate anche nei comuni del Delta del Po?', a: 'Sì, operiamo in tutto il Polesine inclusi Porto Tolle, Porto Viro, Taglio di Po e i comuni del Delta del Po. Per le abitazioni in zona umida usiamo materiali specifici con trattamento anti-corrosione rinforzato.' },
//     { q: 'Qual è il periodo migliore per rifare il tetto a Rovigo?', a: 'A Rovigo il periodo ideale va da aprile a ottobre, quando le condizioni meteo sono stabili. Evitiamo i mesi invernali per le frequenti gelate notturne che compromettono la posa degli impermeabilizzanti. Tetto94 garantisce lavori ultimati entro la data concordata.' },
//   ],
// }

// const belluno: CitySeoData = {
//   citySlug: 'belluno',
//   ogImage: '/images/og/rifacimento-tetto-belluno.png',
//   beforeImage: '/images/cities/belluno-before.png',
//   afterImage: '/images/cities/belluno-after.png',
//   mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44568!2d12.2170!3d46.1400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477830000000001%3A0x1!2sBelluno%20BL!5e0!3m2!1sit!2sit!4v1700000000000',
//   mapsCaption: 'Interveniamo a Belluno e in tutte le Dolomiti',
//   heroLongText: "A Belluno, il clima alpino dolomitico con nevicate abbondanti (fino a 200 cm annui) e gelate prolungate rappresenta la sfida principale per le coperture. Tetto94 opera a Belluno con materiali certificati per carichi neve fino a 3 kN/m², tegole anti-gelo classe F e sistemi di impermeabilizzazione rinforzati per le temperature sotto zero.",
//   priceIntro: "Il costo del rifacimento tetto a Belluno parte da 6.500€ con materiali certificati per il clima alpino dolomitico. Preventivo gratuito con drone entro 24 ore — operiamo anche nelle frazioni montane più isolate.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Belluno',
//     intro: "In montagna e nei borghi dolomitici, il montaggio di un ponteggio tradizionale su terreno in pendenza è complesso, costoso e spesso impossibile. Tetto94 utilizza rope access certificato per interventi alpini: accediamo direttamente dalla cresta, senza ponteggio, anche sulle coperture più ripide.",
//     vantaggi: [
//       'Accesso garantito anche su coperture alpine ripide e borghi montani inaccessibili',
//       'Risparmio fino all\'80% — i ponteggi in montagna costano il doppio rispetto alla pianura',
//       'Nessun danno al terreno in pendenza o ai giardini montani circostanti',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   costiTotali: [
//     { superficie: '~60 mq', prezzoMin: '€ 5.200', prezzoMax: '€ 8.000', note: 'Casa di montagna piccola' },
//     { superficie: '~80 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 10.500', note: 'Abitazione standard dolomitica' },
//     { superficie: '~100 mq', prezzoMin: '€ 7.500', prezzoMax: '€ 13.500', note: 'Villa o chalet' },
//     { superficie: '~130 mq', prezzoMin: '€ 9.500', prezzoMax: '€ 17.000', note: 'Malghe o edifici alpini ampi' },
//     { superficie: '~160 mq', prezzoMin: '€ 12.000', prezzoMax: '€ 21.000', note: 'Grande chalet o struttura turistica' },
//   ],
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole anti-gelo)', prezzoMin: '€ 6.500', prezzoMax: '€ 15.000', note: 'Materiali certificati classe F (-40°C)' },
//     { tipo: 'Rifacimento con lastre in ardesia', prezzoMin: '€ 8.000', prezzoMax: '€ 18.000', note: 'Materiale tradizionale dolomitico' },
//     { tipo: 'Impermeabilizzazione rinforzata', prezzoMin: '€ 3.200', prezzoMax: '€ 8.500', note: 'Guaina anti-gelo per tetti piani' },
//     { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 350', prezzoMax: '€ 1.400', note: 'Anche in quota senza ponteggio' },
//     { tipo: 'Riparazione da danno neve/ghiaccio', prezzoMin: '€ 500', prezzoMax: '€ 3.000', note: 'Intervento urgente post-nevicata' },
//   ],
//   comuniCoperti: [
//     'Belluno', 'Feltre', 'Sedico', 'Ponte nelle Alpi', 'Longarone',
//     'Pieve di Cadore', 'Cortina d\'Ampezzo', 'Auronzo di Cadore', 'San Vito di Cadore', 'Calalzo di Cadore',
//     'Agordo', 'Zoldo Alto', 'Forno di Zoldo', 'Mel', 'Limana',
//     'Sovramonte', 'Pedavena', 'Sospirolo', 'Cesiomaggiore', 'Alano di Piave',
//   ],
//   materiali: [
//     { nome: 'Tegole in laterizio classe F anti-gelo', descrizione: 'Tegole certificate per temperature fino a -40°C con assorbimento idrico < 6%', adatto: 'Obbligatorio per le coperture dolomitiche soggette a cicli gelo-disgelo ripetuti e carichi neve importanti' },
//     { nome: 'Lastre in ardesia naturale', descrizione: 'Materiale tradizionale delle Dolomiti, resistente a grandine e variazioni termiche estreme', adatto: 'Materiale storico dei borghi bellunesi, massima durata in ambienti alpini aggressivi' },
//     { nome: 'Guaina SBS rinforzata anti-gelo', descrizione: 'Membrana bituminosa modificata con elastomero, flessibile fino a -25°C', adatto: 'Unica soluzione efficace per tetti piani in alta quota soggetti a lunghi periodi con temperature sotto zero' },
//   ],
//   bonus: [
//     { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate. Valido per prima e seconda casa.' },
//     { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Particolarmente vantaggioso in montagna per l\'isolamento termico invernale.' },
//     { nome: 'Bonus Sismabonus — Zona 2', percentuale: '80%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Belluno è zona sismica 2 (maggior rischio) — detrazione più alta rispetto alla pianura.' },
//   ],
//   faqExtra: [
//     { q: 'Quanto costa rifare il tetto a Belluno con neve e clima alpino?', a: 'A Belluno il rifacimento tetto parte da 6.500€ per abitazioni standard, con un leggero incremento (10–15%) per l\'utilizzo di materiali anti-gelo certificati classe F obbligatori in zona dolomitica. Il prezzo include smaltimento, drone e garanzia 10 anni.' },
//     { q: 'Operate anche nelle frazioni di montagna sopra i 1000 metri?', a: 'Sì, operiamo in tutto il territorio bellunese incluse le frazioni alpine fino a 2000 metri. Utilizziamo rope access certificato per montagna che ci permette di raggiungere anche le abitazioni più isolate senza necessità di strade di accesso per i ponteggi.' },
//     { q: 'Qual è il periodo migliore per rifare il tetto a Belluno?', a: 'A Belluno operiamo da aprile a ottobre. I mesi invernali sono sconsigliati per le gelate notturne che impediscono la corretta posa degli impermeabilizzanti. In caso di urgenza post-nevicata, interveniamo in emergenza tutto l\'anno.' },
//   ],
// }

// const chioggia: CitySeoData = {
//   citySlug: 'chioggia',
//   ogImage: '/images/og/rifacimento-tetto-chioggia.png',
//   beforeImage: '/images/cities/chioggia-before.png',
//   afterImage: '/images/cities/chioggia-after.png',
//   mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23125!2d12.2785!3d45.2194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb0000000002%3A0x2!2sChioggia%20VE!5e0!3m2!1sit!2sit!4v1700000000000',
//   mapsCaption: 'Interveniamo a Chioggia, Sottomarina e in tutta la laguna sud',
//   heroLongText: "A Chioggia, la Piccola Venezia, il microclima lagunare con salsedine intensa e umidità superiore al 85% corrode le coperture in laterizio fino al 50% più rapidamente rispetto alle zone interne. Tetto94 opera a Chioggia con materiali anti-salino certificati e tecniche di accesso su fune per calli e canaletti dove i ponteggi sono impossibili.",
//   priceIntro: "Il costo per impermeabilizzare o rifare il tetto a Chioggia parte da 6.500€ per 100 mq. Materiali anti-salsedine, garanzia 10 anni e ispezione drone inclusi nel preventivo.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Chioggia',
//     intro: "A Chioggia, come a Venezia, le calli strette e i canali rendono il montaggio di ponteggi tradizionali praticamente impossibile. Tetto94 opera con rope access certificato adattato al contesto lagunare: accediamo dai tetti senza occupare suolo pubblico nelle calli.",
//     vantaggi: [
//       'Unica soluzione possibile nelle calli strette della Piccola Venezia — senza ponteggi',
//       'Risparmio fino all\'80% sul costo del ponteggio: più budget per materiali anti-salino di qualità',
//       'Nessuna occupazione dei canali o degli spazi comuni nelle calli chioggiotte',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   costiTotali: [
//     { superficie: '~60 mq', prezzoMin: '€ 4.800', prezzoMax: '€ 7.500', note: 'Casa lagunare storica' },
//     { superficie: '~80 mq', prezzoMin: '€ 5.800', prezzoMax: '€ 9.800', note: 'Abitazione standard Chioggia' },
//     { superficie: '~100 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 12.500', note: 'Villa o edificio sul lungomare' },
//     { superficie: '~130 mq', prezzoMin: '€ 8.500', prezzoMax: '€ 16.000', note: 'Edificio storico o B&B' },
//     { superficie: '~160 mq', prezzoMin: '€ 10.500', prezzoMax: '€ 19.500', note: 'Edificio commerciale o grande villa' },
//   ],
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole anti-salino)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.500', note: 'Materiali con trattamento anti-corrosione salina' },
//     { tipo: 'Impermeabilizzazione con guaina marina', prezzoMin: '€ 3.200', prezzoMax: '€ 8.000', note: 'Guaina polimerica resistente alla salsedine' },
//     { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
//     { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
//     { tipo: 'Pulizia grondaie e pluviali', prezzoMin: '€ 180', prezzoMax: '€ 650', note: 'Pulizia incrostazioni saline' },
//   ],
//   comuniCoperti: [
//     'Chioggia', 'Sottomarina', 'Cavarzere', 'Cona', 'Correzzola',
//     'Codevigo', 'Pontelongo', 'Piove di Sacco', 'Arzergrande', 'Brondolo',
//     'Isolaverde', 'Ca\' Lino', 'Sant\'Anna di Chioggia', 'Valli di Chioggia', 'Scardovari',
//     'Rosolina', 'Porto Tolle', 'Loreo', 'Adria', 'Taglio di Po',
//   ],
//   materiali: [
//     { nome: 'Coppi in cotto smaltato anti-salino', descrizione: 'Tegole tradizionali con doppio strato di smalto protettivo anti-cloruro', adatto: 'Resistono alla corrosione salina aggressiva della laguna di Chioggia — durata garantita 25+ anni in ambiente marino' },
//     { nome: 'Guaina polimerica marina FPO', descrizione: 'Membrana sintetica a base di poliolefine, massima resistenza chimica agli agenti marini', adatto: 'Soluzione top per tetti piani di Chioggia esposti a salsedine, UV marini e cicli umido-secco lagunari' },
//     { nome: 'Ventilazione sottotetto rinforzata', descrizione: 'Sistema di ventilazione passiva con membrane traspiranti anti-umido', adatto: 'Fondamentale per gli edifici lagunari dove l\'umidità relativa supera l\'85% — previene condensa e muffa sottotetto' },
//   ],
//   bonus: [
//     { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate annuali.' },
//     { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Include isolamento termico — particolarmente utile per ridurre l\'umidità in edifici lagunari.' },
//     { nome: 'Bonus Barriere Architettoniche', percentuale: '75%', massimale: '€ 50.000', scadenza: '31/12/2025', note: 'Applicabile se l\'intervento include miglioramenti di accessibilità.' },
//   ],
//   faqExtra: [
//     { q: 'Quanto costa impermeabilizzare 100 mq a Chioggia?', a: 'A Chioggia, impermeabilizzare un tetto di 100 mq con guaina polimerica marina costa tra 3.500€ e 8.000€. Per un rifacimento completo con tegole anti-salino la stima sale a 6.500€–12.500€. Tutti i prezzi includono IVA, smaltimento del vecchio manto e garanzia 10 anni.' },
//     { q: 'Operate anche a Sottomarina e nelle isole lagunari?', a: 'Sì, operiamo a Chioggia, Sottomarina, Brondolo, Isolaverde e in tutte le isole e le frazioni lagunari accessibili. Per le isole con accesso solo via acqua organizziamo trasporto materiali con barca — costo aggiuntivo concordato nel preventivo.' },
//     { q: 'Come si proteggono i tetti dall\'umidità della laguna di Chioggia?', a: 'Utilizziamo un sistema a tre strati: guaina impermeabilizzante anti-salino, membrana traspirante per la ventilazione e tegole con trattamento anti-cloruro. Questo sistema garantisce massima protezione dall\'umidità lagunare con durata minima 20 anni.' },
//   ],
// }

// const mirano: CitySeoData = {
//   citySlug: 'mirano',
//   ogImage: '/images/og/rifacimento-tetto-mirano.png',
//   beforeImage: '/images/cities/mirano-before.png',
//   afterImage: '/images/cities/mirano-after.png',
//   mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22840!2d12.1065!3d45.4953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb2000000003%3A0x3!2sMirano%20VE!5e0!3m2!1sit!2sit!4v1700000000000',
//   mapsCaption: 'Interveniamo a Mirano, nel Miranese e nella Riviera del Brenta',
//   heroLongText: "A Mirano, nel cuore del Miranese e a pochi chilometri dalla Riviera del Brenta, il patrimonio di ville venete e case coloniche richiede competenze specifiche nel rispetto dei materiali storici. Tetto94 opera a Mirano con rifacimenti tetto completi a partire da 6.500€, utilizzando materiali compatibili con i vincoli paesaggistici delle ville venete.",
//   priceIntro: "Il costo del rifacimento tetto a Mirano parte da 6.500€ per abitazioni standard. Per le ville venete della Riviera del Brenta, il preventivo viene definito dopo sopralluogo drone gratuito.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Mirano',
//     intro: "Nelle ville venete e nelle case coloniche del Miranese, un ponteggio tradizionale rovina il giardino, danneggia le recinzioni storiche e richiede settimane di allestimento. Tetto94 opera con rope access certificato: accesso diretto dalla copertura, zero danni al giardino, lavori ultimati in 2–4 giorni.",
//     vantaggi: [
//       'Zero danni ai giardini e alle recinzioni storiche delle ville del Miranese',
//       'Risparmio fino all\'80% rispetto al ponteggio — budget per materiali di qualità superiore',
//       'Nessuna autorizzazione paesaggistica per il ponteggio sulle ville vincolate',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   costiTotali: [
//     { superficie: '~60 mq', prezzoMin: '€ 4.600', prezzoMax: '€ 7.200', note: 'Casa singola standard' },
//     { superficie: '~80 mq', prezzoMin: '€ 5.600', prezzoMax: '€ 9.500', note: 'Abitazione unifamiliare Miranese' },
//     { superficie: '~100 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 12.000', note: 'Villa o casa colonica' },
//     { superficie: '~130 mq', prezzoMin: '€ 8.200', prezzoMax: '€ 15.500', note: 'Villa veneta con vincoli paesaggistici' },
//     { superficie: '~160 mq', prezzoMin: '€ 10.000', prezzoMax: '€ 19.000', note: 'Villa storica Riviera del Brenta' },
//   ],
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
//     { tipo: 'Impermeabilizzazione con guaina', prezzoMin: '€ 2.800', prezzoMax: '€ 7.500', note: 'Per m² da 35€ a 95€' },
//     { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
//     { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
//     { tipo: 'Pulizia e manutenzione grondaie', prezzoMin: '€ 180', prezzoMax: '€ 600', note: 'Per abitazione unifamiliare' },
//   ],
//   comuniCoperti: [
//     'Mirano', 'Santa Maria di Sala', 'Martellago', 'Spinea', 'Salzano',
//     'Noale', 'Vigonovo', 'Pianiga', 'Dolo', 'Mira',
//     'Fiesso d\'Artico', 'Strà', 'Fossò', 'Campagna Lupia', 'Campolongo Maggiore',
//     'Chioggia', 'Cona', 'Codevigo', 'Piove di Sacco', 'Correzzola',
//   ],
//   materiali: [
//     { nome: 'Coppi in cotto naturale', descrizione: 'Tegole tradizionali in laterizio non trattato per ville con vincolo paesaggistico', adatto: 'Materiale richiesto dalla Soprintendenza per le ville venete della Riviera del Brenta — aspetto storico garantito' },
//     { nome: 'Tegole portoghesi in laterizio', descrizione: 'Profilo ad onda irregolare tipico delle case coloniche del Miranese', adatto: 'Perfette per il recupero filologico dei rustici e delle case coloniche del territorio' },
//     { nome: 'Isolamento in sughero naturale', descrizione: 'Pannelli in sughero espanso certificato per cappotti di tetto', adatto: 'Materiale naturale e traspirante ideale per edifici storici vincolati dove si vuole migliorare l\'efficienza energetica senza alterare l\'estetica' },
//   ],
//   bonus: [
//     { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate annuali.' },
//     { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Per interventi con miglioramento classe energetica, incluso isolamento sottotetto.' },
//     { nome: 'Bonus Facciate 60%', percentuale: '60%', massimale: '€ 60.000', scadenza: '31/12/2025', note: 'Applicabile se l\'intervento include il rifacimento grondaie e pluviali.' },
//   ],
//   faqExtra: [
//     { q: 'Rifacimento tetto ville venete a Mirano: serve l\'autorizzazione della Soprintendenza?', a: 'Per le ville della Riviera del Brenta sottoposte a vincolo paesaggistico, il rifacimento deve usare materiali identici agli originali (coppi in cotto naturale) e richiedere parere preventivo della Soprintendenza. Tetto94 gestisce l\'intero iter burocratico — ci occupiamo noi della pratica, voi aspettate il risultato.' },
//     { q: 'Quanto si risparmia con il Bonus Ristrutturazione 50% a Mirano?', a: 'Su un rifacimento tetto da 10.000€ a Mirano, il Bonus Ristrutturazione 50% garantisce 5.000€ di detrazione IRPEF in 10 anni (500€/anno). Se si aggiunge l\'Ecobonus 65% per l\'isolamento, il risparmio totale può superare il 60% del costo dell\'intervento.' },
//     { q: 'Operate anche a Dolo, Mira e lungo la Riviera del Brenta?', a: 'Sì, operiamo in tutto il Miranese e lungo la Riviera del Brenta: Dolo, Mira, Fiesso d\'Artico, Strà, Stra. Interveniamo anche sulle ville storiche vincolate con materiali approvati dalla Soprintendenza.' },
//   ],
// }

// const sanDonadiPiave: CitySeoData = {
//   citySlug: 'san-dona-di-piave',
//   ogImage: '/images/og/rifacimento-tetto-san-dona-di-piave.png',
//   beforeImage: '/images/cities/san-dona-di-piave-before.png',
//   afterImage: '/images/cities/san-dona-di-piave-after.png',
//   mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22640!2d12.5651!3d45.6280!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477ec0000000004%3A0x4!2sSan%20Don%C3%A0%20di%20Piave%20VE!5e0!3m2!1sit!2sit!4v1700000000000',
//   mapsCaption: 'Interveniamo a San Donà di Piave e in tutta la Venezia Orientale',
//   heroLongText: "A San Donà di Piave, capoluogo della Venezia Orientale, il clima pianeggiante con venti da est e precipitazioni concentrate richiede coperture con ottima tenuta idraulica. Tetto94 opera a San Donà di Piave a partire da 6.500€ con materiali certificati CE, ispezione drone gratuita e garanzia scritta 10 anni.",
//   priceIntro: "Il costo del rifacimento tetto a San Donà di Piave parte da 6.500€ per abitazioni standard della Venezia Orientale. Preventivo gratuito entro 24 ore, smaltimento e garanzia inclusi.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a San Donà di Piave',
//     intro: "Nei quartieri residenziali di San Donà di Piave e dei comuni circostanti, un ponteggio tradizionale occupa il passo carraio o il giardino per settimane. Tetto94 opera con rope access certificato: nessuna occupazione del suolo, lavori completati in 2–3 giorni.",
//     vantaggi: [
//       'Nessuna occupazione del passo carraio o del giardino durante i lavori',
//       'Risparmio fino all\'80% rispetto al costo del ponteggio tradizionale',
//       'Intervento rapido: 2–3 giorni contro le 2 settimane con ponteggio',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   costiTotali: [
//     { superficie: '~60 mq', prezzoMin: '€ 4.500', prezzoMax: '€ 7.000', note: 'Casa singola standard' },
//     { superficie: '~80 mq', prezzoMin: '€ 5.500', prezzoMax: '€ 9.200', note: 'Abitazione unifamiliare' },
//     { superficie: '~100 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 11.500', note: 'Villa unifamiliare' },
//     { superficie: '~130 mq', prezzoMin: '€ 8.000', prezzoMax: '€ 14.800', note: 'Villetta con ampio tetto' },
//     { superficie: '~160 mq', prezzoMin: '€ 10.000', prezzoMax: '€ 18.500', note: 'Grande villa o capannone' },
//   ],
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
//     { tipo: 'Impermeabilizzazione con guaina', prezzoMin: '€ 2.800', prezzoMax: '€ 7.500', note: 'Per m² da 35€ a 95€' },
//     { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
//     { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
//     { tipo: 'Pulizia e manutenzione grondaie', prezzoMin: '€ 180', prezzoMax: '€ 600', note: 'Per abitazione unifamiliare' },
//   ],
//   comuniCoperti: [
//     'San Donà di Piave', 'Musile di Piave', 'Noventa di Piave', 'Ceggia', 'Torre di Mosto',
//     'Jesolo', 'Cavallino-Treporti', 'Eraclea', 'Caorle', 'Portogruaro',
//     'San Stino di Livenza', 'Annone Veneto', 'Concordia Sagittaria', 'Fossalta di Piave', 'Meolo',
//     'Quarto d\'Altino', 'Marcon', 'Mogliano Veneto', 'Zero Branco', 'Preganziol',
//   ],
//   materiali: [
//     { nome: 'Tegole in laterizio rinforzato', descrizione: 'Tegole in cotto ad alta resistenza all\'acqua con superficie impermeabilizzante', adatto: 'Ottima tenuta idraulica per le precipitazioni concentrate della pianura veneta orientale' },
//     { nome: 'Guaina bituminosa APP 4 mm', descrizione: 'Membrana bituminosa armata con fibre di poliestere, alta resistenza meccanica', adatto: 'Standard per abitazioni della Venezia Orientale — massima durata con manutenzione minima' },
//     { nome: 'Pannelli isolanti PIR', descrizione: 'Poliisocianurato espanso con ottimo rapporto spessore/prestazione', adatto: 'Ideale per migliorare l\'efficienza energetica degli edifici anni \'70–\'90 di San Donà e accedere ai bonus fiscali' },
//   ],
//   bonus: [
//     { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate annuali.' },
//     { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Per interventi con miglioramento classe energetica.' },
//     { nome: 'Sismabonus — Zona 3', percentuale: '70%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'San Donà di Piave è zona sismica 3. Combinabile con altri bonus.' },
//   ],
//   faqExtra: [
//     { q: 'Quanto costa il rifacimento tetto a San Donà di Piave per 100 mq?', a: 'Per 100 mq a San Donà di Piave il costo del rifacimento tetto completo è compreso tra 6.500€ e 11.500€, IVA e smaltimento inclusi. Il preventivo gratuito viene fornito entro 24 ore con sopralluogo drone.' },
//     { q: 'Operate anche a Jesolo, Caorle e nella costa veneziana orientale?', a: 'Sì, operiamo in tutta la Venezia Orientale: Jesolo, Caorle, Eraclea, Cavallino-Treporti e Portogruaro. Per le abitazioni in zona balneare utilizziamo materiali con trattamento anti-umidità e anti-salsedine.' },
//     { q: 'Quanto tempo ci vuole per rifare il tetto a San Donà di Piave?', a: 'Per un\'abitazione standard di 80–100 mq a San Donà di Piave i lavori durano 3–5 giorni con il nostro sistema senza ponteggio. Con ponteggio tradizionale i tempi si allungherebbero di 1–2 settimane solo per montaggio e smontaggio.' },
//   ],
// }

// const moglianoVeneto: CitySeoData = {
//   citySlug: 'mogliano-veneto',
//   ogImage: '/images/og/rifacimento-tetto-mogliano-veneto.png',
//   beforeImage: '/images/cities/mogliano-veneto-before.png',
//   afterImage: '/images/cities/mogliano-veneto-after.png',
//   mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22500!2d12.2375!3d45.5650!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477ec4000000005%3A0x5!2sMogliano%20Veneto%20TV!5e0!3m2!1sit!2sit!4v1700000000000',
//   mapsCaption: 'Interveniamo a Mogliano Veneto e lungo il Terraglio',
//   heroLongText: "A Mogliano Veneto, lungo lo storico Terraglio che collega Venezia a Treviso, il tessuto urbanistico di ville e residenze di pregio richiede rifacimenti tetto di alta qualità. Tetto94 opera a Mogliano Veneto a partire da 6.500€ con materiali premium, ispezione drone gratuita e garanzia scritta 10 anni per preservare il valore delle abitazioni di questa zona residenziale esclusiva.",
//   priceIntro: "Il costo del rifacimento tetto a Mogliano Veneto parte da 6.500€. Per le ville lungo il Terraglio il preventivo viene definito dopo sopralluogo drone gratuito con relazione tecnica inclusa.",
//   senzaPonteggi: {
//     titolo: 'Lavoriamo senza ponteggi a Mogliano Veneto',
//     intro: "Nelle ville e nelle residenze di pregio lungo il Terraglio, un ponteggio tradizionale deturpa l\'estetica dell\'edificio per settimane e occupa il giardino. Tetto94 opera con rope access certificato: invisibile dalla strada, zero impatto sul giardino, massimo rispetto per le residenze esclusive del Terraglio.",
//     vantaggi: [
//       'Zero impatto visivo sull\'estetica delle ville esclusive lungo il Terraglio',
//       'Risparmio fino all\'80% sul ponteggio — investimento per materiali premium',
//       'Nessun danno ai giardini e alle pavimentazioni delle ville di pregio',
//     ],
//     risparmio: 'fino all\'80%',
//   },
//   costiTotali: [
//     { superficie: '~60 mq', prezzoMin: '€ 4.800', prezzoMax: '€ 7.500', note: 'Casa singola standard' },
//     { superficie: '~80 mq', prezzoMin: '€ 5.800', prezzoMax: '€ 9.800', note: 'Abitazione unifamiliare Mogliano' },
//     { superficie: '~100 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 12.500', note: 'Villa residenziale Terraglio' },
//     { superficie: '~130 mq', prezzoMin: '€ 8.500', prezzoMax: '€ 16.500', note: 'Villa di pregio o residence' },
//     { superficie: '~160 mq', prezzoMin: '€ 10.500', prezzoMax: '€ 20.000', note: 'Grande villa o edificio di lusso' },
//   ],
//   prezzi: [
//     { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
//     { tipo: 'Impermeabilizzazione premium', prezzoMin: '€ 3.200', prezzoMax: '€ 8.500', note: 'Guaina FPO di ultima generazione' },
//     { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
//     { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
//     { tipo: 'Manutenzione programmata annuale', prezzoMin: '€ 250', prezzoMax: '€ 800', note: 'Ideale per ville di pregio' },
//   ],
//   comuniCoperti: [
//     'Mogliano Veneto', 'Preganziol', 'Zero Branco', 'Casale sul Sile', 'Casier',
//     'Silea', 'Quinto di Treviso', 'Treviso', 'Marcon', 'Quarto d\'Altino',
//     'Venezia Mestre', 'Spinea', 'Martellago', 'Noale', 'Salzano',
//     'Musile di Piave', 'San Donà di Piave', 'Roncade', 'Meolo', 'Fossalta di Piave',
//   ],
//   materiali: [
//     { nome: 'Tegole in cotto premium portoghese', descrizione: 'Tegole di alta gamma con finitura naturale e tonalità calde per abitazioni di pregio', adatto: 'Eleva l\'estetica delle ville lungo il Terraglio mantenendo il carattere residenziale esclusivo della zona' },
//     { nome: 'Guaina FPO di ultima generazione', descrizione: 'Membrana sintetica flexi olefinica, la più avanzata sul mercato — durata garantita 30+ anni', adatto: 'Standard premium per le residenze di lusso di Mogliano Veneto che richiedono la massima durabilità senza manutenzione' },
//     { nome: 'Isolamento termico in grafite EPS', descrizione: 'Pannelli in polistirene espanso ad alta densità con grafite per massima efficienza', adatto: 'Riduce del 40% la dispersione termica del tetto, abbassa le bollette e migliora la classe energetica per i bonus fiscali' },
//   ],
//   bonus: [
//     { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate annuali.' },
//     { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Per miglioramento classe energetica — applicabile con isolamento tetto.' },
//     { nome: 'Sismabonus — Zona 3', percentuale: '70%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Mogliano Veneto è zona sismica 3. Combinabile con Bonus Ristrutturazione.' },
//   ],
//   faqExtra: [
//     { q: 'Quanto costa il rifacimento tetto a Mogliano Veneto per una villa?', a: 'Per una villa di 100–130 mq a Mogliano Veneto il costo del rifacimento tetto è compreso tra 6.500€ e 16.500€ a seconda dei materiali scelti. Per ville di pregio consigliamo tegole in cotto premium o guaina FPO con garanzia 30 anni. Preventivo drone gratuito entro 24 ore.' },
//     { q: 'Qual è il periodo migliore per rifare il tetto a Mogliano Veneto?', a: 'A Mogliano Veneto il periodo ideale è da aprile a ottobre. Preferiamo evitare i mesi più piovosi (novembre-marzo) per garantire condizioni di posa ottimali. Tetto94 pianifica i lavori con precisione: vi confermiamo la data di inizio entro 48 ore dall\'accettazione del preventivo.' },
//     { q: 'Operate anche a Preganziol, Zero Branco e nei comuni del Terraglio?', a: 'Sì, operiamo in tutta l\'area del Terraglio e nei comuni limitrofi: Preganziol, Zero Branco, Casale sul Sile, Casier e Silea. Offriamo lo stesso servizio premium di Mogliano — sopralluogo drone, preventivo fisso e garanzia 10 anni — in tutto il comprensorio.' },
//   ],
// }

// /* ─────────────────────────────────────────────────────────────
//    EXPORTED MAP — extensible: add new cities by adding to this map
//    Key = LocationConfig.slug
// ───────────────────────────────────────────────────────────── */
// export const CITY_SEO_DATA: Record<string, CitySeoData> = {
//   venezia,
//   mestre,
//   padova,
//   treviso,
//   verona,
//   vicenza,
//   rovigo,
//   belluno,
//   chioggia,
//   mirano,
//   'san-dona-di-piave': sanDonadiPiave,
//   'mogliano-veneto': moglianoVeneto,
// }

// /** Returns city SEO data if available for this slug */
// export function getCitySeoData(slug: string): CitySeoData | undefined {
//   return CITY_SEO_DATA[slug]
// }



/**
 * Tetto94 — City SEO Data Layer
 * Extended data for rifacimento-tetto pages targeting the 6 priority cities.
 * Structured to be extensible: add more cities by following the same interface.
 *
 * Data used by: CitySeoSections component + page.tsx metadata/schema
 */

export interface CityPriceRow {
  tipo: string          // "Rifacimento completo (tegole/coppi)"
  prezzoMin: string     // "€ 6.500"
  prezzoMax: string     // "€ 14.000"
  note: string          // "IVA inclusa, smaltimento incluso"
}

export interface CityMaterial {
  nome: string
  descrizione: string
  adatto: string        // why this material is good for THIS city climate
}

export interface CityBonus {
  nome: string          // "Superbonus 90%"
  percentuale: string   // "50%"
  massimale: string     // "€ 96.000"
  scadenza: string      // "31/12/2025"
  note: string
}

export interface CityFaqExtra {
  q: string
  a: string
}

export interface CityTotalCostRow {
  superficie: string    // "~80 mq"
  prezzoMin: string     // "€ 5.800"
  prezzoMax: string     // "€ 9.600"
  note: string
}

export interface CitySenzaPonteggi {
  titolo: string        // "Lavoriamo senza ponteggi a Venezia"
  intro: string         // 1–2 sentences on why no scaffolding matters HERE
  vantaggi: string[]    // 3 bullet benefits
  risparmio: string     // "fino all'80%"
}

export interface CitySeoData {
  citySlug: string                    // must match LocationConfig.slug
  /** Dedicated SERP description for indexed city pages. */
  metaDescription?: string
  ogImage: string

                       // /images/og/rifacimento-tetto-{slug}.png
  beforeImage: string                 // /images/cities/{slug}-before.png
  afterImage: string                  // /images/cities/{slug}-after.png
  mapsEmbedSrc: string                // Google Maps embed URL (no API key needed)
  mapsCaption?: string                // "Interveniamo in tutta la provincia di [City]"
  heroLongText: string                // Extended H1 area description (2 sentences, city-specific)
  priceIntro: string                  // Sentence before price table (mention price in first sentence per SEO doc)
  prezzi: CityPriceRow[]
  costiTotali?: CityTotalCostRow[]    // Batch 2: esempi costo totale ~100mq
  senzaPonteggi: CitySenzaPonteggi    // "Lavoriamo senza ponteggi" section (required for all)
  comuniCoperti: string[]             // 15–20 comuni covered
  materiali: CityMaterial[]
  bonus: CityBonus[]
  faqExtra: CityFaqExtra[]            // 2–3 extra FAQ items city-specific
  reviewExtra?: {                     // optional 3rd review specific to city
    name: string
    city: string
    rating: number
    text: string
  }
}

/* ─────────────────────────────────────────────────────────────
   VENEZIA
───────────────────────────────────────────────────────────── */
const venezia: CitySeoData = {
  citySlug: 'venezia',
  metaDescription: 'Rifacimento tetto a Venezia da 6.500€. Interventi senza ponteggi, materiali certificati CE, ispezione drone gratuita e garanzia scritta 10 anni. Preventivo entro 24 ore.',
  ogImage: '/images/og/rifacimento-tetto-venezia.png',
  beforeImage: '/images/cities/venezia-before.png',
  afterImage: '/images/cities/venezia-after.png',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45025.49!2d12.3155!3d45.4408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb1daf1d63d89%3A0x729c36a5f91cb609!2sVenezia%20VE!5e0!3m2!1sit!2sit!4v1700000000000',
  heroLongText:
    "A Venezia, il clima lagunare con umidità superiore all'80% e la salsedine dell'aria marina degradano le coperture fino al 40% più rapidamente rispetto alle zone interne. Tetto94 opera a Venezia dal 1994 con tecniche specializzate per l'ambiente marino: materiali resistenti alla corrosione salina, sigillature rinforzate e ispezione drone per ogni intervento.",
  mapsCaption: 'Interveniamo in tutta la provincia di Venezia',
  priceIntro:
    "Il costo del rifacimento tetto a Venezia parte da 6.500€ per un'abitazione standard. I prezzi includono smaltimento, posa certificata e garanzia scritta 10 anni.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Venezia',
    intro: "A Venezia, montare ponteggi nelle calli e nei campi è spesso impossibile o richiede permessi comunali con iter lunghissimi. Tetto94 opera esclusivamente con sistemi di accesso su fune (rope access) certificati, eliminando ogni necessità di impalcatura.",
    vantaggi: [
      'Nessuna occupazione di suolo pubblico nelle calli — zero pratiche al Comune',
      'Risparmio fino all\'80% rispetto al costo del ponteggio tradizionale',
      'Intervento completato in metà del tempo: meno disagio per condomini e vicini',
    ],
    risparmio: 'fino all\'80%',
  },
  prezzi: [
    { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
    { tipo: 'Impermeabilizzazione con guaina', prezzoMin: '€ 2.800', prezzoMax: '€ 7.500', note: 'Per m² da 35€ a 95€' },
    { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
    { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
    { tipo: 'Pulizia e manutenzione grondaie', prezzoMin: '€ 180', prezzoMax: '€ 600', note: 'Per abitazione unifamiliare' },
  ],
  comuniCoperti: [
    'Venezia', 'Mestre', 'Marghera', 'Murano', 'Burano', 'Lido di Venezia',
    'Chioggia', 'Jesolo', 'Cavallino-Treporti', 'Quarto d\'Altino',
    'Mirano', 'Spinea', 'Marcon', 'Dolo', 'Mira',
    'Vigonovo', 'Salzano', 'Santa Maria di Sala', 'Pianiga', 'Noale',
  ],
  materiali: [
    {
      nome: 'Tegole in cotto smaltato',
      descrizione: 'Tegole tradizionali veneziane con trattamento anti-salino in superficie',
      adatto: 'Resistono alla corrosione salina del clima marino veneziano e mantengono l\'estetica storica lagunare',
    },
    {
      nome: 'Guaina polimerica APP',
      descrizione: 'Membrana bituminosa modificata con polipropilene attattico',
      adatto: 'Massima resistenza all\'umidità persistente della laguna e alle escursioni termiche stagionali',
    },
    {
      nome: 'Coppi in terracotta naturale',
      descrizione: 'Coppi tradizionali in cotto non trattato per edifici storici con vincolo paesaggistico',
      adatto: 'Obbligatori per molti edifici del centro storico veneziano soggetti a vincolo della Soprintendenza',
    },
  ],
  bonus: [
    {
      nome: 'Bonus Ristrutturazione 50%',
      percentuale: '50%',
      massimale: '€ 96.000',
      scadenza: '31/12/2025',
      note: 'Detrazione IRPEF in 10 rate annuali. Applicabile a rifacimento tetto abitazione principale.',
    },
    {
      nome: 'Ecobonus 65%',
      percentuale: '65%',
      massimale: '€ 100.000',
      scadenza: '31/12/2025',
      note: 'Per interventi con miglioramento classe energetica. Include isolamento sottotetto.',
    },
    {
      nome: 'Sismabonus',
      percentuale: '70–80%',
      massimale: '€ 96.000',
      scadenza: '31/12/2025',
      note: 'Per zone sismiche. Venezia è zona 3. Combinabile con altri bonus.',
    },
  ],
  faqExtra: [
    {
      q: 'Come si rifà il tetto a Venezia senza ponteggi?',
      a: "A Venezia, l'impossibilità di montare ponteggi tradizionali in molte calle e campielli rende il nostro sistema senza ponteggi ancora più vantaggioso. Utilizziamo attrezzature specializzate per accesso in quota e drone per l'ispezione, riducendo tempi e costi del 60% rispetto ai metodi tradizionali.",
    },
    {
      q: 'Servono permessi speciali per rifare il tetto a Venezia storica?',
      a: "Sì. Per il centro storico di Venezia è spesso necessaria l'autorizzazione della Soprintendenza ai Beni Culturali. Tetto94 gestisce tutta la burocrazia: dalla CILA all'autorizzazione paesaggistica, utilizzando esclusivamente materiali approvati per le zone vincolate.",
    },
    {
      q: "L'acqua alta danneggia il tetto?",
      a: "L'acqua alta diretta non raggiunge i tetti, ma l'umidità saline e i venti marini accelerano la degradazione. Consigliamo ispezioni annuali e utilizziamo sigillanti specifici per ambienti marini che durano 3 volte di più rispetto ai prodotti standard.",
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   MESTRE
───────────────────────────────────────────────────────────── */
const mestre: CitySeoData = {
  citySlug: 'mestre',
  metaDescription: 'Rifacimento tetto a Mestre da 6.500€. Soluzioni per case e condomini, interventi senza ponteggi, ispezione drone gratuita e garanzia scritta 10 anni. Preventivo entro 24 ore.',
  ogImage: '/images/og/rifacimento-tetto-mestre.png',
  beforeImage: '/images/cities/mestre-before.png',
  afterImage: '/images/cities/mestre-after.png',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22514.0!2d12.2422!3d45.4900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb1daf1d63d89%3A0x5555!2sMestre%20VE!5e0!3m2!1sit!2sit!4v1700000000001',
  heroLongText:
    "A Mestre, il patrimonio edilizio degli anni '60–'80 presenta tetti piani con guaine bituminose spesso giunte a fine vita tecnica, causa principale di infiltrazioni nei condomini veneziani. Tetto94 è specializzata nel risanamento di questi edifici con tecnologie di impermeabilizzazione di ultima generazione e interventi rapidi senza evacuazione degli inquilini.",
  mapsCaption: 'Interveniamo a Mestre, Marghera e in tutta la terraferma veneziana',
  priceIntro:
    "Il costo del rifacimento tetto a Mestre parte da 6.500€ per abitazioni unifamiliari. Per i condomini, offriamo preventivi dedicati con gestione delle pratiche condominiali inclusa.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Mestre',
    intro: "Nei condomini di Mestre, un ponteggio tradizionale blocca i parcheggi condominiali per settimane e richiede occupazione di suolo pubblico con iter burocratici complessi. Tetto94 interviene con rope access certificato: nessun ponteggio, nessun parcheggio occupato, lavori completati in metà del tempo.",
    vantaggi: [
      'Nessuna occupazione del parcheggio condominiale durante i lavori',
      'Risparmio fino all\'80% rispetto al costo del ponteggio tradizionale',
      'Meno disturbo per i condomini: intervento silenzioso e rapido',
    ],
    risparmio: 'fino all\'80%',
  },
  prezzi: [
    { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 13.500', note: 'IVA inclusa, smaltimento incluso' },
    { tipo: 'Impermeabilizzazione tetto piano', prezzoMin: '€ 3.200', prezzoMax: '€ 8.000', note: 'Guaina polimerica + primer' },
    { tipo: 'Rifacimento tetto condominiale', prezzoMin: '€ 12.000', prezzoMax: '€ 45.000', note: 'Prezzo per intero edificio, variabile per piani' },
    { tipo: 'Sostituzione tegole parziale', prezzoMin: '€ 280', prezzoMax: '€ 1.100', note: 'Zona localizzata' },
    { tipo: 'Diagnosi infiltrazioni condominiali', prezzoMin: '€ 0', prezzoMax: '€ 0', note: 'Ispezione drone GRATUITA' },
  ],
  comuniCoperti: [
    'Mestre', 'Marghera', 'Zelarino', 'Chirignago', 'Favaro Veneto',
    'Carpenedo', 'Bissuola', 'Spinea', 'Mirano', 'Salzano',
    'Zero Branco', 'Marcon', 'Quarto d\'Altino', 'Pianiga', 'Noale',
    'Martellago', 'Scorzè', 'Vigonovo', 'Dolo', 'Mira',
  ],
  materiali: [
    {
      nome: 'Guaina ardesiata SBS',
      descrizione: 'Membrana bituminosa modificata con gomma SBS, flessibile anche a -20°C',
      adatto: 'Ideale per i tetti piani degli edifici degli anni \'60-\'80 di Mestre, resistente alle escursioni termiche padane',
    },
    {
      nome: 'Sistema EPDM monostrato',
      descrizione: 'Membrana in gomma sintetica durata prevista 50+ anni',
      adatto: 'Perfetto per grandi superfici piane condomini Mestre, riduce costi di manutenzione nel lungo periodo',
    },
    {
      nome: 'Tegole in calcestruzzo vibrato',
      descrizione: 'Tegole cementizie di alta resistenza con finitura colorata',
      adatto: 'Scelta economica e duratura per le abitazioni unifamiliari della periferia di Mestre',
    },
  ],
  bonus: [
    {
      nome: 'Bonus Ristrutturazione 50%',
      percentuale: '50%',
      massimale: '€ 96.000',
      scadenza: '31/12/2025',
      note: 'Detrazione IRPEF in 10 rate. Ideale per interventi condominiali tramite delibera assembleare.',
    },
    {
      nome: 'Superbonus Condomini',
      percentuale: '70%',
      massimale: '€ 40.000 per unità',
      scadenza: '31/12/2025',
      note: 'Per condomini con più unità abitative. Richiede miglioramento di 2 classi energetiche.',
    },
    {
      nome: 'Ecobonus 65%',
      percentuale: '65%',
      massimale: '€ 100.000',
      scadenza: '31/12/2025',
      note: 'Applicabile se il rifacimento include isolamento termico del tetto (cappotto tetto).',
    },
  ],
  faqExtra: [
    {
      q: 'Come si gestisce il rifacimento del tetto in un condominio a Mestre?',
      a: "Il rifacimento condominiale richiede delibera assembleare con maggioranza qualificata. Tetto94 supporta l'amministratore nella preparazione dei preventivi per l'assemblea, nella richiesta dei bonus fiscali e nella gestione del cantiere con interruzione minima per gli inquilini.",
    },
    {
      q: 'Quanto tempo richiede il rifacimento di un tetto piano a Mestre?',
      a: "Per un tetto piano standard di 150–250 m² il nostro intervento richiede 2–4 giorni lavorativi. Per condomini più grandi stimiamo 1–2 settimane. Lavoriamo senza ponteggi esterni, quindi non ostruiamo i parcheggi condominiali.",
    },
    {
      q: 'I lavori sul tetto creano disturbo agli inquilini a Mestre?',
      a: "I rumori sono limitati alle ore 8:00–18:00 come da normativa. Non utilizziamo fiamma libera per la posa delle guaine (sistema a freddo o ad aria calda) riducendo odori e rischi. Non è necessario evacuare gli appartamenti sottostanti.",
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   PADOVA
───────────────────────────────────────────────────────────── */
const padova: CitySeoData = {
  citySlug: 'padova',
  metaDescription: 'Rifacimento tetto a Padova da 6.500€. Materiali certificati CE, ispezione drone gratuita, gestione dei vincoli storici e garanzia scritta 10 anni. Preventivo entro 24 ore.',
  ogImage: '/images/og/rifacimento-tetto-padova.png',
  beforeImage: '/images/cities/padova-before.png',
  afterImage: '/images/cities/padova-after.png',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45204.0!2d11.8768!3d45.4064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eda6561313e2b%3A0x1%2CPadova!5e0!3m2!1sit!2sit!4v1700000000002',
  heroLongText:
    "A Padova il rifacimento tetto parte da 6.500€ e include ispezione drone gratuita, materiali certificati CE e garanzia scritta 10 anni. Il centro storico patavino e la Riviera del Brenta presentano edifici storici con coperture in tegole e coppi che richiedono interventi specializzati nel rispetto dei vincoli della Soprintendenza.",
  mapsCaption: 'Interveniamo a Padova, nella Riviera del Brenta e in tutta la provincia',
  priceIntro:
    "Il costo del rifacimento tetto a Padova parte da 6.500€ per superfici standard. Il preventivo include smaltimento dell'esistente, ispezione drone e garanzia decennale senza costi nascosti.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Padova',
    intro: "Nel centro storico di Padova, con i suoi portici tutelati dall'UNESCO, i ponteggi tradizionali creano problemi di ingombro e richiedono autorizzazioni comunali specifiche. Tetto94 usa sistemi su fune certificati che permettono di operare senza toccare i portici e senza alcuna pratica di occupazione suolo.",
    vantaggi: [
      'Nessun intralcio ai portici storici e ai passaggi pedonali tutelati UNESCO',
      'Risparmio fino all\'80% sul costo del ponteggio — meno spesa per il cliente',
      'Autorizzazione comunale non necessaria: lavori avviabili subito',
    ],
    risparmio: 'fino all\'80%',
  },
  prezzi: [
    { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 15.000', note: 'IVA inclusa, smaltimento e posa' },
    { tipo: 'Impermeabilizzazione e guaine', prezzoMin: '€ 2.500', prezzoMax: '€ 7.200', note: 'Guaina bituminosa o polimerica' },
    { tipo: 'Restauro copertura storica', prezzoMin: '€ 8.500', prezzoMax: '€ 22.000', note: 'Materiali per edifici vincolati' },
    { tipo: 'Riparazione parziale', prezzoMin: '€ 380', prezzoMax: '€ 2.200', note: 'Zona localizzata con garanzia scritta' },
    { tipo: 'Manutenzione programmata annuale', prezzoMin: '€ 250', prezzoMax: '€ 800', note: 'Ispezione + piccoli interventi' },
  ],
  comuniCoperti: [
    'Padova', 'Abano Terme', 'Montegrotto Terme', 'Albignasego', 'Selvazzano Dentro',
    'Rubano', 'Vigodarzere', 'Cadoneghe', 'Vigonza', 'Noventa Padovana',
    'Ponte San Nicolò', 'Saonara', 'Campodarsego', 'Este', 'Monselice',
    'Conselve', 'Piove di Sacco', 'Cittadella', 'Camposampiero', 'Dolo',
  ],
  materiali: [
    {
      nome: 'Coppi in cotto padovano',
      descrizione: 'Coppi tradizionali in terracotta prodotti in fornaci del territorio patavino',
      adatto: 'Rispettano i vincoli paesaggistici del centro storico e della Riviera del Brenta, con ottime prestazioni termiche',
    },
    {
      nome: 'Tegole portoghesi',
      descrizione: 'Tegole curve in cotto ad alta resistenza per coperture inclinate',
      adatto: 'Soluzione classica per le ville della Riviera del Brenta, con eccellente drenaggio delle piogge padane',
    },
    {
      nome: 'Guaina liquida poliuretanica',
      descrizione: 'Sistema impermeabilizzante liquido applicato a freddo, continuo senza giunti',
      adatto: 'Perfetto per le terrazze e i tetti piani delle abitazioni moderne di Padova, applicazione rapida senza disturbi',
    },
  ],
  bonus: [
    {
      nome: 'Bonus Ristrutturazione 50%',
      percentuale: '50%',
      massimale: '€ 96.000',
      scadenza: '31/12/2025',
      note: 'La più utilizzata a Padova. Detrazione in 10 anni, trasferibile in caso di vendita.',
    },
    {
      nome: 'Ecobonus 65%',
      percentuale: '65%',
      massimale: '€ 100.000',
      scadenza: '31/12/2025',
      note: 'Applicabile con isolamento cappotto tetto. Ottimo per le ville padovane degli anni \'70.',
    },
    {
      nome: 'Cessione del credito',
      percentuale: '50%',
      massimale: 'Variabile',
      scadenza: '31/12/2025',
      note: 'Tetto94 vi aiuta a verificare la disponibilità di cessione tramite istituti bancari convenzionati.',
    },
  ],
  faqExtra: [
    {
      q: 'Quanto costa rifare il tetto a Padova centro storico?',
      a: "Per gli edifici storici del centro di Padova il costo è superiore alla media (da 8.500€) perché richiede materiali specifici approvati dalla Soprintendenza e tecnici specializzati nel restauro. Il sopralluogo drone è sempre gratuito e il preventivo viene emesso entro 24 ore.",
    },
    {
      q: 'Operate anche nelle terme euganee vicino a Padova?',
      a: "Sì, operiamo ad Abano Terme, Montegrotto Terme e in tutti i comuni dei Colli Euganei. Le ville e gli alberghi termali richiedono spesso coperture di qualità per proteggere strutture ad alto valore economico.",
    },
    {
      q: 'Come funziona il bonus ristrutturazione per il tetto a Padova?',
      a: "Il Bonus Ristrutturazione 50% è detraibile in 10 quote annuali dall'IRPEF. Tetto94 vi fornisce tutta la documentazione necessaria: fatture con codice fiscale, descrizione lavori, pagamento con bonifico parlante. Vi assistiamo anche nella comunicazione all'Agenzia delle Entrate.",
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   TREVISO
───────────────────────────────────────────────────────────── */
const treviso: CitySeoData = {
  citySlug: 'treviso',
  metaDescription: 'Rifacimento tetto a Treviso da 6.500€. Preventivo trasparente, materiali certificati CE, interventi senza ponteggi, ispezione drone gratuita e garanzia scritta 10 anni.',
  ogImage: '/images/og/rifacimento-tetto-treviso.png',
  beforeImage: '/images/cities/treviso-before.png',
  afterImage: '/images/cities/treviso-after.png',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45122.0!2d12.2430!3d45.6669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477955b60c5f6555%3A0x1!2sTreviso%20TV!5e0!3m2!1sit!2sit!4v1700000000003',
  heroLongText:
    "A Treviso il rifacimento tetto parte da 6.500€ con garanzia decennale e ispezione drone gratuita. La Marca Trevigiana, con le sue ville storiche, i rustici e le abitazioni della campagna tra il Piave e il Montello, richiede operatori specializzati nel rispetto dei materiali tradizionali e delle normative paesaggistiche locali.",
  mapsCaption: 'Interveniamo a Treviso, nella Marca Trevigiana e in tutta la provincia',
  priceIntro:
    "Il rifacimento tetto a Treviso parte da 6.500€ tutto incluso. I prezzi sono fissi e trasparenti: nessuna sorpresa a fine lavori, preventivo gratuito entro 24 ore.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Treviso',
    intro: "Nelle ville e nei rustici della Marca Trevigiana, un ponteggio tradizionale richiede settimane di allestimento e spesso non è compatibile con i giardini privati e le recinzioni. Tetto94 interviene con rope access certificato direttamente dalla copertura, preservando il giardino e riducendo i tempi di intervento.",
    vantaggi: [
      'Nessun danno al giardino o alle recinzioni delle ville della Marca',
      'Risparmio fino all\'80% rispetto ai ponteggi tradizionali',
      'Intervento completato in 2–4 giorni contro le 2–3 settimane con ponteggio',
    ],
    risparmio: 'fino all\'80%',
  },
  prezzi: [
    { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.500', note: 'IVA, smaltimento e linea vita inclusi' },
    { tipo: 'Impermeabilizzazione con guaina', prezzoMin: '€ 2.600', prezzoMax: '€ 6.800', note: 'Per tetti piani e terrazze' },
    { tipo: 'Restauro villa storica', prezzoMin: '€ 9.000', prezzoMax: '€ 25.000', note: 'Materiali artigianali, vincoli paesaggistici' },
    { tipo: 'Riparazione post-grandinata', prezzoMin: '€ 600', prezzoMax: '€ 3.500', note: 'Intervento rapido, gestione assicurativa' },
    { tipo: 'Pulizia muschio e trattamento', prezzoMin: '€ 200', prezzoMax: '€ 900', note: 'Trattamento anti-muschio 5 anni' },
  ],
  comuniCoperti: [
    'Treviso', 'Conegliano', 'Vittorio Veneto', 'Oderzo', 'Castelfranco Veneto',
    'Montebelluna', 'Mogliano Veneto', 'Villorba', 'Silea', 'Roncade',
    'Quinto di Treviso', 'Preganziol', 'Zero Branco', 'Paese', 'Breda di Piave',
    'Spresiano', 'Susegana', 'San Vendemiano', 'Cordignano', 'Valdobbiadene',
  ],
  materiali: [
    {
      nome: 'Coppi marsigliesi',
      descrizione: 'Tegole piane in cotto di tradizione trevigiana con aggancio meccanico',
      adatto: 'La soluzione più diffusa nella Marca Trevigiana per ville e rustici, ottima resistenza alle piogge intense del Piave',
    },
    {
      nome: 'Tegole canadesi (asfalto)',
      descrizione: 'Tegole bituminose leggere con graniglie minerali colorate',
      adatto: 'Ideali per le pendenze elevate delle case di campagna trevigiana e per le grandinata frequenti della zona pedemontana',
    },
    {
      nome: 'Lose in pietra di Marostica',
      descrizione: 'Lastre in pietra locale per coperture tradizionali dell\'area pedemontana',
      adatto: 'Materiale storico della pedemontana trevigiana, durata 80+ anni, consigliato per rustici e malghe',
    },
  ],
  bonus: [
    {
      nome: 'Bonus Ristrutturazione 50%',
      percentuale: '50%',
      massimale: '€ 96.000',
      scadenza: '31/12/2025',
      note: 'Ottimo per le ville storiche della Marca. Detraibile in 10 anni anche in caso di locazione.',
    },
    {
      nome: 'Sismabonus',
      percentuale: '70%',
      massimale: '€ 96.000',
      scadenza: '31/12/2025',
      note: 'Treviso è zona 3 sismica. Il rifacimento tetto con rinforzo strutturale può accedere a questo bonus.',
    },
    {
      nome: 'Contributo Comuni Marca Trevigiana',
      percentuale: 'Variabile',
      massimale: 'Fino a € 5.000',
      scadenza: 'Variabile per comune',
      note: 'Alcuni comuni della Marca offrono contributi locali per il recupero del patrimonio edilizio rurale.',
    },
  ],
  faqExtra: [
    {
      q: 'Come ci si difende dalla grandine sul tetto a Treviso?',
      a: "La zona pedemontana trevigiana è tra le più colpite da grandinate in Veneto. Consigliamo tegole con resistenza alla grandine certificata Classe 4 (la massima), oppure membrane bituminose con ardesia di protezione per i tetti piani. In caso di danno da grandine, gestiamo anche la pratica assicurativa.",
    },
    {
      q: 'Operate anche nel Prosecco DOCG e sulle Colline del Prosecco?',
      a: "Sì, operiamo in tutta la zona UNESCO delle Colline del Prosecco di Conegliano Valdobbiadene. Per gli edifici rurali e le cantine vinicole utilizziamo materiali tradizionali approvati per le zone paesaggisticamente vincolate.",
    },
    {
      q: 'Quanto dura un tetto rifatto a Treviso?',
      a: "Con i materiali certificati che utilizziamo, un tetto rifatto a Treviso dura 30–50 anni in condizioni normali. La nostra garanzia scritta copre 10 anni su materiali e manodopera. Con la manutenzione programmata annuale (da 250€) potete estendere la vita del tetto oltre i 50 anni.",
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   VERONA
───────────────────────────────────────────────────────────── */
const verona: CitySeoData = {
  citySlug: 'verona',
  metaDescription: 'Rifacimento tetto a Verona da 6.500€. Prezzi trasparenti, sopralluogo drone gratuito, materiali certificati CE e garanzia scritta 10 anni. Preventivo entro 24 ore.',
  ogImage: '/images/og/rifacimento-tetto-verona.png',
  beforeImage: '/images/cities/verona-before.png',
  afterImage: '/images/cities/verona-after.png',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44855.0!2d10.9916!3d45.4386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47781586b1f81d7d%3A0x1!2sVerona%20VR!5e0!3m2!1sit!2sit!4v1700000000004',
  heroLongText:
    "A Verona il rifacimento tetto parte da 6.500€ con garanzia decennale, ispezione drone gratuita e preventivo entro 24 ore. Seconda città del Veneto per popolazione, Verona presenta un mercato delle ristrutturazioni molto attivo con numerose ville in Valpolicella, Bardolino e nelle zone collinari che richiedono coperture di alta qualità.",
  mapsCaption: 'Interveniamo a Verona, in Valpolicella, Bardolino e in tutta la provincia',
  priceIntro:
    "Il costo del rifacimento tetto a Verona parte da 6.500€ per un'abitazione standard. I nostri prezzi sono trasparenti e fissi: nessun costo nascosto, preventivo gratuito con sopralluogo drone entro 24 ore.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Verona',
    intro: "Nel centro storico di Verona e nelle ville della Valpolicella, i ponteggi richiedono permessi comunali e ZTL speciali che allungano i tempi di 4–8 settimane. Tetto94 opera senza ponteggi con rope access certificato, avviando i lavori entro 48 ore dall'accettazione del preventivo.",
    vantaggi: [
      'Nessuna pratica di occupazione suolo in ZTL e centro storico — lavori subito',
      'Risparmio fino all\'80% sul ponteggio: budget destinato alla qualità della copertura',
      'Zero intralcio al traffico nelle strette vie del centro scaligero',
    ],
    risparmio: 'fino all\'80%',
  },
  prezzi: [
    { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 16.000', note: 'IVA, smaltimento e collaudo inclusi' },
    { tipo: 'Impermeabilizzazione villa', prezzoMin: '€ 3.000', prezzoMax: '€ 8.500', note: 'Guaina polimerica certificata CE' },
    { tipo: 'Restauro tetto storico', prezzoMin: '€ 9.500', prezzoMax: '€ 28.000', note: 'Centro storico, materiali vincolati' },
    { tipo: 'Rifacimento parziale', prezzoMin: '€ 500', prezzoMax: '€ 3.200', note: 'Zona danneggiata localizzata' },
    { tipo: 'Ispezione drone + report', prezzoMin: '€ 0', prezzoMax: '€ 0', note: 'SEMPRE GRATUITA prima del preventivo' },
  ],
  comuniCoperti: [
    'Verona', 'Villafranca di Verona', 'Bardolino', 'Garda', 'Peschiera del Garda',
    'Soave', 'San Bonifacio', 'Legnago', 'Bussolengo', 'Sona',
    'Sommacampagna', 'Castelnuovo del Garda', 'Lazise', 'Valeggio sul Mincio', 'Pescantina',
    'Negrar di Valpolicella', 'Sant\'Ambrogio di Valpolicella', 'San Pietro in Cariano', 'Fumane', 'Marano di Valpolicella',
  ],
  materiali: [
    {
      nome: 'Tegole marsigliesi in cotto',
      descrizione: 'Tegole piane in terracotta di tradizione veronese ad alta densità',
      adatto: 'La soluzione più richiesta per le ville veronesi e le cantine della Valpolicella, resistente al gelo e al disgelo tipici dell\'inverno veronese',
    },
    {
      nome: 'Coppi veronesi in cotto',
      descrizione: 'Coppi a doppia curvatura della tradizione edilizia veronese',
      adatto: 'Obbligatori per il centro storico di Verona e per molti edifici rurali del Garda, con eccellente drenaggio delle piogge',
    },
    {
      nome: 'Tegole in cemento ad alto spessore',
      descrizione: 'Tegole cementizie di ultima generazione con trattamento impermeabilizzante',
      adatto: 'Scelta economica e durevole per le zone residenziali periferiche di Verona, resistenti alle grandinate della pianura padana',
    },
  ],
  bonus: [
    {
      nome: 'Bonus Ristrutturazione 50%',
      percentuale: '50%',
      massimale: '€ 96.000',
      scadenza: '31/12/2025',
      note: 'Il più utilizzato a Verona. Verona ha uno dei tassi di utilizzo bonus edilizi più alti del Veneto.',
    },
    {
      nome: 'Ecobonus 65%',
      percentuale: '65%',
      massimale: '€ 100.000',
      scadenza: '31/12/2025',
      note: 'Per le ville con tetto a falda in Valpolicella e Bardolino, combinabile con isolamento a cappotto.',
    },
    {
      nome: 'Bonus Facciate (se applicabile)',
      percentuale: '50%',
      massimale: '€ 40.000',
      scadenza: 'Verifica annuale',
      note: 'Per interventi che includono anche facciata e grondaie. Verificate disponibilità con il nostro team.',
    },
  ],
  faqExtra: [
    {
      q: 'Quanto costa rifare il tetto a Verona nel 2025?',
      a: "A Verona nel 2025 il rifacimento tetto completo costa tra 6.500€ e 16.000€ per un'abitazione unifamiliare standard (80–150 m²). I fattori che influenzano il prezzo sono: tipo di materiale, pendenza, accessibilità e distanza dal centro. Preventivo gratuito con drone entro 24 ore.",
    },
    {
      q: 'Operate anche sul lago di Garda vicino a Verona?',
      a: "Sì, copriamo tutta la sponda veronese del Garda: Bardolino, Lazise, Castelnuovo del Garda, Peschiera, Valeggio. Per le ville gardesane utilizziamo materiali resistenti all'umidità lacustre e ai venti nord-sud del lago.",
    },
    {
      q: 'Come funziona il rifacimento tetto in Valpolicella?',
      a: "In Valpolicella molti edifici rurali e cantine vinicole hanno vincoli paesaggistici che impongono materiali tradizionali. Tetto94 è specializzata in questo tipo di interventi: utilizziamo coppi veronesi certificati e gestiamo le pratiche con la Soprintendenza. Sopralluogo drone gratuito anche in zona collinare.",
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   VICENZA
───────────────────────────────────────────────────────────── */
const vicenza: CitySeoData = {
  citySlug: 'vicenza',
  metaDescription: 'Rifacimento tetto a Vicenza da 6.500€. Interventi per ville storiche e abitazioni, sopralluogo drone gratuito, materiali certificati CE e garanzia scritta 10 anni.',
  ogImage: '/images/og/rifacimento-tetto-vicenza.png',
  beforeImage: '/images/cities/vicenza-before.png',
  afterImage: '/images/cities/vicenza-after.png',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45210.0!2d11.5354!3d45.5455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47793e5069f0e2c5%3A0x1!2sVicenza%20VI!5e0!3m2!1sit!2sit!4v1700000000005',
  heroLongText:
    "A Vicenza il rifacimento tetto parte da 6.500€ con garanzia scritta 10 anni e ispezione drone gratuita. Città del Palladio e Patrimonio UNESCO, Vicenza richiede operatori con competenze specifiche nel rispetto dei vincoli architettonici delle ville palladiane e degli edifici storici del centro.",
  mapsCaption: 'Interveniamo a Vicenza, nelle ville palladiane e in tutta la provincia',
  priceIntro:
    "Il costo del rifacimento tetto a Vicenza parte da 6.500€. Per gli edifici storici e le ville palladiane il preventivo viene definito dopo il sopralluogo drone gratuito, con rispetto dei vincoli UNESCO e della Soprintendenza.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Vicenza',
    intro: "Sulle ville palladiane UNESCO di Vicenza, un ponteggio tradizionale potrebbe danneggiare le facciate storiche e richiede autorizzazione preventiva della Soprintendenza. Tetto94 lavora esclusivamente con rope access: nessun contatto con le facciate, nessuna autorizzazione speciale, massimo rispetto del patrimonio storico.",
    vantaggi: [
      'Nessun rischio di danni alle facciate palladiane — intervento non invasivo',
      'Risparmio fino all\'80% rispetto al ponteggio, mantenendo qualità massima',
      'Nessuna autorizzazione Soprintendenza per il ponteggio — iter semplificato',
    ],
    risparmio: 'fino all\'80%',
  },
  prezzi: [
    { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 15.500', note: 'IVA inclusa, smaltimento certificato' },
    { tipo: 'Restauro villa palladiana', prezzoMin: '€ 11.000', prezzoMax: '€ 35.000', note: 'Materiali storici, lavori vincolati UNESCO' },
    { tipo: 'Impermeabilizzazione tetto piano', prezzoMin: '€ 2.800', prezzoMax: '€ 7.000', note: 'Membrane certificate per zona sismica' },
    { tipo: 'Intervento urgente', prezzoMin: '€ 400', prezzoMax: '€ 2.800', note: 'Risposta entro 24h, garanzia scritta' },
    { tipo: 'Manutenzione programmata', prezzoMin: '€ 220', prezzoMax: '€ 750', note: 'Contratto annuale con ispezione drone' },
  ],
  comuniCoperti: [
    'Vicenza', 'Bassano del Grappa', 'Thiene', 'Schio', 'Valdagno',
    'Arzignano', 'Valdagno', 'Montecchio Maggiore', 'Lonigo', 'Noventa Vicentina',
    'Lugo di Vicenza', 'Breganze', 'Mason Vicentino', 'Marostica', 'Asiago',
    'Gallio', 'Roana', 'Chiampo', 'Montorso Vicentino', 'Orgiano',
  ],
  materiali: [
    {
      nome: 'Coppi romani in cotto',
      descrizione: 'Coppi semicircolari di tradizione romana, materiale autentico per le ville palladiane',
      adatto: 'L\'unico materiale accettato dalla Soprintendenza UNESCO per il restauro delle ville palladiane di Vicenza',
    },
    {
      nome: 'Tegole a doppia onda in cotto',
      descrizione: 'Tegole di tradizione veneta per coperture a falda multipla',
      adatto: 'Perfette per le ville vicentine dell\'Ottocento e le abitazioni storiche del centro, resistenti alle piogge pre-alpine',
    },
    {
      nome: 'Lose in pietra di Chiampo',
      descrizione: 'Lastre in marmo calcareo locale estratto dalle cave vicentine',
      adatto: 'Materiale storico della Pedemontana Vicentina, usato da secoli per malghe e rustici dell\'Altopiano di Asiago',
    },
  ],
  bonus: [
    {
      nome: 'Bonus Ristrutturazione 50%',
      percentuale: '50%',
      massimale: '€ 96.000',
      scadenza: '31/12/2025',
      note: 'Applicabile anche per il restauro delle ville storiche vicentine con materiali certificati.',
    },
    {
      nome: 'Sismabonus',
      percentuale: '75–85%',
      massimale: '€ 96.000',
      scadenza: '31/12/2025',
      note: 'Vicenza è zona 2–3 sismica. Il miglioramento strutturale del tetto può dare accesso a percentuali elevate.',
    },
    {
      nome: 'Contributo Comune di Vicenza',
      percentuale: 'Variabile',
      massimale: 'Fino a € 8.000',
      scadenza: 'Bando annuale',
      note: 'Il Comune di Vicenza eroga contributi per il restauro edilizio del centro storico e delle ville palladiane.',
    },
  ],
  faqExtra: [
    {
      q: 'Si può rifare il tetto di una villa palladiana a Vicenza?',
      a: "Sì, ma richiede autorizzazione preventiva della Soprintendenza ai Beni Culturali e utilizzo di materiali storici certificati (coppi romani in cotto di dimensioni originali). Tetto94 gestisce l'intero iter burocratico e dispone di materiali approvati per le ville UNESCO. Il processo richiede 4–8 settimane per le autorizzazioni.",
    },
    {
      q: 'Operate anche sull\'Altopiano di Asiago?',
      a: "Sì, siamo presenti sull'Altopiano dei Sette Comuni: Asiago, Roana, Gallio, Enego. Per le malghe e le abitazioni alpine utilizziamo materiali specifici per il clima montano: tegole resistenti al gelo certificato classe F (fino a -40°C) e impermeabilizzazioni rinforzate per la neve.",
    },
    {
      q: 'Quanto costa il sopralluogo a Vicenza?',
      a: "Il sopralluogo con drone a Vicenza è completamente gratuito, incluso per ogni cliente che richiede un preventivo. Utilizziamo drone con camera ad alta risoluzione per rilievo completo — il report fotografico vi viene consegnato via email entro 2 ore dal sopralluogo.",
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
   BATCH 2 CITIES
───────────────────────────────────────────────────────────── */
const rovigo: CitySeoData = {
  citySlug: 'rovigo',
  ogImage: '/images/og/rifacimento-tetto-rovigo.png',
  beforeImage: '/images/cities/rovigo-before.png',
  afterImage: '/images/cities/rovigo-after.png',
  mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46175!2d11.7903!3d45.0710!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb8000000001%3A0x1!2sRovigo%20RO!5e0!3m2!1sit!2sit!4v1700000000000',
  mapsCaption: 'Interveniamo a Rovigo e in tutto il Polesine',
  heroLongText: "A Rovigo, nel cuore del Polesine, il clima umido della pianura padana con frequenti nebbie e l'escursione termica tra estate e inverno degradano rapidamente le coperture in laterizio. Tetto94 opera a Rovigo con materiali certificati per climi umidi continentali e interventi completi senza ponteggi, garanzia scritta 10 anni inclusa.",
  priceIntro: "Il costo del rifacimento tetto a Rovigo parte da 6.500€ per un'abitazione standard del Polesine. Preventivo gratuito entro 24 ore con ispezione drone inclusa.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Rovigo',
    intro: "Nelle abitazioni e nei rustici del Polesine, il montaggio di un ponteggio su terreni agricoli e nei centri storici rodigini richiede permessi complessi. Tetto94 opera con rope access certificato: nessun ponteggio, intervento rapido, risparmio garantito.",
    vantaggi: [
      'Nessun permesso di occupazione suolo nei centri storici polesani',
      'Risparmio fino all\'80% rispetto al costo del ponteggio tradizionale',
      'Intervento completato in 2–3 giorni senza intralciare il terreno circostante',
    ],
    risparmio: 'fino all\'80%',
  },
  costiTotali: [
    { superficie: '~60 mq', prezzoMin: '€ 4.800', prezzoMax: '€ 7.200', note: 'Casa singola piano terra' },
    { superficie: '~80 mq', prezzoMin: '€ 5.800', prezzoMax: '€ 9.600', note: 'Abitazione standard Polesine' },
    { superficie: '~100 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 12.000', note: 'Villa unifamiliare' },
    { superficie: '~130 mq', prezzoMin: '€ 8.500', prezzoMax: '€ 15.500', note: 'Rustico o casolare agricolo' },
    { superficie: '~160 mq', prezzoMin: '€ 10.500', prezzoMax: '€ 19.000', note: 'Villa grande o capannone' },
  ],
  prezzi: [
    { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
    { tipo: 'Impermeabilizzazione con guaina', prezzoMin: '€ 2.800', prezzoMax: '€ 7.500', note: 'Per m² da 35€ a 95€' },
    { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
    { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
    { tipo: 'Pulizia e manutenzione grondaie', prezzoMin: '€ 180', prezzoMax: '€ 600', note: 'Per abitazione unifamiliare' },
  ],
  comuniCoperti: [
    'Rovigo', 'Adria', 'Porto Viro', 'Taglio di Po', 'Porto Tolle',
    'Badia Polesine', 'Lendinara', 'Occhiobello', 'Castelmassa', 'Ficarolo',
    'Gavello', 'Ceregnano', 'Villamarzana', 'Fratta Polesine', 'Guarda Veneta',
    'San Martino di Venezze', 'Pontecchio Polesine', 'Arquà Polesine', 'Costa di Rovigo', 'Villanova del Ghebbo',
  ],
  materiali: [
    { nome: 'Tegole in laterizio anti-umido', descrizione: 'Tegole in cotto certificato con bassa porosità e trattamento idrofugo', adatto: 'Resistono all\'umidità persistente del Polesine e alle frequenti nebbie del Po' },
    { nome: 'Guaina bituminosa rinforzata', descrizione: 'Membrana polimerica SBS con armatura in poliestere', adatto: 'Massima tenuta idraulica per le abbondanti precipitazioni della pianura padana rodigina' },
    { nome: 'Coibentazione in lana di roccia', descrizione: 'Isolante termoacustico resistente all\'umidità e traspirante', adatto: 'Contrasta le escursioni termiche estive e le gelate invernali tipiche del clima continentale polesano' },
  ],
  bonus: [
    { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate. Applicabile a rifacimento tetto abitazione principale.' },
    { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Per interventi con miglioramento classe energetica. Include isolamento sottotetto.' },
    { nome: 'Sismabonus — Zona 3', percentuale: '70%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Rovigo è zona sismica 3. Combinabile con Bonus Ristrutturazione.' },
  ],
  faqExtra: [
    { q: 'Quanto costa il rifacimento tetto a Rovigo per 100 mq?', a: 'Per una superficie di 100 mq a Rovigo, il costo del rifacimento tetto completo è compreso tra 6.500€ e 12.000€, IVA inclusa e smaltimento incluso. Il prezzo finale dipende dal tipo di materiale e dalla pendenza della falda. Tetto94 offre preventivo gratuito entro 24 ore con sopralluogo drone.' },
    { q: 'Operate anche nei comuni del Delta del Po?', a: 'Sì, operiamo in tutto il Polesine inclusi Porto Tolle, Porto Viro, Taglio di Po e i comuni del Delta del Po. Per le abitazioni in zona umida usiamo materiali specifici con trattamento anti-corrosione rinforzato.' },
    { q: 'Qual è il periodo migliore per rifare il tetto a Rovigo?', a: 'A Rovigo il periodo ideale va da aprile a ottobre, quando le condizioni meteo sono stabili. Evitiamo i mesi invernali per le frequenti gelate notturne che compromettono la posa degli impermeabilizzanti. Tetto94 garantisce lavori ultimati entro la data concordata.' },
  ],
}

const belluno: CitySeoData = {
  citySlug: 'belluno',
  ogImage: '/images/og/rifacimento-tetto-belluno.png',
  beforeImage: '/images/cities/belluno-before.png',
  afterImage: '/images/cities/belluno-after.png',
  mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44568!2d12.2170!3d46.1400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477830000000001%3A0x1!2sBelluno%20BL!5e0!3m2!1sit!2sit!4v1700000000000',
  mapsCaption: 'Interveniamo a Belluno e in tutte le Dolomiti',
  heroLongText: "A Belluno, il clima alpino dolomitico con nevicate abbondanti (fino a 200 cm annui) e gelate prolungate rappresenta la sfida principale per le coperture. Tetto94 opera a Belluno con materiali certificati per carichi neve fino a 3 kN/m², tegole anti-gelo classe F e sistemi di impermeabilizzazione rinforzati per le temperature sotto zero.",
  priceIntro: "Il costo del rifacimento tetto a Belluno parte da 6.500€ con materiali certificati per il clima alpino dolomitico. Preventivo gratuito con drone entro 24 ore — operiamo anche nelle frazioni montane più isolate.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Belluno',
    intro: "In montagna e nei borghi dolomitici, il montaggio di un ponteggio tradizionale su terreno in pendenza è complesso, costoso e spesso impossibile. Tetto94 utilizza rope access certificato per interventi alpini: accediamo direttamente dalla cresta, senza ponteggio, anche sulle coperture più ripide.",
    vantaggi: [
      'Accesso garantito anche su coperture alpine ripide e borghi montani inaccessibili',
      'Risparmio fino all\'80% — i ponteggi in montagna costano il doppio rispetto alla pianura',
      'Nessun danno al terreno in pendenza o ai giardini montani circostanti',
    ],
    risparmio: 'fino all\'80%',
  },
  costiTotali: [
    { superficie: '~60 mq', prezzoMin: '€ 5.200', prezzoMax: '€ 8.000', note: 'Casa di montagna piccola' },
    { superficie: '~80 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 10.500', note: 'Abitazione standard dolomitica' },
    { superficie: '~100 mq', prezzoMin: '€ 7.500', prezzoMax: '€ 13.500', note: 'Villa o chalet' },
    { superficie: '~130 mq', prezzoMin: '€ 9.500', prezzoMax: '€ 17.000', note: 'Malghe o edifici alpini ampi' },
    { superficie: '~160 mq', prezzoMin: '€ 12.000', prezzoMax: '€ 21.000', note: 'Grande chalet o struttura turistica' },
  ],
  prezzi: [
    { tipo: 'Rifacimento completo (tegole anti-gelo)', prezzoMin: '€ 6.500', prezzoMax: '€ 15.000', note: 'Materiali certificati classe F (-40°C)' },
    { tipo: 'Rifacimento con lastre in ardesia', prezzoMin: '€ 8.000', prezzoMax: '€ 18.000', note: 'Materiale tradizionale dolomitico' },
    { tipo: 'Impermeabilizzazione rinforzata', prezzoMin: '€ 3.200', prezzoMax: '€ 8.500', note: 'Guaina anti-gelo per tetti piani' },
    { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 350', prezzoMax: '€ 1.400', note: 'Anche in quota senza ponteggio' },
    { tipo: 'Riparazione da danno neve/ghiaccio', prezzoMin: '€ 500', prezzoMax: '€ 3.000', note: 'Intervento urgente post-nevicata' },
  ],
  comuniCoperti: [
    'Belluno', 'Feltre', 'Sedico', 'Ponte nelle Alpi', 'Longarone',
    'Pieve di Cadore', 'Cortina d\'Ampezzo', 'Auronzo di Cadore', 'San Vito di Cadore', 'Calalzo di Cadore',
    'Agordo', 'Zoldo Alto', 'Forno di Zoldo', 'Mel', 'Limana',
    'Sovramonte', 'Pedavena', 'Sospirolo', 'Cesiomaggiore', 'Alano di Piave',
  ],
  materiali: [
    { nome: 'Tegole in laterizio classe F anti-gelo', descrizione: 'Tegole certificate per temperature fino a -40°C con assorbimento idrico < 6%', adatto: 'Obbligatorio per le coperture dolomitiche soggette a cicli gelo-disgelo ripetuti e carichi neve importanti' },
    { nome: 'Lastre in ardesia naturale', descrizione: 'Materiale tradizionale delle Dolomiti, resistente a grandine e variazioni termiche estreme', adatto: 'Materiale storico dei borghi bellunesi, massima durata in ambienti alpini aggressivi' },
    { nome: 'Guaina SBS rinforzata anti-gelo', descrizione: 'Membrana bituminosa modificata con elastomero, flessibile fino a -25°C', adatto: 'Unica soluzione efficace per tetti piani in alta quota soggetti a lunghi periodi con temperature sotto zero' },
  ],
  bonus: [
    { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate. Valido per prima e seconda casa.' },
    { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Particolarmente vantaggioso in montagna per l\'isolamento termico invernale.' },
    { nome: 'Bonus Sismabonus — Zona 2', percentuale: '80%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Belluno è zona sismica 2 (maggior rischio) — detrazione più alta rispetto alla pianura.' },
  ],
  faqExtra: [
    { q: 'Quanto costa rifare il tetto a Belluno con neve e clima alpino?', a: 'A Belluno il rifacimento tetto parte da 6.500€ per abitazioni standard, con un leggero incremento (10–15%) per l\'utilizzo di materiali anti-gelo certificati classe F obbligatori in zona dolomitica. Il prezzo include smaltimento, drone e garanzia 10 anni.' },
    { q: 'Operate anche nelle frazioni di montagna sopra i 1000 metri?', a: 'Sì, operiamo in tutto il territorio bellunese incluse le frazioni alpine fino a 2000 metri. Utilizziamo rope access certificato per montagna che ci permette di raggiungere anche le abitazioni più isolate senza necessità di strade di accesso per i ponteggi.' },
    { q: 'Qual è il periodo migliore per rifare il tetto a Belluno?', a: 'A Belluno operiamo da aprile a ottobre. I mesi invernali sono sconsigliati per le gelate notturne che impediscono la corretta posa degli impermeabilizzanti. In caso di urgenza post-nevicata, interveniamo in emergenza tutto l\'anno.' },
  ],
}

const chioggia: CitySeoData = {
  citySlug: 'chioggia',
  ogImage: '/images/og/rifacimento-tetto-chioggia.png',
  beforeImage: '/images/cities/chioggia-before.png',
  afterImage: '/images/cities/chioggia-after.png',
  mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23125!2d12.2785!3d45.2194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb0000000002%3A0x2!2sChioggia%20VE!5e0!3m2!1sit!2sit!4v1700000000000',
  mapsCaption: 'Interveniamo a Chioggia, Sottomarina e in tutta la laguna sud',
  heroLongText: "A Chioggia, la Piccola Venezia, il microclima lagunare con salsedine intensa e umidità superiore al 85% corrode le coperture in laterizio fino al 50% più rapidamente rispetto alle zone interne. Tetto94 opera a Chioggia con materiali anti-salino certificati e tecniche di accesso su fune per calli e canaletti dove i ponteggi sono impossibili.",
  priceIntro: "Il costo per impermeabilizzare o rifare il tetto a Chioggia parte da 6.500€ per 100 mq. Materiali anti-salsedine, garanzia 10 anni e ispezione drone inclusi nel preventivo.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Chioggia',
    intro: "A Chioggia, come a Venezia, le calli strette e i canali rendono il montaggio di ponteggi tradizionali praticamente impossibile. Tetto94 opera con rope access certificato adattato al contesto lagunare: accediamo dai tetti senza occupare suolo pubblico nelle calli.",
    vantaggi: [
      'Unica soluzione possibile nelle calli strette della Piccola Venezia — senza ponteggi',
      'Risparmio fino all\'80% sul costo del ponteggio: più budget per materiali anti-salino di qualità',
      'Nessuna occupazione dei canali o degli spazi comuni nelle calli chioggiotte',
    ],
    risparmio: 'fino all\'80%',
  },
  costiTotali: [
    { superficie: '~60 mq', prezzoMin: '€ 4.800', prezzoMax: '€ 7.500', note: 'Casa lagunare storica' },
    { superficie: '~80 mq', prezzoMin: '€ 5.800', prezzoMax: '€ 9.800', note: 'Abitazione standard Chioggia' },
    { superficie: '~100 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 12.500', note: 'Villa o edificio sul lungomare' },
    { superficie: '~130 mq', prezzoMin: '€ 8.500', prezzoMax: '€ 16.000', note: 'Edificio storico o B&B' },
    { superficie: '~160 mq', prezzoMin: '€ 10.500', prezzoMax: '€ 19.500', note: 'Edificio commerciale o grande villa' },
  ],
  prezzi: [
    { tipo: 'Rifacimento completo (tegole anti-salino)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.500', note: 'Materiali con trattamento anti-corrosione salina' },
    { tipo: 'Impermeabilizzazione con guaina marina', prezzoMin: '€ 3.200', prezzoMax: '€ 8.000', note: 'Guaina polimerica resistente alla salsedine' },
    { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
    { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
    { tipo: 'Pulizia grondaie e pluviali', prezzoMin: '€ 180', prezzoMax: '€ 650', note: 'Pulizia incrostazioni saline' },
  ],
  comuniCoperti: [
    'Chioggia', 'Sottomarina', 'Cavarzere', 'Cona', 'Correzzola',
    'Codevigo', 'Pontelongo', 'Piove di Sacco', 'Arzergrande', 'Brondolo',
    'Isolaverde', 'Ca\' Lino', 'Sant\'Anna di Chioggia', 'Valli di Chioggia', 'Scardovari',
    'Rosolina', 'Porto Tolle', 'Loreo', 'Adria', 'Taglio di Po',
  ],
  materiali: [
    { nome: 'Coppi in cotto smaltato anti-salino', descrizione: 'Tegole tradizionali con doppio strato di smalto protettivo anti-cloruro', adatto: 'Resistono alla corrosione salina aggressiva della laguna di Chioggia — durata garantita 25+ anni in ambiente marino' },
    { nome: 'Guaina polimerica marina FPO', descrizione: 'Membrana sintetica a base di poliolefine, massima resistenza chimica agli agenti marini', adatto: 'Soluzione top per tetti piani di Chioggia esposti a salsedine, UV marini e cicli umido-secco lagunari' },
    { nome: 'Ventilazione sottotetto rinforzata', descrizione: 'Sistema di ventilazione passiva con membrane traspiranti anti-umido', adatto: 'Fondamentale per gli edifici lagunari dove l\'umidità relativa supera l\'85% — previene condensa e muffa sottotetto' },
  ],
  bonus: [
    { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate annuali.' },
    { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Include isolamento termico — particolarmente utile per ridurre l\'umidità in edifici lagunari.' },
    { nome: 'Bonus Barriere Architettoniche', percentuale: '75%', massimale: '€ 50.000', scadenza: '31/12/2025', note: 'Applicabile se l\'intervento include miglioramenti di accessibilità.' },
  ],
  faqExtra: [
    { q: 'Quanto costa impermeabilizzare 100 mq a Chioggia?', a: 'A Chioggia, impermeabilizzare un tetto di 100 mq con guaina polimerica marina costa tra 3.500€ e 8.000€. Per un rifacimento completo con tegole anti-salino la stima sale a 6.500€–12.500€. Tutti i prezzi includono IVA, smaltimento del vecchio manto e garanzia 10 anni.' },
    { q: 'Operate anche a Sottomarina e nelle isole lagunari?', a: 'Sì, operiamo a Chioggia, Sottomarina, Brondolo, Isolaverde e in tutte le isole e le frazioni lagunari accessibili. Per le isole con accesso solo via acqua organizziamo trasporto materiali con barca — costo aggiuntivo concordato nel preventivo.' },
    { q: 'Come si proteggono i tetti dall\'umidità della laguna di Chioggia?', a: 'Utilizziamo un sistema a tre strati: guaina impermeabilizzante anti-salino, membrana traspirante per la ventilazione e tegole con trattamento anti-cloruro. Questo sistema garantisce massima protezione dall\'umidità lagunare con durata minima 20 anni.' },
  ],
}

const mirano: CitySeoData = {
  citySlug: 'mirano',
  ogImage: '/images/og/rifacimento-tetto-mirano.png',
  beforeImage: '/images/cities/mirano-before.png',
  afterImage: '/images/cities/mirano-after.png',
  mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22840!2d12.1065!3d45.4953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb2000000003%3A0x3!2sMirano%20VE!5e0!3m2!1sit!2sit!4v1700000000000',
  mapsCaption: 'Interveniamo a Mirano, nel Miranese e nella Riviera del Brenta',
  heroLongText: "A Mirano, nel cuore del Miranese e a pochi chilometri dalla Riviera del Brenta, il patrimonio di ville venete e case coloniche richiede competenze specifiche nel rispetto dei materiali storici. Tetto94 opera a Mirano con rifacimenti tetto completi a partire da 6.500€, utilizzando materiali compatibili con i vincoli paesaggistici delle ville venete.",
  priceIntro: "Il costo del rifacimento tetto a Mirano parte da 6.500€ per abitazioni standard. Per le ville venete della Riviera del Brenta, il preventivo viene definito dopo sopralluogo drone gratuito.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Mirano',
    intro: "Nelle ville venete e nelle case coloniche del Miranese, un ponteggio tradizionale rovina il giardino, danneggia le recinzioni storiche e richiede settimane di allestimento. Tetto94 opera con rope access certificato: accesso diretto dalla copertura, zero danni al giardino, lavori ultimati in 2–4 giorni.",
    vantaggi: [
      'Zero danni ai giardini e alle recinzioni storiche delle ville del Miranese',
      'Risparmio fino all\'80% rispetto al ponteggio — budget per materiali di qualità superiore',
      'Nessuna autorizzazione paesaggistica per il ponteggio sulle ville vincolate',
    ],
    risparmio: 'fino all\'80%',
  },
  costiTotali: [
    { superficie: '~60 mq', prezzoMin: '€ 4.600', prezzoMax: '€ 7.200', note: 'Casa singola standard' },
    { superficie: '~80 mq', prezzoMin: '€ 5.600', prezzoMax: '€ 9.500', note: 'Abitazione unifamiliare Miranese' },
    { superficie: '~100 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 12.000', note: 'Villa o casa colonica' },
    { superficie: '~130 mq', prezzoMin: '€ 8.200', prezzoMax: '€ 15.500', note: 'Villa veneta con vincoli paesaggistici' },
    { superficie: '~160 mq', prezzoMin: '€ 10.000', prezzoMax: '€ 19.000', note: 'Villa storica Riviera del Brenta' },
  ],
  prezzi: [
    { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
    { tipo: 'Impermeabilizzazione con guaina', prezzoMin: '€ 2.800', prezzoMax: '€ 7.500', note: 'Per m² da 35€ a 95€' },
    { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
    { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
    { tipo: 'Pulizia e manutenzione grondaie', prezzoMin: '€ 180', prezzoMax: '€ 600', note: 'Per abitazione unifamiliare' },
  ],
  comuniCoperti: [
    'Mirano', 'Santa Maria di Sala', 'Martellago', 'Spinea', 'Salzano',
    'Noale', 'Vigonovo', 'Pianiga', 'Dolo', 'Mira',
    'Fiesso d\'Artico', 'Strà', 'Fossò', 'Campagna Lupia', 'Campolongo Maggiore',
    'Chioggia', 'Cona', 'Codevigo', 'Piove di Sacco', 'Correzzola',
  ],
  materiali: [
    { nome: 'Coppi in cotto naturale', descrizione: 'Tegole tradizionali in laterizio non trattato per ville con vincolo paesaggistico', adatto: 'Materiale richiesto dalla Soprintendenza per le ville venete della Riviera del Brenta — aspetto storico garantito' },
    { nome: 'Tegole portoghesi in laterizio', descrizione: 'Profilo ad onda irregolare tipico delle case coloniche del Miranese', adatto: 'Perfette per il recupero filologico dei rustici e delle case coloniche del territorio' },
    { nome: 'Isolamento in sughero naturale', descrizione: 'Pannelli in sughero espanso certificato per cappotti di tetto', adatto: 'Materiale naturale e traspirante ideale per edifici storici vincolati dove si vuole migliorare l\'efficienza energetica senza alterare l\'estetica' },
  ],
  bonus: [
    { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate annuali.' },
    { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Per interventi con miglioramento classe energetica, incluso isolamento sottotetto.' },
    { nome: 'Bonus Facciate 60%', percentuale: '60%', massimale: '€ 60.000', scadenza: '31/12/2025', note: 'Applicabile se l\'intervento include il rifacimento grondaie e pluviali.' },
  ],
  faqExtra: [
    { q: 'Rifacimento tetto ville venete a Mirano: serve l\'autorizzazione della Soprintendenza?', a: 'Per le ville della Riviera del Brenta sottoposte a vincolo paesaggistico, il rifacimento deve usare materiali identici agli originali (coppi in cotto naturale) e richiedere parere preventivo della Soprintendenza. Tetto94 gestisce l\'intero iter burocratico — ci occupiamo noi della pratica, voi aspettate il risultato.' },
    { q: 'Quanto si risparmia con il Bonus Ristrutturazione 50% a Mirano?', a: 'Su un rifacimento tetto da 10.000€ a Mirano, il Bonus Ristrutturazione 50% garantisce 5.000€ di detrazione IRPEF in 10 anni (500€/anno). Se si aggiunge l\'Ecobonus 65% per l\'isolamento, il risparmio totale può superare il 60% del costo dell\'intervento.' },
    { q: 'Operate anche a Dolo, Mira e lungo la Riviera del Brenta?', a: 'Sì, operiamo in tutto il Miranese e lungo la Riviera del Brenta: Dolo, Mira, Fiesso d\'Artico, Strà, Stra. Interveniamo anche sulle ville storiche vincolate con materiali approvati dalla Soprintendenza.' },
  ],
}

const sanDonadiPiave: CitySeoData = {
  citySlug: 'san-dona-di-piave',
  ogImage: '/images/og/rifacimento-tetto-san-dona-di-piave.png',
  beforeImage: '/images/cities/san-dona-di-piave-before.png',
  afterImage: '/images/cities/san-dona-di-piave-after.png',
  mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22640!2d12.5651!3d45.6280!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477ec0000000004%3A0x4!2sSan%20Don%C3%A0%20di%20Piave%20VE!5e0!3m2!1sit!2sit!4v1700000000000',
  mapsCaption: 'Interveniamo a San Donà di Piave e in tutta la Venezia Orientale',
  heroLongText: "A San Donà di Piave, capoluogo della Venezia Orientale, il clima pianeggiante con venti da est e precipitazioni concentrate richiede coperture con ottima tenuta idraulica. Tetto94 opera a San Donà di Piave a partire da 6.500€ con materiali certificati CE, ispezione drone gratuita e garanzia scritta 10 anni.",
  priceIntro: "Il costo del rifacimento tetto a San Donà di Piave parte da 6.500€ per abitazioni standard della Venezia Orientale. Preventivo gratuito entro 24 ore, smaltimento e garanzia inclusi.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a San Donà di Piave',
    intro: "Nei quartieri residenziali di San Donà di Piave e dei comuni circostanti, un ponteggio tradizionale occupa il passo carraio o il giardino per settimane. Tetto94 opera con rope access certificato: nessuna occupazione del suolo, lavori completati in 2–3 giorni.",
    vantaggi: [
      'Nessuna occupazione del passo carraio o del giardino durante i lavori',
      'Risparmio fino all\'80% rispetto al costo del ponteggio tradizionale',
      'Intervento rapido: 2–3 giorni contro le 2 settimane con ponteggio',
    ],
    risparmio: 'fino all\'80%',
  },
  costiTotali: [
    { superficie: '~60 mq', prezzoMin: '€ 4.500', prezzoMax: '€ 7.000', note: 'Casa singola standard' },
    { superficie: '~80 mq', prezzoMin: '€ 5.500', prezzoMax: '€ 9.200', note: 'Abitazione unifamiliare' },
    { superficie: '~100 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 11.500', note: 'Villa unifamiliare' },
    { superficie: '~130 mq', prezzoMin: '€ 8.000', prezzoMax: '€ 14.800', note: 'Villetta con ampio tetto' },
    { superficie: '~160 mq', prezzoMin: '€ 10.000', prezzoMax: '€ 18.500', note: 'Grande villa o capannone' },
  ],
  prezzi: [
    { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
    { tipo: 'Impermeabilizzazione con guaina', prezzoMin: '€ 2.800', prezzoMax: '€ 7.500', note: 'Per m² da 35€ a 95€' },
    { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
    { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
    { tipo: 'Pulizia e manutenzione grondaie', prezzoMin: '€ 180', prezzoMax: '€ 600', note: 'Per abitazione unifamiliare' },
  ],
  comuniCoperti: [
    'San Donà di Piave', 'Musile di Piave', 'Noventa di Piave', 'Ceggia', 'Torre di Mosto',
    'Jesolo', 'Cavallino-Treporti', 'Eraclea', 'Caorle', 'Portogruaro',
    'San Stino di Livenza', 'Annone Veneto', 'Concordia Sagittaria', 'Fossalta di Piave', 'Meolo',
    'Quarto d\'Altino', 'Marcon', 'Mogliano Veneto', 'Zero Branco', 'Preganziol',
  ],
  materiali: [
    { nome: 'Tegole in laterizio rinforzato', descrizione: 'Tegole in cotto ad alta resistenza all\'acqua con superficie impermeabilizzante', adatto: 'Ottima tenuta idraulica per le precipitazioni concentrate della pianura veneta orientale' },
    { nome: 'Guaina bituminosa APP 4 mm', descrizione: 'Membrana bituminosa armata con fibre di poliestere, alta resistenza meccanica', adatto: 'Standard per abitazioni della Venezia Orientale — massima durata con manutenzione minima' },
    { nome: 'Pannelli isolanti PIR', descrizione: 'Poliisocianurato espanso con ottimo rapporto spessore/prestazione', adatto: 'Ideale per migliorare l\'efficienza energetica degli edifici anni \'70–\'90 di San Donà e accedere ai bonus fiscali' },
  ],
  bonus: [
    { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate annuali.' },
    { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Per interventi con miglioramento classe energetica.' },
    { nome: 'Sismabonus — Zona 3', percentuale: '70%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'San Donà di Piave è zona sismica 3. Combinabile con altri bonus.' },
  ],
  faqExtra: [
    { q: 'Quanto costa il rifacimento tetto a San Donà di Piave per 100 mq?', a: 'Per 100 mq a San Donà di Piave il costo del rifacimento tetto completo è compreso tra 6.500€ e 11.500€, IVA e smaltimento inclusi. Il preventivo gratuito viene fornito entro 24 ore con sopralluogo drone.' },
    { q: 'Operate anche a Jesolo, Caorle e nella costa veneziana orientale?', a: 'Sì, operiamo in tutta la Venezia Orientale: Jesolo, Caorle, Eraclea, Cavallino-Treporti e Portogruaro. Per le abitazioni in zona balneare utilizziamo materiali con trattamento anti-umidità e anti-salsedine.' },
    { q: 'Quanto tempo ci vuole per rifare il tetto a San Donà di Piave?', a: 'Per un\'abitazione standard di 80–100 mq a San Donà di Piave i lavori durano 3–5 giorni con il nostro sistema senza ponteggio. Con ponteggio tradizionale i tempi si allungherebbero di 1–2 settimane solo per montaggio e smontaggio.' },
  ],
}

const moglianoVeneto: CitySeoData = {
  citySlug: 'mogliano-veneto',
  ogImage: '/images/og/rifacimento-tetto-mogliano-veneto.png',
  beforeImage: '/images/cities/mogliano-veneto-before.png',
  afterImage: '/images/cities/mogliano-veneto-after.png',
  mapsEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22500!2d12.2375!3d45.5650!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477ec4000000005%3A0x5!2sMogliano%20Veneto%20TV!5e0!3m2!1sit!2sit!4v1700000000000',
  mapsCaption: 'Interveniamo a Mogliano Veneto e lungo il Terraglio',
  heroLongText: "A Mogliano Veneto, lungo lo storico Terraglio che collega Venezia a Treviso, il tessuto urbanistico di ville e residenze di pregio richiede rifacimenti tetto di alta qualità. Tetto94 opera a Mogliano Veneto a partire da 6.500€ con materiali premium, ispezione drone gratuita e garanzia scritta 10 anni per preservare il valore delle abitazioni di questa zona residenziale esclusiva.",
  priceIntro: "Il costo del rifacimento tetto a Mogliano Veneto parte da 6.500€. Per le ville lungo il Terraglio il preventivo viene definito dopo sopralluogo drone gratuito con relazione tecnica inclusa.",
  senzaPonteggi: {
    titolo: 'Lavoriamo senza ponteggi a Mogliano Veneto',
    intro: "Nelle ville e nelle residenze di pregio lungo il Terraglio, un ponteggio tradizionale deturpa l\'estetica dell\'edificio per settimane e occupa il giardino. Tetto94 opera con rope access certificato: invisibile dalla strada, zero impatto sul giardino, massimo rispetto per le residenze esclusive del Terraglio.",
    vantaggi: [
      'Zero impatto visivo sull\'estetica delle ville esclusive lungo il Terraglio',
      'Risparmio fino all\'80% sul ponteggio — investimento per materiali premium',
      'Nessun danno ai giardini e alle pavimentazioni delle ville di pregio',
    ],
    risparmio: 'fino all\'80%',
  },
  costiTotali: [
    { superficie: '~60 mq', prezzoMin: '€ 4.800', prezzoMax: '€ 7.500', note: 'Casa singola standard' },
    { superficie: '~80 mq', prezzoMin: '€ 5.800', prezzoMax: '€ 9.800', note: 'Abitazione unifamiliare Mogliano' },
    { superficie: '~100 mq', prezzoMin: '€ 6.500', prezzoMax: '€ 12.500', note: 'Villa residenziale Terraglio' },
    { superficie: '~130 mq', prezzoMin: '€ 8.500', prezzoMax: '€ 16.500', note: 'Villa di pregio o residence' },
    { superficie: '~160 mq', prezzoMin: '€ 10.500', prezzoMax: '€ 20.000', note: 'Grande villa o edificio di lusso' },
  ],
  prezzi: [
    { tipo: 'Rifacimento completo (tegole/coppi)', prezzoMin: '€ 6.500', prezzoMax: '€ 14.000', note: 'IVA inclusa, smaltimento incluso' },
    { tipo: 'Impermeabilizzazione premium', prezzoMin: '€ 3.200', prezzoMax: '€ 8.500', note: 'Guaina FPO di ultima generazione' },
    { tipo: 'Sostituzione tegole singole', prezzoMin: '€ 300', prezzoMax: '€ 1.200', note: 'Intervento localizzato' },
    { tipo: 'Riparazione infiltrazioni', prezzoMin: '€ 450', prezzoMax: '€ 2.500', note: 'Inclusa diagnostica drone' },
    { tipo: 'Manutenzione programmata annuale', prezzoMin: '€ 250', prezzoMax: '€ 800', note: 'Ideale per ville di pregio' },
  ],
  comuniCoperti: [
    'Mogliano Veneto', 'Preganziol', 'Zero Branco', 'Casale sul Sile', 'Casier',
    'Silea', 'Quinto di Treviso', 'Treviso', 'Marcon', 'Quarto d\'Altino',
    'Venezia Mestre', 'Spinea', 'Martellago', 'Noale', 'Salzano',
    'Musile di Piave', 'San Donà di Piave', 'Roncade', 'Meolo', 'Fossalta di Piave',
  ],
  materiali: [
    { nome: 'Tegole in cotto premium portoghese', descrizione: 'Tegole di alta gamma con finitura naturale e tonalità calde per abitazioni di pregio', adatto: 'Eleva l\'estetica delle ville lungo il Terraglio mantenendo il carattere residenziale esclusivo della zona' },
    { nome: 'Guaina FPO di ultima generazione', descrizione: 'Membrana sintetica flexi olefinica, la più avanzata sul mercato — durata garantita 30+ anni', adatto: 'Standard premium per le residenze di lusso di Mogliano Veneto che richiedono la massima durabilità senza manutenzione' },
    { nome: 'Isolamento termico in grafite EPS', descrizione: 'Pannelli in polistirene espanso ad alta densità con grafite per massima efficienza', adatto: 'Riduce del 40% la dispersione termica del tetto, abbassa le bollette e migliora la classe energetica per i bonus fiscali' },
  ],
  bonus: [
    { nome: 'Bonus Ristrutturazione 50%', percentuale: '50%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Detrazione IRPEF in 10 rate annuali.' },
    { nome: 'Ecobonus 65%', percentuale: '65%', massimale: '€ 100.000', scadenza: '31/12/2025', note: 'Per miglioramento classe energetica — applicabile con isolamento tetto.' },
    { nome: 'Sismabonus — Zona 3', percentuale: '70%', massimale: '€ 96.000', scadenza: '31/12/2025', note: 'Mogliano Veneto è zona sismica 3. Combinabile con Bonus Ristrutturazione.' },
  ],
  faqExtra: [
    { q: 'Quanto costa il rifacimento tetto a Mogliano Veneto per una villa?', a: 'Per una villa di 100–130 mq a Mogliano Veneto il costo del rifacimento tetto è compreso tra 6.500€ e 16.500€ a seconda dei materiali scelti. Per ville di pregio consigliamo tegole in cotto premium o guaina FPO con garanzia 30 anni. Preventivo drone gratuito entro 24 ore.' },
    { q: 'Qual è il periodo migliore per rifare il tetto a Mogliano Veneto?', a: 'A Mogliano Veneto il periodo ideale è da aprile a ottobre. Preferiamo evitare i mesi più piovosi (novembre-marzo) per garantire condizioni di posa ottimali. Tetto94 pianifica i lavori con precisione: vi confermiamo la data di inizio entro 48 ore dall\'accettazione del preventivo.' },
    { q: 'Operate anche a Preganziol, Zero Branco e nei comuni del Terraglio?', a: 'Sì, operiamo in tutta l\'area del Terraglio e nei comuni limitrofi: Preganziol, Zero Branco, Casale sul Sile, Casier e Silea. Offriamo lo stesso servizio premium di Mogliano — sopralluogo drone, preventivo fisso e garanzia 10 anni — in tutto il comprensorio.' },
  ],
}

/* ─────────────────────────────────────────────────────────────
   EXPORTED MAP — extensible: add new cities by adding to this map
   Key = LocationConfig.slug
───────────────────────────────────────────────────────────── */
export const CITY_SEO_DATA: Record<string, CitySeoData> = {
  venezia,
  mestre,
  padova,
  treviso,
  verona,
  vicenza,
  rovigo,
  belluno,
  chioggia,
  mirano,
  'san-dona-di-piave': sanDonadiPiave,
  'mogliano-veneto': moglianoVeneto,
}

/** Returns city SEO data if available for this slug */
export function getCitySeoData(slug: string): CitySeoData | undefined {
  return CITY_SEO_DATA[slug]
}
