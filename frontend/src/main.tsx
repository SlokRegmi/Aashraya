
import axios from "axios";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App.tsx";
import "./index.css";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;



createRoot(document.getElementById("root")!).render(

        <BrowserRouter>
            <App />

        </BrowserRouter>

);
