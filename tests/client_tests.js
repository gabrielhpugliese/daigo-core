Tinytest.addAsync('It should set admin', function (test, done) {
  Meteor.call('createDummyUser', 'dummy@dummy.com', function (err, res) {
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

    Meteor.call('createDummyUser', 'dummy1@dummy.com', function (err, res) {
      if (err) throw new Meteor.Error(err);

      Daigo.setAdmin(res);

      Meteor.call('createDummyUser', 'dummy2@dummy.com', function (err, res) {
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
      var _id = DaigoRules.add('test_rule', 'Description', {
        points: 100
      });

      test.equal(DaigoRules.find().count(), 1);
      test.equal(DaigoRules.findOne(), {
        name: 'test_rule',
        description: 'Description',
        rules: {
          points: 100
        },
        _id: _id
      });

      done();
    });
  });
});

Tinytest.addAsync('It should add events', function (test, done) {
  Meteor.call('removeAllDaigoEvents', function (err, res) {
    if (err) throw new Meteor.Error(err);

    Meteor.call('getDaigoEventsCount', function (err, res) {
      if (err) throw new Meteor.Error(err);

      test.equal(res, 0);

      DaigoEvents.add('any_rule');

      Meteor.call('getDaigoEventsCount', function (err, res) {
        if (err) throw new Meteor.Error(err);

        test.equal(res, 1);

        done();
      });
    });
  });
});
