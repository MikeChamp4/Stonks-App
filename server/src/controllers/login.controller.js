const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

let tempUsers = {};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "zambranocmiguele@gmail.com",
        pass: "zzkc wita nkbf prdn"
    },
});

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.getVerifyPage = (req, res) => {
    res.render('verify');
};

exports.postLoginPage = (req, res) => {
    const email = req.body.email;
    const secret = speakeasy.generateSecret({ length: 20 });
    const token = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
    });

    tempUsers[email] = { secret: secret.base32 };

    const mailOptions = {
        from: "noweheh486@bustayes.com",
        to: email,
        subject: "Tu código de inicio de sesión",
        text: `Tu código es: ${token}`,
    };

    

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log("Email enviado: " + info.response);
            res.redirect('/verify');
        }
    });
};

exports.verifyToken = (req, res) => {
    const { token, email } = req.body;
    const user = tempUsers[email];

    if (!user) {
        res.status(400).send("Usuario no encontrado");
    } else {
        const verified = speakeasy.totp.verify({
            secret: user.secret,
            encoding: "base32",
            token,
        });

        if (verified) {
            // Aquí puedes iniciar la sesión del usuario
            res.status(200).send("Inicio de sesión exitoso");
        } else {
            res.status(400).send("Token inválido");
        }
    }
};

