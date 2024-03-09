import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";
import { ProductController } from "../controllers/productControllers.js";

const productManager = new ProductManager();

// Cambia el nombre de la variable interna a 'routerInstance'
function productRouter(io, productController) {
  const routerInstance = Router();

  routerInstance.post("/", async (req, res, next) => {
    try {
      await productController.addProduct(req, res);
    } catch (error) {
      console.log(error);
      res.send("error al agregar producto");
    }
  });

  return routerInstance;
}

export { productRouter };