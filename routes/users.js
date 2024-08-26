const express = require("express");
const authenticateToken = require("../middleware/auth");
const User = require("../models/Users");
const UserHistory = require("../models/UsersHistory");

const router = express.Router();

router.get("/getAll", authenticateToken, async (req, res) => {
	try {
		const users = await User.findAll();

		if (!users || users.length === 0)
			return res.status(500).json({ message: "Kullanicilar bulunamadı." });
		console.log(req.query, users);

		return res.json({ users });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Sunucu hatasi." });
	}
});
router.put("/update/:id", authenticateToken, async (req, res) => {
	const user = await User.findByPk(req.params.id);

	if (!user) return res.status(404).json({ message: "Kullanici bulunamadi." });

	// Kullanıcının güncel durumunu history tablosuna kaydet
	try {
    const { name, surname } = req.body;

    if (user.name === name && user.surname === surname)
      return res.json({ message: "Kullanici mevcut." });

		await UserHistory.create({
			userId: user.id,
			changeDate: new Date(),
			count: user.changeCount + 1,
			previousName: user.name,
			previousSurname: user.surname,
		});

		await user.update({ name, surname, changeCount: user.changeCount + 1 });

		// 3 değişiklik hakkını dolduran kullanıcıyı sil
		if (user.changeCount >= 3) {
			await user.destroy();
			return res
				.status(403)
				.json({ message: "3 değişiklik oldu kullanici silindi." });
		}

		res.json({ message: "Kullanici güncellendi.", user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		console.log(user);

		if (!user) return res.json({ message: "Kullanici bulunamadi." });

		await user.destroy();
		res.json({ message: "Kullanici silindi." });
	} catch (error) {
		res.status(500).json({ message: "Sunucu hatasi." });
	}
});

module.exports = router;

//delete çalıştır                                                              (okey)
//update de mevcut birinin isimlerini yazamasın(id, name ve surname kıyasla)   (okey)
