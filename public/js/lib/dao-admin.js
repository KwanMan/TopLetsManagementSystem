var inherits = require("inherits");

var DAO = require("./DAO");

inherits(AdminDAO, DAO);

function AdminDAO(){}

AdminDAO.prototype.sectionPath = "/admin";

AdminDAO.prototype.addAuth = function(req, cb){
	//add auth header

	cb(req);
};

module.exports = AdminDAO;