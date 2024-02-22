const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const admAuthenticated = require("../middleware/admAuthenticated");

const favoritesRouter = Router()

const favoritesController = new FavoritesController()

favoritesRouter.post("/:product_id", ensureAuthenticated, favoritesController.create)
favoritesRouter.delete("/:product_id", ensureAuthenticated, favoritesController.delete)
favoritesRouter.get("/",ensureAuthenticated, favoritesController.show)

module.exports = favoritesRouter;