exports.up = knex => knex.schema.createTable("purchases", table => {
  table.increments("id");
  table.text("totalPrice");
  table.integer("amount");
  table.integer("user_id").references("id").inTable("users");
  table.integer("product_id").references("id").inTable("products").onDelete("CASCADE");
  table.timestamp("created_at").default(knex.fn.now())

});
exports.down = knex => knex.schema.dropTable("purchases");