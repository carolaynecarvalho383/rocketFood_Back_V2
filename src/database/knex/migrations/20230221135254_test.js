exports.up = knex => knex.schema.createTable("favorites", table => {
  table.text("test")
 
});

exports.down = knex => knex.schema.dropTable("favorites");