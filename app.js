const database = require("./config/db");
let path = require('path');

const express = require('express');
const { REFUSED } = require("dns");
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const { log } = require("console");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    database.query('SELECT * FROM productcollection',
        function (err, result) {
            if (err)
                console.log(err);
            res.render('products/list', {
                title: 'Employee List',
                data: result
            })
        });
});


app.get('/add', function (req, res) {
    res.render('products/add', {
        title: 'Add Employee',
        ProductCode: '',
        ProductName: '',
        ProductData: '',
        ProductOriginPrice: '',
        Quantity: '',
        ProductStoreCode: ''


    });
});

app.post('/add', function (req, res) {
    let product = {
        ProductCode: req.body.ProductCode,
        ProductName: req.body.ProductName,
        ProductData: req.body.ProductData,
        ProductOriginPrice: req.body.ProductOriginPrice,
        Quantity: req.body.Quantity,
        ProductStoreCode: req.body.ProductStoreCode,


    }

    database.query('INSERT INTO productcollection SET  ? ', product, function (err, result) {
        if (err) {
            console.log('Lỗi:', err);
        } else {
            console.log('Thêm thành công');
            res.redirect('/');
        }
    });
});


app.post('/products/delete/:id', function (req, res) {
    let productId = req.params.id;

    database.query('DELETE FROM productcollection WHERE id = ?', productId, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Xóa thành công');
            res.redirect('/');
        }
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})