const { Storage } = require("@google-cloud/storage");

const serviceAccount = JSON.parse(process.env.GCS_ADMIN_JSON);

const storage = new Storage({
  credentials: serviceAccount,
});

module.exports = { storage };
