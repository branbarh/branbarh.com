"use client";

import { PropsWithChildren } from "react";
import { MotionWrapper, MotionDiv, FrozenRouter } from "@/(components)/motion";
import { usePathname } from "next/navigation";

export function Background() {
  return (
    <div className="background">
      <div className="backgroundBase"></div>
      <div className="backgroundImage"></div>
      <div className="backgroundTint"></div>
      <div className="backgroundInsetShadow"></div>
      <div className="backgroundGrain"></div>
    </div>
  );
}

export function Content({ children }: PropsWithChildren<{}>) {
  const pathname = usePathname();
  return (
    <MotionWrapper mode="wait">
      <MotionDiv
        key={pathname}
        initial={
          {
            y: 20,
            "--opacity": 0,
            "--blur": 0
          } as any
        }
        animate={
          {
            y: 0,
            "--opacity": 1,
            "--blur": 1
          } as any
        }
        exit={
          {
            y: 20,
            "--opacity": 0,
            "--blur": 0,
            transition: { duration: 0.4 }
          } as any
        }
        transition={
          {
            y: { duration: 0.5 },
            "--opacity": { duration: 0.5 },
            "--blur": { duration: 0.5 },
            type: "tween"
          } as any
        }
        className="main"
      >
        <FrozenRouter>{children}</FrozenRouter>
      </MotionDiv>
    </MotionWrapper>
  );
}
