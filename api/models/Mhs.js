/**
 * Mhs
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	
	schema: true,

  attributes: {

  	nrp: {
  		type: 'string',
  		required: true
  	},

  	nama: {
  		type: 'string',
  		required: true
  	}
  	
  }

};
