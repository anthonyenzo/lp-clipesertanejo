"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedMarqueeHero, type MarqueeHeroImage } from "@/components/ui/hero-3";

const CHECKOUT_COMPLETE = "https://checkout.wiven.com.br/checkout/cmsrukfkk00sw01pw02ag439i?offer=osiy9l6";
const CHECKOUT_DOWNSELL_COMPLETE = "https://checkout.wiven.com.br/checkout/cmsrukfkk00sw01pw02ag439i?offer=HVPM5W8";
const CHECKOUT_SERTANEJO = "https://checkout.wiven.com.br/checkout/cms52ikdc02i901px1sn02df1?offer=hmf38kc";
const WHATSAPP = "https://wa.me/5538984020274?text=Ol%C3%A1!%20Vim%20pelo%20suporte%20da%20BrazHits";
const BASE_PATH = process.env.NEXT_PUBLIC_DEPLOY_BASE_PATH ?? "";

const heroPackImages: MarqueeHeroImage[] = [
  { src: `${BASE_PATH}/hero-packs/sertanejo-2026.jpg`, alt: "Capa do Pack Sertanejo 2026" },
  { src: `${BASE_PATH}/hero-packs/classicos-sertanejos.jpg`, alt: "Capa do Pack Clássicos Sertanejos" },
  { src: `${BASE_PATH}/hero-packs/forro-2026.jpg`, alt: "Capa do Pack Forró 2026" },
  { src: `${BASE_PATH}/hero-packs/pagodes-2026.jpg`, alt: "Capa do Pack Melhores Pagodes 2026" },
  { src: `${BASE_PATH}/hero-packs/louvores-2026.jpg`, alt: "Capa do Pack Louvores 2026" },
  { src: `${BASE_PATH}/hero-packs/rock-nacional.jpg`, alt: "Capa do Pack Rock Nacional" },
  { src: `${BASE_PATH}/hero-packs/mpb-antigas.jpg`, alt: "Capa do Pack MPB Antigas" },
  { src: `${BASE_PATH}/hero-packs/rock-internacional.jpg`, alt: "Capa do Pack Rock Internacional" },
];

const heroCustomerAvatars: MarqueeHeroImage[] = [
  { src: `${BASE_PATH}/customer-avatars/cliente-1.jpg`, alt: "Cliente da BrazHits" },
  { src: `${BASE_PATH}/customer-avatars/cliente-2.jpg`, alt: "Cliente da BrazHits" },
  { src: `${BASE_PATH}/customer-avatars/cliente-3.jpg`, alt: "Cliente da BrazHits" },
  { src: `${BASE_PATH}/customer-avatars/cliente-4.jpg`, alt: "Cliente da BrazHits" },
];

const testimonials = [
  { name: "Carlos Eduardo", photo: `${BASE_PATH}/testimonial-clients/carlos-eduardo.jpg`, message: "A qualidade ficou excelente na multimídia. Veio tudo muito bem organizado!", product: "Pack Completo — Todos os Clipes", productDetails: "+2.000 clipes · 8 gêneros · Full HD 1080p" },
  { name: "Marcio Xavier", photo: `${BASE_PATH}/testimonial-clients/marcio-xavier.jpg`, message: "Baixei as pastas e já consegui reproduzir. Muito mais prático do que procurar um por um.", product: "Pack Completo — Todos os Clipes", productDetails: "+2.000 clipes · 8 gêneros · Full HD 1080p" },
  { name: "Leo DJ", photo: `${BASE_PATH}/testimonial-clients/leo-dj.jpg`, message: "Gostei demais da variedade. Agora tenho música para qualquer momento.", product: "Pack Completo — Todos os Clipes", productDetails: "+2.000 clipes · 8 gêneros · Full HD 1080p" },
  { name: "Junior", photo: `${BASE_PATH}/testimonial-clients/junior.jpg`, message: "O grupo de atualizações fez toda diferença. Recomendo a BrazHits!", product: "Sertanejo Completo — Clipes + Músicas", productDetails: "+500 clipes · +1.000 músicas · acesso vitalício" },
] as const;

