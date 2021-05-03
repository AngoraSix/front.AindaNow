const LOGO_IMAGE_URI = '/logos/paraconcesionarias2-largo-blanco.png';

class Site {
  constructor(env) {
    this.head = {
      title: 'paraConcesionarias',
      description:
        'Toda la ayuda que necesitas para administrar tu concesionaria, en un solo lugar',
      image: { logo: LOGO_IMAGE_URI },
      facebookAppId: env.FACEBOOK_APPID || '1234',
    };

    this.social = {
      whatsappContactURL: env.WHATSAPP_CONTACT_URL || 'https://wa.me/PHONE_NUMBER'
    }

    this.queryParams = {
      listingWithoutLayout: 'noLayout',
    };

    this.links = {
      adminHome: env.LINKS_ADMIN_HOME_URL || 'http://localhost:9081/auth/realms/Angorasix/protocol/openid-connect/auth?response_type=code&client_id=a6Client&scope=openid&redirect_uri=http://localhost:3000/oauth/login/callback',
    };
  }
}

export default Site;
