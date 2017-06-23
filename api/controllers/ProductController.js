/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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
};
