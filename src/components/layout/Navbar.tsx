"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ANNOUNCEMENTS = [
  "Freshly Baked Daily • Open 9AM–11PM",
  "Custom Celebration Cakes • Order 48 Hours in Advance",
  "Free Delivery on Orders Above Rs.3000",
  "Seasonal Collection Available Now"
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Announcement Rotation
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-white/90 text-[10px] sm:text-xs py-2 px-4 md:px-8 flex justify-center items-center w-full font-poppins font-medium tracking-wide overflow-hidden relative h-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={announcementIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute text-center w-full px-2 truncate whitespace-nowrap"
          >
            {ANNOUNCEMENTS[announcementIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-500 w-full relative ${isScrolled ? 'px-4 pt-4 pb-0' : 'px-4 pt-6 pb-8'}`}>
        {/* Subtle Dark Gradient to differentiate from bg */}
        <div className={`hidden md:block absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-transparent pointer-events-none transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100 -z-10'}`} />
        
        <div className={`mx-auto flex items-center justify-between rounded-full px-6 md:px-8 py-3 transition-all duration-500 relative ${
          isScrolled ? 'bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.05)] max-w-7xl' : 'bg-white/50 backdrop-blur-md border border-white/60 shadow-md max-w-[1400px]'
        }`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu (<1024px lg:hidden) */}
        <div className="flex lg:hidden items-center">
          <Sheet>
            <SheetTrigger className="inline-flex shrink-0 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground w-11 h-11" aria-label="Menu">
                <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-white w-[280px] sm:w-[320px] p-6 flex flex-col justify-between">
              <div>
                <Link href="/" className="inline-block mb-6">
                  <span className="font-fredoka text-2xl font-bold tracking-tight text-yellow-400">
                    SUPER
                  </span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  <Link href="/" className="text-lg font-medium text-text-primary hover:text-primary py-1">Home</Link>
                  <div>
                    <button
                      type="button"
                      onClick={() => setShopOpen(!shopOpen)}
                      className="flex items-center justify-between w-full text-left text-lg font-medium text-text-primary hover:text-primary py-1"
                    >
                      <span>Shop All</span>
                      <span className={`transition-transform duration-200 text-sm ${shopOpen ? "rotate-180" : ""}`}>▼</span>
                    </button>
                    {shopOpen && (
                      <div className="flex flex-col space-y-2 border-l-2 border-gold/40 pl-3 py-2 mt-1">
                        <Link href="/shop" className="text-sm text-text-primary hover:text-primary font-medium">All Products</Link>
                        <Link href="/shop?category=bakery" className="text-sm text-muted-foreground hover:text-primary">Bakery Items & Desserts</Link>
                        <Link href="/shop?category=cakes" className="text-sm text-muted-foreground hover:text-primary">Custom Cakes World</Link>
                        <Link href="/shop?category=brownies" className="text-sm text-muted-foreground hover:text-primary">Brownies & Treats</Link>
                      </div>
                    )}
                  </div>
                  <Link href="/celebrations" className="text-lg font-medium text-text-primary hover:text-primary py-1">Celebrations</Link>
                  <Link href="/gallery" className="text-lg font-medium text-text-primary hover:text-primary py-1">Gallery</Link>
                  <div>
                    <button
                      type="button"
                      onClick={() => setAboutOpen(!aboutOpen)}
                      className="flex items-center justify-between w-full text-left text-lg font-medium text-text-primary hover:text-primary py-1"
                    >
                      <span>About Us</span>
                      <span className={`transition-transform duration-200 text-sm ${aboutOpen ? "rotate-180" : ""}`}>▼</span>
                    </button>
                    {aboutOpen && (
                      <div className="flex flex-col space-y-2 border-l-2 border-gold/40 pl-3 py-2 mt-1">
                        <Link href="/about" className="text-sm text-text-primary hover:text-primary font-medium">Our Story</Link>
                        <Link href="/about#standard" className="text-sm text-muted-foreground hover:text-primary">Our Standard & Quality</Link>
                      </div>
                    )}
                  </div>
                  <Link href="/visit" className="text-lg font-medium text-text-primary hover:text-primary py-1">Visit</Link>
                </nav>
              </div>
              <div className="pt-6 border-t border-border-light">
                <Link href="https://wa.me/923325064607?text=Hi!%20I'd%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-3.5 rounded-full text-[15px] font-medium transition-all shadow-md w-full min-h-[44px]">
                  Order on WhatsApp <span className="text-white/80">→</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation (lg:flex, pixel-identical to desktop) */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/shop" className="text-[16px] md:text-[17px] font-medium text-text-primary/90 hover:text-primary transition-colors relative group">
            Shop <span className="inline-block ml-0.5 opacity-50 text-[10px]">v</span>
          </Link>
          <Link href="/celebrations" className="text-[16px] md:text-[17px] font-medium text-text-primary/90 hover:text-primary transition-colors relative group">
            Celebrations
          </Link>
          <Link href="/gallery" className="text-[16px] md:text-[17px] font-medium text-text-primary/90 hover:text-primary transition-colors relative group">
            Gallery
          </Link>
          <Link href="/about" className="text-[16px] md:text-[17px] font-medium text-text-primary/90 hover:text-primary transition-colors relative group">
            About <span className="inline-block ml-0.5 opacity-50 text-[10px]">v</span>
          </Link>
          <Link href="/visit" className="text-[16px] md:text-[17px] font-medium text-text-primary/90 hover:text-primary transition-colors relative group">
            Visit
          </Link>
        </nav>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center group flex flex-col items-center p-2 md:p-3 max-lg:static max-lg:translate-x-0 max-lg:translate-y-0 max-lg:flex-1 max-lg:text-center max-lg:left-auto max-lg:top-auto">
          <span className="font-fredoka text-2xl md:text-3xl font-bold tracking-tight text-yellow-400 group-hover:opacity-90 transition-opacity">
            SUPER
          </span>
        </Link>

        {/* Actions - all icons visible on mobile and desktop with >=44px touch targets */}
        <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-3">
          <Link href="/shop" className="inline-flex shrink-0 items-center justify-center rounded-full hover:bg-cream/20 hover:text-primary transition-colors text-text-primary w-11 h-11" aria-label="Search">
            <Search className="w-[18px] h-[18px]" />
          </Link>
          <Link href="/wishlist" className="relative inline-flex shrink-0 items-center justify-center rounded-full hover:bg-cream/20 hover:text-primary transition-colors text-text-primary w-11 h-11" aria-label="Wishlist">
            <Heart className="w-[18px] h-[18px]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-destructive text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative inline-flex shrink-0 items-center justify-center rounded-full hover:bg-cream/20 hover:text-primary transition-colors text-text-primary w-11 h-11" aria-label="Cart">
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-primary text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
          </Link>
          <Link href="https://wa.me/923325064607?text=Hi!%20I'd%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-[15px] font-medium transition-all duration-300 shadow-md">
            Order Now <span className="text-white/80">→</span>
          </Link>
        </div>
        </div>
      </div>
      </div>
    </header>
  );
}
