import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';


export const AdminRoutes = (props) => {
    const { user } = useSelector((state) => (state.userReducer));
    return user.isAdmin === 'admin' ? <Route exact={props.exact} path={props.path} component={props.component} /> : <Redirect to='/' />
}