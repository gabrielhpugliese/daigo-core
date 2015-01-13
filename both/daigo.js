Daigo = (new function () {
  this.setAdmin = function (_id) {
    return Meteor.users.update({_id: _id}, {$set: {
      daigoAdmin: true
    }});
  };
}());
