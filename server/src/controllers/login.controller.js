const { EMAIL_SENDER, PASSWORD_SEND_TOKEN } = process.env;
const nodemailer = require("nodemailer");
const { db } = require("../firebase");

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
        console.log("EMAIL: " + req.body.email + " TOKEN: " + token);
        db.collection("users").doc(req.body.email).set({token});
        
    } catch (error) {
        return res.send(error);
    }

    const mailOptions = {
        from: EMAIL_SENDER,
        to: req.body.email,
        subject: "Tu código de inicio de sesión",
        text: `Tu código es: ${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          console.log(error);
          res.status(500).json({ error });
        } else {
          console.log("Email enviado: " + info.response);
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


    const token = doc.data().token;
    const email = req.body.email;

    if(!doc) {
        return res.status(400).send("Usuario no encontrado");
    }

    if(token === req.body.token) {
        res.status(200).send("Inicio de sesión exitoso");
    } else {
        res.status(400).send("Token inválido");
    }

};