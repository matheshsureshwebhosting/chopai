const models = require('../models');
const Booking = models.Booking
const sentmail = require('./SMTP/nodemail')
const moment = require('moment')
const Table = models.tables
const User = models.users
const timeRange = require('time-range');
const fs = require("fs")
const util = require("util")
const removeFile = util.promisify(fs.unlink)
var tablenamelist = [
    {
        floor: "Floor 3",
        table: "1",
        seat: '1',
        name: "HDG1"
    },
    {
        floor: "Floor 3",
        table: "1",
        seat: '2',
        name: "HDG2"
    },
    {
        floor: "Floor 3",
        table: "1",
        seat: '3',
        name: "HDG3"
    },
    {
        floor: "Floor 3",
        table: "1",
        seat: '4',
        name: "HDG4"
    },
    {
        floor: "Floor 3",
        table: "1",
        seat: '5',
        name: "HDG5"
    },
    {
        floor: "Floor 3",
        table: "1",
        seat: '6',
        name: "HDG6"
    },
    {
        floor: "Floor 3",
        table: "2",
        seat: '7',
        name: "HDG7"
    },
    {
        floor: "Floor 3",
        table: "2",
        seat: '8',
        name: "HDG8"
    },
    {
        floor: "Floor 3",
        table: "2",
        seat: '9',
        name: "HDG9"
    },
    {
        floor: "Floor 3",
        table: "2",
        seat: '10',
        name: "HDG10"
    },
    {
        floor: "Floor 3",
        table: "3",
        seat: '11',
        name: "HDG11"
    },
    {
        floor: "Floor 3",
        table: "3",
        seat: '12',
        name: "HDG12"
    },
    {
        floor: "Floor 3",
        table: "3",
        seat: '13',
        name: "HDG13"
    },
    {
        floor: "Floor 3",
        table: "3",
        seat: '14',
        name: "HDG14"
    },

    {
        floor: "Floor 14",
        table: "1",
        seat: '1',
        name: "HDG1"
    },
    {
        floor: "Floor 14",
        table: "1",
        seat: '2',
        name: "HDG2"
    },
    {
        floor: "Floor 14",
        table: "1",
        seat: '3',
        name: "HDG3"
    },
    {
        floor: "Floor 14",
        table: "1",
        seat: '4',
        name: "HDG4"
    },
    {
        floor: "Floor 14",
        table: "1",
        seat: '5',
        name: "HDG5"
    },
    {
        floor: "Floor 14",
        table: "1",
        seat: '6',
        name: "HDG6"
    },
    {
        floor: "Floor 14",
        table: "2",
        seat: '7',
        name: "HDG7"
    },
    {
        floor: "Floor 14",
        table: "2",
        seat: '8',
        name: "HDG8"
    },
    {
        floor: "Floor 14",
        table: "2",
        seat: '9',
        name: "HDG9"
    },
    {
        floor: "Floor 14",
        table: "2",
        seat: '10',
        name: "HDG10"
    },
    {
        floor: "Floor 14",
        table: "2",
        seat: '11',
        name: "HDG11"
    },
    {
        floor: "Floor 14",
        table: "2",
        seat: '12',
        name: "HDG12"
    },
    {
        floor: "Floor 14",
        table: "3",
        seat: '13',
        name: "HDG13"
    },
    {
        floor: "Floor 14",
        table: "3",
        seat: '14',
        name: "HDG14"
    },
    {
        floor: "Floor 14",
        table: "3",
        seat: '15',
        name: "HDG15"
    },
    {
        floor: "Floor 14",
        table: "3",
        seat: '16',
        name: "HDG16"
    },
    {
        floor: "Floor 14",
        table: "3",
        seat: '17',
        name: "HDG17"
    },
    {
        floor: "Floor 14",
        table: "3",
        seat: '18',
        name: "HDG18"
    },
    {
        floor: "Floor 14",
        table: "4",
        seat: '19',
        name: "HDG19"
    },
    {
        floor: "Floor 14",
        table: "4",
        seat: '20',
        name: "HDG20"
    },
    {
        floor: "Floor 14",
        table: "4",
        seat: '21',
        name: "HDG21"
    },
    {
        floor: "Floor 14",
        table: "4",
        seat: '22',
        name: "HDG22"
    },
    {
        floor: "Floor 14",
        table: "4",
        seat: '23',
        name: "HDG23"
    },
    {
        floor: "Floor 14",
        table: "4",
        seat: '24',
        name: "HDG24"
    },
    {
        floor: "Floor 14",
        table: "5",
        seat: '25',
        name: "HDG25"
    },
    {
        floor: "Floor 14",
        table: "5",
        seat: '26',
        name: "HDG26"
    },
    {
        floor: "Floor 14",
        table: "5",
        seat: '27',
        name: "HDG27"
    },
    {
        floor: "Floor 14",
        table: "5",
        seat: '28',
        name: "HDG28"
    },
    {
        floor: "Floor 14",
        table: "5",
        seat: '29',
        name: "HDG29"
    },
    {
        floor: "Floor 14",
        table: "5",
        seat: '30',
        name: "HDG30"
    },
    {
        floor: "Floor 14",
        table: "6",
        seat: '31',
        name: "HDG31"
    },
    {
        floor: "Floor 14",
        table: "6",
        seat: '32',
        name: "HDG32"
    },
    {
        floor: "Floor 14",
        table: "6",
        seat: '33',
        name: "HDG33"
    },
    {
        floor: "Floor 14",
        table: "6",
        seat: '34',
        name: "HDG34"
    },
    {
        floor: "Floor 14",
        table: "6",
        seat: '35',
        name: "HDG35"
    },
    {
        floor: "Floor 14",
        table: "6",
        seat: '36',
        name: "HDG36"
    }

]

