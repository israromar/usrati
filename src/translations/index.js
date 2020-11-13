import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

import en from './en.json';
import de from './de.json';
import ar from './ar.json';
import fr from './fr.json';
import ru from './ru.json';

const translations = { en, de, ru, ar, fr };
const { languageTag } = RNLocalize.findBestAvailableLanguage(
  Object.keys(translations),
) || { languageTag: 'en' };

i18n.defaultLocale = 'en';
i18n.locale = languageTag;
i18n.fallbacks = true;
i18n.translations = translations;

export default i18n;
