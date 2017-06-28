/**
 * UnapprovedProduct.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'unapprovedproduct',

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
};

