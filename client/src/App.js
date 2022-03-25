import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "./Screens/Home";
import store from "./redux";
import { Provider } from 'react-redux'
import Register from "./Screens/Register";
import Login from "./Screens/Login";
import { RouteLinks } from "./components/private/reactLinks";
import CartScreen from "./Screens/CartScreen";
import { PrivateRoutes } from "./components/private/PrivateRoutes";
import AllUsers from "./components/privateComponents/AllUsers";
import { AdminRoutes } from "./components/private/AdminRoutes";
import AllPizza from "./components/privateComponents/AllPizza";
import EditPizza from "./components/privateComponents/EditPizza";
import New_pizza from "./components/privateComponents/New_pizza";
import AllOrder from "./components/AllOrder";
import AllUserOrders from "./components/privateComponents/AllUserOrders";
import SingleOrderDetails from "./components/privateComponents/SingleOrderDetails";
import EmailForResetPaaword from "./components/EmailForResetPaaword";
import ResetPassword from "./components/ResetPassword";



function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <AdminRoutes exact path="/alluser" component={AllUsers} />
            <AdminRoutes exact path="/admin/edit_pizza" component={EditPizza} />
            <AdminRoutes exact path="/admin/new_pizza" component={New_pizza} />
            <AdminRoutes exact path="/admin/allUserOrders" component={AllUserOrders} />
            <AdminRoutes exact path="/allpizza" component={AllPizza} />
            <AdminRoutes exact path="/single_prod/:id" component={SingleOrderDetails} />
            <PrivateRoutes exact path="/cart" component={CartScreen} />
            <PrivateRoutes exact path="/all_your_orders/:id" component={AllOrder} />
            <RouteLinks exact path="/register" component={Register} />
            <RouteLinks exact path="/login" component={Login} />
            <RouteLinks exact path="/password-reset/set_new/pass/:userId/:token" component={ResetPassword} />
            <RouteLinks exact path="/reset_passs_email_check" component={EmailForResetPaaword} />

          </Switch>
        </Router>
      </Provider>
    </>
  )
}

export default App;
