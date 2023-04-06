import React, { createContext, useState, useContext } from 'react';
import i18n from '../constants/localization';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  children?: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType>({
  language: i18n.locale,
  setLanguage: () => {},
});

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider: React.FC<LanguageContextType> = ({ children }) => {
  const [language, setLanguage] = useState(i18n.locale);

  const updateLanguage = (newLanguage: string) => {
    i18n.locale = newLanguage;
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
