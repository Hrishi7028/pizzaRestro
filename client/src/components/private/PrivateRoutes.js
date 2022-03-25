import {useSelector} from 'react-redux';
import { Redirect, Route } from 'react-router';


export const PrivateRoutes = (props) => {
    const {user} = useSelector((state) => (state.userReducer));
    return !user ?  <Redirect to='/login' />  :<Route exact={props.exact} path={props.path} component={props.component} />
}