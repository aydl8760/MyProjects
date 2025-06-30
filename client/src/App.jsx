import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import UserDetailsPage from "./pages/UserDetailsPage";
import CreateUserPage from "./pages/CreateUserPage";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateUserPage />} />
        <Route path="/details/:id" element={<UserDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
