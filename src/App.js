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
import ProfilePage from './pages/user/ProfilePage.js'
import AdminPage from './pages/admin/AdminPage.js'

import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <div>
      <Header />

      <div className='mb-5'>
        <AdminPage />
      </div>

      <Footer />
    </div>
  )
}

export default App
