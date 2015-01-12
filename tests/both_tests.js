Tinytest.add('Exists DaigoEvents and DaigoRules collections', function (test) {
  test.notEqual(DaigoEvents, 'undefined');
  test.notEqual(DaigoRules, 'undefined');
  test.notEqual(DaigoEvents.find, 'undefined');
  test.notEqual(DaigoRules.find, 'undefined');
});

Tinytest.add('It should add rules', function (test) {
  DaigoRules.add('test_rule', {
    points: 100  
  });
});

Tinytest.add('It should raise error if not initialize with adminUserId option', function (test) {
  new Daigo({
    adminUserId: '1234'
  });

  test.throws(function () {
    new Daigo();
  });
});

