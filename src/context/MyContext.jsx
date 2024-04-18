import { useEffect, createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MyContext = createContext();

export function useCont() {
    return useContext(MyContext);
  }
  
  export function ContProvider({ children }) {
    
    useEffect(() => {
        getData();
    }, []);
    
    const [prodData, setData] = useState([]);
    const [file, setFile] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartLength, setCartLength] = useState();
    const [cartProds, setCartProds] = useState([]);
    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    const states = {
        prodData,
        setData,
        file,
        setFile,
        cart, 
        setCart,
        cartLength,
        setCartLength,
        cartProds,
        setCartProds,
        orders,
        setOrders,
        token, 
        setToken,
        user,
        getData, 
        setUser,
        getCart,
        getOrders,
    };

    async function getData() {
      await axios.get('http://localhost:3000/api/users/products')
      .then((response) => {
          setData(response.data);
          localStorage.setItem("fullProducts", JSON.stringify(response.data));
          return response.data;
      })
      .catch((err) => {
          console.log("error: " + err);
      })
    }

    async function getCart() {
      
      const jwtToken = Cookies.get("jwtToken");
      setCart([]);

      if (jwtToken) {
        await axios.get("http://localhost:3000/api/users/cart",
        {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
        })
        .then((response) => {
          const newCart = response.data.cart;
          setCart(newCart);
          setCartLength(newCart ? newCart.length : 0);

          const productData = JSON.parse(localStorage.getItem("fullProducts"));
          if (productData) {
            let productList = [];
            let newCart = [...new Set(response.data.cart)];
            for (let i=0; i<newCart.length; i++) {
              const newpd = productData.filter((prod) => prod._id == newCart[i]);
              productList.push(newpd[0]);
            }
            //setting products list in cart
            setCartProds(productList);
            localStorage.setItem("cartProducts", JSON.stringify(productList));

            //setting total price
            const totalArr = productList.map((prod) => {
              const qt = response.data.cart.filter((value) => value === prod._id).length;
              return prod.price * qt;
            })
            const newTotal = totalArr.reduce((accumulator, currentValue) => {
              return accumulator + currentValue;
            }, 0);
            localStorage.setItem("cartTotal", JSON.stringify(newTotal));
          }
        })
        .catch((error) => {
          console.log("Error getting cart details: ", error);
        }); 
      } else {
        const loccart = JSON.parse(localStorage.getItem("cart"));
        setCart(loccart);
        setCartLength(loccart ? loccart.length :0);

        const productData = localStorage.getItem("fullProducts");
        if (productData) {
          let productList = [];
          let newCart = [...new Set(JSON.parse(localStorage.getItem("cart")))];
          for (let i=0; i<newCart.length; i++) {
            const newpd = JSON.parse(productData).filter((prod) => prod._id == newCart[i]);
            productList.push(newpd[0]);
          }
          setCartProds(productList);
          localStorage.setItem("cartProducts", JSON.stringify(productList));

          //setting total price
          const totalArr = productList.map((prod) => {
            const qt = JSON.parse(localStorage.getItem("cart")).filter((value) => value === prod._id).length;
            return prod.price * qt;
          })
          const newTotal = totalArr.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);
          localStorage.setItem("cartTotal", JSON.stringify(newTotal));
        }
      }
    }

    async function getOrders() {
      const jwtToken = Cookies.get("jwtToken");
      await axios.get("http://localhost:3000/api/users/orders",
      {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
      })
      .then((response) => {
        setOrders(response.data.orders);
        localStorage.setItem("orders", JSON.stringify(response.data.orders));
      })
      .catch((error) => {
        console.log("Error getting cart details: ", error);
      });
    }
  
    return (
      <MyContext.Provider value={ states }>
        {children}
      </MyContext.Provider>
    );
  }
