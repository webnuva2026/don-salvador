/**
 * CARTA — edita precios y descripciones aquí.
 */
export type Size = 'B' | 'M' | 'F';

export const SIZES: Size[] = ['B', 'M', 'F'];

export const SIZE_LABEL: Record<Size, string> = {
  B: 'Bipersonal',
  M: 'Mediana',
  F: 'Familiar',
};

export interface Pizza {
  name: string;
  alias: string;
  desc: string;
  prices: Record<Size, number>;
}

export const PIZZAS: Pizza[] = [
  { name: 'La Kika', alias: 'Americana', desc: 'Jamón, queso y chorizo.', prices: { B: 18, M: 31, F: 41 } },
  { name: 'La Tomis', alias: 'Tropical', desc: 'Jamón, queso, chorizo, piña y durazno.', prices: { B: 20, M: 37, F: 47 } },
  { name: 'El Tote', alias: 'Hawaiana', desc: 'Jamón, queso, chorizo y piña.', prices: { B: 19, M: 35, F: 45 } },
  { name: 'La Lola', alias: 'Tocino', desc: 'Jamón, queso, chorizo, tocino y carne.', prices: { B: 22, M: 37, F: 47 } },
  { name: 'El Tallo', alias: 'Pepperoni', desc: 'Jamón, queso, chorizo, pepperoni y carne.', prices: { B: 21, M: 36, F: 46 } },
  { name: 'La Vegetariana', alias: 'Vegetariana', desc: 'Jamón, queso, aceituna negra, cebolla, pimiento verde y rojo, tomate, pollo y albahaca.', prices: { B: 24, M: 44, F: 54 } },
  { name: 'El Yaya', alias: 'Suprema', desc: 'Jamón, queso, chorizo, champiñón, aceituna verde, pimiento y carne.', prices: { B: 24, M: 43, F: 53 } },
  { name: 'La Mina', alias: 'Especial', desc: 'Jamón, queso, chorizo, champiñón, aceituna, pimiento, tocino ahumado, pepperoni y carne.', prices: { B: 26, M: 46, F: 56 } },
  { name: 'El Yegua', alias: 'De la casa', desc: 'Jamón, queso, chorizo, carne, pepperoni y bordes de pan al ajo.', prices: { B: 23, M: 42, F: 52 } },
  { name: 'El Pavo', alias: 'Hot Dog Pizza', desc: 'Jamón, queso, chorizo y bordes de hot dog.', prices: { B: 23, M: 41, F: 51 } },
];

export const PIZZA_COMBOS = [
  { name: 'La Teter', desc: 'Combina 2 sabores' },
  { name: 'La Pacha', desc: 'Combina 3 sabores' },
];

export interface Extra {
  name: string;
  // B, M, F (null = no disponible en ese tamaño)
  prices: [number | null, number | null, number | null];
}

export const PIZZA_EXTRAS: Extra[] = [
  { name: 'Pan al ajo especial', prices: [null, null, 10] },
  { name: 'Bordes de queso', prices: [5, 7, 9] },
  { name: 'Extra queso', prices: [5, 7, 9] },
  { name: 'Borde de pan al ajo', prices: [5, 7, 9] },
  { name: '2oz. de crema pizzera / ají', prices: [null, null, 6] },
];

export interface Item {
  name: string;
  desc?: string;
  price: number;
}

export const EMPANADAS: Item[] = [
  { name: 'Queso', desc: '1 unidad', price: 13 },
  { name: 'Jamón y queso', desc: '1 unidad', price: 14 },
  { name: 'Jamón, pepperoni, piña y queso', desc: '1 unidad', price: 15 },
  { name: 'Lomo saltado', desc: '1 unidad', price: 17 },
  { name: 'Carne, tocino, pepperoni, champiñón, pimiento y aceituna', desc: '1 unidad', price: 17 },
];

export const EMPANADA_EXTRAS = [
  'Jamón', 'Chorizo', 'Pepperoni', 'Tocino', 'Queso', 'Carne', 'Durazno / Piña', 'Champiñón',
];
export const EMPANADA_EXTRA_PRICE = 2;

export interface DrinkGroup {
  title: string;
  items: Item[];
}

export const DRINKS: DrinkGroup[] = [
  {
    title: 'Gaseosas y agua',
    items: [
      { name: 'Coca Cola 2 1/2', price: 13 },
      { name: 'Coca Cola 1 1/2', price: 11 },
      { name: 'Coca Cola 1/2', price: 5 },
      { name: 'Guaraná 1/2', price: 3 },
      { name: 'Agua mineral', price: 3 },
    ],
  },
  {
    title: 'Vinos',
    items: [
      { name: 'Vino Tabernero Gran Rosé Afrutado', price: 28 },
      { name: 'Vino Tabernero Borgoña', price: 29 },
    ],
  },
  { title: 'Cervezas', items: [{ name: 'Cerveza lata Pilsen', price: 6 }] },
  {
    title: 'Jugos naturales',
    items: [
      { name: 'Maracuyá', price: 14 },
      { name: 'Chicha morada', price: 14 },
      { name: 'Piña', price: 15 },
    ],
  },
];
