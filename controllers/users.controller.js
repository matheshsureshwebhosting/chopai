const models = require('../models');
const User = models.users
const OTP = models.otp
const sentmail = require('./SMTP/nodemail')
const Room = models.Facilityaccesstable
const axios = require('axios')
const moment = require('moment')

const create = async (req, res) => {
    const data = req.body;
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    var checkdata = await User.findAll({ where: { email: req.body.email } && { phone: req.body.phone } })
    if (checkdata.length == 0) {
        await User.create(data).then(data => {
            var htmldata = `<p>Dear Sir/Madam<br></br>
            Thank you for your registration.<br></br>
            An admin will approve your account within 3 business days.<br></br>
            Please note that this is an auto-generated email and we will not be responding to you using this mailbox. If you need immediate assistance, please call our Central Admin at [admin number].<br></br>
            Thank you and have a nice day.
        </p>`

            //sent html vale in data parameter
            sentmail(req.body.email, 'User Registration', htmldata)
            res.send(data);
        }).catch(err => {
            console.log(err)
            res.send({
                message:
                    err.message || "Some error occurred in query."
            })
        });
    } else {
        res.status(400).send('Already Register..')
        // res.send("Already Register..");
    }

}

const viewall = async (req, res) => {
    await User.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const view = async (req, res) => {
    const data = req.body.id;

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await User.findAll({ where: { id: data } }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const viewbyemail = async (req, res) => {
    const mail = req.body.email;

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await User.findAll({ where: { email: mail } }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const login = async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await User.findAll().then(async data => {
        if (data.length == 0) {
            res.send("Please Register");
        } else {
            var checkuser = await data.filter((datanew) => {
                return datanew.email.toLowerCase() === email;
            });
            if (checkuser[0].password === password) {
                var value = {
                    // createdAt: moment().format(`YYYY-MMMM-DD  HH:mm:ss`),
                    // updatedAt: moment().format(`YYYY-MMMM-DD  HH:mm:ss`),
                    last_active: moment().format(`YYYY-MM-DD  HH:mm:ss`),
                }
                await User.update(value, {
                    where: {
                        id: data[0].id
                    }
                })
                res.send(checkuser);

            } else {
                res.send("Please Check Password..");
            }

        }

    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const update = async (req, res) => {
    const value = req.body;
    const id = req.body.id
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    await User.update(value, {
        where: {
            id: id
        }
    }).then(() => {
        res.send("Updated Successfully");
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const destroy = async (req, res) => {
    const data = req.body.id;

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await User.destroy({
        where: {
            id: data
        }
    }).then(() => {
        res.send("Deleted Successfully");
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const approveaccept = async (req, res) => {
    const data = req.body.email;
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    var htmldata = `<p>Welcome! We are pleased to inform you that your BoardRoom Booking has been registered and activated successfully. You’ve just stepped into the future of faster online meeting room and desk bookings.

    Your user ID is ${data}<br></br>
    
    How it works<br></br>
    Look for the BoardRoom Booking app icon on your mobile phone. <br></br>
    
     
    Getting the most out of BoardRoom Booking: <br></br>
    1	App download is available on Apple Appstore and Google Play store.<br></br>
    2	Select facilites you would like to book<br></br>
    3	Quickly invite participants to your meetings<br></br>
    4	Edit your existing bookings from anywhere <br></br>
    
    Questions? Check out our FAQs (to link to our FAQ / Manual). Need to get in touch? Contact us at [admin phone number] or email [support email].
    
    
        </p>`

    //sent html vale in data parameter
    sentmail(data, 'Welcome to your BoardRoom Booking', htmldata)
}

const approvecancel = async (req, res) => {
    const data = req.body.email;
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    var htmldata = `<p>Unfortunately, we could not approve your BoardRoom Booking registration. Please make sure that all the details submitted during registration is accurate.<br></br>

    If you have any questions about creating an account, check out our FAQs (to link to our FAQ / Manual). 
    Need to get in touch? Contact us at [admin phone number] or email [support email].
    
        </p>`

    //sent html vale in data parameter
    sentmail(data, 'Account Registration Unsuccessful', htmldata)
}


const removefromdevice = async (req, res) => {
    try {
        const employeeid = req.body.employeeid;
        const roomid = req.body.roomid
        for (var i = 0; i < roomid.length; i++) {
            console.log(roomid[i])
            await Room.findAll({ where: { id: roomid[i] } }).then(async roomdata => {
                await User.findAll({ where: { id: employeeid } }).then(async userdata => {
                    var arraydata = {
                        "operator": "DeletePerson",
                        "info": {
                            "DeviceID": `${roomdata[0].deviceid}`,
                            "TotalNum": 1,
                            "IdType": 2,
                            "PersonUUID": [`${userdata[0].id}`]
                        }
                    }
                    var username = 'admin'
                    var password = 'admin'
                    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
                    var facepanelcreate = await axios
                        .post(`${roomdata[0].address}/action/DeletePerson`, arraydata, {
                            headers: {
                                'Authorization': `Basic ${token}`
                            }
                        })
                        .then((res) => {
                            return res.data
                        });
                        console.log(facepanelcreate)
                })
            })
        }
        res.send("Facepanel Removed Successfully..");
    } catch (error) {
        console.log(error)
    }
}
const sendotp = async (req, res) => {
    const data = req.body
    var otp = Math.floor(1000 + Math.random() * 9000);
    data["otpvalue"] = otp
    try {
        await OTP.create(data).then(data => {
            if (data !== null) {
                console.log(data)
                var htmldata = `This is your OTP code :${otp}`
                sentmail(req.body.email, 'OTP', htmldata)
                res.send(data);
            }
        })
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred in query."
        })
    }
}

const verifyotp = async (req, res) => {
    try {
        var id = req.body.id
        var otp = req.body.otp
        await OTP.findAll({ where: { id: id } }).then(data => {
            if (data[0].otpvalue === otp) {
                res.send(true);
            } else {
                res.send(false);
            }
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred in query."
            })
        });

    } catch (error) {

    }

}

module.exports = {
    create,
    viewall,
    view,
    update,
    destroy,
    login,
    approveaccept,
    approvecancel,
    removefromdevice,
    sendotp,
    verifyotp,
    viewbyemail
}
