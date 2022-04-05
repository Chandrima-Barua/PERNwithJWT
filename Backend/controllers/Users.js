// import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.users;

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
    const { salutation, first_name, last_name, email, password, confPassword, phoneNumber, birthday, website, service } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Das Passwort und das bestätigte Passwort sind nicht gültig" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({

            salutation: req.body.salutation,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashPassword,
            phoneNumber: req.body.phoneNumber,
            birthday: Date(req.body.birthday),
            website: req.body.website,
            service: req.body.service
        });
        res.json({ msg: " Registration successful" });
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
        console.log(match)

        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const userId = user[0].id;
        const first_name = user[0].first_name;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, first_name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
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