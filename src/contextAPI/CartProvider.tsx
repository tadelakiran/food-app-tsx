import type { ReactNode } from "react";
import { useImmer } from "use-immer";
import type { CartItem } from "../interfaces/CartItem";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./cartActions";
import { CartContext } from "./CartContext";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useImmer<CartItem[]>([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: (product) => setCart((draft) => addToCart(draft, product)),
        removeFromCart: (id) => setCart((draft) => removeFromCart(draft, id)),
        increaseQuantity: (id) =>
          setCart((draft) => increaseQuantity(draft, id)),
        decreaseQuantity: (id) =>
          setCart((draft) => decreaseQuantity(draft, id)),
        clearCart: () => setCart((draft) => clearCart(draft)),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}