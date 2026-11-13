import {Router} from 'express';
import { authenticateUser } from "../middleware/auth.js";

const router = Router();

router.use(authenticateUser("contractor"));

router.get('/', async (req, res) => {
  res.render("contractor/index.ejs");
});

export default router;