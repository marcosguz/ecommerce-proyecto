import { Purchaces, Home, Login, ProductsDetail } from "./pages";
import { HashRouter, Routes, Route } from "react-router-dom";
import { LoadingScreen, NavBar } from "./components";
import ProtectedRoutes from './components/ProtectedRoutes'
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path='/purchaces' element={<Purchaces/>}/>
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
