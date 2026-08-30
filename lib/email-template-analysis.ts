/**
 * Internal notification email — sent to Tetto94 (not the visitor) every time
 * someone completes the T94 Roof Index™ quiz. No visitor contact info is
 * collected at this step (that only happens later on /contatti), so this is
 * purely "someone just ran an analysis, here's their profile and result" —
 * useful for the team to see quiz volume and lead quality in real time.
 *
 * IMPORTANT: the score/band/cost included here are always recomputed
 * server-side from the raw answers (see app/api/notify-analysis/route.ts) —
 * never trust a client-supplied result, or a visitor could spoof an
 * "Emergenza" email with a single crafted request.
 */

import type { CalcoloInput, CalcoloOutput } from './roof-calculator'
import { formatCost } from './roof-calculator'

const ZONA_LABELS: Record<CalcoloInput['zona'], string> = {
  costiera: 'Zona Costiera (Venezia, Chioggia, Lido, Jesolo...)',
  alpina: 'Zona Alpina (Belluno, Cadore, montagna...)',
  pianura: 'Zona Pianura (Padova, Verona, Bologna, Treviso...)',
}

const ETA_LABELS: Record<CalcoloInput['fasciaEta'], string> = {
  '0-10': '0 – 10 anni',
  '11-20': '11 – 20 anni',
  '21-30': '21 – 30 anni',
  '30+': 'Oltre 30 anni',
}

const PROBLEMA_LABELS: Record<CalcoloInput['problema'], string> = {
  nessuno: 'Nessun problema',
  tegole: 'Tegole rotte o spostate',
  infiltrazioni_leggere: 'Infiltrazioni leggere',
  infiltrazioni_attive: 'Infiltrazioni attive',
  strutturali: 'Danni strutturali',
}

const DURATA_LABELS: Record<CalcoloInput['durata'], string> = {
  non_applicabile: 'Non applicabile',
  recente: 'Da poco (ultime settimane)',
  '6-12': '6 – 12 mesi',
  oltre_1_anno: 'Oltre 1 anno',
}

const MATERIALE_LABELS: Record<CalcoloInput['materiale'], string> = {
  tegole_coppi: 'Tegole / Coppi',
  guaina: 'Guaina',
  lamiera: 'Lamiera / Metallo',
  misto: 'Misto',
}

const ULTIMO_INTERVENTO_LABELS: Record<CalcoloInput['ultimoIntervento'], string> = {
  recentemente: 'Recentemente (ultimi 12 mesi)',
  '1-5_anni': '1 – 5 anni fa',
  oltre_5_anni: 'Oltre 5 anni fa',
  mai: 'Mai',
}

