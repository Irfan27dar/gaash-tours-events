"use client";

import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export function WhatsAppFloat() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Gaash on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lift transition-transform duration-300 ease-smooth hover:-translate-y-0.5"
    >
      <MessageCircle size={20} className="shrink-0" aria-hidden />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[8rem] sm:inline">
        Chat with us
      </span>
    </a>
  );
}
