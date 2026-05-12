/**
 * FAQ data for the Technical Support page.
 *
 * These are sensible default answers — refine them with exact figures
 * (lead times, MOQ, warranty period, response SLA, …) when confirmed.
 * Any answer left as `TODO:` is hidden on the site automatically.
 */

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'What are your typical lead times?',
    answer:
      'Lead times depend on the product family and configuration. Standard catalogue items dispatch relatively quickly; made-to-order assemblies or items requiring third-party certification take longer. We confirm a firm delivery schedule with your order acknowledgement — ask us for an indicative lead time when you request a quote.',
  },
  {
    question: 'Can you manufacture to a custom specification?',
    answer:
      'Yes — all of our product families are configurable. We can accommodate custom sizes, body materials, connection standards, pressure ratings and surface finishes. Share your project datasheet or specification when requesting a quote so our engineering team can advise on the best configuration.',
  },
  {
    question: 'What documentation and certification can you provide?',
    answer:
      'Standard documentation typically includes material test certificates, dimensional inspection reports and a declaration of conformity. Third-party inspection, hydrostatic test certificates and additional statutory or accredited-lab documentation can be arranged on request — please specify your certification requirements at the quotation stage.',
  },
  {
    question: 'Do you supply projects outside the local market?',
    answer:
      'Yes — we supply to projects in the region and can arrange shipment on your preferred Incoterms with the necessary export documentation. Contact us with your destination and requirements for a delivered quotation.',
  },
  {
    question: 'Is there a minimum order quantity?',
    answer:
      'Minimum order quantities vary by product and configuration. Standard items can generally be ordered as single units; highly customised or made-to-order items may carry an MOQ — your sales contact will confirm this during the quotation process.',
  },
  {
    question: 'What warranty do your products carry?',
    answer:
      'Koolvent products are warranted against defects in materials and workmanship from the date of dispatch, subject to correct installation and operation within the rated parameters. Full warranty terms are provided with each order acknowledgement — contact our support team for details.',
  },
  {
    question: 'Can your engineers provide technical or on-site support?',
    answer:
      'Our technical team is available by phone and email for product selection, installation guidance and troubleshooting. On-site commissioning support or specialist visits can be arranged for larger projects — please contact us in advance to schedule.',
  },
  {
    question: 'How do I request a quote or submit a purchase enquiry?',
    answer:
      'Use the Request a Quote form on this site, email us, or call us directly. Please include the product family, required size(s), quantity, relevant specifications and your project timeline so we can respond with a tailored proposal.',
  },
];
