const site = {
  name: 'Smokweed Marseille',
  logoName: 'Smokweed Marseille',
  telegramLink: window.SITE_CONFIG && window.SITE_CONFIG.telegramLink || 'https://t.me/+RD5taYiIM3M2YmU5',
  whatsappLink: window.SITE_CONFIG && window.SITE_CONFIG.whatsappLink || ''
};

const LANGUAGE_STORAGE_KEY = 'soeinternational.language';
let currentLanguage = 'fr';

const translations = {
  fr: {
    'common.banner': '<strong>Smokweed Marseille · 2026.</strong>',
    'ageGate.tag': 'Accès réservé aux adultes',
    'ageGate.title': 'Avez-vous 18 ans ou plus ?',
    'ageGate.description': 'Ce site contient des informations sur le cannabis et d’autres substances. Confirmez votre âge pour continuer.',
    'ageGate.yes': 'Oui, j’ai 18 ans ou plus',
    'ageGate.no': 'Non',
    'ageGate.denied': 'Accès refusé. Ce site est réservé aux personnes âgées de 18 ans ou plus.',
    'common.primaryNav': 'Navigation principale',
    'common.languageSwitcher': 'Choix de la langue',
    'common.legal': 'Informations légales',
    'common.privacy': 'Politique de confidentialité',
    'common.imprint': 'Mentions légales',
    'common.terms': 'Conditions d’utilisation',
    'common.copyright': '© 2026 Smokweed Marseille. Tous droits réservés.',
    'meta.title': 'weed, coke Marseille : vos approche nos solution /Smokweed Marseille',
    'meta.description': 'Nous vous connectons à la communauté Telegram de Smokweed Marseille la plus fiable au monde. Que vous soyez résident ou visiteur, notre plateforme ; aucune vente ni mise en relation.',
    'meta.imageAlt': 'Smokweed Marseille : vente & livraison',
    'meta.locale': 'fr_FR',
    'marseille.text': 'Vous cherchez des informations sur le cannabis ou la cocaïne à Marseille ? Smokweed Marseille explique les effets possibles, les risques pour la santé et les principes de réduction des risques. Ce contenu éducatif s’adresse aux adultes de Marseille et de ses environs ; il ne s’agit ni d’un commerce ni d’un service de conseil local. Aucun produit n’est vendu ou mis en relation.',
    'marseille.buyTitle': 'Règles officielles et sécurité',
    'marseille.buyText': 'Consultez les sources officielles pour connaître les règles en vigueur. Ne conduisez pas après consommation et évitez les mélanges de substances.',
    'marseille.help': 'En Allemagne, les règles relatives au cannabis et à la conduite sont spécifiques et peuvent évoluer. Ne conduisez pas si vos capacités sont altérées ; évitez notamment le mélange cannabis-alcool. Vérifiez les règles actuelles auprès des autorités. En cas d’urgence médicale, appelez le 112.',
    'marseille.source': 'Informations officielles sur la loi allemande sur le cannabis →',
    'marseille.support': 'Conseil en ligne sur les addictions, gratuit et confidentiel →',
    'contact.tag': 'Contact',
    'contact.title': 'Pour plus de détails, contactez-nous',
    'contact.text': 'Écrivez-nous sur Telegram ou WhatsApp.',
    'contact.telegram': 'Nous contacter sur Telegram →',
    'contact.whatsapp': 'Nous contacter sur WhatsApp →',
    'contact.whatsappPending': 'WhatsApp : lien à confirmer.',
    'links.title': 'Redirection vers Smokweed Marseille',
    'links.redirecting': 'Redirection vers le site…',
    'admin.metaTitle': 'Administration | Smokweed Marseille',
    'admin.metaDescription': 'Administration des liens de contact de Smokweed Marseille.',
    'admin.navHome': 'Accueil',
    'admin.navLinks': 'Telegram + WhatsApp',
    'admin.section': 'Paramètres protégés',
    'admin.editTitle': 'Gérer les liens de contact',
    'admin.editDescription': 'Connectez-vous pour modifier les liens publics de contact.',
    'admin.passwordLabel': 'Mot de passe administrateur',
    'admin.login': 'Se connecter',
    'admin.telegramLabel': 'Lien Telegram',
    'admin.whatsappLabel': 'Lien WhatsApp (facultatif)',
    'admin.linkHelp': 'Utilisez des liens HTTPS publics vers Telegram ou WhatsApp.',
    'admin.save': 'Enregistrer les liens',
    'admin.logout': 'Se déconnecter',
    'admin.loginFailed': 'Connexion refusée. Vérifiez le mot de passe ou réessayez plus tard.',
    'admin.sessionExpired': 'Votre session a expiré. Reconnectez-vous.',
    'admin.loadError': 'Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.',
    'admin.saveSuccess': 'Liens enregistrés.',
    'admin.saveError': 'Impossible d’enregistrer les liens. Vérifiez les URL saisies.',
    'admin.storageError': 'Le stockage des liens est indisponible. Vérifiez la configuration Supabase dans Render.',
    'admin.logoutError': 'Impossible de fermer la session. Réessayez.',
    'admin.logoutSuccess': 'Déconnexion effectuée.',
    'admin.returnClient': 'Retour au site',
    'admin.footerTagline': 'Un guide indépendant sur l’information, la santé et la réduction des risques.',
    'admin.disclaimerTitle': 'Avertissement',
    'admin.disclaimer': '<strong>Vente & livraion .</strong>es risques et la réduction des risqes. Réservé aux adultes de 18 ans et plus.',
    'nav.access': 'Telegram + WhatsApp',
    'nav.laws': 'Lois',
    'nav.culture': 'Règles & sécurité à Marseille',
    'hero.eyebrow': 'Informations et sécurité',
    'hero.title': 'weed, coke Marseille : vos approche nos solution',
    'hero.lead': 'Nous vous connectons à la communauté Telegram de Smokweed Marseille la plus fiable au monde. Que vous soyez résident ou visiteur, notre plateforme',
    'hero.imageAlt': 'Intérieur d’une boutique spécialisée dans le cannabis',
    'advice.tag': 'achat utiles à Marseille',
    'advice.title': 'weed, coke Marseille : vos approche nos solution',
    'hero.btnAccess': 'Telegram + WhatsApp',
    'hero.btnLaws': 'Lois →',
    'access.tag': 'Contact & information',
    'access.title': 'Comment nous contacter',
    'access.subtitle': 'Pour une question générale sur les informations présentées sur Smokweed Marseille.',
    'contact.step1Title': 'Choisissez un canal',
    'contact.step1Text': 'Ouvrez notre espace Telegram ou utilisez WhatsApp si son lien est disponible.',
    'contact.step2Title': 'Posez votre question',
    'contact.step2Text': 'Précisez votre question.',
    'access.telegramLabel': 'Telegram',
    'access.telegramText': 'Pour consulter notre espace et poser une question générale sur les informations du site.',
    'access.telegramBtn': 'Ouvrir Telegram',
    'access.whatsappLabel': 'WhatsApp',
    'access.whatsappText': 'Le lien WhatsApp sera affiché ici dès qu’il sera confirmé.',
    'access.whatsappBtn': 'Ouvrir WhatsApp',
    'laws.tag': 'Conseils & lois',
    'laws.title': 'Cannabis à Marseille : effets, risques et cadre légal',
    'laws.meta': 'Par l’équipe Smokweed Marseille · Mis à jour juin 2026 · 5 min de lecture',
    'laws.intro': 'Le cannabis et la cocaïne sont des substances très différentes. Connaître leurs effets, leurs risques pour la santé et leur cadre légal permet de mieux évaluer les dangers et de prendre des décisions plus responsables.',
    'laws.h3_1': '1. Cannabis : effets et risques',
    'laws.p_1': 'Le cannabis peut modifier la perception, l’humeur, l’appétit et le temps de réaction. Les effets varient selon la souche, la dose et la tolérance individuelle.',
    'laws.li_1': 'Les effets courants incluent relaxation, rire, perception modifiée et appétit accru.',
    'laws.li_2': 'Les risques incluent anxiété, paranoïa, coordination réduite et temps de réaction plus lent.',
    'laws.li_3': 'Une consommation régulière peut affecter mémoire, motivation et clarté mentale.',
    'laws.h3_2': '2. Cocaïne à Marseille : effet rapide et risque élevé',
    'laws.p_2': 'La cocaïne est un stimulant qui peut provoquer un pic d’énergie, de vigilance et de confiance. L’inconvénient est l’augmentation rapide du rythme cardiaque et de la pression artérielle.',
    'laws.li_4': 'Les effets à court terme peuvent inclure euphorie, concentration, agitation et baisse de l’appétit.',
    'laws.li_5': 'Les risques incluent panique, douleurs thoraciques, tension cardiaque, agitation et troubles du sommeil.',
    'laws.li_6': 'Une consommation répétée peut rapidement mener à dépendance et à des problèmes de santé mentale.',
    'laws.infoTitle': 'Approche à moindre risque',
    'laws.infoText': '<strong>L’éducation compte.</strong> Évitez les mélanges de substances, n’achetez jamais à des sources non vérifiées et méfiez-vous des dosages inconnus. Le choix le plus sûr reste l’absence de consommation, mais si vous consommez, les habitudes de réduction des risques sont essentielles.',
    'culture.title': 'Règles & sécurité à Marseille',
    'culture.subtitle': 'Repères simples pour vérifier les règles et protéger votre santé.',
    'legalAccess.text': 'Pour le cannabis, vérifiez les règles officielles en vigueur et n’utilisez que les voies autorisées par la loi.',
    'faq.q1': 'Quels sont les principaux risques du cannabis ?',
    'faq.a1': 'Les principaux risques incluent conduite altérée, paranoïa, confusion mentale et dépendance à forte consommation. Ces risques augmentent avec la dose, la pureté et les mélanges avec alcool ou autres drogues.',
    'faq.q2': 'Quels sont les principaux risques de la cocaïne ?',
    'faq.a2': 'La cocaïne peut faire monter fortement le rythme cardiaque et la pression artérielle, provoquer paranoïa, crise de panique et insomnie, et entraîner des comportements dangereux en mélange avec alcool ou stimulants.',
    'safety.title': 'Sécurité & réduction des risques',
    'safety.item1Strong': 'Ne mélangez pas les substances :',
    'safety.item1Text': 'Stimulants et dépresseurs ensemble augmentent fortement les risques.',
    'safety.item2Strong': 'Hydratez-vous et reposez-vous :',
    'safety.item2Text': 'La déshydratation et le manque de sommeil sont fréquents après une forte consommation.',
    'safety.item3Strong': 'Connaissez vos limites :',
    'safety.item3Text': 'Une dose forte ou un produit inconnu peut provoquer peur, confusion ou décisions dangereuses.',
    'safety.item4Strong': 'Grossesse et allaitement :',
    'safety.item4Text': 'Le CDC conseille d’éviter le cannabis pendant la grossesse et l’allaitement.',
    'safety.item4Source': 'Source CDC',
    'footer.tagline': 'Une ressource indépendante de Smokweed Marseille sur la santé, les conseils et la réduction des risques.',
  },
  // Each translation must be one 'key': 'value' pair; a second key and colon inside the value break JavaScript syntax.
  en: {
    'common.banner': '<strong>Smokweed Marseille · 2026.</strong>',
    'ageGate.tag': 'Adults only',
    'ageGate.title': 'Are you 18 or older?',
    'ageGate.description': 'This website contains information about cannabis and other substances. Confirm your age to continue.',
    'ageGate.yes': 'Yes, I am 18 or older',
    'ageGate.no': 'No',
    'ageGate.denied': 'Access denied. This website is for people aged 18 or older.',
    'common.primaryNav': 'Main navigation',
    'common.languageSwitcher': 'Language selector',
    'common.legal': 'Legal',
    'common.privacy': 'Privacy Policy',
    'common.imprint': 'Imprint',
    'common.terms': 'Terms of Use',
    'common.copyright': '© 2026 Smokweed Marseille. All rights reserved.',
    'meta.title': 'Cannabis and cocaine in Marseille: general information | Smokweed Marseille',
    'meta.description': 'We connect you to the world/smost reliable Smokweed Marseille Telegram community. Whether youre a resident or a visitor, our platform provides educational resources about cannabis and other substances.',
    'meta.imageAlt': 'Smokweed Marseille: purchase & delivery',
    'meta.locale': 'en_US',
    'marseille.text': 'Looking for information about cannabis or cocaine in Marseille? Smokweed Marseille explains possible effects, health risks and harm-reduction basics. This educational guide is also for adults in Marseille and the surrounding area; it is not a shop or a local counselling service. No products are sold or brokered.',
    'marseille.buyTitle': 'Official rules and safety',
    'marseille.buyText': 'Check official sources for current rules. Do not drive after using substances and avoid mixing them.',
    'marseille.help': 'Germany has specific rules on cannabis and driving, and regulations can change. Do not drive if your ability is impaired, and especially avoid combining cannabis and alcohol. Check current requirements with official authorities. For a medical emergency, call 112.',
    'marseille.source': 'Official information on Germany’s cannabis law →',
    'marseille.support': 'Free, confidential online addiction counselling →',
    'contact.tag': 'Contact',
    'contact.title': 'Contact us for more details',
    'contact.text': 'Message us on Telegram or WhatsApp.',
    'contact.telegram': 'Contact us on Telegram →',
    'contact.whatsapp': 'Contact us on WhatsApp →',
    'contact.whatsappPending': 'WhatsApp: link to be confirmed.',
    'links.title': 'Redirecting to Smokweed Marseille',
    'links.redirecting': 'Redirecting to the website…',
    'admin.metaTitle': 'Admin | Smokweed Marseille',
    'admin.metaDescription': 'Manage Smokweed Marseille contact links.',
    'admin.navHome': 'Home',
    'admin.navLinks': 'Telegram + WhatsApp',
    'admin.section': 'Protected settings',
    'admin.editTitle': 'Manage contact links',
    'admin.editDescription': 'Sign in to update the public contact links.',
    'admin.passwordLabel': 'Admin password',
    'admin.login': 'Sign in',
    'admin.telegramLabel': 'Telegram link',
    'admin.whatsappLabel': 'WhatsApp link (optional)',
    'admin.linkHelp': 'Use public HTTPS links for Telegram or WhatsApp.',
    'admin.save': 'Save links',
    'admin.logout': 'Sign out',
    'admin.loginFailed': 'Sign-in failed. Check the password or try again later.',
    'admin.sessionExpired': 'Your session expired. Please sign in again.',
    'admin.loadError': 'Could not reach the server. Check your connection and try again.',
    'admin.saveSuccess': 'Links saved.',
    'admin.saveError': 'Could not save the links. Check the URLs you entered.',
    'admin.storageError': 'Link storage is unavailable. Check the Supabase settings in Render.',
    'admin.logoutError': 'Could not sign out. Please try again.',
    'admin.logoutSuccess': 'You have signed out.',
    'admin.returnClient': 'Back to site',
    'admin.footerTagline': 'An independent guide to information, health, and harm reduction.',
    'admin.disclaimerTitle': 'Disclaimer',
    'admin.disclaimer': '<strong>purchase & delivery.</strong> This website provides smokweed marseille. For adults aged 18 and over only.',
    'nav.access': 'Telegram + WhatsApp',
    'nav.laws': 'Laws',
    'nav.culture': 'Rules & Safety in Marseille',
    'hero.eyebrow': 'Information & safety',
    'hero.title': 'Cannabis and cocaine in Marseille: general information',
    'hero.lead': 'We connect you to the worlds most reliable Smokweed Marseille Telegram community. Whether youre a resident or a visitor, our platform',
    'hero.imageAlt': 'Interior of a cannabis specialty shop',
    'advice.tag': 'Information for Marseille',
    'advice.title': 'Cannabis and cocaine in Marseille: effects, risks and health',
    'hero.btnAccess': 'Open Telegram + WhatsApp',
    'hero.btnLaws': 'Read Laws →',
    'access.tag': 'Contact & information',
    'access.title': 'How to contact us',
    'access.subtitle': 'For general questions about information presented on Smokweed Marseille.',
    'contact.step1Title': 'Choose a channel',
    'contact.step1Text': 'Open our Telegram space or use WhatsApp when its link is available.',
    'contact.step2Title': 'Ask your question',
    'contact.step2Text': 'Tell us what you would like to know.',
    'access.telegramLabel': 'Telegram',
    'access.telegramText': 'Visit our space and ask a general question about information on the website.',
    'access.telegramBtn': 'Open Telegram',
    'access.whatsappLabel': 'WhatsApp',
    'access.whatsappText': 'The WhatsApp link will appear here once it has been confirmed.',
    'access.whatsappBtn': 'Open WhatsApp',
    'laws.tag': 'Advice & laws',
    'laws.title': 'Cannabis in Marseille: effects, risks, and legal context',
    'laws.meta': 'By the Smokweed Marseille team · Updated June 2026 · 5 min read',
    'laws.intro': 'Cannabis and cocaine are very different substances. Understanding their effects, health risks, and legal context helps reduce harm and support more responsible choices.',
    'laws.h3_1': '1. Cannabis: effects and risks',
    'laws.p_1': 'Cannabis can change perception, mood, appetite, and reaction time. Effects vary depending on the strain, dosage, and individual tolerance.',
    'laws.li_1': 'Common effects include relaxation, laughter, altered perception, and increased appetite.',
    'laws.li_2': 'Risks include anxiety, paranoia, impaired coordination, and slower reaction time.',
    'laws.li_3': 'Regular use may affect memory, motivation, and mental clarity over time.',
    'laws.h3_2': '2. Cocaine in Marseille: rapid effect, high risk',
    'laws.p_2': 'Cocaine is a stimulant that can create a brief boost of alertness, confidence, and energy. The downside is rapid escalation in heart rate and blood pressure.',
    'laws.li_4': 'Short-term effects can include euphoria, focus, restlessness, and reduced appetite.',
    'laws.li_5': 'Risks include panic, chest pain, elevated heart strain, agitation, and sleep disruption.',
    'laws.li_6': 'Repeated use can quickly lead to dependence and mental health issues.',
    'laws.infoTitle': 'Lower-risk approach',
    'laws.infoText': '<strong>Education matters.</strong> Avoid mixing substances, never buy from unverified sources, and be cautious with unknown purity or dosage. The safest choice is not using at all, but if you do, harm-reduction habits are essential.',
    'culture.title': 'Rules & Safety in Marseille',
    'culture.subtitle': 'Quick guidance on current rules and protecting your health.',
    'legalAccess.text': 'For cannabis, check the current official rules and use only channels permitted by law.',
    'faq.q1': 'What are the main risks of cannabis?',
    'faq.a1': 'The main risks include impaired driving, paranoia, mental fog, and dependence with regular heavy use. These risks increase with dose, purity, and mixing with alcohol or other drugs.',
    'faq.q2': 'What are the main risks of cocaine?',
    'faq.a2': 'Cocaine can sharply increase heart rate and blood pressure, cause paranoia, panic attacks, and insomnia, and lead to unsafe decisions when combined with alcohol or stimulants.',
    'safety.title': 'Safety & Harm Reduction',
    'safety.item1Strong': 'Don’t mix substances:',
    'safety.item1Text': 'Stimulants and depressants together raise risk dramatically.',
    'safety.item2Strong': 'Hydrate and rest:',
    'safety.item2Text': 'Dehydration and poor sleep are common after heavy use.',
    'safety.item3Strong': 'Know your limits:',
    'safety.item3Text': 'A strong dose or unfamiliar product can trigger panic, confusion, or unsafe decisions.',
    'safety.item4Strong': 'Pregnancy and breastfeeding:',
    'safety.item4Text': 'The CDC advises avoiding cannabis during pregnancy and breastfeeding.',
    'safety.item4Source': 'CDC source',
    'footer.tagline': 'An independent Smokweed Marseille resource focused on health and harm reduction.',
  }
};

