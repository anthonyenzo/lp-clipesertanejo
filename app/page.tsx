"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";

const CHECKOUT_CLIPES = "https://checkout.brazhits.com.br/checkout/cms3nyhqu00q101ojp5uriham?offer=7JM1ZJ5";
const CHECKOUT_COMPLETO = "https://checkout.brazhits.com.br/checkout/cms52ikdc02i901px1sn02df1?offer=hmf38kc";
const CHECKOUT_TODOS_CLIPES = "https://checkout.brazhits.com.br/checkout/cmsrukfkk00sw01pw02ag439i?offer=osiy9l6";
const CHECKOUT_TODOS_CLIPES_ESPECIAL = "https://checkout.brazhits.com.br/checkout/cmsrukfkk00sw01pw02ag439i?offer=HVPM5W8";
const WHATSAPP = "https://wa.me/5538984020274?text=Ol%C3%A1!%20Vim%20pelo%20suporte%20do%20Pack%20de%20Clipes";

const BASE_PATH = process.env.NEXT_PUBLIC_DEPLOY_BASE_PATH ?? "";

const otherPacks = [
  {
    id: "sertanejo-raiz",
    name: "Sertanejo Raiz",
    label: "Pack Sertanejo Raiz",
    tone: "amber",
    image: "pack-sertanejo-raiz-modao.jpg",
    checkout: "https://checkout.brazhits.com.br/checkout/cms3qwbhf02ey01q2uric6p6b?offer=ct9lej3",
  },
  {
    id: "forro-arrocha",
    name: "Forró / Arrocha",
    label: "Pack Forró + Arrocha",
    tone: "orange",
    image: "pack-forro-arrocha-2026.jpg",
    checkout: "https://checkout.brazhits.com.br/checkout/cms50qbo101h701pxcrnwl7zn?offer=142tf5w",
  },
  {
    id: "pagode",
    name: "Pagode",
    label: "Pack Pagode",
    tone: "cyan",
    image: "pack-pagode-2026.jpg",
    checkout: "https://checkout.brazhits.com.br/checkout/cms50tr7p01jg01pxv6hv8di0?offer=3wkrmwo",
  },
  {
    id: "rock-nacional",
    name: "Rock Nacional",
    label: "Pack Rock Nacional",
    tone: "violet",
    image: "pack-rock-nacional.jpg",
    checkout: "https://checkout.brazhits.com.br/checkout/cms514n1801rx01ocfhh2ar5y?offer=d58z8ku",
  },
  {
    id: "gospel",
    name: "Gospel",
    label: "Pack Gospel",
    tone: "blue",
    image: "pack-gospel-2026.jpg",
    checkout: "https://checkout.brazhits.com.br/checkout/cms50v6lf01kk01pxtf8e60hm?offer=064ob69",
  },
] as const;
const albums = [
  { image: `${BASE_PATH}/album-gusttavo.png`, title: "Feito à Mão", artist: "Gusttavo Lima" },
  { image: `${BASE_PATH}/album-simone.png`, title: "Cantando Sua História", artist: "Simone Mendes" },
  { image: `${BASE_PATH}/album-ze-neto.png`, title: "Intenso", artist: "Zé Neto & Cristiano" },
  { image: `${BASE_PATH}/album-murilo.png`, title: "Acústico", artist: "Murilo Huff" },
  { image: `${BASE_PATH}/album-clayton.png`, title: "Ao Vivo em Brasília", artist: "Clayton & Romário" },
  { image: `${BASE_PATH}/album-ana.png`, title: "Herança Boiadeira", artist: "Ana Castela" },
  { image: `${BASE_PATH}/album-lauana.png`, title: "Apruma, Beagá!", artist: "Lauana Prado" },
  { image: `${BASE_PATH}/album-ce-ta-doido.jpg`, title: "Cê Tá Doido", artist: "Todas as edições" },
];

