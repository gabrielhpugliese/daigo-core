Meteor.methods({
  createDummyUser: function () {
    var _id = Accounts.createUser({
      email: Math.floor(Math.random() * 100000000) + '@dummy.com',
      password: 'admin6'
    });

    return _id;
  },
  createAdminUser: function () {
    Meteor.users.remove({});

    var _id = Accounts.createUser({
      email: 'admin@admin.com',
      password: 'admin6'
    });
    Daigo.setAdmin(_id);

    return _id;
  },
  removeAllUsers: function () {
    return Meteor.users.remove({});
  },
  getAdminCount: function () {
    return Meteor.users.find({daigoAdmin: true}).count();
  }
});
