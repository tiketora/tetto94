import { z } from 'zod'
import { CONTACT_CHANNELS, CONTACT_STATUSES } from '@/lib/db/schema'

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullable()
    .optional()
    .transform((v) => (v ? v : null))

const baseShape = {
  channel: z.enum(CONTACT_CHANNELS),
  status: z.enum(CONTACT_STATUSES),
  contactedAt: z
    .string()
    .datetime({ offset: true })
    .refine((v) => new Date(v).getTime() <= Date.now() + 5 * 60_000, 'La data non può essere nel futuro'),
  citta: optionalText(120),
  servizio: optionalText(120),
  contactName: optionalText(120),
  contactValue: optionalText(120),
  notes: optionalText(2000),
  showPublic: z.boolean(),
}

export const contactCreateSchema = z.object({
  ...baseShape,
  status: baseShape.status.default('nuovo'),
  showPublic: baseShape.showPublic.default(false),
})

export const contactPatchSchema = z
  .object({
    channel: baseShape.channel,
    status: baseShape.status,
    contactedAt: baseShape.contactedAt,
    citta: baseShape.citta,
    servizio: baseShape.servizio,
    contactName: baseShape.contactName,
    contactValue: baseShape.contactValue,
    notes: baseShape.notes,
    showPublic: baseShape.showPublic,
  })
  .partial()
