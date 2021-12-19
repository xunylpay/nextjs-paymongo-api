import React, { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import plainT from "../assets/plainT.png";

// Product Placeholder
// Normally this is an API Call to pull data from db
const product = {
  id: "1",
  name: "Plain White T's",
  description: "Your Everyday White T-Shirt",
  price: 250.0,
  stock: 15,
};

export default function Home() {
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();

  // Add to Cart Placeholder
  // Normally this is an API Call to push data to the db and updating the cart
  // We simulate this by saving to local storage
  const AddToCart = (product, quantity) => {
    if (quantity > 0) {
      const cartItems = [];
      cartItems.push({
        product,
        quantity,
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      router.push("/cart");
    }
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
        <Header subtitle="Product Page" />
        <section className={styles.grid}>
          <div className={styles.productCard}>
            <div className={styles.productImage}>
              <Image src={plainT} alt={`${product.name} image`} />
            </div>
            <div>
              <div className={styles.productInfo}>
                <h2>{product.name} </h2>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>Php {product.price}</p>
              </div>
              <div className={styles.productOrder}>
                <h3>Order Now</h3>
                <p>{product.stock} units available</p>
                <div className={styles.quantityContainer}>
                  <button
                    onClick={() => {
                      if (quantity > 0) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    disabled={quantity <= 0}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    onClick={() => {
                      if (quantity < product.stock) {
                        setQuantity(quantity + 1);
                      }
                    }}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    AddToCart(product, quantity);
                  }}
                  className={styles.addCart}
                  disabled={quantity == 0}
                >
                  Add to Cart &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
