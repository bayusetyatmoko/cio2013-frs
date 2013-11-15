/**
 * ReportController
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
    
	//** Bayuz - Show Data Report
  'show': function(req, res, next) {
  	
  	//Using SQL To Send Data Mhs
  	var SQLText = "SELECT nrp, nama FROM mhs ORDER BY nrp ASC";  
		Mhs.query(SQLText, function foundMhs(err, getMhs) {
			if (err) {
				console.log(err);
				return next(err);
			}
			var sendgetMhs = getMhs;
			//Using SQL To Show Data Frs / Report	
			var SQLText = "SELECT mhs.nrp as mhs_nrp, mhs.nama as mhs_nama, "
										+ "count(frs.id_kuliah) as total_mk, sum(kuliah.sks) as total_sks "
										+ "FROM frs, kuliah, mhs	" 
										+ "WHERE frs.id_kuliah = kuliah.id "
										+ "AND frs.id_mhs = mhs.id "
										+ "GROUP BY frs.id_mhs "
										+ "ORDER BY mhs.nrp "
			Frs.query(SQLText, function foundFrs(err, getFrs) {
				if (err) {
					console.log(err);
					return next(err);
				}
				var sendgetFrs = getFrs;
				// pass the array down to the /views/frs/show.ejs page
				res.view({
					mhs: sendgetMhs,
					frs: sendgetFrs
				});
			});	// end - Frs.query
		}); // end - Mhs.query
  }, // end - 'show': 
  	
  	
  	
	//** Bayuz - New Data Report 
  'new': function(req, res, next) {
  	// redirect back to the /views/report/show.ejs page
  	res.redirect('/report/show/');
  }, // end - 'new':	
  	
  	
  	
	//** Bayuz - Create Data Report 
  'create': function(req, res, next) {
  	// redirect back to the /views/report/show.ejs page
  	res.redirect('/report/show/');
  }, // end - 'create':	
  
  
	
	//** Bayuz - Edit Data Report 
  'edit': function(req, res, next) {
  	// redirect back to the /views/report/show.ejs page
  	res.redirect('/report/show/');
  }, // end - 'edit':	
  	
  	
  	
	//** Bayuz - Update Data Report 
  'update': function(req, res, next) {
  	// redirect back to the /views/report/show.ejs page
  	res.redirect('/report/show/');
  }, // end - 'update':	
  	
  	
  	
	//** Bayuz - Del Data Report 
  'del': function(req, res, next) {
  	// redirect back to the /views/report/show.ejs page
  	res.redirect('/report/show/');
  }, // end - 'del':	
  	
  	
  	
	//** Bayuz - Destroy Data Report 
  'destroy': function(req, res, next) {
  	// redirect back to the /views/report/show.ejs page
  	res.redirect('/report/show/');
  }, // end - 'destroy':	
  
  
		  
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ReportController)
   */
  _config: {}

  
};
