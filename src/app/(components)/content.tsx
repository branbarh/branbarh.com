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
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        // transition={{ ease: "easeInOut", duration: 0.75 }}
        transition={{ duration: 0.4, type: "tween" }}
        className="main"
      >
        <FrozenRouter>{children}</FrozenRouter>
      </MotionDiv>
    </MotionWrapper>
  );
}
