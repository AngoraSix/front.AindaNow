import { toType } from '../utils/helpers';
import Media from './Media';

export default class Contributor {
  constructor({ id, email, firstName, lastName, profileMedia, headMedia }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profileMedia = toType(profileMedia, Media, true);
    this.headMedia = toType(headMedia, Media, true);
  }

  // Media is processed as a whole in a form, we don't update indivdual fields
  toFormData(fieldSuffix = '') {
    return {
      [`${fieldSuffix}firstName`]: this.firstName,
      [`${fieldSuffix}lastName`]: this.lastName,
      [`${fieldSuffix}profileMedia`]: this.profileMedia,
      [`${fieldSuffix}headMedia`]: this.headMedia,
    };
  }

  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      profileMedia: this.profileMedia,
      headMedia: this.headMedia,
    };
  }
}
