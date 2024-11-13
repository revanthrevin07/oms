import React, { useState } from 'react';
import logo from "../assets/images/logo.png";
import "../assets/styles/Loginpage.css";
import login from "../common/login.json";
import Lottie from 'react-lottie-player';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLock2Line } from "react-icons/ri";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Loginpage = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const authentication = [
    {
      label: "Username",
      name: "email",
      placeholder: "Enter your username",
      type: "text",
      autoComplete: "username",
      icon: <FaRegCircleUser />
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      type: showPassword ? "text" : "password",
      autoComplete: "current-password",
      icon: <RiLock2Line />
    }
  ];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 14,
    outline: "none",
    p: 4,
    textAlign: "center",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrorMessage('');
  };

  const handlePasswordToggle = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;

    if (!email && !password) {
      setErrorMessage('Please fill out both fields');
      return;
    } else if (!email) {
      setErrorMessage('Please enter your username');
      return;
    } else if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }

    try {
      const response = await fetch('https://mjl9lz64l7.execute-api.ap-south-1.amazonaws.com/stage1/api/user_master/login-authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formValues.email,
          password: formValues.password,
        }),
      });

      if (!response.ok) {
        setErrorMessage('Login failed. Please check your credentials.');
        return;
      }

      const data = await response.json();

      if (data.token) {
        console.log("Login Successful", data);
        localStorage.setItem("token", JSON.stringify(data.token));

        toast.success("Login Successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/products");
        }, 2000); 
      } else {
        alert("Please check your username and password");
      }
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage('Login failed. Please try again later.');
    }
  };


  return (
    <section>
      <div className='login-page'>
        <div className='login-container'>
          <div className='login-left'>
            <img src={logo} alt="main-logo" className='img-fluid main-logo' width={150} />
            <Lottie animationData={login} play loop className='login-image' />
          </div>
          <div className='login-right'>
            <form onSubmit={handleSubmit}>
              <h1 className='login-heading'>Login to your account</h1>
              <p className='login-subtitle'>
                Simplify your order management and gain complete control
              </p>
              {authentication.map((data, index) => (
                <div key={index} className='input-container'>
                  <label>{data.label}</label><br />
                  <div className='input-wrapper'>
                    {data.icon && <span className='input-icon'>{data.icon}</span>}
                    <input
                      type={data.type}
                      name={data.name}
                      placeholder={data.placeholder}
                      className='login-input'
                      value={formValues[data.name]}
                      onChange={handleInputChange}
                      autoComplete={data.autoComplete}
                    />
                    {data.name === "password" && (
                      <span className='toggle-password' onClick={handlePasswordToggle}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {errorMessage && <span className='error-message'>{errorMessage}</span>}
              <span className='forget-password' onClick={handleOpen}>Forget Password</span><br />
              <button type="submit" className='login-btn'>Login</button>
            </form>
          </div>
        </div>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Forget Password
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p className='pt-4'>Are you sure want to forget password?</p>
              <input type="text" placeholder='Forget Password' className='forget-input' />
              <button type="submit" className='forget-btn'>Forget Password</button>
            </Typography>
          </Box>
        </Modal>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss draggable
        pauseOnHover theme="light" />
    </section>
  );
};

export default Loginpage;
