/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("websites", (table) => {
        table.string("imageUrl").notNullable().defaultTo(null)
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("websites", (table) => {
        table.dropColumn("imageUrl")
    })
}
