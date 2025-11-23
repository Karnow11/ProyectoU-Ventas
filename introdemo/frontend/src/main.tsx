import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './store/store.ts';
import { Provider } from "react-redux";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}>
      <ChakraProvider value={defaultSystem}>
        <App />  
      </ChakraProvider>
    </Provider>    
  </StrictMode>,
)
