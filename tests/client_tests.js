Tinytest.addAsync('It should set admin', function (test, done) {
  Meteor.call('createDummyUser', function (err, res) {
    if (err) throw new Meteor.Error(err);

    Daigo.setAdmin(res);

    Meteor.call('getAdminCount', function (err, res) {
      if (err) throw new Meteor.Error(err);

      test.equal(res, 1);

      done();
    });
  });
});

Tinytest.addAsync('It should not set two admins', function (test, done) {
  Meteor.call('removeAllUsers', function (err, res) {
    if (err) throw new Meteor.Error(err);

    Meteor.call('createDummyUser', function (err, res) {
      if (err) throw new Meteor.Error(err);

      Daigo.setAdmin(res);

      Meteor.call('createDummyUser', function (err, res) {
        if (err) throw new Meteor.Error(err);

        Daigo.setAdmin(res);

        Meteor.call('getAdminCount', function (err, res) {
          if (err) throw new Meteor.Error(err);

          test.equal(res, 1);

          done();
        });
      });
    });
  });
});

Tinytest.addAsync('It should add rules', function (test, done) {
  Meteor.call('createAdminUser', function (err, res) {
    if (err) throw new Meteor.Error(err);

    Meteor.loginWithPassword('admin@admin.com', 'admin6', function (err) {
      if (err) throw new Meteor.Error(err);

      test.equal(DaigoRules.find().count(), 0);
      var _id = DaigoRules.add('test_rule', {
        points: 100
      });

      test.equal(DaigoRules.find().count(), 1);
      test.equal(DaigoRules.findOne(), {
        name: 'test_rule',
        rules: {
          points: 100
        },
        _id: _id
      });

      done();
    });

  });
});
