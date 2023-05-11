/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    knex.schema.createTable("votes", (table) => {
        table.bigIncrements("id").primary()
        table.bigInteger("commentId").references("comments.id").notNullable().unsigned();
        table.bigInteger("userId").references("users.id").notNullable().unsigned();
        table.bigInteger("value").notNullable();
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("votes");
}