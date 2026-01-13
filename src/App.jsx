import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Calculator from "./components/calculator/Calculator";
import CalculationHistory from "./components/calchistory/CalculationHistory";
import NotFound from "./components/handling/NotFound";
import ApiExamples from "./components/apiexamples/ApiExamples";
import Information from "./components/information/Information";
import Healthcheck from "./components/healthcheck/Healthcheck";
import Stats from "./components/stats/Stats";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/info" element={<Information />} />
            <Route path="/examples" element={<ApiExamples />} />
            <Route path="/calculations" element={<CalculationHistory />} />
            <Route path="/healthcheck" element={<Healthcheck />} />
            <Route path="/stats" element={<Stats />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
