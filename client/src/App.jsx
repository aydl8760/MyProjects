import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import UserDetailsPage from "./pages/UserDetailsPage";
import CreateUserPage from "./pages/CreateUserPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import AllBlogLists from "./pages/AllBlogLists";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateUserPage />} />
      <Route path="/details/:id" element={<UserDetailsPage />} />
      <Route path="/update/:id" element={<UpdateUserPage />} />
      <Route path="/create-post" element={<CreatePostPage />} />
      <Route path="/blogs" element={<AllBlogLists />} />
    </Routes>
  );
}

export default App;
