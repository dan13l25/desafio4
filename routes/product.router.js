import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";
import { ProductController } from "../controllers/productControllers.js";

const productRouter = Router();
const productManager = new ProductManager();
const productController = ProductController;

productController.init(io);

// Replace the existing post route with the following
productRouter.post("/", async (req, res) => {
    try {
        await productController.controllerInstance.addProduct(req, res);
    } catch (error) {
        console.log(error);
        res.send("error al agregar producto");
    }
});

export { productRouter };