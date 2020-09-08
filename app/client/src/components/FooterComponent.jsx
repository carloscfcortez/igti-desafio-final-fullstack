import React from "react";
import { Footer } from "react-materialize";
export default function FooterComponent() {
  const Copyright = () => ` ${new Date().getFullYear()} Copyright`;
  return (
    <Footer
      className="blue accent-3"
      copyrights={Copyright()}
    >
     
    </Footer>
  );
}