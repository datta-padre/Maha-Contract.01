import {Router} from 'express';
const router = Router();
import { authenticateUser } from "../middleware/auth.js";

router.use(authenticateUser("systemVendor"));

router.get('/', async (req, res) => {
  res.render("contractor/index.ejs");
});

export default router;