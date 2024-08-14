import { Footer, Typeable } from "./(components)/components";

export default function Home() {
  return (
    <>
      <div className="content">
        <div className="text-spacer"></div>
        <div className="text-large full">BRANDON</div>
        <div className="text-large slim">
          BRAN
          <br />
          {"\u00A0\u00A0"}DON
        </div>
        <Typeable text="SOFTWARE ENGINEER" />
      </div>
      <Footer toRenderSocials={true} />
    </>
  );
}
