import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/layout/DefaultLayout/DefaultLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, Clock, Shield, ChevronRight, ChevronLeft, Heart } from "lucide-react";
import { useNavigate } from '@tanstack/react-router';
const slides = [
  {
    background: "/background.png",
    title: "Clínica Fénix",
    subtitle: "Cuidando tu salud",
    description: "La mejor atención médica con tecnología de vanguardia",
    icon: Stethoscope
  },
  {
    background: "/background2.png",
    title: "Atención 24/7",
    subtitle: "Siempre disponibles",
    description: "Equipo médico especializado a tu servicio",
    icon: Clock
  },
  {
    background: "/background3.png",
    title: "Tu Seguridad Primero",
    subtitle: "Profesionales certificados",
    description: "Instalaciones modernas y equipo de última generación",
    icon: Shield
  },
  {
    background: "/background4.png",
    title: "Salud y Bienestar",
    subtitle: "Cuidando tu salud",
    description: "Tratamientos personalizados y seguimiento continuo",
    icon: Heart
  }
];

export const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const navigate = useNavigate();
  const nextSlide = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setFadeIn(true);
    }, 500);
  };

  const prevSlide = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setFadeIn(true);
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <DefaultLayout
      title="Clínica Fénix"
      description="Centro médico de excelencia"
    >
      <div className="relative h-screen w-full overflow-hidden bg-gray-900">
        {/* Fondo animado */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `url(${slides[currentSlide].background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'scale(1)' : 'scale(1.1)'
          }}
        >
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-gray-900/60 to-gray-900/80" />
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <div className={`transition-all duration-700 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Icono animado */}
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-blue-500/20 p-6 backdrop-blur-sm">
                <CurrentIcon className="h-12 w-12 text-blue-400" />
              </div>
            </div>

            {/* Textos con animación */}
            <div className="text-center">
              <h2 className="mb-2 text-lg font-medium uppercase tracking-wider text-blue-400">
                {slides[currentSlide].subtitle}
              </h2>
              <h1 className="mb-6 font-serif text-5xl font-bold text-white">
                {slides[currentSlide].title}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Botón de acción */}
            <div className="mt-12 flex justify-center">
              <Button 
                className="group relative bg-blue-600 px-8 py-3 text-lg font-medium text-white hover:bg-blue-700"
                onClick={() => navigate({ to: '/login' })}
              >
                Comenzar
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Indicadores de slides */}
            <div className="mt-12 flex justify-center space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFadeIn(false);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setFadeIn(true);
                    }, 700);
                  }}
                  className={`h-2 w-12 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'bg-blue-500' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Onboarding;