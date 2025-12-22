"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MousePointer2, Eye } from "lucide-react";

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHoveringClickable(isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="hidden lg:block fixed pointer-events-none z-[9999]"
      style={{
        left: cursorPos.x,
        top: cursorPos.y,
        x: "-50%",
        y: "-50%",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-white/80 backdrop-blur-sm"
        animate={{
          scale: isHoveringClickable ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-center">
          {isHoveringClickable ? (
            <Eye size={16} className="text-black" strokeWidth={2} />
          ) : (
            <MousePointer2 size={16} className="text-black" strokeWidth={2} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

