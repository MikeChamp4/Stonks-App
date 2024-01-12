const { EMAIL_SENDER, PASSWORD_SEND_TOKEN } = process.env;
const nodemailer = require("nodemailer");
const { db } = require("../firebase");
const jwt  = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_SENDER,
        pass: PASSWORD_SEND_TOKEN,
    },
});

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.getVerifyPage = (req, res) => {
    res.render('verify');
};

exports.postLoginPage = (req, res) => {

    let token = generateToken();

    try {
        console.log("EMAIL: " + req.body.email + " | TOKEN: " + token);
        db.collection("users").doc(req.body.email).set({token});
        
    } catch (error) {
        return res.send(error);
    }

    const mailOptions = {
        from: EMAIL_SENDER,
        to: req.body.email,
        subject: "Your signup verification code",
        html: `
            <h1>Welcome to Stonks App</h1>
            <p>Your verification code is:</p>
            <h2>${token}</h2>
            <p>Please enter this code to verify your email address and complete your signup process.</p>
        `,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          console.log(error);
          res.status(500).json({ error });
        } else {
          //console.log("Email enviado: " + info.response);
          res.json({ email: req.body.email });
        }
    });

};

const generateToken = () => {
    let token = "";
    token = Math.floor(100000 + Math.random() * 900000).toString();
    return token;
}

exports.verifyToken = async (req, res) => {
    const doc = await db.collection("users").doc(req.body.email).get();

    if(!doc.exists) {
        return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const token = doc.data().token;
    const email = req.body.email;
    
    if(token === req.body.token) {
        const jwtToken = jwt.sign({ email: email }, 'secret-key');
        res.cookie("jwt", jwtToken, { httpOnly: true });

        res.status(200).json({ message: "Successful login" });
    } else {
        res.status(400).json({ message: "Token inválido" });
    }
    
};

exports.verifyJWT = (req, res) => {
    const token = req.cookies.jwt;
    //console.log(token);
    if(!token) {
        return res.status(401).json({ message: "token not found" });
    }

    jwt.verify(token, 'secret-key', (err, decodedToken) => {
        if(err) {
            console.log(err.message);
            return res.status(401).json({ message: "invalid token" });
        } else {
            //console.log(decodedToken);
            res.status(200).json({ message: "valid token" });
        }
    });
}

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'Logged out' });
};

exports.password = async (req, res) => {
    const { email, password } = req.body;

    try {
        const doc = await db.collection("users").doc(email).get();

        if(!doc.exists) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = doc.data();

        // Check if a password has been set
        if(!user.password) {
            return res.status(400).json({ message: "Password not set" });
        }

        // Compare the provided password with the stored hash
        let match;
        try {
            match = await bcrypt.compare(password, user.password);
        } catch (error) {
            console.error("Error comparing passwords:", error);
            return res.status(400).json({ message: "Invalid password hash" });
        }

        if(!match) {
            console.log("Invalid password");
            return res.status(400).json({ message: "Invalid password" });
        }

        // The email and password are correct
        const jwtToken = jwt.sign({ email: email }, 'secret-key');
        res.cookie("jwt", jwtToken, { httpOnly: true });
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in" });
    }
};