const applyTranslations = (lang) => {
  currentLanguage = translations[lang] ? lang : 'fr';
  const dictionary = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const value = dictionary[key] || key.split('.').reduce((accumulator, part) => accumulator && accumulator[part], dictionary);
    if (typeof value === 'string') {
      element.innerHTML = value;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const value = dictionary[element.dataset.i18nPlaceholder];
    if (typeof value === 'string') element.setAttribute('placeholder', value);
  });

  document.querySelectorAll('[data-i18n-content]').forEach((element) => {
    const value = dictionary[element.dataset.i18nContent];
    if (typeof value === 'string') element.setAttribute('content', value);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    const value = dictionary[element.dataset.i18nAriaLabel];
    if (typeof value === 'string') element.setAttribute('aria-label', value);
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    const value = dictionary[element.dataset.i18nAlt];
    if (typeof value === 'string') element.setAttribute('alt', value);
  });

  if (/^https?:$/.test(window.location.protocol) && document.querySelector('.hero-inner')) {
    const homeUrl = new URL('.', window.location.href);
    const languageUrls = {
      fr: homeUrl.href,
      en: new URL('?lang=en', homeUrl).href
    };
    const canonicalUrl = languageUrls[currentLanguage];
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.append(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    Object.entries({ fr: 'fr', en: 'en', 'x-default': 'fr' }).forEach(([locale, language]) => {
      let alternateLink = document.querySelector(`link[rel="alternate"][hreflang="${locale}"]`);
      if (!alternateLink) {
        alternateLink = document.createElement('link');
        alternateLink.rel = 'alternate';
        alternateLink.hreflang = locale;
        document.head.append(alternateLink);
      }
      alternateLink.href = languageUrls[language];
    });
  }

  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === currentLanguage);
  });
};

