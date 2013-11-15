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
		
	//** Bayuz - Show Data Mhs 
  'show': function(req, res, next) {
  	var sendNRPSearch = '';
  	var sendNRPSelect = '';
  			
		//Using SQL To Show Data Mhs
		var SQLText = 'SELECT * FROM mhs ORDER BY nrp ASC';
		Mhs.query(SQLText, function foundMhs(err, getMhs) {
			if (err) {
				console.log(err);
				return next(err);
			}
			var sendgetMhs = getMhs;
				
			//Search nrp / find nrp nearest
  	  if (req.param('nrp')) {
				var SQLText = "SELECT nrp, ABS( nrp - " + req.param('nrp') +" ) as selisih FROM mhs ORDER BY selisih ASC LIMIT 1";
				Mhs.query(SQLText, function foundMhs(err, getMhs) {
					if (err) {
						console.log(err);
						return next(err);
					}
					if (!getMhs) {
						sendNRPSelect = '';
					} else {
						var mhsku = [];
						var selisihku = [];
						getMhs.forEach(function(getmhs){ 
								mhsku.push(getmhs.nrp);
								selisihku.push(getmhs.selisih);
						}); 
						if (selisihku[0] >= 100) {
							sendNRPSelect = '';
						} else {
							sendNRPSelect = mhsku[0];
						}
					}
					sendNRPSearch = req.param('nrp');
  	  	
					// pass the array down to the /views/mhs/show.ejs page
					res.view({
						mhs: sendgetMhs,
						NRPSearch: sendNRPSearch,
						NRPSelect: sendNRPSelect
					});
				});	// end - Mhs.query
  	  	
			} else {
				// pass the array down to the /views/mhs/show.ejs page
				res.view({
					mhs: sendgetMhs,
					NRPSearch: sendNRPSearch,
					NRPSelect: sendNRPSelect
				});
			} // end if (req.param('nrp'))
		}); // end - Mhs.query
  }, // end - 'show':
  
	
  
	//** Bayuz - New Data Mhs 
  'new': function(req, res, next) {
		//Using SQL To Sent Data Mhs
		var SQLText = 'SELECT nrp FROM mhs ORDER BY nrp ASC';
		sails.models.mhs.query(SQLText, function foundMhs(err, getMhs) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      var sendgetMhs = getMhs;
      // pass the array down to the /views/mhs/new.ejs page
      res.view({
        mhs: sendgetMhs
      });
 		}); // end - sails.models.mhs.query
  }, // end - 'new':
  
  
  
	//** Bayuz - Create Data Mhs 
  'create': function(req, res, next) {
    var dataObj = {
      nrp: req.param('nrp'),
      nama: req.param('nama')
    }
    Mhs.create(dataObj, function mhsCreated(err, getMhs) {
      if (err) {
        console.log(err);
        // If error redirect back to the /views/mhs/new.ejs page
        return res.redirect('/mhs/new');
      }
      // If success redirect back to the /views/mhs/show.ejs page
      res.redirect('/mhs/show/');
    }); // end - Mhs.create		
  }, // end - 'create':
  
  
  
	//** Bayuz - Edit Data Mhs 
  'edit': function(req, res, next) {
  	Mhs.findOne(req.param('id'), function foundMhs(err, getMhs) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!getMhs) {
      	console.log('Mahasiswa Tidak Ada !');
      	return next('Mahasiswa Tidak Ada !');
      }
      var sendgetMhs = getMhs;
      // pass the array down to the /views/mhs/edit.ejs page
      res.view({
        mhs: sendgetMhs
      });
  	}); // ens - Mhs.findOne
  }, // end - 'edit':
  
  
  
	//** Bayuz - Update Data Mhs 
  'update': function(req, res, next) {
    var dataObj = {
      nrp: req.param('nrp'),
      nama: req.param('nama')
    }
    Mhs.update(req.param('id'), dataObj, function mhsUpdated(err) {
      if (err) {
      	console.log(err);
      	// If error redirect back to the /views/mhs/edit.ejs page
        return res.redirect('/mhs/edit/' + req.param('id'));
      }
      // If success redirect back to the /views/mhs/show.ejs page
      res.redirect('/mhs/show/');
    }); // end - Mhs.update 
  }, // end - 'update':
  
  
  
	//** Bayuz - Del Data Mhs 
  'del': function(req, res, next) {
    Mhs.findOne(req.param('id'), function foundMhs(err, getMhs) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!getMhs) {
      	console.log('Mahasiswa Tidak Ada !');
      	return next('Mahasiswa Tidak Ada !');
      }
      var sendgetMhs = getMhs;
    	// pass the array down to the /views/mhs/del.ejs page	
      res.view({
        mhs: sendgetMhs
      });
    });	// end - Mhs.findOne
  }, // end - 'del':
  
  
  
 	//** Bayuz - Destroy Data Mhs 
  'destroy': function(req, res, next) {
  	Mhs.findOne(req.param('id'), function foundMhs(err, getMhs) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!getMhs) {
      	console.log('Mahasiswa Tidak Ada !');
      	return next('Mahasiswa Tidak Ada !');
      }
      if (req.param('password') !== sails.config.bayuz.gvAdminPasswd) {
      	console.log('Password Salah ! ');
      	// If wrong password redirect back to the /views/mhs/del.ejs page
      	return res.redirect('/mhs/del/' + req.param('id'));
      }
      //Using SQL To Get Data Frs - CEK frs.id_mhs
      var SQLText = "SELECT frs.id, frs.id_mhs, frs.id_kuliah "
      	  + "FROM frs "
      	  + "WHERE frs.id_mhs = '" + req.param('id') + "' ";
      Frs.query(SQLText, function foundFrs(err, getFrs) {
				if (err) {
					console.log(err);
					return next(err);
				}
				if (!getFrs) {
					Mhs.destroy(req.param('id'), function mhsDestroyed(err) {
						if (err) {
							console.log(err);
							// If error redirect back to the /views/mhs/del.ejs page
							return res.redirect('/mhs/del/' + req.param('id'));
						}
						// If success redirect back to the /views/mhs/show.ejs page
						res.redirect('/mhs/show/');
					}); // end - Mhs.destroy
				} else {
					console.log('Data Mahasiswa Ada di FRS !');
					// return next('Data Mahasiswa Ada di FRS !');
					// If Data Exist redirect back to the /views/mhs/del.ejs page
					return res.redirect('/mhs/del/' + req.param('id'));
				} //end -else
      }); // end - Frs.query
    }); // end - Mhs.findOne
  }, // end - 'destroy':
  	
  	
		
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MhsController)
   */
  _config: {}
  
  	
  		
};
