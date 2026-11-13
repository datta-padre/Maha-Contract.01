import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";


const router = Router();

router.use(authenticateUser("houseowner"));

router.get("/", (req, res) => {
    res.render("houseowner/index");
});

router.get("/post_tender", (req, res) => {
    res.render("houseowner/post_tender");
});

router.get("/view_tenders", (req, res) => {
    res.render("houseowner/view_tenders");
});

export default router;