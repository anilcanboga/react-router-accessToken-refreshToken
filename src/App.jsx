import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import { ContextProvider } from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/category"
            element={
              <PrivateRoute>
                <Category />
              </PrivateRoute>
            }
          /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/category" element={<Category />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default App;
