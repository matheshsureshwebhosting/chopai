const models = require('../models');
const Table = models.email_log
const fs = require("fs")
const util = require("util")
const removeFile = util.promisify(fs.unlink)

const create = async (req, res) => {
    const data = req.body;

    await Table.create(data).then(data => {
        res.json("Registration successful");
    }).catch(err => {
        res.send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const viewall = async (req, res) => {
    await Table.findAll().then(data => {
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

    await Table.findByPk(data).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const update = async (req, res) => {
    const value = req.body.value;
    const id = req.body.id
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await Table.update(value, {
        where: {
            id: id
        }
    }).then(() => {
        res.send("Updated Successfully");
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const destroy = async (req, res) => {
    const data = req.body;

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    await Table.destroy({
        where: data
    }).then(() => {
        res.send("Deleted Successfully");
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred in query."
        })
    });
}

const exportfile = async (req, res) => {
    try {
        await Table.findAll().then(async data => {
            const finaldata = await data
            var Excel = require('exceljs');
            var workbook = new Excel.Workbook();
            const url = await workbook.xlsx.readFile("./templates/Log Data.xlsx")
                .then(async function () {
                    var worksheet = workbook.getWorksheet(1);
                    for (var i = 0; i < finaldata.length; i++) {
                        var row = await worksheet.getRow(Number(9) + Number(i));
                        row.getCell(1).value = finaldata[i].name;
                        row.getCell(2).value = finaldata[i].deviceid;
                        row.getCell(3).value = finaldata[i].temperature;
                        row.getCell(4).value = finaldata[i].status;
                        row.getCell(5).value = finaldata[i].time;
                    }
                    row.commit();
                    const path = `download/LogData${Date.now()}.xlsx`
                    await workbook.xlsx.writeFile(`${path}`);
                    const base64file = fs.readFileSync(path, { encoding: 'base64' })
                    const contentType = "data:@file/octet-stream;base64,"
                    const url = await `${process.env.SERVER_ORIGIN}/${path}`
                    return { url: `http://localhost:1000/${path}`, filepath: path, urlnew: `${path}`, filepath: path }
                })
            res.send(url.urlnew)
            setTimeout(async () => { await removeFile(`${url.filepath}`) }, 2000)
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    create,
    viewall,
    view,
    update,
    destroy,
    exportfile
}