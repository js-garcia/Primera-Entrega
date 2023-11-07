import express from 'express'
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import { __dirname } from './utils.js'




//Express server
const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Middlewares
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')



//Routes
app.use('/static', express.static(`${__dirname}/public`))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)



app.listen(PORT, () => {
    console.log(`Servicio activo en puerto ${PORT}`)
})