import userService from "../services/userService.js";
const createUser = async(req , res, next)=>{
    try{
     const createUser = await userService.createUser(req.body);
     res.status(201).json(createUser);
    } catch (error){
        next(error);
    }
};
