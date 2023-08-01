import { processHateoasActions } from '../utils/rest/hateoas/hateoasUtils';

export default class Club {
  constructor(clubObject) {
    const {
      id,
      name,
      type,
      description,
      projectId,
      members,
      admins,
      open,
      public: publicField,
      social,
      createdAt,
    } = clubObject;
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.projectId = projectId;
    this.members = members;
    this.admins = admins;
    this.open = open;
    this.public = publicField;
    this.social = social;
    this.createdAt = createdAt;
    this.actions = processHateoasActions(clubObject);
  }
}
