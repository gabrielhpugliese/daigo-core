var both = ['client', 'server'];

Package.describe({
  name: "daigo:core",
  summary: "Daigo: gamify your app.",
  version: "0.0.0",
  git: "https://github.com/gabrielhpugliese/daigo-points"
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.2');

  api.imply('daigo:points', both);

  api.use('matb33:collection-hooks', both);
  api.use(['underscore', 'mongo'], both);

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

Package.onTest(function (api) {
  api.use('daigo:core', both);
  api.use(['tinytest', 'test-helpers'], both);
  api.addFiles(['tests/client_tests.js'], 'client');
  api.addFiles(['tests/server_tests.js'], 'server');
  api.addFiles(['tests/both_tests.js'], both);
});
