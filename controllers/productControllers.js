import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export default class ProductController {
  constructor(io) {
    this.io = io;
  }

  async readProducts() {
    const productsJsonPath = fileURLToPath(new URL('../data/products.json', import.meta.url));
    const rawData = await fs.promises.readFile(productsJsonPath);
    const products = JSON.parse(rawData);
    return products;
  }

  async writeProducts(products) {
    const productsJsonPath = fileURLToPath(new URL('../data/products.json', import.meta.url));
    await fs.promises.writeFile(productsJsonPath, JSON.stringify(products, null, 2));
  }

  async addProduct(req, res) {
    const products = await this.readProducts();

    const newProduct = {
      id: products.length + 1,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      code: req.body.code,
      stock: req.body.stock,
      status: req.body.status,
      category: req.body.category,
    };

    products.push(newProduct);
    await this.writeProducts(products);

    this.io.emit('newProduct', newProduct);

    res.json(newProduct);
  }

  static async init(io) {
    const controller = new ProductController(io);
    const productsJsonPath = fileURLToPath(new URL('../data/products.json', import.meta.url));
    const rawData = await fs.promises.readFile(productsJsonPath);
    const products = JSON.parse(rawData);
    controller.products = products;
    return controller;
  }
}