export interface RiskBandInfo {
  key: string
  label: string
  range: string
  color: string
  description: string
}

export const RISK_BANDS: RiskBandInfo[] = [
  { key: 'ottimo', label: 'Ottimo', range: '0–25', color: '#10b981', description: 'Tetto in buone condizioni: basta un controllo periodico.' },
  { key: 'attenzione', label: 'Attenzione', range: '26–45', color: '#facc15', description: 'Primi segni di usura: conviene pianificare un controllo.' },
  { key: 'necessario', label: 'Necessario', range: '46–65', color: '#f97316', description: 'Un intervento di manutenzione è consigliato a breve.' },
  { key: 'urgente', label: 'Urgente', range: '66–85', color: '#EB1C26', description: 'Rischio elevato di infiltrazioni: intervenire presto.' },
  { key: 'emergenza', label: 'Emergenza', range: '86–100', color: '#7f1d1d', description: 'Situazione critica: serve un sopralluogo tecnico immediato.' },
]

export function getRiskBand(score: number): RiskBandInfo {
  if (score <= 25) return RISK_BANDS[0]
  if (score <= 45) return RISK_BANDS[1]
  if (score <= 65) return RISK_BANDS[2]
  if (score <= 85) return RISK_BANDS[3]
  return RISK_BANDS[4]
}
