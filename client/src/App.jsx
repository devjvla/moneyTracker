import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast";

/* GraphQL */
import { useQuery } from '@apollo/client';
import { GET_AUTH_USER } from "./graphql/queries/user.query";

/* Shared Components */
import Header from "./components/ui/Header"

/* Pages */
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionPage from "./pages/TransactionPage"
import NotFound from "./pages/NotFound"

function App() {
  /* GraphQL Queries */
  const { loading, data } = useQuery(GET_AUTH_USER);

  if(loading) return null;

  return (
    <>
      { data?.authUser && <Header /> }

      <Routes>
        <Route path="/" element={ data?.authUser ? <HomePage /> : <Navigate to="/signin" /> } />
        <Route path="/signin" element={ !data?.authUser ? <SignInPage /> : <Navigate to="/" /> } />
        <Route path="/signup" element={ !data?.authUser ? <SignUpPage /> : <Navigate to="/" /> } />
        <Route path="/transaction/:id" element={ data?.authUser ? <TransactionPage /> : <Navigate to="/" /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
