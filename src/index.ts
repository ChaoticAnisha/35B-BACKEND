import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './database/mangodb';
import { PORT } from './config';

import dotenv from 'dotenv';
dotenv.config();
//can use .env variable below this
console.log(process.env.PORT);

import  authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';
import authUserRoutes from './routes/admin/user.route';

const app: Application = express();

app.use(bodyParser.json());
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/users', authUserRoutes);

// const PORT: number = 3003;
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// app.get('/api/books/', (req: Request, res: Response) => {
//     const books = [
//         {id: "B-1", title: "1984"},
//         {id: "B-2", title: "To Kill a Mockingbird", date:"2015-12-10"},
//     ];
//     res.status(200).json(books);
// })

async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
}

startServer();