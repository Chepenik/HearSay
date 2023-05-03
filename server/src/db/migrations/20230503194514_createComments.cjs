/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("comments", (table) => {
        table.bigIncrements("id").primary();
        table.string("comment").notNullable();
        table.bigInteger("websiteId").references("websites.id").notNullable().index().unsigned()
        table.bigInteger("userId").references("users.id").notNullable().index().unsigned()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("comments");
}
