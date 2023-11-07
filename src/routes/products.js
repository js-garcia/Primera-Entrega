import { Router } from 'express'
import { ProductManager } from '../controllers/ProductManager.js'

const productsRouter= Router()
const productManager = new ProductManager('src/models/products.json')

productsRouter.get('/', async (req, res) => { 
    const { limit } = req.query; 
    console.log(limit)
    const product = await productManager.getProducts()
    console.log(product)
    res.send(JSON.stringify(product))
})
  
productsRouter.get('/:id', async (req, res) => { 
    const product = await productManager.getProductById(req.params.id)
    console.log(product)
    res.send(JSON.stringify(product))
})
  
productsRouter.post('/', async (req, res) => { 
    let message = await productManager.addProduct(req.body)
    res.send(message)
})
  
productsRouter.delete('/:id', async (req, res) => {
    let message = await productManager.deleteProduct(req.params.id) 
    res.send(message)
})
  
productsRouter.put('/:id', async (req, res) => { 
    let message = await productManager.updateProduct(req.params.id, req.body)
    res.send(message)
})

export default productsRouter
