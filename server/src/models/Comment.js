const Model = require("./Model");

class Comment extends Model {
  static get tableName() {
    return "comments";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["comment", "websiteId", "userId", "rating"],
      properties: {
        comment: { type: "string" },
        websiteId: { type: ["integer", "string"] },
        userId: { type: ["integer", "string"] },
        rating: {type: ["integer", "string"]}
      },
    };
  }

  static get relationMappings() {
    const Website = require("./Website");
    const User = require("./User");

    return {
      website: {
        relation: Model.BelongsToOneRelation,
        modelClass: Website,
        join: {
          from: "comments.websiteId",
          to: "websites.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Comment;
