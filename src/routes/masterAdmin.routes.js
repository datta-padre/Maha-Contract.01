import {Router} from 'express';
import executeQuery from '../config/db.js';
const router = Router();
import { masterAdminAuth } from "../middleware/auth.js";

router.get("/login",async(req,res)=>{
  res.render("masterAdmin/login.ejs");
})

router.post("/do_login",async(req,res)=>{
  const { role ,admin_email, admin_password } = req.body;
  var admin = await executeQuery(`SELECT * FROM master_admin WHERE admin_email = ? AND admin_password = ?`, [admin_email, admin_password]);
  if (admin.length > 0) {
        req.session.adminId = admin[0].admin_id;
        req.session.adminRole = role;
        res.redirect("/masterAdmin") 
    } else {
        res.redirect("/masterAdmin/login")
    }
})

router.get('/', masterAdminAuth(), async (req, res) => {
  var admin_profile = await executeQuery(`SELECT * FROM master_admin WHERE admin_id = '${req.session.adminId}'`);
  res.render("masterAdmin/index.ejs",{"admin_profile":admin_profile[0]});
});

router.get('/about_company', masterAdminAuth(), async (req, res) => {
  var about_company = await executeQuery('SELECT * FROM about_company');
  var admin_profile = await executeQuery(`SELECT * FROM master_admin WHERE admin_id = '${req.session.adminId}'`);
  const updated_at = about_company[0].updated_at;
  const formattedDate = new Date(updated_at).toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});

  res.render("masterAdmin/about_company.ejs", { about_company: about_company[0], formattedDate: formattedDate, admin_profile: admin_profile[0] });
});

router.post('/save_company', masterAdminAuth(), async (req, res) => {
  const { company_name, company_address, company_email, company_mobile, company_whatsapp, instagram, youtube, facebook, twitter, linkedin } = req.body;
  await executeQuery(`UPDATE about_company SET company_name = ?, company_address = ?, company_email = ?, company_mobile = ?, company_whatsapp = ?, instagram = ?,youtube = ?, facebook = ?, twitter = ?, linkedin = ? WHERE company_id = 1`, [company_name, company_address, company_email, company_mobile, company_whatsapp, instagram, youtube, facebook, twitter, linkedin]);
  res.redirect('/masterAdmin/about_company');
}); 

router.get("/contact_us", masterAdminAuth(), async (req, res) => {
  const contact_messages = await executeQuery('SELECT * FROM contact_messages ORDER BY created_at DESC');
  const admin_profile = await executeQuery(`SELECT * FROM master_admin WHERE admin_id = '${req.session.adminId}'`);
  res.render("masterAdmin/contact_us.ejs", { contact_messages, admin_profile: admin_profile[0] });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect("/masterAdmin/login");
  });
});


export default router;