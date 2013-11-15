/**
 * FrsController
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
    
	//** Bayuz - Show Data Frs 
  'show': function(req, res, next) {
  	var sendIDSelect = '';
  	var sendNRPSelect = '';
  	var sendNamaSelect = '';
  	if (req.param('nrp')) {
			sendNRPSelect = req.param('nrp');
  	}
  	//Using SQL To Get Data Mhs
  	var SQLText = "SELECT id,nama FROM mhs WHERE nrp='"+ sendNRPSelect + "' ";
  	Mhs.query(SQLText, function foundMhs(err, getMhs) {
			if (err) {
				console.log(err);
				return next(err);
			}  	
			getMhs.forEach(function(getmhs){
				sendIDSelect =	getmhs.id;
				sendNamaSelect = getmhs.nama;	
			});
			//Using SQL To Show Data Frs
			var SQLText = "SELECT frs.*, mhs.nrp AS mhs_nrp, mhs.nama AS mhs_nama, "
					+ "kuliah.kode AS kuliah_kode, kuliah.nama AS kuliah_nama, kuliah.sks AS kuliah_sks, "
					+ "dosen.nip AS dosen_nip, dosen.nama AS dosen_nama "
					+ "FROM frs, mhs, kuliah, dosen "
					+ "WHERE frs.id_mhs = mhs.id "
					+ "AND frs.id_kuliah = kuliah.id "
					+ "AND kuliah.id = dosen.id "
					+ "AND frs.id_mhs = '" + sendIDSelect +"' "
					+ "ORDER BY mhs.nrp, kuliah.kode ASC "; 
			Frs.query(SQLText, function foundFrs(err, getFrs) {
				if (err) {
					console.log(err);
					return next(err);
				}
				var sendgetFrs = getFrs;
				//Using SQL To Send Data Mhs
				var SQLText = 'SELECT * FROM mhs ORDER BY nrp ASC';
				sails.models.mhs.query(SQLText, function foundMhs(err, getMhs) {
					if (err) {
						console.log(err);
						return next(err);
					}
					var sendgetMhs = getMhs;
					if (req.param('nrp')) {
						sendNRPSelect = req.param('nrp');
						getMhs.forEach(function(getmhs){
								if (sendNRPSelect === getmhs.nrp) {
									sendIDSelect = getmhs.id;
									sendNamaSelect = getmhs.nama;
								}
						}); 		
					} 
					// pass the array down to the /views/frs/show.ejs page
					res.view({
						frs: sendgetFrs,
						mhs: sendgetMhs,
						IDSelect: sendIDSelect,
						NRPSelect: sendNRPSelect,
						NamaSelect: sendNamaSelect
					});
				}); // end - sails.models.mhs.query
			}); // end - Frs.query
		}); // end - Mhs.query
  }, // end - 'show':
		
  	
  	
	//** Bayuz - New Data Frs 
  'new': function(req, res, next) {
  	if (req.param('nrp')) {
			var sendNRPSelect = req.param('nrp');
			//Using SQL To Send Data Mhs
			var SQLText = "SELECT id,nama FROM mhs WHERE nrp='"+ sendNRPSelect + "' ";
			Mhs.query(SQLText, function foundMhs(err, getMhs) {
				if (err) {
					console.log(err);
					return next(err);
				}  	
				getMhs.forEach(function(getmhs){
					sendIDSelect =	getmhs.id;
					sendNamaSelect = getmhs.nama;	
				});
				//Using SQL To Send Data Frs
				var SQLText = "SELECT id_kuliah FROM frs WHERE id_mhs='"+ sendIDSelect + "' ";
				Frs.query(SQLText, function foundFrs(err, getFrs) {
					if (err) {
						console.log(err);
						return next(err);
					}
					var sendgetFrs = getFrs;
					//Using SQL To Send Data Kuliah & Dosen
					var SQLText = "SELECT kuliah . * , dosen.nama AS dosen_nama "
							+ "FROM kuliah, dosen "
							+ "WHERE kuliah.id_dosen = dosen.id "
							+ "ORDER BY kuliah.kode ASC "; 
					sails.models.kuliah.query(SQLText, function foundKuliah(err, getKuliah) {
						if (err) {
							console.log(err);
							return next(err);
						}
						var sendgetKuliah = getKuliah;
						// pass the array down to the /views/frs/new.ejs page
						res.view({
							kuliah: sendgetKuliah,
							frs: sendgetFrs,
							IDSelect: sendIDSelect,
							NRPSelect: sendNRPSelect,
							NamaSelect: sendNamaSelect
						});
					}); // end - sails.models.kuliah.query
				}); // end - Frs.query					
			}); // end - Mhs.query
  	} else {
      // If access with no parameters redirect back to to the /views/frs/show.ejs page
      res.redirect('/frs/show/');
  	}
  }, // end - 'new':	
  	
  	
  	
	//** Bayuz - Create Data Frs 
  'create': function(req, res, next) {
		var id_mhs = req.param('id_mhs');
		var id_kuliah = req.param('id_kuliah');
		// Loop Insert Data Array Mata Kuliah
		id_kuliah.forEach(function(get_id_kuliah){
				var dataObj = {
					id_mhs: id_mhs,
					id_kuliah: get_id_kuliah
				}
				Frs.create(dataObj, function frsCreated(err, getFrs) {
					if (err) {
						console.log(err);
						return (err);
					}
				}); // end - Kuliah.create
		});
  	// If success redirect back to the /views/frs/show.ejs page
  	res.redirect('/frs/show/?nrp=' + req.param('nrp'));
  }, // end - 'create':	
  	
  	
  	
 	//** Bayuz - Del Data Frs 
  'del': function(req, res, next) {
  	var sendFrsID = '';
  	var sendKuliahKode = '';
  	var sendKuliahNama = '';
  	var sendKuliahSKS = '';
  	var sendDosenNama = '';
  	//Using SQL To Get Data Frs
  	var SQLText = "SELECT frs.id, frs.id_mhs, frs.id_kuliah, " 
  								+ "kuliah.kode AS kuliah_kode, kuliah.nama AS kuliah_nama, kuliah.sks AS kuliah_sks, kuliah.id_dosen, " 
  								+ "dosen.nama AS dosen_nama "
  								+ "FROM frs, kuliah, dosen "
  								+ "WHERE frs.id = '" + req.param('id') + "' "
  								+ "AND frs.id_kuliah = kuliah.id "
  								+ "AND kuliah.id_dosen = dosen.id "
  	Frs.query(SQLText, function foundFrs(err, getFrs) {
			if (err) {
				console.log(err);
				return next(err);
			}
      if (!getFrs) {
      	console.log('Item Data FRS Tidak Ada !');
      	return next('Item Data FRS Tidak Ada !');
      }
      var sendgetFrs = getFrs;
			getFrs.forEach(function(getfrs){
				sendFrsID      = getfrs.id;
				sendKuliahKode = getfrs.kuliah_kode;
				sendKuliahNama = getfrs.kuliah_nama;
				sendKuliahSKS  = getfrs.kuliah_sks;
				sendDosenNama  = getfrs.dosen_nama;
			});
			// pass the array down to the /views/frs/del.ejs page
			res.view({
				FrsID: sendFrsID,
				KuliahKode: sendKuliahKode,
				KuliahNama: sendKuliahNama,
				KuliahSKS: sendKuliahSKS,
				DosenNama: sendDosenNama
			});
    }); // end - Frs.query
  }, // end - 'del':
  	
  	
  	
 	//** Bayuz - Destroy Data Frs 
  'destroy': function(req, res, next) {
  	var MhsNRP = '';
  	//Using SQL To Get Data Frs
  	var SQLText = "SELECT frs.id, frs.id_mhs, frs.id_kuliah, mhs.nrp AS mhs_nrp, mhs.nama AS mhs_nama "
  								+ "FROM frs, mhs "
  								+ "WHERE frs.id = '" + req.param('id') + "' "
  								+ "AND frs.id_mhs = mhs.id ";
  	Frs.query(SQLText, function foundFrs(err, getFrs) {
      if (err) {
      	console.log(err);
      	return next(err);
      }
      if (!getFrs) {
      	console.log('Item Data FRS Tidak Ada !');
      	return next('Item Data FRS Tidak Ada !');
      }
			getFrs.forEach(function(getfrs){
				MhsNRP = getfrs.mhs_nrp;
			});
      if (req.param('password') !== sails.config.bayuz.gvAdminPasswd) {
      	console.log('Password Salah ! ');
      	// If wrong password redirect back to the /views/kuliah/del.ejs page
      	return res.redirect('/frs/del/' + req.param('id'));
      }
      Frs.destroy(req.param('id'), function frsDestroyed(err) {
				if (err) {
					console.log(err);
					// If error redirect back to the /views/frs/del.ejs page
					return res.redirect('/frs/del/' + req.param('id'));
				}
				// If success redirect back to the /views/frs/show.ejs page
				res.redirect('/frs/show/?nrp='+ MhsNRP);
      }); // end - Frs.destroy
    }); // end - Frs.findOne
  }, // end - 'destroy': 
  	
  	
  	
	//** Bayuz - Edit Data Frs 
  'edit': function(req, res, next) {
  	// redirect back to the /views/frs/show.ejs page
  	res.redirect('/frs/show/');
  }, // end - 'edit':	
  	
  	
  	
	//** Bayuz - Update Data Frs 
  'update': function(req, res, next) {
  	// redirect back to the /views/frs/show.ejs page
  	res.redirect('/frs/show/');
  }, // end - 'update':	
  	
  	
  	
  	
  	
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to FrsController)
   */
  _config: {}
  
  
};
