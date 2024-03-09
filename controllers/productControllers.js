export class ProductController {
    constructor(io) {
        this.io = io;
    }

    addProduct(req, res) {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body;
        const newProduct = { title, description, price, thumbnail, code, stock, status, category };
        this.io.emit('newProduct', newProduct);
        res.json(newProduct);
    }

    // Export the ProductController instance
    static controllerInstance;

    static init(io) {
        this.controllerInstance = new ProductController(io);
    }
}