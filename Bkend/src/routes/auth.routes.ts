import { Router } from "express";
import { verifySignup } from "../middlewares/index";

const router = Router();

import * as authCtrl from "../controllers/authController";

// router.post(
//   "/signup",
//   verifySignup.checkDuplicateUsernameOrEmail,
//   authCtrl.signUp
// );
router.post("/signin", authCtrl.signIn);
router.post(
  "/signup/admin",
  [verifySignup.checkRoles, verifySignup.checkDuplicateUsernameOrEmail],
  authCtrl.signUp
);

router.post(
  "/signup",
  [verifySignup.checkRoles, verifySignup.checkDuplicateUsernameOrEmail],
  authCtrl.signUp
);

export default router;
