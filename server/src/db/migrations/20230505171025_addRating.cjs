/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("comments", (table) => {
        table.integer("rating").notNullable().defaultTo(0)
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("comments", (table) => {
        table.dropColumn("rating")
    })
    
}
