import { createContext, useState } from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutDone from './components/LayoutDone/LayoutDone';

export const ItemContext = createContext();

function App() {
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState('');
  console.log(item)
  const filterBySearchInput = () => 
    item.filter((el) => (el.value.toLowerCase().includes(search.toLowerCase())))
  
  const generateId = (length=25) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        
        return result;
    }

    const filteredItem = filterBySearchInput()
    const id = generateId();
  
  return (
    <ItemContext.Provider value={{filteredItem, setItem, id, search, setSearch}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout
        
        />}/>
        <Route path="/done" element={<LayoutDone
        
        />}/>
      </Routes>
    </BrowserRouter>
    </ItemContext.Provider>
  )
}

export default App
