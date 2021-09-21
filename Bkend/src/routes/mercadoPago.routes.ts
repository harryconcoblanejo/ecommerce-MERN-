// import { mercadoPago } from "controllers/mercadoPagoController";
import { Router } from "express";
import { mercadoPago } from "../controllers/mercadoPagoController";
import { authJwt } from "../middlewares";

const router = Router();

router.post(
  "/checkout",
  /* [authJwt.verifyToken,authJwt.isUser], */ mercadoPago
);
export default router;
