import React, { useState } from "react";

import styles from "../../styles/Payment.module.css";

const GCash = ({ amount, description }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [payProcess, setPayProcess] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const publicKey = process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC;

  // Function to Create A Source
  const createSource = async () => {
    setPaymentStatus("Creating Source")
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(publicKey).toString("base64")}`
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: amount * 100,
            redirect: { success: 'http://localhost:3000/payment', failed: 'http://localhost:3000/payment' },
            billing: { name: `${name}`, phone: `${phone}`, email: `${email}` },
            type: 'gcash',
            currency: 'PHP'
          }
        }
      })
    }
    return fetch('https://api.paymongo.com/v1/sources', options)
      .then(response => response.json())
      .then(response => {
        return response
      })
      .catch(err => console.error(err));
  }

  // Function to Listen to the Source in the Front End
  const listenToPayment = async (sourceId) => {
    let i = 5;
    for (let i = 5; i > 0; i--) {
      setPaymentStatus(`Listening to Payment in ${i}`)
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (i == 1) {
        const sourceData = await fetch(
          'https://api.paymongo.com/v1/sources/' + sourceId,
          {
            headers: {
              // Base64 encoded public PayMongo API key.
              Authorization: `Basic ${Buffer.from(publicKey).toString("base64")}`
            }
          }
        ).then((response) => {
          return response.json()
        }).then((response) => {
          console.log(response.data)
          return response.data
        })

        if (sourceData.attributes.status === "failed") {
          setPaymentStatus("Payment Failed")
        }
        else if (sourceData.attributes.status === "paid") {
          setPaymentStatus("Payment Success")
        }
        else {
          i = 5;
          setPayProcess(sourceData.attributes.status)
        }
      }
    }
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

export default GCash;
