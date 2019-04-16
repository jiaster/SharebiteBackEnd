const sqlite3 = require('sqlite3');
const path = require('path')
const dbPath = path.resolve(__dirname, 'sharebite.db')

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    else { console.log('Connected to database.'); }
});

function getAllMenuSections() {
    const getAllQuery = 'SELECT * FROM menusection';
    db.all(getAllQuery, [], (err, rows) => {
        if (err) {
            throw err;
        }
        var MenuSection = [];

        rows.forEach((row) => {
            MenuSection.push(row);
            console.log(row);
        });
        //console.log(MenuSection);
    });
}
//getAllMenuSections();

function getMenuSectionById(id) {
    const getIdQuery = 'SELECT * FROM menusection WHERE id=' + id;
    db.all(getIdQuery, [], (err, rows) => {
        if (err) {
            throw err;//CATCH
        }
        var MenuSection = [];

        rows.forEach((row) => {
            MenuSection.push(row);
            console.log(row);
        });
        //console.log(MenuSection);
    });
}
//getMenuSectionById(2);


module.exports = {
    getAllMenuSections: function () {
        const getAllQuery = 'SELECT * FROM menusection';
        db.all(getAllQuery, [], (err, rows) => {
            if (err) {
                throw err;
            }
            var MenuSection = [];

            rows.forEach((row) => {
                MenuSection.push(row);
                console.log(row);
            });
            //console.log(MenuSection);
        });
    },
    getMenuSectionById: function (id) {
        const getIdQuery = 'SELECT * FROM menusection WHERE id=' + id;
        db.all(getIdQuery, [], (err, rows) => {
            if (err) {
                throw err;//CATCH
            }
            var MenuSection = [];

            rows.forEach((row) => {
                MenuSection.push(row);
                console.log(row);
            });
            //console.log(MenuSection);
        });
    },
    addMenuSection: function (name) {
        const getIdQuery = 'INSERT INTO menusection(name) VALUES("' + name + '")';
        db.all(getIdQuery, [], (err, rows) => {
            if (err) {
                throw err;//CATCH
            }
            const getNewEntryQuery = 'SELECT * FROM menusection WHERE name="' + name + '"';
            db.all(getNewEntryQuery, [], (error, rows) => {
                if (error) {
                    throw error;//CATCH
                }
                var MenuSection = [];
                rows.forEach((row) => {
                    MenuSection.push(row);
                });
            });
        });
    },
    editMenuSection: function (id, name) {
        const getIdQuery = 'UPDATE menusection SET name="' + name + '" WHERE id=' + id;
        db.all(getIdQuery, [], (err, rows) => {
            if (err) {
                throw err;//CATCH
            }
            const getNewEntryQuery = 'SELECT * FROM menusection WHERE id=' + id;
            db.all(getNewEntryQuery, [], (error, rows) => {
                if (error) {
                    throw error;//CATCH
                }
                var MenuSection = [];
                rows.forEach((row) => {
                    MenuSection.push(row);
                });
            });
        });
    },
    deleteMenuSection: function (id) {
        const getIdQuery = 'DELETE FROM menusection WHERE id=' + id;
        db.all(getIdQuery, [], (err, rows) => {
            if (err) {
                throw err;//CATCH
            }
        });
    }
};