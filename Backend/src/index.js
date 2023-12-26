const express = require("express")
const dotenv = require("dotenv")
const {default: mongoose} = require("mongoose")
const routes = require("./routes")
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()
const port = process.env.port || 3001

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json())
app.use(cookieParser())

routes(app)



mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
    console.log('Connect success')
})
.catch((err) => {
    console.log(err)
})
app.listen(port, () => {
    console.log('Server is running in port:', + port)
})

