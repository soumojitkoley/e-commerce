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

  const [categorySelector, setCategorySelector] = useState(0)

  function categoryChangeHandler(categoryId) {
    console.log(categoryId)
    setCategorySelector(categoryId)
  }

  const [currentProductId, setCurrentProductId] = useState(() => { 
    return localStorage.getItem('currentProductId') || 0;
  });

  function productShowHandler(productId) {
    setCurrentProductId(productId);
    localStorage.setItem('currentProductId', productId);
  }

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(items.length)
  },[cartCount,items])

  const value = {
    addItem,
    deleteItem,
    items,
    setItems,
    categorySelector,
    categoryChangeHandler,
    currentProductId,
    productShowHandler,
    cartCount,
    setCartCount
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
