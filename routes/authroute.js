import express from 'express';
import { LoginController, RegisterController, testController} from '../controller/authController.js';
import  {requireSignin}  from '../middleware/authMiddleware.js';

// router object - because we have made it in a new file
const router = express.Router()

router.post('/register', RegisterController)
router.post('/login', LoginController)

//test route
router.get('/test',requireSignin ,testController)

export default router