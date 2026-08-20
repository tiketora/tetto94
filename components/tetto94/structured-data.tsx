/**
 * Structured Data (JSON-LD) — Tetto94 — SEO 2030
 * Schemas: WebSite, LocalBusiness/RoofingContractor, BreadcrumbList,
 *          OfferCatalog (7 services), AggregateRating + Reviews (6),
 *          FAQPage (12 questions), Organization
 */
export default function StructuredData() {

  /* ── 1. WebSite + SearchAction ──────────────────────────── */
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.tetto94.it/#website',
    name: 'Tetto94',
    url: 'https://www.tetto94.it',
    description: 'Esperti in riparazione e rifacimento tetti a Venezia e province dal 1994.',
    inLanguage: 'it-IT',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.tetto94.it/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  /* ── 2. LocalBusiness / RoofingContractor ───────────────── */
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RoofingContractor', 'HomeAndConstructionBusiness'],
    '@id': 'https://www.tetto94.it/#business',
    name: 'Tetto94',
    legalName: 'Tetto94',
    slogan: 'Maestria in ogni dettaglio, sicurezza su ogni tetto.',
    description:
      'Tetto94 è specializzata in riparazione tetti, rifacimento coperture, impermeabilizzazione e ispezione gratuita con drone a Venezia, Mestre, Padova, Treviso, Vicenza, Verona, Udine, Trieste, Trento, Bologna, Modena, Parma e province limitrofe nel Nord-Est Italia. Dal 1994 con oltre 500 lavori completati.',
    url: 'https://www.tetto94.it',
    telephone: '+393516519363',
    email: 'info@tetto94.it',
    foundingDate: '1994',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
    knowsAbout: [
      'Riparazione tetti',
      'Rifacimento coperture',
      'Impermeabilizzazione tetto',
      'Ispezione drone tetto',
      'Sostituzione tegole',
      'Stop infiltrazioni',
      'Pulizia grondaie',
      'Tegole in cotto',
      'Guaina impermeabilizzante',
    ],
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://www.tetto94.it/#logo',
      url: 'https://www.tetto94.it/images/logo-white.png',
      width: 280,
      height: 96,
      caption: 'Tetto94 — Logo',
    },
    image: [
      'https://www.tetto94.it/images/hero-roof-mobile.png',
      'https://www.tetto94.it/images/works/work-1.jpg',
      'https://www.tetto94.it/images/works/work-2.jpg',
      'https://www.tetto94.it/images/works/work-3.jpg',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Benedetto Veruda',
      addressLocality: 'Venezia',
      addressRegion: 'VE',
      postalCode: '30100',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.4408,
      longitude: 12.3155,
    },
    /* Service area — province + comuni in tutto il Nord-Est Italia */
    areaServed: [
      // Province Veneto
      { '@type': 'AdministrativeArea', name: 'Provincia di Venezia' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Treviso' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Padova' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Vicenza' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Verona' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Rovigo' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Belluno' },
      // Province Friuli-Venezia Giulia
      { '@type': 'AdministrativeArea', name: 'Provincia di Udine' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Trieste' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Pordenone' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Gorizia' },
      // Province Trentino-Alto Adige
      { '@type': 'AdministrativeArea', name: 'Provincia di Trento' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Bolzano' },
      // Province Emilia-Romagna
      { '@type': 'AdministrativeArea', name: 'Provincia di Bologna' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Modena' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Parma' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Ferrara' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Ravenna' },
      // Province Lombardia (area ads)
      { '@type': 'AdministrativeArea', name: 'Provincia di Bergamo' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Brescia' },
      // Città principali Veneto
      { '@type': 'City', name: 'Venezia' },
      { '@type': 'City', name: 'Mestre' },
      { '@type': 'City', name: 'Padova' },
      { '@type': 'City', name: 'Treviso' },
      { '@type': 'City', name: 'Vicenza' },
      { '@type': 'City', name: 'Verona' },
      { '@type': 'City', name: 'Rovigo' },
      { '@type': 'City', name: 'Belluno' },
      { '@type': 'City', name: 'Chioggia' },
      { '@type': 'City', name: 'Mirano' },
      { '@type': 'City', name: 'Dolo' },
      { '@type': 'City', name: 'San Donà di Piave' },
      { '@type': 'City', name: 'Jesolo' },
      { '@type': 'City', name: 'Portogruaro' },
      { '@type': 'City', name: 'Marcon' },
      { '@type': 'City', name: 'Spinea' },
      { '@type': 'City', name: 'Mogliano Veneto' },
      // Città Friuli-Venezia Giulia
      { '@type': 'City', name: 'Udine' },
      { '@type': 'City', name: 'Trieste' },
      { '@type': 'City', name: 'Pordenone' },
      { '@type': 'City', name: 'Gorizia' },
      // Città Trentino-Alto Adige
      { '@type': 'City', name: 'Trento' },
      { '@type': 'City', name: 'Bolzano' },
      // Città Emilia-Romagna
      { '@type': 'City', name: 'Bologna' },
      { '@type': 'City', name: 'Modena' },
      { '@type': 'City', name: 'Parma' },
      { '@type': 'City', name: 'Ferrara' },
      { '@type': 'City', name: 'Ravenna' },
      // Città Lombardia
      { '@type': 'City', name: 'Bergamo' },
      { '@type': 'City', name: 'Brescia' },
    ],

    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+393516519363',
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: 'IT',
        availableLanguage: 'Italian',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '18:00',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: '+393516519363',
        contactType: 'sales',
        areaServed: 'IT',
        availableLanguage: 'Italian',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servizi per Tetti — Tetto94',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Riparazione Tetto',
            description: 'Interventi mirati e riparazioni specializzate su ogni tipo di copertura a Venezia e province.',
            provider: { '@id': 'https://www.tetto94.it/#business' },
            areaServed: 'Venezia e Province del Veneto',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rifacimento Tetto Completo',
            description: 'Rifacimento completo della copertura con materiali certificati di prima scelta e garanzia scritta.',
            provider: { '@id': 'https://www.tetto94.it/#business' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Impermeabilizzazione Tetto',
            description: 'Applicazione di guaine e membrane impermeabilizzanti di alta qualità per protezione totale e duratura.',
            provider: { '@id': 'https://www.tetto94.it/#business' },
          },
        },
        {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          itemOffered: {
            '@type': 'Service',
            name: 'Ispezione Tetto Gratuita con Drone',
            description: 'Ispezione gratuita con drone per rilievo completo dello stato della copertura. Report fotografico incluso.',
            provider: { '@id': 'https://www.tetto94.it/#business' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sostituzione Tegole',
            description: 'Sostituzione di tegole danneggiate, rotte o mancanti con materiali certificati in cotto o laterizio.',
            provider: { '@id': 'https://www.tetto94.it/#business' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stop Infiltrazioni Tetto',
            description: "Individuazione accurata e risoluzione definitiva di infiltrazioni d'acqua nel tetto con garanzia.",
            provider: { '@id': 'https://www.tetto94.it/#business' },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pulizia Grondaie e Pluviali',
            description: 'Pulizia e manutenzione professionale di grondaie e pluviali per corretto deflusso delle acque piovane.',
            provider: { '@id': 'https://www.tetto94.it/#business' },
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '6',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Marco Ferretti' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: "Squadra puntuale e professionale. Hanno risolto un'infiltrazione cronica che nessun altro riusciva a trovare. Ispezione con drone incredibile. Consigliato al 100%.",
        datePublished: '2024-03-15',
        publisher: { '@type': 'Organization', name: 'Google Reviews' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Giulia Marchetti' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Rifacimento completo del tetto di una villa storica. Lavoro impeccabile, materiali di qualità e rispetto per i tempi. Ottimo rapporto qualità/prezzo.',
        datePublished: '2024-05-20',
        publisher: { '@type': 'Organization', name: 'Google Reviews' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Roberto Conti' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: "Dopo il temporale avevo urgenza. Hanno risposto in poche ore, intervento d'emergenza gestito perfettamente. Garanzia scritta su tutto il lavoro.",
        datePublished: '2024-07-10',
        publisher: { '@type': 'Organization', name: 'Google Reviews' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Anna Vitali' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Il report con le foto del drone è stato una rivelazione. Preventivo onesto, lavoro perfetto. Li richiamerò senza dubbio.',
        datePublished: '2024-09-05',
        publisher: { '@type': 'Organization', name: 'Google Reviews' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Luca Bernardi' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Ho contattato Tetto94 per la perdita nel tetto della mia casa a Mestre. Intervento rapido e definitivo. Bravissimi.',
        datePublished: '2024-10-18',
        publisher: { '@type': 'Organization', name: 'Google Reviews' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Cristina Moretti' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Impermeabilizzazione del lastrico solare perfetta. Nessuna infiltrazione dalla primavera scorsa. Professionali e seri.',
        datePublished: '2025-01-12',
        publisher: { '@type': 'Organization', name: 'Google Reviews' },
      },
    ],
    sameAs: [
      'https://www.instagram.com/tetto94',
      'https://www.facebook.com/tetto94',
    ],
  }

  /* ── 3. BreadcrumbList ──────────────────────────────────── */
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.tetto94.it',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Servizi',
        item: 'https://www.tetto94.it/#servizi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Galleria Lavori',
        item: 'https://www.tetto94.it/#galleria',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contatti',
        item: 'https://www.tetto94.it/contatti',
      },
    ],
  }

  /* ── 4. FAQPage — 12 domande longtail ──────────────────── */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "L'ispezione con drone è davvero gratuita?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Sì, l'ispezione iniziale con drone è completamente gratuita e senza impegno. Dopo il sopralluogo riceverete un report fotografico dettagliato e un preventivo trasparente entro 24 ore.",
        },
      },
      {
        '@type': 'Question',
        name: 'In quali zone operate per la riparazione tetti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tetto94 opera in tutto il Nord-Est e Centro-Nord Italia: Venezia, Mestre, Padova, Treviso, Vicenza, Verona, Rovigo, Belluno, Chioggia, Mirano, Jesolo, San Donà di Piave, Portogruaro (Veneto), Udine, Trieste, Pordenone, Gorizia (Friuli-Venezia Giulia), Trento, Bolzano (Trentino-Alto Adige), Bologna, Modena, Parma, Ferrara, Ravenna (Emilia-Romagna), Bergamo, Brescia (Lombardia). Preventivo gratuito entro 24 ore.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto costa riparare un tetto a Venezia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Il costo dipende dal tipo di intervento, dalle dimensioni della copertura e dai materiali necessari. Offriamo un pacchetto di manutenzione completa a partire da 6.500€ IVA inclusa con garanzia scritta. Il preventivo è sempre gratuito.',
        },
      },
      {
        '@type': 'Question',
        name: 'Fornite garanzia scritta sui lavori di rifacimento tetto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì, forniamo sempre garanzia scritta su tutti i lavori eseguiti. La durata della garanzia varia in base al tipo di intervento: dalla semplice riparazione al rifacimento completo con impermeabilizzazione.',
        },
      },
      {
        '@type': 'Question',
        name: 'In quanto tempo intervenite per una perdita d\'acqua dal tetto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Rispondiamo alle richieste entro 24 ore. Per interventi urgenti dopo temporali o eventi atmosferici cerchiamo di intervenire il prima possibile, spesso in giornata. Contattateci al +39 351 651 9363.",
        },
      },
      {
        '@type': 'Question',
        name: 'Cosa include il servizio di impermeabilizzazione tetto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Il servizio include la pulizia completa della copertura, l'applicazione di primer specifico, la posa di guaine o membrane impermeabilizzanti certificate, i risvolti su tutti i punti critici (camini, abbaini, gronde) e il collaudo finale.",
        },
      },
      {
        '@type': 'Question',
        name: 'Come funziona l\'ispezione con drone per il tetto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Il drone sorvola l'intera copertura riprendendo ogni angolo in alta risoluzione. Il tecnico analizza le immagini per individuare tegole rotte, crepe, muschi, infiltrazioni potenziali e problemi alle gronde. Il report fotografico completo viene consegnato gratuitamente.",
        },
      },
      {
        '@type': 'Question',
        name: 'Riparate anche tetti in amianto o eternit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Sì, gestiamo anche interventi su coperture in amianto/eternit in conformità con le normative vigenti italiane e regionali del Veneto. Contattateci per un sopralluogo gratuito e una valutazione specifica.",
        },
      },
      {
        '@type': 'Question',
        name: 'Offrite il servizio di pulizia e manutenzione grondaie?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Sì, offriamo pulizia completa di grondaie e pluviali con rimozione di foglie, detriti, muschi e verifica dell'integrità strutturale. Il servizio include anche il controllo dei giunti e dei fissaggi per prevenire distacchi.",
        },
      },
      {
        '@type': 'Question',
        name: 'Lavorate anche su edifici storici e ville antiche?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Sì, abbiamo esperienza specifica nel restauro di coperture di edifici storici, ville e casali con vincoli architettonici. Utilizziamo tegole in cotto tradizionali e tecniche conservative nel rispetto dei materiali originali.",
        },
      },
      {
        '@type': 'Question',
        name: 'Come posso richiedere un preventivo per il rifacimento del tetto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Potete contattarci al +39 351 651 9363 oppure compilare il modulo sul sito. Risponderemo entro 24 ore per fissare un sopralluogo gratuito con ispezione drone. Il preventivo è sempre dettagliato e senza impegno.",
        },
      },
      {
        '@type': 'Question',
        name: 'Quali materiali utilizzate per la sostituzione delle tegole?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Utilizziamo esclusivamente materiali certificati CE di prima scelta: tegole in cotto naturale, tegole in laterizio, guaine bituminose e polimeriche, membrane traspiranti e sistemi di fissaggio meccanico omologati. Scegliamo i materiali in base al tipo di copertura esistente.",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
