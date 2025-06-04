"use client";
import { useState, useEffect } from 'react';

export default function RotatingText() {
    const words = ["técnico", "creativo", "educativo", "innovador", "colaborativo"];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-block min-w-[100px] text-primary font-semibold">
            {words[currentIndex]}
        </span>
    );
}