const express = require("express");
// const bodyParse = require('body-parser');

const serverConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");

const app = express();

/***
 * midilwere
 */
// app.use(bodyParse.json());
// app.use(bodyParse.text());
// app.use(bodyParse.urlencoded());

/**   second methood use deserieser  */

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));


/*** */

app.post('/ping',(req,res) =>{
    console.log(req.body);
    return res.json({message: "pong"});
})

app.listen(serverConfig.PORT, async () => {
  await connectDB();
  console.log(`Server started at port ${serverConfig.PORT}...!!`);
});


