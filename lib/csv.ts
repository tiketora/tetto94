/**
 * Minimal CSV serializer. Cells that start with a formula trigger character
 * are prefixed with an apostrophe so a malicious value typed into a public
 * form can never execute as a formula when the admin opens the export in
 * Excel or Sheets (CSV injection).
 */
function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return ''
  let text = value instanceof Date ? value.toISOString() : String(value)
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`
  if (/[",\n\r]/.test(text)) text = `"${text.replace(/"/g, '""')}"`
  return text
}

export function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers, ...rows].map((row) => row.map(escapeCell).join(','))
  return `\uFEFF${lines.join('\r\n')}\r\n`
}

export function csvResponse(filename: string, body: string): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
