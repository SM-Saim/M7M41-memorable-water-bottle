import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../../Bottle/Bottle";
import "./Bottles.css";
import {
  addToLS,
  getStoredCart,
  removeFromLS,
} from "../../../Utilities/localStorage";
import Cart from "../../../Cart/Cart";

const Bottles = () => {
  const [bottle, setBottle] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setBottle(data));
  }, []);

  //   load card from local storage
  useEffect(() => {
    console.log("Call the use effect", bottle.length);
    if (bottle.length > 0) {
      const storedCart = getStoredCart();
      console.log(storedCart, bottle);

      const savedCart = [];
      for (const id of storedCart) {
        console.log(id);
        const bottless = bottle.find((bottle) => bottle.id === id);
        if (bottless) {
          savedCart.push(bottless);
        }
      }
      setCart(savedCart);
    }
  }, [bottle]);

  const handleBottle = (bottle) => {
    const cardToAdd = [...cart, bottle];
    setCart(cardToAdd);
    addToLS(bottle.id);
  };

  const handleRemoveFromCart = (id) => {
    // visual cart remove
    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);
    // handle from LS
    removeFromLS(id);
  };

  return (
    <div>
      <h2>Bottles Available: {bottle.length}</h2>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      <div className="bottlesContainer">
        {bottle.map((btl) => (
          <Bottle
            key={btl.id}
            bottle={btl}
            handleBottle={handleBottle}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
