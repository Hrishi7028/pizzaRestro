var cors = require('cors');
require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const DBConnection = require('./db/conn');
const userRouter = require('./routes/userRouter');
const pizzaRouter = require('./routes/pizzaRouter');
const adminuserRoutes = require('./routes/adminRoutes/adminuserRoutes');
const stripeRoute = require('./routes/stripe-route.js');
const orderRoute = require('./routes/OrderRoute');
const AllUserOrderRoute = require('./routes/adminRoutes/AllUserOrderRoute');
const path = require('path')



//config files...
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// database connection
DBConnection()



app.use(cors());
app.use('/', userRouter)
app.use('/', pizzaRouter)
app.use('/', adminuserRoutes)
app.use('/', stripeRoute)
app.use('/', orderRoute)
app.use('/', AllUserOrderRoute)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/front-end/build')))
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'front-end','build','index.html'))
    });
}


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} Successfully!!!`);
})