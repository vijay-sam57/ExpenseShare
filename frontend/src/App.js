import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
function App() {
  return (
    <div className="App">
      <h1>ExpenseShare</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
