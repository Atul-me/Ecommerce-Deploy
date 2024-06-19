import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; 
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config()

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


//connect with DB

//middleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join((__dirname,'./client/build'))))

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/payment",paymentRoutes); 
app.use("/api/v1/orders", orderRoutes);
app.use('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on ${PORT}`)})
