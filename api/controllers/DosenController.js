/**
 * DosenController
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

	//** Bayuz - Show Data Dosen 
  'show': function(req, res, next) {
  	var sendNIPSearch = '';
  	var sendNIPSelect = '';

		//Using SQL To Show Data Dosen
		var SQLText = 'SELECT * FROM dosen ORDER BY nip ASC';
		Dosen.query(SQLText, function foundMhs(err, getDosen) {
			if (err) {
				console.log(err);
				return next(err);
			}
			var sendgetDosen = getDosen;

			if (req.param('nip')) {
				sendNIPSearch = req.param('nip');
				sendNIPSelect = req.param('nip'); 
			}
			// pass the array down to the /views/dosen/show.ejs page
			res.view({
				dosen: sendgetDosen,
				NIPSearch: sendNIPSearch,
				NIPSelect: sendNIPSelect
			});
		}); // end - Dosen.query
  }, // end - 'show':
		
  	
  	
	//** Bayuz - New Data Dosen 
  'new': function(req, res, next) {
 		//Using SQL To Sent Data Dosen
		var SQLText = 'SELECT nip FROM dosen ORDER BY nip ASC';
 		sails.models.dosen.query(SQLText, function foundDosen(err, getDosen) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      var sendgetDosen = getDosen;
			// pass the array down to the /views/dosen/new.ejs page
			res.view({
				dosen: sendgetDosen
			});
 		}); // end - sails.models.dosen.query
  }, // end - 'new':
  		
  		
  		
	//** Bayuz - Create Data Dosen 
  'create': function(req, res, next) {
    var dataObj = {
      nip: req.param('nip'),
      nama: req.param('nama')
    }
  	Dosen.create(dataObj, function dosenCreated(err, getDosen) {	
      if (err) {
        console.log(err);
        // If error redirect back to the /views/dosen/new.ejs page
        return res.redirect('/dosen/new');
      }
      // If success redirect back to to the /views/dosen/show.ejs page
      res.redirect('/dosen/show/');
    }); // end - Dosen.create
  }, // end - 'create':
  		
  		
  	
	//** Bayuz - Edit Data Dosen 
  'edit': function(req, res, next) {
    Dosen.findOne(req.param('id'), function foundDosen(err, getDosen) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!getDosen) {
      	console.log('Dosen Tidak Ada !');
      	return next('Dosen Tidak Ada !');
      }
      var sendgetDosen = getDosen;
      // pass the array down to the /views/dosen/edit.ejs page
      res.view({
        dosen: sendgetDosen
      });
    }); // end - Dosen.findOne
  }, // end - 'edit':
  	
  	
  	
	//** Bayuz - Update Data Dosen 
  'update': function(req, res, next) {
    var dataObj = {
      nip: req.param('nip'),
      nama: req.param('nama')
    }
    Dosen.update(req.param('id'), dataObj, function dosenUpdated(err) {
      if (err) {
      	console.log(err);
      	// If error redirect back to the /views/dosen/edit.ejs page
        return res.redirect('/dosen/edit/' + req.param('id'));
      }
      // If success redirect back to to the /views/dosen/show.ejs page
      res.redirect('/dosen/show/');
    }); // end - Dosen.update
  }, // end - 'update': 
  	
  	
			
	//** Bayuz - Del Data Dosen 
  'del': function(req, res, next) {
    Dosen.findOne(req.param('id'), function foundDosen(err, getDosen) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!getDosen) {
      	console.log('Dosen Tidak Ada !');
      	return next('Dosen Tidak Ada !');
      }
      var sendgetDosen = getDosen;
      // pass the array down to the /views/dosen/del.ejs page
      res.view({
        dosen: sendgetDosen
      });
    });	// end - Dosen.findOne
  }, // end - 'del':
  	
  	
  	
	//** Bayuz - Destroy Data Dosen 
  'destroy': function(req, res, next) {
    Dosen.findOne(req.param('id'), function foundDosen(err, getDosen) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!getDosen) {
      	console.log('Dosen Tidak Ada !');
      	return next('Dosen Tidak Ada !');
      }
      if (req.param('password') !== sails.config.bayuz.gvAdminPasswd) {
      	console.log('Password Salah ! ');
      	// If wrong password redirect back to the /views/dosen/del.ejs page
      	return res.redirect('/dosen/del/' + req.param('id'));
      }
      //Using SQL To Get Data Kuliah - CEK kuliah.id_dosen
      var SQLText = "SELECT kuliah.id, kuliah.id_dosen "
      							+ "FROM kuliah "
      							+ "WHERE kuliah.id_dosen = '" + req.param('id') + "' ";
      Kuliah.query(SQLText, function foundKuliah(err, getKuliah) {
				if (err) {
					console.log(err);
					return next(err);
				}
				if (!getKuliah) {
					Dosen.destroy(req.param('id'), function dosenDestroyed(err) {
						if (err) {
							console.log(err);
							// If error redirect back to the /views/dosen/del.ejs page
							return res.redirect('/dosen/del/' + req.param('id'));
						}
						// If success redirect back to the /views/dosen/show.ejs page
						res.redirect('/dosen/show/');
					}); // end - Dosen.destroy         
				} else {
					console.log('Data Dosen Ada di Matakuliah !');
					// return next('Data Dosen Ada di Matakuliah !');
					// If Data Exist redirect back to the /views/dosen/del.ejs page
					return res.redirect('/dosen/del/' + req.param('id'));
				} // end - else
			}); // end - Kuliah.query
    }); // end - Dosen.findOne
  }, // end - 'destroy':
  	
  	
  	
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DosenController)
   */
  _config: {}

  
};
