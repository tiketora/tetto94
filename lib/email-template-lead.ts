/**
 * Internal notification email — sent to Tetto94 when a visitor unlocks
 * their best-price offer on the T94 Roof Index™ result by submitting a
 * phone number. This is the highest-intent event in the funnel: unlike the
 * quiz-completion email (email-template-analysis.ts), this one carries a
 * phone number and should be treated as a hot lead requiring a callback
 * within 24h — the subject line and layout are written to make that
 * urgency obvious at a glance in an inbox.
 *
 * IMPORTANT: the score/band/cost included here are always recomputed
 * server-side from the raw answers — never trust a client-supplied result.
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

export function buildLeadEmailHtml(input: CalcoloInput, output: CalcoloOutput, telefono: string, citta?: string): string {
  const rows: Array<[string, string]> = [
    ['Zona climatica', ZONA_LABELS[input.zona]],
    ['Superficie', `${input.superficie} m²`],
    ['Età copertura', ETA_LABELS[input.fasciaEta]],
    ['Problema riscontrato', PROBLEMA_LABELS[input.problema]],
    ['Durata problema', DURATA_LABELS[input.durata]],
    ['Materiale', MATERIALE_LABELS[input.materiale]],
    ['Ultimo intervento', ULTIMO_INTERVENTO_LABELS[input.ultimoIntervento]],
    ...(citta ? ([['Città indicata', citta]] as Array<[string, string]>) : []),
  ]

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuovo Lead — Offerta Migliore Richiesta — Tetto94</title>
</head>
<body style="margin:0;padding:0;background:#0E0E0E;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0E0E0E;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header bar -->
          <tr>
            <td style="background:#EB1C26;padding:0;border-radius:4px 4px 0 0;">
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
                    <span style="display:inline-block;background:rgba(0,0,0,0.25);color:#ffffff;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:6px 14px;border-radius:2px;">Lead Caldo · Richiama entro 24h</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#EB1C26;height:6px;overflow:hidden;">
              <div style="height:6px;background:linear-gradient(135deg,#EB1C26 50%,#161616 50%);"></div>
            </td>
          </tr>

          <!-- Body -->
          <td style="background:#161616;padding:40px 36px 32px;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#EB1C2614;border-left:3px solid #EB1C26;border-radius:0 3px 3px 0;padding:14px 18px;">
                  <p style="margin:0;font-size:13px;color:#EB1C26;font-weight:700;letter-spacing:0.5px;">UN VISITATORE HA SBLOCCATO LA SUA OFFERTA MIGLIORE</p>
                  <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.4);">Ricevuta il ${formatNow()} (ora italiana)</p>
                </td>
              </tr>
            </table>

            <!-- Phone number, front and center -->
            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Numero di Telefono</p>
            <a href="tel:${telefono}" style="display:block;margin:0 0 28px;font-size:32px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;text-decoration:none;">${telefono}</a>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr><td style="height:1px;background:rgba(255,255,255,0.07);"></td></tr>
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
                      <a href="https://www.tetto94.it/calcola-preventivo" style="color:#EB1C26;text-decoration:none;">www.tetto94.it</a>
                      quando il visitatore ha richiesto la sua offerta migliore.<br/>
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

export function buildLeadEmailText(input: CalcoloInput, output: CalcoloOutput, telefono: string, citta?: string): string {
  return `NUOVO LEAD — OFFERTA MIGLIORE RICHIESTA — TETTO94
RICHIAMARE ENTRO 24H

Ricevuta il ${formatNow()} (ora italiana)

TELEFONO: ${telefono}

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
- Ultimo intervento: ${ULTIMO_INTERVENTO_LABELS[input.ultimoIntervento]}${citta ? `\n- Città indicata: ${citta}` : ''}

---
Generata automaticamente da www.tetto94.it/calcola-preventivo
`
}
