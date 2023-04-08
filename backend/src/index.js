import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './router/router.js'
import errorMiddleware from "./middlewares/error-middleware.js";
import path from 'path'

dotenv.config()
const PORT = process.env.PORT || 5000
const __dirname = 'D:/programming/text-editor/frontend'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
app.use('/', router)
app.use(errorMiddleware)
// app.get('/boards/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
// app.use(express.static(path.join(__dirname)));
//
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });


const start = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log('Server was started on port ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()