/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    autoUpdatedAt: true,
    autoCreateAt: true,

    attributes: {
        id: {
            type: 'integer'
        },

        name: {
            type: 'string'
        },

        curPrice: {
            type: 'float'
        },

        immediatePrice: {
            type: 'float'
        },

        owner: {
            type: 'integer'
        },

        highestBidder: {
            type: 'integer'
        },

        startingTime: {
            type: 'datetime'
        },

        finishingTime: {
            type: 'datetime'
        },
        image1: {
            type: 'string'
        },
        image2: {
            type: 'string'
        },
        image3: {
            type: 'string'
        },
        startingPrice: {
            type: 'string'
        }
    },

    getHighestPriceItems: function(callback) {
        Product.query('select * from product order by "curPrice" DESC limit 5;', function(err, result) {
            callback(result.rows);
        });
    },

    getMostBiddedItems: function(callback) {
        let sql = 'select pr."id" as "id", ' +
            'pr."name" as "name", ' +
            'pr."curPrice" as "curPrice", ' +
            'pr."immediatePrice" as "immediatePrice", ' +
            'pr."owner" as "owner", ' +
            'pr."highestBidder" as "highestBidder", ' +
            'pr."startingTime" as "startingTime", ' +
            'pr."finishingTime" as "finishingTime", ' +
            'pr."image1" as "image1", ' +
            'pr."image2" as "image2", ' +
            'pr."image3" as "image3", ' +
            'pr."createdAt" as "createdAt", ' +
            'pr."updatedAt" as "updatedAt", ' +
            'count(pr."id") as "countTimeBidding" ' +
            'from product as pr join bidlog as bl on bl."product" = pr."id" ' +
            'group by pr."id" ' +
            'order by "countTimeBidding" DESC ' +
            'limit 5;';
        Product.query(sql, function(err, result) {
            return callback(result.rows);
        });
    },

    getAlmostExpiredItems: function(callback) {
        var sql = 'select product."id", "name", "curPrice", "immediatePrice", "owner", "highestBidder", ' +
            '"startingTime", "finishingTime", "createdAt", "updatedAt", "image1", "image2", "image3", ' +
            '(DATE_PART(\'day\', "finishingTime"::timestamp - current_timestamp::timestamp) * 24 + ' +
            'DATE_PART(\'hour\', "finishingTime"::timestamp - current_timestamp::timestamp)) * 60 + ' +
            'DATE_PART(\'minute\', "finishingTime"::timestamp - current_timestamp::timestamp) as "minuteRemaining" ' + 'from product ' +
            'where (DATE_PART(\'day\', "finishingTime"::timestamp - current_timestamp::timestamp) * 24 + ' +
            'DATE_PART(\'hour\', "finishingTime"::timestamp - current_timestamp::timestamp)) * 60 + ' +
            'DATE_PART(\'minute\', "finishingTime"::timestamp - current_timestamp::timestamp) >= 0 ' +
            'order by "minuteRemaining" ASC ' +
            'limit 5; ';
        Product.query(sql, function(err, result) {
            return callback(result.rows);
        });
    }


    /*
    getAll: function (cb) {
        let query1 = new Promise(function (resolve, reject) {
        Product.query('select * from product order by "curPrice" DESC limit 5;', function(err, result) {
            if(err) return reject(err);
            // console.log(result.rows);
            resolve(result.rows);
        });
        });

        let query2 = new Promise(function (resolve, reject) {
        let sql = 'select pr."id" as "id", ' +
            'pr."name" as "name", ' +
            'pr."curPrice" as "curPrice", ' +
            'pr."immediatePrice" as "immediatePrice", ' +
            'pr."owner" as "owner", ' +
            'pr."highestBidder" as "highestBidder", ' +
            'pr."startingTime" as "startingTime", ' +
            'pr."finishingTime" as "finishingTime", ' +
            'pr."createdAt" as "createdAt", ' +
            'pr."updatedAt" as "updatedAt", ' +
            'count(pr."id") as "countTimeBidding" ' +
            'from product as pr join bidlog as bl on bl."product" = pr."id" ' +
            'group by pr."id" ' +
            'order by "countTimeBidding" DESC ' +
            'limit 5;';
        Product.query(sql, function(err, result) {
            if(err) return reject(err);
            // console.log(result.rows);
            resolve(result.rows);
        });
        });

        let query3 = new Promise(function (resolve, reject) {
        var sql = 'select product."id", "name", "curPrice", "immediatePrice", "owner", "highestBidder", ' +
            '"startingTime", "finishingTime", "createdAt", "updatedAt", ' +
            '(DATE_PART(\'day\', "finishingTime"::timestamp - current_timestamp::timestamp) * 24 + ' +
            'DATE_PART(\'hour\', "finishingTime"::timestamp - current_timestamp::timestamp)) * 60 + ' +
            'DATE_PART(\'minute\', "finishingTime"::timestamp - current_timestamp::timestamp) as "minuteRemaining" ' +
            'from product ' +
            'where (DATE_PART(\'day\', "finishingTime"::timestamp - current_timestamp::timestamp) * 24 + ' +
            'DATE_PART(\'hour\', "finishingTime"::timestamp - current_timestamp::timestamp)) * 60 + ' +
            'DATE_PART(\'minute\', "finishingTime"::timestamp - current_timestamp::timestamp) >= 0 ' +
            'order by "minuteRemaining" ASC ' +
            'limit 5; ';
        Product.query(sql, function(err, result) {
            if(err) return reject(err);
            // console.log(result.rows);
            resolve(result.rows);
        });
        });

        Promise.all([query1, query2, query3]).then(function(value){
        cb(null, value);
        });
    }
    */
}