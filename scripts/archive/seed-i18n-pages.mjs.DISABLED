/**
 * Seed EN and UA translations for all custom pages into site_content_i18n.
 * Run: node scripts/seed-i18n-pages.mjs
 */

import pg from "pg";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dir, "../.env.local"), "utf8");
const dbUrl = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim();
if (!dbUrl) { console.error("DATABASE_URL not found"); process.exit(1); }

const pool = new pg.Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

// ─── EN PAGES ────────────────────────────────────────────────────────────────

const EN_PAGES = [
  {
    id: "1775802598792",
    slug: "o-mne",
    title: "About me",
    blocks: [
      { id: "1775802642259", type: "heading", align: "left", level: "h2", content: "A great heading" },
      {
        id: "1775813022564", type: "hero-section", align: "center",
        bgColor: "linear-gradient(135deg,#40accd,#2e8fa8)",
        content: "Your Hero Heading", ctaHref: "#", ctaText: "Find out more", subtitle: "Section subtitle",
      },
      {
        id: "1775813036930", type: "two-col", imageLeft: true,
        twoColText: "<p>Section description text.</p>",
        twoColTitle: "Section heading", twoColBtnHref: "#", twoColBtnText: "Read more",
      },
    ],
  },
  {
    id: "seed-about-1777390679954",
    slug: "about",
    title: "About me",
    blocks: [
      {
        id: "about-two-col-1777394369079", type: "two-col", imageLeft: false,
        twoColImage: "/images/astera-about-home.png",
        twoColTitle: "About me",
        twoColBtnHref: "/en/services",
        twoColBtnText: "View services",
        twoColText: `<p>Welcome to my website!</p>
<p>My spiritual name is Astera and I focus on readings and counselling, where I combine my knowledge, experience and gifts with years of practice.</p>
<p>I'll be happy to help you gain perspective in various life situations, or in moments when it feels like nothing is moving forward and you need a new impulse…</p>
<p>I work with Tarot, Oracles and other systems. I use clairvoyance, channelling and other extrasensory perceptions and abilities to help guide your path towards something better!</p>
<p>We don't always get answers to everything, but we can discover a new perspective and look at our own life as a rich and meaningful journey. Sometimes it needs illuminating, other times you need to pick up a map or choose a different direction.</p>
<p>As an experienced guide, I'll be happy to help you along this path. You can read more about my services <a href="/en/services" style="color:#7c3bb2;text-decoration:underline;font-weight:700;">here</a>, or book a <a href="https://app.rezora.cz/book/astera" style="color:#7c3bb2;text-decoration:underline;font-weight:700;">consultation</a> right away. If you prefer working independently, explore my <a href="https://shop.asteralight.cz" style="color:#7c3bb2;text-decoration:underline;font-weight:700;">e-shop</a> where you'll find everything you need including guides.</p>
<p>With love, Astera ✨</p>`,
      },
      { id: "about-text-1777394369079", type: "text", align: "left", content: "<p><br></p>" },
    ],
  },
  {
    id: "seed-services-1777390679954",
    slug: "sluzby",
    title: "Services",
    blocks: [
      {
        id: "services-intro-1777394369079", type: "two-col", imageLeft: true,
        twoColImage: "/images/astera-about-home.png",
        twoColTitle: "Service overview",
        twoColBtnHref: "mailto:info@asteralight.cz?subject=I+want+to+book+a+space+cleansing",
        twoColBtnText: "I want to book!",
        twoColText: `<h2>Find answers, calm and direction</h2>
<p>A space for deep work that helps you find your bearings, release what holds you back and reconnect with yourself.</p>
<p>I work individually, sensitively and with an emphasis on quality — every session and service is unique.</p>
<p>👉 <strong>Book a consultation</strong></p><hr>
<h2>Services</h2>
<h3>Card Reading</h3>
<p>Looking for answers, direction or reassurance in an important life situation? A card reading will help you see beneath the surface and gain a clearer view of what is happening now.</p>
<p>Enter a space where time slows and answers arrive at just the right moment.</p>
<h4>How a reading works</h4>
<p>Each session is entirely individual and I work with a limited number of clients to preserve the highest quality. I primarily use Tarot, complemented by oracle cards, runes and other tools.</p>
<h4>Reading formats</h4>
<ul><li><strong>Online live (60–90 min)</strong> — CZK 3,600</li><li><strong>Video message (private link)</strong> — CZK 2,600</li><li><strong>Text/email with photos</strong> — CZK 1,200</li></ul>
<h4>In-person session in Prague</h4>
<p>For existing clients only. Combines reading, counselling, channelling and energetic harmonisation.</p>
<p><strong>Price: CZK 5,900</strong></p><p>👉 <strong>Book a reading</strong></p><hr>
<h3>Space Cleansing &amp; Energetic Harmonisation</h3>
<p>I help restore calm, lightness and a sense of safety to homes and workspaces.</p>
<h4>When is cleansing appropriate</h4>
<ul><li>when moving house</li><li>after a difficult period of life</li><li>after a long illness in the space</li><li>when experiencing restlessness or unexplained phenomena</li></ul>
<h4>Pricing (indicative)</h4>
<ul><li>Studio flat — CZK 3,900–4,900</li><li>1–2 bedroom up to 50 m² — CZK 5,900–7,900</li><li>3–5 bedroom up to 120 m² — CZK 8,900–13,900</li><li>Houses and independent buildings — CZK 14,900–29,900</li></ul>
<p>👉 <strong>Arrange a cleansing</strong></p><hr>
<h3>Custom Amulets &amp; Talismans</h3>
<p>A personal amulet or talisman is more than just an object — it carries intention, energy and conscious work on your path. Each piece is created individually.</p>
<h4>Amulet vs. Talisman</h4>
<ul><li><strong>Amulet</strong> — Protects, creates a shield, repels unwanted influences.</li><li><strong>Talisman</strong> — Strengthens what you want to develop, attracts desired energy and opportunities.</li></ul>
<p><strong>Custom amulet / talisman: CZK 4,400–19,900</strong></p>
<p>👉 <strong>Commission an amulet or talisman</strong></p><hr>`,
      },
      {
        id: "services-signs-1777394369079", type: "text", align: "left",
        content: `<p>Services include not only the work itself but also training and advice. I'll teach you simple and effective methods tailored specifically for you, so you'll only need me in exceptional situations!</p>`,
      },
      {
        id: "services-specific-1777394369079", type: "text", align: "left",
        content: `<h2>Specific cases</h2><p>I also work with spaces where a death has occurred, especially after a long and difficult illness. In such places an energetic imprint connected with pain or exhaustion may remain.</p><p>After treating the space it is possible to fully inhabit it again, rent it out or sell it — with a sense of calm and certainty.</p>`,
      },
      {
        id: "services-ethics-1777394369079", type: "text", align: "left",
        content: `<h2>Why work with me</h2>
<p>Every session and every piece of work I create comes from an individual approach, deep perception and respect for your situation.</p>
<p>This is not a one-size-fits-all solution, but targeted work with a real impact.</p>
<p>If you feel it's time to change, release or understand something, I'd be glad to guide you through that process.</p>
<p><strong>Mediumship Readings</strong><br>Unresolved relationships or the loss of a loved one can stay deep within us. A mediumship reading can help you find calm, understanding and closure.</p>
<p>I facilitate communication and insights that help you release emotions, resolve the unspoken and move forward.</p>
<p>Available as video, online session or in-person in Prague.<br>Flat price: <strong>CZK 3,600</strong></p>
<p><strong>Energetic Cleansing of a Person</strong><br>Gentle yet deep work that restores inner balance and releases what no longer serves.</p>
<p>Works remotely across five levels of being. The result is often relief, greater lightness and a return to oneself.</p>
<p>Price: <strong>CZK 3,300</strong></p>`,
      },
      { id: "services-price-1777394369079", type: "text", align: "left", content: "<h2><br></h2>" },
      {
        id: "services-consult-1777394369079", type: "text", align: "left",
        content: `<h2>Unsure or on a budget?</h2><p>If you're not sure which service suits you, or currently can't afford one, I also offer individual consultations where we assess exactly what you need to improve your quality of life, sense of fulfilment and calm.</p>`,
      },
      {
        id: "services-button-1777394369079", href: "mailto:info@asteralight.cz?subject=I+want+to+book",
        size: "lg", type: "button", align: "center", bgColor: "#7c3bb2",
        content: "I want to book!", textColor: "#fff",
      },
    ],
  },
  {
    id: "seed-consulting-1777390679954",
    slug: "konzultace",
    title: "Consultation",
    blocks: [
      {
        id: "consulting-two-col-1777390679954", type: "two-col", imageLeft: true,
        twoColImage: "/uploads/astera-upload-1777542744600-mjff29y2d1k.png",
        twoColTitle: "Individual approach",
        twoColBtnHref: "https://app.rezora.cz/book/astera",
        twoColBtnText: "Book a session",
        twoColText: `<p>A consultation is suitable if you need to sensitively discuss a space, a home situation or the next possible steps.</p><p>You can adjust the content, price and scope in the editor.</p>`,
      },
      {
        id: "consulting-button-1777390679954", href: "https://app.rezora.cz/book/astera",
        size: "md", type: "button", align: "center", bgColor: "#7c3bb2",
        content: "Book a session", textColor: "#fff",
      },
    ],
  },
  {
    id: "seed-e-shop-1777396023425",
    slug: "e-shop",
    title: "E-shop",
    blocks: [
      {
        id: "eshop-hero-1777396023425", type: "hero-section", align: "center",
        bgColor: "linear-gradient(135deg,#7c3bb2,#5f2a8d)",
        content: "E-shop", ctaHref: "/e-shop", ctaText: "Browse the selection",
        subtitle: "Gentle tools for working with intuition, cards and everyday calm.",
      },
      {
        id: "eshop-cards-1777396023425", type: "cards-grid",
        sectionTitle: "Choose what you need right now",
        cards: [
          { title: "Cards & Guidance", text: "Space for products that support intuition, self-reflection and calm decision-making.", image: "/images/astera-pick-card.png", btnHref: "/e-shop", btnText: "Edit selection" },
          { title: "Memberships & Programmes", text: "Space for online programmes, memberships or supporting materials.", image: "/images/Oracle-Circle.png", btnHref: "/e-shop", btnText: "Find out more" },
          { title: "Live Events", text: "Add upcoming dates for gatherings, workshops or webinars here.", image: "/images/408x410-OracleSecretsWebinar-Event-Promo.jpg", btnHref: "/akce", btnText: "View events" },
        ],
      },
    ],
  },
  {
    id: "seed-kniha-1777396023425",
    slug: "kniha",
    title: "Book",
    blocks: [
      {
        id: "book-two-col-1777396023425", type: "two-col", imageLeft: true,
        twoColImage: "/images/kniha-astera.png",
        twoColTitle: "Book & inspiration",
        twoColBtnHref: "/kniha", twoColBtnText: "Edit content",
        twoColText: `<p>Page for a book, workbooks or longer texts that help bring intuition into practical life.</p><p>You can add a description, excerpts, order links and related content here.</p>`,
      },
      {
        id: "book-text-1777396023425", type: "text", align: "left",
        content: `<h2>What can be here</h2><ul><li>book or upcoming material synopsis,</li><li>chapter excerpt,</li><li>link to purchase or pre-order,</li><li>supplementary guides and exercises.</li></ul>`,
      },
    ],
  },
  {
    id: "seed-navody-1777396023425",
    slug: "navody",
    title: "Guides",
    blocks: [
      {
        id: "guides-hero-1777396023425", type: "hero-section", align: "center",
        bgColor: "linear-gradient(135deg,#3b1d55,#7c3bb2)",
        content: "Guides", ctaHref: "/navody", ctaText: "Start reading",
        subtitle: "Practical steps for caring for your space, energy and inner setting.",
      },
      {
        id: "guides-cards-1777396023425", type: "cards-grid",
        sectionTitle: "Guide topics",
        cards: [
          { title: "Calm at home", text: "Simple methods for settling a space and returning lightness to it.", image: "/images/astera-about-home.png", btnHref: "/navody", btnText: "Edit" },
          { title: "Working with intuition", text: "Short exercises for clearer perception and decision-making.", image: "/images/astera-with-computer.jpg", btnHref: "/navody", btnText: "Edit" },
          { title: "Cards & symbols", text: "Inspiration for working with cards, questions and personal insight.", image: "/images/astera-pick-card.png", btnHref: "/navody", btnText: "Edit" },
        ],
      },
    ],
  },
  {
    id: "seed-akce-1777396023425",
    slug: "akce",
    title: "Events",
    blocks: [
      {
        id: "events-two-col-1777396023425", type: "two-col", imageLeft: false,
        twoColImage: "/images/408x410-OracleSecretsWebinar-Event-Promo.jpg",
        twoColTitle: "Events & gatherings",
        twoColBtnHref: "/akce", twoColBtnText: "I want to register",
        twoColText: `<p>Space for live events, online webinars, group gatherings and themed programmes.</p><p>Add the date, capacity, price, registration link and everything the visitor needs to know before signing up.</p>`,
      },
      {
        id: "events-text-1777396023425", type: "text", align: "left",
        content: `<h2>Upcoming programme</h2><p>List the nearest dates here, add a description of the event and add further blocks as needed.</p>`,
      },
    ],
  },
  {
    id: "seed-jak-podekovat-1777396023425",
    slug: "jak-podekovat",
    title: "How to say thank you",
    blocks: [
      {
        id: "thanks-hero-1777396023425", type: "hero-section", align: "center",
        bgColor: "linear-gradient(135deg,#7c3bb2,#b88a35)",
        content: "How to say thank you", ctaHref: "/jak-podekovat", ctaText: "Choose a way",
        subtitle: "If Astera's work has helped you, you can express your support in a way that feels right to you.",
      },
      {
        id: "thanks-text-1777396023425", type: "text", align: "left",
        content: `<h2>Ways to support</h2><p>Here you can add thanks, a recommendation, a review, sharing the work or a voluntary contribution.</p><ul><li>write feedback,</li><li>recommend the services,</li><li>share content that helped you,</li><li>support the creation of more work.</li></ul>`,
      },
    ],
  },
];

