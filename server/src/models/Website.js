const Model = require("./Model")

class Website extends Model {
    static get tableName() {
        return "websites"
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
        }
    }

    static async findAll() {
        return this.query();
      }
    
      static async saveAll(data) {
        return this.query().insert(data);
      }
}

module.exports = Website