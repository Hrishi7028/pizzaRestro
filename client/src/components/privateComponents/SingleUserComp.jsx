import React, { useState } from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { deleteThisUserAsync, updateUserProfile } from '../../redux/asyncMethods/AdminMethods/UsersAysncMethods';
import '../../Styles/singleUser.css'


const SingleUserComp = ({ userDetails,idx}) => {
    // console.log(userDetails);
    const dispatch = useDispatch()
    const [userRole, setUserRole] = useState(userDetails.isAdmin)


    // console.log(userDetails);
    const deleteThisUser = (id) => {
        const ans = window.confirm("Do You really want to delete this person?")
        if (!ans) {
            return;
        }
        dispatch(deleteThisUserAsync(id))
        window.location.reload();
    }

    const changeUserRole = (e) => {
        let isTrue = window.confirm('Do you really want to change the mode of the User')
        if(!isTrue) {
            return;
        }
        
        setUserRole(e.target.value)
        userDetails.isAdmin = e.target.value
        dispatch(updateUserProfile(userDetails,userDetails._id))
      
    }
    return (
        <>
            <tr key={userDetails._id}>
                <td>{idx + 1}</td>
                <td>{`${userDetails.Fname}  ${userDetails.Lname}`}</td>
                <td>{userDetails.address}</td>
                <td>{userDetails.mobile}</td>
                <td>
                    <span className='admin_user_box'>
                        <select name="" id="" value={userRole} onChange={changeUserRole}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </span>
                </td>
                <td style={{ cursor: 'pointer' }} onClick={() => { deleteThisUser(userDetails._id) }}>
                    <AiOutlineUserDelete />

                </td>
            </tr>
        </>);
};

export default SingleUserComp;
