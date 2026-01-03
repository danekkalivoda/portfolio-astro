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

export const en: ITranslations = {
    navigation: {
        projects: 'Projects',
        services: 'Services',
        clients: 'Clients',
        contact: 'Contact',
    },
    hero: {
        greeting: 'Hi, I\'m <span class="text-white">Daniel Kalivoda</span>.',
        title: 'Designer & Developer',
        description: '<span class="text-white">15+ years of experience</span> in design and development. <span class="text-white">TypeScript-first approach</span>, component development in <span class="text-white">Storybook</span>, and <span class="text-white">AI tools</span> enable me to deliver quality, maintainable, and accessible products.',
    },
    sectionHeadings: {
        projects: {
            title: 'Projects',
            subtitle: 'Selected projects from real-world production.',
            description: 'I work on long-term digital products used daily by thousands of users. I participate in architecture design, development, and visual aspects of applications – from initial prototypes to scaling finished solutions. Most projects are confidential or part of long-term collaborations, so I only showcase selected examples here.',
            buttonText: 'Contact me',
        },
        services: {
            title: 'Services',
            subtitle: 'What I can help you build.',
            description: 'I help companies and teams design and develop modern web applications – technically clean, visually thoughtful, and prepared for long-term growth. I\'m not "just a developer". I think about the product, users, and how the application will evolve in one year or three.',
            buttonText: 'Contact me',
        },
        clients: {
            title: 'Clients',
            subtitle: 'Collaboration built on trust.',
            description: 'I collaborate with small teams and larger companies where quality, stability, and long-term product development are priorities.',
            buttonText: 'Contact me',
        },
        contact: {
            title: 'Contact',
            subtitle: 'I\'d be happy to take a look.',
            description: 'I\'d love to hear what you\'re working on. No commitment, straight to the point, and without unnecessary fluff. We\'ll quickly figure out if we have something to offer each other.',
        },
    },
    projects: [
        {
            title: 'Recruitis.io',
            description: 'Vue 3 application with TypeScript and Tailwind CSS, developed in Storybook. Building a design system and UI components for an ATS used by hundreds of companies to manage recruitment processes.',
            images: ['/recruitis-1.webp', '/recruitis-2.webp', '/recruitis-3.webp'],
            categories: ['SaaS', 'Design System', 'Vue.js'],
        },
        {
            title: 'Lékárna.cz',
            description: 'Long-term collaboration on the first online pharmacy in the Czech Republic. Designing and implementing UI for e-commerce with 30,000+ products, mobile app, and pharmaceutical consulting expansion.',
            images: ['/lekarna-1.webp', '/lekarna-2.webp', '/lekarna-3.webp'],
            categories: ['E-commerce', 'UX Design', 'Mobile App'],
        },
        {
            title: 'Floweye',
            description: 'Low-code platform for workflow management. Creating UI components and dashboards for managing company processes from tasks to vacation management in a cloud SaaS environment.',
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
            quote: 'Dan is an exceptionally strong frontend developer with a clear technological edge. He constantly follows industry developments and as an early adopter can very quickly convert new technologies into real, usable solutions. He excels in high work discipline, drive for results, and willingness to take full responsibility for assigned project parts. He sees self-study as an integral part of work and solves technical problems systematically, without looking for excuses. If you\'re looking for a developer who consistently delivers quality, keeps pace with technologies, and moves the project forward, Dan is a very strong choice.',
        },
        {
            name: 'Michal David',
            role: 'Software Team Lead',
            company: 'ISP Alliance a.s.',
            quote: 'Dan is goal-oriented and clearly enjoys what he does. Before proposing anything, he listens and asks questions. Who will use it, how will they use it, what\'s most important in what we show users, etc. He never forces anything we have doubts about. He\'s very empathetic but won\'t let himself be pushed into any "mess". He works with us on a rather complex and unconventional project where he must piece together a puzzle of many disparate design components that the end user assembles at will, and it still has to look presentable. He simply knows how to do it, designs very modern and clean things. He\'s very fast and uses excellent equipment. He joined our project only in the last third, which I regret very much, because if he had been with us from the beginning, he would have saved us a lot of money and time. Anyone who doesn\'t seek any compromise in quality will be satisfied with Dan.',
        },
        {
            name: 'Milan "Felix" Šulc',
            company: 'f3l1x.io',
            quote: 'I\'m happy when I can collaborate with Dan on interesting projects.',
        },
        {
            name: 'Monika Dostálková',
            role: 'PR Manager',
            company: 'netpromotion group s.r.o.',
            quote: 'Regular long-term collaboration without reservations. From my position, I appreciate fast and quality work without unnecessary questions, delivered in tight deadlines. Willingness to listen, adapt to last-minute changes in assignment, and even though remotely and online, it seems to be done with a smile :-).',
        },
    ],
    contactForm: {
        labels: {
            name: 'NAME',
            email: 'EMAIL',
            phone: 'PHONE',
            service: 'WHAT SERVICE DO YOU NEED',
            requirements: 'DESCRIBE YOUR PROJECT',
            address: 'ADDRESS',
            addressValue: 'Pardubice, Czech Republic',
            emailLabel: 'EMAIL',
        },
        placeholders: {
            service: 'Select service',
        },
        services: {
            webDesign: 'Web Design',
            uiUxDesign: 'UI/UX Design',
            frontendDevelopment: 'Frontend Development',
            mobileApp: 'Mobile App',
            consulting: 'Consulting',
            other: 'Other',
        },
        buttons: {
            submit: 'SUBMIT',
            submitting: 'Submitting...',
            sendAnother: 'Send another message',
        },
        messages: {
            successTitle: 'Message sent',
            successDescription: 'Thank you for your interest. Your message has been successfully sent and I will get back to you soon.',
            errorDescription: 'Check your internet connection and try again.',
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
        description: 'Front-end developer with 15+ years of experience. TypeScript-first development, Storybook components, and production applications in Vue 3 and React.',
        locale: 'en_US',
    },
};
