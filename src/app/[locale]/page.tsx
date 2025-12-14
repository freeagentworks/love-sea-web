"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Card from "@/components/Card";
import { useTranslations } from "next-intl";

// Dynamic import for ThreeScene to avoid SSR issues with canvas
const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
    ssr: false,
});

// Dynamic import for ModelViewer to avoid SSR issues with canvas
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
    ssr: false,
});

const galleryImages = [
    "/images/DSC_7241.webp?v=2",
    "/images/DSC_7352.webp?v=2",
    "/images/DSC01428.webp?v=2",
    "/images/DSC01751.webp?v=2",
    "/images/DSC01845.webp?v=2",
    "/images/DSC01930.webp?v=2",
];

export default function Home() {
    const t = useTranslations();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="min-h-screen font-sans">
            <ThreeScene />

            {/* Hero Section */}
            <section className="relative h-[80vh] flex flex-col items-center justify-end pb-32 text-center px-4 overflow-hidden">
                {/* Watermark Image */}
                <div className="absolute inset-0 top-24 z-0 opacity-40">
                    <Image
                        src="/images/hero-watermark.webp"
                        alt="Background Watermark"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 text-7xl md:text-[11rem] font-bold tracking-tighter mb-4 font-serif bg-clip-text text-transparent bg-gradient-to-b from-[#ffc0cb] to-[#ff8da1]"
                >
                    {t('Hero.title')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="relative z-10 text-xl md:text-2xl text-gray-400 tracking-widest uppercase"
                >
                    {t('Hero.subtitle')}
                </motion.p>
            </section>

            {/* News Section */}
            <section id="news" className="py-20 px-4 md:px-20 max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-serif text-center mb-16">{t('News.title')}</h2>
                <div className="text-center text-gray-400">Coming Soon...</div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 md:px-20 max-w-6xl mx-auto">
                <Card className="flex flex-col md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/2 relative h-[500px] rounded-lg overflow-hidden bg-gray-800">
                        {/* Using one of the images as profile */}
                        <Image
                            src="/images/DSC01530.webp?v=2"
                            alt="Profile"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-4xl font-serif text-[#00ffcc]">{t('About.title')}</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {t('About.description1')}
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {t('About.description2')}
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div>
                                <h3 className="text-gray-500 uppercase text-sm">{t('About.specialSkill')}</h3>
                                <p className="text-xl">{t('About.specialSkillValue')}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 uppercase text-sm">{t('About.dance')}</h3>
                                <p className="text-xl">{t('About.danceValue')}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 uppercase text-sm">{t('About.status')}</h3>
                                <p className="text-xl">{t('About.statusValue')}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 uppercase text-sm">{t('About.interest')}</h3>
                                <p className="text-xl">{t('About.interestValue')}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Movie Section */}
            <section id="movie" className="relative z-10 py-20 px-4 md:px-20 max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-serif text-center mb-16">{t('Movie.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/n3LVoAyNZNg"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/Egy_CW-XRdE"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </section>
            {/* Gallery Section */}
            <section id="gallery" className="relative z-10 py-20 px-4 md:px-10">
                <h2 className="text-4xl md:text-6xl font-serif text-center mb-16">{t('Gallery.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {galleryImages.map((src, index) => (
                        <Card
                            key={index}
                            delay={index * 0.1}
                            className="p-0 overflow-hidden group h-[600px] relative border-none bg-gray-900 cursor-pointer"
                            onClick={() => setSelectedImage(src)}
                        >
                            <Image
                                src={src}
                                alt={`Gallery Image ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                        </Card>
                    ))}
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full max-w-5xl h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Gallery Preview"
                                fill
                                className="object-contain"
                                priority
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Goods Section */}
            <section id="goods" className="py-20 px-4 md:px-20 max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-serif text-center mb-16">{t('Goods.title')}</h2>
                <div className="text-center text-gray-400">Coming Soon...</div>
            </section>

            {/* 3D Models Section */}
            <section id="models" className="py-20 px-4 md:px-20 max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-serif text-center mb-16">{t('Models.title')}</h2>
                <ModelViewer />
            </section>

            {/* History Section */}
            <section id="history" className="py-20 px-4 md:px-20 max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-serif text-center mb-16">{t('History.title')}</h2>
                <div className="text-center text-gray-400">Coming Soon...</div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-5xl font-serif mb-8">{t('Contact.title')}</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        {t('Contact.description')}
                    </p>
                    <a
                        href="mailto:contact@example.com"
                        className="inline-block px-10 py-4 border border-[#00ffcc] text-[#00ffcc] text-lg tracking-widest hover:bg-[#00ffcc] hover:text-black transition-colors duration-300"
                    >
                        {t('Contact.button')}
                    </a>
                </motion.div>
            </section>

            <footer className="py-8 text-center text-gray-600 text-sm">
                {t('Footer.copyright', {
                    year: new Date().getFullYear()
                })}
            </footer>
        </div>
    );
}
