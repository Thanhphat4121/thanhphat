import React, { useState, useRef } from "react";
import "./User.css";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useRegister from "./useRegister";
import validateRegister from "./validateRegister";
import Toast from "../toast/Toast";
import { Alert } from "@mui/lab";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [notice, setNotice] = useState();
  const axios = require("axios");
  const formRegister = useRef(null);
  const {error,success} = toast;
  const navigate = useNavigate();

  let dateNow = new Date();

  const register = async () => {
    const data = new FormData(formRegister.current);
    console.log(data);
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}register`,
        data: {
          user_name: values.username,
          password: values.password,
          email: values.email,
        },
      });

      if(response.data == "Đăng ký thành công")  {
        success("Đăng ký thành công");
        navigate('/');
        setNotice(response.data);
        console.log(response.data);
        
      }else
      {setNotice(response.data);} 
    } catch (error) {
      console.error(error);
    }
  };

  const { values, handleChange, handleSubmit, errors } = useRegister(
    register,
    validateRegister,
    setNotice
  );

  return (
    <div className="user_page-wrapper">
      <div className="user_page-back">
        <ArrowBackIosIcon />
        <Link to="/">Quay về trang chủ</Link>
      </div>
      <div class="user_page">
        <div class="form">
          <form class="user-form" ref={formRegister}>
            <input
              name="username"
              type="text"
              placeholder="Tài khoản"
              onChange={(e) => handleChange(e)}
              value={values.username}
            />
            {errors.username ? <p className="err">{errors.username}</p> : ""}
            <input
              name="password"
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => handleChange(e)}
              value={values.password}
            />
            {errors.password ? <p className="err">{errors.password}</p> : ""}
            <input
              name="confirmPassword"
              type="password"
              placeholder="Xác nhận mật khẩu"
              onChange={(e) => handleChange(e)}
              value={values.confirmPassword}
            />
            {errors.confirmPassword ? (
              <p className="err">{errors.confirmPassword}</p>
            ) : (
              ""
            )}
            <input
              name="email"
              type="text"
              placeholder="Địa chỉ Email"
              onChange={(e) => handleChange(e)}
              value={values.email}
            />
            {errors.email ? <p className="err">{errors.email}</p> : ""}
            {notice ? <p className="err">{notice}</p> : ""}
            <button onClick={(e) => handleSubmit(e)}>Tạo tài khoản</button>
            <p class="message">
              Đã có tài khoản?<Link to="/login">Đăng nhập</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
