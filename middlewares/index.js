import jwt from "jsonwebtoken";

//const privateKey = process.env.ACCESS_TOKEN_SECRET;

const privateKey = '9a6aed9cfd98a6fba3ef38b4c120ad0a8fd441c8c911c97fdfbcd51c6d879ae6149743a802cbea1bdd0701eabf77062ba3e89e61f28472914c16fb47e49cada5';
const REFRESH_TOKEN_SECRET = '988f2aa64c7008d8abd4b4f11019849b549a017af7722d2548d6b864e1e2f739df0c4aff30a62b5a71c2b9be22e3df2e309b3e2ebae0f26e65dbc6585614a7a4';



exports.checkAuth = (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {

        return res.status(401).json({ error: "Access denied, token missing!" });

    } else {
        try {
            const payload = jwt.verify(token, privateKey);
            req.user = payload.user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res
                    .status(401)
                    .json({ error: "Session timed out,please login again" });
            } else if (error.name === "JsonWebTokenError") {
                return res
                    .status(401)
                    .json({ error: "Invalid token,please login again!" });
            } else {
                console.error(error);
                return res.status(400).json({ error });
            }
        }
    }
};
