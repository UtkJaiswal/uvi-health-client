import React from "react";

function Footer() {
  const style = {
      backgroundColor:"black"
  }
  return (
    <div>
      <footer className="page-footer font-small blue mt-5" style={style}>
        <div className="footer-copyright text-center py-3">
          © 2022 Copyright:
          <h6> Uvi health</h6>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
