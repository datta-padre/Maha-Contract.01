import {Router} from 'express';
const router = Router();
import { authenticateUser } from "../middleware/auth.js";
import executeQuery from "../config/db.js";

router.use(authenticateUser("systemVendor"));

router.get('/', async (req, res) => {
  var systemVendor_profile = await executeQuery(`SELECT * FROM users WHERE user_id = '${req.session.userId}' AND user_role = '${req.session.userRole}'`);
  res.render("systemVendor/index.ejs", { systemVendor_profile: systemVendor_profile[0] });
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