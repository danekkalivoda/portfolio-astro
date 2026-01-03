export interface IProject {
    title: string;
    description: string;
    images: string[];
    categories: string[];
}

export interface ISkill {
    name: string;
    category: string;
    years: number;
    icon?: string;
    iconColor?: string;
}

export interface ITestimonial {
    name: string;
    role?: string;
    company: string;
    quote: string;
}

export interface INavigation {
    projects: string;
    services: string;
    clients: string;
    contact: string;
}

export interface IHero {
    greeting: string;
    title: string;
    description: string;
}

export interface ISectionHeading {
    projects: {
        title: string;
        subtitle: string;
        description: string;
        buttonText: string;
    };
    services: {
        title: string;
        subtitle: string;
        description: string;
        buttonText: string;
    };
    clients: {
        title: string;
        subtitle: string;
        description: string;
        buttonText: string;
    };
    contact: {
        title: string;
        subtitle: string;
        description: string;
    };
}

export interface IContactForm {
    labels: {
        name: string;
        email: string;
        phone: string;
        service: string;
        requirements: string;
        address: string;
        addressValue: string;
        emailLabel: string;
    };
    placeholders: {
        service: string;
    };
    services: {
        webDesign: string;
        uiUxDesign: string;
        frontendDevelopment: string;
        mobileApp: string;
        consulting: string;
        other: string;
    };
    buttons: {
        submit: string;
        submitting: string;
        sendAnother: string;
    };
    messages: {
        successTitle: string;
        successDescription: string;
        errorDescription: string;
    };
    honeypot: string;
}

export interface IFooter {
    copyright: string;
    vibeCoded: string;
    codepenDemos: string;
}

export interface IMeta {
    title: string;
    description: string;
    locale: string;
}

export interface ITranslations {
    navigation: INavigation;
    hero: IHero;
    sectionHeadings: ISectionHeading;
    projects: IProject[];
    skills: ISkill[];
    testimonials: ITestimonial[];
    contactForm: IContactForm;
    footer: IFooter;
    meta: IMeta;
}

export type Locale = 'cs' | 'en';
