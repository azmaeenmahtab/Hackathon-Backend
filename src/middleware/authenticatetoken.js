const admin = require("./firebaseAdmin");

const auth = async (req, res, next) => {
    const hdr = req.headers.authorization || "";
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        const decoded = await admin.auth().verifyIdToken(token, true);
        req.user = decoded;
        next();
    } catch (e) {
        console.error("Firebase verifyIdToken error:", e);
        if (e.code === "auth/id-token-revoked") {
            return res.status(401).json({ error: "Token revoked, re-authenticate." });
        }
        return res.status(401).json({ error: "Invalid or expired token", detail: e.message });
    }
};

module.exports = auth;
