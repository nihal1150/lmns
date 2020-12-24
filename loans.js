const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const db = require('../util/database');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM loans';
    db.query(query).then(dbRes => {
        res.render(
            'loans',
            {
                pageTitle: 'loans',
                employees: dbRes.rows
            }
        );
    }).catch(dbErr => {
        console.log(dbErr);
    });
});

router.get('/add-loans', (req, res) => {
    res.render('add-loans', { pageTitle: 'Add loans' });
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    const query = `
        INSERT INTO loans
        VALUES (
            '${uuidv4()}', 
            '${req.body.name}', 
            ${req.body.loan}, 
            '${req.body.month}'
            )`;
    db.query(query).then(dbRes => {
        res.redirect('/loans');
    }).catch(dbErr => {
        next(dbErr);
    });
});

router.delete('/', (req, res) => {
    const query = `
        DELETE FROM loans
        WHERE id='${req.body.id}'
    `;
    db.query(query).then(dbRes => {
        res.redirect('/loans');
    }).catch(dbErr => {
        console.log(dbErr);
    });
});
router.put('/', (req, res) => {
    const query = `
        UPDATE loans
        SET name='${req.body.name}', 
            loan=${req.body.loan},
            month='${req.body.month}'
        WHERE id='${req.body.id}'
    `;
    db.query(query).then(dbRes => {
        res.redirect('/loans');
    }).catch(dbErr => {
        console.log(dbErr);
    });
});


module.exports = router;