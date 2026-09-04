// /**
//  * Tetto94 — Google Analytics 4 + Google Ads Tracking
//  *
//  * GA4 Measurement ID : G-HWXK50JPDE
//  * Google Ads ID      : AW-18086489395
//  *
//  * Conversion Labels (one per action type — visible in Google Ads):
//  *   Form submit   → O64RCOzP-NQcELPap7BD  (primary conversion — updated Jul 22 2026)
//  *   Phone click   → FTcsCOHrtsIcELPap7BD
//  *   WhatsApp click→ xPk6COTrtsIcELPap7BD
//  *   CTA click     → z4gFCOfrtsIcELPap7BD
//  *
//  * GA4 Events follow Google's recommended naming convention:
//  *   https://developers.google.com/analytics/devguides/collection/ga4/reference/events
//  */

// declare global {
//   interface Window {
//     gtag?: (...args: unknown[]) => void
//   }
// }

// // ─── Google IDs ────────────────────────────────────────────────────────────────
// const GA4_ID = 'G-HWXK50JPDE'
// const ADS_ID = 'AW-18086489395'

// // Conversion labels — each maps to a separate conversion in Google Ads dashboard
// // Docs: https://support.google.com/google-ads/answer/6331304
// const CONVERSION_LABELS = {
//   form_submit:    `${ADS_ID}/O64RCOzP-NQcELPap7BD`,
//   phone_click:    `${ADS_ID}/FTcsCOHrtsIcELPap7BD`,
//   whatsapp_click: `${ADS_ID}/xPk6COTrtsIcELPap7BD`,
//   cta_click:      `${ADS_ID}/z4gFCOfrtsIcELPap7BD`,
// } as const

// // ─── Internal helper ──────────────────────────────────────────────────────────

// function isGtagAvailable(): boolean {
//   return typeof window !== 'undefined' && typeof window.gtag === 'function'
// }

// /**
//  * Fire a GA4 event.
//  * NOTE: Do NOT pass send_to here — when gtag('config', GA4_ID) is initialized,
//  * all events are automatically routed to that property.
//  * Adding send_to can cause double-counting in linked configurations.
//  * Docs: https://developers.google.com/analytics/devguides/collection/ga4/events
//  */
// function sendGA4Event(
//   eventName: string,
//   params: Record<string, string | number | boolean> = {}
// ): void {
//   if (!isGtagAvailable()) return
//   window.gtag!('event', eventName, params)
// }

// /**
//  * Fire a Google Ads conversion with an optional post-conversion navigation.
//  * event_callback guarantees the hit is delivered before any redirect.
//  * Docs: https://support.google.com/google-ads/answer/6331304
//  */
// function sendAdsConversion(
//   label: string,
//   navigateTo?: string
// ): void {
//   if (!isGtagAvailable()) {
//     if (navigateTo) window.location.href = navigateTo
//     return
//   }
//   window.gtag!('event', 'conversion', {
//     send_to: label,
//     event_callback: () => {
//       if (!navigateTo) return
//       if (navigateTo.startsWith('#')) {
//         const el = document.getElementById(navigateTo.slice(1))
//         el?.scrollIntoView({ behavior: 'smooth' })
//       } else {
//         window.location.href = navigateTo
//       }
//     },
//   })
// }

// // ─── Public API ───────────────────────────────────────────────────────────────

// /**
//  * Track form submission (contact form).
//  * GA4 recommended event: generate_lead
//  * Docs: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
//  * Fires:
//  *   GA4  → generate_lead
//  *   Ads  → form_submit conversion
//  */
// export function trackFormSubmit(params?: {
//   service?: string
//   city?: string
//   page_id?: string   // e.g. 'lp_veneto' | 'lp_emilia' | 'lp_friuli' | 'contact_page'
// }): void {
//   sendGA4Event('generate_lead', {
//     // GA4 recommended params for generate_lead
//     currency: 'EUR',
//     value: 0,
//     // Custom dimensions (register in GA4 > Custom definitions)
//     service_type: params?.service  ?? 'not_specified',
//     user_city:    params?.city     ?? 'not_specified',
//     page_id:      params?.page_id  ?? 'not_specified',
//   })
//   sendAdsConversion(CONVERSION_LABELS.form_submit)
// }

