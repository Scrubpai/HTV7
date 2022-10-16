import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from './SocketContext';
import './styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function Index() {
  var Homepage = require('./components/homepage.js').default;
  var Quote = require('./components/quote.js').default;
  var Question1 = require('./components/question1.js').default;
  var Question2 = require('./components/question2.js').default;
  var Question3 = require('./components/question3.js').default;

  var App = require('./App.js').default;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/question1" element={<Question1 />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/question3" element={<Question3 />} />
          <Route path="/main" element={<ContextProvider>
    <App />
  </ContextProvider>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />)