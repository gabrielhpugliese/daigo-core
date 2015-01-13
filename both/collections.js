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

    var user = Meteor.users.findOne(userId);

    return user && user.daigoAdmin;
  },
  remove: function (userId, doc) {
    var user = Meteor.users.findOne(userId);

    return user && user.daigoAdmin;
  },
  update: function (userId, doc) {
    var user = Meteor.users.findOne(userId);

    return user && user.daigoAdmin;
  },
  fetch: ['rules']
});
