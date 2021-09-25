import { Router } from "express";
import { authJwt, verifySignup } from "../middlewares/index";

const router = Router();

import * as authCtrl from "../controllers/authController";

router.post(
  "/admin/signup",
  verifySignup.checkDuplicateUsernameOrEmail,
  authCtrl.signUp
);
router.post("/admin/signin", authCtrl.signIn);

router.post("/admin/signout", authJwt.verifyToken, authCtrl.signOut);
// router.post(
//   "/signup/admin",
//   [verifySignup.checkRoles, verifySignup.checkDuplicateUsernameOrEmail],
//   authCtrl.signUp
// );

// router.post(
//   "/signup",
//   [verifySignup.checkRoles, verifySignup.checkDuplicateUsernameOrEmail],
//   authCtrl.signUp
// );

export default router;
