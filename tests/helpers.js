Meteor.methods({
  createAdminUser: function () {
    Meteor.users.remove({});

    var _id = Accounts.createUser({
      email: 'admin@admin.com',
      password: 'admin6'
    });
    Daigo.setAdminId(_id);

    return _id;
  }
});
