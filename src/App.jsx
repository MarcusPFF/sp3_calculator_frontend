import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Calculator from "./components/calculator/Calculator";
import "./App.css";

//Remove - placeholders
const Stats = () => (
  <h2 style={{ textAlign: "center" }}>Statistics (Coming Soon)</h2>
);
const Info = () => <h2 style={{ textAlign: "center" }}>Information Page</h2>;
const Examples = () => (
  <h2 style={{ textAlign: "center" }}>Example Calculations</h2>
);
const Calculations = () => <h2 style={{ textAlign: "center" }}>My History</h2>;
const Healthcheck = () => (
  <h2 style={{ textAlign: "center", color: "green" }}>System Online ✅</h2>
);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/info" element={<Info />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/calculations" element={<Calculations />} />
            <Route path="/healthcheck" element={<Healthcheck />} />

            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
