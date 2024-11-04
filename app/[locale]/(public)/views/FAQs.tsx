
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/lib/ui/components/accordion'
import { useTranslations } from 'next-intl'

interface FAQItem {
  question: string
  answer: string
}


export default async function FAQs({}) {
  const faqItems = []


  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">{t('title')}</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="py-4 font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <p className="text-gray-600">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
