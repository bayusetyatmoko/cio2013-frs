/**
 * Frs
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	
	schema: true,

  attributes: {

  	id_mhs: {
  		type: 'string',
  		required: true
  	},
  	
  	id_kuliah: {
  		type: 'string',
  		required: true
  	}
    
  }

};
