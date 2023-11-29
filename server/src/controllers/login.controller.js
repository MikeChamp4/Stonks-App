const { EMAIL_SENDER, PASSWORD_SEND_TOKEN } = process.env;

const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

let tempUsers = {
    email: "",
    token: ""
};

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

    const mailOptions = {
        from: EMAIL_SENDER,
        to: req.body.email,
        subject: "Tu código de inicio de sesión",
        text: `Tu código es: ${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log("Email enviado: " + info.response);
            res.redirect('/verify');
        }
    });

};

const generateToken = () => {
    let token = "";
    token = Math.floor(100000 + Math.random() * 900000).toString();
    return token;
}

exports.verifyToken = (req, res) => {
    const token = req.body.token;
    const email = req.body.email;
    const user = tempUsers;
    console.log("Token: " + token + " Email: " + email);
    if(!user) {
        res.status(400).send("Usuario no encontrado");
    } else {
        if(user.token === token) {
            res.status(200).send("Inicio de sesión exitoso");
        } else {
            res.status(400).send("Token inválido");
        }
    }
};

