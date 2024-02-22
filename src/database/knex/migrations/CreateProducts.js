exports.up = knex => knex.schema.createTable("products", table => {
  table.increments("id");
  table.text("title");
  table.text("price");
  table.text("description");
  table.integer("inventory");
  table.text("category");
  table.text("image").nullable();
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("products");