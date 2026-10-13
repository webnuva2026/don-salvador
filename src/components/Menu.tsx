import {useState} from 'react';
import {Plus, Minus} from 'lucide-react';
import {
  DRINKS, EMPANADAS, EMPANADA_EXTRAS, EMPANADA_EXTRA_PRICE, PIZZAS, PIZZA_COMBOS, PIZZA_EXTRAS,
  SIZES, SIZE_LABEL, type Size,
} from '../data/menu';

interface Props {
  onAdd: (key: string, label: string, price: number) => void;
  onRemove: (key: string) => void;
  qtyOf: (key: string) => number;
}

type Tab = 'pizzas' | 'empanadas' | 'bebidas';

const Qty = ({k, label, price, onAdd, onRemove, qtyOf}: Props & {k: string; label: string; price: number}) => {
  const q = qtyOf(k);
  return (
    <div className="qty">
      {q > 0 && (
        <>
          <button aria-label={`Quitar ${label}`} onClick={() => onRemove(k)}><Minus size={14} /></button>
          <span>{q}</span>
        </>
      )}
      <button className="add" aria-label={`Agregar ${label}`} onClick={() => onAdd(k, label, price)}><Plus size={14} /></button>
    </div>
  );
};

export default function Menu(props: Props) {
  const [tab, setTab] = useState<Tab>('pizzas');
  const [size, setSize] = useState<Size>('M');
  const idx = SIZES.indexOf(size);

  return (
    <section id="carta" className="section">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow">Nuestra carta</span>
          <h2 className="title">Elige y pide</h2>
          <p className="lead">Arma tu pedido y envíalo directo a nuestro WhatsApp.</p>
        </header>

        <div className="tabs" role="tablist">
          {(['pizzas', 'empanadas', 'bebidas'] as Tab[]).map((t) => (
            <button key={t} id={`tab-${t}`} role="tab" aria-selected={tab === t}
              className={tab === t ? 'tab active' : 'tab'} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'pizzas' && (
          <>
            <div className="sizes" role="radiogroup" aria-label="Tamaño">
              {SIZES.map((s) => (
                <button key={s} id={`size-${s}`} className={size === s ? 'size active' : 'size'} onClick={() => setSize(s)}>
                  <strong>{s}</strong><small>{SIZE_LABEL[s]}</small>
                </button>
              ))}
            </div>
            <div className="grid">
              {PIZZAS.map((p) => (
                <article className="card" key={p.name}>
                  <div className="card-top">
                    <h3>{p.name}</h3>
                    <span className="price">S/ {p.prices[size]}</span>
                  </div>
                  <em>{p.alias}</em>
                  <p>{p.desc}</p>
                  <Qty {...props} k={`pz-${p.name}-${size}`} label={`${p.name} (${SIZE_LABEL[size]})`} price={p.prices[size]} />
                </article>
              ))}
            </div>
            <div className="combos">
              {PIZZA_COMBOS.map((c) => (
                <div key={c.name}><strong>{c.name}</strong><span>{c.desc}</span></div>
              ))}
            </div>
            <h3 className="sub">Adicionales ({SIZE_LABEL[size]})</h3>
            <div className="extras">
              {PIZZA_EXTRAS.map((e) => {
                const pr = e.prices[idx];
                return (
                  <div key={e.name} className={pr == null ? 'extra off' : 'extra'}>
                    <span>{e.name}</span>
                    {pr == null ? <small>No disponible</small> : (
                      <>
                        <b>S/ {pr}</b>
                        <Qty {...props} k={`ex-${e.name}-${size}`} label={`${e.name} (${size})`} price={pr} />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === 'empanadas' && (
          <>
            <div className="grid">
              {EMPANADAS.map((e) => (
                <article className="card" key={e.name}>
                  <div className="card-top"><h3>{e.name}</h3><span className="price">S/ {e.price}</span></div>
                  <p>{e.desc}</p>
                  <Qty {...props} k={`em-${e.name}`} label={`Empanada ${e.name}`} price={e.price} />
                </article>
              ))}
            </div>
            <h3 className="sub">Adicionales (S/ {EMPANADA_EXTRA_PRICE} c/u)</h3>
            <div className="chips">
              {EMPANADA_EXTRAS.map((x) => <span key={x} className="chip">{x}</span>)}
            </div>
          </>
        )}

        {tab === 'bebidas' && (
          <div className="grid">
            {DRINKS.map((g) => (
              <article className="card" key={g.title}>
                <h3>{g.title}</h3>
                <ul className="list">
                  {g.items.map((i) => (
                    <li key={i.name}>
                      <span>{i.name}</span><b>S/ {i.price}</b>
                      <Qty {...props} k={`dr-${i.name}`} label={i.name} price={i.price} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
