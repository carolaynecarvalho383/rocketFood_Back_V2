exports.up = knex => knex.schema.createTable("requests_itens", table => {
  table.increments("id");
  table.integer("request_id").references("id").inTable("requests");
  table.integer("request_amount");
  table.text("request_price");
  table.integer("user_id").references("id").inTable("users");
  table.integer("product_id").references("id").inTable("products")


});
exports.down = knex => knex.schema.dropTable("requests_itens");