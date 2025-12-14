"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    onClick?: () => void;
}

export default function Card({ children, className, delay = 0, onClick }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "glass-panel rounded-2xl p-8 text-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,204,0.1)] hover:border-[rgba(0,255,204,0.3)]",
                className
            )}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
