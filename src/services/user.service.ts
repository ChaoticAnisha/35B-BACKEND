import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";
import bcryptjs from "bcryptjs";
import { HttpError } from "../errors/http-error";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { fi } from "zod/v4/locales";

let userRepository = new UserRepository();

export class UserService {

    async createUser(data: CreateUserDTO){
        // business logic before creating user
        if(!data.email){
            throw new HttpError(400, "Email is required");
        }
        const emailCheck = await userRepository.getUserByEmail(data.email);
        if(emailCheck){
            throw new HttpError(403, "Email already in use");
        }
        if(!data.username){
            throw new HttpError(400, "Username is required");
        }
        const usernameCheck = await userRepository.getUserByUsername(data.username);
        if(usernameCheck){
            throw new HttpError(403, "Username already in use");
        }
        // hash password
        const hashedPassword = await bcryptjs.hash(data.password, 10); // 10 complexity
        data.password = hashedPassword;

        // create user
        const newUser = await userRepository.createUser(data);
        return newUser;
    }
    async LogiinUse(data: LoginUserDTO){
        const user = await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new HttpError(404, "User not found");
        }
        //compare password
        const validPassword = await bcryptjs.compare(data.password, user.password);
        //plaintext, hashed
        if(!validPassword){
            throw new HttpError(401, "Invalid credentials");
        }
        //generate JWT 
        const playload = { //user identifier
            id: user._id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        };
        const token = jwt.sign(playload, JWT_SECRET, {expiresIn: '30d'});
        return { token, user };
    }
}