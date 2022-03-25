import {useSelector} from 'react-redux';
import { Redirect, Route } from 'react-router';


export const RouteLinks = (props) => {
    const {user} = useSelector((state) => (state.userReducer));
    return user ?  <Redirect to='/' />  :<Route exact={props.exact} path={props.path} component={props.component} />
}