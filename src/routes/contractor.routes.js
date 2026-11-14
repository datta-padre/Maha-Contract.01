import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import executeQuery from "../config/db.js";
import multer from "multer";
import crypto from "node:crypto";
import path from "node:path";
import {uploadProjectImage , uploadToS3} from "../middleware/uploads.js";

const router = Router();

router.use(authenticateUser("contractor"));

router.get("/", async (req, res) => {
  var contractor_profile = await executeQuery( `SELECT * FROM users WHERE user_id = '${req.session.userId}' AND user_role = '${req.session.userRole}'`);
  res.render("contractor/index.ejs", {contractor_profile: contractor_profile[0]});
});


router.get("/logout", async (req, res) => {
  await req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/");
  });
});

export default router;
