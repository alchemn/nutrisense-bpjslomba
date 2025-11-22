import prisma from '../utils/prisma';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';

const JWT = process.env.JWT_SECRET as string

export async function register(req:Request, res:Response){
    try {
        const {email, password} = req.body
        const checkUser = await prisma.user.findUnique({
            where: {email:email}
        })
        if(checkUser){
            return res.status(404).json({
                message: "Email Udah Terdaftar"
            })
        }
        const hashPass = await bcrypt.hash(password,10)
        const newUser = await prisma.user.create({
            data: {
                email:email,
                password:hashPass
            }
        })
        const token = jwt.sign({id:newUser.id, email:newUser.email}, JWT)
        res.status(200).json({
            message: "Register Berhasil",
            data: {
                user: newUser,
                token
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: err instanceof Error ? err.message : "An unknown error occurred"
        })
    }
}


export async function login(req:Request, res:Response){
    try {
        const {email,password} = req.body

        const findEmail = await prisma.user.findUnique({
            where: {email:email}
        })
        if(!findEmail){
            return res.status(404).json({
                message: "Email Tidak Ditemukan"
            })
        }
        const isMatch = await bcrypt.compare(password,findEmail.password)
        if(!isMatch){
            return res.status(403).json({
                message:"Password Salah"
            })
        }
        const token = jwt.sign({
            id:findEmail.id,
            email:findEmail.email
        },JWT)
        res.status(200).json({
            message: "Login Berhasil",
            user: findEmail,
            token
        })
    } catch (error:unknown) {
        res.status(500).json({message: error instanceof Error ? error.message : "An unknown error occurred"})
    }
}