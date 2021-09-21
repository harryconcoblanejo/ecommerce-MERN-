import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import cart from "../models/cart/cart";

import Cart, { ICart } from "../models/cart/cart";
import User, { IUser } from "../models/users/user";

interface IRequest extends Request {
  user?: string;
}

export const addItemToCart = async (req: IRequest, res: Response) => {
  const myCart: ICart = await Cart.findOne({ user: req.params._id });
  const productId: string = req.body.cartItems.product;
  const cartItems: [] = req.body.cartItems;
 
  try {
    if (myCart) {
      // searching  for duplicated product

      const isItemAdded = myCart.cartItems.find(
        (item) => item.product == productId
      );

      if (isItemAdded) {
        const modify = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: isItemAdded.quantity + req.body.cartItems.quantity,
            },
          },
        };

        const updatedCArt: ICart = await Cart.findOneAndUpdate(
          { _id: myCart._id, "cartItems.product": productId },
          modify,

          { new: true }
        );

        res.status(200).json({ message: "Updating quantity..:", updatedCArt });
      } else {
        const modify = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
        const updatedCArt: ICart = await Cart.findByIdAndUpdate(
          myCart._id,
          modify,
          { new: true }
        );

        res.status(200).json({ message: "Updating..:", updatedCArt });
      }
    } else {
      //    if cart not exists , create a new cart
      const cart = new Cart({
        user: req.params._id, 
        cartItems: [req.body.cartItems],
      });

      const savedCart = await cart.save();
      res.send(savedCart);
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "this is the error", error });
  }
};


