/**
 * ============================================================
 *  DATOS DE CONTACTO — EDITA SOLO ESTE ARCHIVO
 *  Todo lo que aparece en la web (botones, pedidos, footer)
 *  se alimenta de aquí.
 * ============================================================
 */
export const CONTACT = {
  businessName: 'Don Salvador',
  tagline: 'Pizzas y Carnes',

  // WhatsApp para pedidos (sin +, con código de país 51)
  whatsappMain: '51939341201',
  phoneMainDisplay: '939 341 201',
  phoneSecondaryDisplay: '939 357 759',
  phoneSecondaryLink: 'tel:+51939357759',

  address: '7 de Junio 919, Monsefú',
  city: 'Monsefú, Lambayeque',
  mapsQuery: '7 de Junio 919, Monsefú, Lambayeque, Perú',

  // Horario (editable)
  schedule: [{ days: 'Todos los días', hours: 'Consulta el horario por WhatsApp' }],

  social: {
    facebook: 'https://www.facebook.com/share/1LqTH9nXyd/',
    instagram: '', // pendiente: pega aquí el enlace de Instagram
  },
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${CONTACT.whatsappMain}?text=${encodeURIComponent(message)}`;
