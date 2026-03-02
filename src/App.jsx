import { createContext, useState } from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const ItemContext = createContext();

function App() {
  const [item, setItem] = useState([]);

  const generateId = (length=25) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        
        return result;
    }
    const id = generateId();
  
  return (
    <ItemContext.Provider value={{item, setItem, id}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}/>
        <Route path="/complite" element={<Layout/>}/>
      </Routes>
    </BrowserRouter>
    </ItemContext.Provider>
  )
}

export default App
