const Sentry = require("@sentry/node");
Sentry.init({
  dsn:
    "https://f7e83415b6fb4d589a22d2cff478c34b@o373137.ingest.sentry.io/5382003",
});

module.exports = Sentry;
