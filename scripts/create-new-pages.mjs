/**
 * Creates Help Center, Contact, and all legal pages in CS/EN/UA
 * and updates footer links for all 3 languages.
 * Run: node scripts/create-new-pages.mjs
 */

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_L2lUpgrbq1Xs@ep-aged-poetry-al6l0x5p-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false },
});

const id = () => `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ─── PAGE DEFINITIONS ──────────────────────────────────────────────────────

const PAGES = {
  cs: [
    {
      id: `page-napoveda-${Date.now()}`,
      slug: "napoveda",
      title: "Centrum pomoci",
      blocks: [
        {
          id: id(), type: "faq",
          faqTitle: "Centrum pomoci",
          faqSubtitle: "Odpovědi na nejčastější otázky",
          faqItems: [
            { id: "faq-cs-1", q: "Jak si mohu objednat konzultaci?", a: "Konzultaci si objednáte přes rezervační systém na stránce <a href='/cs/konzultace' style='color:#7c3bb2;font-weight:600;'>Konzultace</a> nebo přímo na <a href='https://app.rezora.cz/book/astera' style='color:#7c3bb2;font-weight:600;'>app.rezora.cz</a>. Termíny jsou k dispozici online 24/7." },
            { id: "faq-cs-2", q: "Jak probíhá online výklad karet?", a: "Online výklad probíhá přes video hovor (Zoom, Google Meet nebo jiný dle dohody). Potřebujete pouze stabilní internet a klidné místo. Délka sezení je 60–90 minut." },
            { id: "faq-cs-3", q: "Mohu si objednat službu jako dárek?", a: "Ano, všechny služby lze objednat jako dárkový poukaz. Napište mi na <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a> a vše zařídím." },
            { id: "faq-cs-4", q: "Jak dlouho trvá energetické očišťování prostoru?", a: "Délka závisí na velikosti prostoru a míře energetické zátěže. Orientačně: garsonka 2–3 hodiny, byt 3+1 4–6 hodin. Vždy vám předem sdělím odhadovanou délku." },
            { id: "faq-cs-5", q: "Pracujete i na dálku?", a: "Ano. Výklady karet, energetické očistění osoby i výroba amuletů a talismanů probíhají plně na dálku, bez nutnosti osobní přítomnosti. Očistění prostoru probíhá osobně." },
            { id: "faq-cs-6", q: "Jak rychle dostanu odpověď na zprávu?", a: "Obvykle odpovídám do 2–3 pracovních dnů. V případě urgentní záležitosti mi napište na <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a>." },
            { id: "faq-cs-7", q: "Jak probíhá platba?", a: "Platbu lze provést bankovním převodem na základě zaslané faktury, nebo online přes platební bránu při objednávce. Platební podmínky jsou k dispozici v sekci <a href='/cs/platebni-podminky' style='color:#7c3bb2;font-weight:600;'>Platební podmínky</a>." },
            { id: "faq-cs-8", q: "Mohu výklad nebo sezení zrušit?", a: "Ano, sezení lze zrušit nebo přeobjednat nejpozději 48 hodin předem. V případě pozdějšího zrušení se může účtovat stornopoplatek. Podrobnosti naleznete v <a href='/cs/obchodni-podminky' style='color:#7c3bb2;font-weight:600;'>Obchodních podmínkách</a>." },
          ],
        },
      ],
    },
    {
      id: `page-kontakt-${Date.now()}`,
      slug: "kontakt",
      title: "Kontakt",
      blocks: [
        { id: id(), type: "contact-form" },
      ],
    },
    {
      id: `page-ochrana-${Date.now()}`,
      slug: "ochrana-osobnich-udaju",
      title: "Ochrana osobních údajů",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Ochrana osobních údajů",
          subtitle: "Obsah se připravuje",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>Tato stránka se připravuje. Brzy zde najdete kompletní informace o ochraně osobních údajů.</p><p style='text-align:center;'>V případě dotazů nás kontaktujte na <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-podminky-${Date.now()}`,
      slug: "obchodni-podminky",
      title: "Obchodní podmínky",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Obchodní podmínky",
          subtitle: "Obsah se připravuje",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>Tato stránka se připravuje. Brzy zde najdete kompletní obchodní podmínky.</p><p style='text-align:center;'>V případě dotazů nás kontaktujte na <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-reklamace-${Date.now()}`,
      slug: "reklamace",
      title: "Reklamace a vrácení",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Reklamace a vrácení",
          subtitle: "Obsah se připravuje",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>Tato stránka se připravuje. Brzy zde najdete informace o reklamacích a vracení.</p><p style='text-align:center;'>V případě dotazů nás kontaktujte na <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-platby-${Date.now()}`,
      slug: "platebni-podminky",
      title: "Platební podmínky",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Platební podmínky",
          subtitle: "Obsah se připravuje",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>Tato stránka se připravuje. Brzy zde najdete platební podmínky.</p><p style='text-align:center;'>V případě dotazů nás kontaktujte na <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-clenstvi-${Date.now()}`,
      slug: "podminky-clenstvi",
      title: "Podmínky členství",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Podmínky členství",
          subtitle: "Obsah se připravuje",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>Tato stránka se připravuje. Brzy zde najdete podmínky členství.</p><p style='text-align:center;'>V případě dotazů nás kontaktujte na <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
  ],

  en: [
    {
      id: `page-help-center-en-${Date.now()}`,
      slug: "help-center",
      title: "Help Center",
      blocks: [
        {
          id: id(), type: "faq",
          faqTitle: "Help Center",
          faqSubtitle: "Answers to the most common questions",
          faqItems: [
            { id: "faq-en-1", q: "How can I book a consultation?", a: "You can book a consultation through the booking system on the <a href='/en/consultation' style='color:#7c3bb2;font-weight:600;'>Consultation</a> page or directly at <a href='https://app.rezora.cz/book/astera' style='color:#7c3bb2;font-weight:600;'>app.rezora.cz</a>. Appointments are available online 24/7." },
            { id: "faq-en-2", q: "How does an online card reading work?", a: "The online reading takes place via video call (Zoom, Google Meet or another platform agreed in advance). All you need is a stable internet connection and a quiet place. Sessions last 60–90 minutes." },
            { id: "faq-en-3", q: "Can I purchase a service as a gift?", a: "Yes, all services can be purchased as gift vouchers. Write to me at <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a> and I'll arrange everything." },
            { id: "faq-en-4", q: "How long does a space cleansing take?", a: "The duration depends on the size of the space and the level of energetic load. Approximately: studio flat 2–3 hours, 2-bedroom flat 4–6 hours. I will always give you an estimated time beforehand." },
            { id: "faq-en-5", q: "Do you work remotely?", a: "Yes. Card readings, energetic cleansing of a person and the creation of amulets and talismans are all done fully remotely. Space cleansing is performed in person." },
            { id: "faq-en-6", q: "How quickly will I receive a reply?", a: "I usually respond within 2–3 working days. For urgent matters, write to me at <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a>." },
            { id: "faq-en-7", q: "How does payment work?", a: "Payment can be made by bank transfer based on an invoice, or online through a payment gateway at the time of booking. Payment terms are available in the <a href='/en/payment-terms' style='color:#7c3bb2;font-weight:600;'>Payment Terms</a> section." },
            { id: "faq-en-8", q: "Can I cancel or reschedule a session?", a: "Yes, sessions can be cancelled or rescheduled up to 48 hours in advance. A cancellation fee may apply for later cancellations. See the <a href='/en/terms-of-use' style='color:#7c3bb2;font-weight:600;'>Terms of Use</a> for details." },
          ],
        },
      ],
    },
    {
      id: `page-contact-en-${Date.now()}`,
      slug: "contact",
      title: "Contact",
      blocks: [
        { id: id(), type: "contact-form" },
      ],
    },
    {
      id: `page-privacy-en-${Date.now()}`,
      slug: "privacy-policy",
      title: "Privacy Policy",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Privacy Policy",
          subtitle: "Content coming soon",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>This page is being prepared. You will soon find complete privacy policy information here.</p><p style='text-align:center;'>For questions, please contact us at <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-terms-en-${Date.now()}`,
      slug: "terms-of-use",
      title: "Terms of Use",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Terms of Use",
          subtitle: "Content coming soon",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>This page is being prepared. You will soon find complete terms of use here.</p><p style='text-align:center;'>For questions, please contact us at <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-returns-en-${Date.now()}`,
      slug: "returns",
      title: "Returns & Refunds",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Returns & Refunds",
          subtitle: "Content coming soon",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>This page is being prepared. You will soon find returns and refunds information here.</p><p style='text-align:center;'>For questions, please contact us at <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-payment-en-${Date.now()}`,
      slug: "payment-terms",
      title: "Payment Terms",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Payment Terms",
          subtitle: "Content coming soon",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>This page is being prepared. You will soon find payment terms here.</p><p style='text-align:center;'>For questions, please contact us at <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-membership-en-${Date.now()}`,
      slug: "membership-terms",
      title: "Membership Terms",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Membership Terms",
          subtitle: "Content coming soon",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>This page is being prepared. You will soon find membership terms here.</p><p style='text-align:center;'>For questions, please contact us at <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
  ],

  ua: [
    {
      id: `page-dopomoha-ua-${Date.now()}`,
      slug: "dopomoha",
      title: "Центр допомоги",
      blocks: [
        {
          id: id(), type: "faq",
          faqTitle: "Центр допомоги",
          faqSubtitle: "Відповіді на найпоширеніші запитання",
          faqItems: [
            { id: "faq-ua-1", q: "Як записатися на консультацію?", a: "Ви можете записатися через систему бронювання на сторінці <a href='/ua/konsultatsiya' style='color:#7c3bb2;font-weight:600;'>Консультація</a> або безпосередньо на <a href='https://app.rezora.cz/book/astera' style='color:#7c3bb2;font-weight:600;'>app.rezora.cz</a>. Терміни доступні онлайн цілодобово." },
            { id: "faq-ua-2", q: "Як відбувається онлайн розклад карт?", a: "Онлайн розклад відбувається через відеодзвінок (Zoom, Google Meet або інший за домовленістю). Вам потрібен лише стабільний інтернет і спокійне місце. Тривалість сесії 60–90 хвилин." },
            { id: "faq-ua-3", q: "Чи можна замовити послугу в подарунок?", a: "Так, усі послуги можна замовити як подарунковий сертифікат. Напишіть мені на <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a> і я все організую." },
            { id: "faq-ua-4", q: "Скільки часу займає енергетичне очищення простору?", a: "Тривалість залежить від розміру простору. Орієнтовно: студія 2–3 години, квартира 3+1 4–6 годин. Я завжди повідомлю вам орієнтовний час заздалегідь." },
            { id: "faq-ua-5", q: "Ви працюєте дистанційно?", a: "Так. Розклади карт, енергетичне очищення людини та виготовлення амулетів і талісманів відбуваються повністю дистанційно. Очищення простору — особисто." },
            { id: "faq-ua-6", q: "Як швидко я отримаю відповідь?", a: "Зазвичай я відповідаю протягом 2–3 робочих днів. У термінових випадках пишіть на <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a>." },
            { id: "faq-ua-7", q: "Як здійснюється оплата?", a: "Оплата може здійснюватися банківським переказом на підставі виставленого рахунку або онлайн через платіжний шлюз під час замовлення. Умови оплати доступні в розділі <a href='/ua/payment-terms' style='color:#7c3bb2;font-weight:600;'>Умови оплати</a>." },
            { id: "faq-ua-8", q: "Чи можу я скасувати або перенести сеанс?", a: "Так, сеанс можна скасувати або перенести не пізніше ніж за 48 годин. За пізнішого скасування може стягуватися плата. Подробиці в <a href='/ua/terms-of-use' style='color:#7c3bb2;font-weight:600;'>Умовах використання</a>." },
          ],
        },
      ],
    },
    {
      id: `page-kontakt-ua-${Date.now()}`,
      slug: "kontakt",
      title: "Контакт",
      blocks: [
        { id: id(), type: "contact-form" },
      ],
    },
    {
      id: `page-privacy-ua-${Date.now()}`,
      slug: "privacy-policy",
      title: "Політика конфіденційності",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Політика конфіденційності",
          subtitle: "Зміст готується",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>Ця сторінка готується. Незабаром тут з'явиться повна інформація про конфіденційність.</p><p style='text-align:center;'>З питань звертайтесь на <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-terms-ua-${Date.now()}`,
      slug: "terms-of-use",
      title: "Умови використання",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Умови використання",
          subtitle: "Зміст готується",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>Ця сторінка готується. Незабаром тут з'являться повні умови використання.</p><p style='text-align:center;'>З питань звертайтесь на <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-returns-ua-${Date.now()}`,
      slug: "returns",
      title: "Повернення та відшкодування",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Повернення та відшкодування",
          subtitle: "Зміст готується",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>Ця сторінка готується. Незабаром тут з'явиться інформація про повернення.</p><p style='text-align:center;'>З питань звертайтесь на <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-payment-ua-${Date.now()}`,
      slug: "payment-terms",
      title: "Умови оплати",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Умови оплати",
          subtitle: "Зміст готується",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>Ця сторінка готується. Незабаром тут з'являться умови оплати.</p><p style='text-align:center;'>З питань звертайтесь на <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
    {
      id: `page-membership-ua-${Date.now()}`,
      slug: "membership-terms",
      title: "Умови членства",
      blocks: [
        {
          id: id(), type: "hero-section",
          content: "Умови членства",
          subtitle: "Зміст готується",
          bgColor: "linear-gradient(135deg, #2a1a00, #7c3bb2)",
          align: "center",
        },
        {
          id: id(), type: "text",
          content: "<p style='text-align:center;color:#6b5a3a;font-style:italic;padding:40px 0;'>Ця сторінка готується. Незабаром тут з'являться умови членства.</p><p style='text-align:center;'>З питань звертайтесь на <a href='mailto:info@asteralight.cz' style='color:#7c3bb2;font-weight:600;'>info@asteralight.cz</a></p>",
          align: "center",
        },
      ],
    },
  ],
};

