export interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

export interface ManifestCard {
  image: string;
  badge: string;
  title: string;
  text: string;
  btnText: string;
  btnHref: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
}

export type BlockType = "heading" | "text" | "image" | "button" | "banner" | "newsletter" | "spacer" | "hero-section" | "cards-grid" | "two-col";

export interface PageBlock {
  id: string;
  type: BlockType;
  content?: string;
  align?: "left" | "center" | "right";
  level?: "h1" | "h2" | "h3" | "h4";
  color?: string;
  fontSize?: number;
  src?: string;
  alt?: string;
  width?: string;
  href?: string;
  bgColor?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg";
  bgImage?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  body?: string;
  height?: number;
  // hero-section
  heroBgImage?: string;
  heroOverlay?: string; // rgba color
  // cards-grid
  sectionTitle?: string;
  cards?: Array<{ image: string; title: string; text: string; btnText: string; btnHref: string }>;
  // two-col
  imageLeft?: boolean;
  twoColImage?: string;
  twoColTitle?: string;
  twoColText?: string;
  twoColBtnText?: string;
  twoColBtnHref?: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  blocks: PageBlock[];
}

export interface SiteSettings {
  accentColor: string;
  logoUrl: string;
  metaTitle: string;
  metaDescription: string;
  customCss: string;
}

export interface AboutPageSection {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  bio1: string;
  bio2: string;
  bio3: string;
  quoteText: string;
  quoteAuthor: string;
  ctaTitle: string;
  ctaText: string;
  ctaButtonText: string;
  ctaButtonHref: string;
  statsItems: { number: string; label: string }[];
}

export type PricingRow = { label: string; price: string };
export type TwoColItem = { label: string; text: string };
export type ServiceSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  rows?: PricingRow[];
  twoCol?: TwoColItem[];
  price?: string;
};

export type ServiceItem = {
  id: string;
  symbol: string;
  emoji: string;
  color: string;
  title: string;
  teaser: string;
  lead: string;
  body?: string;
  sections: ServiceSection[];
  cta: { label: string; href: string };
};

export interface ServicesContent {
  homeEyebrow: string;
  homeTitle: string;
  homeSubtitle: string;
  homeCardLinkText: string;
  pageHeroEyebrow: string;
  pageHeroTitle: string;
  pageHeroText: string;
  pageHeroButtonText: string;
  pageHeroButtonHref: string;
  pageIntroIcon: string;
  pageIntroTitle: string;
  pageIntroText: string;
  pageGridTitle: string;
  pageGridSubtitle: string;
  pageTileLinkText: string;
  pageWhyTitle: string;
  pageWhyText1: string;
  pageWhyText2: string;
  pageWhyButtonText: string;
  pageWhyButtonHref: string;
  pageSpecificIcon: string;
  pageSpecificTitle: string;
  pageSpecificText1: string;
  pageSpecificText2: string;
  pageConsultIcon: string;
  pageConsultTitle: string;
  pageConsultText: string;
  pageConsultButtonText: string;
  pageConsultButtonHref: string;
  items: ServiceItem[];
}

export interface SiteContent {
  header: {
    navItems: NavItem[];
    logoHref: string;
    signInHref: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
    backgroundImage: string;
    mobileImage: string;
    titleColor?: string;
    subtitleColor?: string;
    panelBackground?: string;
    primaryButtonBg?: string;
    primaryButtonColor?: string;
  };
  newsletter: {
    title: string;
    body: string;
    buttonText: string;
    image: string;
  };
  about: {
    title: string;
    body1: string;
    body2: string;
    buttonText: string;
    buttonHref: string;
    imageTop: string;
    imageBottom: string;
  };
  manifest: {
    sectionTitle: string;
    cards: ManifestCard[];
  };
  pickacard: {
    title: string;
    body: string;
    buttonText: string;
    buttonHref: string;
    image: string;
  };
  oracle: {
    title: string;
    body: string;
    youtubeUrl: string;
  };
  footer: {
    newsletterTitle: string;
    copyright: string;
    footerLinks: FooterLink[];
    socialLinks: SocialLink[];
  };
  aboutPage: AboutPageSection;
  servicesContent: ServicesContent;
  pages: CustomPage[];
  siteSettings: SiteSettings;
}

export const SITE = "https://www.asteralight.cz";

