const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Make sure this file exists and is correct

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = admin;
