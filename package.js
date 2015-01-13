var both = ['client', 'server'];

Package.describe({
  name: "daigo:core",
  summary: "Daigo: gamify your app.",
  version: "0.0.0",
  git: "https://github.com/gabrielhpugliese/daigo-points"
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.2');

  api.use('daigo:points', both, {weak: true});
  api.use('matb33:collection-hooks', both);
  api.use(['underscore', 'mongo', 'accounts-base'], both);

  api.addFiles([
    'both/daigo.js',
    'both/collections.js'
  ], both);
  api.addFiles([
  ], 'server');

  api.export('Daigo', both);
  api.export('DaigoEvents', both);
  api.export('DaigoRules', both);
});