// /**
//  * Track phone number click.
//  * GA4 recommended: use 'click' event with link_url for phone links.
//  * Docs: https://support.google.com/analytics/answer/9216061 (enhanced measurement)
//  * Fires:
//  *   GA4  → click (link_url = tel:+39...)
//  *   Ads  → phone_click conversion
//  */
// export function trackPhoneClick(source: 'navbar' | 'contact_section' | 'lp_header' | 'lp_mobile_sticky' | 'lp_footer' | 'lp_hero' | 'lp_success'): void {
//   sendGA4Event('click', {
//     link_url:  'tel:+393516519363',
//     link_text: '+39 351 651 9363',
//     // Custom dimension — register in GA4 > Custom definitions
//     click_source: source,
//   })
//   sendAdsConversion(CONVERSION_LABELS.phone_click)
// }

// /**
//  * Track WhatsApp button click.
//  * GA4: outbound click to wa.me
//  * Fires:
//  *   GA4  → click (outbound = true, link_url = wa.me/...)
//  *   Ads  → whatsapp_click conversion
//  */
// export function trackWhatsAppClick(source: 'floating_button' | 'contact_section'): void {
//   sendGA4Event('click', {
//     outbound:    true,
//     link_url:    'https://wa.me/393516519363',
//     link_text:   'WhatsApp',
//     // Custom dimension — register in GA4 > Custom definitions
//     click_source: source,
//   })
//   sendAdsConversion(CONVERSION_LABELS.whatsapp_click)
// }

// /**
//  * Track CTA button click (hero, navbar, drone section).
//  * GA4 recommended: select_content or generate_lead depending on funnel stage.
//  * Here we use select_content since the CTA leads to a contact page (pre-lead).
//  * Docs: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_content
//  * Fires:
//  *   GA4  → select_content
//  *   Ads  → cta_click conversion
//  */
// export function trackCTAClick(
//   source:
//     | 'hero_desktop' | 'hero_mobile'
//     | 'navbar_desktop' | 'navbar_mobile'
//     | 'drone_desktop' | 'drone_mobile'
//     | 'lp_hero' | 'lp_header' | 'lp_mobile_sticky' | 'lp_footer' | 'lp_success'
//     | `navbar_city_${string}`
//     | `navbar_city_cta_${string}`
//     | `navbar_mobile_city_${string}`
//     | `city_hero_cta_${string}`,
//   navigateTo?: string
// ): void {
//   sendGA4Event('select_content', {
//     content_type: 'cta_button',
//     item_id:      source,
//   })
//   sendAdsConversion(CONVERSION_LABELS.cta_click, navigateTo)
// }

// /**
//  * Legacy: keep reportConversion for any existing callers.
//  * Internally delegates to trackCTAClick.
//  * @deprecated Use trackCTAClick / trackFormSubmit / trackPhoneClick / trackWhatsAppClick instead.
//  */
// export function reportConversion(url?: string): void {
//   trackCTAClick('hero_desktop', url)
// }


// /**
//  * Tetto94 — Google Analytics 4 + Google Ads Tracking
//  *
//  * GA4 Measurement ID : G-HWXK50JPDE
//  * Google Ads ID      : AW-18086489395
//  *
//  * Conversion Labels (one per action type — visible in Google Ads):
//  *   Form submit   → O64RCOzP-NQcELPap7BD  (primary conversion — updated Jul 22 2026)
//  *   Phone click   → FTcsCOHrtsIcELPap7BD
//  *   WhatsApp click→ xPk6COTrtsIcELPap7BD
//  *   CTA click     → z4gFCOfrtsIcELPap7BD
//  *
//  * GA4 Events follow Google's recommended naming convention:
//  *   https://developers.google.com/analytics/devguides/collection/ga4/reference/events
//  */

// declare global {
//   interface Window {
//     gtag?: (...args: unknown[]) => void
//   }
// }

