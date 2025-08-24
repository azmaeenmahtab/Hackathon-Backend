const admin = require("firebase-admin");
// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), // Or use cert() with your service account
    });
}


const auth = async (req, res, next) => {
    try {
        const hdr = req.headers.authorization || "";
        const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
        if (!token) return res.status(401).json({ error: "No token provided" });
        // Check for revoked tokens as well
        const decoded = await admin.auth().verifyIdToken(token, true);
        req.user = decoded; // uid, email, name?, picture?
        next();
    } catch (e) {
        // Handle revoked token error
        if (e.code === 'auth/id-token-revoked') {
            return res.status(401).json({ error: "Token has been revoked. Please re-authenticate." });
        }
        res.status(401).json({ error: "Invalid or expired token", detail: e.message });
    }
};

module.exports = auth;
