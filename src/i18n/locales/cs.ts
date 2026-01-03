import type { ITranslations } from '../types';

// Tabler Icons SVG markup (outline, 24x24, stroke="currentColor")
const icons = {
    vue: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-vue size-full"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.5 4l-4.5 8l-4.5 -8" /><path d="M3 4l9 16l9 -16" /></svg>`,
    react: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-react size-full"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" /><path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" /><path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" /><path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" /><path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" /><path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" /><path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" /></svg>`,
    typescript: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-typescript size-full"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5" /><path d="M9 12h4" /><path d="M11 12v6" /><path d="M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2z" /></svg>`,
    tailwind: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-tailwind size-full"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z" /></svg>`,
    storybook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-storybook size-full"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4l.5 16.5l13.5 .5v-18z" /><path d="M9 15c.6 1.5 1.639 2 3.283 2h-.283c1.8 0 3 -.974 3 -2.435c0 -1.194 -.831 -1.799 -2.147 -2.333l-1.975 -.802c-1.15 -.467 -1.878 -1.422 -1.878 -2.467c0 -.97 .899 -1.786 2.087 -1.893l.613 -.055c1.528 -.138 3 .762 3.3 1.985" /><path d="M16 3.5v1" /></svg>`,
    openai: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-openai size-full"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.217 19.384a3.501 3.501 0 0 0 6.783 -1.217v-5.167l-6 -3.35" /><path d="M5.214 15.014a3.501 3.501 0 0 0 4.446 5.266l4.34 -2.534v-6.946" /><path d="M6 7.63c-1.391 -.236 -2.787 .395 -3.534 1.689a3.474 3.474 0 0 0 1.271 4.745l4.263 2.514l6 -3.348" /><path d="M12.783 4.616a3.501 3.501 0 0 0 -6.783 1.217v5.067l6 3.45" /><path d="M18.786 8.986a3.501 3.501 0 0 0 -4.446 -5.266l-4.34 2.534v6.946" /><path d="M18 16.302c1.391 .236 2.787 -.395 3.534 -1.689a3.474 3.474 0 0 0 -1.271 -4.745l-4.308 -2.514l-5.955 3.42" /></svg>`,
    figma: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-figma size-full"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6 3m0 3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v0a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3z" /><path d="M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3v-15" /></svg>`,
    astro: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-brand-astro size-full"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.972 3.483c.163 .196 .247 .46 .413 .987l3.64 11.53a15.5 15.5 0 0 0 -4.352 -1.42l-2.37 -7.723a.31 .31 0 0 0 -.296 -.213a.31 .31 0 0 0 -.295 .214l-2.342 7.718a15.5 15.5 0 0 0 -4.37 1.422l3.657 -11.53c.168 -.527 .251 -.79 .415 -.986c.144 -.172 .331 -.306 .544 -.388c.242 -.094 .527 -.094 1.099 -.094h2.612c.572 0 .858 0 1.1 .094c.213 .082 .4 .217 .545 .39" /><path d="M9 18c0 1.5 2 3 3 4c1 -1 3 -3 3 -4q -3 1.5 -6 0" /></svg>`,
};

// Icon colors - hex values for brand accuracy
const iconColors: Record<string, string> = {
    vue: '#4FC08D',
    react: '#61DAFB',
    typescript: '#3178C6',
    tailwind: '#06B6D4',
    storybook: '#FF4785',
    openai: '#FFFFFF',
    figma: '#A259FF',
    astro: '#FF5D01',
};

