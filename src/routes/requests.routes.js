const{ Router} = require("express");

const RequestsController = require("../controllers/RequestsController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const admAuthenticated = require("../middleware/admAuthenticated");

const requestsRoutes = Router()

const requestsController = new RequestsController()

requestsRoutes.post("/",ensureAuthenticated,requestsController.create)
requestsRoutes.get("/",ensureAuthenticated,requestsController.show)
requestsRoutes.get("/:id",ensureAuthenticated,requestsController.showDetails)

requestsRoutes.patch("/:id",admAuthenticated,requestsController.update)

module.exports = requestsRoutes;