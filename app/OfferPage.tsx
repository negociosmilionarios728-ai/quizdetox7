"use client"

import { useState, useEffect } from "react"
import { playClickSound } from "@/lib/audio"

interface OfferPageProps {
  isImageZoomed: boolean
  setIsImageZoomed: (value: boolean) => void
}

export function OfferPage({ isImageZoomed, setIsImageZoomed }: OfferPageProps) {
  const [isTestimonialsZoomed, setIsTestimonialsZoomed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto px-4 py-8 bg-[#F3F4F6]">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Aplicativo <span className="text-teal-600">Detox7 PRO</span>
        </h1>
      </div>

      {/* Benefits List */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-gray-700">Tarefas diárias no aplicativo</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-gray-700">Receitas detox e emagrecimento</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-gray-700">Análise de calorias</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-teal-600 font-semibold">
            Bônus: Ebook 70 Receitas receitas saudáveis para revigorar o corpo
          </span>
        </div>
      </div>

      {/* Video */}
      <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border-2 border-teal-500/20">
        <video className="w-full h-auto" controls>
          <source src="/videoapp.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Pricing Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center relative">
        <div className="mb-6">
          <p className="text-gray-500 text-sm font-semibold mb-2">VALOR VITALÍCIO</p>
          <p className="text-3xl font-bold text-red-500 line-through">R$ 197,00</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-sm font-semibold mb-3">OFERTA ESPECIAL</p>
          <div className="flex items-baseline gap-2 mb-1 justify-center">
            <span className="text-4xl font-bold text-teal-600">R$ 37,00</span>
          </div>
          <p className="text-gray-600 text-sm">à vista</p>
        </div>

        <div className="relative bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2 justify-center">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z" />
            </svg>
            <p className="text-gray-800 font-semibold">Esta oferta expira em:</p>
          </div>
          <p className="text-3xl font-bold text-orange-600 font-mono tracking-wider">{formatTime(timeLeft)}</p>
        </div>

        <div className="absolute top-4 right-4 bg-red-500 rounded-full w-24 h-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white font-bold text-xs">DESCONTO</p>
            <p className="text-white font-bold text-lg">76%</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-700 justify-center">
            <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S17.52 1 12 1zm-2 16l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z" />
            </svg>
            <span>Pagamento 100% Seguro</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 justify-center">
            <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S17.52 1 12 1zm-2 16l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z" />
            </svg>
            <span>Garantia de 7 dias</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 justify-center">
            <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <span>Acesso imediato no celular</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          playClickSound();
          window.top!.location.href = "https://zuckpay.com.br/checkout/aplicativo-detox7-pro";
        }}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-full text-lg transition-colors mb-8 text-center block"
      >
        Liberar Meu Acesso Agora
      </button>

      {/* Testimonials Section */}
      <div className="cursor-pointer" onClick={() => setIsTestimonialsZoomed(true)}>
        <img
          src="/images/a-20parte-20de-20mente-20e-20corpo-20juntas-20fez-20sentido-20pra-20mim.jpg"
          alt="Depoimentos de clientes sobre o Detox7 PRO"
          className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        />
      </div>

      {/* Testimonials Zoom Modal */}
      {isTestimonialsZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsTestimonialsZoomed(false)}
              className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <img
              src="/images/a-20parte-20de-20mente-20e-20corpo-20juntas-20fez-20sentido-20pra-20mim.jpg"
              alt="Depoimentos de clientes"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
