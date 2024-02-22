const{ Router} = require("express");

const LoadProductController = require("../controllers/LoadProductController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated");


const loadProductRouter = Router()

const loadProductController = new LoadProductController()


loadProductRouter.get("/",ensureAuthenticated,loadProductController.show)

loadProductRouter.get("/category",ensureAuthenticated,loadProductController.showCategory)

module.exports = loadProductRouter;