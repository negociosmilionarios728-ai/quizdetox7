"use client"

import { useEffect, useRef, useState } from "react"
import {
  ChevronDown,
  CircleCheckBig,
  Clock3,
  Flame,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Smartphone,
  TrendingDown,
} from "lucide-react"
import { playClickSound } from "@/lib/audio"
import { buildCheckoutUrl } from "@/lib/tracking"

const benefits = [
  "Plano guiado para 30 dias com tarefas simples",
  "Receitas detox e emagrecimento dentro do app",
  "Análise de calorias para tomar decisões melhores",
  "Bônus com ebook de 70 receitas para acelerar resultados",
]

const highlights = [
  {
    icon: Flame,
    title: "Rotina guiada",
    text: "Receba o que fazer em cada etapa sem precisar montar dieta sozinho(a).",
  },
  {
    icon: TrendingDown,
    title: "Menos inchaço",
    text: "Foco em leveza, constância e praticidade no dia a dia.",
  },
  {
    icon: Smartphone,
    title: "Tudo no celular",
    text: "Acesse o conteúdo quando quiser e acompanhe seu progresso no app.",
  },
]

const faqs = [
  {
    question: "Como recebo o acesso depois da compra?",
    answer: "Assim que o pagamento for confirmado, o acesso e liberado imediatamente com as instruções para entrar no aplicativo.",
  },
  {
    question: "Preciso seguir uma dieta dificil?",
    answer: "Não. A proposta do Detox7 PRO e simplificar sua rotina com orientações objetivas, receitas e acompanhamento prático.",
  },
  {
    question: "Funciona para quem tem pouco tempo?",
    answer: "Sim. O conteúdo foi pensado para encaixar na rotina corrida, com tarefas simples e acompanhamento direto pelo celular.",
  },
  {
    question: "Tem garantia?",
    answer: "Sim. Você conta com garantia de 7 dias para testar o acesso com mais segurança.",
  },
]

