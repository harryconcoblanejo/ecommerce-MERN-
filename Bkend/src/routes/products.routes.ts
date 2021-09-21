import {Router} from 'express';

const router = Router();
import * as productsController from '../controllers/productsControllers';
import * as productServices  from '../models/products/services/productServices'
import {authJwt} from '../middlewares'






// user Routes

router.get('/',productsController.home);
router.get('/products',productsController.getProducts);
router.get('/products/:id',productsController.getProduct)

// admin Routes

router.post('/products/createProduct/:_id',[authJwt.verifyToken, authJwt.isAdmin] ,productServices.upload, productsController.createProduct)
router.put('/products/:id',[authJwt.verifyToken, authJwt.isAdmin] ,productServices.upload, productsController.updateProduct)
router.delete('/products/:id',[authJwt.verifyToken,authJwt.isAdmin], productsController.deleteProduct)




export default router 
 











