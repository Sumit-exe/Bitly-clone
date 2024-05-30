import express from "express"
import path from 'path'
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/auth.js";

// connection import
import connectToMongoDB from "./connection.js";
// model imports
import URL from "./models/url.js";

//route imports
import urlRoute from "./routes/url.js";
import staticRoute from './routes/staticRouter.js'
import userRoute from "./routes/user.js"

const app = express();
const PORT = 8001;

// connection to mongo db

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log("mongo db connected"))


app.set('view engine','ejs')    
app.set('views',path.resolve('./views'))    

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//route

app.use('/url',authMiddleware.restrictToLoggedInUserOnly,urlRoute)
app.use('/user',userRoute)
app.use('/',authMiddleware.checkAuth,staticRoute)


app.get("/url/:shortId", async(req,res)=>{
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory: {
                timeStamp: Date.now()
            }
        }
    })

    res.redirect(entry.redirectURl); 
})

app.listen(PORT,()=>{
    console.log("Listening on port : " +PORT)
})      