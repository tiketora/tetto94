/**
 * Tetto94 — Unique local paragraphs for /coibentazione-tetto/[city]
 * One short, genuinely different paragraph per city (never copied between
 * cities, and never reused from the Ads landing page or the rifacimento
 * city pages), used in the "Il Servizio" section of the generic service
 * template. Covers the 12 Veneto cities that are indexed for this service
 * (see INDEXED_CITY_PAGES in data/services.ts).
 */
export const COIBENTAZIONE_CITY_PARAGRAPHS: Record<string, string> = {
  venezia:
    "A Venezia l'umidità lagunare e le escursioni termiche rendono la coibentazione del tetto un intervento prioritario: un sottotetto isolato riduce condensa interna e dispersione di calore verso i canali. Interveniamo su tetti a falda e coperture storiche senza ponteggi, rispettando i vincoli tipici del centro lagunare.",
  mestre:
    "Mestre conta un patrimonio edilizio degli anni '60-'80 spesso privo di coibentazione originaria: isolare tetto e sottotetto in queste abitazioni riduce in modo netto i consumi di riscaldamento invernale. Interveniamo con insufflaggio o pannelli in base allo stato del solaio esistente.",
  padova:
    "Il centro storico di Padova, con edifici in cotto e coperture tradizionali, richiede coibentazioni dall'interno che non alterino l'aspetto esterno del tetto. Nella cintura residenziale più moderna lavoriamo spesso in abbinamento al rifacimento del manto.",
  treviso:
    "Nella Marca Trevigiana, tra ville storiche e case di campagna, la coibentazione dall'esterno si integra bene con gli interventi di rifacimento della copertura, preservando materiali e proporzioni originarie. Per i sottotetti non abitati l'insufflaggio resta la soluzione più rapida.",
  verona:
    "A Verona, dove il mercato delle ristrutturazioni è molto attivo, isoliamo sottotetti di ville e condomini con insufflaggio e pannelli certificati CE, riducendo i costi di riscaldamento nelle stagioni più fredde della pianura veronese.",
  vicenza:
    "Il patrimonio architettonico vicentino impone particolare attenzione nella scelta del metodo di coibentazione: privilegiamo l'isolamento dall'interno sugli edifici di pregio, mentre sulle abitazioni più recenti valutiamo anche l'intervento dall'esterno abbinato al rifacimento.",
  rovigo:
    "Nel basso Polesine, dove l'umidità del Delta del Po è persistente, un tetto ben coibentato limita anche la formazione di condensa interna oltre alla dispersione termica. Utilizziamo materiali traspiranti come la lana di roccia per garantire il giusto equilibrio igrometrico.",
  belluno:
    "Nel bellunese, con inverni rigidi e neve abbondante, uno spessore isolante adeguato (in genere verso i 16 cm) è determinante per il comfort e per la tenuta della copertura sotto il carico nevoso. Valutiamo lo spessore corretto durante il sopralluogo drone gratuito.",
  chioggia:
    "Chioggia condivide con Venezia le sfide della salsedine e dell'umidità lagunare: la coibentazione, se eseguita con materiali certificati e traspiranti, protegge sottotetto e struttura senza favorire la formazione di muffe.",
  mirano:
    "Nella Riviera del Brenta, tra le ville venete che circondano Mirano, la coibentazione dall'interno permette di isolare senza intervenire sulle facciate storiche, mentre nelle nuove costruzioni valutiamo anche pannelli sopra la struttura.",
  'san-dona-di-piave':
    "San Donà di Piave e il Veneto Orientale contano un gran numero di seconde case, spesso utilizzate solo in stagione: l'insufflaggio del sottotetto è qui la soluzione più richiesta perché rapida, economica e senza opere murarie.",
  'mogliano-veneto':
    "Mogliano Veneto, area residenziale ad alta densità tra Venezia e Treviso, ha molte ville e case unifamiliari degli anni passati con sottotetti mai isolati: interveniamo con insufflaggio o pannelli in base all'accessibilità della copertura.",
}

export function getCoibentazioneCityParagraph(citySlug: string): string | undefined {
  return COIBENTAZIONE_CITY_PARAGRAPHS[citySlug]
}
