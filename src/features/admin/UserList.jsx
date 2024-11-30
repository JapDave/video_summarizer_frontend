import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from '../../redux/slices/adminSlice';
import UserListTable from '../../components/admin/UserListTable';
import { authAPI } from '../../api';
import ToastContainer from '../../components/customToaster/ToastContainer';
import { API_BASE_URL } from '../../utils/ENVImport';

const UserList = () => {
  const toastRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');
  const userList = useSelector((state) => state.admin.userList);
  const [loading, setLoading] = useState(false);

  const getUserListHandler = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/get-users`, {
        method: 'GET',
        headers: {
          Token: `${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      const data = await response.json();
      dispatch(setUserList(data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateUserHandler = async (id, is_blocked) => {
    setLoading(true);
    try {
      const response = await authAPI.updateUserStatus(id, is_blocked);
      toastRef.current.addToast('User updated successfully', 3000);
      if (response) {
        getUserListHandler();
      }
    } catch (error) {
      console.error('Login failed:', error);
      toastRef.current.addToast('Failed to update user.', 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      getUserListHandler();
    }
  }, [token, navigate]);

  return (
    <div className="h-screen w-full p-2">
      <ToastContainer ref={toastRef} />
      <div className="w-full rounded-md">
        <UserListTable
          userData={userList}
          updateUser={updateUserHandler}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default UserList;
