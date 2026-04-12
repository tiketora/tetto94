interface ContactEmailProps {
  nome: string
  cognome: string
  telefono: string
  citta: string
  servizio: string
  messaggio: string
}

// export function buildContactEmailHtml(data: ContactEmailProps): string {
//   const { nome, cognome, telefono, citta, servizio, messaggio } = data
//   const fullName = `${nome} ${cognome}`
//   const now = new Date().toLocaleString('it-IT', {
//     timeZone: 'Europe/Rome',
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   })

//   return `<!DOCTYPE html>
// <html lang="it">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>Nuova Richiesta – Tetto94</title>
// </head>
// <body style="margin:0;padding:0;background:#0E0E0E;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

//   <!-- Wrapper -->
//   <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0E0E0E;padding:40px 16px;">
//     <tr>
//       <td align="center">
//         <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

//           <!-- ── Header bar ── -->
//           <tr>
//             <td style="background:#EB1C26;padding:0;border-radius:4px 4px 0 0;">
//               <!-- Red diagonal accent strip -->
//               <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                 <tr>
//                   <td style="padding:24px 36px 22px;">
//                     <!-- Real logo PNG — white T stem + red roof crossbar, transparent bg -->
//                     <img
//                       src="https://www.tetto94.it/images/logo-symbol.png"
//                       alt="Tetto94"
//                       width="90"
//                       height="47"
//                       style="display:block;width:90px;height:auto;border:0;outline:none;text-decoration:none;"
//                     />
//                   </td>
//                   <td style="padding:28px 36px 24px;text-align:right;vertical-align:middle;">
//                     <span style="display:inline-block;background:rgba(0,0,0,0.2);color:#ffffff;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:6px 14px;border-radius:2px;">Nuova Richiesta</span>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- ── Red diagonal divider ── -->
//           <tr>
//             <td style="background:#EB1C26;height:6px;overflow:hidden;">
//               <div style="height:6px;background:linear-gradient(135deg,#EB1C26 50%,#161616 50%);"></div>
//             </td>
//           </tr>

//           <!-- ── Body ── -->
//           <td style="background:#161616;padding:40px 36px 32px;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">

//             <!-- Alert banner -->
//             <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
//               <tr>
//                 <td style="background:rgba(235,28,38,0.08);border-left:3px solid #EB1C26;border-radius:0 3px 3px 0;padding:14px 18px;">
//                   <p style="margin:0;font-size:13px;color:#EB1C26;font-weight:700;letter-spacing:0.5px;">HAI RICEVUTO UNA NUOVA RICHIESTA DI PREVENTIVO</p>
//                   <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.4);">Ricevuta il ${now} (ora italiana)</p>
//                 </td>
//               </tr>
//             </table>

//             <!-- Client name heading -->
//             <h1 style="margin:0 0 6px;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">${fullName}</h1>
//             <p style="margin:0 0 32px;font-size:14px;color:rgba(255,255,255,0.4);">Vuole un preventivo per: <strong style="color:#EB1C26;">${servizio || 'Non specificato'}</strong></p>

//             <!-- Divider -->
//             <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
//               <tr><td style="height:1px;background:rgba(255,255,255,0.07);"></td></tr>
//             </table>

//             <!-- Info grid -->
//             <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
//               <tr>
//                 <td style="padding-bottom:16px;width:50%;vertical-align:top;padding-right:12px;">
//                   <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Telefono</p>
//                   <a href="tel:${telefono.replace(/\s/g, '')}" style="color:#EB1C26;font-size:15px;font-weight:700;text-decoration:none;">${telefono}</a>
//                 </td>
//                 <td style="padding-bottom:16px;width:50%;vertical-align:top;padding-left:12px;">
//                   <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Citta / Zona</p>
//                   <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;">${citta || '—'}</p>
//                 </td>
//               </tr>
//               <tr>
//                 <td colspan="2" style="padding-bottom:4px;">
//                   <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Servizio Richiesto</p>
//                   <table cellpadding="0" cellspacing="0" border="0">
//                     <tr>
//                       <td style="background:#EB1C26;border-radius:2px;padding:5px 14px;">
//                         <span style="font-size:13px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">${servizio || 'Non specificato'}</span>
//                       </td>
//                     </tr>
//                   </table>
//                 </td>
//               </tr>
//             </table>

//             <!-- Divider -->
//             <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
//               <tr><td style="height:1px;background:rgba(255,255,255,0.07);"></td></tr>
//             </table>

//             ${
//               messaggio
//                 ? `<!-- Message block -->
//             <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
//               <tr>
//                 <td style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:4px;padding:20px 22px;">
//                   <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Messaggio del Cliente</p>
//                   <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.8);line-height:1.7;">${messaggio.replace(/\n/g, '<br/>')}</p>
//                 </td>
//               </tr>
//             </table>`
//                 : ''
//             }

//           </td>

//           <!-- ── CTA Row ── -->
//           <tr>
//             <td style="background:#1A1A1A;padding:24px 36px;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">
//               <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                 <tr>
//                   <td style="padding-right:8px;">
//                     <a href="tel:${telefono.replace(/\s/g, '')}" style="display:block;text-align:center;background:#EB1C26;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 20px;border-radius:3px;">Chiama Ora</a>
//                   </td>
//                   <td style="padding-left:8px;">
//                     <a href="https://wa.me/${telefono.replace(/[\s+]/g, '')}" style="display:block;text-align:center;background:#25D366;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 20px;border-radius:3px;">WhatsApp</a>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- ── Footer ── -->
//           <tr>
//             <td style="background:#0E0E0E;padding:24px 36px;border-radius:0 0 4px 4px;border:1px solid rgba(255,255,255,0.05);border-top:none;">
//               <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                 <tr>
//                   <td>
//                     <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.7;">
//                       Questa email è stata generata automaticamente dal form di contatto su
//                       <a href="https://www.tetto94.it" style="color:#EB1C26;text-decoration:none;">www.tetto94.it</a>.<br/>
//                       Tetto94 · Via Benedetto Veruda, 30100 Venezia VE, Italia
//                     </p>
//                   </td>
//                   <td style="text-align:right;white-space:nowrap;padding-left:16px;">
//                     <img
//                       src="https://www.tetto94.it/images/logo-symbol.png"
//                       alt="Tetto94"
//                       width="50"
//                       height="26"
//                       style="display:block;width:50px;height:auto;border:0;outline:none;opacity:0.25;"
//                     />
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//         </table>
//       </td>
//     </tr>
//   </table>

