Tinytest.addAsync('It should add rules', function (test, done) {
  Meteor.call('createAdminUser', function (err, res) {
    if (err) throw new Meteor.Error(err);

    Meteor.loginWithPassword('admin@admin.com', 'admin6');

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
