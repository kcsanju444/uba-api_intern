import {Request, Response} from 'express';
import { User } from '../db/user';
import { error } from 'console';
export const getUsers= async (req:Request, res:Response)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err });
      }
} ;

export const getUserById= async(req:Request, res:Response)=>{
    try{
        const user = await User.findById(req.params.id);
        // if(!user)return res.status(404).json({message:'user is found'});
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message:'server error',error:error});
    }
};
export const createUser = async(req:Request, res:Response)=>{
    try{
const newUser= new User(req.body);
const savedUser=await newUser.save();
res.status(201).json(savedUser);
    }catch(err){
res.status(400).json({message:'creating user error',error: err})
    }
};

export const updateUser = async(req:Request , res:Response)=>{
    try{
const updatedUser= await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
// if(!updatedUser)return res.status(404).json({message:'user not found'});
res.status(200).json(updatedUser);
    }catch(err){
        res.status(400).json({message:'updating user error',error: err})

    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
    //   if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      res.status(400).json({ message: 'Error deleting user', error: err });
    }
  };