// ─── FOOTER LINKS ──────────────────────────────────────────────────────────

const FOOTER_LINKS = {
  cs: [
    { label: "Ochrana osobních údajů", href: "/cs/ochrana-osobnich-udaju" },
    { label: "Obchodní podmínky",       href: "/cs/obchodni-podminky" },
    { label: "Reklamace a vrácení",     href: "/cs/reklamace" },
    { label: "Platební podmínky",       href: "/cs/platebni-podminky" },
    { label: "Podmínky členství",       href: "/cs/podminky-clenstvi" },
  ],
  en: [
    { label: "Privacy Policy",    href: "/en/privacy-policy" },
    { label: "Terms of Use",      href: "/en/terms-of-use" },
    { label: "Returns & Refunds", href: "/en/returns" },
    { label: "Payment Terms",     href: "/en/payment-terms" },
    { label: "Membership Terms",  href: "/en/membership-terms" },
  ],
  ua: [
    { label: "Конфіденційність",        href: "/ua/privacy-policy" },
    { label: "Умови використання",      href: "/ua/terms-of-use" },
    { label: "Повернення",              href: "/ua/returns" },
    { label: "Умови оплати",            href: "/ua/payment-terms" },
    { label: "Умови членства",          href: "/ua/membership-terms" },
  ],
};

