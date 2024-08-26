const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const router = express.Router();

router.post("/register", async (req, res) => {
	const { name, surname, password: rawPassword } = req.body;
	const password = await bcrypt.hash(rawPassword, 10);

	try {
		const foundUser = await User.findOne({ where: { name } });
		console.log(req.body, foundUser);

		if (!foundUser || foundUser.name === null) {
			const user = await User.create({ name, surname, password });

			return res.json({
				token: jwt.sign({ id: user.id }, "your_jwt_secret", {
					expiresIn: "1h",
				}),
				message: "Kayit başarili.",
			});
		}

		if (foundUser.name === name) {
			return res.status(400).json({ message: "Kullanici mevcut." });
		}
	} catch (error) {
		return res.status(500).json(error);
	}
});

router.post("/login", async (req, res) => {
	const { name, password } = req.body;

	const user = await User.findOne({ where: { name: name } });
	console.log(req.body, user);
	if (!user) return res.status(400).json({ message: "Kullanici bulunamadi." });

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(400).json({ message: "Geçersiz şifre." });
	}

	const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
		expiresIn: "1h",
	});

	return res.json({ token: token, message: "Giriş başarili." });
});

module.exports = router;

//token registerde                      (okey)
//register da kullanıcı muvcut uyarısı. (okey)
//hatalı girişler için hata mesajları   (okey)