const testimonials = [
  { initials: "JC", name: "João Carlos", time: "agora", text: "Comprei sem muita expectativa, mas fiquei de cara… clipes de qualidade, organizados e sem trava. Usei no churrasco e foi só alegria 🍻" },
  { initials: "M", name: "Marcelo", time: "7 min", text: "Coloquei os clipes no telão do meu bar e a galera bebeu, cantou… parecia até um show ao vivo 😂" },
  { initials: "TL", name: "Thiago Lima", time: "52 min", text: "Uso direto na van. Passageiro sempre pergunta onde arrumei tantos clipes bons kkkk" },
  { initials: "LM", name: "Larissa Martins", time: "1 d", text: "Top demais, não é daqueles pacotes antigos… vem sempre com músicas novas." },
  { initials: "MF", name: "Maria Fernanda", time: "3 d", text: "Vale muito a pena porque não fica desatualizado, sempre tem novidade no pack." },
  { initials: "LR", name: "Lucas R.", time: "5 d", text: "Qualidade muito boa, roda liso no telão. Bem melhor do que ficar caçando vídeo no YouTube." },
];

const faqs = [
  { q: "Preciso baixar o Pack completo ou dá para baixar faixa por faixa?", a: "Você escolhe. Pode baixar o Pack completo ou selecionar os clipes e músicas que quiser, faixa por faixa." },
  { q: "Qual é a garantia de que vou receber as músicas?", a: "O acesso é liberado de forma automática após a confirmação do pagamento. Se tiver qualquer dificuldade, o suporte da BrazHits ajuda você." },
  { q: "Preciso pagar mensalidade?", a: "Não. O pagamento é único e o acesso ao Pack é vitalício." },
  { q: "Como vou receber as músicas?", a: "Você recebe o acesso ao painel da BrazHits, onde poderá baixar os arquivos e acompanhar as atualizações." },
  { q: "Preciso estar conectado à internet para ouvir?", a: "Não. A internet é necessária apenas para baixar os arquivos. Depois, eles rodam normalmente no seu dispositivo." },
  { q: "Qual é a qualidade dos clipes?", a: "Os clipes são entregues em MP4 Full HD (1080p), com ótima definição de imagem e áudio." },
  { q: "Posso passar os arquivos para um Pen Drive?", a: "Sim. Depois de baixar, é só copiar para o seu Pen Drive ou HD externo e conectar no dispositivo compatível." },
  { q: "Quais são as formas de pagamento?", a: "Você pode pagar por PIX ou cartão de crédito, conforme as opções exibidas no checkout." },
  { q: "O acesso é imediato após a compra?", a: "Sim. Após a confirmação do pagamento, você recebe as instruções de acesso automaticamente." },
];

function Reveal({ children, className = "", delay = 0, id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.add("is-visible"); observer.unobserve(element); }
    }, { threshold: 0.12, rootMargin: "0px 0px -36px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} id={id} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function CheckItem({ children, excluded = false }: { children: ReactNode; excluded?: boolean }) {
  return <li className={excluded ? "excluded" : undefined}><span aria-hidden="true">{excluded ? "" : "✓"}</span>{children}</li>;
}
function PlayIcon() {
  return <span className="icon-play" aria-hidden="true" />;
}

function ArrowIcon({ direction = "right" }: { direction?: "right" | "down-right" | "up-right" }) {
  return <span className={`ui-arrow ui-arrow-${direction}`} aria-hidden="true" />;
}

function WeakWifiIcon() {
  return (
    <span className="icon-wifi-weak" aria-hidden="true">
      <i className="wifi-arc wifi-arc-outer" />
      <i className="wifi-arc wifi-arc-middle" />
      <i className="wifi-arc wifi-arc-inner" />
      <i className="wifi-dot" />
    </span>
  );
}

function ClockIcon() {
  return <span className="icon-clock" aria-hidden="true" />;
}

