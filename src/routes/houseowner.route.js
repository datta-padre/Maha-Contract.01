import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import executeQuery from "../config/db.js";

const router = Router();

router.use(authenticateUser("houseowner"));

router.get("/", async (req, res) => {
    var houseowner_profile = await executeQuery(`SELECT * FROM users WHERE user_id = '${req.session.userId}' AND user_role = '${req.session.userRole}'`);
    res.render("houseowner/index", { houseowner_profile: houseowner_profile[0] });
});

router.get("/post_tender", async (req, res) => {
    var houseowner_profile = await executeQuery(`SELECT * FROM users WHERE user_id = '${req.session.userId}' AND user_role = '${req.session.userRole}'`);
    res.render("houseowner/post_tender", { houseowner_profile: houseowner_profile[0] });
});

router.get("/view_tenders", async (req, res) => {
    var houseowner_profile = await executeQuery(`SELECT * FROM users WHERE user_id = '${req.session.userId}' AND user_role = '${req.session.userRole}'`);
    res.render("houseowner/view_tenders", { houseowner_profile: houseowner_profile[0] });
});

router.get("/logout", async (req, res) => {
    await req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect("/");
    });
});

export default router;