exports.up = knex => knex.schema.createTable("requests", table => {
  table.increments("id");
  table.text("status");
  table.text("totalPrice");
  table.integer("user_id").references("id").inTable("users");
  table.timestamp("created_at").default(knex.fn.now())
});
exports.down = knex => knex.schema.dropTable("requests");