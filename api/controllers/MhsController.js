/**
 * MhsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {


  // render the profile view (e.g. /views/mhs/show.ejs)
  'show': function(req, res, next) {
    // Get an array of all users in the User collection(e.g. table)
    Mhs.find(function foundMhs(err, mhs) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      // pass the array down to the /views/mhs/show.ejs page
      res.view({
        mhs: mhs
      });
    });
  },
	
	
  'new': function(req, res) {
    res.view();
  },

  
  'create': function(req, res, next) {
    var userObj = {
      nrp: req.param('nrp'),
      nama: req.param('nama')
    }
    // Create a Mhs with the params sent from 
    // form tambah data Mhs --> /views/mhs/new.ejs
    Mhs.create(userObj, function userCreated(err, mhs) {
      // // If there's an error
      // if (err) return next(err);
      if (err) {
        console.log(err);
        // If error redirect back to form tambah data
        return res.redirect('/mhs/new');
      }
      // tampilkan semua data mhs
      res.redirect('/mhs/show/');
    });
  },
  
  
  // render the edit view (e.g. /views/mhs/edit.ejs)
  'edit': function(req, res, next) {
    // Find the mhs from the id passed in via params
    Mhs.findOne(req.param('id'), function foundUser(err, mhs) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!mhs) {
      	console.log('Mahasiswa Tidak Ada !');
      	return next('Mahasiswa Tidak Ada !');
      }
      res.view({
        mhs: mhs
      });
    });
  },

  
  // process the info from edit view
  'update': function(req, res, next) {
    var userObj = {
      nrp: req.param('nrp'),
      nama: req.param('nama')
    }
    // Update a Mhs with the params sent from 
    // form edit data Mhs --> /views/mhs/edit.ejs
    Mhs.update(req.param('id'), userObj, function userUpdated(err) {
      if (err) {
      	console.log(err);
      	// If error redirect back to form edit data
        return res.redirect('/mhs/edit/' + req.param('id'));
      }
      // tampilkan semua data mhs
      res.redirect('/mhs/show/');
    });
  },
  
  
  // render the del view (e.g. /views/mhs/del.ejs)
  'del': function(req, res, next) {
  	// Find the mhs from the id passed in via params
    Mhs.findOne(req.param('id'), function foundUser(err, mhs) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!mhs) {
      	console.log('Mahasiswa Tidak Ada !');
      	return next('Mahasiswa Tidak Ada !');
      }
      res.view({
        mhs: mhs
      });
    });
  },

  
  // process the info from del view
  'destroy': function(req, res, next) {
  	var Passwdtext = req.param('password');
  	// Find the mhs from the id passed in via params
    Mhs.findOne(req.param('id'), function foundUser(err, mhs) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!mhs) {
      	console.log('Mahasiswa Tidak Ada !');
      	return next('Mahasiswa Tidak Ada !');
      }
      if (Passwdtext != '1234567') {
      	console.log('Password Salah ! ');
      	return res.redirect('/mhs/del/' + req.param('id'));
      }
			// Delete  Mhs with the params sent from 
			// form del data Mhs --> /views/mhs/del.ejs
      Mhs.destroy(req.param('id'), function userDestroyed(err) {
				if (err) {
					console.log(err);
					return next(err);
				}
      });        
      // tampilkan semua data mhs
      res.redirect('/mhs/show/');
    });
  },
	
  
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MhsController)
   */
  _config: {}
  
  
};