// // ─── Google IDs ────────────────────────────────────────────────────────────────
// const GA4_ID = 'G-HWXK50JPDE'
// const ADS_ID = 'AW-18086489395'

// // Conversion labels — each maps to a separate conversion in Google Ads dashboard
// // Docs: https://support.google.com/google-ads/answer/6331304
// const CONVERSION_LABELS = {
//   form_submit:    `${ADS_ID}/O64RCOzP-NQcELPap7BD`,
//   phone_click:    `${ADS_ID}/FTcsCOHrtsIcELPap7BD`,
//   whatsapp_click: `${ADS_ID}/xPk6COTrtsIcELPap7BD`,
//   cta_click:      `${ADS_ID}/z4gFCOfrtsIcELPap7BD`,
// } as const

// // ─── Internal helper ──────────────────────────────────────────────────────────

// function isGtagAvailable(): boolean {
//   return typeof window !== 'undefined' && typeof window.gtag === 'function'
// }

// /**
//  * Fire a GA4 event.
//  * NOTE: Do NOT pass send_to here — when gtag('config', GA4_ID) is initialized,
//  * all events are automatically routed to that property.
//  * Adding send_to can cause double-counting in linked configurations.
//  * Docs: https://developers.google.com/analytics/devguides/collection/ga4/events
//  */
// function sendGA4Event(
//   eventName: string,
//   params: Record<string, string | number | boolean> = {}
// ): void {
//   if (!isGtagAvailable()) return
//   window.gtag!('event', eventName, params)
// }

// /**
//  * Fire a Google Ads conversion with an optional post-conversion navigation.
//  * event_callback guarantees the hit is delivered before any redirect.
//  * Docs: https://support.google.com/google-ads/answer/6331304
//  */
// function sendAdsConversion(
//   label: string,
//   navigateTo?: string
// ): void {
//   if (!isGtagAvailable()) {
//     if (navigateTo) window.location.href = navigateTo
//     return
//   }
//   window.gtag!('event', 'conversion', {
//     send_to: label,
//     event_callback: () => {
//       if (!navigateTo) return
//       if (navigateTo.startsWith('#')) {
//         const el = document.getElementById(navigateTo.slice(1))
//         el?.scrollIntoView({ behavior: 'smooth' })
//       } else {
//         window.location.href = navigateTo
//       }
//     },
//   })
// }

// // ─── Public API ───────────────────────────────────────────────────────────────

// /**
//  * Track form submission (contact form).
//  * GA4 recommended event: generate_lead
//  * Docs: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
//  * Fires:
//  *   GA4  → generate_lead
//  *   Ads  → form_submit conversion
//  */
// export function trackFormSubmit(params?: {
//   service?: string
//   city?: string
//   page_id?: string   // e.g. 'lp_veneto' | 'lp_emilia' | 'lp_friuli' | 'contact_page'
// }): void {
//   sendGA4Event('generate_lead', {
//     // GA4 recommended params for generate_lead
//     currency: 'EUR',
//     value: 0,
//     // Custom dimensions (register in GA4 > Custom definitions)
//     service_type: params?.service  ?? 'not_specified',
//     user_city:    params?.city     ?? 'not_specified',
//     page_id:      params?.page_id  ?? 'not_specified',
//   })
//   sendAdsConversion(CONVERSION_LABELS.form_submit)
// }

// /**
//  * Track phone number click.
//  * GA4 recommended: use 'click' event with link_url for phone links.
//  * Docs: https://support.google.com/analytics/answer/9216061 (enhanced measurement)
//  * Fires:
//  *   GA4  → click (link_url = tel:+39...)
//  *   Ads  → phone_click conversion
//  */
// export function trackPhoneClick(source: 'navbar' | 'contact_section' | 'lp_header' | 'lp_mobile_sticky' | 'lp_footer' | 'lp_hero' | 'lp_success'): void {
//   sendGA4Event('click', {
//     link_url:  'tel:+393516519363',
//     link_text: '+39 351 651 9363',
//     // Custom dimension — register in GA4 > Custom definitions
//     click_source: source,
//   })
//   sendAdsConversion(CONVERSION_LABELS.phone_click)
// }

