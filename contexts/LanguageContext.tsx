"use client";
import { createContext, useContext, useState, useEffect } from "react";

export type Lang = "PT" | "EN";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "PT",
  setLang: () => {},
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("PT");

  // Restaura idioma salvo
  useEffect(() => {
    const saved = localStorage.getItem("odontodata-lang") as Lang | null;
    if (saved === "PT" || saved === "EN") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("odontodata-lang", l);
  };

  const toggle = () => setLang(lang === "PT" ? "EN" : "PT");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
