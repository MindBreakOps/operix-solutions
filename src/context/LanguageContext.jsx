import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default to English, or check local storage if you prefer
  const [lang, setLang] = useState('en');

  // Automatically flip the document direction based on language
  useEffect(() => {
	document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
	document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
	setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  // Select the correct dictionary based on the current language
  const t = lang === 'ar' ? ar : en;
  const isAr = lang === 'ar';

  return (
	<LanguageContext.Provider value={{ lang, toggleLanguage, t, isAr }}>
	  {children}
	</LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);