Daigo = function (options) {
  if (_.isEmpty(options.adminUserId)) {
    throw new Meteor.Error('You need to initialize Daigo with adminUserId option');
  }

  this.adminUserId = options.adminUserId;
};
