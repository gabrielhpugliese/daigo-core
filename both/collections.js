DaigoEvents = new Mongo.Collection('daigo_events');
DaigoRules = new Mongo.Collection('daigo_rules');

/*
 * DaigoRules methods
 */
DaigoRules.add = function (name, description, rules) {
  return DaigoRules.insert({
    name: name,
    description: description,
    rules: rules
  });
};

/*
 * DaigoEvents methods
 */
DaigoEvents.add = function (name) {
  return DaigoEvents.insert({name: name});
};

/*
 * DaigoRules security
 */
DaigoRules.allow({
  insert: function (userId, doc) {
    var pattern = {
      name: String,
      description: String,
      points: Match.ObjectIncluding({
        points: Match.Optional(Match.Integer)
      })
    }

    try {
      Match.test(doc, pattern);
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
 * DaigoEvents security
 */
DaigoEvents.allow({
  insert: function (userId, doc) {
    return true;
  }
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
