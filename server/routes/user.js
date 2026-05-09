const express = require("express");
const router = express.Router();
const User = require("../models/user");

router
.get("/getAllUsers", async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.send(users);
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.get("/getUserById/:user_id", async (req, res) => {
    try {
        const user = await User.getUserById(req.params.user_id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send({ ...user, password: undefined });
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.post("/login", async (req, res) => {
    try {
        const user = await User.login(req.body);
        res.send({ ...user, password: undefined });
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.post("/register", async (req, res) => {
    try {
        const user = await User.register(req.body);
        res.send({ ...user, password: undefined });
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.put("/updateUser/:user_id", async (req, res) => {
    try {
        const user = await User.updateUser(req.params.user_id, req.body);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send({ ...user, password: undefined });
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.delete("/deleteUser/:user_id", async (req, res) => {
    try {
        await User.deleteUser(req.params.user_id);
        res.send({ message: "User deleted successfully" });
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
});

module.exports = router;