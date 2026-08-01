"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

const OvenIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 7h2" />
    <path d="M15 7h2" />
    <path d="M9 16c.5-.5 1-1 1.5-1s1 .5 1.5 1 .5 1 1 1 1-.5 1.5-1" />
    <path d="M9 13c.5-.5 1-1 1.5-1s1 .5 1.5 1 .5 1 1 1 1-.5 1.5-1" />
  </svg>
);

const BowlIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11h16a8 8 0 0 1-16 0z" />
    <path d="M12 4v7" />
    <path d="M9 4l3 7" />
    <path d="M15 4l-3 7" />
    <path d="M6 19h12" />
  </svg>
);

const CakeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21H4v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4Z" />
    <path d="M18 15V9a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v6" />
    <path d="M12 4v3" />
    <circle cx="12" cy="3" r="1" fill="currentColor" />
  </svg>
);

const gpuAcceleration = {
  transform: "translateZ(0)",
  backfaceVisibility: "hidden" as const,
  willChange: "transform",
};

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.0 // Wait for preloader to finish
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE HERO SECTION (< 1024px, block lg:hidden)                          */}
      {/* Pixel-perfect match to user screenshot, removes old desktop hero image   */}
      {/* ========================================================================= */}
      <section className="block lg:hidden relative pt-28 sm:pt-32 pb-8 overflow-hidden bg-[#FAF6EB]">
        <div className="relative w-full min-h-[380px] sm:min-h-[440px] flex items-center">
          
          {/* Left Text & Buttons Area */}
          <div className="w-[58%] sm:w-[56%] pl-4 sm:pl-8 pr-1 z-10 flex flex-col justify-center py-2">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#5C4033] mb-2">
              FRESHLY BAKED EVERY MORNING
            </p>
            
            <h1 className="font-serif text-[32px] sm:text-[42px] font-bold leading-[1.05] tracking-tight text-[#3D2612]">
              Where Cravings
            </h1>
            <div className="font-serif text-[32px] sm:text-[42px] font-bold italic text-[#C1A266] leading-[1.05] mb-2.5">
              Meet Magic.
            </div>
            
            {/* Divider with Heart */}
            <div className="flex items-center gap-2 my-2.5">
              <div className="h-[1.5px] w-7 sm:w-10 bg-[#C1A266]/40" />
              <Heart className="w-3 h-3 fill-[#C1A266] text-[#C1A266]" />
              <div className="h-[1.5px] w-7 sm:w-10 bg-[#C1A266]/40" />
            </div>
            
            <p className="font-poppins text-[13px] sm:text-[15px] text-[#5C4033] mb-5 font-normal leading-[1.45]">
              Handcrafted cakes,<br />made with heart.
            </p>
            
            {/* Stacked Pill Buttons */}
            <div className="flex flex-col gap-2.5 w-max">
              <Link 
                href="/shop"
                className="inline-flex items-center justify-between bg-[#4A2E1C] hover:bg-[#3D2612] text-white rounded-full px-5 py-2.5 sm:py-3 text-[13px] sm:text-[14px] font-medium w-[160px] sm:w-[175px] shadow-md transition-all active:scale-95"
              >
                <span>Fresh Bakes</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              
              <Link 
                href="/custom-cake"
                className="inline-flex items-center justify-between bg-[#FAF6EC] hover:bg-[#F3EFE4] text-[#4A2E1C] border border-[#4A2E1C]/30 rounded-full px-5 py-2.5 sm:py-3 text-[13px] sm:text-[14px] font-medium w-[160px] sm:w-[175px] shadow-sm transition-all active:scale-95"
              >
                <span>Custom Orders</span>
                <ShoppingBag className="w-3.5 h-3.5 ml-2" />
              </Link>
            </div>
          </div>

          {/* Right Cake Arch Area (right edge of screen) */}
          <div className="absolute right-0 top-4 bottom-2 sm:top-6 sm:bottom-4 w-[46%] sm:w-[46%] bg-[#EFE8DC] rounded-tl-[140px] rounded-bl-[20px] overflow-hidden flex flex-col justify-end shadow-md border-l border-t border-white/60">
            {/* Decorative Sparkles Top Left of Arch */}
            <div className="absolute top-5 left-5 flex items-center gap-1 text-[#BA9B65]/90">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2v4M6 6l2.8 2.8M2 12h4" />
              </svg>
              <span className="text-[10px]">✦</span>
            </div>
            {/* Decorative Heart & Star Top Right of Arch */}
            <div className="absolute top-5 right-5 flex items-center gap-1 text-[#BA9B65]/90">
              <Heart className="w-4 h-4 fill-transparent stroke-current stroke-[1.8]" />
              <span className="text-[11px]">✦</span>
            </div>
            
            {/* Cake on Wooden Stand Image */}
            <img 
              src="/images/hero_bakery_1783112143212.png" 
              alt="Handcrafted Chocolate Cake"
              className="w-full h-[82%] object-cover object-bottom transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Bottom 4-Item Features Pill Card */}
        <div className="mt-8 mx-4 sm:mx-6 bg-[#FAF7F0] rounded-[24px] p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-[#EBE3D5]">
          <div className="grid grid-cols-4 divide-x divide-[#E6DDD0]">
            
            <div className="flex flex-col items-center justify-center px-1 text-center">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#EFE8DC] flex items-center justify-center mb-1.5 text-[#4A2E1C]">
                <OvenIcon />
              </div>
              <div className="font-fredoka text-[10px] sm:text-[11px] font-semibold text-[#3D2612] leading-tight mb-0.5">
                Freshly Baked Daily
              </div>
              <div className="text-[8px] sm:text-[9.5px] text-[#7A6B5D] leading-tight">
                Made with love
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-1 text-center">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#EFE8DC] flex items-center justify-center mb-1.5 text-[#4A2E1C]">
                <BowlIcon />
              </div>
              <div className="font-fredoka text-[10px] sm:text-[11px] font-semibold text-[#3D2612] leading-tight mb-0.5">
                Premium Ingredients
              </div>
              <div className="text-[8px] sm:text-[9.5px] text-[#7A6B5D] leading-tight">
                Only the best
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-1 text-center">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#EFE8DC] flex items-center justify-center mb-1.5 text-[#4A2E1C]">
                <CakeIcon />
              </div>
              <div className="font-fredoka text-[10px] sm:text-[11px] font-semibold text-[#3D2612] leading-tight mb-0.5">
                Custom Cakes
              </div>
              <div className="text-[8px] sm:text-[9.5px] text-[#7A6B5D] leading-tight">
                For any celebration
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-1 text-center">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#EFE8DC] flex items-center justify-center mb-1.5 text-[#4A2E1C]">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="font-fredoka text-[10px] sm:text-[11px] font-semibold text-[#3D2612] leading-tight mb-0.5">
                Made with Love
              </div>
              <div className="text-[8px] sm:text-[9.5px] text-[#7A6B5D] leading-tight">
                Every single day
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DESKTOP HERO SECTION (hidden lg:flex)                                    */}
      {/* Unchanged & pixel-identical for Desktop Site                              */}
      {/* ========================================================================= */}
      <section ref={containerRef} className="hidden lg:flex relative min-h-[100dvh] items-center pt-36 lg:pt-32 pb-16 lg:pb-4 overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10 w-full mt-4 lg:mt-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
          
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ y: yText, ...gpuAcceleration }}
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
          >
            <motion.p variants={itemVariants} className="text-[13px] font-semibold uppercase tracking-[0.15em] text-primary/80 mb-4">
              FRESHLY BAKED EVERY MORNING
            </motion.p>
            <motion.h1 variants={itemVariants} className="font-fredoka text-[38px] sm:text-[50px] md:text-[72px] lg:text-[80px] font-semibold leading-[1.05] tracking-tight mb-5 text-text-primary">
              Where Cravings<br />
              <span className="text-[#C1A266] italic font-medium text-[34px] sm:text-[42px] md:text-[60px] lg:text-[72px]">Meet Magic.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="font-poppins text-[16px] md:text-[19px] text-text-secondary mb-8 max-w-md mx-auto lg:mx-0 font-normal leading-[1.8]">
              Handcrafted cakes, made with heart.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <MagneticWrapper strength={30}>
                <Link 
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-[17px] md:text-[18px] font-semibold text-white bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto sm:min-w-[200px]"
                >
                  Fresh Bakes <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </MagneticWrapper>
              
              <MagneticWrapper strength={30}>
                <Link 
                  href="/custom-cake"
                  className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-[17px] md:text-[18px] font-semibold text-text-primary bg-transparent border border-primary/40 hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto sm:min-w-[200px]"
                >
                  Custom Orders
                </Link>
              </MagneticWrapper>
            </motion.div>

            {/* Bottom Features */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-primary/20">
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-[15px] md:text-[16px] text-text-primary">Freshly Baked Daily</div>
                <div className="text-[12px] md:text-[13px] text-text-secondary">Made with love</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-[15px] md:text-[16px] text-text-primary">Premium Ingredients</div>
                <div className="text-[12px] md:text-[13px] text-text-secondary">Only the best</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-[15px] md:text-[16px] text-text-primary">Custom Cakes</div>
                <div className="text-[12px] md:text-[13px] text-text-secondary">For any celebration</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-[15px] md:text-[16px] text-text-primary">Made with Love</div>
                <div className="text-[12px] md:text-[13px] text-text-secondary">Every single day</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Editorial Visual Composition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: yImage, ...gpuAcceleration }}
            className="lg:col-span-5 relative mx-auto lg:ml-auto w-full h-[320px] sm:h-[450px] lg:h-[65vh] lg:max-h-[600px] mt-4 lg:mt-0 flex flex-col justify-center"
          >
            {/* Primary Main Arch Image */}
            <div className="absolute top-0 right-0 w-full lg:w-[90%] h-full overflow-hidden rounded-t-[250px] shadow-2xl z-10 border-[4px] border-white/30 bg-white/20 backdrop-blur-sm">
              {/* PENDING REAL PHOTO: Update with actual Cakoo interior or best-looking cake */}
              <motion.img 
                style={{ scale: scaleImage, ...gpuAcceleration }}
                src="/images/cakoo-hero-placeholder.webp" 
                alt="Super Sweet & Bakers Interior" 
                className="w-full h-full object-cover origin-center transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
            </div>
            
            {/* Foreground Croissant & Coffee (Floating Elements - hidden on <1024px for clean mobile view) */}
            <motion.div
              animate={isScrolling ? { y: 0 } : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={gpuAcceleration}
              className="hidden lg:block absolute bottom-4 left-0 w-56 h-36 overflow-hidden rounded-2xl shadow-xl z-20 border-4 border-background bg-secondary/10"
            >
              {/* PENDING REAL PHOTO: Update with actual Cakoo product photo */}
              <img 
                src="/images/cakoo-floating-placeholder.webp" 
                alt="Fresh Bakes" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Floating Menu Card - Glass UI (hidden on <1024px to prevent horizontal overflow) */}
            <motion.div
              animate={isScrolling ? { y: 0 } : { y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={gpuAcceleration}
              className="hidden lg:block absolute top-[15%] -right-[5%] bg-white/40 backdrop-blur-2xl border border-white/40 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-30 w-64"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-fredoka font-semibold text-text-primary text-sm flex items-center gap-2">Fresh Today</p>
                <span className="text-text-secondary opacity-50 text-xs">→</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 overflow-hidden flex-shrink-0 relative">
                    {/* PENDING REAL PHOTO */}
                    <img src="/images/placeholder-custom-cakes.webp" className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Custom Cakes</p>
                    <p className="text-[9px] text-text-secondary">Made to order</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 overflow-hidden flex-shrink-0 relative">
                    {/* PENDING REAL PHOTO */}
                    <img src="/images/placeholder-molten-lava.webp" className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Molten Lava Cake</p>
                    <p className="text-[9px] text-text-secondary">Warm & gooey</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 overflow-hidden flex-shrink-0 relative">
                    {/* PENDING REAL PHOTO */}
                    <img src="/images/placeholder-caramel-pastry.webp" className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Caramel Pastry</p>
                    <p className="text-[9px] text-text-secondary">Fan favorite</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 overflow-hidden flex-shrink-0 relative">
                    {/* PENDING REAL PHOTO */}
                    <img src="/images/placeholder-seasonal-treats.webp" className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Seasonal Treats</p>
                    <p className="text-[9px] text-text-secondary">Ask in-store</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-3 border-t border-border-light text-center">
                <Link href="/shop" className="text-[10px] uppercase tracking-widest font-semibold text-primary hover:text-primary/80">See All Today's Menu →</Link>
              </div>
            </motion.div>

          </motion.div>
          
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={gpuAcceleration}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 hidden md:flex"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-text-primary to-transparent overflow-hidden relative">
          <motion.div 
            animate={{ y: [-20, 64] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={gpuAcceleration}
            className="w-full h-1/3 bg-gold absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
