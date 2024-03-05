import { Router } from 'express';


import {sendCustomerMail, sendMail}  from '../controllers/user.js'; 
const router = Router(); 

 
router.post('/sendMail', sendMail);
router.post('/sendCustomerMail', sendCustomerMail);

export default router;