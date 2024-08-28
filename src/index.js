const express = require("express");
const cookieParser = require('cookie-parser');

const serverConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
// const { isLoggedIn } = require("./validation/authValidator");
const uploader = require("./middlewares/multerMiddleware");
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoutes");

const app = express();

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

// photo Middlewares
app.post('/photo',uploader.single('IncomingFile'), async (req, res)=>{
    console.log(req.file)
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result from cloudinary", result);
    await fs.unlink(req.file.path);
    return res.json({message:'Ok'})
});

// 

app.listen(serverConfig.PORT, async () => {
  await connectDB();
  console.log(`Server started at port ${serverConfig.PORT}...!!`);

});


