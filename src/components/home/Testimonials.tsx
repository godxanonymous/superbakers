"use client";

import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";
import CircularGallery from "@/components/ui/CircularGallery";

const testimonials = [
  {
    name: "Ayesha K.",
    role: "Regular Customer",
    content: "The Lotus Biscoff cake from Super Sweet & Bakers is literally the best cake I've had in Wah Cantt. It looks so premium and tastes even better. Their packaging is gorgeous too!",
    rating: 5,
  },
  {
    name: "Usman A.",
    role: "Event Planner",
    content: "I always recommend Super Sweet & Bakers to my clients for their weddings. The custom cakes are a work of art, and they are incredibly professional to work with.",
    rating: 5,
  },
  {
    name: "Fatima M.",
    role: "Birthday Celebration",
    content: "Ordered the Ferrero Rocher cake for my husband's birthday. Not only did it look absolutely stunning, but the taste was out of this world. Highly recommend!",
    rating: 5,
  },
  {
    name: "Zainab R.",
    role: "Dessert Lover",
    content: "Their brownies and premium dessert boxes are my go-to gift for any occasion. Always fresh, perfectly sweet, and visually so pleasing.",
    rating: 5,
  },
];

const galleryReviewItems = [
  { image: "/images/prod_lotus_biscoff_1783112213131.png", text: "Ayesha K. ★★★★★" },
  { image: "/images/prod_ferrero_rocher_1783112221919.png", text: "Usman A. - Best in Wah Cantt!" },
  { image: "/images/prod_choc_truffle_1783112196918.png", text: "Fatima M. ★★★★★" },
  { image: "/images/prod_red_velvet_1783112239348.png", text: "Zainab R. - Perfectly Sweet" },
  { image: "/images/prod_pistachio_dream_1783112230661.png", text: "Hamza T. - Work of Art" },
  { image: "/images/prod_strawberry_cheesecake_1783112291552.png", text: "Sara R. - Stunning Quality" },
  { image: "/images/prod_bento_cake_1783112265061.png", text: "Bilal A. ★★★★★" },
  { image: "/images/prod_gold_leaf_1783112275495.png", text: "Mahnoor A. - Highly Recommend" },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <Quote className="w-12 h-12 text-gold/40 mb-4" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-fredoka text-[40px] md:text-[50px] font-semibold mb-3 text-text-primary"
          >
            Sweet Words from Sweet People
          </motion.h2>
          <p className="text-[16px] md:text-[19px] font-normal leading-[1.8] text-text-secondary max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-gold inline" />
            Interactive 3D Customer Favorites & Reviews — Drag or Scroll to Explore!
            <Sparkles className="w-4 h-4 text-gold inline" />
          </p>
        </div>

        {/* 3D WebGL CircularGallery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-[520px] relative mb-16 rounded-3xl"
        >
          <CircularGallery
            items={galleryReviewItems}
            bend={3}
            textColor="#2d2d2d"
            borderRadius={0.06}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </motion.div>

        {/* Detailed Reviews Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-border-light flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-[16px] md:text-[18px] font-normal leading-[1.8] text-text-primary italic mb-6">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="font-poppins font-semibold text-[17px] text-text-primary">{testimonial.name}</p>
                  <p className="text-[14px] text-text-secondary">{testimonial.role}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold/10 text-gold-dark">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
