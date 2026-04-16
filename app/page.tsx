"use client"

import { useState, useEffect } from "react"
import { Leaf, Activity, Brain, Zap, ArrowRight } from "lucide-react"
import { OfferPage } from "./OfferPage"
import { playClickSound } from "@/lib/audio"

export default function DetoxQuizPage() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [questionProgress, setQuestionProgress] = useState(0)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isImageZoomed, setIsImageZoomed] = useState(false)

  const questions = [
    {
      q: "Qual é o seu objetivo principal com o detox?",
      opts: ["Perder peso rapidamente", "Melhorar disposição e energia", "Reduzir inchaço", "Criar hábitos saudáveis"],
    },
    {
      q: "Como você avalia seu nível de ansiedade?",
      opts: [
        "Muito alto - afeta meu dia a dia",
        "Alto - me preocupo frequentemente",
        "Moderado - às vezes me sinto ansioso(a)",
        "Baixo - raramente me sinto ansioso(a)",
      ],
    },
    {
      q: "Você costuma beliscar entre as refeições?",
      opts: ["Sim, o tempo todo", "Sim, quando estou ansioso(a)", "Às vezes", "Raramente ou nunca"],
    },
    {
      q: "Como é sua rotina de exercícios?",
      opts: ["Não faço exercícios", "1-2 vezes por semana", "3-4 vezes por semana", "5 ou mais vezes por semana"],
    },
    {
      q: "Qual sua maior dificuldade com alimentação?",
      opts: ["Controlar a fome", "Escolher alimentos saudáveis", "Comer por ansiedade", "Manter a consistência"],
    },
    {
      q: "Você tem alguma restrição alimentar?",
      opts: ["Nenhuma", "Vegetariano(a)", "Vegano(a)", "Intolerância (lactose, glúten)"],
    },
    {
      q: "Qual seu horário de maior fome?",
      opts: ["Manhã", "Tarde", "Noite", "Madrugada"],
    },
    {
      q: "Como você descreveria seu sono?",
      opts: [
        "Durmo bem todas as noites",
        "Durmo bem na maioria das noites",
        "Tenho dificuldade para dormir",
        "Acordo várias vezes durante a noite",
      ],
    },
    {
      q: "Você consome bebidas alcoólicas?",
      opts: [
        "Nunca",
        "Raramente (1x por mês)",
        "Moderadamente (1-2x por semana)",
        "Frequentemente (3+ vezes por semana)",
      ],
    },
    {
      q: "Qual sua principal fonte de estresse?",
      opts: ["Trabalho", "Relacionamentos", "Finanças", "Saúde"],
    },
    {
      q: "Você bebe água suficiente?",
      opts: [
        "Sim, mais de 2 litros por dia",
        "Sim, cerca de 1,5-2 litros",
        "Não, menos de 1 litro",
        "Não tenho certeza",
      ],
    },
    {
      q: "O que te motiva a começar agora?",
      opts: [
        "Quero me sentir melhor comigo mesmo(a)",
        "Preciso de mais energia",
        "Quero melhorar minha saúde",
        "Quero emagrecer para um evento",
      ],
    },
  ]


  const nextStep = () => {
    playClickSound()
    setStep((prev) => prev + 1)
  }

  const handleAnswer = (idx: number) => {
    setAnswers((prev) => ({ ...prev, [step]: idx }))
    nextStep()
  }

  useEffect(() => {
    if (step >= 2 && step <= 12) {
      setQuestionProgress((step / 12) * 100)
    }
    if (step === 13) {
      setAnalysisProgress(0)
    }
  }, [step])

  useEffect(() => {
    if (step === 13) {
      let p = 0
      setAnalysisProgress(0)

      setTimeout(() => {
        const interval = setInterval(() => {
          p += 2
          setAnalysisProgress(p)
          if (p >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setStep(14)
            }, 1500)
          }
        }, 80)

        return () => {
          clearInterval(interval)
        }
      }, 100)
    }
  }, [step])

  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="mb-4 flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm border border-emerald-100/50">
            <Leaf className="w-8 h-8 text-emerald-600" />
          </div>

          <h1 className="text-center mb-2">
            <div className="flex items-baseline gap-2 flex-wrap justify-center">
              <span className="text-4xl font-extrabold text-gray-900 tracking-tight">Reset Total</span>
              <span className="text-[3.5rem] leading-none font-black text-emerald-600">7 DIAS</span>
            </div>
            <span className="block text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mt-2">
              Plano Exclusivo
            </span>
          </h1>

          <div className="mt-6 w-full max-w-md mx-auto space-y-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-emerald-100/50 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Reativar Metabolismo</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Acelere sua queima calórica</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-emerald-100/50 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50">
                  <Brain className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Mente Silenciosa</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Reduza ansiedade e estresse</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-emerald-100/50 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Corpo Mais Leve</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Sinta-se revigorado e energizado</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 pb-6">
          <div className="max-w-md mx-auto">
            <button
              onClick={nextStep}
              className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>COMEÇAR AGORA</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-3 tracking-wide uppercase">
              100% Gratuito • Leva menos de 1 min
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (step >= 2 && step <= 12) {
    const current = questions[step - 2]
    return (
      <div className="min-h-screen bg-[#F3F4F6]">
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-gray-200 z-50">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${questionProgress}%` }}
          />
        </div>
        <div className="fixed top-4 right-6 text-sm font-bold text-emerald-600 z-50">{step - 1}/12</div>

        <div className="max-w-2xl mx-auto p-6 pt-16 animate-in fade-in duration-500">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 leading-tight">{current.q}</h2>
          <p className="text-sm text-gray-500 mb-8">Escolha a opção que mais se encaixa com você</p>
          <div className="space-y-3">
            {current.opts.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full p-5 bg-white text-left rounded-2xl shadow-sm border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all font-medium text-gray-700 active:scale-98"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (step === 13) {
    const steps = [
      { id: 1, label: "Analisando perfil metabólico", start: 0, complete: 25 },
      { id: 2, label: "Identificando gatilhos de ansiedade", start: 25, complete: 50 },
      { id: 3, label: "Calculando estratégia calórica", start: 50, complete: 75 },
      { id: 4, label: "Gerando cronograma de 7 dias", start: 75, complete: 100 },
    ]

    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-in fade-in duration-500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
              {analysisProgress < 100 ? (
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" />
                  <path
                    d="M8 12l3 3 5-6"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {analysisProgress < 100 ? "Construindo seu plano..." : "Plano Pronto!"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {analysisProgress < 100 ? "Isso pode levar alguns segundos" : "Redirecionando..."}
            </p>
            <div className="mb-2">
              <span className="text-sm font-bold text-gray-700">Progresso: </span>
              <span className="text-sm font-bold text-emerald-600">{analysisProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>

          <div className="space-y-5 px-2">
            {steps.map((stepItem) => (
              <div key={stepItem.id} className="flex items-center gap-4">
                <div className="bg-white p-1 rounded-full">
                  {analysisProgress >= stepItem.complete ? (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#10B981" />
                      <path
                        d="M8 12l3 3 5-6"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : analysisProgress >= stepItem.start && analysisProgress < stepItem.complete ? (
                    <div
                      className="w-6 h-6 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"
                      style={{ borderWidth: "3px" }}
                    />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-200 rounded-full" />
                  )}
                </div>
                <span
                  className={`text-sm ${analysisProgress >= stepItem.complete
                      ? "font-bold text-emerald-600"
                      : analysisProgress >= stepItem.start && analysisProgress < stepItem.complete
                        ? "font-medium text-gray-800"
                        : "text-gray-400"
                    }`}
                >
                  {stepItem.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return <OfferPage isImageZoomed={isImageZoomed} setIsImageZoomed={setIsImageZoomed} />
}
