import User from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import authService from '../service/auth.js';

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });

    return res.redirect("/")
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password })
    if (!user) {
        return res.render("login", {
            error: "Invalid Username or Password",
        });
    }

    const token = authService.setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}

export default {
    handleUserSignup,
    handleUserLogin
}