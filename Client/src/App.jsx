import { BrowserRouter, Routes, Route } from "react-router-dom";

//* Local Imports
import { Home } from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import { Create } from "./pages/Create.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./components/forms/Login.jsx";
import Profile from "./pages/Profile.jsx";

import { ProtectRoutes } from "./utils/ProtectRoutes.jsx";
import "./App.css";
import { Missing } from "./components/Missing.jsx";
import Edit from "./pages/Edit.jsx";

function App() {
  return (
    <BrowserRouter>
      {/*Provider for the AuthContext*/}
      <AuthProvider>
        <Routes>
          {/*PUBLIC ROUTES*/}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          {/* PROTECTED ROUTES*/}
          <Route element={<ProtectRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
          {/*MISSING ROUTE*/}
          <Route path="*" element={<Missing />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
