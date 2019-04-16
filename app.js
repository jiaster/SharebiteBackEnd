const express = require('express');
const db = require('./db/db.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get all menu sections
app.get('/menusection', (req, res) => {
    db.getAllMenuSections((err, result) => {
        if (err) {
            console.log("err");
            console.log(err);
            res.status(400).send({
                success: false
            });
        }
        else {
            res.status(200).send({
                MenuSection: result
            });
        }
    });
});
//Get Menu Section by id
app.get('/menusection/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.getMenuSectionById(id, (err, result) => {
        if (err) {
            console.log("err");
            console.log(err);
            res.status(400).send({
                success: false
            });
        }
        if (result != undefined && result.length != 0) {
            res.status(200).send({
                MenuSection: result
            });
        }
        else {
            res.status(404).send({
                success: false,
                message: 'id not found'
            });
        }
    });

});
// Add menu section, body.name = name
app.post('/menusection', (req, res) => {
    console.log(req.body);
    if (!req.body.name) {
        res.status(400).send({
            success: false,
            message: 'name is missing'
        });
    } else {
        const name = req.body.name;
        db.addMenuSection(name, (err, result) => {
            if (err) {
                console.log("err");
                console.log(err);
                res.status(400).send({
                    success: false
                });
            }
            else {
                res.status(200).send({
                    success: true,
                    MenuSection: result
                });
            }
        });
    }
});
// Edit menu section with id to new name
app.post('/menusection/:id', (req, res) => {
    console.log(req.body);
    const id = parseInt(req.params.id);
    if (!req.body.name) {
        res.status(400).send({
            success: false,
            message: 'name is missing'
        });
    } else {
        const name = req.body.name;
        db.editMenuSection(id, name, (err, result) => {
            if (err) {
                console.log("err");
                console.log(err);
                res.status(400).send({
                    success: false
                });
            } else if (result != undefined && result.length != 0) {
                res.status(200).send({
                    success: true,
                    MenuSection: result
                });
            }
            else {
                res.status(404).send({
                    success: false,
                    message: 'id not found'
                });
            }
        });
    }
});
// Delete menu section by ID, gets entry with id first to check if it exists
app.delete('/menusection/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.getMenuSectionById(id, (err, result) => {
        if (err) {
            console.log("err");
            console.log(err);
            res.status(400).send({
                success: false
            });
        }
        if (result != undefined && result.length != 0) {
            db.deleteMenuSection(id, (err, result) => {
                console.log(result);
                if (err) {
                    console.log("err");
                    console.log(err);
                    res.status(400).send({
                        success: false
                    });
                }
                else {
                    res.status(200).send({
                        success: true
                    });
                }
            });
        }
        else {
            res.status(404).send({
                success: false,
                message: 'id not found'
            });
        }
    });

});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});