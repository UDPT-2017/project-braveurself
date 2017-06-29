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
    },

    user: function(req, res) {
        User.find().exec(function(error, users) {
            let normalUser = users.filter(user => user.role != 1)
            let admin = users.filter(user => user.role == 1)
            res.view('admin/user', {
                normalUser: normalUser,
                admin: admin
            })
        })
    },

    editUser: function(req, res) {
        let id = req.params.id;
        User.findOne({id: id}).exec(function(error, user) {
            res.view('admin/userInfo', {
                user: user
            })
        })
    },

    resetPassword: function(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        User.updatePassword(email, password, function(error) {
            if (error) return res.send(404);
            res.redirect('/admin/user');
        })
    },

    deleteUser: function(req, res) {
        let id = req.params.id;
        User.destroy({id: id}).exec(function(error) {
            if (error) return res.send(404);
            res.redirect('/admin/user');
        })
    }
};

