// import Image from "next/image";
// import styles from "./styles/page.module.css";
import { Footer, Typeable } from "./(components)/components";

export default function Home() {
  return (
    <>
      <main className="main">
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
      </main>
      <Footer toRenderSocials={true} />
    </>
  );
}
