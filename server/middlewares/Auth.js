const jwt = require('jsonwebtoken')
const verifyJWT = (req, res, next) => {
	const token = req.headers["x-access-token"]?.split(' ')[1]
	if(!token) {
		return res.json({message: "incorrect token Given", isLoggedIn: false})
	}
	jwt.verify(token, 'games-and-soft 127', (err, decoded) => {
		if(err) return res.json({mesage: 'Failed To Authenticate', isLoggedIn: false})
		req.user = {};
		req.user.id = decoded.id;
		req.user.email = decoded.email;
		req.user.name = decoded.name;
		next()
	})
}
module.exports = verifyJWT