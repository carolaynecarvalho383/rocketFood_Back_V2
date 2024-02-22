const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class FavoritesController {

  async create(req, res) {
    const user_id = req.user.id;
    const { product_id } = req.params;


    const favoriteExists = await knex('favorites').where({product_id: product_id})

    if (favoriteExists) {
      throw new AppError("Este produto já está favoritado")
    }

    await knex("favorites").insert({
      product_id,
      user_id,
    })

    return res.json();
  }

  async show(req, res) {
    const id = req.user.id

    const favorite = await knex.select( 
      ['products.*']
    ).from('favorites')
      .innerJoin('products', 'products.id', 'favorites.product_id')
      .where('user_id',[id])

    return res.json(
      favorite,    
    );
  }

  async delete(req, res) {
    const id = req.user.id
    console.log(id);
    const { product_id } = req.params

    const productForDelete = await knex("favorites")
      .where({ product_id: product_id })
      .delete()

    return res.json()
  }

}

module.exports = FavoritesController;