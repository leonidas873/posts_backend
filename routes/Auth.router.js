import { Router } from "express";
import {signUpAsync, loginAsync} from '../controllers/Auth.controller.js';

const router = Router();

router.post('/signup', signUpAsync)
router.post('/login', loginAsync)


export default router;