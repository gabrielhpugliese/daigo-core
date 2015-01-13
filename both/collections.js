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

/*
 * Meteor.users security
 */
Meteor.users.allow({
  update: function (userId, doc) {
    if (Meteor.users.findOne({daigoAdmin: true})) {
      throw new Meteor.Error('There is already one admin set. If you want to change, do it on mongo.');
    }

    return true;
  }
});
