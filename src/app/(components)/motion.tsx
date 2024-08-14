"use client";

// Imports:
import { motion, AnimatePresence } from "framer-motion";
import { PropsWithChildren, useContext, useRef } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

// The export of "motion.div" is used here to prevent "use client" from being used in the main layout.tsx file:
// See https://github.com/framer/motion/issues/2054#issuecomment-1491568547 and https://www.framer.com/motion/animate-presence/ for more information.
export const MotionDiv = motion.div;
export const MotionWrapper = AnimatePresence;

// Next.js's App Router has issues transitioning on page exit; the following code is used to resolve this:
// See https://github.com/vercel/next.js/issues/49279#issuecomment-2041305816 for more information.
export function FrozenRouter({ children }: PropsWithChildren<{}>) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>;
}
