const knex = require("../database/knex");

class IngredientController {

  async show(req, res) {
    const { product_id } = req.params


    const ingredients = await knex("ingredients")
      .where({ product_id })

    return res.json(ingredients)
  }

}

module.exports = IngredientController