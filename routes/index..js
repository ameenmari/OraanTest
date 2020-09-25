
import express from "express";
import AuthController from "../controllers/AuthController";
import Middleware from "../middlewares";
import instalment from './instalmentRoute'

const router = express.Router();



router.post("/instalments/saveinstalment", Middleware.checkAuth, instalment.saveinstalment);

router.post("/instalments/totalInstalments", Middleware.checkAuth, instalment.totalInstalments);


router.post("/users/register", AuthController.signup);

router.post("/users/signin", AuthController.login);


router.post("/auth/refresh_token", AuthController.generateRefreshToken);

router.delete("/auth/logout", AuthController.logout);

router.get("/protected_resource", Middleware.checkAuth, (req, res) => {
    return res.status(200).json({ user: req.user });
});

module.exports = router;
