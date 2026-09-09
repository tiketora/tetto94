// 'use client'

// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
// import type { FaqItem } from '@/lib/blog/queries'

// export default function FaqAccordion({ items }: { items: FaqItem[] }) {
//   if (items.length === 0) return null

//   return (
//     <section className="mt-14" aria-labelledby="post-faq-heading">
//       <h2 id="post-faq-heading" className="mb-4 text-xl font-bold text-white">
//         Domande frequenti
//       </h2>
//       <Accordion type="single" collapsible className="border border-white/10 bg-white/[0.03] px-5">
//         {items.map((item, index) => (
//           <AccordionItem key={index} value={`faq-${index}`} className="border-white/10">
//             <AccordionTrigger className="text-sm font-semibold text-white hover:no-underline [&>svg]:text-white/50">
//               {item.question}
//             </AccordionTrigger>
//             <AccordionContent className="text-sm leading-relaxed text-white/60">{item.answer}</AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </section>
//   )
// }


'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { FaqItem } from '@/lib/blog/queries'

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null

  return (
    <section className="mt-14" aria-labelledby="post-faq-heading">
      <h2 id="post-faq-heading" className="mb-4 text-xl font-bold text-foreground">
        Domande frequenti
      </h2>
      <Accordion type="single" collapsible className="border border-border bg-muted px-5">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`} className="border-border">
            <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline [&>svg]:text-muted-foreground">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
