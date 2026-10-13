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
          <button aria-label={`Quitar ${label}`} onClick={() => onRemove(k)}><Minus size={15} /></button>
          <span className="qty-num">{q}</span>
        </>
      )}
      <button className="add" aria-label={`Agregar ${label}`} onClick={() => onAdd(k, label, price)}>
        <Plus size={16} />
      </button>
    </div>
  );
};

export default function Menu(props: Props) {
  const [tab, setTab] = useState<Tab>('pizzas');
  const [size, setSize] = useState<Size>('M');
  const idx = SIZES.indexOf(size);

  return (
    <section id="carta" className="section menu-section">
      <div className="container">
        <header className="section-head text-center">
          <span className="eyebrow">Nuestra Carta</span>
          <h2 className="title">Elige y pide a tu gusto</h2>
          <p className="lead center">Selecciona tus favoritas y envíalas directo a nuestro WhatsApp.</p>
        </header>

        {/* SELECTOR DE CATEGORÍA */}
        <div className="tabs" role="tablist">
          {(['pizzas', 'empanadas', 'bebidas'] as Tab[]).map((t) => (
            <button
              key={t}
              id={`tab-${t}`}
              role="tab"
              aria-selected={tab === t}
              className={tab === t ? 'tab active' : 'tab'}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* PIZZAS */}
        {tab === 'pizzas' && (
          <>
            {/* TAMAÑO SEGMENTADO COMPACTO */}
            <div className="sizes-bar" role="radiogroup" aria-label="Selecciona tamaño de pizza">
              {SIZES.map((s) => (
                <button
                  key={s}
                  id={`size-${s}`}
                  className={size === s ? 'size-btn active' : 'size-btn'}
                  onClick={() => setSize(s)}
                >
                  <span className="size-letter">{s}</span>
                  <span className="size-name">{SIZE_LABEL[s]}</span>
                </button>
              ))}
            </div>

            {/* LISTA COMPACTA DE PIZZAS */}
            <div className="menu-list">
              {PIZZAS.map((p) => (
                <article className="menu-item-row" key={p.name}>
                  <div className="item-body">
                    <div className="item-title-row">
                      <h3 className="item-name">{p.name}</h3>
                      <span className="item-badge">{p.alias}</span>
                    </div>
                    <p className="item-desc">{p.desc}</p>
                  </div>
                  <div className="item-action">
                    <span className="item-price">S/ {p.prices[size]}</span>
                    <Qty {...props} k={`pz-${p.name}-${size}`} label={`${p.name} (${SIZE_LABEL[size]})`} price={p.prices[size]} />
                  </div>
                </article>
              ))}
            </div>

            {/* COMBOS LA TETER Y LA PACHA */}
            <div className="combos-banner">
              <span className="combos-title">🍕 Combina Sabores:</span>
              <div className="combos-chips">
                {PIZZA_COMBOS.map((c) => (
                  <div key={c.name} className="combo-chip">
                    <strong>{c.name}:</strong> <span>{c.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ADICIONALES */}
            <h3 className="sub-title">Adicionales ({SIZE_LABEL[size]})</h3>
            <div className="extras-grid">
              {PIZZA_EXTRAS.map((e) => {
                const pr = e.prices[idx];
                return (
                  <div key={e.name} className={pr == null ? 'extra-row off' : 'extra-row'}>
                    <div className="extra-info">
                      <span className="extra-name">{e.name}</span>
                      {pr == null && <small className="extra-na">No disponible</small>}
                    </div>
                    {pr != null && (
                      <div className="extra-action">
                        <b className="extra-price">S/ {pr}</b>
                        <Qty {...props} k={`ex-${e.name}-${size}`} label={`${e.name} (${size})`} price={pr} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* EMPANADAS */}
        {tab === 'empanadas' && (
          <>
            <div className="menu-list">
              {EMPANADAS.map((e) => (
                <article className="menu-item-row" key={e.name}>
                  <div className="item-body">
                    <h3 className="item-name">{e.name}</h3>
                    <p className="item-desc">{e.desc}</p>
                  </div>
                  <div className="item-action">
                    <span className="item-price">S/ {e.price}</span>
                    <Qty {...props} k={`em-${e.name}`} label={`Empanada ${e.name}`} price={e.price} />
                  </div>
                </article>
              ))}
            </div>
            <h3 className="sub-title">Ingredientes Adicionales (S/ {EMPANADA_EXTRA_PRICE} c/u)</h3>
            <div className="chips">
              {EMPANADA_EXTRAS.map((x) => <span key={x} className="chip">{x}</span>)}
            </div>
          </>
        )}

        {/* BEBIDAS */}
        {tab === 'bebidas' && (
          <div className="drinks-container">
            {DRINKS.map((g) => (
              <div className="drink-group-card" key={g.title}>
                <h3 className="drink-group-title">{g.title}</h3>
                <div className="menu-list">
                  {g.items.map((i) => (
                    <div className="menu-item-row compact" key={i.name}>
                      <span className="item-name">{i.name}</span>
                      <div className="item-action">
                        <span className="item-price">S/ {i.price}</span>
                        <Qty {...props} k={`dr-${i.name}`} label={i.name} price={i.price} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
