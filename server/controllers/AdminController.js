const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AdminRouter {
    async register(req, res) {
        try {
            const { email, password, name, key } = req.body;
            const existingUser = await Admin.findOne({ email });
            if (existingUser) {
                return res.json({ message: "User already exists" });
            }

            const hashPass = await bcrypt.hash(password, 10)
            let data = {
                email: email,
                name: name,
                password: hashPass
            }
            if (key === '$2a$10$1kIVZP.XtcqyXcyNY/AbauOzouojp5MBbHnlf03N.KcTDhi0dOx8C') {
                const user = new Admin(data)
                await user.save()
            } else {
                return res.status(400).json({ msg: 'нет доступа' })
            }

            const newUser = await Admin.findOne({ email }).then(data => {
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
        Admin.findOne({ email }).then((data) => {
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
                    return res.status(404).json({ message: 'invalid email or password' })
                }
            })
        })
    }
    async getAdmin(req, res) {
        try {
            const { email, name } = req.user
            res.json({ isLoggedIn: true, email: email, name: name })
        } catch (error) {
            console.error(error)
            res.json(err).status(500)
        }
    }
}

module.exports = new AdminRouter();