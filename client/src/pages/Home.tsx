import { useState, useEffect, useRef } from "react";

/**
 * Landing Page - Figurinhas da Copa (PDF para Imprimir)
 * Design: Escuro Estilo Flamino com Cores Brasil
 * Fundo: Gradiente escuro (azul/verde)
 * Destaque: Amarelo/Ouro (#FFD700) para tipografia e elementos
 * Ofertas: SIMPLES (todas as figurinhas) vs PREMIUM (álbum + figurinhas)
 * Animações: Scroll animations, micro-movimentos, fade-in on scroll
 */

export default function Home() {
  const [selectedOffer, setSelectedOffer] = useState<"simple" | "premium">("premium");
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});

  const sectionRefs = {
    hero: useRef(null),
    social: useRef(null),
    mockups: useRef(null),
    process: useRef(null),
    offers: useRef(null),
    faq: useRef(null),
    cta: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section");
            if (sectionId) {
              setVisibleSections((prev) => ({ ...prev, [sectionId]: true }));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const handleCTA = (type: string) => {
    // Placeholder: será substituído pelo link do Cakto
    alert(`Redirecionando para checkout - ${type}`);
  };

  const animationClass = (sectionKey: string) =>
    visibleSections[sectionKey]
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10";

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0a1428 0%, #1a2a4a 50%, #0f1f3a 100%)" }}>
      {/* ========== HEADER ========== */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: "rgba(10, 20, 40, 0.8)", borderColor: "#2a3a5a" }}>
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FFD700" }}>
              <span style={{ color: "#0a1428", fontSize: "20px", fontWeight: "bold" }}>⚽</span>
            </div>
            <span className="font-heading text-xl font-bold" style={{ color: "#FFD700" }}>
              FIGURINHAS COPA
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#como-funciona" style={{ color: "#b0b0b0" }} className="hover:text-white transition duration-300">
              Como Funciona
            </a>
            <a href="#ofertas" style={{ color: "#b0b0b0" }} className="hover:text-white transition duration-300">
              Ofertas
            </a>
            <a href="#faq" style={{ color: "#b0b0b0" }} className="hover:text-white transition duration-300">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* ========== HERO SECTION ========== */}
      <section
        ref={sectionRefs.hero}
        data-section="hero"
        className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40 z-0">
          <img
            src="img/ata.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${animationClass("hero")}`}>
              <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "#FFD700", color: "#0a1428" }}>
                <span className="text-sm font-bold">FIGURINHAS DA COPA</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: "#FFD700" }}>
                Imprima Suas Figurinhas em Casa em Minutos
              </h1>
              <p className="text-lg mb-8" style={{ color: "#d0d0d0" }}>
                Download em PDF, imprima em casa e tenha suas figurinhas personalizadas da Copa do Mundo. Sem complicações, sem espera. Pronto em minutos.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => handleCTA("simple")}
                  className="px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
                >
                  Escolher Oferta
                </button>
                <button
                  onClick={() => handleCTA("info")}
                  className="px-8 py-3 rounded-lg font-bold border-2 transition-all duration-300 hover:scale-105"
                  style={{ borderColor: "#FFD700", color: "#FFD700" }}
                >
                  Saber Mais
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className={`transition-all duration-1000 transform ${animationClass("hero")} hover:scale-105 transition-transform`}>
              <img
                src="img/album.jpg"
                alt="Album Premium"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: "🎁", text: "Receba instantaneamente após a compra" },
              { icon: "♻️", text: "Imprima quantas vezes quiser" },
              { icon: "💰", text: "Economize dinheiro em comparação aos pacotinhos" },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-xl ${animationClass("hero")}`}
                style={{
                  background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 100%)",
                  border: "2px solid rgba(255, 215, 0, 0.3)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <span className="text-4xl block mb-3">{benefit.icon}</span>
                <p style={{ color: "#FFD700" }} className="font-bold text-base">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SOCIAL PROOF SECTION ========== */}
      <section
        ref={sectionRefs.social}
        data-section="social"
        className="py-16 md:py-24"
        style={{ backgroundColor: "rgba(26, 42, 74, 0.5)" }}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#FFD700" }}>
            Veja o Que as Pessoas Estão Amando
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria Silva",
                text: "Adorei! Meu filho colou todas as figurinhas e ficou muito feliz. Qualidade excelente!",
                rating: 5,
              },
              {
                name: "João Santos",
                text: "Muito prático e rápido. Imprimiu perfeitamente e as cores ficaram vibrantes.",
                rating: 5,
              },
              {
                name: "Ana Costa",
                text: "Perfeito para presentear! Meus filhos amaram. Recomendo muito!",
                rating: 5,
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg transition-all duration-1000 hover:scale-105 ${animationClass("social")}`}
                style={{ backgroundColor: "rgba(255, 215, 0, 0.05)", border: "1px solid rgba(255, 215, 0, 0.2)" }}
              >
                <div className="flex gap-1 mb-3">
                  {Array(review.rating).fill("⭐").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p style={{ color: "#d0d0d0" }} className="mb-4">
                  "{review.text}"
                </p>
                <p style={{ color: "#FFD700" }} className="font-bold">
                  {review.name}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => handleCTA("social-cta")}
              className="px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
            >
              Começar Minha Coleção Agora
            </button>
          </div>
        </div>
      </section>

      {/* ========== MOCKUPS SECTION ========== */}
      <section
        ref={sectionRefs.mockups}
        data-section="mockups"
        className="py-16 md:py-24"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#FFD700" }}>
            Veja o Produto Final
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663789471684/jB5AgGX56ePpra743Xqzkg/mockup-stickers-printed-1-ZbfsmD5cZGJZcuJJKqPBat.webp",
                title: "Figurinhas Impressas",
              },
              {
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663789471684/jB5AgGX56ePpra743Xqzkg/mockup-album-open-spread-7nGbZEAw2q8m9vERDyZMwq.webp",
                title: "Álbum Premium",
              },
              {
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663789471684/jB5AgGX56ePpra743Xqzkg/mockup-stickers-detail-close-USFB6GdkJUiZfzqdgfz8rm.webp",
                title: "Detalhe da Qualidade",
              },
              {
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663789471684/jB5AgGX56ePpra743Xqzkg/mockup-album-filled-complete-E66fp6zhGVzGmvbcLBT9Ln.webp",
                title: "Álbum Completo",
              },
              {
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663789471684/jB5AgGX56ePpra743Xqzkg/mockup-package-unboxing-KLyYoyfbaa7hQBLhaAvrDm.webp",
                title: "Desembalagem Premium",
              },
            ].map((mockup, idx) => (
              <div
                key={idx}
                className={`rounded-lg overflow-hidden transition-all duration-1000 hover:scale-105 hover:shadow-2xl ${animationClass("mockups")}`}
              >
                <img src={mockup.img} alt={mockup.title} className="w-full h-64 object-cover" />
                <div className="p-4 text-center" style={{ backgroundColor: "rgba(255, 215, 0, 0.05)" }}>
                  <p style={{ color: "#FFD700" }} className="font-bold">
                    {mockup.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => handleCTA("mockups-cta")}
              className="px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
            >
              Quero Minha Coleção Assim
            </button>
          </div>
        </div>
      </section>

      {/* ========== PROCESS SECTION ========== */}
      <section
        ref={sectionRefs.process}
        data-section="process"
        className="py-16 md:py-24"
        style={{ backgroundColor: "rgba(26, 42, 74, 0.5)" }}
        id="como-funciona"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#FFD700" }}>
            Como Funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { num: "1", title: "Compre o PDF", desc: "Escolha seu pacote e faça o download instantâneo" },
              { num: "2", title: "Baixe e Imprima", desc: "Imprima em casa em qualidade 300 DPI" },
              { num: "3", title: "Cole e Colecione", desc: "Cole as figurinhas no álbum e complete sua coleção" },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`text-center transition-all duration-1000 hover:scale-105 ${animationClass("process")}`}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
                  style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
                >
                  {step.num}
                </div>
                <h3 style={{ color: "#FFD700" }} className="text-xl font-bold mb-2">
                  {step.title}
                </h3>
                <p style={{ color: "#d0d0d0" }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => handleCTA("process-cta")}
              className="px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
            >
              Começar Agora
            </button>
          </div>
        </div>
      </section>

      {/* ========== OFFERS SECTION ========== */}
      <section
        ref={sectionRefs.offers}
        data-section="offers"
        className="py-16 md:py-24"
        id="ofertas"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#FFD700" }}>
            Escolha Seu Pacote
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            {/* Simple Offer */}
            <div
              className={`p-8 rounded-lg transition-all duration-1000 hover:scale-105 cursor-pointer ${animationClass("offers")}`}
              style={{
                backgroundColor: selectedOffer === "simple" ? "rgba(255, 215, 0, 0.1)" : "rgba(255, 215, 0, 0.05)",
                border: selectedOffer === "simple" ? "2px solid #FFD700" : "1px solid rgba(255, 215, 0, 0.2)",
              }}
              onClick={() => setSelectedOffer("simple")}
            >
              <h3 style={{ color: "#FFD700" }} className="text-2xl font-bold mb-4">
                SIMPLES
              </h3>
              <p style={{ color: "#d0d0d0" }} className="mb-6">
                Todas as figurinhas da Copa
              </p>
              <div className="mb-6">
                <span style={{ color: "#888" }} className="line-through text-lg">
                  R$ 29,90
                </span>
                <p style={{ color: "#FFD700" }} className="text-4xl font-bold">
                  R$ 10,90
                </p>
              </div>
              <ul style={{ color: "#d0d0d0" }} className="space-y-3 mb-6 text-sm">
                <li>✅ Todas as figurinhas da Copa</li>
                <li>✅ Receba instantaneamente</li>
                <li>✅ Imprima quantas vezes quiser</li>
                <li>✅ Monte sua coleção hoje mesmo</li>
              </ul>
              <button
                onClick={() => handleCTA("simple")}
                className="w-full px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
              >
                Comprar Agora
              </button>
            </div>

            {/* Premium Offer */}
            <div
              className={`p-8 rounded-lg transition-all duration-1000 hover:scale-105 cursor-pointer relative ${animationClass("offers")}`}
              style={{
                backgroundColor: selectedOffer === "premium" ? "rgba(255, 215, 0, 0.15)" : "rgba(255, 215, 0, 0.08)",
                border: selectedOffer === "premium" ? "2px solid #FFD700" : "1px solid rgba(255, 215, 0, 0.3)",
              }}
              onClick={() => setSelectedOffer("premium")}
            >
              <div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold"
                style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
              >
                MAIS ESCOLHIDO
              </div>
              <h3 style={{ color: "#FFD700" }} className="text-2xl font-bold mb-4">
                PREMIUM
              </h3>
              <p style={{ color: "#d0d0d0" }} className="mb-6">
                Álbum + Todas as figurinhas
              </p>
              <div className="mb-6">
                <span style={{ color: "#888" }} className="line-through text-lg">
                  R$ 44,90
                </span>
                <p style={{ color: "#FFD700" }} className="text-4xl font-bold">
                  R$ 20,90
                </p>
              </div>
              <ul style={{ color: "#d0d0d0" }} className="space-y-3 mb-6 text-sm">
                <li>✅ Álbum premium para colar</li>
                <li>✅ Todas as figurinhas da Copa</li>
                <li>✅ Receba instantaneamente</li>
                <li>✅ Ideal para crianças e colecionadores</li>
                <li>✅ Economize em comparação aos pacotinhos</li>
              </ul>
              <button
                onClick={() => handleCTA("premium")}
                className="w-full px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
              >
                Comprar Agora
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => handleCTA("offers-cta")}
              className="px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
            >
              Garantir Meu Pacote Agora
            </button>
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section
        ref={sectionRefs.faq}
        data-section="faq"
        className="py-16 md:py-24"
        style={{ backgroundColor: "rgba(26, 42, 74, 0.5)" }}
        id="faq"
      >
        <div className="container max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#FFD700" }}>
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Como recebo o PDF?",
                a: "Você recebe o link de download instantaneamente por email após a compra.",
              },
              {
                q: "Posso imprimir quantas vezes quiser?",
                a: "Sim! Você pode imprimir ilimitadamente. O PDF é seu para sempre.",
              },
              {
                q: "Qual é a qualidade de impressão?",
                a: "As figurinhas são em qualidade 300 DPI, perfeitas para impressão profissional.",
              },
              {
                q: "O álbum vem pronto para colar?",
                a: "Sim! O álbum premium vem com os espaços prontos para colar as figurinhas.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg transition-all duration-1000 hover:scale-105 ${animationClass("faq")}`}
                style={{ backgroundColor: "rgba(255, 215, 0, 0.05)", border: "1px solid rgba(255, 215, 0, 0.2)" }}
              >
                <h3 style={{ color: "#FFD700" }} className="font-bold mb-2">
                  {faq.q}
                </h3>
                <p style={{ color: "#d0d0d0" }}>{faq.a}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => handleCTA("faq-cta")}
              className="px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
            >
              Tirar Dúvidas e Comprar
            </button>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA SECTION ========== */}
      <section
        ref={sectionRefs.cta}
        data-section="cta"
        className="relative py-20 md:py-32 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663789471684/jB5AgGX56ePpra743Xqzkg/bg-cta-vibrant-KLyYoyfbaa7hQBLhaAvrDm.webp"
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container max-w-2xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#FFD700" }}>
            Comece Sua Coleção Agora
          </h2>
          <p style={{ color: "#d0d0d0" }} className="text-lg mb-8">
            Não perca mais tempo. Imprima suas figurinhas da Copa em casa em minutos. Qualidade garantida.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => handleCTA("final-simple")}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "#FFD700", color: "#0a1428" }}
            >
              Comprar Simples - R$ 10,90
            </button>
            <button
              onClick={() => handleCTA("final-premium")}
              className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all duration-300 hover:scale-105"
              style={{ borderColor: "#FFD700", color: "#FFD700" }}
            >
              Comprar Premium - R$ 20,90
            </button>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer
        className="py-8 text-center text-sm"
        style={{ backgroundColor: "rgba(10, 20, 40, 0.9)", color: "#888" }}
      >
        <p>© 2025 Figurinhas da Copa. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
