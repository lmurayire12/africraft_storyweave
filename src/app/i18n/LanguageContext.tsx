import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Language, translations } from "./translations";

const LANGUAGE_STORAGE_KEY = "africraft_language";

function getInitialLanguage(): Language {
  const saved = window.sessionStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved === "en" || saved === "rw" || saved === "fr") {
    return saved;
  }
  return "en";
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof (typeof translations)["en"]) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.sessionStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t: (key) => translations[language][key],
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
