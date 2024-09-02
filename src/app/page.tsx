import { Footer, LargeText, Typeable } from "@/(components)/components";

export default function Home() {
  return (
    <>
      <div className="content">
        <LargeText
          spacer={true}
          letterSpacing={true}
          textFull="BRANDON"
          textSlim="BRAN\n  DON"
        />
        <Typeable
          align="right"
          text="SOFTWARE ENGINEER"
        />
      </div>
      <Footer toRenderSocials={true} />
    </>
  );
}