function NoAdsIcon() {
  return <span className="icon-no-ads" aria-hidden="true" />;
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState("--/--/----");
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const upgradeDialogRef = useRef<HTMLDivElement>(null);
  const upgradeTriggerRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const today = new Date();
    setCurrentDate(`${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`);
    return () => document.documentElement.classList.remove("motion-ready");
  }, []);

  useEffect(() => {
    if (!upgradeOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    upgradeDialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setUpgradeOpen(false);
        return;
      }

      if (event.key !== "Tab" || !upgradeDialogRef.current) return;
      const focusable = Array.from(
        upgradeDialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      upgradeTriggerRef.current?.focus();
    };
  }, [upgradeOpen]);

  function openUpgrade(event: ReactMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setUpgradeOpen(true);
  }

  return (
    <main>
      <div className="promo-bar" role="status"><span className="promo-dot" /><span>Promoção exclusiva de hoje</span><strong>{currentDate}</strong><a href="#oferta-completa">Ver oferta</a></div>
      <header className="site-header shell"><a className="brand" href="#top" aria-label="BrazHits - início"><span>Braz<span>Hits</span></span></a><div className="header-trust"><span aria-hidden="true">◉</span> Compra segura</div></header>

      <section className="hero" id="top"><div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" /><div className="shell hero-grid">
        <Reveal className="hero-copy"><div className="hero-kicker"><span>Atualizado em 2026</span> • acesso vitalício</div><h1>Sua multimídia nunca teve <em>tantos ritmos e tanta qualidade.</em></h1><p className="hero-lead">Tenha mais de <strong>1.700 clipes em Full HD</strong>, organizados por gênero e prontos para rodar no carro, na TV, no PC ou no telão — mesmo sem internet.</p><div className="hero-points"><span><i>✓</i> MP4 em 1080p</span><span><i>✓</i> 100% de Compatibilidade</span><span><i>✓</i> Atualizações mensais</span></div><a className="cta cta-large" href="#oferta-completa">Quero o Pack completo <ArrowIcon /></a><p className="microcopy">Acesso imediato • Pagamento único • Suporte BrazHits</p><a className="hero-store-link" href="https://brazhits.com.br/loja/">Prefere outro gênero? <strong>Conheça todos os Packs</strong> <ArrowIcon direction="up-right" /></a></Reveal>
        <Reveal className="video-wrap" delay={120}><div className="video-badge"><span /> Demonstração do Pack</div><div className="video-placeholder has-video"><video className="demo-video" controls playsInline preload="metadata" aria-label="Vídeo de demonstração do Pack BrazHits"><source src="https://brazhits.com.br/videos/cetadoido_12horas.mp4" type="video/mp4" />Seu navegador não suporta a reprodução deste vídeo.</video></div><div className="floating-card floating-one"><strong>+500</strong><span>clipes em Full HD</span></div><div className="floating-card floating-two"><span className="equalizer">▮▮▮▮</span><strong>Áudio impecável</strong></div></Reveal>
      </div></section>

      <section className="device-strip" aria-label="Compatibilidade"><div className="shell device-grid">{[["CARRO", "Multimídia"], ["TV", "Smart TV"], ["USB", "Pen Drive"], ["PC", "Computador"], ["OFF", "Sem internet"]].map(([icon, label]) => <div className="device-item" key={label}><strong>{icon}</strong><span>{label}</span></div>)}</div></section>

      <section className="section problems"><div className="shell"><Reveal><SectionTitle eyebrow="Feito para a vida real" title={<>Seu som merece mais que uma <span>tela vazia.</span></>} text="O Pack BrazHits resolve os problemas que atrapalham sua experiência no carro, no bar ou na festa." /></Reveal><div className="problem-grid">{[
        { n: "01", icon: "play", title: "Tela sempre vazia?", text: "Complete a experiência do seu som com clipes em 1080p e áudio de alta qualidade." },
        { n: "02", icon: "wifi", title: "Wi-Fi fraco?", text: "Leve tudo no Pen Drive ou HD externo e rode em qualquer TV ou multimídia compatível." },
        { n: "03", icon: "no-ads", title: "Vídeos com interrupções?", text: "Chega de propagandas e vinhetas indesejadas atrapalhando a reprodução e quebrando o clima." },
        { n: "04", icon: "↻", title: "Sempre os mesmos vídeos?", text: "Receba uma coleção atual e organizada, com novidades adicionadas todos os meses." },
      ].map((item, index) => <Reveal className="problem-card" delay={index * 70} key={item.n}><span className="card-number">{item.n}</span><div className="problem-icon">{item.icon === "play" ? <PlayIcon /> : item.icon === "wifi" ? <WeakWifiIcon /> : item.icon === "no-ads" ? <NoAdsIcon /> : item.icon}</div><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}</div></div></section>

      <section className="section receive-section"><div className="shell receive-grid"><Reveal className="pack-visual"><div className="pack-orbit orbit-one" /><div className="pack-orbit orbit-two" /><div className="pack-box"><span className="pack-brand">BrazHits</span><strong><small>PACK</small> +500<br />CLIPES</strong><span className="pack-quality">FULL HD • 1080P</span><div className="pack-disc"><span>BH</span></div></div><div className="mini-stat stat-one"><strong>MP4</strong><span>Formato universal</span></div><div className="mini-stat stat-two"><strong>VIP</strong><span>Grupo de atualizações</span></div></Reveal><Reveal className="receive-copy" delay={100}><SectionTitle eyebrow="Tudo em um só lugar" title={<>Veja o que você vai <span>receber.</span></>} /><p>O maior acervo de clipes sertanejos atuais, preparado para você baixar com segurança e usar com total liberdade.</p><ul className="check-list two-columns"><CheckItem>Mais de 500 clipes</CheckItem><CheckItem>Pastas organizadas</CheckItem><CheckItem>Sertanejo 2026</CheckItem><CheckItem>MP4 Full HD 1080p</CheckItem><CheckItem>Compatível com carro e TV</CheckItem><CheckItem>Compatível com PC</CheckItem><CheckItem>Grupo VIP no WhatsApp</CheckItem><CheckItem>Atualizações mensais</CheckItem></ul><a className="text-link" href="#oferta-completa">Ver condições da oferta <ArrowIcon direction="down-right" /></a></Reveal></div></section>

      <section className="section social-proof"><div className="shell"><Reveal><SectionTitle eyebrow="Quem compra, recomenda" title={<>Clientes curtindo a <span>experiência BrazHits.</span></>} text="Alguns dos relatos enviados por quem já usa o Pack no carro, em casa e no trabalho." /><div className="comment-count"><span>●</span> Mostrando 6 de 2.937 comentários</div></Reveal><div className="testimonial-grid">{testimonials.map((item, index) => <Reveal className="testimonial" delay={(index % 3) * 70} key={item.name}><div className="testimonial-head"><span className="avatar">{item.initials}</span><div><strong>{item.name}</strong><span>Cliente verificado <i>✓</i></span></div><time>{item.time}</time></div><div className="stars" aria-label="5 estrelas">★★★★★</div><p>{item.text}</p><div className="comment-actions">Curtir · Responder</div></Reveal>)}</div></div></section>

      <section className="section benefits"><div className="shell"><Reveal><SectionTitle eyebrow="Benefícios do Pack BrazHits" title={<>Mais tempo curtindo. <span>Menos tempo procurando.</span></>} /></Reveal><div className="benefit-grid">{[
        { icon: "clock", title: "Ganhe tempo", text: "Chega de perder horas procurando e baixando música. Tenha os sucessos prontos e organizados." },
        { icon: "✦", title: "Ganhe destaque", text: "Anime viagens, festas e barzinhos com uma seleção que chama atenção e mantém o clima lá em cima." },
        { icon: "HD", title: "Ganhe qualidade", text: "Imagem nítida e áudio de alta qualidade em qualquer tela compatível, do carro ao telão." },
      ].map((benefit, index) => <Reveal className="benefit-card" delay={index * 90} key={benefit.title}><div className="benefit-icon">{benefit.icon === "clock" ? <ClockIcon /> : benefit.icon}</div><h3>{benefit.title}</h3><p>{benefit.text}</p><span className="benefit-line" /></Reveal>)}</div><Reveal className="center-cta"><a className="cta cta-large" href="#oferta-completa">Quero acesso ao Pack <ArrowIcon /></a></Reveal></div></section>

      <section className="section catalog"><div className="shell"><Reveal><SectionTitle eyebrow="100% atualizado" title={<>Alguns dos DVDs em <span>alta qualidade</span> que você vai encontrar.</>} text="Uma amostra do acervo. Dentro do Pack tem muito mais." /></Reveal><div className="album-grid">{albums.map((album, index) => <Reveal className="album-card" delay={(index % 4) * 55} key={album.title}><div className="album-image"><img src={album.image} alt={`Capa de ${album.title} - ${album.artist}`} loading="lazy" /><span className="album-play"><PlayIcon /></span></div><strong>{album.title}</strong><span>{album.artist}</span></Reveal>)}</div><Reveal><p className="catalog-more">+ lançamentos e <strong>muito mais!</strong></p></Reveal></div></section>

      <section className="section pricing" id="super-oferta"><div className="shell"><Reveal><SectionTitle eyebrow="Escolha sua oferta" title={<>Um pagamento. <span>Seu som completo, sem mensalidade.</span></>} text="Acesso imediato e vitalício. Escolha a opção que combina com você." /></Reveal><div className="pricing-grid">
        <Reveal className="price-card"><div className="plan-label">PACK ESSENCIAL</div><h3>Clipes Sertanejos</h3><p className="plan-description">Para quem quer transformar qualquer tela com os maiores hits.</p><ul className="check-list"><CheckItem>+500 clipes em MP4 Full HD</CheckItem><CheckItem>Acesso vitalício</CheckItem><CheckItem>Atualizações mensais</CheckItem><CheckItem>Garantia de 15 dias</CheckItem><CheckItem excluded>Grupo VIP no WhatsApp (para ficar por dentro das atualizações mensais e novos packs)</CheckItem><CheckItem excluded>+1.000 Músicas em MP3 (Sertanejo Universitário, Modão e Forró)</CheckItem></ul><div className="price-old">De <s>R$ 49,90</s> por apenas</div><div className="price"><span>R$</span><strong>18</strong><sup>,90</sup></div><a className="cta price-button" href={CHECKOUT_CLIPES} target="_blank" rel="noopener noreferrer">Comprar agora <ArrowIcon /></a><div className="payment-note">PIX ou cartão • acesso imediato</div></Reveal>
        <Reveal id="oferta-clipes-musicas" className="price-card featured" delay={100}><div className="recommended">MAIS ESCOLHIDO</div><div className="plan-label">SUPER OFERTA</div><h3>Clipes + Músicas</h3><p className="plan-description">O pacote completo para quem quer vídeo e uma biblioteca extra de áudio.</p><ul className="check-list"><CheckItem><strong>+500 clipes em MP4 Full HD</strong></CheckItem><CheckItem><strong>+1.000 Músicas em MP3 (Sertanejo Universitário, Modão e Forró)</strong></CheckItem><CheckItem>Acesso vitalício + bônus</CheckItem><CheckItem>Grupo VIP no WhatsApp (para ficar por dentro das atualizações mensais e novos packs)</CheckItem><CheckItem>Garantia de 15 dias</CheckItem></ul><div className="price-old">De <s>R$ 77,90</s> por apenas</div><div className="price"><span>R$</span><strong>26</strong><sup>,90</sup></div><a ref={upgradeTriggerRef} className="cta price-button" href={CHECKOUT_COMPLETO} onClick={openUpgrade} aria-haspopup="dialog">Quero a oferta completa <ArrowIcon /></a><div className="payment-note">PIX ou cartão • acesso imediato</div></Reveal>
        <Reveal id="oferta-completa" className="price-card ultimate" delay={200}><div className="recommended">MELHOR CUSTO-BENEFÍCIO</div><div className="discount-chip">40% OFF</div><div className="plan-label">PACK TOTAL BRAZHITS</div><h3>Todos os Clipes</h3><p className="plan-description">O maior acervo da BrazHits: todos os gêneros reunidos em uma única compra.</p><div className="ultimate-highlight"><strong>+1.700</strong><span>clipes em MP4<br />Full HD 1080p</span></div><ul className="check-list"><CheckItem><strong>Todos os packs disponíveis da loja</strong></CheckItem><CheckItem>Organizados em pastas por gênero</CheckItem><CheckItem>Acesso vitalício</CheckItem><CheckItem>Atualizações mensais</CheckItem><CheckItem>Garantia de 15 dias</CheckItem></ul><div className="genre-pills" aria-label="Gêneros incluídos"><span>Sertanejo 2026</span><span>Sertanejo Raiz</span><span>Pagode 2026</span><span>Forró e Arrocha</span><span>Gospel 2026</span><span>Rock Nacional</span><span>MPB Antigo</span></div><div className="saving-line">Você economiza <strong>R$ 43</strong></div><div className="price-old">Separados sairiam por <s>R$ 110,00</s></div><div className="price"><span>R$</span><strong>67</strong><sup>,00</sup></div><a className="cta price-button" href={CHECKOUT_TODOS_CLIPES} target="_blank" rel="noopener noreferrer">Quero todos os clipes <ArrowIcon /></a><div className="payment-note">PIX ou cartão • acesso imediato</div></Reveal>
      </div><Reveal className="security-row"><span><i>✓</i><strong>Compra segura</strong><small>Ambiente protegido</small></span><span><i>↯</i><strong>Acesso imediato</strong><small>Após a confirmação</small></span><span><i>15</i><strong>Garantia</strong><small>15 dias para testar</small></span></Reveal></div></section>

      <section className="section guarantee"><div className="shell guarantee-card"><Reveal className="guarantee-seal"><span>15</span><strong>DIAS</strong><small>GARANTIA</small></Reveal><Reveal className="guarantee-copy" delay={100}><span className="eyebrow">Risco zero para você</span><h2>Teste o Pack BrazHits com <span>garantia incondicional.</span></h2><p>Você tem 15 dias para conhecer o conteúdo. Se não ficar satisfeito, solicite o reembolso dentro do prazo da garantia.</p></Reveal></div></section>

      <section className="section decision"><div className="shell"><Reveal><SectionTitle eyebrow="A escolha é sua" title={<>Agora você tem <span>dois caminhos.</span></>} /></Reveal><div className="decision-grid"><Reveal className="decision-card muted"><span className="decision-number">01</span><h3>Continuar como está</h3><p>Perder tempo em sites suspeitos, baixar arquivos de baixa qualidade e depender da internet sempre que quiser assistir.</p><div className="decision-tag">Mais trabalho, menos qualidade</div></Reveal><Reveal className="decision-card positive" delay={90}><span className="decision-number">02</span><h3>Ter tudo pronto agora</h3><p>Baixar mais de 500 clipes com segurança, organização e liberdade para curtir em alta qualidade onde quiser.</p><a href="#oferta-completa">Escolher este caminho <ArrowIcon /></a></Reveal></div><Reveal><p className="decision-note">Não tomar uma decisão também é uma decisão. <strong>Dê o play em uma experiência muito melhor.</strong></p></Reveal></div></section>

      <section className="other-packs">
        <div className="shell other-packs-inner">
          <Reveal className="other-packs-heading">
            <span className="eyebrow">Quer outros ritmos?</span>
            <h2>Encontre o Pack certo para o seu som.</h2>
            <p>Deslize e conheça os outros gêneros disponíveis na BrazHits.</p>
          </Reveal>

          <Reveal className="genre-deck" delay={80}>
            {otherPacks.map((pack, index) => (
              <a
                className={`genre-card genre-tone-${pack.tone}`}
                href={pack.checkout}
                aria-label={`Comprar ${pack.label}`}
                key={pack.id}
              >
                <div className="genre-cover">
                  <img
                    src={`${BASE_PATH}/${pack.image}`}
                    alt={`Capa do ${pack.label}`}
                    width="1200"
                    height="1200"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <div className="genre-brand"><span>Braz</span><strong>Hits</strong></div>
                  <div className="genre-bars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
                  <div className="genre-copy"><strong>{pack.name}</strong></div>
                  <span className="genre-action" aria-hidden="true"><ArrowIcon /></span>
                </div>
                <h3>{pack.label}</h3>
              </a>
            ))}
          </Reveal>

          <p className="deck-swipe-hint" aria-hidden="true"><span className="swipe-icon" /> Deslize para explorar</p>

          <Reveal className="other-packs-cta" delay={150}>
            <a className="outline-button" href="https://brazhits.com.br/loja/" target="_blank" rel="noopener noreferrer">Conferir todos os Packs <ArrowIcon direction="up-right" /></a>
          </Reveal>
        </div>
      </section>

      <section className="section faq-section"><div className="shell faq-grid"><Reveal className="faq-intro"><span className="eyebrow">Dúvidas frequentes</span><h2>Ficou com alguma <span>dúvida?</span></h2><p>Confira as respostas mais comuns ou fale diretamente com o suporte da BrazHits.</p><a className="whatsapp-link" href={WHATSAPP} target="_blank" rel="noopener noreferrer"><span>●</span> Falar no WhatsApp</a></Reveal><div className="faq-list">{faqs.map((faq, index) => <Reveal delay={(index % 3) * 45} key={faq.q}><details><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details></Reveal>)}</div></div></section>

      <section className="final-cta"><div className="final-glow" /><div className="shell final-inner"><Reveal><span className="eyebrow">Dê o play na sua experiência</span><h2>Mais de 1.700 clipes.<br /><span>Um clique de distância.</span></h2><p>Aproveite a oferta de hoje e receba seu acesso imediatamente após a confirmação.</p><a className="cta cta-large" href="#oferta-completa">Garantir meu Pack agora <ArrowIcon /></a></Reveal></div></section>
      <footer><div className="shell footer-inner"><a className="brand footer-brand" href="#top"><span>Braz<span>Hits</span></span></a><p>© {new Date().getFullYear()} BrazHits — Todos os direitos reservados.</p><a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Suporte</a></div></footer>

      {upgradeOpen && (
        <div className="upgrade-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setUpgradeOpen(false); }}>
          <div ref={upgradeDialogRef} className="upgrade-dialog" role="dialog" aria-modal="true" aria-labelledby="upgrade-title" aria-describedby="upgrade-description" tabIndex={-1}>
            <button className="upgrade-close" type="button" onClick={() => setUpgradeOpen(false)} aria-label="Fechar oferta especial">×</button>
            <div className="upgrade-badge"><span aria-hidden="true" /> OFERTA ESPECIAL LIBERADA</div>
            <p className="upgrade-kicker">Antes de finalizar sua compra...</p>
            <h2 id="upgrade-title">Leve <span>todos os Packs de Clipes</span> por apenas R$ 57</h2>
            <p id="upgrade-description" className="upgrade-description">Você desbloqueou uma condição exclusiva para trocar sua escolha pelo maior acervo da BrazHits.</p>

            <div className="upgrade-highlight">
              <div><strong>+1.700</strong><span>clipes em MP4<br />Full HD 1080p</span></div>
              <ul>
                <li><span>✓</span> Todos os 7 packs da loja</li>
                <li><span>✓</span> Organizados por gênero</li>
                <li><span>✓</span> Acesso vitalício</li>
              </ul>
            </div>

            <div className="upgrade-genres" aria-label="Gêneros incluídos"><span>Sertanejo</span><span>Modão</span><span>Forró</span><span>Pagode</span><span>Gospel</span><span>Rock</span><span>MPB</span></div>

            <div className="upgrade-offer-row">
              <div className="upgrade-scarcity"><strong>Condição exclusiva desta etapa</strong><span>Fora desta condição, o Pack Total custa R$ 67.</span></div>
              <div className="upgrade-price"><small>De <s>R$ 67,00</s> por</small><strong><span>R$</span> 57<sup>,00</sup></strong><em>Economize mais R$ 10</em></div>
            </div>

            <a className="cta upgrade-accept" href={CHECKOUT_TODOS_CLIPES_ESPECIAL} target="_blank" rel="noopener noreferrer" onClick={() => setUpgradeOpen(false)}>Sim, quero +1.700 clipes por R$ 57 <ArrowIcon /></a>
            <a className="upgrade-decline" href={CHECKOUT_COMPLETO} target="_blank" rel="noopener noreferrer" onClick={() => setUpgradeOpen(false)}>Não, continuar com Clipes + Músicas por R$ 26,90</a>
            <p className="upgrade-microcopy">Pagamento único • Acesso imediato • 15 dias de garantia</p>
          </div>
        </div>
      )}

      <a className="mobile-sticky-cta" href="#oferta-clipes-musicas"><span><small>Super Oferta</small><strong>R$ 26,90</strong></span><b>VER OFERTA <ArrowIcon /></b></a>
    </main>
  );
}
