"use client";

import { PropsWithChildren } from "react";
import { MotionWrapper, MotionDiv, FrozenRouter } from "./motion";
import { usePathname } from "next/navigation";

export function Content({ children }: PropsWithChildren<{}>) {
  const pathname = usePathname();
  return (
    <MotionWrapper mode="wait">
      <MotionDiv
        key={pathname}
        initial={{
          y: 20,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        exit={{
          y: 20,
          opacity: 0,
          transition: { duration: 0.4 }
        }}
        transition={{
          y: { duration: 0.5 },
          opacity: { duration: 0.8 },
          type: "tween"
        }}
        className="main"
      >
        <FrozenRouter>{children}</FrozenRouter>
      </MotionDiv>
    </MotionWrapper>
  );
}
