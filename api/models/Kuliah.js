/**
 * Kuliah
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	
	schema: true,

  attributes: {
  	
  	kode: {
  		type: 'string',
  		required: true,
  		unique: true
  	},

  	nama: {
  		type: 'string',
  		required: true
  	},
  	
  	sks: {
  		type: 'integer',
  		required: true
  	},
  	
  	id_dosen: {
  		type: 'string',
  		required: true
  	}
  	
  	
  }

};
