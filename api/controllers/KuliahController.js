/**
 * KuliahController
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
    
	//** Bayuz - Show Data Kuliah 
  'show': function(req, res, next) {
  	var sendKodeSearch = '';
  	var sendKodeSelect = '';
		//Using SQL To Show Data Kuliah
		var SQLText = "SELECT kuliah . * , dosen.nama AS namadosen FROM kuliah, dosen WHERE kuliah.id_dosen = dosen.id ORDER BY kuliah.kode ASC ";
		Kuliah.query(SQLText, function foundKuliah(err, getKuliah) {
			if (err) {
				console.log(err);
				return next(err);
			}
			var sendgetKuliah = getKuliah;
			if (req.param('kode')) {
				sendKodeSearch = req.param('kode');
				sendKodeSelect = req.param('kode'); 
			} 
			// pass the array down to the /views/kuliah/show.ejs page
			res.view({
				kuliah: sendgetKuliah,
				KodeSearch: sendKodeSearch,
				KodeSelect: sendKodeSelect
			});
		}); // end - Kuliah.query
  }, // end - 'show':
  	
  	
  	
	//** Bayuz - New Data Kuliah 
  'new': function(req, res, next) {
 		//Using SQL To Send Data Kuliah
 		var SQLText = 'SELECT kode FROM kuliah ORDER BY kode ASC';
 		sails.models.kuliah.query(SQLText, function foundKuliah(err, getKuliah) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      var sendgetKuliah = getKuliah;
			//Using SQL To Send Data Dosen
			var SQLText = 'SELECT * FROM dosen ORDER BY nip ASC';
			sails.models.dosen.query(SQLText, function foundDosen(err, getDosen) {
				if (err) {
					console.log(err);
					return next(err);
				}
				var sendgetDosen = getDosen;
				// pass the array down to the /views/kuliah/new.ejs page
				res.view({
					kuliah: sendgetKuliah,
					dosen: sendgetDosen	
				});
			}); // end - sails.models.dosen.query
		}); // end - sails.models.kuliah.query  	
  }, // end - 'new':
  	
  	
  	
	//** Bayuz - Create Data Kuliah 
  'create': function(req, res, next) {
    var dataObj = {
      kode: req.param('kode'),
      nama: req.param('nama'),
      sks: req.param('sks'),
      id_dosen: req.param('id_dosen')
    }
    Kuliah.create(dataObj, function kuliahCreated(err, getKuliah) {
      if (err) {
        console.log(err);
        // If error redirect back to the /views/kuliah/new.ejs page
        return res.redirect('/kuliah/new');
      }
      // If success redirect back to the /views/kuliah/show.ejs page
      res.redirect('/kuliah/show/');
    }); // end - Kuliah.create
  }, // end - 'new':
  
  
  
	//** Bayuz - Edit Data Kuliah 
  'edit': function(req, res, next) {
  	var sendDosenId = '';
    Kuliah.findOne(req.param('id'), function foundKuliah(err, getKuliah) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!getKuliah) {
      	console.log('MataKuliah Tidak Ada !');
      	return next('MataKuliah Tidak Ada !');
      }
  		var sendgetKuliah = getKuliah;
			//Using SQL To Send Data Dosen
			var SQLText = 'SELECT * FROM dosen ORDER BY nip ASC';
			sails.models.dosen.query(SQLText, function foundDosen(err, getDosen) {
				if (err) {
					console.log(err);
					return next(err);
				}
				var sendgetDosen = getDosen;
				// pass the array down to the /views/kuliah/edit.ejs page
				res.view({
					kuliah: sendgetKuliah,
					dosen: sendgetDosen
				});
			}); // end - sails.models.dosen.query
    }); // end - Kuliah.findOne
  },	// end - 'edit':
  	
  	
  	
 	//** Bayuz - Update Data Kuliah 
  'update': function(req, res, next) {
    var dataObj = {
      kode: req.param('kode'),
      nama: req.param('nama'),
      sks: req.param('sks'),
      id_dosen: req.param('id_dosen')
    }
    Kuliah.update(req.param('id'), dataObj, function kuliahUpdated(err) {
      if (err) {
      	console.log(err);
      	// If error redirect back to the /views/kuliah/edit.ejs page
        return res.redirect('/kuliah/edit/' + req.param('id'));
      }
      // If success redirect back to to the /views/kuliah/show.ejs page
      res.redirect('/kuliah/show/');
    }); // end - Kuliah.update
  }, // end - 'update':
  	
  	
  	
 	//** Bayuz - Del Data Kuliah 
  'del': function(req, res, next) {
  	Kuliah.findOne(req.param('id'), function foundKuliah(err, getKuliah) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!getKuliah) {
      	console.log('Matakuliah Tidak Ada !');
      	return next('Matakuliah Tidak Ada !');
      }
  		var sendgetKuliah = getKuliah;
			//Using SQL To Send Data Dosen
			var SQLText = 'SELECT * FROM dosen ORDER BY nip ASC';
			sails.models.dosen.query(SQLText, function foundDosen(err, getDosen) {
				if (err) {
					console.log(err);
					return next(err);
				}
				var sendgetDosen = getDosen;
				// pass the array down to the /views/kuliah/del.ejs page
				res.view({
					kuliah: sendgetKuliah,
					dosen: sendgetDosen
				});
			}); // end - sails.models.dosen.query
    }); // end - Kuliah.findOne
  }, // end - 'del':
  	
  	
  	
 	//** Bayuz - Destroy Data Kuliah 
  'destroy': function(req, res, next) {
    Kuliah.findOne(req.param('id'), function foundKuliah(err, getKuliah) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!getKuliah) {
      	console.log('MataKuliah Tidak Ada !');
      	return next('MataKuliah Tidak Ada !');
      }
      if (req.param('password') !== sails.config.bayuz.gvAdminPasswd) {
      	console.log('Password Salah ! ');
      	// If wrong password redirect back to the /views/kuliah/del.ejs page
      	return res.redirect('/kuliah/del/' + req.param('id'));
      }
      //Using SQL To Get Data Frs - CEK frs.id_kuliah
      var SQLText = "SELECT frs.id, frs.id_mhs, frs.id_kuliah "
      	  + "FROM frs "
      	  + "WHERE frs.id_kuliah = '" + req.param('id') + "' ";
      Frs.query(SQLText, function foundFrs(err, getFrs) {
				if (err) {
					console.log(err);
					return next(err);
				}
				if (!getFrs) {
					Kuliah.destroy(req.param('id'), function kuliahDestroyed(err) {
						if (err) {
							console.log(err);
							// If error redirect back to the /views/kuliah/del.ejs page
							return res.redirect('/kuliah/del/' + req.param('id'));
						}
						// If success redirect back to the /views/kuliah/show.ejs page
						res.redirect('/kuliah/show/');
					}); // end - Mhs.destroy
				} else {
					console.log('Data MataKuliah Ada di FRS !');
					// return next('Data MataKuliah Ada di FRS !');
					// If Data Exist redirect back to the /views/kuliah/del.ejs page
					return res.redirect('/kuliah/del/' + req.param('id'));
				} // end -else
      }); // end - Frs.query
    }); // end - Kuliah.findOne
  }, // end - 'destroy': 
  	
  

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to KuliahController)
   */
  _config: {}

  
};
