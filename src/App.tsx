import {useEffect, useState} from 'react';
import {
  Clock, Facebook, Instagram, MapPin, MessageCircle, Phone,
  Puzzle, Palette, Search, Dices, Sparkles, Code2,
  Menu as MenuIcon, X, UtensilsCrossed, Baby, Store, ShoppingBag
} from 'lucide-react';
import Menu from './components/Menu';
import Cart from './components/Cart';
import {CONTACT, whatsappLink} from './config/contact';
import type {CartLine} from './types';

const img = (f: string) => `${import.meta.env.BASE_URL}img/${f}`;

export default function App() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const cartCount = lines.reduce((a, l) => a + l.qty, 0);

  // Sección activa para resaltar la barra inferior
  useEffect(() => {
    const ids = ['inicio', 'carta', 'ninos', 'local', 'contacto'];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      {rootMargin: '-45% 0px -50% 0px'},
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Bloquea scroll con el menú hamburguesa abierto y lo cierra con Escape
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', k);
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [menuOpen]);

  const openCart = () => {
    if (cartCount === 0) document.getElementById('carta')?.scrollIntoView({behavior: 'smooth'});
    else window.dispatchEvent(new Event('open-cart'));
  };

  const add = (key: string, label: string, price: number) =>
    setLines((ls) => {
      const f = ls.find((l) => l.key === key);
      return f ? ls.map((l) => (l.key === key ? {...l, qty: l.qty + 1} : l)) : [...ls, {key, label, price, qty: 1}];
    });
  const remove = (key: string) =>
    setLines((ls) => ls.flatMap((l) => (l.key !== key ? [l] : l.qty > 1 ? [{...l, qty: l.qty - 1}] : [])));
  const qtyOf = (key: string) => lines.find((l) => l.key === key)?.qty ?? 0;

  const hello = whatsappLink('¡Hola Don Salvador! 🍕 Quisiera hacer un pedido.');

  return (
    <>
      <header className="nav">
        <div className="container nav-in">
          <a href="#inicio" className="brand-group" onClick={() => setMenuOpen(false)}>
            <img src={img('logo.png')} alt="Logo Don Salvador" className="nav-logo" />
            <div className="brand-text">
              <span className="brand-name">Don <span>Salvador</span></span>
              <span className="brand-sub">Pizzas y Carnes</span>
            </div>
          </a>
          <nav aria-label="Principal" className="nav-desktop">
            <a href="#carta">Carta</a>
            <a href="#ninos">Zona Niños</a>
            <a href="#local">Nuestro Local</a>
            <a href="#contacto">Ubicación</a>
          </nav>
          <div className="nav-actions">
            <a className="btn btn-wa small" href={hello} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> <span className="hide-xs">Pedir al WhatsApp</span><span className="show-xs">Pedir</span>
            </a>
            <button
              id="menu-toggle"
              className="burger"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
        <div className={`mobile-panel ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
          {[
            ['#carta', 'Carta'],
            ['#ninos', 'Zona de niños'],
            ['#local', 'Nuestro local'],
            ['#contacto', 'Ubicación y contacto'],
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="btn btn-wa" href={hello} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            <MessageCircle size={18} /> Pedir por WhatsApp
          </a>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="inicio" className="hero" style={{backgroundImage: `linear-gradient(180deg, rgba(13,13,13,.58) 0%, rgba(13,13,13,.88) 85%, #0d0d0d 100%), url(${img('hero.jpg')})`}}>
          <div className="container hero-in">
            <div className="hero-badge">
              <img src={img('logo.png')} alt="Don Salvador" className="hero-logo-badge" />
              <span>Monsefú · Tradición y Sabor Familiar</span>
            </div>
            <h1>Pizzas artesanales y <em>carnes</em> para compartir</h1>
            <p>
              Masa horneada al punto perfecto, ingredientes selectos y un cálido espacio con juegos de mesa y coloreo para que disfrutes en familia.
            </p>
            <div className="cta">
              <a id="hero-menu" className="btn btn-primary" href="#carta">
                <Sparkles size={18} /> Ver la Carta
              </a>
              <a id="hero-wa" className="btn btn-ghost" href={hello} target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> Pedidos al WhatsApp
              </a>
            </div>
            <ul className="hero-stats">
              <li><b>10</b> Variedades de Pizzas</li>
              <li><b>3</b> Tamaños (B · M · F)</li>
              <li><b>5</b> Empanadas Rellenas</li>
              <li><b>🎲</b> Zona de Niños</li>
            </ul>
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-in">
            {Array.from({length: 3}).map((_, i) => (
              <span key={i}>
                🍕 No importa el tamaño de la pizza, siempre es la excusa perfecta para compartir en familia · 🎮 Juegos de mesa gratis en tu mesa · 🛵 Delivery y recojo en Monsefú · 
              </span>
            ))}
          </div>
        </div>

        {/* CARTA */}
        <Menu onAdd={add} onRemove={remove} qtyOf={qtyOf} />

        {/* ZONA DE NIÑOS */}
        <section id="ninos" className="section kids">
          <div className="container">
            <header className="section-head text-center">
              <span className="eyebrow kid">Para los engreídos de la casa</span>
              <h2 className="title">Mientras se hornea tu pizza… ¡a jugar!</h2>
              <p className="lead center">
                En cada mesa te esperamos con juegos didácticos, tablero de Ludo, mantel de dibujo con laberinto y sopa de letras, y lápices de colores.
              </p>
            </header>
            <div className="kids-grid">
              <figure className="kid-photo photo-card">
                <img src={img('ludo.jpg')} alt="Ludo en la mesa de Don Salvador" loading="lazy" />
                <figcaption>Partidas familiares de Ludo en mesa</figcaption>
              </figure>
              <div className="kids-cards">
                <div className="kcard red">
                  <div className="kcard-icon"><Dices size={28} /></div>
                  <h3>Tablero de Ludo</h3>
                  <p>Fichas y dados listos para que jueguen chicos y grandes.</p>
                </div>
                <div className="kcard blue">
                  <div className="kcard-icon"><Palette size={28} /></div>
                  <h3>Mantel para Colorear</h3>
                  <p>Ilustraciones con lápices de colores Faber-Castell incluidos.</p>
                </div>
                <div className="kcard green">
                  <div className="kcard-icon"><Puzzle size={28} /></div>
                  <h3>Laberinto del Chef</h3>
                  <p>Ayuda a Don Salvador a encontrar el camino a la pizza recién horneada.</p>
                </div>
                <div className="kcard yellow">
                  <div className="kcard-icon"><Search size={28} /></div>
                  <h3>Sopa de Letras</h3>
                  <p>Descubre palabras italianas: pizza, ravioli, lasaña y pesto.</p>
                </div>
              </div>
              <figure className="kid-photo photo-card">
                <img src={img('colorear.jpg')} alt="Mantel para colorear con lápices Faber-Castell" loading="lazy" />
                <figcaption>Mantel didáctico con sopa de letras y lápices</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* NUESTRO LOCAL */}
        <section id="local" className="section local-section">
          <div className="container">
            <header className="section-head text-center">
              <span className="eyebrow">Experiencia Don Salvador</span>
              <h2 className="title">Un rincón acogedor en Monsefú</h2>
              <p className="lead center">
                Paredes de ladrillo visto, iluminación cálida, detalles vintage y un servicio pensado en hacerte sentir como en casa.
              </p>
            </header>
            <div className="local-gallery">
              <div className="local-featured">
                <img src={img('local.jpg')} alt="Interior de la pizzería Don Salvador con pared de ladrillo y letrero luminoso" loading="lazy" />
                <div className="local-overlay">
                  <h3>Salón Principal</h3>
                  <p>Ambiente rústico con nuestro letrero luminoso característico</p>
                </div>
              </div>
              <div className="local-side">
                <div className="local-thumb">
                  <img src={img('bolsa.jpg')} alt="Bolsa de empaque ecológico Don Salvador para delivery y para llevar" loading="lazy" />
                  <div className="local-overlay-mini">
                    <h4>Empaque Artesanal</h4>
                    <p>Listo para llevar a casa con todo el cariño</p>
                  </div>
                </div>
                <div className="local-thumb">
                  <img src={img('local2.jpg')} alt="Detalle de mesa y rincón gastronómico" loading="lazy" />
                  <div className="local-overlay-mini">
                    <h4>Cada Detalle Cuenta</h4>
                    <p>Comodidad para tus reuniones y cumpleaños</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UBICACIÓN Y CONTACTO */}
        <section id="contacto" className="section contact">
          <div className="container contact-grid">
            <div className="contact-info-col">
              <div className="contact-badge-logo">
                <img src={img('logo.png')} alt="Logo Don Salvador" />
              </div>
              <span className="eyebrow">Visítanos o pide Delivery</span>
              <h2 className="title">Estamos en Monsefú</h2>
              <p className="lead">
                Ven a disfrutar de una pizza crocante y calientita o haz tu pedido a domicilio por WhatsApp.
              </p>
              
              <ul className="info">
                <li>
                  <MapPin size={22} />
                  <div>
                    <strong>Dirección</strong>
                    <span>{CONTACT.address}</span>
                  </div>
                </li>
                <li>
                  <MessageCircle size={22} />
                  <div>
                    <strong>WhatsApp Pedidos</strong>
                    <a href={hello} target="_blank" rel="noreferrer">
                      {CONTACT.phoneMainDisplay} (Principal)
                    </a>
                  </div>
                </li>
                <li>
                  <Phone size={22} />
                  <div>
                    <strong>Teléfono Secundario</strong>
                    <a href={CONTACT.phoneSecondaryLink}>
                      {CONTACT.phoneSecondaryDisplay}
                    </a>
                  </div>
                </li>
                {CONTACT.schedule.map((s) => (
                  <li key={s.days}>
                    <Clock size={22} />
                    <div>
                      <strong>Horario de Atención</strong>
                      <span>{s.days}: {s.hours}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="socials-wrapper">
                <span>Síguenos en redes sociales:</span>
                <div className="socials">
                  {CONTACT.social.facebook && (
                    <a aria-label="Facebook Don Salvador" href={CONTACT.social.facebook} target="_blank" rel="noreferrer" className="soc-fb">
                      <Facebook size={22} />
                    </a>
                  )}
                  {CONTACT.social.instagram ? (
                    <a aria-label="Instagram Don Salvador" href={CONTACT.social.instagram} target="_blank" rel="noreferrer" className="soc-ig">
                      <Instagram size={22} />
                    </a>
                  ) : (
                    <span aria-label="Instagram próximamente" title="Instagram próximamente" aria-disabled="true" className="soc-disabled">
                      <Instagram size={22} />
                    </span>
                  )}
                  <a aria-label="WhatsApp directo" href={hello} target="_blank" rel="noreferrer" className="soc-wa">
                    <MessageCircle size={22} />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-map-col">
              <iframe
                title="Ubicación Don Salvador Pizzas y Carnes en Monsefú"
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapsQuery)}&output=embed`}
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER & CREATOR CREDITS */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <img src={img('logo.png')} alt="Don Salvador" className="footer-logo" />
            <div>
              <h3>{CONTACT.businessName}</h3>
              <p>{CONTACT.tagline} · Monsefú, Perú</p>
            </div>
          </div>
          
          <div className="footer-legal">
            <p>© {new Date().getFullYear()} {CONTACT.businessName}. Todos los derechos reservados.</p>
          </div>

          {/* CRÉDITO DEL CREADOR ARNOLD.C */}
          <div className="creator-credit">
            <div className="creator-card">
              <div className="creator-tag">
                <Code2 size={16} /> Creado con pasión
              </div>
              <div className="creator-info">
                <span>Desarrollo Web por</span>
                <strong>Arnold.C</strong>
              </div>
              <a
                href="https://wa.me/51948847159?text=Hola%20Arnold%2C%20vi%20la%20p%C3%A1gina%20web%20de%20Don%20Salvador%20y%20me%20gustar%C3%ADa%20hacerte%20una%20consulta."
                target="_blank"
                rel="noreferrer"
                className="creator-phone-badge"
                title="Contactar al creador por WhatsApp"
              >
                <MessageCircle size={15} /> 948 847 159
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* BARRA INFERIOR MÓVIL */}
      <nav className="bottom-nav" aria-label="Accesos rápidos">
        {[
          ['carta', UtensilsCrossed, 'Carta'],
          ['ninos', Baby, 'Niños'],
          ['local', Store, 'Local'],
          ['contacto', MapPin, 'Contacto'],
        ].map(([id, Icon, label]) => {
          const I = Icon as typeof Store;
          return (
            <a key={id as string} href={`#${id}`} className={active === id ? 'active' : ''}>
              <I size={21} /><span>{label as string}</span>
            </a>
          );
        })}
        <button id="bottom-cart" className={cartCount > 0 ? 'has-items' : ''} onClick={openCart} aria-label="Ver carrito">
          <span className="cart-ico"><ShoppingBag size={21} />{cartCount > 0 && <b>{cartCount}</b>}</span>
          <span>Carrito</span>
        </button>
      </nav>

      {/* FLOATING ACTION BUTTONS */}      <a id="wa-float" className="wa-float" href={hello} target="_blank" rel="noreferrer" aria-label="Hacer pedido al WhatsApp">
        <MessageCircle size={28} />
        <span className="wa-tooltip">¡Pide por WhatsApp!</span>
      </a>
      <Cart lines={lines} onClear={() => setLines([])} />
    </>
  );
}


