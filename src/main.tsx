import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './index.css'

import App from './App.tsx'
import { CartProvider } from "./contextAPI/CartProvider";
import { OrderProvider } from './contextAPI/OrderProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OrderProvider>
      <CartProvider>
         <App />
    </CartProvider>
    </OrderProvider>
  </StrictMode>,
)
