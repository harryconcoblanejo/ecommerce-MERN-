import { Fragment, useEffect } from 'react';
import FormTest from './components/formTest/formTestMercadoLibre';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import PrivateRoute from './components/HOC/privateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, isUserLoggedIn } from './redux/actions';
import { RootState } from './redux/reducers';
import Products from './components/products';
import Orders from './components/orders';
import Layout from './components/layout';
import Category from './components/category/index.';

export const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }

    dispatch(getAllCategory());
  }, []);
  return (
    <Fragment>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>

      {/* <FormTest /> */}
    </Fragment>
  );
};
//
