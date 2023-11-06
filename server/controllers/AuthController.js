const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
    async register(req, res) {
        try {
            const { email, password, name } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser.password) {
                return res.json({ message: "User already exists" });
            }
            let data;
            const hashPass = await bcrypt.hash(password, 10)
            if (existingUser && !existingUser.password) {
                data = {
                    name: name,
                    password: hashPass
                }
                await User.findOneAndUpdate({ email }, data)
            }
            if (!existingUser) {
                data = {
                    email: email,
                    name: name,
                    password: hashPass
                }
                const user = new User(data)
                await user.save()
            }

            const newUser = await User.findOne({ email }).then(data => {
                const payload = {
                    id: data._id,
                    email: data.email,
                    name: data.name
                }
                jwt.sign(
                    payload,
                    'games-and-soft 127',
                    { expiresIn: 8640000 },
                    (err, token) => {
                        if (err) return res.json({ message: err })
                        return res.json({
                            message: 'success',
                            token: 'Bearer ' + token
                        })
                    }
                )
            })
        } catch (error) {
            console.error(error);
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        User.findOne({ email }).then((data) => {
            if (!data) {
                return res.json({ message: 'Invalid mail or password' })
            }
            bcrypt.compare(password, data.password).then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: data._id,
                        email: data.email,
                        name: data.name
                    }
                    jwt.sign(
                        payload,
                        'games-and-soft 127',
                        { expiresIn: 8640000 },
                        (err, token) => {
                            if (err) return res.json({ message: err })
                            return res.json({
                                message: 'success',
                                token: 'Bearer ' + token
                            })
                        }
                    )
                } else {
                    return res.json({ message: 'invalid email or password' })
                }
            })
        })
    };
}

module.exports = new AuthController();