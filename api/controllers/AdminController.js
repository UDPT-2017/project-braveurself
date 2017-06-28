/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const EventEmitter = require('events');

module.exports = {
	unapprovedList: function(req, res) {
        // console.log(UnapprovedProduct);
        UnapprovedProduct.find().exec(function(err, products) {
            res.view('product/unapprovedLIst', {products: products});
        })
    },

    approve: function(req, res) {
        let sendSuccessRes = new EventEmitter();
        let productList = JSON.parse(req.body.productList);
        productList.forEach(function(id, index) {
            UnapprovedProduct.findOne({id: id}).exec(function(error, product) {
                product.curPrice = product.curPrice.replace(/[$,]/g,'');
                product.immediatePrice = product.immediatePrice.replace(/[$,]/g,'');
                delete product.id;
                Product.create(product).exec(function(error, product) {
                    if (error) console.log(error);
                    else {
                        UnapprovedProduct.destroy({id: id}).exec(function(err) {
                            if (error) console.log(error);
                            sendSuccessRes.emit('success', index);
                        });
                    }
                })
            })
        }, this);
        sendSuccessRes.on('success', function(index) {
            if (index == productList.length - 1) {
                res.send(200);
            }
        })
    },

    ignore: function(req, res) {
        let sendSuccessRes = new EventEmitter();
        let productList = JSON.parse(req.body.productList);
        productList.forEach(function(id, index) {
            UnapprovedProduct.destroy({id: id}).exec(function(error) {
                if (error) console.log(error);
                sendSuccessRes.emit('success', index);
            })
        }, this);
        sendSuccessRes.on('success', function(index) {
            if (index == productList.length - 1) {
                res.send(200);
            }
        })
    }
};

