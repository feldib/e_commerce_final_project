import HomePage from './pages/user/HomePage.js'
import SignInPage from './pages/user/SignInPage.js'
import RegistrationPage from "./pages/user/RegistrationPage.js"
import ShoppingCartPage from './pages/user/ShoppingCartPage.js'
import CheckoutPage from "./pages/user/CheckoutPage.js"
import ArtworkPage from './pages/user/ArtworkPage.js'
import ReceiptPage from './pages/user/ReceiptPage.js'
import ContactUsPage from './pages/user/ContactUsPage.js'
import AboutUsPage from './pages/user/AboutUsPage.js'

import UserData from './subpages/user/UserData.js'
import OrderHistory from './subpages/user/OrderHistory.js'
import WishList from './subpages/user/WishList.js'

import Orders from './subpages/admin/Orders'
import Reviews from './subpages/admin/Reviews'
import Messages from './subpages/admin/Messages'
import Users from './subpages/admin/Users'
import Artworks from './subpages/admin/Artworks'

import ProfilePage from './pages/user/ProfilePage.js'
import AdminPage from './pages/admin/AdminPage.js'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import Footer from "./components/Footer"
import React from 'react'
import server_url from './server.js'

function App() {
  const [user, setUser] = React.useState()
  const [loggedIn, setLoggedIn] = React.useState()

  React.useEffect(()=>{
    (async()=>{
      if(user){
        await fetch(
          `${server_url}/logged_in`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: user.id
                })
            }
        ).then((response)=>response.json())
        .then((isLoggedIn)=>{
            setLoggedIn(isLoggedIn)
        })
        .catch((err)=>{console.log(err)})
      }
    })()
  }, [user])

  React.useEffect(()=>{
    if(user){
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  React.useEffect(()=>{
    const prev_user = localStorage.getItem('user')
    if(prev_user){
      setUser(
        JSON.parse(prev_user)
      )
    }
  } ,[])

  const settleSuccessfulLogIn = (userData)=>{
    setUser(userData)
    window.location.replace(
      userData.is_admin ? 
      "/admin" :
      "/user"
    )
  }

  const settleSuccessfulRegistration = (userData)=>{
    setUser(userData)
    window.location.replace("/user")
  }

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} user={user} />

      <div className='mb-5'>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />

          <Route
            path='/login'
            element={
              <SignInPage 
                settleSuccessfulLogIn = {settleSuccessfulLogIn}
              />
            }
          />

          <Route
            path='/register'
            element={
              <RegistrationPage 
              settleSuccessfulRegistration = {settleSuccessfulRegistration}
              />
            }
          />

          <Route
            path='/shopping_cart'
            element={<ShoppingCartPage />}
          />

          <Route
            path='/checkout'
            element={<CheckoutPage />}
          />

          <Route
            path='/artwork_page'
            element={<ArtworkPage />}
          />

          <Route
            path='/receipt'
            element={<ReceiptPage />}
          />

          <Route
            path='/contact'
            element={<ContactUsPage />}
          />

          <Route
            path='/about'
            element={<AboutUsPage />}
          />

          <Route
            path='/user'
            element={<ProfilePage />}
          >
            <Route
              path='data'
              element={<UserData />}
            />

            <Route
              path='order_history'
              element={<OrderHistory />}
            />

            <Route
              path='wishlist'
              element={<WishList />}
            />
          </Route>

          <Route
            path='/admin'
            element={<AdminPage />}
          >
            <Route
              path='orders'
              element={<Orders />}
            />

            <Route
              path='reviews'
              element={<Reviews />}
            />

            <Route
              path='messages'
              element={<Messages />}
            />

            <Route
              path='users'
              element={<Users />}
            />

            <Route
              path='artworks'
              element={<Artworks />}
            />
          </Route>

        </Routes>


      </div>

      <Footer />
    </BrowserRouter>
  )
}

export default App
