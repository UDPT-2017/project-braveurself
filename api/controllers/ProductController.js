/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getTop5: function(req, res) {
        Product.getHighestPriceItems(function(products_HighestPrice) {
            Product.getMostBiddedItems(function(products_MostBidded) {
                Product.getAlmostExpiredItems(function(products_AlmostExpired) {
                    res.view('home/index', {
                        products_HighestPrice: products_HighestPrice,
                        products_MostBidded: products_MostBidded,
                        products_AlmostExpired: products_AlmostExpired
                    });
                })
            });
        });
    },

    getInfo: function(req, res) {
        Product.findOne(req.params.id, function(err, result) {
            res.view('product/info', {
                product: result,
            });
        })
    },

    showProducts: function(req, res) {
        Product.find().exec(function(err, result) {
            res.view('product/index', {
                products: result,
            });
        });
    },

    /*
    getAll: function(req, res) {
    	Product.getAll(function(err, result) {
    		console.log(result);
    		res.view('homepage', {
    			products_HighestPrice: result[0],
    			products_FiveMostTimeBidding: result[1],
    			products_FiveNearest: result[2]
    		})
    	});
    }
    */

    showAddNew: function(req, res) {
        res.view('product/new');
    },
};