const loadPreferredLanguage = () => {
  const urlLanguage = new URLSearchParams(window.location.search).get('lang');
  if (translations[urlLanguage]) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, urlLanguage);
    } catch {
      // The URL still selects the requested language when storage is unavailable.
    }
    return urlLanguage;
  }

  try {
    const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return translations[lang] ? lang : 'fr';
  } catch {
    return 'fr';
  }
};

const languageButtons = document.querySelectorAll('.lang-btn');
languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const lang = button.dataset.lang;
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Keep the current page language if storage is unavailable.
    }
    if (window.location.protocol !== 'file:') {
      const url = new URL(window.location.href);
      if (lang === 'fr') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', lang);
      }
      window.history.replaceState(window.history.state, '', url);
    }
    applyTranslations(lang);
  });
});
applyTranslations(loadPreferredLanguage());

const adminLoginForm = document.getElementById('adminLoginForm');
const adminLinksForm = document.getElementById('adminLinksForm');
const adminStatus = document.getElementById('adminStatus');

if (adminLoginForm && adminLinksForm && adminStatus) {
  const passwordInput = document.getElementById('adminPassword');
  const telegramInput = document.getElementById('adminTelegramLink');
  const whatsappInput = document.getElementById('adminWhatsappLink');
  const setAdminStatus = (message, state = 'error') => {
    adminStatus.textContent = message;
    adminStatus.dataset.state = state;
    adminStatus.hidden = false;
  };
  const showLogin = (message = '') => {
    adminLoginForm.hidden = false;
    adminLinksForm.hidden = true;
    if (message) setAdminStatus(message);
  };
  const showSettings = (settings) => {
    adminLoginForm.hidden = true;
    adminLinksForm.hidden = false;
    telegramInput.value = settings.telegramLink || '';
    whatsappInput.value = settings.whatsappLink || '';
    adminStatus.hidden = true;
  };
  const requestAdminApi = async (url, options = {}) => {
    const headers = { Accept: 'application/json', ...options.headers };
    if (options.body) headers['Content-Type'] = 'application/json';
    const response = await fetch(url, {
      credentials: 'same-origin',
      cache: 'no-store',
      ...options,
      headers
    });
    const result = await response.json();
    if (!response.ok) {
      const error = new Error(result.error || `Request failed (${response.status})`);
      error.status = response.status;
      throw error;
    }
    return result;
  };

  requestAdminApi('/api/admin/session')
    .then((result) => {
      if (result.authenticated) showSettings(result);
    })
    .catch((error) => {
      console.error('Could not load admin session.', error);
      setAdminStatus(translations[currentLanguage]['admin.loadError']);
    });

  adminLoginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = adminLoginForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    try {
      const result = await requestAdminApi('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password: passwordInput.value })
      });
      passwordInput.value = '';
      showSettings(result);
    } catch (error) {
      console.error('Admin sign-in failed.', error);
      showLogin(translations[currentLanguage]['admin.loginFailed']);
    } finally {
      submitButton.disabled = false;
    }
  });

  adminLinksForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = adminLinksForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    try {
      await requestAdminApi('/api/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          telegramLink: telegramInput.value.trim(),
          whatsappLink: whatsappInput.value.trim()
        })
      });
      setAdminStatus(translations[currentLanguage]['admin.saveSuccess'], 'success');
    } catch (error) {
      console.error('Could not save contact links.', error);
      if (error.status === 401) {
        showLogin(translations[currentLanguage]['admin.sessionExpired']);
      } else if (error.status === 503) {
        setAdminStatus(translations[currentLanguage]['admin.storageError']);
      } else {
        setAdminStatus(translations[currentLanguage]['admin.saveError']);
      }
    } finally {
      submitButton.disabled = false;
    }
  });

  document.getElementById('adminLogout').addEventListener('click', async (event) => {
    const logoutButton = event.currentTarget;
    logoutButton.disabled = true;
    try {
      await requestAdminApi('/api/admin/logout', { method: 'POST' });
      showLogin();
      passwordInput.focus();
      setAdminStatus(translations[currentLanguage]['admin.logoutSuccess'], 'success');
    } catch (error) {
      console.error('Could not sign out from admin.', error);
      setAdminStatus(translations[currentLanguage]['admin.logoutError']);
    } finally {
      logoutButton.disabled = false;
    }
  });
}