// /**
//  * Track WhatsApp button click.
//  * GA4: outbound click to wa.me
//  * Fires:
//  *   GA4  → click (outbound = true, link_url = wa.me/...)
//  *   Ads  → whatsapp_click conversion
//  */
// export function trackWhatsAppClick(source: 'floating_button' | 'contact_section'): void {
//   sendGA4Event('click', {
//     outbound:    true,
//     link_url:    'https://wa.me/393516519363',
//     link_text:   'WhatsApp',
//     // Custom dimension — register in GA4 > Custom definitions
//     click_source: source,
//   })
//   sendAdsConversion(CONVERSION_LABELS.whatsapp_click)
// }

// /**
//  * Track CTA button click (hero, navbar, drone section).
//  * GA4 recommended: select_content or generate_lead depending on funnel stage.
//  * Here we use select_content since the CTA leads to a contact page (pre-lead).
//  * Docs: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_content
//  * Fires:
//  *   GA4  → select_content
//  *   Ads  → cta_click conversion
//  */
// export function trackCTAClick(
//   source:
//     | 'hero_desktop' | 'hero_mobile'
//     | 'navbar_desktop' | 'navbar_mobile'
//     | 'drone_desktop' | 'drone_mobile'
//     | 'lp_hero' | 'lp_header' | 'lp_mobile_sticky' | 'lp_footer' | 'lp_success'
//     | 'roof_index_intro_hero' | 'roof_index_intro_steps' | 'roof_index_intro_sticky'
//     | `navbar_city_${string}`
//     | `navbar_city_cta_${string}`
//     | `navbar_mobile_city_${string}`
//     | `city_hero_cta_${string}`,
//   navigateTo?: string
// ): void {
//   sendGA4Event('select_content', {
//     content_type: 'cta_button',
//     item_id:      source,
//   })
//   sendAdsConversion(CONVERSION_LABELS.cta_click, navigateTo)
// }

// /**
//  * Legacy: keep reportConversion for any existing callers.
//  * Internally delegates to trackCTAClick.
//  * @deprecated Use trackCTAClick / trackFormSubmit / trackPhoneClick / trackWhatsAppClick instead.
//  */
// export function reportConversion(url?: string): void {
//   trackCTAClick('hero_desktop', url)
// }


// /**
//  * Tetto94 — Google Analytics 4 + Google Ads Tracking
//  *
//  * GA4 Measurement ID : G-HWXK50JPDE
//  * Google Ads ID      : AW-18086489395
//  *
//  * Conversion Labels (one per action type — visible in Google Ads):
//  *   Form submit   → O64RCOzP-NQcELPap7BD  (primary conversion — updated Jul 22 2026)
//  *   Phone click   → FTcsCOHrtsIcELPap7BD
//  *   WhatsApp click→ xPk6COTrtsIcELPap7BD
//  *   CTA click     → z4gFCOfrtsIcELPap7BD
//  *
//  * GA4 Events follow Google's recommended naming convention:
//  *   https://developers.google.com/analytics/devguides/collection/ga4/reference/events
//  */

// declare global {
//   interface Window {
//     gtag?: (...args: unknown[]) => void
//   }
// }

// // ─── Google IDs ────────────────────────────────────────────────────────────────
// const GA4_ID = 'G-HWXK50JPDE'
// const ADS_ID = 'AW-18086489395'

// // Conversion labels — each maps to a separate conversion in Google Ads dashboard
// // Docs: https://support.google.com/google-ads/answer/6331304
// const CONVERSION_LABELS = {
//   form_submit:    `${ADS_ID}/O64RCOzP-NQcELPap7BD`,
//   phone_click:    `${ADS_ID}/FTcsCOHrtsIcELPap7BD`,
//   whatsapp_click: `${ADS_ID}/xPk6COTrtsIcELPap7BD`,
//   cta_click:      `${ADS_ID}/z4gFCOfrtsIcELPap7BD`,
// } as const

// // ─── Internal helper ──────────────────────────────────────────────────────────

