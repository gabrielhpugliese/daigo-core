Daigo = (new function () {
  this.adminUserId = null;

  this.setAdminId = function (adminUserId) {
    this.adminUserId = adminUserId;
  };

  this.getAdminId = function () {
    return this.adminUserId;
  };
}());
