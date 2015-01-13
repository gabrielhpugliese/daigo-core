DaigoEvents = new Mongo.Collection('daigo_events');
DaigoRules = new Mongo.Collection('daigo_rules');

/*
 * DaigoRules methods
 */
DaigoRules.add = function (name, rules) {
  return DaigoRules.insert({
    name: name,
    rules: rules
  });
};

/*
 * DaigoRules security
 */
DaigoRules.allow({
  insert: function (userId, doc) {
    var rulesPattern = {
      points: Match.Optional(Match.Integer)
    };

    try {
      Match.test(doc.rules, rulesPattern);
    } catch (err) {
      throw new Meteor.Error('You are trying to add a unrecognized rule.');
    }

    console.log(userId, Daigo.getAdminId());
    return userId === Daigo.getAdminId();
  },
  remove: function (userId, doc) {
    return userId === Daigo.getAdminId();
  },
  update: function (userId, doc) {
    return userId === Daigo.getAdminId();
  },
  fetch: []
});
