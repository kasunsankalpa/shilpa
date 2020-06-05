
const db = require('../../util/conn');

exports.getProduct = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT products.Product_id, products.product_name, products.descripsion_1, products.description_2, products.img_url_1, products.img_url_2, products.active_status FROM `products` WHERE products.active_status = '1'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getProductby_productId = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT products.Product_id, products.product_name, products.descripsion_1, products.description_2, products.img_url_1, products.img_url_2, products.active_status FROM `products` WHERE products.active_status = '1' AND products.Product_id = '"+req.body.produc+"'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetProductType = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT product_type.product_type_id, product_type.product_id, product_type.product_pack_size, product_type.product_price, product_type.active_status FROM `product_type` WHERE product_type.product_id = '"+req.body.produc+"' AND product_type.active_status = '1'",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}