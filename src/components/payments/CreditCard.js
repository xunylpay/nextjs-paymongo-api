import React, { useState } from "react";

import styles from "../../styles/Payment.module.css";

const CreditCard = ({ amount, description }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [cardHolder, setCardHolder] = useState("");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [code, setCode] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");


  // Function to Listen to the Payment in the Front End
  const listenToPayment = async (fullClient) => {

  }



  // Function to Create a Payment Intent by calling the site's api
  const createPaymentIntent = async () => {

  };

  // Function to Create a Payment Method by calling the PayMongo API
  const createPaymentMethod = async () => {

  };

  // Function to Attach a Payment Method to the Intent by calling the PayMongo API
  const attachIntentMethod = async (intent, method) => {

  };

  const onSubmit = async (event) => {
    event.preventDefault();
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
            name="name"
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
            name="phone"
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
            name="email"
            placeholder="user@domain.com"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <h2>Payment Details</h2>
        <div id="form-card" className={styles.formField}>
          <label htmlFor="cc-name">Card Holder:</label>
          <input
            id="cc-name"
            name="cc-name"
            placeholder="Juan Dela Cruz"
            className={styles.input}
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            required
          />
        </div>
        <div id="form-card" className={styles.formField}>
          <label htmlFor="cc-number">Card number:</label>
          <input
            id="cc-number"
            name="cc-number"
            maxLength="19"
            placeholder="1111 2222 3333 4444"
            className={styles.input}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>

        <div id="form-date" className={styles.formField}>
          <label htmlFor="expiry-month">Expiry date:</label>
          <div className={styles.dateVal}>
            <select
              id="expiry-month"
              name="expiry-month"
              className={styles.select}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            >
              <option id="trans-label_month">Month</option>
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
              <option value="4">04</option>
              <option value="5">05</option>
              <option value="6">06</option>
              <option value="7">07</option>
              <option value="8">08</option>
              <option value="9">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select
              id="expiry-year"
              name="expiry-year"
              className={styles.select}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              <option id="trans-label_year" value="">
                Year
              </option>
              <option value="2021">21</option>
              <option value="2022">22</option>
              <option value="2023">23</option>
              <option value="2024">24</option>
              <option value="2025">25</option>
              <option value="2026">26</option>
              <option value="2027">27</option>
              <option value="2028">28</option>
              <option value="2029">29</option>
              <option value="2030">30</option>
              <option value="2031">31</option>
              <option value="2032">32</option>
              <option value="2033">33</option>
              <option value="2034">34</option>
              <option value="2035">35</option>
              <option value="2036">36</option>
              <option value="2037">37</option>
              <option value="2038">38</option>
              <option value="2039">39</option>
              <option value="2040">40</option>
              <option value="2041">41</option>
              <option value="2042">42</option>
              <option value="2043">43</option>
              <option value="2044">44</option>
              <option value="2045">45</option>
              <option value="2046">46</option>
              <option value="2047">47</option>
            </select>
          </div>
        </div>

        <div id="form-sec-code" className={styles.formField}>
          <label htmlFor="sec-code">Security code:</label>
          <input
            name="sec-code"
            type="password"
            maxLength="3"
            placeholder="123"
            className={styles.input}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.payButton}>
          Pay
        </button>
        <p>{paymentStatus}</p>
      </form>
    </section>
  );
};

export default CreditCard;
