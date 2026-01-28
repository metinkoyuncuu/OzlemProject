import React from 'react';

const Hizmetler: React.FC = () => {
  return (
    <div>
      <div className="ustortala">
        <div className="ust">
          <p>Sitemize Hoşgeldiniz...</p>
          <span>
            <a href="#"><i className="fa fa-youtube"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
          </span>
        </div>
      </div>

      <div className="header">
        <div className="headerortala">
          <div className="logo">
            <a href="http://temademo.com/kurumsalv3">
              <img src="http://temademo.com/kurumsalv3/wp-content/uploads/2023/10/logo.png" alt="logo" />
            </a>
          </div>
          <div className="logosag">
            <div id="ustmenu" className="menu-ust-menu-container">
              <ul id="menu-ust-menu" className="ustmenu">
                <li><a href="http://temademo.com/kurumsalv3"><i className="fa fa-home"></i>ANASAYFA</a></li>
                <li><a href="https://temademo.com/kurumsalv3/index.php/hakkimizda/"><i className="fa fa-briefcase"></i>HAKKIMIZDA</a></li>
                <li><a href="https://temademo.com/kurumsalv3/index.php/category/urunler/"><i className="fa fa-check-circle"></i>ÜRÜNLER</a></li>
                <li><a href="https://temademo.com/kurumsalv3/index.php/category/hizmetler/"><i className="fa fa-users"></i>HİZMETLER</a></li>
                <li><a href="https://temademo.com/kurumsalv3/index.php/category/projeler/"><i className="fa fa-eye"></i>PROJELER</a></li>
                <li><a href="https://temademo.com/kurumsalv3/index.php/iletisim/"><i className="fa fa-envelope"></i>İLETİŞİM</a></li>
              </ul>
            </div>
            <div className="logotek">
              <i className="fa fa-phone"></i>
              <p>0000 123 45 67</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ortala1">
        <h1>HİZMETLER</h1>
        <p>Bu sayfa hizmetlerimiz hakkında bilgiler içermektedir.</p>
      </div>

      <div className="ortala">
        <div className="tambar">
          <div className="bilgi">
            <a href="https://temademo.com/kurumsalv3/index.php/2020/08/25/ornek-hizmet-1/" title="Örnek Hizmet 1">
              <img src="http://temademo.com/kurumsalv3/wp-content/uploads/bfi_thumb/15-300x200-qlv90ooe024iw3sm9q3wy343stzut46tgze7wtwuu8.jpeg" alt="Örnek Hizmet 1" />
            </a>
            <p>
              <a href="https://temademo.com/kurumsalv3/index.php/2020/08/25/ornek-hizmet-1/" title="Örnek Hizmet 1">Örnek Hizmet 1</a>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit purus eget enim posuere varius. Quisque et sollicitudin odio. Nunc id neque consectetur, accumsan massa eget, ullamcorper nibh. Fusce egestas venenatis commodo. Nullam vitae pellentesque...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hizmetler;