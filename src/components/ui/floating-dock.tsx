"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  useMotionValue,
  useTransform,
  useSpring,
  motion,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
  mobileClassName?: string;
}

export function FloatingDock({
  items,
  className,
  mobileClassName,
}: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex h-14 items-end gap-2 rounded-2xl border border-white/10 bg-section-dark/80 backdrop-blur-xl px-4 pb-2 shadow-lg",
          "lg:flex hidden",
          mobileClassName,
          className
        )}
      >
        {items.map((item, i) => (
          <DockItem key={item.href + i} item={item} mouseX={mouseX} />
        ))}
      </motion.div>
    </TooltipProvider>
  );
}

function DockItem({
  item,
  mouseX,
}: {
  item: DockItem;
  mouseX: ReturnType<typeof useMotionValue>;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(
    distance,
    [-150, 0, 150],
    [40, 56, 40]
  );
  const widthTransformSpring = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const content = (
    <div ref={ref} className="flex shrink-0 flex-col items-center">
      <motion.div
        style={{
          width: widthTransformSpring,
          height: 40,
        }}
        className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-section-dark-foreground/10 transition-colors hover:bg-section-dark-foreground/20"
      >
        <span className="flex size-6 items-center justify-center text-section-dark-foreground [&>svg]:size-5">
          {item.icon}
        </span>
      </motion.div>
    </div>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {item.external ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 flex-col items-center"
            aria-label={item.title}
          >
            {content}
          </a>
        ) : (
          <Link
            to={item.href}
            className="flex shrink-0 flex-col items-center"
            aria-label={item.title}
          >
            {content}
          </Link>
        )}
      </TooltipTrigger>
      <TooltipContent side="top" className="mb-2">
        {item.title}
      </TooltipContent>
    </Tooltip>
  );
}