// function isGtagAvailable(): boolean {
//   return typeof window !== 'undefined' && typeof window.gtag === 'function'
// }

// /**
//  * Fire a GA4 event.
//  * NOTE: Do NOT pass send_to here — when gtag('config', GA4_ID) is initialized,
//  * all events are automatically routed to that property.
//  * Adding send_to can cause double-counting in linked configurations.
//  * Docs: https://developers.google.com/analytics/devguides/collection/ga4/events
//  */
// function sendGA4Event(
//   eventName: string,
//   params: Record<string, string | number | boolean> = {}
// ): void {
//   if (!isGtagAvailable()) return
//   window.gtag!('event', eventName, params)
// }

// /**
//  * Fire a Google Ads conversion with an optional post-conversion navigation.
//  * event_callback guarantees the hit is delivered before any redirect.
//  * Docs: https://support.google.com/google-ads/answer/6331304
//  */
// function sendAdsConversion(
//   label: string,
//   navigateTo?: string
// ): void {
//   if (!isGtagAvailable()) {
//     if (navigateTo) window.location.href = navigateTo
//     return
//   }
//   window.gtag!('event', 'conversion', {
//     send_to: label,
//     event_callback: () => {
//       if (!navigateTo) return
//       if (navigateTo.startsWith('#')) {
//         const el = document.getElementById(navigateTo.slice(1))
//         el?.scrollIntoView({ behavior: 'smooth' })
//       } else {
//         window.location.href = navigateTo
//       }
//     },
//   })
// }

// // ─── Public API ───────────────────────────────────────────────────────────────

// /**
//  * Track form submission (contact form).
//  * GA4 recommended event: generate_lead
//  * Docs: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
//  * Fires:
//  *   GA4  → generate_lead
//  *   Ads  → form_submit conversion
//  */
// export function trackFormSubmit(params?: {
//   service?: string
//   city?: string
//   page_id?: string   // e.g. 'lp_veneto' | 'lp_emilia' | 'lp_friuli' | 'contact_page'
// }): void {
//   sendGA4Event('generate_lead', {
//     // GA4 recommended params for generate_lead
//     currency: 'EUR',
//     value: 0,
//     // Custom dimensions (register in GA4 > Custom definitions)
//     service_type: params?.service  ?? 'not_specified',
//     user_city:    params?.city     ?? 'not_specified',
//     page_id:      params?.page_id  ?? 'not_specified',
//   })
//   sendAdsConversion(CONVERSION_LABELS.form_submit)
// }

// /**
//  * Track phone number click.
//  * GA4 recommended: use 'click' event with link_url for phone links.
//  * Docs: https://support.google.com/analytics/answer/9216061 (enhanced measurement)
//  * Fires:
//  *   GA4  → click (link_url = tel:+39...)
//  *   Ads  → phone_click conversion
//  */
// export function trackPhoneClick(source: 'navbar' | 'contact_section' | 'lp_header' | 'lp_mobile_sticky' | 'lp_footer' | 'lp_hero' | 'lp_success'): void {
//   sendGA4Event('click', {
//     link_url:  'tel:+393516519363',
//     link_text: '+39 351 651 9363',
//     // Custom dimension — register in GA4 > Custom definitions
//     click_source: source,
//   })
//   sendAdsConversion(CONVERSION_LABELS.phone_click)
// }

// /**
//  * Track WhatsApp button click.
//  * GA4: outbound click to wa.me
//  * Fires:
//  *   GA4  → click (outbound = true, link_url = wa.me/...)
//  *   Ads  → whatsapp_click conversion
//  */
// export function trackWhatsAppClick(source: 'floating_button' | 'contact_section'): void {
//   sendGA4Event('click', {
//     outbound:    true,
//     link_url:    'https://wa.me/393516519363',
//     link_text:   'WhatsApp',
//     // Custom dimension — register in GA4 > Custom definitions
//     click_source: source,
//   })
//   sendAdsConversion(CONVERSION_LABELS.whatsapp_click)
// }

