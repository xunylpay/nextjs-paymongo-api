import React, { useState } from "react";

import styles from "../../styles/Payment.module.css";

const GrabPay = ({ amount, description }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [payProcess, setPayProcess] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const publicKey = process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC;

  // Function to Create A Source
  const createSource = async () => {

  }

  // Function to Listen to the Source in the Front End
  const listenToPayment = async (sourceId) => {

  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const source = await createSource();
    window.open(
      source.data.attributes.redirect.checkout_url, "_blank");
    listenToPayment(source.data.id)
  };

  return (
    <section>
      <form action="#" onSubmit={onSubmit}>
        <h2>Billing Information</h2>
        <div id="form-card" className={styles.formField}>
          <label htmlFor="customer-name">Customer Name:</label>
          <input
            id="customer-name"
            placeholder="Juan Dela Cruz"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div id="form-card" className={styles.formField}>
          <label htmlFor="phone">Phone Number:</label>
          <input
            id="phone"
            placeholder="09xxxxxxxxx"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div id="form-card" className={styles.formField}>
          <label htmlFor="email">email:</label>
          <input
            id="email"
            placeholder="user@domain.com"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.payButton}>
          Pay
        </button>
        <p>{paymentStatus}</p>
        <p>{payProcess}</p>
      </form>
    </section>
  );
};

export default GrabPay;
