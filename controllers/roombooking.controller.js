const models = require('../models');
const Facilityaccess = models.RoomBooking
const Room = models.Facilityaccesstable
const User = models.users
const axios = require('axios')
const moment = require('moment')
const sentmail = require('./SMTP/nodemail')
const timeRange = require('time-range');
const fs = require("fs")
const util = require("util")
const removeFile = util.promisify(fs.unlink)


const create = async (req, res) => {
    const data = req.body;
    var email = req.body.email
    var id = req.body.employeeid
    var roomid = req.body.roomid
    var fromtime = req.body.fromtime
    var totime = req.body.totime
    var floor = req.body.floor
    var namelist = []

    await Facilityaccess.findAll({
        where: {
            selecteddate: req.body.selecteddate,
        }
    }).then(async datafinal => {
        var finaldata = []
        for (var i = 0; i < datafinal.length; i++) {
            if (datafinal[i].employeeid === id) {
                if (datafinal[i].status != "cancel") {
                    // if(datafinal[i].fromtime >= fromtime && datafinal[i].totime <= totime && datafinal[i].totime <= fromtime){
                    fromtimeslots = []
                    fromtimeslots.push([datafinal[i].fromtime, datafinal[i].totime])
                    fromtimeslots.push([fromtime, totime])
                    if (timeRange.overlap(fromtimeslots)) {
                        if (datafinal[i].fromtime == fromtime || datafinal[i].totime == totime) {
                            finaldata.push(datafinal[i]);
                        }
                    } else {
                        finaldata.push(datafinal[i]);
                    }
                }
            } else {
                if (datafinal[i].status != "cancel") {
                    if (datafinal[i].roomid === req.body.roomid) {
                        fromtimeslots = []
                        fromtimeslots.push([datafinal[i].fromtime, datafinal[i].totime])
                        fromtimeslots.push([fromtime, totime])
                        if (timeRange.overlap(fromtimeslots)) {
                            if (datafinal[i].fromtime == fromtime || datafinal[i].totime == totime) {
                                finaldata.push(datafinal[i]);
                            }
                        } else {
                            finaldata.push(datafinal[i]);
                        }
                    }
                }
            }

        }
        if (finaldata.length === 0) {
            if (email !== undefined) {
                var staticbookeddata = []
                for (var i = 0; i < email.length; i++) {
                    await User.findAll({
                        where: {
                            email: email[i]
                        }
                    }).then(async newdata => {
                        if (newdata.length !== 0) {
                            namelist.push(`${newdata[0].id}`)
                            await Facilityaccess.findAll({
                                where: {
                                    employeeid: newdata[0].id,
                                    selecteddate: req.body.selecteddate
                                }
                            }).then(async bookeddata => {
                                for (var i = 0; i < bookeddata.length; i++) {
                                    if (bookeddata[i].selecteddate >= req.body.selecteddate && bookeddata[i].todate <= req.body.todate) {
                                        if (bookeddata[i].status != "cancel" && bookeddata[i].fromtime >= fromtime || bookeddata[i].fromtime <= fromtime) {
                                            fromtimeslots = []
                                            fromtimeslots.push([bookeddata[i].fromtime, bookeddata[i].totime])
                                            fromtimeslots.push([fromtime, totime])
                                            if (timeRange.overlap(fromtimeslots)) {
                                                if (bookeddata[i].fromtime == fromtime || bookeddata[i].totime == totime) {
                                                    staticbookeddata.push(bookeddata[i]);
                                                }
                                            } else {
                                                staticbookeddata.push(bookeddata[i]);
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
                if (staticbookeddata.length === 0) {
                    // await Facilityaccess.findAll({
                    //     where: {
                    //         selecteddate: req.body.selecteddate,
                    //         floor: floor
                    //     }
                    // }).then(async bookeddata => {
                    //     var memberfilter = []
                    //     for (var i = 0; i < bookeddata.length; i++) {
                    //         fromtimeslots = []
                    //         fromtimeslots.push([bookeddata[i].fromtime, bookeddata[i].totime])
                    //         fromtimeslots.push([fromtime, totime])
                    //         if (timeRange.overlap(fromtimeslots)) {
                    //             if (bookeddata[i].fromtime == fromtime || bookeddata[i].totime == totime) {
                    //                 memberfilter.push(bookeddata[i].members);
                    //             }
                    //         } else {
                    //             memberfilter.push(bookeddata[i].members);
                    //         }
                    //     }
                    //     var datafinalone = []
                    //     for (var i = 0; i < memberfilter.length; i++) {
                    //         for (var j = 0; j < namelist.length; j++) {
                    //             if (memberfilter[i] === namelist[j]) {
                    //                 datafinalone.push(memberfilter[i])
                    //             }
                    //         }
                    //     }
                    //     if (datafinalone.length === 0) {
                    //         var members = namelist.toString()
                    //         if (namelist.length !== 0) {
                    //             var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                    //             var b = moment(req.body.todate, 'DD-MM-YYYY');
                    //             var diffDays = b.diff(a, 'days') + 1;
                    //             for (var i = 0; i < diffDays; i++) {
                    //                 var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                    //                 var data = {
                    //                     roomid: req.body.roomid,
                    //                     selecteddate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                    //                     todate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                    //                     fromtime: req.body.fromtime,
                    //                     totime: req.body.totime,
                    //                     packs: req.body.packs,
                    //                     floor: req.body.floor,
                    //                     email: req.body.email,
                    //                     employeeid: req.body.employeeid,
                    //                     members: members
                    //                 }
                    //                 await Facilityaccess.create(data).then(async data => {
                    //                     await Room.findAll({
                    //                         where: {
                    //                             id: roomid
                    //                         }
                    //                     }).then(async roomdata => {
                    //                         await User.findAll({
                    //                             where: {
                    //                                 id: id
                    //                             }
                    //                         }).then(async newdata => {
                    //                             var htmldata = `<p>${members}, your booking is confirmed. <br></br>
                    //             Reservation code: ${data.id} <br></br>
                    //             Date: ${req.body.selecteddate} <br></br>
                    //             Time: ${req.body.fromtime} to ${req.body.totime} <br></br>
                    //             Location: ${req.body.floor}, ${roomdata[0].name} <br></br>
                    //         </p>`
                    //                             //sent html vale in data parameter
                    //                             sentmail(email, `Booking Confirmation: ${roomdata[0].name} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldata)
                    //                             for (var i = 0; i < email.length; i++) {
                    //                                 var htmldata = `<p>${members}, you have been invited to the following event.<br></br>
                    //             Date: ${req.body.selecteddate}<br></br>
                    //             Time: ${req.body.fromtime} to ${req.body.totime}<br></br>
                    //             Location: ${req.body.floor}, ${roomdata[0].name}<br></br>
                    //             Who is invited: <br></br>
                    //             [${email}] – organizer<br></br>
                    //              </p>`
                    //                                 sentmail(email[i], `Meeting Invitation: ${roomdata[0].name} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldata)
                    //                             }
                    //                         })
                    //                     })
                    //                 }).catch(err => {

                    //                     res.send({
                    //                         message: err.message || "Some error occurred in query."
                    //                     })
                    //                 });
                    //             }
                    //             res.json("Registration successful");
                    //         } else {

                    //             res.status(400).send('User Not Found ..')
                    //         }
                    //     } else {
                    //         res.status(400).send('The Invite User Already have booking in the same time..')
                    //     }
                    // })
                    var members = namelist.toString()
                    if (namelist.length !== 0) {
                        var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                        var b = moment(req.body.todate, 'DD-MM-YYYY');
                        var diffDays = b.diff(a, 'days') + 1;
                        for (var i = 0; i < diffDays; i++) {
                            var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                            var data = {
                                roomid: req.body.roomid,
                                selecteddate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                                todate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                                fromtime: req.body.fromtime,
                                totime: req.body.totime,
                                packs: req.body.packs,
                                floor: req.body.floor,
                                email: req.body.email,
                                employeeid: req.body.employeeid,
                                members: members
                            }
                            await Facilityaccess.create(data).then(async data => {
                                await Room.findAll({
                                    where: {
                                        id: roomid
                                    }
                                }).then(async roomdata => {
                                    await User.findAll({
                                        where: {
                                            id: id
                                        }
                                    }).then(async newdata => {
                                        var htmldata = `<p>Meeting Room Booking Confirmation (Organizer)<br></br>
                                            Hi ${newdata[0].firstname} ${newdata[0].lastname}(${newdata[0].email}) Your booking is confirmed. <br></br>
                                            Reservation code: ${data.id} <br></br>
                                            Date: ${req.body.selecteddate} to ${req.body.todate} <br></br>
                                            Time: ${req.body.fromtime} to ${req.body.totime} <br></br>
                                            Location: ${req.body.floor} <br></br>
                                            Room :${roomdata[0].name}<br></br>
                                            organizer : ${newdata[0].email}<br></br>
                                            Invitees : ${email.toString()}<br></br>
                                            </p>`
                                        // //sent html vale in data parameter
                                        sentmail(email, `Meeting Room Booking Confirmation: ${roomdata[0].name} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldata)

                                        for (var i = 0; i < email.length; i++) {

                                            await User.findAll({
                                                where: {
                                                    email: email[i]
                                                }
                                            }).then(async newdatanew => {
                                                var htmldatanew = `<p>Meeting Room Booking Confirmation (Invitee)<br></br>
                                                    Hi ${newdatanew[0].firstname} ${newdatanew[0].lastname} (${newdatanew[0].email}) You have been invited to the following event.<br></br>
                                                    Date: ${req.body.selecteddate}to ${req.body.todate}<br></br>
                                                    Time: ${req.body.fromtime} to ${req.body.totime}<br></br>
                                                    Location: ${req.body.floor} <br></br>
                                                    Room :${roomdata[0].name}<br></br>
                                                    organizer : ${newdata[0].email}<br></br>
                                                    Invitees : ${email.toString()}<br></br>
                                                    </p>`
                                                sentmail(email[i], `Meeting Room Booking Invitation: ${roomdata[0].name} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldatanew)
                                            })


                                        }
                                    })
                                })
                            }).catch(err => {

                                res.send({
                                    message: err.message || "Some error occurred in query."
                                })
                            });
                        }
                        res.json("Registration successful");
                    } else {

                        res.status(400).send('User Not Found ..')
                    }
                } else {
                    res.status(400).send('The Invite User Already have booking in the same time..')
                }
            } else {
                res.status(400).send('Email Not Found..')
            }
            if (finaldata.length == 0) {

            } else {
                res.send('Room Already booked..')
            }
        } else {
            res.status(400).send('The User Already have booking in the same time..')
        }
    })
}

const viewall = async (req, res) => {
    await Facilityaccess.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}

const view = async (req, res) => {
    const data = req.query.id;

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await Facilityaccess.findByPk(data).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}

const viewbyuserid = async (req, res) => {
    const data = req.body.employeeid;
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await Facilityaccess.findAll({
        where: {
            employeeid: data
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}

const viewbyutime = async (req, res) => {
    const id = req.body.employeeid;
    var reservedata = await Facilityaccess.findAll({
        where: {
            employeeid: id,
            status: "Reserved"
        }
    })
    var Occupieddata = await Facilityaccess.findAll({
        where: {
            employeeid: id,
            status: "Occupied"
        }
    })
    Finaldata = reservedata.concat(Occupieddata);
    var alldata = []
    for (var i = 0; i < Finaldata.length; i++) {
        await Room.findAll({
            where: {
                id: Finaldata[i].roomid
            }
        }).then(async roomdata => {
            var datamem = Finaldata[i].members.split(",")
            var namelist = []
            for (var a = 0; a < datamem.length; a++) {
                await User.findAll({
                    where: {
                        id: Number(datamem[a])
                    }
                }).then(async newuserdata => {
                    if (newuserdata[0].firstname !== undefined) {
                        namelist.push(`${newuserdata[0].firstname} ${newuserdata[0].lastname}`)
                    }
                })
            }
            alldata.push(({
                id: Finaldata[i].id,
                roomid: roomdata[0].id,
                roomname: roomdata[0].name,
                selecteddate: Finaldata[i].selecteddate,
                todate: Finaldata[i].todate,
                fromtime: Finaldata[i].fromtime,
                totime: Finaldata[i].totime,
                employeeid: Finaldata[i].employeeid,
                status: Finaldata[i].status,
                packs: Finaldata[i].packs,
                floor: Finaldata[i].floor,
                members: namelist.toString(),
                createdAt: Finaldata[i].createdAt,
                updatedAt: Finaldata[i].updatedAt
            }))
        })

    }

    res.send(alldata)
}

const currentbookingnew = async (req, res) => {
    const id = req.body.employeeid;
    var reservedata = await Facilityaccess.findAll({
        where: {
            employeeid: id,
            status: "Reserved"
        }
    })

    var Occupieddata = await Facilityaccess.findAll({
        where: {
            employeeid: id,
            status: "Occupied"
        }
    })

    Finaldata = reservedata.concat(Occupieddata);
    res.send(Finaldata)

}

const update = async (req, res) => {
    const values = req.body;
    const id = req.body.id;
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    await Facilityaccess.update(values, {
        where: {
            id: id
        }
    }).then(async () => {
        // await User.findAll({ where: { id: employeeid } }).then(newdata => {
        //     console.log(newdata.firstname, newdata[0].firstname)
        //     var htmldata = `<p>${newdata[0].firstname} ${newdata[0].lastname}, your booking has been updated. <br></br>
        // Date: ${req.body.selecteddate} <br></br>
        // Time: ${req.body.fromtime} to ${req.body.totime} <br></br>
        // Location: ${req.body.floor}, ${roomdata[0].name} <br></br>
        //  </p>`

        //     //sent html vale in data parameter
        //     sentmail(req.body.email, `Updated Booking: ${roomdata[0].name} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldata)
        // })
        res.send("Updated Successfully");
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Some error occurred in query."
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

    await Facilityaccess.destroy({
        where: {
            employeeid: data
        }
    }).then(() => {
        res.send("Deleted Successfully");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}

const cancel = async (req, res) => {
    const value = req.body;
    const id = req.body.id
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    await Facilityaccess.update(value, {
        where: {
            id: id
        }
    }).then(() => {
        res.send("Updated Successfully");
    }).catch(err => {

        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}


const availability = async (req, res) => {
    const date = req.body.date
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await Facilityaccess.findAll({
        where: {
            selecteddate: date
        }
    }).then(async data => {
        var fromtimeslots = []
        for (var i = 0; i < data.length; i++) {
            fromtimeslots.push({
                roomid: data[i].roomid,
                fromtime: data[i].fromtime,
                totime: data[i].totime,
                selecteddate: data[i].selecteddate,
                todate: data[i].todate,
                status: data[i].status,
                floor: data[i].floor,
                packs: data[i].packs,
                floor: data[i].floor,
                createdAt: data[i].createdAt,
                updatedAt: data[i].updatedAt,
                id: data[i].id
            })
        }
        res.send(fromtimeslots)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}

const availabilerooms = async (req, res) => {
    const fromtime = req.body.fromtime;
    const date = req.body.date

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await Facilityaccess.findAll({
        where: {
            selecteddate: date
        }
    }).then(async data => {
        var availabilerooms = []
        for (var i = 0; i < data.length; i++) {
            availabilerooms.includes(data[i].roomid)
        }
        res.send(availabilerooms)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}


const viewbyfloor = async (req, res) => {
    const data = req.body.floor;
    await Facilityaccess.findAll({
        where: {
            floor: data
        }
    }).then(async data => {
        var fromtimeslots = []
        for (var i = 0; i < data.length; i++) {
            fromtimeslots.push({
                roomid: data[i].roomid,
                fromtime: data[i].fromtime,
                totime: data[i].totime,
                selecteddate: data[i].selecteddate,
                todate: data[i].todate,
                status: data[i].status,
                floor: data[i].floor,
                packs: data[i].packs,
                floor: data[i].floor,
                createdAt: data[i].createdAt,
                updatedAt: data[i].updatedAt,
                id: data[i].id
            })
        }
        res.send(fromtimeslots)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}

const viewbydate = async (req, res) => {
    const date = req.body.selecteddate;
    const data = req.body.floor;
    await Facilityaccess.findAll({
        where: {
            selecteddate: date,
            floor: data
        }
    }).then(async data => {
        await Room.findAll().then(async roomdata => {
            var fromtimeslots = []
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < roomdata.length; j++) {
                    if (Number(data[i].roomid) === roomdata[j].id) {
                        fromtimeslots.push({
                            roomid: data[i].roomid,
                            fromtime: data[i].fromtime,
                            roomname: roomdata[j].name,
                            totime: data[i].totime,
                            selecteddate: data[i].selecteddate,
                            todate: data[i].todate,
                            status: data[i].status,
                            floor: data[i].floor,
                            packs: data[i].packs,
                            floor: data[i].floor,
                            createdAt: data[i].createdAt,
                            updatedAt: data[i].updatedAt,
                            id: data[i].id
                        })
                    }
                }
            }
            res.send(fromtimeslots)
        })

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}

const currentbooking = async (req, res) => {
    const employeeid = req.body.employeeid;
    await Facilityaccess.findAll({
        where: {
            employeeid: employeeid
        }
    }).then(async data => {
        await Room.findAll().then(async roomdata => {
            var today = req.body.current_time
            var fromtimeslots = []
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < roomdata.length; j++) {
                    if (data[i].selecteddate > today && data[i].status != "cancel" && Number(data[i].roomid) === roomdata[j].id) {
                        fromtimeslots.push({
                            roomid: data[i].roomid,
                            fromtime: data[i].fromtime,
                            roomname: roomdata[j].name,
                            totime: data[i].totime,
                            selecteddate: data[i].selecteddate,
                            todate: data[i].todate,
                            status: data[i].status,
                            floor: data[i].floor,
                            packs: data[i].packs,
                            floor: data[i].floor,
                            createdAt: data[i].createdAt,
                            updatedAt: data[i].updatedAt,
                            id: data[i].id
                        })
                    }
                }
            }
            res.send(fromtimeslots)
        })

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}



const bookinghistory = async (req, res) => {
    const employeeid = req.body.employeeid;
    await Facilityaccess.findAll({
        where: {
            employeeid: employeeid
        }
    }).then(async data => {
        await Room.findAll().then(async roomdata => {
            var fromtimeslots = []
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < roomdata.length; j++) {
                    console.log(data[i].status)
                    if (data[i].status === "Completed" || data[i] === "cancel") {
                        if (Number(data[i].roomid) === roomdata[j].id) {
                            fromtimeslots.push({
                                roomid: data[i].roomid,
                                fromtime: data[i].fromtime,
                                roomname: roomdata[j].name,
                                totime: data[i].totime,
                                selecteddate: data[i].selecteddate,
                                todate: data[i].todate,
                                status: data[i].status,
                                floor: data[i].floor,
                                packs: data[i].packs,
                                floor: data[i].floor,
                                createdAt: data[i].createdAt,
                                updatedAt: data[i].updatedAt,
                                id: data[i].id
                            })
                        }

                    }
                }
            }
            res.send(fromtimeslots)
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}

const viewbydatetime = async (req, res) => {
    const date = req.body.selecteddate;
    const floor = req.body.floor
    await Facilityaccess.findAll({
        where: {
            selecteddate: date,
            floor: floor
        }
    }).then(async data => {
        await Room.findAll().then(async roomdata => {
            var fromtimeslots = []
            var today = moment().format("HH:mm")
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < roomdata.length; j++) {
                    if (data[i].fromtime <= today && data[i].totime >= today) {
                        if (Number(data[i].roomid) === roomdata[j].id) {
                            fromtimeslots.push({
                                roomid: data[i].roomid,
                                fromtime: data[i].fromtime,
                                roomname: roomdata[j].name,
                                totime: data[i].totime,
                                selecteddate: data[i].selecteddate,
                                todate: data[i].todate,
                                status: data[i].status,
                                floor: data[i].floor,
                                packs: data[i].packs,
                                floor: data[i].floor,
                                createdAt: data[i].createdAt,
                                updatedAt: data[i].updatedAt,
                                id: data[i].id
                            })
                        }

                    }
                }
            }
            res.send(fromtimeslots)
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}


const exportfile = async (req, res) => {

    // var alldata = await Facilityaccess.findAll()
    // var alluser = await User.findAll()
    // var data = []
    // for (var i = 0; i < alluser.length; i++) {
    //     for (var j = 0; j < alldata.length; j++) {
    //         if (Number(alldata[j].employeeid) === Number(alluser[i].id)) {
    //             data.push({
    //                 info: alluser[i],
    //                 booking: alldata[j]
    //             })
    //         }
    //     }
    // }

    const finaldata = await req.body.alldata

    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    const url = await workbook.xlsx.readFile("./templates/Room Booking.xlsx")
        .then(async function () {
            var worksheet = workbook.getWorksheet(1);
            for (var i = 0; i < finaldata.length; i++) {
                var row = await worksheet.getRow(Number(9) + Number(i));
                row.getCell(1).value = finaldata[i].table.floor;
                row.getCell(2).value = finaldata[i].room.name;
                row.getCell(3).value = finaldata[i].table.packs;
                row.getCell(4).value = `${finaldata[i].info.firstname} ${finaldata[i].info.lastname}`;
                row.getCell(5).value = moment(finaldata[i].table.createdAt).format("DD-MM-YYYY");
                row.getCell(6).value = finaldata[i].table.selecteddate;
                row.getCell(7).value = finaldata[i].table.fromtime;
                row.getCell(8).value = finaldata[i].table.totime;
                row.getCell(9).value = finaldata[i].table.status;
            }
            row.commit();
            const path = `download/RoomBooking${Date.now()}.xlsx`
            await workbook.xlsx.writeFile(`${path}`);
            const base64file = fs.readFileSync(path, {
                encoding: 'base64'
            })
            const contentType = "data:@file/octet-stream;base64,"
            const url = await `${process.env.SERVER_ORIGIN}/${path}`
            return {
                url: `http://localhost:1000/${path}`,
                filepath: path,
                urlnew: `${path}`,
                filepath: path
            }
        })
    res.send(url.urlnew)
    setTimeout(async () => {
        await removeFile(`${url.filepath}`)
    }, 2000)
}


const bookedroom = async (req, res) => {
    const date = req.body.selecteddate
    const todate = req.body.todate
    const floor = req.body.floor
    const fromtime = req.body.fromtime
    const totime = req.body.totime
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    await Facilityaccess.findAll({
        where: {
            floor: floor
        }
    }).then(async data => {
        var fromtimeslots = [],
            staticdata = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].selecteddate >= date && data[i].todate <= todate) {
                if (data[i].status != "cancel" && data[i].fromtime >= fromtime || data[i].fromtime <= fromtime) {
                    fromtimeslots = []
                    fromtimeslots.push([data[i].fromtime, data[i].totime])
                    fromtimeslots.push([fromtime, totime])
                    if (timeRange.overlap(fromtimeslots)) {
                        if (data[i].fromtime == fromtime || data[i].totime == totime) {
                            staticdata.push(data[i]);
                        }
                    } else {
                        staticdata.push(data[i]);
                    }
                }
            }
        }
        res.send(staticdata)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}
const statusupdate = async (req, res) => {
    var time = moment().format("HH:mm")
    var today = moment().format("DD-MM-YYYY")
    await Facilityaccess.findAll().then(async data => {
        for (var i = 0; i < data.length; i++) {
            if (data[i].selecteddate === today) {
                if (time === data[i].fromtime && data[i].status != "cancel") {
                    const value = {
                        status: 'Occupied'
                    }
                    await Facilityaccess.update(value, {
                        where: {
                            id: data[i].id
                        }
                    })
                } else if (time === data[i].totime && data[i].status != "cancel") {
                    const value = {
                        status: 'Completed'
                    }
                    await Facilityaccess.update(value, {
                        where: {
                            id: data[i].id
                        }
                    })

                }
            }

        }
    })
}

const roomdetails = async (req, res) => {
    var employeeid = req.body.employeeid
    await User.findOne({
        where: {
            id: employeeid
        }
    }).then(async data => {
        var facility = data.facility.split(",")
        var allroomdata = []
        for (var i = 0; i < facility.length; i++) {
            await Room.findAll({
                where: {
                    id: facility[i]
                }
            }).then(async roomdata => {
                allroomdata.push(roomdata[0])
            })
        }
        res.send(allroomdata)
    })
}
const viewbydateemployee = async (req, res) => {
    const date = req.body.selecteddate;
    const employeeid = req.body.employeeid
    await Facilityaccess.findAll({
        where: {
            selecteddate: date,
            employeeid: employeeid
        }
    }).then(async data => {
        var fromtimeslots = []
        for (var i = 0; i < data.length; i++) {
            await Room.findAll({
                where: {
                    id: data[i].roomid,
                }
            }).then(async roomdata => {
                if (roomdata.length !== 0) {
                    var datamem = data[i].members.split(",")
                    var namelist = []
                    for (var a = 0; a < datamem.length; a++) {
                        await User.findAll({
                            where: {
                                id: Number(datamem[a])
                            }
                        }).then(async newuserdata => {
                            if (newuserdata[0].firstname !== undefined) {
                                namelist.push(`${newuserdata[0].firstname} ${newuserdata[0].lastname}`)
                            }
                        })
                    }
                    fromtimeslots.push({
                        roomid: data[i].roomid,
                        roomname: roomdata[0].name,
                        fromtime: data[i].fromtime,
                        totime: data[i].totime,
                        selecteddate: data[i].selecteddate,
                        todate: data[i].todate,
                        status: data[i].status,
                        floor: data[i].floor,
                        members: namelist.toString(),
                        packs: data[i].packs,
                        floor: data[i].floor,
                        createdAt: data[i].createdAt,
                        updatedAt: data[i].updatedAt,
                        id: data[i].id
                    })
                }
            })
        }
        res.send(fromtimeslots)
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}


const availabilitynew = async (req, res) => {
    const date = req.body.selecteddate
    const todate = req.body.todate
    const floor = req.body.floor
    const fromtime = req.body.fromtime
    const totime = req.body.totime
    const employeeid = req.body.employeeid
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    await Facilityaccess.findAll({
        where: {
            floor: floor
        }
    }).then(async data => {
        var fromtimeslots = [],
            staticdata = [],
            roomid = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].status != "cancel") {
                if (data[i].selecteddate >= date && data[i].todate <= todate) {
                    if (data[i].fromtime >= fromtime || data[i].fromtime <= fromtime) {
                        fromtimeslots = []
                        fromtimeslots.push([data[i].fromtime, data[i].totime])
                        fromtimeslots.push([fromtime, totime])
                        if (timeRange.overlap(fromtimeslots)) {
                            if (data[i].fromtime == fromtime || data[i].totime == totime) {
                                staticdata.push(data[i]);
                                roomid.push(data[i].roomid)
                            }
                        } else {
                            staticdata.push(data[i]);
                            roomid.push(data[i].roomid)
                        }
                    }
                }
            }

        }
        await User.findOne({
            where: {
                id: employeeid
            }
        }).then(async data => {
            var facility = data.facility.split(",")
            if (roomid.length !== 0) {
                var allroomdata = []
                var arr = facility.filter((item) => !roomid.includes(item));
                for (var a = 0; a < arr.length; a++) {
                    if (arr[a] !== "18" && arr[a] !== "16" && arr[a] !== "29" && arr[a] !== "17" && arr[a] !== "22" && arr[a] !== "30" && arr[a] !== "50") {
                        await Room.findAll({
                            where: {
                                id: arr[a],
                                floor: floor
                            }
                        }).then(async roomdata => {
                            if (roomdata[0] !== undefined) {
                                allroomdata.push(roomdata[0])
                            }
                        })
                    }
                }
                var allroomdatafinal = allroomdata.filter((v, i, a) => a.indexOf(v) === i);
                res.send(allroomdatafinal)
            } else {
                var allroomdata = []
                for (var i = 0; i < facility.length; i++) {
                    if (facility[i] !== "18" && facility[i] !== "16" && facility[i] !== "29" && facility[i] !== "17" && facility[i] !== "22" && facility[i] !== "30" && facility[i] !== "50") {
                        await Room.findAll({
                            where: {
                                id: facility[i],
                                floor: floor
                            }
                        }).then(async roomdata => {
                            if (roomdata[0] !== undefined) {
                                allroomdata.push(roomdata[0])
                            }
                        })
                    }

                }
                var allroomdatafinal = allroomdata.filter((v, i, a) => a.indexOf(v) === i);
                res.send(allroomdatafinal)
            }
        })
        //  res.send(staticdata)

    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });
}


const updateroom = async (req, res) => {
    const values = req.body;
    console.log(values);
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const newewdata = req.body;
    var email = req.body.email
    var id = req.body.employeeid
    var roomid = req.body.roomid
    var fromtime = req.body.fromtime
    var totime = req.body.totime
    var floor = req.body.floor
    var namelist = []

    await Facilityaccess.findAll({
        where: {
            selecteddate: req.body.selecteddate,
        }
    }).then(async datafinal => {
        var finaldata = []
        for (var i = 0; i < datafinal.length; i++) {
            if (datafinal[i].employeeid === id) {
                if (datafinal[i].status != "cancel") {
                    // if(datafinal[i].fromtime >= fromtime && datafinal[i].totime <= totime && datafinal[i].totime <= fromtime){
                    fromtimeslots = []
                    fromtimeslots.push([datafinal[i].fromtime, datafinal[i].totime])
                    fromtimeslots.push([fromtime, totime])
                    if (timeRange.overlap(fromtimeslots)) {
                        if (datafinal[i].fromtime == fromtime || datafinal[i].totime == totime) {
                            finaldata.push(datafinal[i]);
                        }
                    } else {
                        finaldata.push(datafinal[i]);
                    }
                }
            } else {
                if (datafinal[i].status != "cancel") {
                    if (datafinal[i].roomid !== req.body.roomid) {
                        fromtimeslots = []
                        fromtimeslots.push([datafinal[i].fromtime, datafinal[i].totime])
                        fromtimeslots.push([fromtime, totime])
                        if (timeRange.overlap(fromtimeslots)) {
                            if (datafinal[i].fromtime == fromtime || datafinal[i].totime == totime) {
                                finaldata.push(datafinal[i]);
                            }
                        } else {
                            finaldata.push(datafinal[i]);
                        }
                    }
                }
            }
        }
        if (finaldata.length === 0) {
            if (email !== undefined) {
                var staticbookeddata = []
                for (var i = 0; i < email.length; i++) {
                    await User.findAll({
                        where: {
                            email: email[i]
                        }
                    }).then(async newdata => {
                        if (newdata.length !== 0) {
                            namelist.push(`${newdata[0].id}`)
                            await Facilityaccess.findAll({
                                where: {
                                    employeeid: newdata[0].id,
                                    selecteddate: req.body.selecteddate
                                }
                            }).then(async bookeddata => {
                                for (var i = 0; i < bookeddata.length; i++) {
                                    if (bookeddata[i].selecteddate >= req.body.selecteddate && bookeddata[i].todate <= req.body.todate) {
                                        if (bookeddata[i].status != "cancel" && bookeddata[i].fromtime >= fromtime || bookeddata[i].fromtime <= fromtime) {
                                            fromtimeslots = []
                                            fromtimeslots.push([bookeddata[i].fromtime, bookeddata[i].totime])
                                            fromtimeslots.push([fromtime, totime])
                                            if (timeRange.overlap(fromtimeslots)) {
                                                if (bookeddata[i].fromtime == fromtime || bookeddata[i].totime == totime) {
                                                    staticbookeddata.push(bookeddata[i]);
                                                }
                                            } else {
                                                staticbookeddata.push(bookeddata[i]);
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
                if (staticbookeddata.length === 0) {
                    var members = namelist.toString()
                    console.log(members)
                    if (namelist.length !== 0) {
                        var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                        var b = moment(req.body.todate, 'DD-MM-YYYY');
                        var diffDays = b.diff(a, 'days') + 1;
                        for (var i = 0; i < diffDays; i++) {
                            var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                            var data = {
                                roomid: req.body.roomid,
                                selecteddate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                                todate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                                fromtime: req.body.fromtime,
                                totime: req.body.totime,
                                packs: req.body.packs,
                                floor: req.body.floor,
                                email: req.body.email,
                                employeeid: req.body.employeeid,
                                members: members
                            }
                            await Facilityaccess.update(data, {
                                where: {
                                    id: req.body.id,
                                }
                            }).then(async (data) => {

                                await Room.findAll({
                                    where: {
                                        id: roomid
                                    }
                                }).then(async roomdata => {
                                    await User.findAll({
                                        where: {
                                            id: id
                                        }
                                    }).then(async newdata => {
                                        var htmldata = `<p>Meeting Room Booking Update Confirmation (Organizer)<br></br>
                                            Hi ${newdata[0].firstname} ${newdata[0].lastname}(${newdata[0].email}) Your booking is confirmed. <br></br>
                                            Reservation code: ${data.id} <br></br>
                                            Date: ${req.body.selecteddate} to ${req.body.todate} <br></br>
                                            Time: ${req.body.fromtime} to ${req.body.totime} <br></br>
                                            Location: ${req.body.floor} <br></br>
                                            Room :${roomdata[0].name}<br></br>
                                            organizer : ${newdata[0].email}<br></br>
                                            Invitees : ${email.toString()}<br></br>
                                            </p>`
                                        // //sent html vale in data parameter
                                        sentmail(email, `Meeting Room Booking Update Confirmation: ${roomdata[0].name} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldata)

                                        for (var i = 0; i < email.length; i++) {

                                            await User.findAll({
                                                where: {
                                                    email: email[i]
                                                }
                                            }).then(async newdatanew => {
                                                var htmldatanew = `<p>Meeting Room Booking Update Confirmation (Invitee)<br></br>
                                                    Hi ${newdatanew[0].firstname} ${newdatanew[0].lastname} (${newdatanew[0].email}) You have been invited to the following event.<br></br>
                                                    Date: ${req.body.selecteddate}to ${req.body.todate}<br></br>
                                                    Time: ${req.body.fromtime} to ${req.body.totime}<br></br>
                                                    Location: ${req.body.floor} <br></br>
                                                    Room :${roomdata[0].name}<br></br>
                                                    organizer : ${newdata[0].email}<br></br>
                                                    Invitees : ${email.toString()}<br></br>
                                                    </p>`
                                                sentmail(email[i], `Meeting Room Booking Update Invitation: ${roomdata[0].name} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldatanew)
                                            })
                                        }
                                    })
                                })
                            }).catch(err => {
                                console.log(err)
                                res.status(500).send({
                                    message: err.message || "Some error occurred in query."
                                })
                            });
                            await Facilityaccess.findAll({
                                where: {
                                    id: req.body.id,
                                }
                            }).then(async (data) => {
                                await Room.findAll({
                                    where: {
                                        id: roomid
                                    }
                                }).then(async roomdata => {
                                    var datamem = data[0].members.split(",")
                                    var namelist = []
                                    for (var a = 0; a < datamem.length; a++) {
                                        await User.findAll({
                                            where: {
                                                id: Number(datamem[a])
                                            }
                                        }).then(async newuserdata => {
                                            if (newuserdata[0].firstname !== undefined) {
                                                namelist.push(`${newuserdata[0].email}`)
                                                var htmldata = `<p>${newuserdata[0].firstname} ${newuserdata[0].lastname}, You have been removed from the meeting on ${data[0].selecteddate}. <br></br></p>`
                                                sentmail(req.body.email, `Meeting Room: ${roomdata[0].name} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldata)
                                            }
                                        })
                                    }

                                })
                            }).catch(err => {
                                console.log(err)
                                res.status(500).send({
                                    message: err.message || "Some error occurred in query."
                                })
                            });


                        }
                        res.json("Registration successful");
                    } else {

                        res.status(400).send('User Not Found ..')
                    }
                } else {
                    res.status(400).send('The Invite User Already have booking in the same time..')
                }
            } else {
                res.status(400).send('Email Not Found..')
            }
            if (finaldata.length == 0) {

            } else {
                res.send('Room Already booked..')
            }
        } else {
            console.log("first")
            res.status(400).send('The User Already have booking in the same time..')
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Some error occurred in query."
        })
    });







}

module.exports = {
    create,
    viewall,
    view,
    update,
    destroy,
    viewbyuserid,
    viewbyutime,
    availability,
    availabilerooms,
    cancel,
    viewbyfloor,
    viewbydate,
    currentbooking,
    bookinghistory,
    viewbydatetime,
    exportfile,
    bookedroom,
    statusupdate,
    roomdetails,
    viewbydateemployee,
    availabilitynew,
    currentbookingnew,
    updateroom
}