// ─── RUN ──────────────────────────────────────────────────────────────────

async function run() {
  console.log("Starting page creation...\n");

  // ── CS pages (site_content table, section = "pages") ──
  {
    const { rows } = await pool.query("SELECT content FROM site_content WHERE section = 'pages'");
    const existing = rows[0]?.content ?? [];
    const existingSlugs = new Set(existing.map(p => p.slug));
    const toAdd = PAGES.cs.filter(p => !existingSlugs.has(p.slug));
    if (toAdd.length > 0) {
      const merged = [...existing, ...toAdd];
      await pool.query(
        "UPDATE site_content SET content = $1, updated_at = now() WHERE section = 'pages'",
        [JSON.stringify(merged)]
      );
      console.log(`✅ CS: added ${toAdd.length} pages: ${toAdd.map(p => p.slug).join(", ")}`);
    } else {
      console.log("ℹ️  CS: all pages already exist, skipping");
    }

    // Update CS footer links
    const { rows: fRows } = await pool.query("SELECT content FROM site_content WHERE section = 'footer'");
    if (fRows[0]) {
      const footer = fRows[0].content;
      footer.footerLinks = FOOTER_LINKS.cs;
      await pool.query(
        "UPDATE site_content SET content = $1, updated_at = now() WHERE section = 'footer'",
        [JSON.stringify(footer)]
      );
      console.log("✅ CS: footer links updated");
    }
  }

  // ── EN pages (site_content_i18n, lang = "en") ──
  {
    const { rows } = await pool.query("SELECT content FROM site_content_i18n WHERE section = 'pages' AND lang = 'en'");
    const existing = rows[0]?.content ?? [];
    const existingSlugs = new Set(existing.map(p => p.slug));
    const toAdd = PAGES.en.filter(p => !existingSlugs.has(p.slug));
    if (toAdd.length > 0) {
      const merged = [...existing, ...toAdd];
      await pool.query(
        `INSERT INTO site_content_i18n (section, lang, content, updated_at)
         VALUES ('pages', 'en', $1, now())
         ON CONFLICT (section, lang) DO UPDATE SET content = $1, updated_at = now()`,
        [JSON.stringify(merged)]
      );
      console.log(`✅ EN: added ${toAdd.length} pages: ${toAdd.map(p => p.slug).join(", ")}`);
    } else {
      console.log("ℹ️  EN: all pages already exist, skipping");
    }

    // Update EN footer links
    const { rows: fRows } = await pool.query("SELECT content FROM site_content_i18n WHERE section = 'footer' AND lang = 'en'");
    const enFooter = fRows[0]?.content ?? {};
    enFooter.footerLinks = FOOTER_LINKS.en;
    await pool.query(
      `INSERT INTO site_content_i18n (section, lang, content, updated_at)
       VALUES ('footer', 'en', $1, now())
       ON CONFLICT (section, lang) DO UPDATE SET content = $1, updated_at = now()`,
      [JSON.stringify(enFooter)]
    );
    console.log("✅ EN: footer links updated");
  }

  // ── UA pages (site_content_i18n, lang = "ua") ──
  {
    const { rows } = await pool.query("SELECT content FROM site_content_i18n WHERE section = 'pages' AND lang = 'ua'");
    const existing = rows[0]?.content ?? [];
    const existingSlugs = new Set(existing.map(p => p.slug));
    const toAdd = PAGES.ua.filter(p => !existingSlugs.has(p.slug));
    if (toAdd.length > 0) {
      const merged = [...existing, ...toAdd];
      await pool.query(
        `INSERT INTO site_content_i18n (section, lang, content, updated_at)
         VALUES ('pages', 'ua', $1, now())
         ON CONFLICT (section, lang) DO UPDATE SET content = $1, updated_at = now()`,
        [JSON.stringify(merged)]
      );
      console.log(`✅ UA: added ${toAdd.length} pages: ${toAdd.map(p => p.slug).join(", ")}`);
    } else {
      console.log("ℹ️  UA: all pages already exist, skipping");
    }

    // Update UA footer links
    const { rows: fRows } = await pool.query("SELECT content FROM site_content_i18n WHERE section = 'footer' AND lang = 'ua'");
    const uaFooter = fRows[0]?.content ?? {};
    uaFooter.footerLinks = FOOTER_LINKS.ua;
    await pool.query(
      `INSERT INTO site_content_i18n (section, lang, content, updated_at)
       VALUES ('footer', 'ua', $1, now())
       ON CONFLICT (section, lang) DO UPDATE SET content = $1, updated_at = now()`,
      [JSON.stringify(uaFooter)]
    );
    console.log("✅ UA: footer links updated");
  }

  console.log("\nDone!");
  await pool.end();
}

run().catch(err => { console.error(err); process.exit(1); });
