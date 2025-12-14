"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

export default function Navigation() {
    const t = useTranslations('Navigation');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: t('news'), href: "#news" },
        { name: t('about'), href: "#about" },
        { name: t('movie'), href: "#movie" },
        { name: t('gallery'), href: "#gallery" },
        { name: t('goods'), href: "#goods" },
        { name: t('models'), href: "#models" },
        { name: t('history'), href: "#history" },
        { name: t('contact'), href: "#contact" },
    ];

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'ja', label: 'JP' },
        { code: 'zh', label: 'ZH' },
        { code: 'ko', label: 'KO' },
    ];

    const switchLanguage = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between",
                    isScrolled ? "bg-black/50 backdrop-blur-md border-b border-white/10" : "bg-transparent"
                )}
            >
                <Link href="/" className="text-2xl font-serif font-bold tracking-tighter z-50 relative text-[#ffc0cb]">
                    LOVE SEA
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm uppercase tracking-widest text-[#ffc0cb] hover:text-white transition-colors duration-300"
                        >
                            {item.name}
                        </a>
                    ))}

                    {/* Language Switcher */}
                    <div className="flex items-center gap-3 ml-4 border-l border-white/20 pl-4">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => switchLanguage(lang.code)}
                                className={cn(
                                    "text-xs font-bold transition-colors duration-300",
                                    locale === lang.code ? "text-white" : "text-gray-500 hover:text-white"
                                )}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-end gap-1.5"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <motion.span
                        animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        className="w-8 h-0.5 bg-white block"
                    />
                    <motion.span
                        animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-6 h-0.5 bg-white block"
                    />
                    <motion.span
                        animate={isMobileMenuOpen ? { rotate: -45, y: -6, width: "2rem" } : { rotate: 0, y: 0, width: "1.5rem" }}
                        className="h-0.5 bg-white block"
                    />
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-3xl font-serif text-[#ffc0cb] hover:text-white transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}

                            {/* Mobile Language Switcher */}
                            <div className="flex items-center gap-6 mt-8">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            switchLanguage(lang.code);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={cn(
                                            "text-lg font-bold transition-colors duration-300",
                                            locale === lang.code ? "text-white" : "text-gray-500"
                                        )}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
