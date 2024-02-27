import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import App from './App';
import UserContextProvider, { UserContext } from './Context/userContext';
import { QueryClient, QueryClientProvider } from 'react-query';

let queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </QueryClientProvider>
);