// ─── UA PAGES ────────────────────────────────────────────────────────────────

const UA_PAGES = [
  {
    id: "1775802598792",
    slug: "o-mne",
    title: "Про мене",
    blocks: [
      { id: "1775802642259", type: "heading", align: "left", level: "h2", content: "Чудовий заголовок" },
      {
        id: "1775813022564", type: "hero-section", align: "center",
        bgColor: "linear-gradient(135deg,#40accd,#2e8fa8)",
        content: "Ваш головний заголовок", ctaHref: "#", ctaText: "Дізнатися більше", subtitle: "Підзаголовок секції",
      },
      {
        id: "1775813036930", type: "two-col", imageLeft: true,
        twoColText: "<p>Опис секції.</p>",
        twoColTitle: "Заголовок секції", twoColBtnHref: "#", twoColBtnText: "Читати далі",
      },
    ],
  },
  {
    id: "seed-about-1777390679954",
    slug: "about",
    title: "Про мене",
    blocks: [
      {
        id: "about-two-col-1777394369079", type: "two-col", imageLeft: false,
        twoColImage: "/images/astera-about-home.png",
        twoColTitle: "Про мене",
        twoColBtnHref: "/ua/posluhy",
        twoColBtnText: "Переглянути послуги",
        twoColText: `<p>Ласкаво прошу на мій сайт!</p>
<p>Моє духовне ім'я — Астера, і я займаюся читанням і консультуванням, де поєдную свої знання, досвід і дари з багаторічною практикою.</p>
<p>Я рада допомогти вам отримати нову перспективу в різних життєвих ситуаціях, або в моменти, коли здається, що нічого не рухається вперед і вам потрібен новий імпульс…</p>
<p>Я працюю з Таро, Оракулами та іншими системами. Використовую ясновидіння, ченнелінг та інші екстрасенсорні здібності, щоб допомогти направити ваш шлях до кращого!</p>
<p>Ми не завжди отримуємо відповіді на всі питання, але можемо відкрити нову перспективу і побачити власне життя як багатий і наповнений сенсом шлях. Іноді потрібно його освітити, іноді взяти карту або вибрати інший напрямок.</p>
<p>Як досвідчений провідник, я рада допомогти вам на цьому шляху. Більше про мої послуги ви можете прочитати <a href="/ua/posluhy" style="color:#7c3bb2;text-decoration:underline;font-weight:700;">тут</a>, або одразу домовтеся про <a href="https://app.rezora.cz/book/astera" style="color:#7c3bb2;text-decoration:underline;font-weight:700;">консультацію</a>. Якщо ви віддаєте перевагу самостійній роботі, ознайомтеся з пропозицією в моєму <a href="https://shop.asteralight.cz" style="color:#7c3bb2;text-decoration:underline;font-weight:700;">е-магазині</a>, де знайдете все необхідне, включаючи посібники.</p>
<p>З любов'ю, Астера ✨</p>`,
      },
      { id: "about-text-1777394369079", type: "text", align: "left", content: "<p><br></p>" },
    ],
  },
  {
    id: "seed-services-1777390679954",
    slug: "sluzby",
    title: "Послуги",
    blocks: [
      {
        id: "services-intro-1777394369079", type: "two-col", imageLeft: true,
        twoColImage: "/images/astera-about-home.png",
        twoColTitle: "Перелік послуг",
        twoColBtnHref: "mailto:info@asteralight.cz?subject=Хочу+записатися",
        twoColBtnText: "Хочу записатися!",
        twoColText: `<h2>Знайдіть відповіді, спокій і напрям</h2>
<p>Простір для глибокої роботи, яка допоможе вам зорієнтуватися в житті, звільнити те, що вас стримує, і знову з'єднатися із собою.</p>
<p>Я працюю індивідуально, чутливо і з акцентом на якість — кожна зустріч і послуга унікальні.</p>
<p>👉 <strong>Записатися на консультацію</strong></p><hr>
<h2>Послуги</h2>
<h3>Читання карт</h3>
<p>Шукаєте відповіді, напрям або підтвердження у важливій життєвій ситуації? Читання карт допоможе зазирнути під поверхню і отримати ясніший погляд на те, що відбувається зараз.</p>
<p>Увійдіть у простір, де час сповільнюється, а відповіді приходять у потрібний момент.</p>
<h4>Як проходить читання</h4>
<p>Кожна сесія повністю індивідуальна, я працюю з обмеженою кількістю клієнтів. Переважно використовую Таро, доповнюючи оракулами, рунами та іншими інструментами.</p>
<h4>Формати читання</h4>
<ul><li><strong>Онлайн наживо (60–90 хв)</strong> — 3 600 крон</li><li><strong>Відеоповідомлення (приватне посилання)</strong> — 2 600 крон</li><li><strong>Текст/email з фото</strong> — 1 200 крон</li></ul>
<h4>Особиста зустріч у Празі</h4>
<p>Лише для постійних клієнтів. Поєднує читання, консультування, ченнелінг та енергетичну гармонізацію.</p>
<p><strong>Ціна: 5 900 крон</strong></p><p>👉 <strong>Записатися на читання</strong></p><hr>
<h3>Очищення простору та енергетична гармонізація</h3>
<p>Допомагаю повернути у будинки та робочі простори спокій, легкість і відчуття безпеки.</p>
<h4>Коли підходить очищення</h4>
<ul><li>при переїзді</li><li>після важких життєвих періодів</li><li>після тривалої хвороби в просторі</li><li>при відчутті неспокою або незрозумілих явищ</li></ul>
<h4>Орієнтовний прейскурант</h4>
<ul><li>Студія — 3 900–4 900 крон</li><li>1–2-кімнатна до 50 м² — 5 900–7 900 крон</li><li>3–5-кімнатна до 120 м² — 8 900–13 900 крон</li><li>Будинки та окремі об'єкти — 14 900–29 900 крон</li></ul>
<p>👉 <strong>Домовитися про очищення</strong></p><hr>
<h3>Амулети та талісмани на замовлення</h3>
<p>Особистий амулет або талісман — це більше ніж просто предмет. Це носій наміру, енергії та свідомої роботи. Кожен виріб створюється індивідуально.</p>
<h4>Різниця між амулетом і талісманом</h4>
<ul><li><strong>Амулет</strong> — Захищає, створює щит, відштовхує небажані впливи.</li><li><strong>Талісман</strong> — Підсилює те, що ви хочете розвивати, притягує бажану енергію та можливості.</li></ul>
<p><strong>Амулет / талісман на замовлення: 4 400–19 900 крон</strong></p>
<p>👉 <strong>Замовити амулет або талісман</strong></p><hr>`,
      },
      {
        id: "services-signs-1777394369079", type: "text", align: "left",
        content: `<p>Послуга включає не лише саму роботу, а й навчання й поради. Я навчу вас простих і ефективних методів, розроблених спеціально для вас, — тому ви будете потребувати мене лише у виняткових ситуаціях!</p>`,
      },
      {
        id: "services-specific-1777394369079", type: "text", align: "left",
        content: `<h2>Специфічні випадки</h2><p>Я також працюю з просторами, де сталась смерть, особливо після тривалої і важкої хвороби. У таких місцях може залишатися енергетичний слід, пов'язаний з болем чи виснаженням.</p><p>Після лікування простору його знову можна повноцінно заселити, здати в оренду або продати — з відчуттям спокою та впевненості.</p>`,
      },
      {
        id: "services-ethics-1777394369079", type: "text", align: "left",
        content: `<h2>Чому варто працювати зі мною</h2>
<p>Кожна зустріч і кожна створена річ виходить з індивідуального підходу, глибокого сприйняття і поваги до вашої ситуації.</p>
<p>Це не універсальне рішення, а цілеспрямована робота з реальним впливом.</p>
<p>Якщо ви відчуваєте, що настав час щось змінити, звільнити або зрозуміти, я з радістю проведу вас через цей процес.</p>
<p><strong>Медіумічні читання</strong><br>Незавершені стосунки або втрата близької людини можуть залишатися глибоко в нас. Медіумічне читання може допомогти знайти спокій, розуміння та завершеність.</p>
<p>Доступно у форматі відео, онлайн-зустрічі або особисто у Празі.<br>Єдина ціна: <strong>3 600 крон</strong></p>
<p><strong>Енергетичне очищення людини</strong><br>М'яка, але глибока робота, яка відновлює внутрішню рівновагу і звільняє те, що більше не служить.</p>
<p>Проходить дистанційно, на п'яти рівнях буття. Результат — відчуття полегшення, легкості та повернення до себе.</p>
<p>Ціна: <strong>3 300 крон</strong></p>`,
      },
      { id: "services-price-1777394369079", type: "text", align: "left", content: "<h2><br></h2>" },
      {
        id: "services-consult-1777394369079", type: "text", align: "left",
        content: `<h2>Не впевнені або обмежені в бюджеті?</h2><p>Якщо ви не впевнені, яка послуга вам підходить, або наразі не маєте змоги нею скористатися, я також пропоную індивідуальні консультації, де ми визначимо, що вам зараз потрібно для покращення якості життя, відчуття наповненості та спокою.</p>`,
      },
      {
        id: "services-button-1777394369079", href: "mailto:info@asteralight.cz?subject=Хочу+записатися",
        size: "lg", type: "button", align: "center", bgColor: "#7c3bb2",
        content: "Хочу записатися!", textColor: "#fff",
      },
    ],
  },
  {
    id: "seed-consulting-1777390679954",
    slug: "konzultace",
    title: "Консультація",
    blocks: [
      {
        id: "consulting-two-col-1777390679954", type: "two-col", imageLeft: true,
        twoColImage: "/uploads/astera-upload-1777542744600-mjff29y2d1k.png",
        twoColTitle: "Індивідуальний підхід",
        twoColBtnHref: "https://app.rezora.cz/book/astera",
        twoColBtnText: "Забронювати",
        twoColText: `<p>Консультація підходить, якщо вам потрібно чутливо обговорити простір, ситуацію вдома або можливі наступні кроки.</p><p>Зміст, ціну та обсяг можна довільно відредагувати.</p>`,
      },
      {
        id: "consulting-button-1777390679954", href: "https://app.rezora.cz/book/astera",
        size: "md", type: "button", align: "center", bgColor: "#7c3bb2",
        content: "Забронювати", textColor: "#fff",
      },
    ],
  },
  {
    id: "seed-e-shop-1777396023425",
    slug: "e-shop",
    title: "Е-магазин",
    blocks: [
      {
        id: "eshop-hero-1777396023425", type: "hero-section", align: "center",
        bgColor: "linear-gradient(135deg,#7c3bb2,#5f2a8d)",
        content: "Е-магазин", ctaHref: "/e-shop", ctaText: "Переглянути пропозиції",
        subtitle: "Ніжні інструменти для роботи з інтуїцією, картами та щоденним спокоєм.",
      },
      {
        id: "eshop-cards-1777396023425", type: "cards-grid",
        sectionTitle: "Оберіть те, що вам зараз потрібно",
        cards: [
          { title: "Карти та керівництво", text: "Простір для продуктів, що підтримують інтуїцію, саморефлексію та спокійне прийняття рішень.", image: "/images/astera-pick-card.png", btnHref: "/e-shop", btnText: "Редагувати" },
          { title: "Членство та програми", text: "Місце для онлайн-програм, членства або підтримуючих матеріалів.", image: "/images/Oracle-Circle.png", btnHref: "/e-shop", btnText: "Дізнатися більше" },
          { title: "Живі заходи", text: "Додайте сюди найближчі дати зустрічей, воркшопів або вебінарів.", image: "/images/408x410-OracleSecretsWebinar-Event-Promo.jpg", btnHref: "/akce", btnText: "Переглянути заходи" },
        ],
      },
    ],
  },
  {
    id: "seed-kniha-1777396023425",
    slug: "kniha",
    title: "Книга",
    blocks: [
      {
        id: "book-two-col-1777396023425", type: "two-col", imageLeft: true,
        twoColImage: "/images/kniha-astera.png",
        twoColTitle: "Книга та натхнення",
        twoColBtnHref: "/kniha", twoColBtnText: "Редагувати зміст",
        twoColText: `<p>Сторінка для книги, робочих матеріалів або глибших текстів, що допомагають перенести інтуїцію в практичне життя.</p><p>Тут можна додати анотацію, уривки, посилання на замовлення та пов'язаний контент.</p>`,
      },
      {
        id: "book-text-1777396023425", type: "text", align: "left",
        content: `<h2>Що тут може бути</h2><ul><li>анотація книги або матеріалу, що готується,</li><li>уривок з розділу,</li><li>посилання на купівлю або попереднє замовлення,</li><li>додаткові посібники та вправи.</li></ul>`,
      },
    ],
  },
  {
    id: "seed-navody-1777396023425",
    slug: "navody",
    title: "Посібники",
    blocks: [
      {
        id: "guides-hero-1777396023425", type: "hero-section", align: "center",
        bgColor: "linear-gradient(135deg,#3b1d55,#7c3bb2)",
        content: "Посібники", ctaHref: "/navody", ctaText: "Почати читати",
        subtitle: "Практичні кроки для догляду за простором, енергією та власним внутрішнім станом.",
      },
      {
        id: "guides-cards-1777396023425", type: "cards-grid",
        sectionTitle: "Теми посібників",
        cards: [
          { title: "Спокій вдома", text: "Прості методи для заспокоєння простору і повернення йому легкості.", image: "/images/astera-about-home.png", btnHref: "/navody", btnText: "Редагувати" },
          { title: "Робота з інтуїцією", text: "Короткі вправи для ясного сприйняття та прийняття рішень.", image: "/images/astera-with-computer.jpg", btnHref: "/navody", btnText: "Редагувати" },
          { title: "Карти та символи", text: "Натхнення для роботи з картами, питаннями та особистим прозрінням.", image: "/images/astera-pick-card.png", btnHref: "/navody", btnText: "Редагувати" },
        ],
      },
    ],
  },
  {
    id: "seed-akce-1777396023425",
    slug: "akce",
    title: "Заходи",
    blocks: [
      {
        id: "events-two-col-1777396023425", type: "two-col", imageLeft: false,
        twoColImage: "/images/408x410-OracleSecretsWebinar-Event-Promo.jpg",
        twoColTitle: "Заходи та зустрічі",
        twoColBtnHref: "/akce", twoColBtnText: "Хочу зареєструватися",
        twoColText: `<p>Простір для живих заходів, онлайн-вебінарів, групових зустрічей та тематичних програм.</p><p>Додайте дату, кількість місць, ціну, посилання на реєстрацію та все, що відвідувачу потрібно знати перед записом.</p>`,
      },
      {
        id: "events-text-1777396023425", type: "text", align: "left",
        content: `<h2>Поточна програма</h2><p>Тут можна перерахувати найближчі дати, додати опис заходу та за потреби вставити додаткові блоки.</p>`,
      },
    ],
  },
  {
    id: "seed-jak-podekovat-1777396023425",
    slug: "jak-podekovat",
    title: "Як подякувати",
    blocks: [
      {
        id: "thanks-hero-1777396023425", type: "hero-section", align: "center",
        bgColor: "linear-gradient(135deg,#7c3bb2,#b88a35)",
        content: "Як подякувати", ctaHref: "/jak-podekovat", ctaText: "Обрати спосіб",
        subtitle: "Якщо робота Астери вам допомогла, ви можете висловити свою підтримку способом, який вам близький.",
      },
      {
        id: "thanks-text-1777396023425", type: "text", align: "left",
        content: `<h2>Способи підтримки</h2><p>Сюди можна додати подяку, рекомендацію, відгук, поширення роботи або добровільний внесок.</p><ul><li>написати відгук,</li><li>порекомендувати послуги,</li><li>поділитися контентом, що вам допоміг,</li><li>підтримати створення нового контенту.</li></ul>`,
      },
    ],
  },
];

// ─── Insert ───────────────────────────────────────────────────────────────────

async function seed() {
  for (const [lang, pages] of [["en", EN_PAGES], ["ua", UA_PAGES]]) {
    await pool.query(
      `INSERT INTO site_content_i18n (section, lang, content, updated_at)
       VALUES ('pages', $1, $2, now())
       ON CONFLICT (section, lang)
       DO UPDATE SET content = $2, updated_at = now()`,
      [lang, JSON.stringify(pages)]
    );
    console.log(`✓ ${lang}: ${pages.length} pages saved`);
  }
  await pool.end();
  console.log("Done.");
}

seed().catch(e => { console.error(e); process.exit(1); });
