// Lightweight Web Components for Flowen Yôga
(function(){
  // Header
  class PYHeader extends HTMLElement{
    connectedCallback(){
      if (this.dataset.upgraded === '1') return; // <-- guard
      this.dataset.upgraded = '1';
      const title = this.getAttribute('title') || '';
      const subtitle = this.getAttribute('subtitle') || '';
      const nav = this.innerHTML; // light DOM links
      this.innerHTML = `
        <header class="site" role="banner">
          <div class="wrap">
            <div class="brand">
              <!-- <h1><a href="/">${title}</a></h1> -->
              <a href="/">
                <div class="logo">
                  <img src="/assets/img/logo/struktigen-logo-horizontal.svg" alt="struktigen logo"/>
                </div>
              </a>
              ${subtitle ? `<p class="sub">${subtitle}</p>` : ''}
            </div>
            <!-- Burger button (shown <768px) -->
            <button class="nav-toggle" aria-controls="primary-nav" aria-expanded="false">
              <span class="sr-only">Abrir menu</span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </button>
            <nav class="site primary-nav" id="primary-nav" aria-label="Principal navegação">
              ${nav}
            </nav>
          </div>
        </header>
      `;
    }
  }
  customElements.define('py-header', PYHeader);

  // Footer
  class PYFooter extends HTMLElement{
    connectedCallback(){
      if (this.dataset.upgraded === '1') return; // <-- guard
      this.dataset.upgraded = '1';
      const content = this.innerHTML || '';
      this.innerHTML = `
        <footer class="site" role="contentinfo">
          <div class="wrap">
              <div class="copyright">© <span data-year></span> struktigen. we build systems that think – and help you think.</div>
              <!-- <div class="contacts">Follow us on Instagram [<a href="https://www.instagram.com/strukt.digital/" target="new">@strukt.digital</a>] or LinkedIn [<a href="https://www.linkedin.com/strukt.digital/" target="new">@strukt.digital</a>]</div> -->
              <div class=""><em>Caution</em>: engaging us comes with the risk of shaping a compelling future — structured, scalable, and beautifully designed. Do it now — your future will thank you.</div>
              <div class="custom-content">${content}</div>
          </div>
        </footer>
      `;
      // Auto year if span[data-year] exists
      const y = this.querySelector('[data-year]');
      if (y) y.textContent = new Date().getFullYear();
    }
  }
  customElements.define('py-footer', PYFooter);

  // Grid
  class PYGrid extends HTMLElement{
    connectedCallback(){
      if (this.dataset.upgraded === '1') return; // <-- guard
      this.dataset.upgraded = '1';
      const style = this.getAttribute('style') || '';
      const body = this.innerHTML;
      this.innerHTML = `<div class="grid ${style}">${body}</div>`;
    }
  }
  customElements.define('py-grid', PYGrid);

  // Section
  class PYSection extends HTMLElement{
    connectedCallback(){
      if (this.dataset.upgraded === '1') return; // <-- guard
      this.dataset.upgraded = '1';

      const title = this.getAttribute('title') || '';
      const subtitle = this.getAttribute('subtitle') || '';
      const lede = this.getAttribute('lede') || '';
      const eyebrow = this.getAttribute('eyebrow') || '';
      const style = this.getAttribute('style') || '';
      const body = this.innerHTML.trim();
      const wrapper = this.getAttribute('wrapper') || 'nowrap';
      this.innerHTML = `
      <section class="section ${style}">
        <div class="container ${wrapper}">
          <header class="section-head">
            <div class="eyebrow">${eyebrow}</div>
            <h2 class="section-title dark-text">${title}</h2>
            <p class="lede">${lede}</p>
          </header>
          <div class="h3grid section-body">${body}</div>
        </div>
      </section>
      `;
    }
  }
  customElements.define('py-section', PYSection);

  class PYCtaStrip extends HTMLElement {
    connectedCallback() {
      if (this.dataset.upgraded === '1') return; // <-- guard
      this.dataset.upgraded = '1';

      const title = this.getAttribute('title') || '';
      const subtitle = this.getAttribute('subtitle') || '';
      const ctaText = this.getAttribute('cta-text') || '';
      const ctaLink = this.getAttribute('cta-link') || '#';
      const image = this.getAttribute('image') || ''; // e.g. /assets/cta.jpg
      const overlay = this.getAttribute('overlay') || 'rgba(0,0,0,.5)'; // e.g. "rgba(0,0,0,.5)" or "linear-gradient(...)"
      const position = this.getAttribute('position') || 'center 30%'; // CSS background-position
      const minH = this.getAttribute('min-h') || '52vh'; // optional
      this.innerHTML = `
        <section class="cta-strip"
                style="--cta-strip-min-h:${minH}; --cta-strip-position:${position}; --cta-strip-overlay:${overlay};">
          ${image ? `
            <div class="cta-strip-media">
              <div class="cta-strip-image"">
                <img src="${image}"/>
              </div>
              <div class="cta-strip-overlay" style="background: ${overlay}"></div>
            </div>` : ''
          }
          <div class="wrap cta-strip-content">
            <h2 class="lato-regular-italic">${title}</h2>
            ${subtitle ? `<p class="sub lato-light">${subtitle}</p>` : ''}
            ${ctaText ? `<a class="btn" href="${ctaLink}" aria-label="${ctaText}">${ctaText}</a>` : ''}
          </div>
        </section>
      `;
      // Log for debugging
    }
  }
  customElements.define('py-cta-strip', PYCtaStrip);

  class PYHero extends HTMLElement {
    connectedCallback() {
      const eyebrow   = this.getAttribute('eyebrow') || 'Discipline.<br/>Design.<br/>Freedom.';
      const title     = this.getAttribute('title') || 'Think smarter. Build better. Struktigen.';
      const subtitle  = this.getAttribute('subtitle') || '';
      const lede      = this.getAttribute('lede') || 'We build systems that think — not to replace human intelligence, but to amplify it.';
      const ctaText   = this.getAttribute('cta-text') || '';
      const ctaLink   = this.getAttribute('cta-link') || '#';
      const featuredContent = this.getAttribute('featured-content') || '';
      const image     = this.getAttribute('image') || '';                 // e.g. /assets/hero.jpg
      const style     = "hero " + (this.getAttribute('style') || '');    
      const overlay   = this.getAttribute('overlay')                      // e.g. "rgba(0,0,0,.5)" or "linear-gradient(...)"
                        || 'linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.35))';
      const position  = this.getAttribute('position') || 'center 30%';    // CSS background-position
      const minH      = this.getAttribute('min-h') || '52vh';             // optional

      const ctaContent = ctaLink ? `<a class="btn" href="${ctaLink}" aria-label="${ctaText}">${ctaText}</a>` : ctaText;
      const cta        = ctaText ? ctaContent : '';

      console.log('Hero component:', this.getAttribute('overlay') ? 'with overlay' : 'no overlay');
      // Note: no self-closing divs; keep proper open/close tags.
      this.innerHTML = `
        <section class="hero ${style} ${image ? '' : ' hero--noimage'}" 
                style="--hero-min-h:${minH}; --hero-position:${position}; --hero-overlay:${overlay};">
          ${image ? `
            <div class="hero-media">
              <div class="hero-image" "> 
                <img src="${image}" alt="${title ? title : ''}" loading="lazy" class="hero-image-img"/>
              </div>
              <div class="hero-overlay" style="background: ${overlay}"></div>
            </div>` : ''
          }
          <div class="hero-content">
            <section class="hero-grid">
              <div class="cell c1"></div>
              <div class="cell c2"></div>
              <div class="cell c3"></div>
              <div class="cell c4 main">
                <div class="hero-main-wrapper">
                  <div class="hero-text">
                    <div class="eyebrow">${eyebrow}</div>
                  </div>
                  <div class="hero-text small">
                    <h1 class="hero-title">${title} <span class="lede">${lede}</span></h1>
                  </div>    
                </div>
              </div>  
              <div class="cell c5"></div>
              <div class="cell c6"></div>
              
              <div class="cell c8">
              </div>
              <div class="cell c9">
                <div class="featured-content-header">
                  Think better. <br/>Build smarter.
                </div>
                <div class="featured-content-body">
                  ${featuredContent}
                </div>
                <div class="hero-cta">${cta}</div>
              </div>
            </section>
          </div>
          
        </section>
      `;
    }
  }
  customElements.define('py-hero', PYHero);

  class PYInnerHero extends HTMLElement {
    connectedCallback() {
      const eyebrow   = this.getAttribute('eyebrow') || 'Discipline.<br/>Design.<br/>Freedom.';
      const title     = this.getAttribute('title') || 'Think smarter. Build better. Struktigen.';
      const subtitle  = this.getAttribute('subtitle') || '';
      const lede      = this.getAttribute('lede') || 'We build systems that think — not to replace human intelligence, but to amplify it.';
      const ctaText   = this.getAttribute('cta-text') || '';
      const ctaLink   = this.getAttribute('cta-link') || '#';
      const focusTitle = this.getAttribute('focus-title') || 'Think better. <br/>Build smarter.'

      const featuredContent = this.getAttribute('featured-content') || '';
      const image     = this.getAttribute('image') || '';                 // e.g. /assets/hero.jpg
      const style     = "hero-inner " + (this.getAttribute('style') || '');    
      const overlay   = this.getAttribute('overlay')                      // e.g. "rgba(0,0,0,.5)" or "linear-gradient(...)"
                        || 'linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.35))';
      const position  = this.getAttribute('position') || 'center 30%';    // CSS background-position
      const minH      = this.getAttribute('min-h') || '52vh';             // optional

      const ctaContent = ctaLink ? `<a class="btn" href="${ctaLink}" aria-label="${ctaText}">${ctaText}</a>` : ctaText;
      const cta        = ctaText ? ctaContent : '';

      console.log('Hero component:', this.getAttribute('overlay') ? 'with overlay' : 'no overlay');
      // Note: no self-closing divs; keep proper open/close tags.
      this.innerHTML = `
        <section class="${style} ${image ? '' : ' hero--noimage'}" 
                style="--hero-min-h:${minH}; --hero-position:${position}; --hero-overlay:${overlay};">
          ${image ? `
            <div class="hero-media">
              <div class="hero-image" "> 
                <img src="${image}" alt="${title ? title : ''}" loading="lazy" class="hero-image-img"/>
              </div>
              <div class="hero-overlay" style="background: ${overlay}"></div>
            </div>` : ''
          }
          <div class="hero-content">
            <section class="hero-grid">
              <div class="cell c1 main">
                <div class="wrap">
                 <div class="eyebrow">${eyebrow}</div>
                 <h1 class="hero-title">${title}</h1>
                 <div class="hero-subtitle">${lede}</div>
                </div> 
              </div>
              <div class="cell c3"></div>
              <div class="cell c4"></div>  
              <div class="cell c5"></div>
              <div class="cell c6"></div>
              <div class="cell c7"></div>  
              <div class="cell c8"></div>
              <div class="cell c9">
                <div class="featured-content-header">
                  ${focusTitle}
                </div>
                <div class="featured-content-body">
                  ${featuredContent}
                </div>
                <div class="hero-cta">${cta}</div>
              </div>
            </section>
          </div>
          
        </section>
      `;
    }
  }
  customElements.define('py-inner-hero', PYInnerHero);

  // Card
  class PYCard extends HTMLElement{
    connectedCallback(){
      if (this.dataset.upgraded === '1') return; // <-- guard
      this.dataset.upgraded = '1';

      const title = this.getAttribute('title') || '';
      const subtitle = this.getAttribute('subtitle') || '';
      const image = this.getAttribute('image') || ''; // optional
      const style = "card " + (this.getAttribute('style') || 'ystack'); // one of ['ystack', 'xstack', 'zstack']
      const href  = this.getAttribute('href')  || null;
      const btn   = this.getAttribute('button-label') || '';
      const btnStyle   = this.getAttribute('button-style') || '';
      const body  = this.innerHTML.trim();
      const linkAndCta = href ? `<div class="card-cta">
              <a class="btn ${btnStyle}" href="${href}" aria-label="${title ? `Abrir ${title}` : ''}">${btn}</a>
            </div>` : "";
      this.innerHTML = `
        <article class="${style}">
          ${image ? `<div class="card-image">
            <img src="${image}" alt="${title ? title : 'Imagem do card'}" loading="lazy" class="card-image-img"/>
          </div>` : ''}
          <div class="card-content">
            ${title ? `<h3>${title}</h3>` : ''}
            ${subtitle ? `<p class="sub">${subtitle}</p>` : ''}
            <div class="card-body">${body}</div>
            ${linkAndCta}
          </div>
        </article>
      `;
    }
  }
  customElements.define('py-card', PYCard);

  class PYCarousel extends HTMLElement{
    connectedCallback(){
      if (this.dataset.upgraded === '1') return; // <-- guard
      this.dataset.upgraded = '1';

      this.innerHTML = `
        <div class="logo-carousel-wrapper">
          <div class="logo-carousel-inner">
            <div class="logo-track">
              <div class="logo-wrapper"><img src="/assets/img/client-logos/royal-bank-of-scotland-logo.svg" alt="Royal Bank of Scotland"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/ubs-logo.png" alt="UBS Warburg"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/Deutsche_Borse_Group_Logo.png" alt="Deutsche Börse"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/british-airways-logo.png" alt="British Airways"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/BBVA-Logo.png" alt="BBVA"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/hsbc-logo.png" alt="HSBC"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/audi-logo.png" alt="Audi"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/credit-suisse-logo.png" alt="Credit Suisse"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/lloyds-banking-logo.png" alt="Lloyds Banking Group"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/kpmg-logo.png" alt="KPMG"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/porto-editora-logo.png" alt="Porto Editora"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/wook-logo.png" alt="Wook"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/royal-bank-of-scotland-logo.svg" alt="Royal Bank of Scotland"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/ubs-logo.png" alt="UBS Warburg"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/Deutsche_Borse_Group_Logo.png" alt="Deutsche Börse"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/british-airways-logo.png" alt="British Airways"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/BBVA-Logo.png" alt="BBVA"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/hsbc-logo.png" alt="HSBC"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/audi-logo.png" alt="Audi"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/credit-suisse-logo.png" alt="Credit Suisse"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/lloyds-banking-logo.png" alt="Lloyds Banking Group"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/kpmg-logo.png" alt="KPMG"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/porto-editora-logo.png" alt="Porto Editora"/></div>
              <div class="logo-wrapper"><img src="/assets/img/client-logos/wook-logo.png" alt="Wook"/></div>
            </div>
          </div>
        </div>  
      `;
    }
  }
  customElements.define('py-carousel', PYCarousel);

  // class PYPopUp extends HTMLElement {
  //   connectedCallback() {
  //     if (this.dataset.upgraded === '1') return; // <-- guard
  //     this.dataset.upgraded = '1';

  //     const popupId = this.getAttribute('popup-id') || 'unidentified-popup';
  //     const title = this.getAttribute('title') || 'Flowen — Detalhes';
  //     const body = this.innerHTML.trim();
  //     const previous = this.getAttribute('previous') || '';
  //     const previousDataVar = this.getAttribute('previous') ? "data-popup-target" : 'data-no-link';
  //     const previousButtonClass = this.getAttribute('previous') ? "enabled" : 'disabled';
  //     const nextButtonClass = this.getAttribute('previous') ? "enabled" : 'disabled';
  //     const next = this.getAttribute('next') || '';
  //     const nextsDataVar = this.getAttribute('next') ? "data-popup-target" : 'data-no-link';
  //     this.innerHTML = `
  //       <section class="popup" id="${this.id || 'popup'}" aria-hidden="true">
  //         <div class="popup-overlay" aria-hidden="true">
  //           <section id="${popupId}" class="popup-modal" tabindex="-1">
  //             <header class="popup-header">
  //               ${title }
  //               <button class="popup-close" type="button" aria-label="Fechar" data-popup-close>✕</button>
  //             </header>
  //             <div class="popup-content">
  //               <div>${body}</div>
  //             </div>
  //             <div class="popup-actions">
  //               <!-- Next/Prev inside the popup -->
  //               <button class="btn previous ${previousButtonClass}" ${previousDataVar}="#${previous}">Anga Anterior</button>
  //               <!-- CTA that closes the popup and scrolls to #book-now -->
  //               <a href="#book-now" class="btn primary" data-popup-goto="#book-now">Reservar agora</a>

  //               <button class="btn next ${nextButtonClass}" ${nextsDataVar}="#${next}">Próximo Anga</button>

  //             </div>
  //           </section>
  //         </div>
  //       </section>
  //     `;
  //     // Log for debugging
  //   }
  // }
  // customElements.define('py-popup', PYPopUp);
  // py-popup.js (wrapper → template provider)
  class PYPopUp extends HTMLElement {
    connectedCallback() {
      if (this.dataset.upgraded === '1') return;
      this.dataset.upgraded = '1';

      const id = this.getAttribute('popup-id') || this.id || `popup-${Math.random().toString(36).slice(2)}`;
      // const popupId = this.getAttribute('popup-id') || 'unidentified-popup';
      const title = this.getAttribute('title') || 'Flowen — Detalhes';
      // const body = this.innerHTML.trim();
      const previous = this.getAttribute('previous') || '';
      const previousDataVar = this.getAttribute('previous') ? "data-popup-open" : 'data-no-link';
      const previousButtonClass = this.getAttribute('previous') ? "enabled" : 'disabled';
      const nextButtonClass = this.getAttribute('next') ? "enabled" : 'disabled';
      const next = this.getAttribute('next') || '';
      const nextsDataVar = this.getAttribute('next') ? "data-popup-open" : 'data-no-link';

      // move children into a fragment
      const frag = document.createDocumentFragment();
      while (this.firstChild) frag.appendChild(this.firstChild);

      // build the modal *inner* (no overlay)
      const tpl = document.createElement('template');
      tpl.id = id;
      tpl.innerHTML = `
        <section id="${id}" class="popup-modal" tabindex="-1">
          <header class="popup-header">
            ${title ? `${title}` : ''}
            <button class="popup-close" type="button" aria-label="Fechar" data-popup-close>✕</button>
          </header>
          <div class="popup-content">
            <div class="popup-slot"></div>
          </div>
          <div class="popup-actions">
                <!-- Next/Prev inside the popup -->
                <button class="btn previous ${previousButtonClass}" ${previousDataVar}="#${previous}">Anga Anterior</button>
                <!-- CTA that closes the popup and scrolls to #book-now -->
                <a href="#book-now" class="btn primary" data-popup-goto="#book-now">Reservar agora</a>

                <button class="btn next ${nextButtonClass}" ${nextsDataVar}="#${next}">Próximo Anga</button>

              </div>
            </section>
          </div>
        </section>
      `;

      // insert original children into .popup-slot
      tpl.content.querySelector('.popup-slot').appendChild(frag);

      this.replaceWith(tpl); // now we just have <template id="popup-...">
    }
  }
  customElements.define('py-popup', PYPopUp);

  class PYCalendar extends HTMLElement{
    connectedCallback(){
      if (this.dataset.upgraded === '1') return; // <-- guard
      this.dataset.upgraded = '1';

      this.innerHTML = `
        <div class="calendar">
          <div class="hours">
            <div class="day-header">&nbsp;</div>
            <div class="scale" id="hour-scale"></div>
          </div>

          <div class="days-viewport">
            <div class="days-scroll">
              <div class="days" id="days-grid"></div>
            </div>
          </div>
          </div>

          <div class="calendar-caption">
            <div class="variant asana"><span class="sq">■</span> Força e Flexibilidade</div>
            <div class="variant meditation"><span class="sq">■</span> Meditação e Concentração</div>
            <div class="variant family"><span class="sq">■</span> Aula em Família - crianças bem-vindas</div>
          </div>

          <p class="calendar-hint">
          Todas as aulas sujeitas a inscrição prévia, no máximo até uma hora antes da aula. 
          </p>
        </div>  
      `;
    }
  }
  customElements.define('py-calendar', PYCalendar);

// (() => {
//   // --- injeta CSS uma só vez ---
//   const STYLE_ID = 'py-faq-styles';
//   if (!document.getElementById(STYLE_ID)) {
//     const s = document.createElement('style');
//     s.id = STYLE_ID;
//     s.textContent = `
//       .py-faqs{display:block; width:100%; max-width:70ch; margin-inline:auto}
//       .py-faq{border-bottom:1px solid var(--faq-border, rgba(0,0,0,.12))}
//       .py-faq__q{
//         all:unset; display:flex; align-items:center; justify-content:space-between;
//         width:100%; cursor:pointer; padding:1rem 0; line-height:1.4;
//       }
//       .py-faq__q:focus-visible{outline:2px solid var(--faq-focus, #5b9aff); outline-offset:4px}
//       .py-faq__q-text{font-weight:600}
//       .py-faq__icon{transition:transform .2s ease; margin-left:1rem; flex:0 0 auto}
//       .py-faq[open] .py-faq__icon{transform:rotate(180deg)}
//       .py-faq__a{
//         overflow:hidden; height:0; transition:height .22s ease;
//       }
//       .py-faq__a-inner{
//         padding:0 0 1rem 0; color:var(--faq-answer, inherit);
//       }
//     `;
//     document.head.appendChild(s);
//   }

  // util: uid
  let uid = 0;
  const nextId = (p='pyfaq') => `${p}-${++uid}`;

  class PYFaqs extends HTMLElement {
    connectedCallback(){
      if (this.dataset.upgraded === '1') return;
      this.dataset.upgraded = '1';
      this.setAttribute('role', 'list');
      this.singleOpen = this.getAttribute('mode') !== 'multiple'; // default: single

      // fecha outros quando um abre
      this.addEventListener('py-faq-opened', (e) => {
        if (!this.singleOpen) return;
        const current = e.detail?.faq;
        this.querySelectorAll('py-faq[open]').forEach(faq => {
          if (faq !== current) faq.close();
        });
      });

      // navegação por setas entre perguntas
      this.addEventListener('keydown', (e) => {
        const questions = Array.from(this.querySelectorAll('.py-faq__q'));
        const idx = questions.indexOf(document.activeElement);
        if (idx === -1) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          (questions[idx+1] || questions[0]).focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          (questions[idx-1] || questions[questions.length-1]).focus();
        } else if (e.key === 'Home') {
          e.preventDefault(); questions[0]?.focus();
        } else if (e.key === 'End') {
          e.preventDefault(); questions[questions.length-1]?.focus();
        }
      });
    }
  }

  class PYFaq extends HTMLElement {
    connectedCallback(){
      if (this.dataset.upgraded === '1') return;
      this.dataset.upgraded = '1';

      // estrutura
      const qText = this.getAttribute('question') || this.getAttribute('title') || 'Pergunta';
      const isOpen = this.hasAttribute('open');
      const qId = nextId('q');
      const aId = nextId('a');
      const body = this.innerHTML;

      this.classList.add('py-faq');
      this.setAttribute('role', 'listitem');
      this.innerHTML = `
        <button class="py-faq__q" id="${qId}" aria-expanded="${isOpen}" aria-controls="${aId}">
          <span class="py-faq__q-text">${qText}</span>
          <svg class="py-faq__icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="py-faq__a" id="${aId}" role="region" aria-labelledby="${qId}" ${isOpen ? '' : 'hidden'}>
          <div class="py-faq__a-inner">${body}</div>
        </div>
      `;

      this.$btn = this.querySelector('.py-faq__q');
      this.$panel = this.querySelector('.py-faq__a');

      // estado inicial
      if (isOpen) {
        this.$panel.style.height = 'auto';
      }

      // eventos
      this.$btn.addEventListener('click', () => this.toggle());
      this.$btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    open(){
      if (this.hasAttribute('open')) return;
      this.setAttribute('open', '');
      this.$btn.setAttribute('aria-expanded', 'true');
      this.$panel.hidden = false;
      // anima altura -> auto
      this.$panel.style.height = '0px';
      requestAnimationFrame(() => {
        const h = this.$panel.scrollHeight;
        this.$panel.style.height = h + 'px';
        const onEnd = () => {
          this.$panel.style.height = 'auto';
          this.$panel.removeEventListener('transitionend', onEnd);
        };
        this.$panel.addEventListener('transitionend', onEnd);
      });
      // notifica o container
      this.dispatchEvent(new CustomEvent('py-faq-opened', {bubbles:true, detail:{faq:this}}));
    }

    close(){
      if (!this.hasAttribute('open')) return;
      this.removeAttribute('open');
      this.$btn.setAttribute('aria-expanded', 'false');

      // de auto -> número -> 0
      const current = this.$panel.scrollHeight;
      this.$panel.style.height = current + 'px';
      // força reflow
      void this.$panel.offsetHeight;
      this.$panel.style.height = '0px';

      const onEnd = () => {
        this.$panel.hidden = true;
        this.$panel.removeEventListener('transitionend', onEnd);
      };
      this.$panel.addEventListener('transitionend', onEnd);
    }

    toggle(){
      if (this.hasAttribute('open')) this.close();
      else this.open();
    }
  }

  customElements.define('py-faqs', PYFaqs);
  customElements.define('py-faq', PYFaq);

  /**
 * ContactForm Component
 * ---------------------
 * Creates a simple contact form that posts to a Google Apps Script endpoint.
 *
 * Usage:
 *   new ContactForm({
 *     target: '#contact',            // CSS selector or element
 *     endpoint: 'https://script.google.com/macros/s/XXXX/exec',
 *     fields: ['name', 'email', 'message'],
 *     labels: {
 *       name: 'Your name',
 *       email: 'Your email',
 *       message: 'Your message'
 *     }
 *   });
 */

  class PYContactForm extends HTMLElement {
  connectedCallback() {
    if (this.dataset.upgraded === '1') return;
    this.dataset.upgraded = '1';
    const encoded = this.getAttribute('data-endpoint') || 'aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J3ZGx0N1NsNVhxMWdTTGI0Wm14RGNCcFV2OFFVS1Q4UHNhaDFNazBvT2lFa01HaEpmUTcwblg2Zm5jQkxiaGxSaWgtdy9leGVj';
    const endpoint = atob(encoded.trim());
    const title = this.getAttribute('title') || 'Contact Us';
    const body = this.innerHTML.trim();
    const className = this.getAttribute('style') || '';
    const cta = this.getAttribute('cta') || 'Send';
    const successMsg = this.getAttribute('success-msg') || 'Thanks — message sent!';
    const errorMsg = this.getAttribute('error-msg') || 'Sorry, something went wrong.';
    const redirectUrlEncoded = this.getAttribute('redirect-url') || "";
    const redirectEndpoint = atob(redirectUrlEncoded.trim());
    const enableRedirection = redirectEndpoint.length > 0 ? "enabled" : "disabled";

    // Fields (comma-separated list)
    const fields = (this.getAttribute('fields') || 'name,email,message')
      .split(',')
      .map(f => f.trim());

    // Labels (optional)
    const labels = JSON.parse(this.getAttribute('labels') || '{}');

    // Build form HTML
    const inputs = fields.map(name => {
      const label = labels[name] || name.charAt(0).toUpperCase() + name.slice(1);
      const type = name === 'email' ? 'email' : (name === 'message' ? 'textarea' : 'text');
      return `
        <div class="form-field">
          ${type === 'textarea'
            ? `<textarea name="${name}" placeholder="${label}" required></textarea>`
            : `<input type="${type}" name="${name}" placeholder="${label}" required />`}
        </div>`;
    }).join('');

    this.innerHTML = `
      <form class="py-contact-form ${className}" data-active="true">
        ${title ? `<h3>${title}</h3>` : ''}
        ${inputs}
        ${body}
        <button type="submit" class="btn">${cta}</button>
        <p class="form-status" aria-live="polite"></p>
        <div class="redirection ${enableRedirection}">
          <a href="${redirectEndpoint}">${cta}</a>
        </div>
      </form>
    `;

    const form = this.querySelector('form');
    const status = this.querySelector('.form-status');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      console.log(`SENDING DATA: `, data);
      status.textContent = 'Sending…';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {'Content-Type': 'application/json'}
        });
        if (res.ok) {
          form.reset();
          status.textContent = successMsg;
          form.dataset.active = "false";   // sets data-active="false"
        } else throw new Error('Network error');
      } catch (err) {
        console.error(err);
        status.textContent = errorMsg;
      }
    });
  }
}

