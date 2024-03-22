const LOGO_IMAGE_URI = '/logos/an-white-500.png';

class Site {
  constructor(env) {
    this.head = {
      title: 'AindaNow',
      description: 'Live doing what you love',
      image: { logo: LOGO_IMAGE_URI },
    };
  }
}

export default Site;