const faqs = [
  ["Como recebo meu Pack?", "Assim que o pagamento for confirmado, as instruções de acesso serão enviadas para o seu e-mail."],
  ["Os arquivos funcionam sem internet?", "Sim. Você precisa de internet somente para baixar. Depois disso, pode reproduzir os arquivos salvos sem conexão."],
  ["Funciona na multimídia do meu carro?", "Os clipes são entregues em MP4 Full HD 1080p, formato amplamente compatível com centrais multimídia, TVs, computadores e telões."],
  ["Existe mensalidade?", "Não. O pagamento é único, com acesso vitalício ao conteúdo adquirido."],
  ["Como funcionam as atualizações?", "Clientes das ofertas que incluem o Grupo VIP recebem avisos sobre atualizações mensais e novos Packs pelo WhatsApp."],
] as const;

function Arrow() {
  return <span className="button-arrow" aria-hidden="true" />;
}
function Check() {
  return <span className="check" aria-hidden="true" />;
}

export default function BrazHitsPrincipal() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showDownsell, setShowDownsell] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".section-reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    if (!showDownsell) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowDownsell(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [showDownsell]);

  const moveTestimonials = (direction: number) => {
    sliderRef.current?.scrollBy({ left: direction * Math.min(window.innerWidth * 0.82, 460), behavior: "smooth" });
  };

  return (
    <main className="liquid-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <header className="glass-nav">
        <a className="brand" href="#inicio" aria-label="BrazHits, início"><span>Braz</span>Hits</a>
        <a className="nav-offer" href="#ofertas">Ver oferta</a>
      </header>

      <AnimatedMarqueeHero
        customerAvatars={heroCustomerAvatars}
        title={<>O melhor acervo de clipes<br /><em>para sua multimídia</em></>}
        description="Conteúdo em alta qualidade, organizado e atualizado para você reproduzir no carro, na TV, no PC ou no telão — mesmo sem internet."
        ctaText="Quero escolher meu Pack"
        ctaHref="#ofertas"
        images={heroPackImages}
      />

      <section className="section benefits section-reveal" id="beneficios">
        <div className="section-heading">
          <span className="section-kicker">PENSADO PARA SER SIMPLES</span>
          <h2>Você baixa uma vez.<br /><em>Aproveita onde quiser.</em></h2>
          <p>O trabalho demorado já foi feito. Você recebe conteúdo preparado para encontrar, transferir e reproduzir.</p>
        </div>
        <div className="benefit-grid">
          <article className="glass-card benefit-card featured">
            <div className="icon-orb icon-play"><span /></div>
            <span className="card-index">01</span>
            <h3>Qualidade que aparece na tela.</h3>
            <p>Clipes em MP4 Full HD 1080p para aproveitar cada detalhe na multimídia, na TV ou no telão.</p>
          </article>
          <article className="glass-card benefit-card">
            <div className="icon-orb icon-folder"><span /></div>
            <span className="card-index">02</span>
            <h3>Tudo separado e fácil de encontrar.</h3>
            <p>Pastas organizadas por gênero para você parar de perder tempo procurando arquivo por arquivo.</p>
          </article>
          <article className="glass-card benefit-card">
            <div className="icon-orb icon-offline"><span /></div>
            <span className="card-index">03</span>
            <h3>Internet só para baixar.</h3>
            <p>Depois de salvar os arquivos, é só conectar seu dispositivo e dar o play onde estiver.</p>
          </article>
        </div>
      </section>

      <section className="section testimonials section-reveal" id="depoimentos">
        <div className="section-heading testimonial-heading">
          <div><span className="section-kicker">QUEM COMPRA, CONTA</span><h2>Feedbacks reais.<br /><em>Sem roteiro.</em></h2></div>
          <div className="slider-controls" aria-label="Controles dos depoimentos">
            <button type="button" onClick={() => moveTestimonials(-1)} aria-label="Depoimento anterior"><span /></button>
            <button type="button" onClick={() => moveTestimonials(1)} aria-label="Próximo depoimento"><span /></button>
          </div>
        </div>
        <div className="testimonial-slider" ref={sliderRef}>
          {testimonials.map((item) => (
            <article className="glass-card testimonial-card" key={item.name}>
              <div className="whatsapp-placeholder">
                <div className="whatsapp-top"><img className="testimonial-avatar" src={item.photo} alt={`Foto de ${item.name}`} loading="lazy" decoding="async" /><strong>{item.name}</strong><i>•••</i></div>
                <div className="chat-bubble">{item.message}</div>
                <div className="purchased-pack">
                  <span className="purchased-pack-label"><i aria-hidden="true" /> Produto adquirido</span>
                  <strong>{item.product}</strong>
                  <p>{item.productDetails}</p>
                </div>
              </div>
              <div className="testimonial-meta"><span>★★★★★</span><p>Cliente verificado</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bonuses section-reveal" id="bonus">
        <div className="section-heading centered">
          <span className="section-kicker">MAIS QUE UM DOWNLOAD</span>
          <h2>Benefícios que continuam<br /><em>depois da compra.</em></h2>
        </div>
        <div className="bonus-shell glass-card">
          <article><div className="bonus-icon vip-icon"><span>VIP</span></div><div><span className="bonus-number">BÔNUS 01</span><h3>Grupo VIP no WhatsApp</h3><p>Entre para o grupo exclusivo e fique por dentro das atualizações mensais e dos novos Packs.</p></div></article>
          <article><div className="bonus-icon update-icon"><span /></div><div><span className="bonus-number">BÔNUS 02</span><h3>Atualizações mensais</h3><p>Receba novidades da BrazHits sem precisar procurar novamente tudo o que acabou de lançar.</p></div></article>
          <article><div className="bonus-icon support-icon"><span /></div><div><span className="bonus-number">BÔNUS 03</span><h3>Suporte BrazHits</h3><p>Ficou com dúvida para acessar? Você pode falar diretamente com nossa equipe pelo WhatsApp.</p></div></article>
        </div>
      </section>

      <section className="section offers section-reveal" id="ofertas">
        <div className="section-heading centered">
          <span className="section-kicker">ESCOLHA SUA EXPERIÊNCIA</span>
          <h2>Um pagamento.<br /><em>Conteúdo para sempre.</em></h2>
          <p>As duas principais ofertas da BrazHits. Escolha a que combina melhor com a sua multimídia.</p>
        </div>
        <div className="offer-grid">
          <article className="glass-card offer-card recommended">
            <span className="recommendation">MAIOR VARIEDADE</span>
            <div className="offer-top"><span className="offer-type">SUPER PACK</span><h3>Todos os Clipes</h3><p>O maior acervo da BrazHits reunido em uma única compra.</p></div>
            <div className="offer-amount"><strong>+2.000</strong><span>clipes em MP4<br />Full HD 1080p</span></div>
            <ul>
              <li><Check /> Todos os gêneros disponíveis</li><li><Check /> Pastas organizadas por ritmo</li><li><Check /> Acesso vitalício</li><li><Check /> Atualizações mensais</li><li><Check /> 15 dias de garantia</li>
            </ul>
            <div className="genre-block">
              <span>Gêneros inclusos</span>
              <div className="genre-list">
                <span>Sertanejo 2026</span><span>Sertanejo Raiz</span><span>Pagode 2026</span><span>Forró e Arrocha</span><span>Gospel 2026</span><span>Rock Nacional</span><span>Rock Internacional</span><span>MPB Antigo</span>
              </div>
            </div>
            <div className="price"><span className="price-copy">Pagamento único<small>Separados sairiam por <s>R$ 110,00</s></small></span><strong><sup>R$</sup> 67<small>,00</small></strong></div>
            <a className="offer-button" href={CHECKOUT_COMPLETE} target="_blank" rel="noopener noreferrer">Quero todos os clipes <Arrow /></a>
          </article>

          <article className="glass-card offer-card">
            <div className="offer-top"><span className="offer-type">CLIPES + MÚSICAS</span><h3>Sertanejo Completo</h3><p>Vídeo e áudio para quem quer os maiores hits do sertanejo.</p></div>
            <div className="offer-amount"><strong>1.500</strong><span>arquivos entre<br />MP4 e MP3</span></div>
            <ul>
              <li><Check /> +500 clipes sertanejos 1080p</li><li><Check /> +1.000 músicas em MP3</li><li><Check /> Sertanejo, modão e forró</li><li><Check /> Acesso vitalício</li><li><Check /> Grupo VIP no WhatsApp</li><li><Check /> 15 dias de garantia</li>
            </ul>
            <div className="price"><span className="price-copy">Pagamento único<small>De <s>R$ 77,90</s> por apenas</small></span><strong><sup>R$</sup> 26<small>,90</small></strong></div>
            <button className="offer-button secondary" type="button" onClick={() => setShowDownsell(true)}>Quero clipes + músicas <Arrow /></button>
          </article>
        </div>
      </section>

      {showDownsell && (
        <div className="downsell-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowDownsell(false)}>
          <section className="downsell-modal" role="dialog" aria-modal="true" aria-labelledby="downsell-title">
            <button className="downsell-close" type="button" aria-label="Fechar oferta especial" onClick={() => setShowDownsell(false)}>×</button>
            <span className="downsell-kicker">DESCONTO-PRESENTE LIBERADO</span>
            <h2 id="downsell-title">Espere! Leve o acervo completo por <em>R$ 57</em></h2>
            <p>Por apenas <strong>R$ 30,10 a mais</strong>, você troca a oferta sertaneja por mais de 2.000 clipes em 8 gêneros, todos organizados em Full HD.</p>
            <div className="downsell-price">
              <span><s>R$ 67,00</s><small>oferta normal</small></span>
              <strong><sup>R$</sup> 57<small>,00</small></strong>
            </div>
            <ul>
              <li><Check /> +2.000 clipes em Full HD 1080p</li>
              <li><Check /> Sertanejo, pagode, forró, gospel, rock e MPB</li>
              <li><Check /> Acesso vitalício e atualizações mensais</li>
            </ul>
            <a className="downsell-accept" href={CHECKOUT_DOWNSELL_COMPLETE} target="_blank" rel="noopener noreferrer">Sim, quero o Pack Completo por R$ 57 <Arrow /></a>
            <a className="downsell-decline" href={CHECKOUT_SERTANEJO} target="_blank" rel="noopener noreferrer">Não quero o desconto. Continuar com a oferta de R$ 26,90</a>
          </section>
        </div>
      )}

      <section className="section guarantee section-reveal">
        <div className="guarantee-card glass-card">
          <div className="guarantee-seal"><span>15</span><strong>DIAS</strong></div>
          <div><span className="section-kicker">RISCO ZERO</span><h2>Você tem 15 dias<br /><em>para experimentar.</em></h2><p>Baixe, conheça o conteúdo e teste com tranquilidade. Se a oferta não fizer sentido para você, solicite o reembolso dentro do prazo de garantia.</p></div>
        </div>
      </section>

      <section className="section trust section-reveal" id="sobre">
        <div className="trust-card">
          <div className="trust-copy"><span className="section-kicker">QUEM ESTÁ POR TRÁS</span><h2>Prazer, eu sou o<br /><em>Edu.</em></h2><p>Eu também já perdi horas tentando montar uma coleção para a multimídia: sites cheios de propaganda e botões enganosos, risco de vírus, vídeos com qualidade baixa e aquela tarefa cansativa de baixar tudo um por um.</p><p>Foi para resolver isso que criei a BrazHits. Hoje eu seleciono, organizo e atualizo os Packs para você receber tudo pronto, baixar com tranquilidade e dar o play sem perder tempo.</p><div className="trust-stats"><span><strong>+2.000</strong>clipes disponíveis</span><span><strong>1080p</strong>qualidade Full HD</span><span><strong>Vitalício</strong>acesso ao conteúdo</span></div></div>
          <div className="trust-visual glass-card"><div className="trust-logo"><span>Braz</span>Hits</div><p>Conteúdo selecionado e organizado por quem entende de multimídia.</p><figure className="trust-founder-media"><img src={`${BASE_PATH}/edu-fundador-brazhits.jpg`} alt="Edu, fundador da BrazHits, mostrando como transferir os Packs para a multimídia" loading="lazy" decoding="async" /></figure></div>
        </div>
      </section>

      <section className="section faq section-reveal" id="faq">
        <div className="faq-grid">
          <div className="faq-intro"><span className="section-kicker">DÚVIDAS FREQUENTES</span><h2>Antes de dar o play,<br /><em>confira aqui.</em></h2><p>Se sua dúvida não estiver na lista, nossa equipe está disponível no WhatsApp.</p><a className="support-button" href={WHATSAPP} target="_blank" rel="noopener noreferrer"><span className="support-symbol" aria-hidden="true" /> Falar com o suporte</a></div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => <details className="glass-card" key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <footer className="footer"><a className="brand" href="#inicio"><span>Braz</span>Hits</a><p>© 2026 BrazHits. Todos os direitos reservados.</p><a href="#ofertas">Ver ofertas</a></footer>
    </main>
  );
}
