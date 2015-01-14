Meteor.methods({
  createDummyUser: function (email) {
    var _id = Accounts.createUser({
      email: email,
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
  removeAllDaigoEvents: function () {
    return DaigoEvents.remove({});
  },
  getAdminCount: function () {
    return Meteor.users.find({daigoAdmin: true}).count();
  },
  getDaigoEventsCount: function () {
    return DaigoEvents.find().count();
  }
});
