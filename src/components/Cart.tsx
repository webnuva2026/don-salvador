import {useEffect, useState} from 'react';
import {ShoppingBag, X, Send, MapPin, Store, Bike} from 'lucide-react';
import {whatsappLink} from '../config/contact';
import type {CartLine} from '../types';

interface Props {
  lines: CartLine[];
  onClear: () => void;
}

type Mode = 'Recojo en local' | 'Delivery';

export default function Cart({lines, onClear}: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [mode, setMode] = useState<Mode>('Recojo en local');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [tried, setTried] = useState(false);

  const count = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + l.qty * l.price, 0);

  // Permite abrir el carrito desde la barra inferior móvil
  useEffect(() => {
    const h = () => setOpen(true);
    window.addEventListener('open-cart', h);
    return () => window.removeEventListener('open-cart', h);
  }, []);

  // Bloquea el scroll del fondo mientras el carrito está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Si se vacía el carrito, se cierra el panel
  useEffect(() => { if (count === 0) setOpen(false); }, [count]);

  if (count === 0) return null;

  const needsAddress = mode === 'Delivery';
  const addressMissing = needsAddress && address.trim().length < 5;

  const send = () => {
    setTried(true);
    if (addressMissing) return;
    const body = lines.map((l) => `• ${l.qty} x ${l.label} — S/ ${l.qty * l.price}`).join('\n');
    const msg =
      `Hola Don Salvador 🍕, quiero hacer un pedido:\n\n${body}\n\nTotal: S/ ${total}\nModalidad: ${mode}` +
      (needsAddress ? `\n📍 Dirección: ${address.trim()}` : '') +
      (name ? `\nNombre: ${name}` : '') +
      (note ? `\nNota: ${note}` : '');
    window.open(whatsappLink(msg), '_blank');
  };

  return (
    <>
      <button id="cart-fab" className="cart-fab" onClick={() => setOpen(true)} aria-label="Ver pedido">
        <ShoppingBag size={20} /><span>Mi pedido</span><b>{count}</b>
      </button>
      {open && (
        <div className="drawer-bg" onClick={() => setOpen(false)}>
          <aside className="drawer" role="dialog" aria-label="Tu pedido" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <h3>Tu pedido</h3>
              <button className="icon-btn" aria-label="Cerrar" onClick={() => setOpen(false)}><X size={22} /></button>
            </div>
            <ul className="drawer-list">
              {lines.map((l) => (
                <li key={l.key}><span>{l.qty} × {l.label}</span><b>S/ {l.qty * l.price}</b></li>
              ))}
            </ul>
            <div className="total"><span>Total</span><b>S/ {total}</b></div>

            <input id="order-name" placeholder="Tu nombre" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />

            <div className="mode" role="radiogroup" aria-label="Modalidad">
              <button className={mode === 'Recojo en local' ? 'active' : ''} onClick={() => setMode('Recojo en local')}>
                <Store size={18} /> Recojo en local
              </button>
              <button className={mode === 'Delivery' ? 'active' : ''} onClick={() => setMode('Delivery')}>
                <Bike size={18} /> Delivery
              </button>
            </div>

            {needsAddress && (
              <div className={`field-address ${tried && addressMissing ? 'invalid' : ''}`}>
                <label htmlFor="order-address"><MapPin size={16} /> Dirección y referencia de entrega en Monsefú <em>*</em></label>
                <textarea
                  id="order-address"
                  required
                  autoComplete="street-address"
                  placeholder="Ej: Calle Bolognesi 123, frente al parque, casa de reja verde"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {tried && addressMissing && <small className="err">Ingresa tu dirección para poder llevarte el pedido.</small>}
              </div>
            )}

            <textarea id="order-note" placeholder="Notas del pedido (sin cebolla, extra ají…)" value={note} onChange={(e) => setNote(e.target.value)} />
            <button id="order-send" className="btn btn-wa" onClick={send}><Send size={18} /> Enviar por WhatsApp</button>
            <button className="link-clear" onClick={() => { onClear(); setOpen(false); }}>Vaciar pedido</button>
          </aside>
        </div>
      )}
    </>
  );
}
