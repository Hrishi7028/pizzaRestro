import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/AllUserOrderCard.css'


const AllUserOrderCard = ({ order, idx }) => {
    // console.log(order);
    return (
        <>

            <tr>
                <td className='linkCol'><Link style={{ textDecoration: 'none',color:'inherit' }} to={`/single_prod/${order._id}`}>{idx + 1}</Link></td>
                <td className='linkCol'><Link style={{ textDecoration: 'none',color:'inherit' }} to={`/single_prod/${order._id}`}>{order.name}</Link></td>
                <td className='linkCol'><Link style={{ textDecoration: 'none',color:'inherit' }} to={`/single_prod/${order._id}`}>{order.email}</Link></td>
                <td className='linkCol'><Link style={{ textDecoration: 'none',color:'inherit' }} to={`/single_prod/${order._id}`}>{order.mobile}</Link></td>
                <td className='linkCol'><Link style={{ textDecoration: 'none',color:'inherit' }} to={`/single_prod/${order._id}`}>{order.totalQuantity}</Link></td>
                <td className='linkCol'><Link style={{ textDecoration: 'none',color:'inherit' }} to={`/single_prod/${order._id}`}>{order.createdAt.substring(0,10)}</Link></td>
                <td className='linkCol'><Link style={{ textDecoration: 'none',color:'inherit' }} to={`/single_prod/${order._id}`}>{order.OrderAmount}</Link></td>
                <td className='linkCol'><Link style={{ textDecoration: 'none',color:'inherit' }} to={`/single_prod/${order._id}`}>{order.isDelived}</Link></td>
            </tr>
        </>
    )
};

export default AllUserOrderCard;
