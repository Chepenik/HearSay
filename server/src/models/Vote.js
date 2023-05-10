const Model = require("./Model");

class Vote extends Model {
  static get tableName() {
    return "value";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["commentId", "userId", "vote"],
      properties: {
        id: { type: ["integer"] },
        commentId: { type: ["integer"] },
        userId: { type: ["integer"] },
        vote: { type: ["integer"] },
        createdAt: { type: ["string"] },
        updatedAt: { type: ["string"] },
      },
    };
  }  

  static get relationMappings() {
    const Comment = require("./Comment");
    const User = require("./User");
  
    return {
      comment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: "votes.commentId",
          to: "comments.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "votes.userId",
          to: "users.id",
        },
      },
    };
  }  
}

module.exports = Vote;