customElements.define('py-contact-form', PYContactForm);

// Dropdown
class PYDropdown extends HTMLElement {
  connectedCallback() {
    if (this.dataset.upgraded === '1') return;
    this.dataset.upgraded = '1';

    const label = this.getAttribute('label') || 'Select an option';

    const options = Array.from(this.querySelectorAll('option')).map(opt => ({
      value: opt.value,
      title: opt.getAttribute('title') || opt.textContent.trim(),
      description: opt.getAttribute('description') || ''
    }));

    this.innerHTML = `
      <div class="py-dropdown">
        <button class="dropdown-toggle" type="button" aria-expanded="false">${label}</button>
        <ul class="dropdown-list" hidden>
          ${options.map(opt => `
            <li data-value="${opt.value}">
              <h4>${opt.title}</h4>
              ${opt.description ? `<p>${opt.description}</p>` : ''}
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    const toggle = this.querySelector('.dropdown-toggle');
    const list = this.querySelector('.dropdown-list');

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      list.hidden = expanded;
    });

    list.addEventListener('click', (e) => {
      const item = e.target.closest('li[data-value]');
      if (!item) return;
      const value = item.dataset.value;
      toggle.textContent = item.querySelector('h4').textContent;
      list.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      this.dataset.value = value;
      this.dispatchEvent(new CustomEvent('change', { detail: { value } }));
      const affectedFieldName = this.dataset.field || 'reason';

      const form = this.closest('form');
      if (form) {
        const affectedField = form.querySelector(`[name="${affectedFieldName}"]`);
        if (affectedField) affectedField.value = value;
      }
    });
  }
}
customElements.define('py-dropdown', PYDropdown);

})();