export const cs: ITranslations = {
    navigation: {
        projects: 'Projekty',
        services: 'Služby',
        clients: 'Klienti',
        contact: 'Kontakt',
    },
    hero: {
        greeting: 'Ahoj, jsem <span class="text-white">Daniel Kalivoda</span>.',
        title: 'Designer & Developer',
        description: '<span class="text-white">15+ let zkušeností</span> s designem i vývojem. <span class="text-white">TypeScript-first přístup</span>, komponentový vývoj ve <span class="text-white">Storybooku</span> a <span class="text-white">AI nástroje</span> mi umožňují dodávat kvalitní, udržitelné a přístupné produkty.',
    },
    sectionHeadings: {
        projects: {
            title: 'Projekty',
            subtitle: 'Vybrané projekty z reálného provozu.',
            description: 'Pracuji na dlouhodobých digitálních produktech, které denně používají tisíce uživatelů. Podílím se na návrhu architektury, vývoji i vizuální stránce aplikací – od prvních prototypů až po škálování hotového řešení. Většina projektů je neveřejná nebo vzniká v rámci dlouhodobé spolupráce, proto zde ukazuji jen vybrané ukázky.',
            buttonText: 'Napište mi',
        },
        services: {
            title: 'Služby',
            subtitle: 'Co vám mohu pomoci postavit.',
            description: 'Pomáhám firmám a týmům navrhovat a vyvíjet moderní webové aplikace – technicky čisté, vizuálně promyšlené a připravené na dlouhodobý rozvoj. Nejsem „jen vývojář". Přemýšlím nad produktem, uživateli i tím, jak se bude aplikace vyvíjet za rok nebo za tři.',
            buttonText: 'Napište mi',
        },
        clients: {
            title: 'Klienti',
            subtitle: 'Spolupráce postavená na důvěře.',
            description: 'Spolupracuji s menšími týmy i většími firmami, kde je kladen důraz na kvalitu, stabilitu a dlouhodobý rozvoj produktu.',
            buttonText: 'Napište mi',
        },
        contact: {
            title: 'Kontakt',
            subtitle: 'Rád se na to podívám.',
            description: 'Rád si poslechnu, na čem pracujete. Nezávazně, rovnou k věci a bez zbytečné omáčky. Rychle poznáme, jestli si máme co nabídnout.',
        },
    },
    projects: [
        {
            title: 'Recruitis.io',
            description: 'Vue 3 aplikace s TypeScript a Tailwind CSS, kterou vyvíjím ve Storybooku. Buduju design systém a UI komponenty pro ATS používaný stovkami firem k řízení náborových procesů.',
            images: ['/recruitis-1.webp', '/recruitis-2.webp', '/recruitis-3.webp'],
            categories: ['SaaS', 'Design System', 'Vue.js'],
        },
        {
            title: 'Lékárna.cz',
            description: 'Dlouhodobá spolupráce na první internetové lékárně v ČR. Navrhuji a implementuji UI pro e-commerce s 30 000+ produkty, mobilní aplikaci a rozšíření o farmaceutické poradenství.',
            images: ['/lekarna-1.webp', '/lekarna-2.webp', '/lekarna-3.webp'],
            categories: ['E-commerce', 'UX Design', 'Mobile App'],
        },
        {
            title: 'Floweye',
            description: 'Low-code platforma pro workflow management. Tvořím UI komponenty a dashboardy pro správu firemních procesů od úkolů po řízení dovolených v cloudovém SaaS prostředí.',
            images: ['/floweye-1.webp', '/floweye-2.webp', '/floweye-3.webp'],
            categories: ['SaaS', 'Low-code', 'Dashboard'],
        },
    ],
    skills: [
        { name: 'Vue', category: 'JavaScript Framework', years: 8, icon: icons.vue, iconColor: iconColors.vue },
        { name: 'React', category: 'JavaScript Library', years: 4, icon: icons.react, iconColor: iconColors.react },
        { name: 'TypeScript', category: 'Programming Language', years: 5, icon: icons.typescript, iconColor: iconColors.typescript },
        { name: 'Tailwind CSS', category: 'CSS Framework', years: 5, icon: icons.tailwind, iconColor: iconColors.tailwind },
        { name: 'Storybook', category: 'Component Dev', years: 3, icon: icons.storybook, iconColor: iconColors.storybook },
        { name: 'AI Tools', category: 'AI Assistant & Agents', years: 2, icon: icons.openai, iconColor: iconColors.openai },
        { name: 'Figma', category: 'Design Tool', years: 5, icon: icons.figma, iconColor: iconColors.figma },
        { name: 'Astro', category: 'Web Framework', years: 2, icon: icons.astro, iconColor: iconColors.astro },
    ],
    testimonials: [
        {
            name: 'Marek Feuermann',
            company: 'Enterprise Systems s.r.o.',
            quote: 'Dan je mimořádně silný frontend developer s jasným technologickým náskokem. Neustále sleduje vývoj v oboru a jako early adopter dokáže nové technologie velmi rychle převést do reálně použitelných řešení. Vyniká vysokou pracovní disciplínou, tahem na výsledek a ochotou převzít plnou odpovědnost za svěřené části projektu. Samostudium bere jako nedílnou součást práce a technické problémy řeší systematicky, bez hledání výmluv. Pokud hledáte vývojáře, který dlouhodobě dodává kvalitu, drží krok s technologiemi a posouvá projekt dopředu Dan je velmi silná volba.',
        },
        {
            name: 'Michal David',
            role: 'vedoucí pracovní skupin SW',
            company: 'ISP Alliance a.s.',
            quote: 'Dan má tah na bránu a evidentně ho baví to, co dělá. Než něco navrhne, tak poslouchá a ptá se. Kdo to bude používat, jak to bude používat, co je nejdůležitější z toho co ukazujeme uživateli, atd. Nikdy nám nevnucuje to, kde máme nějaké pochybnosti. Je velmi empatický, ale nenechá se vtlačit do žádné "čuňárny". S námi spolupracuje na poměrně komplexním a netradičním projektu, kde musí dát dohromady skládačku z mnoha nesourodých designových komponent, které si konečný uživatel poskladá dle své vůle a pořád to musí vypadat k světu. On to prostě umí, navrhuje velmi moderní a čisté věci. Je velmi rychlý a používá velmi dobré vybavení. K našemu projektu přišel až na poslední třetinu, což je mi velmi líto, protože kdyby s námi byl od začátku, tak nám ušetřil spoustu peněz a času. S Danem bude spokojený každý, kdo nehledá žádný kompromis v oblasti kvality.',
        },
        {
            name: 'Milan "Felix" Šulc',
            company: 'f3l1x.io',
            quote: 'Mám radost, když mohu s Dankem spolupracovat na zajímavých projektech.',
        },
        {
            name: 'Monika Dostálková',
            role: 'PR manažer',
            company: 'netpromotion group s.r.o.',
            quote: 'Pravidelná dlouholetá spolupráce bez výhrad. Ze své pozice oceňuji rychlou a kvalitní práci bez zbytečných otázek dodanou v náročných termínech. Ochotu poslouchat, přizpůsobit se na poslední chvíli změnám zadání a byť na dálku a on-line, vypadá to, že s úsměvem :-).',
        },
    ],
    contactForm: {
        labels: {
            name: 'JMÉNO',
            email: 'E-MAIL',
            phone: 'TELEFON',
            service: 'JAKOU SLUŽBU POTŘEBUJETE',
            requirements: 'POPIŠTE VÁŠ PROJEKT',
            address: 'ADRESA',
            addressValue: 'Pardubice, Česká republika',
            emailLabel: 'E-MAIL',
        },
        placeholders: {
            service: 'Vyberte službu',
        },
        services: {
            webDesign: 'Web Design',
            uiUxDesign: 'UI/UX Design',
            frontendDevelopment: 'Frontend Development',
            mobileApp: 'Mobilní aplikace',
            consulting: 'Konzultace',
            other: 'Jiné',
        },
        buttons: {
            submit: 'ODESLAT',
            submitting: 'Odesílám...',
            sendAnother: 'Odeslat další zprávu',
        },
        messages: {
            successTitle: 'Zpráva odeslána',
            successDescription: 'Děkuji za váš zájem. Vaše zpráva byla úspěšně odeslána a brzy se vám ozvu.',
            errorDescription: 'Zkontrolujte připojení k internetu a zkuste to znovu.',
        },
        honeypot: 'Don\'t fill this out if you\'re human:',
    },
    footer: {
        copyright: new Date().getFullYear().toString(),
        vibeCoded: 'Vibe coded with',
        codepenDemos: 'Codepen demos from',
    },
    meta: {
        title: 'Daniel Kalivoda - Front-End Engineer & UI/UX Designer',
        description: 'Front-end vývojář s 15+ lety zkušeností. TypeScript-first development, komponenty ve Storybooku a produkční aplikace ve Vue 3 a Reactu.',
        locale: 'cs_CZ',
    },
};
