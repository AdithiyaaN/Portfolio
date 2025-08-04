
'use client';

import { useState, useRef, type MouseEvent, type TouchEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronUp, ChevronsUp, MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [dragY, setDragY] = useState(0);
    const dragRef = useRef<HTMLDivElement>(null);

    const DRAG_THRESHOLD = -100; // Pixels to drag up to trigger navigation

    const handleDragStart = (clientY: number) => {
        setIsDragging(true);
        if (dragRef.current) {
            dragRef.current.style.transition = 'none';
        }
    };

    const handleDragMove = (clientY: number) => {
        if (!isDragging) return;
        
        const newY = clientY - (dragRef.current?.getBoundingClientRect().top ?? 0) - (dragRef.current?.clientHeight ?? 0) / 2;
        
        // Only allow dragging up
        if (newY < 0) {
             setDragY(newY);
             if (newY < DRAG_THRESHOLD) {
                handleDragEnd();
                router.push('/projects');
            }
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setDragY(0);
        if (dragRef.current) {
            dragRef.current.style.transition = 'transform 0.3s ease-out';
        }
    };
    
    // Mouse Events
    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => handleDragStart(e.clientY);
    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => handleDragMove(e.clientY);
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => handleDragEnd();

    // Touch Events
    const onTouchStart = (e: TouchEvent<HTMLDivElement>) => handleDragStart(e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent<HTMLDivElement>) => handleDragMove(e.touches[0].clientY);
    const onTouchEnd = () => handleDragEnd();

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center pt-[25vh] md:pt-[35vh]">
      <div className="container px-4 md:px-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="space-y-2">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl xl:text-8xl/none text-[#3E3F29]">
                Hi, I'm Adi
                </h1>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#7D8D86]">
                A Passionate Full-Stack Developer
                </h2>
                <p className="max-w-[600px] mx-auto text-[#3E3F29]/80 md:text-xl lg:text-3xl">
                I build modern, responsive, and feature-rich web applications. Let's create something amazing together.
                </p>
            </div>
        </div>
      </div>
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm flex flex-col items-center justify-center space-y-2 pb-8"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        >
            <div 
              ref={dragRef}
              className="relative cursor-grab active:cursor-grabbing p-4 touch-none"
              style={{ transform: `translateY(${dragY}px)`}}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
            >
                <div className="relative w-16 h-16 rounded-full bg-[#3E3F29] flex items-center justify-center text-white shadow-lg">
                    <ChevronsUp className={cn("w-8 h-8 absolute animate-pulse", isDragging && "opacity-0")} />
                    <MousePointer2 className={cn("w-8 h-8 absolute opacity-0", isDragging && "opacity-100 animate-ping")} />
                </div>
            </div>
            <p className="text-sm text-[#3E3F29]/70 font-medium animate-pulse">Hold and Drag Up</p>
        </div>
    </section>
  );
}
