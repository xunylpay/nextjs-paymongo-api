import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/Cart.module.css";
import Header from "../components/Header";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // Getting the Cart
  useEffect(() => {
    const cartItemsJSON = localStorage.getItem("cartItems");
    const cartItems = !!cartItemsJSON ? JSON.parse(cartItemsJSON) : undefined;
    setCart(cartItems);
  }, []);

  // Updating Total Price
  useEffect(() => {
    if (cart && total == 0) {
      cart.map((item) => {
        setTotal(total + item.quantity * item.product.price);
      });
    }
  }, [cart, total]);

  const ProceedPayment = (total) => {
    localStorage.setItem("totalPayment", JSON.stringify(total));
    localStorage.setItem("checkoutID", JSON.stringify(`${Date.now()}-Guide`));
    router.push("/payment");
  };

  return (
    <div className="container">
      <Head>
        <title>Online Store Example</title>
        <meta
          name="description"
          content="Next.js - Paymongo Integration Tutorial"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Header subtitle="Cart Page" />
        <section className={styles.cart}>
          <div className={styles.cartHeader}>
            <h2>Cart</h2>
            <button
              onClick={() => {
                router.back();
              }}
            >
              Back
            </button>
          </div>
          {cart ? (
            <ul className={styles.cartList}>
              <li className={styles.cartListLabel}>
                <p>Product</p>
                <div>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Total</p>
                </div>
              </li>
              {cart.map((item, index) => {
                return (
                  <li key={index}>
                    <p>{item.product.name}</p>
                    <div>
                      <p>Php {item.product.price}</p>
                      <p>{item.quantity}</p>
                      <p>Php {item.product.price * item.quantity}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Loading..</p>
          )}
          <hr />
          <div className={styles.cartFooter}>
            <button
              onClick={() => {
                ProceedPayment(total);
              }}
            >
              Proceed to Payment
            </button>
            <p>
              Total: <span>Php {total}</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
