import * as categoriesControllers from '../controllers/categoriesControllers';
import {Router} from 'express';
import {authJwt} from '../middlewares'
import { addItemToCart } from '../controllers/cartControllers';

const router = Router();

  

router.post('/user/:_id/cart/addItemToCart',[authJwt.verifyToken,authJwt.isUser],addItemToCart)


export default router 


