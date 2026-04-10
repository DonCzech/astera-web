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
}

export const SITE = "https://www.asteralight.cz";

export const DEFAULT_CONTENT: SiteContent = {
  header: {
    navItems: [
      { label: "Pick a Card", href: `${SITE}/pick-a-card/` },
      {
        label: "Membership",
        href: `${SITE}/membership/`,
        dropdown: [{ label: "Oracle Circle", href: `${SITE}/membership/oracle-circle/` }],
      },
      {
        label: "Online Courses",
        href: `${SITE}/courses/`,
        dropdown: [
          { label: "The Power of Journaling with Oracle Cards", href: `${SITE}/courses/` },
          { label: "Oracle Cards 101", href: `${SITE}/courses/` },
          { label: "Wisdom of the Oracle Revealed", href: `${SITE}/courses/` },
          { label: "Oracle Cards Unlocked", href: `${SITE}/courses/` },
          { label: "Oracle School", href: `${SITE}/courses/` },
          { label: "Certified Intuitive Coach", href: `${SITE}/courses/` },
          { label: "VIEW ALL →", href: `${SITE}/courses/` },
        ],
      },
      {
        label: "Watch & Learn",
        href: "#",
        dropdown: [
          { label: "Blog", href: `${SITE}/blog/` },
          { label: "Podcast", href: `${SITE}/podcast/` },
          { label: "Video", href: "https://www.youtube.com/@ColetteBaronReid" },
        ],
      },
      { label: "Events", href: `${SITE}/events/` },
      { label: "Art", href: `${SITE}/art-gallery/` },
      { label: "About", href: `${SITE}/about/` },
      { label: "Shop", href: `${SITE}/shop/` },
    ],
    logoHref: SITE,
    signInHref: `${SITE}/login/`,
  },
  hero: {
    title: "Experience Your Magic with Colette Baron-Reid",
    subtitle: "Anything is possible when you open your connection to the universe",
    ctaText: "Pick A Card",
    ctaHref: `${SITE}/pick-a-card/`,
    backgroundImage: "/images/Colette-Hero-Image.jpg",
    mobileImage: "/images/collette-fm.jpg",
  },
  newsletter: {
    title: "Join The Oracle Community",
    body: "Get <strong>free</strong> weekly Oracle guidance lessons, newsletter, gifts, and so much more, delivered right to your inbox with love.",
    buttonText: "Join Now",
    image: "/images/Colette-with-Computer.jpg",
  },
  about: {
    title: "About Colette",
    body1: "Colette Baron-Reid (she/her) is a bestselling author, internationally recognized Oracle expert, spiritual intuitive, and personal transformation thought leader. She is the founder of The Oracle School Experience®, OraclePalooza®, and the DreamQuest Platinum Mastermind.",
    body2: "With 19 best-selling Oracle card decks and over two million sold worldwide, along with seven books, at 38 plus years clean and sober, Colette's greatest joy is teaching people they can have a direct and personal dialogue with the Universe to help them create their most fulfilling lives.",
    buttonText: "Read More",
    buttonHref: `${SITE}/about/`,
    imageTop: "/images/Collette-Home-Top.png",
    imageBottom: "/images/collette-home-bottom.jpg",
  },
  manifest: {
    sectionTitle: "Manifest Your Ideal Life",
    cards: [
      {
        image: "/images/art-of-manifesting.jpg",
        badge: "/images/new-book-icon.png",
        title: "The Art of Manifesting",
        text: "Discover the AM Method™ in The Art of Manifesting. Don't miss out—order your copy today for exclusive bonuses, including manifesting wallpaper, coloring book pages, and more!",
        btnText: "Order Now",
        btnHref: `${SITE}/art-of-manifesting/`,
      },
      {
        image: "/images/408x410-OracleSecretsWebinar-Event-Promo.jpg",
        badge: "/images/Live-Event.png",
        title: "Oracle Secrets",
        text: "Stop overthinking and start trusting yourself again. Join Oracle Secrets: Trust What's Next, a FREE 3-day live experience to quiet the noise and receive clear, grounded inner guidance.",
        btnText: "Save Your Free Seat",
        btnHref: `${SITE}/oracle-secrets/`,
      },
      {
        image: "/images/Oracle-Circle.png",
        badge: "/images/Membership.png",
        title: "Oracle Circle Membership",
        text: "Join a safe, uplifting space to deepen your spiritual journey and strengthen your connection with Spirit. Explore how astrology, Oracle cards, numerology, and energetic cycles can enrich your life.",
        btnText: "Join Now",
        btnHref: `${SITE}/membership/`,
      },
    ],
  },
  pickacard: {
    title: "Pick A Card",
    body: "Choose a card and ask the universe for advice. In three easy steps you will find the card that speaks to you most, discover which Oracles are guiding you now, and read the message.",
    buttonText: "Pick A Card",
    buttonHref: `${SITE}/pick-a-card/`,
    image: "/images/ColetteBaronReidDec2023-370.png",
  },
  oracle: {
    title: "Monthly Oracle Card Guidance And Lesson",
    body: "Get ready for big energy shifts as we dive into your April Predictions!",
    youtubeUrl: "https://www.youtube.com/embed/UcJoLcwuMP4",
  },
  footer: {
    newsletterTitle: "Get Weekly Oracle Card Insights from Colette– subscribe now!",
    copyright: "© 2026 Colette Baron-Reid. All Rights Reserved.",
    footerLinks: [
      { label: "Privacy Policy", href: `${SITE}/privacy-policy/` },
      { label: "Terms & Conditions", href: `${SITE}/terms-of-use/` },
      { label: "Returns Policy", href: `${SITE}/returns/` },
      { label: "Payment Plan Terms", href: `${SITE}/payment-plan-terms/` },
      { label: "Membership Terms", href: `${SITE}/membership-terms/` },
    ],
    socialLinks: [
      { name: "Facebook", href: "https://www.facebook.com/colettebaronreid" },
      { name: "Instagram", href: "https://www.instagram.com/colettebaron_reid/" },
      { name: "YouTube", href: "https://www.youtube.com/user/ColetteBaronReid/featured" },
      { name: "Pinterest", href: "https://www.pinterest.com/colettebaronreid/" },
      { name: "TikTok", href: "https://www.tiktok.com/@colettebaronreid" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/colettebaronreid" },
    ],
  },
};
