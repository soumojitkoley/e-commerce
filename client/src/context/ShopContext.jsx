import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ShopContext = createContext();

export default function ShopContextProvider({ children }) {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  function addItem(id) {
    const existingItem = items.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
      setItems([...items]);
    } else {
      setItems([...items, { id, quantity: 1 }]);
    }
  }

  function deleteItem(id) {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  }

  const value = {
    addItem,
    deleteItem,
    items,
    setItems
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
