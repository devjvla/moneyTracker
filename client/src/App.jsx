import { Routes, Route } from "react-router-dom"

/* Shared Components */
import Header from "./components/ui/Header"

/* Pages */
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionPage from "./pages/TransactionPage"
import NotFound from "./pages/NotFound"

function App() {
  const authUser = false;

  return (
    <>
      { authUser && <Header /> }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