// /**
//  * Track CTA button click (hero, navbar, drone section).
//  * GA4 recommended: select_content or generate_lead depending on funnel stage.
//  * Here we use select_content since the CTA leads to a contact page (pre-lead).
//  * Docs: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_content
//  * Fires:
//  *   GA4  → select_content
//  *   Ads  → cta_click conversion
//  */
// export function trackCTAClick(
//   source:
//     | 'hero_desktop' | 'hero_mobile'
//     | 'navbar_desktop' | 'navbar_mobile'
//     | 'drone_desktop' | 'drone_mobile'
//     | 'lp_hero' | 'lp_header' | 'lp_mobile_sticky' | 'lp_footer' | 'lp_success'
//     | 'roof_index_intro_hero' | 'roof_index_intro_steps' | 'roof_index_intro_sticky'
//     | 'mappa_rischio' | 'mappa_rischio_footer' | 'quiz_result_map_link'
//     | `navbar_city_${string}`
//     | `navbar_city_cta_${string}`
//     | `navbar_mobile_city_${string}`
//     | `city_hero_cta_${string}`,
//   navigateTo?: string
// ): void {
//   sendGA4Event('select_content', {
//     content_type: 'cta_button',
//     item_id:      source,
//   })
//   sendAdsConversion(CONVERSION_LABELS.cta_click, navigateTo)
// }

// /**
//  * Legacy: keep reportConversion for any existing callers.
//  * Internally delegates to trackCTAClick.
//  * @deprecated Use trackCTAClick / trackFormSubmit / trackPhoneClick / trackWhatsAppClick instead.
//  */
// export function reportConversion(url?: string): void {
//   trackCTAClick('hero_desktop', url)
// }


/**
 * Tetto94 — Google Analytics 4 + Google Ads Tracking
 *
 * GA4 Measurement ID : G-HWXK50JPDE
 * Google Ads ID      : AW-18086489395
 *
 * Conversion Labels (one per action type — visible in Google Ads):
 *   Form submit   → O64RCOzP-NQcELPap7BD  (primary conversion — updated Jul 22 2026)
 *   Phone click   → FTcsCOHrtsIcELPap7BD
 *   WhatsApp click→ xPk6COTrtsIcELPap7BD
 *   CTA click     → z4gFCOfrtsIcELPap7BD
 *
 * GA4 Events follow Google's recommended naming convention:
 *   https://developers.google.com/analytics/devguides/collection/ga4/reference/events
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// ─── Google IDs ────────────────────────────────────────────────────────────────
const GA4_ID = 'G-HWXK50JPDE'
const ADS_ID = 'AW-18086489395'

// Conversion labels — each maps to a separate conversion in Google Ads dashboard
// Docs: https://support.google.com/google-ads/answer/6331304
const CONVERSION_LABELS = {
  form_submit:    `${ADS_ID}/O64RCOzP-NQcELPap7BD`,
  phone_click:    `${ADS_ID}/FTcsCOHrtsIcELPap7BD`,
  whatsapp_click: `${ADS_ID}/xPk6COTrtsIcELPap7BD`,
  cta_click:      `${ADS_ID}/z4gFCOfrtsIcELPap7BD`,
} as const

// ─── Internal helper ──────────────────────────────────────────────────────────

function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

/**
 * Fire a GA4 event.
 * NOTE: Do NOT pass send_to here — when gtag('config', GA4_ID) is initialized,
 * all events are automatically routed to that property.
 * Adding send_to can cause double-counting in linked configurations.
 * Docs: https://developers.google.com/analytics/devguides/collection/ga4/events
 */
function sendGA4Event(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (!isGtagAvailable()) return
  window.gtag!('event', eventName, params)
}

/**
 * Fire a Google Ads conversion with an optional post-conversion navigation.
 * event_callback guarantees the hit is delivered before any redirect.
 * Docs: https://support.google.com/google-ads/answer/6331304
 */
