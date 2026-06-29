"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

/** Fade + slide + subtle blur reveal when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
  amount = 0.3,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  as?: keyof typeof motion;
  amount?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, filter: "blur(8px)", ...offset[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers the reveal of its <Reveal>/motion children. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** A child item for use inside <StaggerGroup>. */
export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: reduce
          ? { opacity: 0 }
          : { opacity: 0, filter: "blur(6px)", ...offset[direction] },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