function formatNow(): string {
  return new Date().toLocaleString('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function costLine(output: CalcoloOutput): string {
  if (output.score <= 25) return 'Solo ispezione annuale — nessun intervento urgente'
  if (output.isEmergenza) return 'Valutazione in loco necessaria (emergenza)'
  return `${formatCost(output.estimatedCostMin)} – ${formatCost(output.estimatedCostMax)}`
}

export function buildAnalysisEmailHtml(input: CalcoloInput, output: CalcoloOutput): string {
  const rows: Array<[string, string]> = [
    ['Zona climatica', ZONA_LABELS[input.zona]],
    ['Superficie', `${input.superficie} m²`],
    ['Età copertura', ETA_LABELS[input.fasciaEta]],
    ['Problema riscontrato', PROBLEMA_LABELS[input.problema]],
    ['Durata problema', DURATA_LABELS[input.durata]],
    ['Materiale', MATERIALE_LABELS[input.materiale]],
    ['Ultimo intervento', ULTIMO_INTERVENTO_LABELS[input.ultimoIntervento]],
  ]

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuova Analisi T94 Roof Index – Tetto94</title>
</head>
<body style="margin:0;padding:0;background:#0E0E0E;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0E0E0E;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header bar -->
          <tr>
            <td style="background:${output.band.hex};padding:0;border-radius:4px 4px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:24px 36px 22px;">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tLssgXZKczF77a18AcoSHHaAG0zige.png"
                      alt="Tetto94"
                      width="160"
                      height="47"
                      style="display:block;width:160px;height:auto;border:0;outline:none;text-decoration:none;"
                    />
                  </td>
                  <td style="padding:28px 36px 24px;text-align:right;vertical-align:middle;">
                    <span style="display:inline-block;background:rgba(0,0,0,0.2);color:#ffffff;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:6px 14px;border-radius:2px;">Nuova Analisi Roof Index</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:${output.band.hex};height:6px;overflow:hidden;">
              <div style="height:6px;background:linear-gradient(135deg,${output.band.hex} 50%,#161616 50%);"></div>
            </td>
          </tr>

          <!-- Body -->
          <td style="background:#161616;padding:40px 36px 32px;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:${output.band.hex}14;border-left:3px solid ${output.band.hex};border-radius:0 3px 3px 0;padding:14px 18px;">
                  <p style="margin:0;font-size:13px;color:${output.band.hex};font-weight:700;letter-spacing:0.5px;">UN VISITATORE HA COMPLETATO UN'ANALISI T94 ROOF INDEX™</p>
                  <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.4);">Ricevuta il ${formatNow()} (ora italiana)</p>
                </td>
              </tr>
            </table>

            <!-- Result badge -->
            <div style="display:inline-block;background:${output.band.hex};color:#ffffff;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:2px;margin-bottom:10px;">${output.band.labelShort}</div>
            <h1 style="margin:0 0 6px;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">${output.band.label}</h1>
            <p style="margin:0 0 4px;font-size:14px;color:rgba(255,255,255,0.6);">Punteggio di rischio: <strong style="color:#ffffff;">${output.score}/100</strong></p>
            <p style="margin:0 0 32px;font-size:14px;color:rgba(255,255,255,0.6);">Stima intervento: <strong style="color:${output.band.hex};">${costLine(output)}</strong></p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr><td style="height:1px;background:rgba(255,255,255,0.07);"></td></tr>
            </table>

            <!-- Answers grid -->
            <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Risposte del Questionario</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
              ${rows
                .map(
                  ([label, value], i) => `
              <tr>
                <td colspan="2" style="padding:${i === 0 ? '0' : '12px'} 0 12px;${i < rows.length - 1 ? 'border-bottom:1px solid rgba(255,255,255,0.06);' : ''}">
                  <p style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.3);">${label}</p>
                  <p style="margin:0;font-size:14px;font-weight:600;color:#ffffff;">${value}</p>
                </td>
              </tr>`
                )
                .join('')}
            </table>

          </td>

          <!-- Footer -->
          <tr>
            <td style="background:#0E0E0E;padding:24px 36px;border-radius:0 0 4px 4px;border:1px solid rgba(255,255,255,0.05);border-top:none;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.7;">
                      Email generata automaticamente dal T94 Roof Index™ su
                      <a href="https://www.tetto94.it/calcola-preventivo" style="color:#EB1C26;text-decoration:none;">www.tetto94.it</a>.
                      Nessun dato di contatto del visitatore è stato raccolto in questa fase.<br/>
                      Tetto94 · Via Benedetto Veruda, 30100 Venezia VE, Italia
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function buildAnalysisEmailText(input: CalcoloInput, output: CalcoloOutput): string {
  return `NUOVA ANALISI T94 ROOF INDEX™ – TETTO94

Ricevuta il ${formatNow()} (ora italiana)

Risultato: ${output.band.label} (${output.band.labelShort})
Punteggio di rischio: ${output.score}/100
Stima intervento: ${costLine(output)}

Risposte del questionario:
- Zona climatica: ${ZONA_LABELS[input.zona]}
- Superficie: ${input.superficie} m²
- Età copertura: ${ETA_LABELS[input.fasciaEta]}
- Problema riscontrato: ${PROBLEMA_LABELS[input.problema]}
- Durata problema: ${DURATA_LABELS[input.durata]}
- Materiale: ${MATERIALE_LABELS[input.materiale]}
- Ultimo intervento: ${ULTIMO_INTERVENTO_LABELS[input.ultimoIntervento]}

---
Nessun dato di contatto del visitatore è stato raccolto in questa fase.
Generata automaticamente da www.tetto94.it/calcola-preventivo
`
}
