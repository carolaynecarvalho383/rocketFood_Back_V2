const knex = require("../database/knex");


class PurchasesController {

  async create(req, res) {

    const { amount } = req.body;

    const user_id = req.user.id;

    const { product_id } = req.params;
    let totalPrice;
    const priceProduct = await knex('products')
      .select('price')
      .where({ id: product_id })

    const price = priceProduct.map(price => price.price)

    function calculatorTotalPrice(amount, price) {
      totalPrice = Number(price.toString()) * amount
      return totalPrice
    }
    calculatorTotalPrice(amount, price)

    const purchases = await knex("purchases").insert({
      user_id,
      product_id,
      totalPrice: totalPrice.toString(),
      amount
    })

    return res.json();
  }

  async show(req, res) {

    const id = req.user.id


    const purchases = await knex('purchases')
      .select([
        'products.image', 'products.title',
        'purchases.*'
      ]).innerJoin('products', 'products.id', 'purchases.product_id')
      .where('user_id', [id])




    return res.json(purchases);
  }

  async delete(req, res) {
   const {id} = req.params
   
    await knex('purchases')
   .where({id})
    .delete()
   return res.json()
  }

  async update(req, res) {
    const {id} = req.params
    const{inventory} = req.body

    const amount = await knex("products")
    .where({ id}).first()

    const calcRest = Number(amount.inventory - Math.round(inventory))

    await knex("products")
    .where({ id})
   .update({inventory:calcRest})
    return res.json()
  }

  async showAdm(req, res){

    const requests = await knex('requests')

    const requestsItem = await knex("requests_itens")
    .select([
      "products.title",
      "requests_itens.request_price",
      "requests_itens.request_amount",
      "requests_itens.request_id "
    ])
    .innerJoin('products', 'products.id', 'requests_itens.product_id')

    const allRequests = requests.map( request => {
      const requestsItens = requestsItem.filter(item => item.request_id === request.id)

      return {
        ...request,
        requestsItem: requestsItens
      }
    })
  return res.json(allRequests );
  }
}

module.exports = PurchasesController;