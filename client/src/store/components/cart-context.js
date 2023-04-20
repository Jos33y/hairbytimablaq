import { createContext, useContext, useState, useEffect, useRef } from 'react';

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
    const isMounted = useRef()
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (isMounted) {
            let localCart = localStorage.getItem("cart");
            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists 
            if (localCart) setCart(localCart)
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])


    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);