const adminLogo = document.querySelector('[data-admin-trigger]');
if (adminLogo) {
  let logoClicks = 0;
  let resetLogoClicks;

  adminLogo.addEventListener('click', (event) => {
    event.preventDefault();
    logoClicks += 1;
    clearTimeout(resetLogoClicks);

    if (logoClicks >= 5) {
      window.location.href = 'admin.html';
      return;
    }

    resetLogoClicks = setTimeout(() => {
      logoClicks = 0;
    }, 3000);
  });
}

const siteBanner = document.getElementById('siteBanner');
const brandName = document.getElementById('brandName');
const footerBrand = document.getElementById('footerBrand');

if (brandName) brandName.textContent = site.logoName;
if (footerBrand) footerBrand.textContent = site.name;

const telegramEl = document.getElementById('telegramLink');
const whatsappEl = document.getElementById('whatsappLink');
const adviceTelegramEl = document.getElementById('adviceTelegramLink');
const adviceWhatsappEl = document.getElementById('adviceWhatsappLink');
const adviceWhatsappPending = document.getElementById('adviceWhatsappPending');

if (telegramEl) telegramEl.href = site.telegramLink;
if (adviceTelegramEl) adviceTelegramEl.href = site.telegramLink;
if (whatsappEl) {
  if (site.whatsappLink) {
    whatsappEl.href = site.whatsappLink;
    whatsappEl.removeAttribute('aria-disabled');
    if (adviceWhatsappEl) {
      adviceWhatsappEl.href = site.whatsappLink;
      adviceWhatsappEl.hidden = false;
    }
    if (adviceWhatsappPending) {
      adviceWhatsappPending.hidden = true;
    }
  } else {
    whatsappEl.removeAttribute('href');
    whatsappEl.setAttribute('aria-disabled', 'true');
    if (adviceWhatsappEl) adviceWhatsappEl.hidden = true;
    if (adviceWhatsappPending) adviceWhatsappPending.hidden = false;
  }
}

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealTargets = document.querySelectorAll(
    '.hero-copy, .hero-visual, .local-guide-card, .section-intro, .contact-step, .link-card, .legal-wrap, .faq-card, .spots-panel'
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => {
    element.classList.add('reveal-on-scroll');
    if (element.getBoundingClientRect().bottom < 0) {
      element.classList.add('is-visible');
    } else {
      revealObserver.observe(element);
    }
  });
}


