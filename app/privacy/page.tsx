import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'

export const metadata: Metadata = {
  title: 'Informativa sulla Privacy | Tetto94',
  description:
    'Informativa sulla privacy di Tetto94. Come trattiamo i tuoi dati personali, cookie e informazioni raccolte tramite il sito tetto94.it.',
  alternates: {
    canonical: 'https://www.tetto94.it/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const sections = [
  {
    id: 'titolare',
    title: '01. Titolare del Trattamento',
    content: (
      <>
        <p>
          Il titolare del trattamento dei dati personali raccolti tramite il sito{' '}
          <strong className="text-white">www.tetto94.it</strong> è:
        </p>
        <div className="mt-4 border-l-2 border-[#EB1C26] pl-5 flex flex-col gap-1.5 text-white/70">
          <p><strong className="text-white">Tetto94</strong></p>
          <p>Via Benedetto Veruda, 30100 Venezia VE, Italia</p>
          <p>Telefono: <a href="tel:+393516519363" className="text-[#EB1C26] hover:text-red-400 transition-colors">+39 351 651 9363</a></p>
          <p>Email: <a href="mailto:info@tetto94.it" className="text-[#EB1C26] hover:text-red-400 transition-colors">info@tetto94.it</a></p>
          <p>Sito web: <a href="https://www.tetto94.it" className="text-[#EB1C26] hover:text-red-400 transition-colors">www.tetto94.it</a></p>
        </div>
      </>
    ),
  },
  {
    id: 'dati-raccolti',
    title: '02. Dati Raccolti',
    content: (
      <>
        <p>
          Tetto94 raccoglie dati personali esclusivamente nei seguenti casi:
        </p>
        <div className="mt-5 flex flex-col gap-6">
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Modulo di contatto</h3>
            <p>
              Quando compili il modulo di richiesta preventivo o ispezione gratuita, raccogliamo:
              nome, cognome, numero di telefono, indirizzo email, comune/localita, messaggio facoltativo.
              Questi dati vengono utilizzati esclusivamente per rispondere alla tua richiesta e fornirti
              un preventivo per i nostri servizi di riparazione, rifacimento coperture o ispezione con drone.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Dati di navigazione</h3>
            <p>
              I sistemi informatici acquisiscono automaticamente dati tecnici trasmessi dal tuo browser:
              indirizzo IP, tipo di browser, sistema operativo, pagine visitate, orario della visita,
              provenienza geografica approssimativa. Questi dati sono utilizzati per finalita statistiche
              e di sicurezza, in forma aggregata e anonimizzata.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Contatto WhatsApp e telefono</h3>
            <p>
              Se ci contatti tramite WhatsApp (+39 351 651 9363) o telefono, i dati che fornisci
              spontaneamente (nome, numero, contenuto del messaggio) vengono utilizzati esclusivamente
              per gestire la tua richiesta di preventivo o assistenza.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'finalita',
    title: '03. Finalita del Trattamento',
    content: (
      <>
        <p>I dati raccolti vengono trattati per le seguenti finalita:</p>
        <ul className="mt-4 flex flex-col gap-3">
          {[
            'Rispondere alle richieste di preventivo, ispezione gratuita con drone o informazioni sui servizi',
            'Gestire le comunicazioni pre e post intervento (riparazione tetto, rifacimento coperture, impermeabilizzazione, sostituzione tegole, pulizia grondaie)',
            'Adempiere agli obblighi di legge applicabili',
            'Migliorare i servizi offerti attraverso analisi statistiche aggregate',
            'Mostrare annunci pertinenti agli utenti tramite Google Ads (solo con consenso)',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#EB1C26]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 'base-giuridica',
    title: '04. Base Giuridica',
    content: (
      <>
        <p>Il trattamento dei dati si fonda sulle seguenti basi giuridiche (art. 6 GDPR):</p>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Esecuzione di un contratto', desc: 'Gestione delle richieste di preventivo e degli interventi tecnici' },
            { label: 'Consenso', desc: 'Cookie analitici e pubblicitari, attivati solo dopo accettazione esplicita' },
            { label: 'Legittimo interesse', desc: 'Sicurezza del sito e prevenzione di usi fraudolenti' },
            { label: 'Obbligo legale', desc: 'Adempimento di obblighi fiscali e amministrativi' },
          ].map((item) => (
            <div key={item.label} className="border border-white/10 p-4 bg-white/[0.02]">
              <p className="text-white font-bold text-sm mb-1">{item.label}</p>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'cookie',
    title: '05. Cookie e Tecnologie di Tracciamento',
    content: (
      <>
        <p>
          Il sito tetto94.it utilizza le seguenti categorie di cookie:
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {[
            {
              tipo: 'Cookie tecnici (necessari)',
              desc: 'Necessari per il funzionamento del sito. Non richiedono consenso. Includono il cookie di preferenza del consenso cookie stesso (chiave: tetto94_cookie_consent).',
              consenso: 'Non richiesto',
            },
            {
              tipo: 'Google Analytics (G-HWXK50JPDE)',
              desc: 'Raccoglie dati anonimi sulle sessioni di navigazione: pagine visitate, durata, provenienza geografica, dispositivo. Utilizzato per migliorare il sito. I dati sono aggregati e non identificano personalmente l\'utente.',
              consenso: 'Richiesto',
            },
            {
              tipo: 'Google Ads (AW-18086489395)',
              desc: 'Permette di misurare le conversioni generate dagli annunci Google Ads (clic su telefono, compilazione modulo, click WhatsApp) e di mostrare annunci pertinenti a utenti che hanno visitato il sito.',
              consenso: 'Richiesto',
            },
            {
              tipo: 'Google Consent Mode v2',
              desc: 'Implementiamo il Consent Mode v2 di Google. In assenza di consenso, i dati vengono inviati in forma aggregata e modellata, senza tracciamento individuale.',
              consenso: 'Automatico',
            },
          ].map((item) => (
            <div key={item.tipo} className="border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <p className="text-white font-bold text-sm">{item.tipo}</p>
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 ${item.consenso === 'Richiesto' ? 'bg-[#EB1C26]/20 text-[#EB1C26]' : 'bg-white/10 text-white/50'}`}>
                  {item.consenso}
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-white/50 text-sm">
          Puoi revocare il consenso in qualsiasi momento chiudendo e riaprendo il sito — il banner
          di consenso riapparira. In alternativa, puoi gestire i cookie direttamente dalle impostazioni
          del tuo browser.
        </p>
      </>
    ),
  },
  {
    id: 'servizi-terze-parti',
    title: '06. Servizi di Terze Parti',
    content: (
      <>
        <p>Il sito si avvale dei seguenti servizi di terze parti:</p>
        <div className="mt-5 flex flex-col gap-3">
          {[
            { nome: 'Google Analytics', info: 'Analisi traffico web — Privacy Policy: policies.google.com/privacy', link: 'https://policies.google.com/privacy' },
            { nome: 'Google Ads', info: 'Piattaforma pubblicitaria — Privacy Policy: policies.google.com/privacy', link: 'https://policies.google.com/privacy' },
            { nome: 'WhatsApp (Meta)', info: 'Canale di comunicazione — Privacy Policy: whatsapp.com/legal/privacy-policy', link: 'https://www.whatsapp.com/legal/privacy-policy' },
            { nome: 'Vercel', info: 'Hosting del sito — Privacy Policy: vercel.com/legal/privacy-policy', link: 'https://vercel.com/legal/privacy-policy' },
          ].map((s) => (
            <div key={s.nome} className="flex items-start gap-4 border border-white/10 p-4 bg-white/[0.02]">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#EB1C26] mt-2" />
              <div>
                <p className="text-white font-bold text-sm">{s.nome}</p>
                <p className="text-white/60 text-xs mt-0.5">{s.info.split('—')[0]}</p>
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-[#EB1C26] text-xs hover:text-red-400 transition-colors">
                  Visualizza Privacy Policy
                </a>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'conservazione',
    title: '07. Conservazione dei Dati',
    content: (
      <p>
        I dati del modulo di contatto vengono conservati per il tempo strettamente necessario
        alla gestione della tua richiesta e, in caso di contratto di intervento, per il periodo
        richiesto dalla normativa fiscale italiana (10 anni). I dati di navigazione raccolti
        tramite Google Analytics vengono conservati per 26 mesi, come configurato nelle
        impostazioni di Google Analytics. I cookie di consenso vengono conservati nel browser
        per 365 giorni.
      </p>
    ),
  },
  {
    id: 'diritti',
    title: '08. I Tuoi Diritti (GDPR)',
    content: (
      <>
        <p>
          Ai sensi del Regolamento UE 2016/679 (GDPR), hai il diritto di:
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { diritto: 'Accesso', desc: 'Ottenere conferma che sia o meno in corso un trattamento di dati che ti riguardano' },
            { diritto: 'Rettifica', desc: 'Ottenere la correzione di dati inesatti o incompleti' },
            { diritto: 'Cancellazione', desc: 'Ottenere la cancellazione dei tuoi dati (diritto all\'oblio)' },
            { diritto: 'Limitazione', desc: 'Ottenere la limitazione del trattamento in determinate circostanze' },
            { diritto: 'Portabilita', desc: 'Ricevere i dati in formato strutturato e leggibile da dispositivo automatico' },
            { diritto: 'Opposizione', desc: 'Opporti al trattamento dei tuoi dati per finalita di marketing' },
          ].map((item) => (
            <div key={item.diritto} className="border border-white/10 bg-white/[0.02] p-4">
              <p className="text-[#EB1C26] font-bold text-xs uppercase tracking-wider mb-1">Diritto di {item.diritto}</p>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-white/60 text-sm">
          Per esercitare i tuoi diritti, contattaci a{' '}
          <a href="mailto:info@tetto94.it" className="text-[#EB1C26] hover:text-red-400 transition-colors">
            info@tetto94.it
          </a>{' '}
          oppure al numero{' '}
          <a href="tel:+393516519363" className="text-[#EB1C26] hover:text-red-400 transition-colors">
            +39 351 651 9363
          </a>.
          Hai inoltre il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali
          (www.garanteprivacy.it).
        </p>
      </>
    ),
  },
  {
    id: 'aggiornamenti',
    title: '09. Aggiornamenti',
    content: (
      <p>
        La presente informativa puo essere aggiornata in qualsiasi momento per riflettere
        modifiche ai servizi offerti da Tetto94 o alla normativa applicabile. La data
        dell&apos;ultimo aggiornamento e indicata in calce alla pagina. Ti invitiamo a consultare
        periodicamente questa pagina. In caso di modifiche sostanziali, ne daremo comunicazione
        tramite avviso sul sito.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0f0f0f] min-h-screen">

        {/* Hero */}
        <section className="border-b border-white/10 pt-32 pb-16 px-6">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#494949]">
              Tetto94 — Informativa Legale
            </span>
            <h1 className="mt-3 font-display text-[clamp(3rem,9vw,7rem)] leading-none text-white">
              INFORMATIVA<br />
              <span className="text-[#EB1C26]">SULLA PRIVACY.</span>
            </h1>
            <p className="mt-6 text-white/50 text-sm leading-relaxed max-w-xl">
              Questa informativa descrive come Tetto94 raccoglie, utilizza e protegge
              i tuoi dati personali in conformita al Regolamento UE 2016/679 (GDPR)
              e alla normativa italiana vigente.
            </p>
            <p className="mt-3 text-white/30 text-xs">
              Ultimo aggiornamento: Giugno 2026
            </p>
          </div>
        </section>

        {/* Index */}
        <section className="border-b border-white/10 py-8 px-6">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#494949] mb-4">Indice</p>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Sections */}
        <div className="mx-auto max-w-4xl px-6 py-16 flex flex-col gap-16">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="font-display text-[clamp(1.6rem,4vw,2.8rem)] text-white leading-none mb-6">
                {s.title}
              </h2>
              <div className="text-white/60 text-sm leading-relaxed flex flex-col gap-4">
                {s.content}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-white/10 py-12 px-6">
          <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-sm">Hai domande sulla tua privacy?</p>
              <p className="text-white/50 text-xs mt-1">Contattaci direttamente — risponderemo entro 24 ore.</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="mailto:info@tetto94.it"
                className="text-xs font-bold uppercase tracking-wider text-white border border-white/20 px-5 py-2.5 hover:border-white transition-colors"
              >
                info@tetto94.it
              </a>
              <Link
                href="/"
                className="text-xs font-bold uppercase tracking-wider bg-[#EB1C26] text-white px-5 py-2.5 hover:bg-red-700 transition-colors"
              >
                Torna al sito
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
