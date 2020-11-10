import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

import en from './en.json';
import de from './de.json';
import ar from './ar.json';
import fr from './fr.json';
import ru from './ru.json';

const translations = { en, de, ru, ar, fr };
// RNLocalize.ch
const { languageTag } = RNLocalize.findBestAvailableLanguage(
  Object.keys(translations),
) || { languageTag: 'en' };

i18n.defaultLocale = 'en';
// i18n.locale = languageTag;
// i18n.locale = 'en';
i18n.fallbacks = true;
i18n.translations = translations;

export default i18n;

// import LocalizedStrings from 'react-native-localization';
// import english from './en';
// import spanish from './es';

// export const strings = new LocalizedStrings({
//   en: english,
//   es: spanish,
// });
