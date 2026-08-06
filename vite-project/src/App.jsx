import { Component, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from './pages/auth/signup/register'
import Login from './pages/auth/signin/Login'
import OtpVerify from './pages/auth/otpVerify/OtpVerify'
import Res from './pages/auth/signup/res'
import ProductList from './pages/product/ProductList/ProductList'
import ProductAdd from './pages/product/ProductAdd/ProductAdd'
import ProfileDetails from './pages/auth/ProfileDetails/ProfileDetails'
import ErrorPage from '../component/ErrorPage/ErrorPage'
import { PrivateRoute } from '../lib/PrivateRoute/privateRoute'
import ProductUpdate from './pages/product/ProductUpdate/ProductUpdate'
import ProductView from './pages/product/ProductView/ProductView'
import ForgetPassword from './pages/auth/ForgetPassword/ForgetPassword'
import ResetPassword from './pages/auth/ResetPassword/ResetPassword'
import useAuthStore from '../store/authStore'
import UpdatePassword from './pages/product/UpdatePassword/UpdatePassword'



function App() {
  const publicRouting = [{
    component: <Login />,
    path: "/auth/login",
  },
  {
    component: <Register />,
    path: "/",
  },
  {
    component: <OtpVerify />,
    path: "/auth/verify-otp",
  },
  {
    component: <ProfileDetails />,
    path: "/auth/profile-details",
  },
  {
    component: <ErrorPage />,
    path: "/*", // * is global

  },

  {
    component: <ForgetPassword />,
    path: "/auth/forgot-password",
  },

  {
    component: <ResetPassword />,
    path: "/auth/reset-password/:id/:token",
  },
  ]

  const privateRouting = [{
    component: <ProductList />,
    path: "/product/product-list",

  },
  {
    component: <ProductAdd />,
    path: "/product/product-add",
  },
  {
    component: <ProfileDetails />,
    path: "/auth/profile-details",
  },
  {
    component: <UpdatePassword />,
    path: "/product/update-password",
  },
  {
    component: <ProductUpdate />,
    path: "/product/product-update/:id",
  },
  {
    component: <ProductView />,
    path: "/product/product-view/:id",
  },
  ]

  return (
    <>

      <Router>
        <Routes>
          {publicRouting.map((item) => (
            <>
              <Route path={item.path} element={item.component} />
            </>
          ))}

          {privateRouting.map((item) => (
            <>
              <Route path={item.path} element={<PrivateRoute>{item.component}</PrivateRoute>} />
            </>
          ))}
        </Routes>
      </Router>

    </>
  )
}

export default App