function sendAdsConversion(
  label: string,
  navigateTo?: string
): void {
  if (!isGtagAvailable()) {
    if (navigateTo) window.location.href = navigateTo
    return
  }
  window.gtag!('event', 'conversion', {
    send_to: label,
    event_callback: () => {
      if (!navigateTo) return
      if (navigateTo.startsWith('#')) {
        const el = document.getElementById(navigateTo.slice(1))
        el?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = navigateTo
      }
    },
  })
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Track form submission (contact form).
 * GA4 recommended event: generate_lead
 * Docs: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
 * Fires:
 *   GA4  → generate_lead
 *   Ads  → form_submit conversion
 */
export function trackFormSubmit(params?: {
  service?: string
  city?: string
  page_id?: string   // e.g. 'lp_veneto' | 'lp_emilia' | 'lp_friuli' | 'contact_page'
}): void {
  sendGA4Event('generate_lead', {
    // GA4 recommended params for generate_lead
    currency: 'EUR',
    value: 0,
    // Custom dimensions (register in GA4 > Custom definitions)
    service_type: params?.service  ?? 'not_specified',
    user_city:    params?.city     ?? 'not_specified',
    page_id:      params?.page_id  ?? 'not_specified',
  })
  sendAdsConversion(CONVERSION_LABELS.form_submit)
}

/**
 * Track phone number click.
 * GA4 recommended: use 'click' event with link_url for phone links.
 * Docs: https://support.google.com/analytics/answer/9216061 (enhanced measurement)
 * Fires:
 *   GA4  → click (link_url = tel:+39...)
 *   Ads  → phone_click conversion
 */
export function trackPhoneClick(source: 'navbar' | 'contact_section' | 'lp_header' | 'lp_mobile_sticky' | 'lp_footer' | 'lp_hero' | 'lp_success'): void {
  sendGA4Event('click', {
    link_url:  'tel:+393516519363',
    link_text: '+39 351 651 9363',
    // Custom dimension — register in GA4 > Custom definitions
    click_source: source,
  })
  sendAdsConversion(CONVERSION_LABELS.phone_click)
}

/**
 * Track WhatsApp button click.
 * GA4: outbound click to wa.me
 * Fires:
 *   GA4  → click (outbound = true, link_url = wa.me/...)
 *   Ads  → whatsapp_click conversion
 */
export function trackWhatsAppClick(source: 'floating_button' | 'contact_section'): void {
  sendGA4Event('click', {
    outbound:    true,
    link_url:    'https://wa.me/393516519363',
    link_text:   'WhatsApp',
    // Custom dimension — register in GA4 > Custom definitions
    click_source: source,
  })
  sendAdsConversion(CONVERSION_LABELS.whatsapp_click)
}

/**
 * Track CTA button click (hero, navbar, drone section).
 * GA4 recommended: select_content or generate_lead depending on funnel stage.
 * Here we use select_content since the CTA leads to a contact page (pre-lead).
 * Docs: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_content
 * Fires:
 *   GA4  → select_content
 *   Ads  → cta_click conversion
 */
export function trackCTAClick(
  source:
    | 'hero_desktop' | 'hero_mobile'
    | 'navbar_desktop' | 'navbar_mobile'
    | 'drone_desktop' | 'drone_mobile'
    | 'lp_hero' | 'lp_header' | 'lp_mobile_sticky' | 'lp_footer' | 'lp_success'
    | 'roof_index_intro_hero' | 'roof_index_intro_steps' | 'roof_index_intro_sticky'
    | 'mappa_rischio' | 'mappa_rischio_footer' | 'quiz_result_map_link'
    | 'roof_index_unlock_offer'
    | `navbar_city_${string}`
    | `navbar_city_cta_${string}`
    | `navbar_mobile_city_${string}`
    | `city_hero_cta_${string}`,
  navigateTo?: string
): void {
  sendGA4Event('select_content', {
    content_type: 'cta_button',
    item_id:      source,
  })
  sendAdsConversion(CONVERSION_LABELS.cta_click, navigateTo)
}

/**
 * Legacy: keep reportConversion for any existing callers.
 * Internally delegates to trackCTAClick.
 * @deprecated Use trackCTAClick / trackFormSubmit / trackPhoneClick / trackWhatsAppClick instead.
 */
export function reportConversion(url?: string): void {
  trackCTAClick('hero_desktop', url)
}
