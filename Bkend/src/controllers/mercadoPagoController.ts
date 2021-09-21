import { Request, Response, NextFunction, RequestHandler } from "express";
import mercadopago from "mercadopago";
import config from "../config";

mercadopago.configure({
  access_token: config.ACCESS_TOKEN,
});

export const mercadoPago: RequestHandler = (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.items[0].title,
        unit_price: parseInt(req.body.items[0].unit_price),
        quantity: parseInt(req.body.items[0].quantity),
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      const respuesta = response.body;

      res.json({ message: "todo ok papurri", respuesta });
      console.log(preference);
      console.log(req.body);

      // res.redirect(respuesta.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
};
