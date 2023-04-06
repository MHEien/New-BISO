import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import nb from '../i18n/nb.json';
import en from '../i18n/en.json';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en: en,
    nb: nb,
});

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode;

export default i18n;