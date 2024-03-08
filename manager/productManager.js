import { promises as fs } from "fs"
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export class ProductManager {
    constructor() {
        const currentFileUrl = import.meta.url;
        const currentFilePath = fileURLToPath(currentFileUrl);
        this.path = join(dirname(currentFilePath), "productlist.json")
        this.products = []
    }
    static id = 0

    writeProductsToFile = async () => {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
    }

    addProduct = async (title, description, price, thumbnail, code, stock, category, status=true) => {
        ProductManager.id += 1;
    
        if (title && description && price && thumbnail && code && stock && category !== undefined) {
            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                category,   
                stock,
                status,
                id: ProductManager.id
            }
            this.products.push(product)
    
            await this.writeProductsToFile()
        } 
    }

    readProducts = async () => {
        try {
            let dataProduct = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(dataProduct)
        } catch (error) {
            console.error("Error al leer o parsear el archivo:", error.message)
            return []
        }
    }

    getProduct = async () => {
        let reply = await this.readProducts()
        return await console.log(reply)
    }

    getProductById = async (id) => {
        let getId = await this.readProducts();
        let filter = getId.find(product => product.id === id)
        console.log(filter)
    }

    deleteProductById = async (id) => {
        let erase = await this.readProducts();
        let productFiltered = erase.filter(products => products.id !== id)
        await fs.writeFile(this.path, JSON.stringify(productFiltered, null, 2))
        console.log("Producto eliminado")
    }

    updateProduct = async ({ id, ...newProductData }) => {
        await this.deleteProductById(id)
        let oldProducts = await this.readProducts()
        let modifyProduct = [{ ...newProductData, id }, ...(oldProducts || [])]
        await fs.writeFile(this.path, JSON.stringify(modifyProduct, null, 2))
    }
}