export const DEFAULT_CONTENT: SiteContent = {
  header: {
    navItems: [
      { label: "O mně", href: "/about" },
      { label: "Služby", href: "/sluzby" },
      { label: "Konzultace", href: "/konzultace" },
      { label: "E-shop", href: `${SITE}/shop/` },
      { label: "Kniha", href: "/kniha" },
      { label: "Návody", href: "/navody" },
      { label: "Akce", href: `${SITE}/events/` },
      { label: "Jak poděkovat", href: "/jak-podekovat" },
    ],
    logoHref: SITE,
    signInHref: `${SITE}/login/`,
  },
  hero: {
    title: "Objev svůj klid s Asterou",
    subtitle: "Prostor, energie i vnitřní nastavení se mohou znovu nadechnout.",
    ctaText: "O mně",
    ctaHref: "#o-astere",
    backgroundImage: "/uploads/astera-upload-1777542736772-d2souok25x7.png",
    mobileImage: "/uploads/astera-upload-1777542736772-d2souok25x7.png",
    titleColor: "#1f1f1f",
    subtitleColor: "#2d2530",
    panelBackground: "rgba(255, 255, 255, 0.52)",
    primaryButtonBg: "#7c3bb2",
    primaryButtonColor: "#ffffff",
  },
  newsletter: {
    title: "Přihlas se k odběru newsletteru",
    body: "Jednou měsíčně pošlu užitečné tipy, jemné vedení a praktické návody pro harmonii domova i vnitřního prostoru. Žádný spam, jen obsah, který má smysl.",
    buttonText: "Přihlásit se",
    image: "/images/astera-with-computer.jpg",
  },
  about: {
    title: "O Asteře",
    body1: "Astera je průvodkyně pro chvíle, kdy domov, práce nebo vnitřní prostor potřebují znovu nadechnout. Spojuje citlivou intuici s praktickým, klidným přístupem a pomáhá lidem vracet do jejich prostoru lehkost, bezpečí a jasnější energii.",
    body2: "Její práce stojí na respektu, etice a individuálním vnímání každého místa i člověka. Nehledá rychlé efekty, ale skutečnou harmonii: takovou, kterou můžete cítit v každodenním životě a dál o ni pečovat vlastními silami.",
    buttonText: "Více o mně",
    buttonHref: "/about",
    imageTop: "/images/astera-about-home.png",
    imageBottom: "",
  },
  manifest: {
    sectionTitle: "Vyber si, co právě potřebuješ",
    cards: [
      {
        image: "/images/kniha-astera.png",
        badge: "/images/new-book-icon.png",
        title: "Kniha a inspirace",
        text: "Praktické vedení pro chvíle, kdy chcete lépe porozumět sobě, svým záměrům a tomu, co ve svém životě opravdu tvoříte.",
        btnText: "Zjistit více",
        btnHref: `${SITE}/art-of-manifesting/`,
      },
      {
        image: "/images/408x410-OracleSecretsWebinar-Event-Promo.jpg",
        badge: "/images/Live-Event.png",
        title: "Akce a setkání",
        text: "Živé i online akce pro ty, kdo chtějí zažít jasnější vedení, zklidnění a podporu v bezpečném prostoru.",
        btnText: "Rezervovat místo",
        btnHref: `${SITE}/oracle-secrets/`,
      },
      {
        image: "/images/Oracle-Circle.png",
        badge: "/images/Membership.png",
        title: "Členství Oracle Circle",
        text: "Členský prostor pro práci s kartami, intuicí a pravidelnou inspirací. Vhodné pro každého, kdo chce svou praxi rozvíjet s lehkostí.",
        btnText: "Vstoupit",
        btnHref: `${SITE}/membership/`,
      },
    ],
  },
  pickacard: {
    title: "Vyber si kartu",
    body: "Zastav se, nadechni se a nech intuici vybrat kartu, která s tebou právě teď nejvíc rezonuje. Krátké vedení ti může pomoci pojmenovat další krok.",
    buttonText: "Vybrat kartu",
    buttonHref: `${SITE}/pick-a-card/`,
    image: "/images/astera-pick-card.png",
  },
  oracle: {
    title: "Měsíční intuitivní vhled",
    body: "Krátké vedení pro období, kdy potřebujete víc klidu, jasnosti a důvěry v další krok.",
    youtubeUrl: "https://www.youtube.com/embed/UcJoLcwuMP4",
  },
  footer: {
    newsletterTitle: "Získej jemné vedení a novinky od Astery.",
    copyright: "© 2026 Astera Light. Všechna práva vyhrazena.",
    footerLinks: [
      { label: "Ochrana osobních údajů", href: `${SITE}/privacy-policy/` },
      { label: "Obchodní podmínky", href: `${SITE}/terms-of-use/` },
      { label: "Reklamace a vrácení", href: `${SITE}/returns/` },
      { label: "Platební podmínky", href: `${SITE}/payment-plan-terms/` },
      { label: "Podmínky členství", href: `${SITE}/membership-terms/` },
    ],
    socialLinks: [
      { name: "Facebook", href: "https://www.facebook.com/asteralight" },
      { name: "Instagram", href: "https://www.instagram.com/asteralight/" },
      { name: "YouTube", href: "https://www.youtube.com/@asteralight" },
      { name: "Pinterest", href: "https://www.pinterest.com/asteralight/" },
      { name: "TikTok", href: "https://www.tiktok.com/@asteralight" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/asteralight" },
    ],
  },
  aboutPage: {
    heroTitle: "About Astera-Light",
    heroSubtitle: "Intuitivní průvodkyně pro klid, energii a harmonii prostoru.",
    heroImage: "/images/astera-home-top.png",
    bio1: "Astera-Light provází lidi chvílemi, kdy jejich domov, pracovní prostor nebo vnitřní nastavení potřebují znovu klid, lehkost a jasnost.",
    bio2: "Její práce propojuje citlivou intuici s praktickým přístupem. Věnuje se očistě prostor, energetické harmonizaci a jednoduchým postupům, které si klienti mohou dlouhodobě osvojit.",
    bio3: "Každý prostor vnímá individuálně a s respektem. Důraz klade na etiku, bezpečí a výsledek, který podporuje každodenní život, ne jen krátkodobý efekt.",
    quoteText: "You are not a human being having a spiritual experience. You are a spiritual being having a human experience.",
    quoteAuthor: "— Astera-Light",
    ctaTitle: "Chcete začít?",
    ctaText: "Vyberte si službu, která vám pomůže vrátit do prostoru i života více klidu.",
    ctaButtonText: "Zobrazit služby",
    ctaButtonHref: `${SITE}/courses/`,
    statsItems: [
      { number: "1:1", label: "Individuální přístup" },
      { number: "100%", label: "Etická práce" },
      { number: "Online", label: "Konzultace" },
      { number: "CZ", label: "Český obsah" },
    ],
  },
  servicesContent: {
    homeEyebrow: "✦ ✦ ✦",
    homeTitle: "Vyberte službu, která vás oslovuje",
    homeSubtitle: "✦   Každá cesta je jedinečná   ✦",
    homeCardLinkText: "Zjistit více",
    pageHeroEyebrow: "✦   Astera · Individuální přístup   ✦",
    pageHeroTitle: "Nabídka služeb",
    pageHeroText: "Prostor pro hlubokou práci, která vám pomůže zorientovat se v životě, uvolnit to, co vás brzdí, a znovu se napojit na sebe.",
    pageHeroButtonText: "Rezervovat termín",
    pageHeroButtonHref: "https://app.rezora.cz/book/astera",
    pageIntroIcon: "🌟",
    pageIntroTitle: "Najděte odpovědi, klid a směr",
    pageIntroText: "Pracuji individuálně, citlivě a s důrazem na kvalitu – každé setkání i služba je jedinečná. Součástí služeb není jen samotná práce, ale i zaškolení a poradenství. Naučím vás jednoduché a účinné způsoby vhodné speciálně pro vás, šité přesně na míru, a tak mě budete potřebovat jen ve výjimečných situacích!",
    pageGridTitle: "Vyberte službu, která vás oslovuje",
    pageGridSubtitle: "✦   Každá cesta je jedinečná   ✦",
    pageTileLinkText: "Zjistit více →",
    pageWhyTitle: "Proč pracovat se mnou",
    pageWhyText1: "Každé setkání i každá vytvořená věc vychází z individuálního přístupu, hlubokého vnímání a respektu k vaší situaci.",
    pageWhyText2: "Nejde o univerzální řešení, ale o cílenou práci, která má skutečný dopad. Pokud cítíte, že je čas něco změnit, uvolnit nebo pochopit, ráda vás tímto procesem provedu.",
    pageWhyButtonText: "Rezervovat termín",
    pageWhyButtonHref: "https://app.rezora.cz/book/astera",
    pageSpecificIcon: "🕊️",
    pageSpecificTitle: "Specifické případy",
    pageSpecificText1: "Pracuji také s prostory, kde došlo k úmrtí, zejména po dlouhé a náročné nemoci. V takových místech může přetrvávat energetická stopa spojená s bolestí či vyčerpáním.",
    pageSpecificText2: "Po ošetření prostoru je možné jej znovu plnohodnotně obývat, pronajmout nebo prodat — s pocitem klidu a jistoty.",
    pageConsultIcon: "💜",
    pageConsultTitle: "Nemáte jistotu nebo rozpočet?",
    pageConsultText: "Pokud si nejste jistí, zda je nějaká služba pro vás vhodná, nebo aktuálně nemáte možnost ji využít, nabízím také individuální konzultace kde vyhodnotíme co zrovna potřebujete pro zlepšení kvality života, pocitu naplněnosti a klidu.",
    pageConsultButtonText: "Rezervovat termín",
    pageConsultButtonHref: "https://app.rezora.cz/book/astera",
    items: [
      {
        id: "karty", symbol: "☽", emoji: "🃏", color: "#9b6fd4",
        title: "Výklad karet",
        teaser: "Získejte jasnější pohled na to, co se právě děje – i kam vaše cesta směřuje.",
        lead: "Hledáte odpovědi, směr nebo ujištění v důležité životní situaci? Výklad karet vám pomůže nahlédnout pod povrch a získat jasnější pohled na to, co se právě děje – i kam vaše cesta směřuje.",
        body: "Vstupte do prostoru, kde se zastavuje čas a odpovědi přicházejí v pravý okamžik.",
        sections: [
          { heading: "Jak probíhá výklad", paragraphs: ["Výklad karet je hluboký a osobní proces. Každé sezení je zcela individuální a věnuji se pouze omezenému počtu klientů, aby byla zachována maximální kvalita a hloubka práce.", "Pracuji především s Tarotem, doplňkově využívám orákula, cikánské karty, runy a další nástroje."] },
          { heading: "Formy výkladu", rows: [{ label: "Online živě (60–90 minut)", price: "3 600 Kč" }, { label: "Videozpráva (soukromý odkaz na YouTube)", price: "2 600 Kč" }, { label: "Textová zpráva nebo e-mail včetně fotografií", price: "1 200 Kč" }] },
          { heading: "Osobní setkání v Praze", paragraphs: ["Pro hlubší a intenzivnější práci nabízím také osobní setkání (60–180 minut).", "Toto sezení je určeno pouze pro stávající klienty, kteří již mají zkušenost s online výkladem. Kombinuje výklad, poradenství, channeling, mediumství a energetickou harmonizaci."], rows: [{ label: "Cena osobního setkání", price: "5 900 Kč" }] },
        ],
        cta: { label: "Rezervovat termín", href: "https://app.rezora.cz/book/astera" },
      },
      {
        id: "ocista", symbol: "✦", emoji: "🏠", color: "#5a9e7c",
        title: "Očista prostor",
        teaser: "Navracím do domovů a pracovních prostor klid, lehkost a pocit bezpečí.",
        lead: "Pomáhám navracet do domovů i pracovních prostor klid, lehkost a pocit bezpečí. Očista přináší rovnováhu a uvolnění tam, kde se hromadí napětí nebo stagnace.",
        sections: [
          { heading: "Kdy je očista vhodná", list: ["při stěhování", "po náročných životních obdobích", "při dlouhodobé nemoci v prostoru", "při pocitu neklidu, napětí nebo nevysvětlitelných jevů"] },
          { heading: "Ceník (orientační)", paragraphs: ["Očistu provádím individuálně, s respektem k prostoru i jeho obyvatelům."], rows: [{ label: "Garsonka a 1+kk", price: "3 900 – 4 900 Kč" }, { label: "2+kk a byty do 50 m²", price: "5 900 – 7 900 Kč" }, { label: "3+kk až 5+kk do 120 m²", price: "8 900 – 13 900 Kč" }, { label: "Rodinné domy a samostatné objekty", price: "14 900 – 29 900 Kč" }, { label: "Průvodce samostatnou očistou (e-shop)", price: "1 290 Kč" }] },
        ],
        cta: { label: "Rezervovat termín", href: "https://app.rezora.cz/book/astera" },
      },
      {
        id: "amulety", symbol: "⊕", emoji: "✨", color: "#c08040",
        title: "Amulety a talismany",
        teaser: "Osobní předmět nositelem záměru, energie a vědomé práce na vaší cestě.",
        lead: "Osobní amulet nebo talisman je víc než jen předmět. Je nositelem záměru, energie a vědomé práce, která vás provází na vaší cestě.",
        body: "Každý kus vzniká individuálně, v napojení na vaši energii a konkrétní záměr.",
        sections: [
          { heading: "Rozdíl mezi amuletem a talismanem", twoCol: [{ label: "Amulet", text: "Chrání, vytváří štít a ochrannou bariéru. Pomáhá odpuzovat nežádoucí vlivy, situace, energie nebo konkrétní osoby. Omezuje to, co vás oslabuje nebo narušuje vaši rovnováhu." }, { label: "Talisman", text: "Posiluje to, co chcete ve svém životě rozvíjet. Přitahuje žádoucí energii, příležitosti a lidi. Podporuje vaše záměry, zvyšuje šance a zesiluje to, po čem toužíte." }] },
          { heading: "Možnosti využití", list: ["ochrana a posílení", "přitažení příležitostí", "podpora vztahů nebo přivolání partnera", "ochrana před toxickým prostředím", "důležité životní momenty (zkoušky, cesty apod.)"] },
          { heading: "Jak probíhá spolupráce", paragraphs: ["Součástí procesu je úvodní konzultace, během které společně ujasníme váš záměr a směr tvorby.", "Cena konzultace se následně odečítá z celkové ceny."], rows: [{ label: "Amulet / talisman na míru", price: "4 400 – 19 900 Kč" }] },
        ],
        cta: { label: "Rezervovat termín", href: "https://app.rezora.cz/book/astera" },
      },
      {
        id: "medium", symbol: "☆", emoji: "🌙", color: "#5878c0",
        title: "Mediumní výklady",
        teaser: "Pomáhám najít klid, pochopení a uzavření tam, kde zůstávají nevyřčené věci.",
        lead: "Neuzavřené vztahy nebo ztráta blízkého člověka mohou zůstávat hluboko v nás. Mediumní výklad vám může pomoci najít klid, pochopení i uzavření.",
        body: "Zprostředkovávám komunikaci a vhledy, které vám pomohou uvolnit emoce, dořešit nevyřčené a posunout se dál.",
        sections: [{ rows: [{ label: "Video, online setkání nebo osobně v Praze", price: "3 600 Kč" }] }],
        cta: { label: "Rezervovat termín", href: "https://app.rezora.cz/book/astera" },
      },
      {
        id: "energo", symbol: "◈", emoji: "💫", color: "#a84a80",
        title: "Energetická očista člověka",
        teaser: "Hluboká práce obnovující vnitřní rovnováhu a uvolňující to, co již neslouží.",
        lead: "Jemná, ale hluboká práce, která obnovuje vnitřní rovnováhu a uvolňuje to, co již neslouží.",
        body: "Energetická očista probíhá na dálku a zasahuje pět úrovní bytí – fyzickou, emoční, mentální i další jemnohmotné vrstvy. Výsledkem bývá pocit úlevy, větší lehkosti a návratu k sobě.",
        sections: [{ rows: [{ label: "Individuální sezení na dálku", price: "3 300 Kč" }] }],
        cta: { label: "Rezervovat termín", href: "https://app.rezora.cz/book/astera" },
      },
      {
        id: "na-miru", symbol: "✧", emoji: "🔮", color: "#7c6ad4",
        title: "Služby na míru",
        teaser: "Individuální kombinace vedení, výkladu a energetické práce podle toho, co právě potřebujete.",
        lead: "Někdy se situace nevejde do jedné konkrétní služby. Společně pojmenujeme, co právě řešíte, a navrhnu citlivý postup šitý na míru vašemu záměru, prostoru i aktuální energii.",
        body: "Služba může propojit konzultaci, výklad, očistu, práci se záměrem nebo doporučení dalších kroků podle vaší konkrétní situace.",
        sections: [
          { heading: "Kdy je vhodná", list: ["když si nejste jistí, jakou službu zvolit", "pokud se téma dotýká více oblastí najednou", "když potřebujete individuální plán nebo citlivé nasměrování", "při specifické životní situaci, která vyžaduje osobní přístup"] },
          { heading: "Cena a rozsah", paragraphs: ["Rozsah i forma se domlouvají individuálně podle tématu, hloubky práce a časové náročnosti."], rows: [{ label: "Individuální návrh služby", price: "dle domluvy" }] },
        ],
        cta: { label: "Rezervovat termín", href: "https://app.rezora.cz/book/astera" },
      },
    ],
  },
  pages: [],
  siteSettings: {
    accentColor: "#7c3bb2",
    logoUrl: "/images/astera-logo.png",
    metaTitle: "Astera Light",
    metaDescription: "Experience Your Magic with Astera-Light",
    customCss: "",
  },
};
