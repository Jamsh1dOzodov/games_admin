const User = require("../models/User");
const emailValidator = require('deep-email-validator');
const mailer = require('../utils/nodemailer');

async function isEmailValid(email) {
	return emailValidator.validate(email)
}

class UserController {
	async paySteam(req, res) {
		try {
			const { email, login, sum, transaction_id } = req.body;
			const candidate = await User.findOne({ email })
			const { valid, reason, validators } = await isEmailValid(email);
			if (candidate && valid) {
				const purchasesEData = {
					$push: {
						purchases: {
							login_steam: login,
							sum: sum,
							transaction_id: transaction_id,
							data: new Date(),
							service: 'steam'
						}
					}
				}
				const updUser = await User.findOneAndUpdate({ email }, purchasesEData)
				updUser.save()
				return res.json({ msg: 'success' }).status(200)
			}
			if (valid) {
				const data = {
					email: email,
					purchases: {
						login_steam: login,
						sum: sum,
						transaction_id: transaction_id,
						data: new Date(),
						service: 'steam'
					},
					verification: false
				}
				const user = new User(data)
				await user.save()
				res.json({ ok: true }).status(200)
			} else {
				return res.status(400).send({
					message: "Please provide a valid email address.",
					reason: validators[reason].reason,
					ok: false
				})
			}
		} catch (error) {
			console.error(error);
			res.json({ ok: false }).status(400);
		}
	}
	async getMe(req, res) {
		try {
			const { email, name } = req.user
			User.findOne({ email }).then(data => res.status(200).json(data)).catch(err => console.error(err))
		} catch (error) {
			console.log(error);
		}
		try {
            
        } catch (error) {
            console.error(error)
            res.json(err).status(500)
        }
	}
	async sendMessageSupport(req, res) {
		try {
			const { name, email, message } = req.body;
			const msg = {
				from: process.env.SUPPORT_FROM,
				to: process.env.SUPPORT_TO,
				subject: 'theme message',
				text: `${name} ${email}
			
			${message}
			`
			}
			mailer(msg)
			res.status(200).json({ ok: true });
		} catch (error) {
			console.error(error)
			res.status(400).json({ ok: false });
		}

	}
}

module.exports = new UserController();