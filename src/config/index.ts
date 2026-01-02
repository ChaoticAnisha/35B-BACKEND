import dotenv from 'dotenv';
import { string } from 'zod';
dotenv.config();

export const PORT: number = 
process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const MONGO_URI: string = 
process.env.MONGO_URI || 'mongodb://localhost:27017/defaultdb';
//Application level constants, with fallbacks
//if .env variable is not set, use the fallback value
    
export const JWT_SECRET: string = 
process.env.JWT_SECRET || 'defaultsecretkey';