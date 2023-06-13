import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import { useStateValue } from "../StateProvider";
import Toast from "../toast/Toast";
import DetailBill from "./components/modal/DetailBIll";
import Modal from "../Modal/Modal";

function AccountManagement() {
  const [{ details_product, products, rams, roms, colors }, dispatch] =
    useStateValue();
  const [accounts, setAccounts] = useState([]);
  const axios = require("axios");
  const { error, success } = Toast;

  const accountCells = [
    "STT",
    "Tài khoản",
    "Email",
    "Ngày tạo",
    "Cấp quyền",
    "",
  ];

  async function getAccounts() {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}user`,
      });
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setAccounts(response.data);
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function getAccountByName(user_name) {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}user-byname`,
        data: {
          user_name: user_name,
        },
      });
      if (Array.isArray(response.data)) {
        setAccounts(response.data);
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function updateRole(data) {
    console.log(data);
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}update-role`,
        data: data,
      });
      if (response.data) {
        getAccounts();
        success(response.data);
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function deleteUser(user_id) {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}delete-user`,
        data: {
          user_id: user_id,
        },
      });
      if (response.data) {
        getAccounts();
        success(response.data);
      }
    } catch (error) {
      error("Lỗi");
    }
  }
async function unlockUser(user_id){
  try {
    const response = await axios({
      method:"post",
      url: `${process.env.REACT_APP_API_URL}unlock-user`,
      data:{
        user_id: user_id
      }
    });
    if(response.data){
      getAccounts();
      success(response.data);
    }
  } catch(error)
  {
    error(error);
  }
}
  const handleAccounts = {
    onChangeIsAdmin: (user) => {
      if (user.isAdmin == 0) {
        const data = {
          isAdmin: 1,
          user_id: user.user_id,
        };
        updateRole(data);
      } else  if (user.isAdmin == 1) {
        const data = {
          isAdmin: 2,
          user_id: user.user_id,
        };
        updateRole(data);
      } else {
        const data = {
          isAdmin: 0,
          user_id: user.user_id,
        };
        updateRole(data);
      }
    },
    onDeleteAccount: (user_id) => {
      if (window.confirm("Bạn có chắc muốn xóa tài khoản này không?") == true) {
        deleteUser(user_id);
      }
    },
    onUnlockUser: (user_id) => {
      if(window.confirm("Bạn có chắc muốn gỡ khóa tài khoản này không") == true){
        unlockUser(user_id);
      }
    }
  };

  const handleSearchAccount = (event) => {
    getAccountByName(event.target.value);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div>
      <Home
        list={accounts}
        handleChange={handleAccounts.onChangeIsAdmin}
        isAccountPage={true}
        cells={accountCells}
        onChange={handleSearchAccount}
        handleClick={handleAccounts.onDeleteAccount}
        handleUnlock={handleAccounts.onUnlockUser}
      />
    </div>
  );
}

export default AccountManagement;
