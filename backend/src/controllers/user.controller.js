const { db } = require("../firebase");
const bcrypt = require('bcrypt');

exports.getUser = async (req, res) => {
    const doc = await db.collection("users").doc(req.params.email).get();

    if(!doc.exists) {
        return res.status(400).json({ message: "User not found" });
    }

    const user = doc.data();
    console.log(user);
    res.status(200).json({ user });
};

exports.updatePassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.collection("users").doc(email).update({ password: hashedPassword });
        res.status(200).json({ message: "Password updated" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Error updating password" });
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store the user in the database
        await db.collection("users").doc(email).set({
            password: hashedPassword,
            // Other user data...
        });

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
};