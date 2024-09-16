const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const serverConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoutes");

const app = express();


app.use(cors({
  origin: ' http://localhost:5173', // allow to server to accept request from different origin
  credentials: true, // allow session cookie from browser to pass through
}));


/***
 * midilwere
 */
// app.use(bodyParse.json());
// app.use(bodyParse.text());
// app.use(bodyParse.urlencoded());

/**   second methood use deserieser  */

app.use(express.json());
app.use(cookieParser());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

// Routing middleware
app.use('/users',userRouter);
app.use('/carts',cartRouter);
app.use('/auth',authRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter);

/*** */
// isLoggedIn,
app.get('/ping',(req,res) =>{
    console.log(req.body);
    console.log(req.cookies)
    return res.json({message: "pong"});
});
 

app.listen(serverConfig.PORT, async () => {
  await connectDB();
  console.log(`Server started at port ${serverConfig.PORT}...!!`);

});


