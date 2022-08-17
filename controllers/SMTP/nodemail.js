var nodemailer = require('nodemailer')
var mysql = require('mysql');
const moment = require('moment')

var con = mysql.createConnection({
    host: "168.119.159.183",
    user: "boardroom",
    password: "eGY8YN73tb6jBBWC",
    database: "boardroom"
});

var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Office 365 server
    port: 587,     // secure SMTP
    secure: false,
    auth: {
        user: "svc_roombooking@boardroomlimited.com",
        pass: "8f5Lz$Wm!L859%"
    },
    tls: {
        ciphers: 'SSLv3'
    }
});
console.log('SMTP Configured');


module.exports = function (to, subject, data) {
    var message = {
        from: 'svc_roombooking@boardroomlimited.com',
        to: to,
        subject: `${subject}`,
        html: `${data}`
    };
    transporter.sendMail(message, function (error) {
        if (error) {
            console.log('Error occured');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        var date = moment().format("DD-MM-YYYY")
        var sql = `INSERT INTO email_logs (email,subject,date) VALUES ('${to}', '${subject}','${date}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

    });
}
