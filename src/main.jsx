import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  'https://tubnpuzyuhjyhslwbshd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Ym5wdXp5dWhqeWhzbHdic2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4NTc1OTEsImV4cCI6MjAwODQzMzU5MX0.G-Z3MGdzPiDCEpa_vOpriMvivCrlyBInVuf8z1COOxQ'
  );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
