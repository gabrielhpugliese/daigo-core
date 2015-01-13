Tinytest.add('Exists DaigoEvents and DaigoRules collections', function (test) {
  test.notEqual(DaigoEvents, 'undefined');
  test.notEqual(DaigoRules, 'undefined');
  test.notEqual(DaigoEvents.find, 'undefined');
  test.notEqual(DaigoRules.find, 'undefined');
});
