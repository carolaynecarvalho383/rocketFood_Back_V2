const AppError = require('../utils/AppError');
const knex = require("../database/knex")
const { hash , compare } = require('bcryptjs');


class UsersController {

  async create(req, res) {
    
    const { name, email, password, admin} = req.body
    
     const userExists = await knex('users').where({ email },email).first()
    if (userExists) {
      throw new AppError("Este email já esta cadastrado")

    }
    const hashedPassword = await hash(password, 8)

    if (!name || name === "" || name === null) {
      throw new AppError("Nome é obrigatório")
      return
    }
    await knex('users').insert({name, email, password:hashedPassword , admin})

   return res.status(200).json({ name, email, password ,admin})
  }

  async update(req, res) {

    const { name, email, password , old_password } = req.body

    const user_id = req.user.id


    const user = await  knex('users').where({ id },user_id).first()

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await  knex('users').where({ email },email).first()
    
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email ja esta em uso")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError('Voce precisa informar a senha antiga para redefinir a senha')
    }
 
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('senha não confere')
      }
      user.password = await hash(password, 8)
    }
    const now = new Date.now()

   await knex('users')
    .where({ id },user.id).first()
   .update({
    name: user.name,
    email: user.email,
    password: user.password,
    updated_at: now
   })


    return res.json()
  }

  async show (req, res) {
    const allUsers = await knex('users')


    return res.json(allUsers);
  }
}

module.exports = UsersController;