export function OfferPage() {
  const [isTestimonialsZoomed, setIsTestimonialsZoomed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [showVideoOverlay, setShowVideoOverlay] = useState(true)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hasScrollInteractedRef = useRef(false)
  const isVideoVisibleRef = useRef(false)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playsInline = true

    const tryPlayWithAudio = () => {
      if (!isVideoVisibleRef.current) return

      video.muted = false
      video.volume = 1
      void video
        .play()
        .then(() => {
          setShowVideoOverlay(false)
        })
        .catch(() => {
          setShowVideoOverlay(true)
        })
    }

    const syncOverlayState = () => {
      setShowVideoOverlay(video.paused)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting)
        isVideoVisibleRef.current = isVisible

        if (isVisible) {
          if (hasScrollInteractedRef.current) {
            tryPlayWithAudio()
          }
          return
        }

        video.pause()
      },
      { threshold: 0.6 }
    )

    const handleScrollInteraction = () => {
      hasScrollInteractedRef.current = true
      tryPlayWithAudio()
    }

    syncOverlayState()
    observer.observe(video)
    video.addEventListener("play", syncOverlayState)
    video.addEventListener("pause", syncOverlayState)
    video.addEventListener("ended", syncOverlayState)
    window.addEventListener("scroll", handleScrollInteraction, { passive: true })
    window.addEventListener("wheel", handleScrollInteraction, { passive: true })
    window.addEventListener("touchmove", handleScrollInteraction, { passive: true })

    return () => {
      observer.disconnect()
      video.removeEventListener("play", syncOverlayState)
      video.removeEventListener("pause", syncOverlayState)
      video.removeEventListener("ended", syncOverlayState)
      window.removeEventListener("scroll", handleScrollInteraction)
      window.removeEventListener("wheel", handleScrollInteraction)
      window.removeEventListener("touchmove", handleScrollInteraction)
    }
  }, [])

  const handleVideoOverlayPlay = () => {
    const video = videoRef.current
    if (!video) return

    hasScrollInteractedRef.current = true
    video.muted = false
    video.volume = 1
    void video
      .play()
      .then(() => {
        setShowVideoOverlay(false)
      })
      .catch(() => {
        setShowVideoOverlay(true)
      })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const handleCheckoutClick = () => {
    playClickSound()
    const checkoutUrl = buildCheckoutUrl("https://zuckpay.com.br/checkout/aplicativo-detox7-pro")
    window.top!.location.href = checkoutUrl
  }

  const checkoutButtonClassName =
    "w-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-700 px-6 py-4 text-center text-base font-extrabold text-white shadow-[0_20px_40px_-20px_rgba(13,148,136,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(13,148,136,0.95)] animate-glitch"

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#d5faf5_0%,#eef7f6_38%,#f6f8f7_100%)] text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-28 pt-4 sm:px-6 lg:px-8">
        <div className="sticky top-3 z-30 rounded-full border border-white/70 bg-white/85 px-4 py-3 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Detox7 PRO</p>
                <p className="text-xs text-slate-500">Oferta especial ativa agora</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckoutClick}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800 animate-glitch"
            >
              Quero acesso
            </button>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[2rem] border border-teal-200/70 bg-white px-6 py-7 shadow-[0_35px_90px_-45px_rgba(15,23,42,0.35)] sm:px-8 sm:py-9">
            <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-teal-200/40 blur-3xl" />
            <div className="absolute right-0 top-10 h-52 w-52 rounded-full bg-emerald-200/40 blur-3xl" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                <Star className="h-4 w-4 fill-current" />
                Aplicativo + bônus imediato
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Você não precisa de dieta complicada para ter mais energia e leveza no dia a dia.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                O Detox7 PRO entrega uma experiência simples, guiada e feita para celular, com foco em leveza, rotina e acesso rápido ao que a pessoa precisa fazer.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 shadow-sm"
                  >
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-white">
                      <CircleCheckBig className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium leading-6 text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={handleCheckoutClick} className={checkoutButtonClassName}>
                  Liberar meu acesso agora
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-teal-600" />
                  Garantia de 7 dias
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-teal-600" />
                  Pagamento seguro
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-teal-600" />
                  Acesso imediato
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-teal-200/70 bg-slate-950 p-6 text-white shadow-[0_35px_90px_-45px_rgba(15,23,42,0.65)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">Oferta ativa</p>
                  <p className="mt-2 text-3xl font-black">R$ 9,99</p>
                  <p className="mt-1 text-sm text-slate-300 line-through">De R$ 67,00 por tempo limitado</p>
                </div>
                <div className="rounded-full bg-red-500 px-4 py-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Desconto</p>
                  <p className="text-2xl font-black">76%</p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-200">Esta oferta expira em</p>
                <p className="mt-3 font-mono text-4xl font-black tracking-[0.18em]">{formatTime(timeLeft)}</p>
              </div>

              <button onClick={handleCheckoutClick} className={`${checkoutButtonClassName} mt-6 mb-0`}>
                Garantir oferta especial
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {highlights.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-[1.6rem] border border-white/80 bg-white/90 p-5 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-teal-200/60 bg-white/90 p-5 shadow-[0_35px_90px_-50px_rgba(15,23,42,0.35)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Veja por dentro</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                  Veja na prática como o Detox 7 Pro funciona
                </h2>
              </div>
              <div className="hidden rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 sm:block">
                Assista o vídeo demonstrativo
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.6rem] border border-teal-500/20 bg-slate-950 shadow-lg">
              <video ref={videoRef} className="w-full h-auto" controls playsInline preload="metadata">
                <source src="/videoapp.mp4" type="video/mp4" />
                Seu navegador nao suporta video.
              </video>
              {showVideoOverlay && (
                <button
                  type="button"
                  onClick={handleVideoOverlayPlay}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-white p-4 transition-all duration-300 hover:scale-[1.01]"
                  aria-label="Reproduzir video com audio"
                >
                  <img
                    src="/images/video-poster.png"
                    alt="Dê play no vídeo e descubra como funciona o Detox7 PRO"
                    className="h-[92%] w-[92%] object-contain"
                  />
                </button>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-teal-200/60 bg-white p-6 shadow-[0_35px_90px_-50px_rgba(15,23,42,0.35)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-700">O que você recebe</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Acesso ao Detox 7 Pro + bônus
            </h2>

            <div className="mt-6 space-y-4">
              {[
                "Acesso ao aplicativo Detox7 PRO",
                "Plano com tarefas e acompanhamento visual",
                "Receitas focadas em detox e rotina",
                "Ebook bônus com 70 receitas saudáveis",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white">
                    <CircleCheckBig className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-24 rounded-[2rem] border border-teal-200/70 bg-slate-950 p-6 text-white shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">Oferta ativa</p>
                  <p className="mt-2 text-3xl font-black">R$ 9,99</p>
                  <p className="mt-1 text-sm text-slate-300 line-through">De R$ 67,00 por tempo limitado</p>
                </div>
                <div className="rounded-full bg-red-500 px-4 py-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Desconto</p>
                  <p className="text-2xl font-black">76%</p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-200">Esta oferta expira em</p>
                <p className="mt-3 font-mono text-4xl font-black tracking-[0.18em]">{formatTime(timeLeft)}</p>
              </div>

              <button onClick={handleCheckoutClick} className={`${checkoutButtonClassName} mt-6 mb-0`}>
                Garantir oferta especial
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-teal-200/60 bg-white p-5 shadow-[0_35px_90px_-50px_rgba(15,23,42,0.35)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-700">Prova social</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">Olha isso 👇</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsTestimonialsZoomed(true)}
                className="rounded-full border border-teal-200 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
              >
                Ver depoimentos reais
              </button>
            </div>

            <div className="mt-5 cursor-pointer" onClick={() => setIsTestimonialsZoomed(true)}>
              <img
                src="/images/a-20parte-20de-20mente-20e-20corpo-20juntas-20fez-20sentido-20pra-20mim.jpg"
                alt="Depoimentos de clientes sobre o Detox7 PRO"
                className="w-full rounded-[1.6rem] shadow-lg transition duration-300 hover:scale-[1.01]"
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-teal-200/60 bg-white p-6 shadow-[0_35px_90px_-50px_rgba(15,23,42,0.35)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-700">Perguntas frequentes</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Ainda com dúvidas? A gente te explica </h2>

            <div className="mt-6 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index

                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50/80"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-semibold text-slate-900">{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-teal-700 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && <div className="px-5 pb-5 text-sm leading-7 text-slate-600">{faq.answer}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="rounded-[2.2rem] border border-teal-200/60 bg-slate-950 px-6 py-8 text-white shadow-[0_35px_90px_-45px_rgba(15,23,42,0.65)] sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-200">Última chamada</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Libere agora o Detox7 PRO por R$ 9,99.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Pagamento seguro, acesso imediato e garantia de 7 dias para você entrar com mais confiança.
              </p>
            </div>

            <div className="w-full max-w-sm">
              <button onClick={handleCheckoutClick} className={`${checkoutButtonClassName} mb-0`}>
                Quero liberar meu acesso
              </button>
            </div>
          </div>
        </section>
      </div>

      {isTestimonialsZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col">
            <button
              type="button"
              onClick={() => setIsTestimonialsZoomed(false)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:bg-slate-200"
            >
              <span className="text-xl font-bold">×</span>
            </button>

            <img
              src="/images/a-20parte-20de-20mente-20e-20corpo-20juntas-20fez-20sentido-20pra-20mim.jpg"
              alt="Depoimentos de clientes"
              className="h-full w-full rounded-[1.5rem] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
