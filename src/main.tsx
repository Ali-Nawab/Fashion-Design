import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Tailwind styles
import 'remixicon/fonts/remixicon.css';
import router from './routers/router.tsx';
import { RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import MantineProvider
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; // Required for Mantine components

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* Remove withGlobalStyles and withNormalizeCSS */}
      <MantineProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
