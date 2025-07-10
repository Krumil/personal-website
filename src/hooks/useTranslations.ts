import { useTranslations as useNextIntlTranslations, useLocale } from 'next-intl';

// Re-export useTranslations for easier importing
export { useTranslations as useT } from 'next-intl';

// Custom hook for common translations
export const useCommonTranslations = () => {
    const t = useNextIntlTranslations('common');
    const nav = useNextIntlTranslations('navigation');
    const locale = useLocale();

    return {
        common: t,
        nav,
        locale,
        isItalian: locale === 'it',
        isEnglish: locale === 'en'
    };
};

// Hook for chat/AI interface translations
export const useChatTranslations = () => {
    const chat = useNextIntlTranslations('chat');
    const suggestions = useNextIntlTranslations('suggestions');
    
    return {
        chat,
        suggestions
    };
};

// Hook for project-related translations
export const useProjectTranslations = () => {
    const projects = useNextIntlTranslations('projects');
    
    return {
        projects,
        ai: (key: string) => projects(`ai.${key}`),
        blockchain: (key: string) => projects(`blockchain.${key}`),
        fullstack: (key: string) => projects(`fullstack.${key}`)
    };
};

// Hook for contact form translations
export const useContactTranslations = () => {
    const contact = useNextIntlTranslations('contact');
    
    return {
        contact,
        form: (key: string) => contact(`form.${key}`),
        info: (key: string) => contact(`info.${key}`)
    };
};