// </body>
// </html>`
// }

export function buildContactEmailHtml(data: ContactEmailProps): string {
  const { nome, cognome, telefono, citta, servizio, messaggio } = data
  const fullName = `${nome} ${cognome}`
  const now = new Date().toLocaleString('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kërkesë e Re – Tetto94</title>
</head>
<body style="margin:0;padding:0;background:#0E0E0E;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0E0E0E;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background:#EB1C26;padding:0;border-radius:4px 4px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:24px 36px 22px;">
                    <img
                      src="https://www.tetto94.it/images/logo-symbol.png"
                      alt="Tetto94"
                      width="90"
                      height="47"
                      style="display:block;width:90px;height:auto;border:0;outline:none;text-decoration:none;"
                    />
                  </td>
                  <td style="padding:28px 36px 24px;text-align:right;vertical-align:middle;">
                    <span style="display:inline-block;background:rgba(0,0,0,0.2);color:#ffffff;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:6px 14px;border-radius:2px;">Kërkesë e Re</span>
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

          <td style="background:#161616;padding:40px 36px 32px;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:rgba(235,28,38,0.08);border-left:3px solid #EB1C26;border-radius:0 3px 3px 0;padding:14px 18px;">
                  <p style="margin:0;font-size:13px;color:#EB1C26;font-weight:700;letter-spacing:0.5px;">Keni marrë një kërkesë të re për ofertë</p>
                  <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.4);">Marrë më ${now} (ora italiane)</p>
                </td>
              </tr>
            </table>

            <h1 style="margin:0 0 6px;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">${fullName}</h1>
            <p style="margin:0 0 32px;font-size:14px;color:rgba(255,255,255,0.4);">Kërkon një ofertë për: <strong style="color:#EB1C26;">${servizio || 'Nuk është specifikuar'}</strong></p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr><td style="height:1px;background:rgba(255,255,255,0.07);"></td></tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding-bottom:16px;width:50%;vertical-align:top;padding-right:12px;">
                  <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Telefoni</p>
                  <a href="tel:${telefono.replace(/\s/g, '')}" style="color:#EB1C26;font-size:15px;font-weight:700;text-decoration:none;">${telefono}</a>
                </td>
                <td style="padding-bottom:16px;width:50%;vertical-align:top;padding-left:12px;">
                  <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Qyteti / Zona</p>
                  <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;">${citta || '—'}</p>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding-bottom:4px;">
                  <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Shërbimi i Kërkuar</p>
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#EB1C26;border-radius:2px;padding:5px 14px;">
                        <span style="font-size:13px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">${servizio || 'Nuk është specifikuar'}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
              <tr><td style="height:1px;background:rgba(255,255,255,0.07);"></td></tr>
            </table>

            ${
              messaggio
                ? `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
              <tr>
                <td style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:4px;padding:20px 22px;">
                  <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);">Mesazhi i Klientit</p>
                  <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.8);line-height:1.7;">${messaggio.replace(/\n/g, '<br/>')}</p>
                </td>
              </tr>
            </table>`
                : ''
            }

          </td>

          <tr>
            <td style="background:#1A1A1A;padding:24px 36px;border-left:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:8px;">
                    <a href="tel:${telefono.replace(/\s/g, '')}" style="display:block;text-align:center;background:#EB1C26;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 20px;border-radius:3px;">Telefono Tani</a>
                  </td>
                  <td style="padding-left:8px;">
                    <a href="https://wa.me/${telefono.replace(/[\s+]/g, '')}" style="display:block;text-align:center;background:#25D366;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 20px;border-radius:3px;">WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#0E0E0E;padding:24px 36px;border-radius:0 0 4px 4px;border:1px solid rgba(255,255,255,0.05);border-top:none;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.7;">
                      Ky email është gjeneruar automatikisht nga forma e kontaktit në
                      <a href="https://www.tetto94.it" style="color:#EB1C26;text-decoration:none;">www.tetto94.it</a>.<br/>
                      Tetto94 · Via Benedetto Veruda, 30100 Venezia VE, Italia
                    </p>
                  </td>
                  <td style="text-align:right;white-space:nowrap;padding-left:16px;">
                    <img
                      src="https://www.tetto94.it/images/logo-symbol.png"
                      alt="Tetto94"
                      width="50"
                      height="26"
                      style="display:block;width:50px;height:auto;border:0;outline:none;opacity:0.25;"
                    />
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
export function buildContactEmailText(data: ContactEmailProps): string {
  const { nome, cognome, telefono, citta, servizio, messaggio } = data
  return `NUOVA RICHIESTA DI PREVENTIVO – TETTO94

Nome: ${nome} ${cognome}
Telefono: ${telefono}
Città / Zona: ${citta || '—'}
Servizio: ${servizio || 'Non specificato'}

Messaggio:
${messaggio || '(nessun messaggio)'}

---
Inviato da www.tetto94.it
`
}
