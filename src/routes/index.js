const { Router } = require("express");
const usersRoutes = require("./users.routes")
const productsRouter = require("./products.routes");
const ingredientRouter = require("./ingredient.routes");
const sessionsRoutes = require("./sessions.routes");
const purchasesRouter = require("./purchases.routes");
const requestsRouter = require("./requests.routes");
const loadProductController = require("./loadProduct.routes");
const favoritesRouter = require("./favorites.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/products", productsRouter);
routes.use("/ingredients", ingredientRouter);
routes.use("/sessions", sessionsRoutes);
routes.use("/purchases", purchasesRouter);
routes.use("/requests", requestsRouter);
routes.use("/loadProduct", loadProductController);
routes.use("/favorites", favoritesRouter);



module.exports = routes;