const create = async (req, res) => {
    var employeeid = req.body.employeeid
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    await User.findAll({ where: { id: req.body.employeeid } }).then(async userdata => {
        if (req.body.roomtype === "SRS" || req.body.roomtype === "CS" || req.body.roomtype === "PAYROLL" || req.body.roomtype === "BESPL") {
            if (userdata[0].hotdesk !== "") {
                var listroomtype = userdata[0].hotdesk.split(",");
                var resultdata = []
                for (var a = 0; a < listroomtype.length; a++) {
                    if (listroomtype[a] === req.body.roomtype) {
                        resultdata.push(listroomtype[a])
                    }
                }
                if (resultdata.length !== 0) {
                    await Booking.findAll({ where: { selecteddate: req.body.selecteddate } }).then(async data => {
                        var staticdata = []
                        for (var i = 0; i < data.length; i++) {
                            if (employeeid == data[i].employeeid) {
                                if (data[i].tableid == req.body.tableid && data[i].seatnumber == req.body.seatnumber) {
                                    if (data[i].selecteddate >= req.body.selecteddate && data[i].todate <= req.body.todate) {
                                        if ((data[i].status != "cancel" && data[i].fromtime >= req.body.fromtime) || (data[i].fromtime <= req.body.fromtime)) {
                                            fromtimeslots = []
                                            fromtimeslots.push([data[i].fromtime, data[i].totime])
                                            fromtimeslots.push([req.body.fromtime, req.body.totime])
                                            if (timeRange.overlap(fromtimeslots)) {
                                                if (data[i].fromtime == req.body.fromtime || data[i].totime == req.body.totime) {
                                                    staticdata.push(data[i]);
                                                }
                                            } else {
                                                staticdata.push(data[i]);
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (data[i].tableid == req.body.tableid && data[i].seatnumber == req.body.seatnumber) {
                                    if (data[i].selecteddate >= req.body.selecteddate && data[i].todate <= req.body.todate) {
                                        if ((data[i].status != "cancel" && data[i].fromtime >= req.body.fromtime) || (data[i].fromtime <= req.body.fromtime)) {
                                            fromtimeslots = []
                                            fromtimeslots.push([data[i].fromtime, data[i].totime])
                                            fromtimeslots.push([req.body.fromtime, req.body.totime])
                                            if (timeRange.overlap(fromtimeslots)) {
                                                if (data[i].fromtime == req.body.fromtime || data[i].totime == req.body.totime) {
                                                    staticdata.push(data[i]);
                                                }
                                            } else {
                                                staticdata.push(data[i]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (staticdata.length === 0) {
                            var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                            var b = moment(req.body.todate, 'DD-MM-YYYY');
                            var diffDays = b.diff(a, 'days') + 1;
                            for (var i = 0; i < diffDays; i++) {
                                var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                                var data = {
                                    tableid: req.body.tableid,
                                    seatnumber: req.body.seatnumber,
                                    employeeid: req.body.employeeid,
                                    selecteddate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                                    tabledetails: req.body.tabledetails,
                                    fromtime: req.body.fromtime,
                                    totime: req.body.totime,
                                    todate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                                    floor: req.body.floor,
                                    tablename: req.body.tablename,
                                }
                                await Booking.create(data).then(async data => {
                                    await User.findAll({ where: { id: req.body.employeeid } }).then(async newdata => {
                                        var htmldata = `<p> Hot Desking Booking Confirmation<br></br>
                                        Hi ${newdata[0].firstname} ${newdata[0].lastname} (${newdata[0].email}) Your booking is confirmed. <br></br>
                                        Reservation code: ${data.id} <br></br>
                                        Date: ${req.body.selecteddate} to ${req.body.todate}<br></br>
                                        Time: ${req.body.fromtime} to ${req.body.totime} <br></br>
                                        Location: ${req.body.floor}<br></br>
                                        Table: ${req.body.tablename}<br></br>
                                        </p>`
                                        sentmail(newdata[0].email, `Hot Desking Booking Confirmation: ${req.body.tablename} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldata)

                                    })
                                })
                            }
                            res.json("Registration successful");
                        } else {
                            res.status(400).send('The User Already have booking in the same time..')
                        }
                    })
                } else {
                    res.status(400).send('The User Not valid for booking..')
                }
            } else {
                res.status(400).send('The User Not valid for booking..')
            }


        } else {
            await Booking.findAll({ where: { selecteddate: req.body.selecteddate } }).then(async data => {
                var staticdata = []
                for (var i = 0; i < data.length; i++) {
                    if (employeeid === data[i].employeeid) {
                        if (data[i].tableid === req.body.tableid && data[i].seatnumber === req.body.seatnumber) {
                            if (data[i].selecteddate >= req.body.selecteddate && data[i].todate <= req.body.todate) {
                                if (data[i].status != "cancel" && data[i].fromtime >= req.body.fromtime || data[i].fromtime <= req.body.fromtime) {
                                    fromtimeslots = []
                                    fromtimeslots.push([data[i].fromtime, data[i].totime])
                                    fromtimeslots.push([req.body.fromtime, req.body.totime])
                                    if (timeRange.overlap(fromtimeslots)) {
                                        if (data[i].fromtime == req.body.fromtime || data[i].totime == req.body.totime) {
                                            staticdata.push(data[i]);
                                        }
                                    } else {
                                        staticdata.push(data[i]);
                                    }
                                }
                            }
                        }
                    } else {
                        if (data[i].tableid === req.body.tableid && data[i].seatnumber === req.body.seatnumber) {
                            if (data[i].selecteddate >= req.body.selecteddate && data[i].todate <= req.body.todate) {
                                if (data[i].status != "cancel" && data[i].fromtime >= req.body.fromtime || data[i].fromtime <= req.body.fromtime) {
                                    fromtimeslots = []
                                    fromtimeslots.push([data[i].fromtime, data[i].totime])
                                    fromtimeslots.push([req.body.fromtime, req.body.totime])
                                    if (timeRange.overlap(fromtimeslots)) {
                                        if (data[i].fromtime == req.body.fromtime || data[i].totime == req.body.totime) {
                                            staticdata.push(data[i]);
                                        }
                                    } else {
                                        staticdata.push(data[i]);
                                    }
                                }
                            }
                        }
                    }

                }
                if (staticdata.length === 0) {
                    var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                    var b = moment(req.body.todate, 'DD-MM-YYYY');
                    var diffDays = b.diff(a, 'days') + 1;
                    for (var i = 0; i < diffDays; i++) {
                        var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                        var data = {
                            tableid: req.body.tableid,
                            seatnumber: req.body.seatnumber,
                            employeeid: req.body.employeeid,
                            selecteddate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                            tabledetails: req.body.tabledetails,
                            fromtime: req.body.fromtime,
                            totime: req.body.totime,
                            todate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                            floor: req.body.floor,
                            tablename: req.body.tablename,
                        }
                        await Booking.create(data).then(async data => {
                            await User.findAll({ where: { id: req.body.employeeid } }).then(async newdata => {
                                var htmldata = `<p> Hot Desking Booking Confirmation<br></br>
                                Hi ${newdata[0].firstname} ${newdata[0].lastname} (${newdata[0].email}) Your booking is confirmed. <br></br>
                                Reservation code: ${data.id} <br></br>
                                Date: ${req.body.selecteddate} to ${req.body.todate}<br></br>
                                Time: ${req.body.fromtime} to ${req.body.totime} <br></br>
                                Location: ${req.body.floor}<br></br>
                                Table: ${req.body.tablename}<br></br>
                                </p>`
                                sentmail(newdata[0].email, `Hot Desking Booking Confirmation: ${req.body.tablename} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldata)
                            })
                        })
                    }
                    res.json("Registration successful");
                } else {
                    res.status(400).send('The User Already have booking in the same time..')
                }
            })
        }
    })
}



const viewall = async (req, res) => {
    await Booking.findAll().then(data => {

        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
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

    await Booking.findByPk(data).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const viewbyuserid = async (req, res) => {
    const data = req.body.employeeid;
    if (!req.body.employeeid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await Booking.findAll({ where: { employeeid: data } }).then(data => {
        res.send(data);
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

    await Booking.update(value, {
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

    await Booking.destroy({
        where: {
            employeeid: data
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

const viewbyutime = async (req, res) => {
    const data = req.body.employeeid;
    await Booking.findAll({ where: { employeeid: data } }).then(async data => {
        var finaldata = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == 'Occupied' || data[i].status == 'Reserved') {
                // for (var j = 0; j < tablenamelist.length; j++) {
                //     console.log(data[i].seatnumber === tablenamelist[j].seat)
                //     if (data[i].floor === tablenamelist[j].floor && data[i].tableid === tablenamelist[j].table && data[i].seatnumber === tablenamelist[j].seat) {
                //         finaldata.push({
                //             id: data[i].id,
                //             tableid: data[i].tableid,
                //             seatnumber: data[i].seatnumber,
                //             fromtime: data[i].fromtime,
                //             totime: data[i].totime,
                //             selecteddate: data[i].selecteddate,
                //             todate: data[i].todate,
                //             tablename: tablenamelist[j].name,
                //             status: data[i].status,
                //             floor: data[i].floor
                //         })
                //     }
                // }
                finaldata.push({
                    id: data[i].id,
                    tableid: data[i].tableid,
                    seatnumber: data[i].seatnumber,
                    fromtime: data[i].fromtime,
                    totime: data[i].totime,
                    selecteddate: data[i].selecteddate,
                    todate: data[i].todate,
                    tablename: data[i].tablename,
                    status: data[i].status,
                    floor: data[i].floor
                })
            }
        }
        res.send(finaldata);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const viewbydate = async (req, res) => {
    const date = req.body.selecteddate;
    const floor = req.body.floor
    await Booking.findAll({ where: { selecteddate: date, floor: floor } }).then(async data => {
        var fromtimeslots = []
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < tablenamelist.length; j++) {
                if (data[i].floor === tablenamelist[j].floor && data[i].tableid === tablenamelist[j].table && data[i].seatnumber === tablenamelist[j].seat) {
                    fromtimeslots.push({
                        tableid: data[i].tableid,
                        seatnumber: data[i].seatnumber,
                        fromtime: data[i].fromtime,
                        totime: data[i].totime,
                        selecteddate: data[i].selecteddate,
                        todate: data[i].todate,
                        tablename: tablenamelist[j].name,
                        status: data[i].status,
                        floor: data[i].floor

                    })
                } else {
                    fromtimeslots.push({
                        tableid: data[i].tableid,
                        seatnumber: data[i].seatnumber,
                        fromtime: data[i].fromtime,
                        totime: data[i].totime,
                        selecteddate: data[i].selecteddate,
                        todate: data[i].todate,
                        tablename: data[i].tablename,
                        status: data[i].status,
                        floor: data[i].floor

                    })
                }
            }
            // fromtimeslots.push(`{"tableid": ${data[i].tableid},"seatno": ${data[i].seatnumber}, "time":{"fromtime": "${data[i].fromtime}", "totime": "${data[i].totime}"}}`)
        }
        res.send(fromtimeslots)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const viewbydateemployee = async (req, res) => {
    const date = req.body.selecteddate;
    const employeeid = req.body.employeeid
    await Booking.findAll({ where: { selecteddate: date, employeeid: employeeid } }).then(async data => {
        var fromtimeslots = []
        for (var i = 0; i < data.length; i++) {
            fromtimeslots.push({
                tableid: data[i].tableid,
                seatnumber: data[i].seatnumber,
                fromtime: data[i].fromtime,
                totime: data[i].totime,
                selecteddate: data[i].selecteddate,
                todate: data[i].todate,
                tablename: data[i].tablename,
                status: data[i].status,
                floor: data[i].floor

            })

            // fromtimeslots.push(`{"tableid": ${data[i].tableid},"seatno": ${data[i].seatnumber}, "time":{"fromtime": "${data[i].fromtime}", "totime": "${data[i].totime}"}}`)
        }
        res.send(fromtimeslots)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const viewbydatefilter = async (req, res) => {
    const date = req.body.selecteddate;
    const floor = req.body.floor
    await Booking.findAll({ where: { selecteddate: date, floor: floor } }).then(async data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const viewbyfloor = async (req, res) => {
    const floor = req.body.floor
    await Booking.findAll({ where: { floor: floor } }).then(async data => {
        var fromtimeslots = []
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < tablenamelist.length; j++) {
                if (data[i].floor === tablenamelist[j].floor && data[i].tableid === tablenamelist[j].table && data[i].seatnumber === tablenamelist[j].seat) {
                    fromtimeslots.push({
                        tableid: data[i].tableid,
                        seatnumber: data[i].seatnumber,
                        fromtime: data[i].fromtime,
                        totime: data[i].totime,
                        selecteddate: data[i].selecteddate,
                        todate: data[i].todate,
                        tablename: tablenamelist[j].name,
                        status: data[i].status,
                        floor: data[i].floor

                    })
                } else {
                    fromtimeslots.push({
                        tableid: data[i].tableid,
                        seatnumber: data[i].seatnumber,
                        fromtime: data[i].fromtime,
                        totime: data[i].totime,
                        selecteddate: data[i].selecteddate,
                        todate: data[i].todate,
                        tablename: data[i].tablename,
                        status: data[i].status,
                        floor: data[i].floor

                    })
                }
            }
            // fromtimeslots.push(`{tableid: ${data[i].tableid},seatnumber: "${data[i].seatnumber}":{"fromtime": "${data[i].fromtime}", "totime": "${data[i].totime}"}}`)
        }
        res.send(fromtimeslots)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const currentbooking = async (req, res) => {
    const employeeid = req.body.employeeid;
    await Booking.findAll({ where: { employeeid: employeeid } }).then(async data => {
        var fromtimeslots = []
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < tablenamelist.length; j++) {
                var today = req.body.current_time
                if (data[i].selecteddate >= today && data[i].status != "cancel") {
                    if (data[i].floor === tablenamelist[j].floor && data[i].tableid === tablenamelist[j].table && data[i].seatnumber === tablenamelist[j].seat) {
                        fromtimeslots.push({
                            tableid: data[i].tableid,
                            seatnumber: data[i].seatnumber,
                            fromtime: data[i].fromtime,
                            totime: data[i].totime,
                            selecteddate: data[i].selecteddate,
                            todate: data[i].todate,
                            tablename: tablenamelist[j].name,
                            status: data[i].status,
                            floor: data[i].floor

                        })
                    } else {
                        fromtimeslots.push({
                            tableid: data[i].tableid,
                            seatnumber: data[i].seatnumber,
                            fromtime: data[i].fromtime,
                            totime: data[i].totime,
                            selecteddate: data[i].selecteddate,
                            todate: data[i].todate,
                            tablename: data[i].tablename,
                            status: data[i].status,
                            floor: data[i].floor

                        })
                    }
                    // fromtimeslots.push(`{tableid: ${data[i].tableid},timing: {"fromtime": "${data[i].fromtime}", "totime": "${data[i].totime}","date": "${data[i].selecteddate}"}}`)
                }
            }
        }
        res.send(fromtimeslots)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const bookinghistory = async (req, res) => {
    const employeeid = req.body.employeeid;
    await Booking.findAll({ where: { employeeid: employeeid } }).then(async data => {
        var fromtimeslots = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].selecteddate == req.body.selecteddate && (data[i].status == "Completed" || data[i].status == "cancel")) {
                fromtimeslots.push({
                    tableid: data[i].tableid,
                    seatnumber: data[i].seatnumber,
                    fromtime: data[i].fromtime,
                    totime: data[i].totime,
                    selecteddate: data[i].selecteddate,
                    todate: data[i].todate,
                    tablename: data[i].tablename,
                    status: data[i].status,
                    floor: data[i].floor
                })
            }
        }
        res.send(fromtimeslots)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}




const avalibility = async (req, res) => {
    const date = req.body.selecteddate;
    const floor = req.body.floor
    const fromtime = req.body.fromtime
    const totime = req.body.totime
    await Booking.findAll({ where: { selecteddate: date, floor: floor } }).then(async data => {
        var fromtimeslots = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].fromtime <= fromtime && data[i].totime >= totime) {
                fromtimeslots.push({
                    table: data[i].tableid,
                    seat: data[i].seatnumber
                })
            }
        }
        await Table.findAll({ where: { floor: floor } }).then(async datanew => {
            var datafinal = []
            for (var i = 0; i < datanew.length; i++) {
                for (var j = 0; j < fromtimeslots.length; j++) {
                    if (fromtimeslots[j] != undefined) {
                        if (datanew[i].tablenumber == fromtimeslots[j].table) {
                            var seatsplit = datanew[i].seat.split(",")
                            var filtered = seatsplit.filter(function (value, index, arr) {
                                return value != fromtimeslots[j].seat;
                            });
                            datafinal.push({
                                id: datanew[i].tablenumber,
                                seat: filtered.toString()
                            })
                        } else {
                            datafinal.push({
                                id: datanew[i].tablenumber,
                                seat: datanew[i].seat
                            })
                        }
                    }
                }
            }
            var unique = datafinal.filter((v, i, a) => a.indexOf(v) === i);
            res.send(unique)
        })
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const viewbydatetime = async (req, res) => {
    const date = req.body.selecteddate;
    const floor = req.body.floor
    const time = req.body.current_time
    await Booking.findAll({ where: { selecteddate: date, floor: floor } }).then(async data => {
        var fromtimeslots = []
        var today = time
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < tablenamelist.length; j++) {
                if (data[i].fromtime <= today && data[i].totime >= today && data[i].status != 'cancel') {
                    if (data[i].floor === tablenamelist[j].floor && data[i].tableid === tablenamelist[j].table && data[i].seatnumber === tablenamelist[j].seat) {
                        fromtimeslots.push({
                            tableid: data[i].tableid,
                            seatnumber: data[i].seatnumber,
                            fromtime: data[i].fromtime,
                            totime: data[i].totime,
                            selecteddate: data[i].selecteddate,
                            todate: data[i].todate,
                            tablename: tablenamelist[j].name,
                            status: data[i].status,
                            floor: data[i].floor

                        })
                    } else {
                        fromtimeslots.push({
                            tableid: data[i].tableid,
                            seatnumber: data[i].seatnumber,
                            fromtime: data[i].fromtime,
                            totime: data[i].totime,
                            selecteddate: data[i].selecteddate,
                            todate: data[i].todate,
                            tablename: data[i].tablename,
                            status: data[i].status,
                            floor: data[i].floor

                        })
                    }
                    // fromtimeslots.push(`{tableid: "${data[i].tableid}",seatnumber: "${data[i].seatnumber}", time:{"fromtime": "${data[i].fromtime}", "totime": "${data[i].totime}"}}`)

                }
            }
        }
        res.send(fromtimeslots)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}
const exportfile = async (req, res) => {
    // var alldata = await Booking.findAll()
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

    const finaldata = await req.body.alldata;
    var Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    const url = await workbook.xlsx.readFile("./templates/Hot Desk Booking.xlsx")
        .then(async function () {
            var worksheet = workbook.getWorksheet(1);
            for (var i = 0; i < finaldata.length; i++) {
                var row = await worksheet.getRow(Number(9) + Number(i));
                row.getCell(1).value = finaldata[i].table.floor;
                row.getCell(2).value = finaldata[i].table.tableid;
                row.getCell(3).value = finaldata[i].table.seatnumber;
                row.getCell(4).value = `${finaldata[i].info.firstname} ${finaldata[i].info.lastname}`;
                row.getCell(5).value = moment(finaldata[i].table.createdAt).format("DD-MM-YYYY");
                row.getCell(6).value = finaldata[i].table.selecteddate;
                row.getCell(7).value = finaldata[i].table.fromtime;
                row.getCell(8).value = finaldata[i].table.totime;
                row.getCell(9).value = finaldata[i].table.status;
            }
            row.commit();
            const path = `download/HotDeskBooking${Date.now()}.xlsx`
            await workbook.xlsx.writeFile(`${path}`);
            const base64file = fs.readFileSync(path, { encoding: 'base64' })
            const contentType = "data:@file/octet-stream;base64,"
            const url = await `${process.env.SERVER_ORIGIN}/${path}`
            return { url: `http://localhost:1000/${path}`, filepath: path, urlnew: `${path}`, filepath: path }
        })
    res.send(url.urlnew)
    setTimeout(async () => { await removeFile(`${url.filepath}`) }, 2000)
}

const availabilitynew = async (req, res) => {
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
    await Booking.findAll({ where: { floor: floor } }).then(async data => {
        var fromtimeslots = [], staticdata = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].selecteddate >= date && data[i].todate <= todate) {
                if ((data[i].status != "cancel" && data[i].status != "Completed") && (data[i].fromtime >= fromtime || data[i].fromtime <= fromtime)) {
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
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const statusupdate = async (req, res) => {
    var time = moment().format("HH:mm")
    var today = moment().format("DD-MM-YYYY")
    await Booking.findAll().then(async data => {
        for (var i = 0; i < data.length; i++) {
            if (data[i].selecteddate === today) {
                if (time === data[i].fromtime && data[i].status != "cancel") {
                    const value = {
                        status: 'Occupied'
                    }
                    await Booking.update(value, {
                        where: {
                            id: data[i].id
                        }
                    })
                } else if (time === data[i].totime && data[i].status != "cancel") {
                    const value = {
                        status: 'Completed'
                    }
                    await Booking.update(value, {
                        where: {
                            id: data[i].id
                        }
                    })
                }
            }

        }
    })
}
const updatebooking = async (req, res) => {
    var employeeid = req.body.employeeid
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    await User.findAll({ where: { id: req.body.employeeid } }).then(async userdata => {
        if (req.body.roomtype !== "GENERAL") {
            var listroomtype = userdata[0].hotdesk.split(",");
            var resultdata = []
            for (var a = 0; a < listroomtype.length; a++) {
                if (listroomtype[a] === req.body.roomtype) {
                    resultdata.push(listroomtype[a])
                }
            }
            if (resultdata.length !== 0) {
                await Booking.findAll({ where: { selecteddate: req.body.selecteddate } }).then(async data => {
                    var staticdata = []
                    for (var i = 0; i < data.length; i++) {
                        if (employeeid === data[i].employeeid) {
                            if (data[i].tableid !== req.body.tableid && data[i].seatnumber !== req.body.seatnumber) {
                                if (data[i].selecteddate >= req.body.selecteddate && data[i].todate <= req.body.todate) {
                                    if (data[i].status != "cancel" && data[i].fromtime >= req.body.fromtime || data[i].fromtime <= req.body.fromtime) {
                                        fromtimeslots = []
                                        fromtimeslots.push([data[i].fromtime, data[i].totime])
                                        fromtimeslots.push([req.body.fromtime, req.body.totime])
                                        if (timeRange.overlap(fromtimeslots)) {
                                            if (data[i].fromtime == req.body.fromtime || data[i].totime == req.body.totime) {
                                                staticdata.push(data[i]);
                                            }
                                        } else {
                                            staticdata.push(data[i]);
                                        }
                                    }
                                }
                            }
                        } else {
                            if (data[i].tableid === req.body.tableid && data[i].seatnumber === req.body.seatnumber) {
                                if (data[i].selecteddate >= req.body.selecteddate && data[i].todate <= req.body.todate) {
                                    if (data[i].status != "cancel" && data[i].fromtime >= req.body.fromtime || data[i].fromtime <= req.body.fromtime) {
                                        fromtimeslots = []
                                        fromtimeslots.push([data[i].fromtime, data[i].totime])
                                        fromtimeslots.push([req.body.fromtime, req.body.totime])
                                        if (timeRange.overlap(fromtimeslots)) {
                                            if (data[i].fromtime == req.body.fromtime || data[i].totime == req.body.totime) {
                                                staticdata.push(data[i]);
                                            }
                                        } else {
                                            staticdata.push(data[i]);
                                        }
                                    }
                                }
                            }
                        }

                    }
                    if (staticdata.length === 0) {
                        var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                        var b = moment(req.body.todate, 'DD-MM-YYYY');
                        var diffDays = b.diff(a, 'days') + 1;
                        for (var i = 0; i < diffDays; i++) {
                            var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                            var data = {
                                tableid: req.body.tableid,
                                seatnumber: req.body.seatnumber,
                                employeeid: req.body.employeeid,
                                selecteddate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                                tabledetails: req.body.tabledetails,
                                fromtime: req.body.fromtime,
                                totime: req.body.totime,
                                todate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                                floor: req.body.floor,
                                tablename: req.body.tablename,
                            }
                            await Booking.update(data, {
                                where: {
                                    id: req.body.id,
                                }
                            }).then(async data => {
                                await User.findAll({ where: { id: req.body.employeeid } }).then(async newdata => {
                                    for (var j = 0; j < tablenamelist.length; j++) {
                                        if (req.body.tableid === tablenamelist[j].table && req.body.seatnumber === tablenamelist[j].seat) {
                                            var htmldata = `<p> Hot Desking Booking Update Confirmation<br></br>
                                                            Hi ${newdata[0].firstname} ${newdata[0].lastname} (${newdata[0].email}) Your booking is confirmed. <br></br>
                                                            Reservation code: ${data.id} <br></br>
                                                            Date: ${req.body.selecteddate} to ${req.body.todate}<br></br>
                                                            Time: ${req.body.fromtime} to ${req.body.totime} <br></br>
                                                            Location: ${req.body.floor}<br></br>
                                                            Table: ${tablenamelist[j].name}<br></br>
                                                            </p>`
                                            sentmail(newdata[0].email, `Hot Desking Booking Update Confirmation: ${tablenamelist[j].name} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldata)
                                        }
                                    }

                                })
                            }).catch(err => {
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred in query."
                                })
                            });

                        }
                        res.json("Registration successful");
                    } else {
                        res.status(400).send('The User Already have booking in the same time..')
                    }
                })
            } else {
                res.status(400).send('The User Not valid for booking..')
            }
        } else {
            await Booking.findAll({ where: { selecteddate: req.body.selecteddate } }).then(async data => {
                var staticdata = []
                for (var i = 0; i < data.length; i++) {
                    if (employeeid === data[i].employeeid) {
                        if (data[i].tableid !== req.body.tableid && data[i].seatnumber !== req.body.seatnumber) {
                            if (data[i].selecteddate >= req.body.selecteddate && data[i].todate <= req.body.todate) {
                                if (data[i].status != "cancel" && data[i].fromtime >= req.body.fromtime || data[i].fromtime <= req.body.fromtime) {
                                    fromtimeslots = []
                                    fromtimeslots.push([data[i].fromtime, data[i].totime])
                                    fromtimeslots.push([req.body.fromtime, req.body.totime])
                                    if (timeRange.overlap(fromtimeslots)) {
                                        if (data[i].fromtime == req.body.fromtime || data[i].totime == req.body.totime) {
                                            staticdata.push(data[i]);
                                        }
                                    } else {
                                        staticdata.push(data[i]);
                                    }
                                }
                            }
                        }
                    } else {
                        if (data[i].tableid === req.body.tableid && data[i].seatnumber === req.body.seatnumber) {
                            if (data[i].selecteddate >= req.body.selecteddate && data[i].todate <= req.body.todate) {
                                if (data[i].status != "cancel" && data[i].fromtime >= req.body.fromtime || data[i].fromtime <= req.body.fromtime) {
                                    fromtimeslots = []
                                    fromtimeslots.push([data[i].fromtime, data[i].totime])
                                    fromtimeslots.push([req.body.fromtime, req.body.totime])
                                    if (timeRange.overlap(fromtimeslots)) {
                                        if (data[i].fromtime == req.body.fromtime || data[i].totime == req.body.totime) {
                                            staticdata.push(data[i]);
                                        }
                                    } else {
                                        staticdata.push(data[i]);
                                    }
                                }
                            }
                        }
                    }

                }
                if (staticdata.length === 0) {
                    var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                    var b = moment(req.body.todate, 'DD-MM-YYYY');
                    var diffDays = b.diff(a, 'days') + 1;
                    for (var i = 0; i < diffDays; i++) {
                        var a = moment(req.body.selecteddate, 'DD-MM-YYYY');
                        var data = {
                            tableid: req.body.tableid,
                            seatnumber: req.body.seatnumber,
                            employeeid: req.body.employeeid,
                            selecteddate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                            tabledetails: req.body.tabledetails,
                            fromtime: req.body.fromtime,
                            totime: req.body.totime,
                            todate: moment(a).add(i, 'days').format("DD-MM-YYYY"),
                            floor: req.body.floor,
                            tablename: req.body.tablename,
                        }
                        await Booking.update(data, {
                            where: {
                                id: req.body.id,
                            }
                        }).then(async data => {
                            await User.findAll({ where: { id: req.body.employeeid } }).then(async newdata => {
                                for (var j = 0; j < tablenamelist.length; j++) {
                                    if (req.body.tableid === tablenamelist[j].table && req.body.seatnumber === tablenamelist[j].seat) {
                                        var htmldata = `<p> Hot Desking Booking Update Confirmation<br></br>
                                                        Hi ${newdata[0].firstname} ${newdata[0].lastname} (${newdata[0].email}) Your booking is confirmed. <br></br>
                                                        Reservation code: ${data.id} <br></br>
                                                        Date: ${req.body.selecteddate} to ${req.body.todate}<br></br>
                                                        Time: ${req.body.fromtime} to ${req.body.totime} <br></br>
                                                        Location: ${req.body.floor}<br></br>
                                                        Table: ${tablenamelist[j].name}<br></br>
                                                        </p>`
                                        sentmail(newdata[0].email, `Hot Desking Booking Update Confirmation: ${tablenamelist[j].name} at ${req.body.fromtime} on ${req.body.selecteddate}`, htmldata)
                                    }
                                }

                            })
                        }).catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred in query."
                            })
                        });

                    }
                    res.json("Registration successful");
                } else {
                    res.status(400).send('The User Already have booking in the same time..')
                }
            })
        }
    })



}


module.exports = {
    create,
    viewall,
    view,
    viewbyuserid,
    update,
    destroy,
    viewbyutime,
    viewbydate,
    viewbyfloor,
    viewbydateemployee,
    currentbooking,
    bookinghistory,
    avalibility,
    viewbydatetime,
    viewbydatefilter,
    exportfile,
    availabilitynew,
    statusupdate,
    updatebooking
}
