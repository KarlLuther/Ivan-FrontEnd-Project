import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ReviewSearchPage from "./components/ReviewSearchPage";
import UsersPage from "./components/UsersPage";
import SpecificReviewPage from "./components/SpecificReviewPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/Reviews" element={<ReviewSearchPage />}></Route>
        <Route path="/Users" element={<UsersPage />}></Route>
        <Route
          path="/Reviews/:review_id"
          element={<SpecificReviewPage />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
