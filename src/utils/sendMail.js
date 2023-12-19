import nodemailer from "nodemailer";
import "dotenv/config";
const base_url = process.env.BASE_URL;

const transpoter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const createEmail = (email, token) => {
    return {
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Activation Confirmation",
        html:
            "<h3>Aktivasi Akun, klik link dibawah</h3>" +
            "<a href='" +
            base_url +
            "/mentorin/users/activate/" +
            token +
            "'>Link Aktivasi</a>"
    };
};

const contentPwd = (email, password) => {
    return {
        from: process.env.MAIL_FROM,
        to: email,
        subject: "Forgot Password",
        html:
            "<h3>Password baru akun anda: </h3>" +
            "<table>" +
            "<tr><td>Email : </td><td>" +
            email +
            "</td></tr>" +
            "<tr><td>Password : </td><td>" +
            password +
            "</td></tr>" +
            "<table>",
    };
};


const sendMail = (email, token) => {
    return new Promise((resolve, reject) => {
        transpoter.sendMail(createEmail(email, token), (err, info) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Email Terkirim: " + info.response);
                resolve(true);
            }
        });
    });
};

const sendPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        transpoter.sendMail(contentPwd(email, password), (err, info) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Email Terkirim: " + info.response);
                resolve(true);
            }
        });
    });
};

export { sendMail, sendPassword };