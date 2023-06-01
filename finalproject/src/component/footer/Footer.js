import './Footer.css'



function Footer() {
    return ( 
<footer className="section bg-footer">
  <div className="container">
    <div>
      <h6 className="footer-heading text-uppercase text-white">Informations</h6>
      <ul className="footer-link mt-4">
        <li>
          <a href="#!">Sitemap</a>
        </li>
        <li>
          <a href="#!">Our team</a>
        </li>
        <li>
          <a href="#!">Terms of Services</a>
        </li>
      </ul>
    </div>
    <div>
      <h6 className="footer-heading text-uppercase text-white">Help</h6>
      <ul className="footer-link mt-4">
        <li>
          <a href="#!">Register</a>
        </li>
        <li>
          <a href="#!">Sign in</a>
        </li>
        <li>
          <a href="#!">Privacy Policy</a>
        </li>
      </ul>
    </div>
    <div className="footer-link">
      <h6 className="footer-heading text-uppercase text-white">Contact us</h6>
      <p className="contact-info mt-4">Need help ?</p>

    </div>
  </div>
  <div className="text-center mt-5">
    <p className="footer-alt">2022 © Society, All Rights Reserved</p>
  </div>
</footer>
    );
}

export default Footer;