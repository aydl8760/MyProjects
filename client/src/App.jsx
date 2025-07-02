import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import UserDetailsPage from "./pages/UserDetailsPage";
import CreateUserPage from "./pages/CreateUserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateUserPage />} />
      <Route path="/details/:id" element={<UserDetailsPage />} />
    </Routes>
  );
}

export default App;
