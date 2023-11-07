import { Router } from 'express'
import { CartManager } from '../controllers/CartManager.js'
import { ProductManager } from '../controllers/ProductManager.js'

const cartsRouter = Router()
const cartManager = new CartManager('src/models/carts.json')
const prodManager = new ProductManager('src/models/products.json')


cartsRouter.get('/:cid', async (req, res) => { 
    const cart = await cartManager.getCartById(parseInt(req.params.cid))
    res.send(cart)
})

cartsRouter.post('/', async (req, res) => { 
    const carrito = await cartManager.addCart()
    res.send(carrito)
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => { 
    const prodQty = 1;
    const productData = await prodManager.getProductById(parseInt(req.params.pid));
    if (productData) {
        const data = await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid), prodQty)
        data ? res.send(`Producto ${productData.id} agregado al carrito.`) : res.send(`Hubo un error al agregar el producto al carrito.`)
    } else {
        res.send(`El producto ${req.params.pid} no se ha encontrado.`)
    }
    
})

cartsRouter.delete('/:id', async (req, res) => {
    let mensaje = await cartManager.deleteProduct(req.params.id) 
    res.send(mensaje)
})

export default cartsRouter
