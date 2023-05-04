const Model = require("./Model");
const Comment = require("./Comment");

class Website extends Model {
  static get tableName() {
    return "websites";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "url", "description"],
      properties: {
        name: { type: "string" },
        url: { type: "string" },
        description: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "websites.id",
          to: "comments.websiteId",
        },
      },
    };
  }
}

module.exports = Website;
