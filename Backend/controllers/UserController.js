import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.users;
const Op = db.Sequelize.Op;

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'first_name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    
    const { salutation, first_name, last_name, email, password, confPassword, phoneNumber, birthday , role} = req.body;

    //check before registering a user if the user already exists
    const usercheck = await User.findAll({
        where: {
            email: req.body.email
        }
    });

    //checking password
    if (password !== confPassword) return res.status(400).json({ msg: "Das Passwort und das bestätigte Passwort sind nicht gültig" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    
    try {
        if (!usercheck[0])
        {
        let user = await User.create({

            salutation: req.body.salutation,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashPassword,
            phoneNumber: req.body.phoneNumber,
            birthday: Date(req.body.birthday),
            role: req.body.role || "user"
        });
        res.json({ msg: " Registration successful" });
    }else{
        res.json({ msg: " User already exists" });
    }
        
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);

        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const userId = user[0].id;
        const first_name = user[0].first_name;
        const email = user[0].email;

        const accessToken = jwt.sign({ userId, first_name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '2h'
        });

       
        const refreshToken = jwt.sign({ userId, first_name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await User.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ msg: "Email not found" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const findUser = async (req, res) => {
    try {
        let user = await User.findOne({
            where : {id: req.body.user_id},
            order : [
            ['id', 'first_name', 'email'],
            ]
            // where: {
            //     [Op.or]: [
            //        { id: req.body.id || null },
            //       { email: req.body.email|| null }
            //     ]

            // }
           
        });
console.log(user)
        if (user) {
            res.json(user);
        } else {
            res.json("User not found!");
        }
    } catch (error) {
        console.log(error);
    }
}







