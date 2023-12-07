import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TranslatorDashboard from "./translator_dashboard";
import Myqueue from "./myqueue";
import Mydraft from "./mydraft";
import Mycompleted from "./mycompleted";
function MyApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/TranslatorDashboard"
            element={<TranslatorDashboard />}
          />
          <Route path="/myqueue" element={<Myqueue />} />
          <Route path="/mydraft" element={<Mydraft />} />
          <Route path="/Mycompleted" element={<Mycompleted />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MyApp;
