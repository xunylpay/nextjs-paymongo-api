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
    const paymentIntentId = fullClient.split('_client')[0];
    let i = 5;
    for (let i = 5; i > 0; i--) {
      setPaymentStatus(`Listening to Payment in ${i}`)
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (i == 1) {
        const paymentIntentData = await fetch(
          'https://api.paymongo.com/v1/payment_intents/' + paymentIntentId + '?client_key=' + fullClient,
          {
            headers: {
              // Base64 encoded public PayMongo API key.
              Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC).toString("base64")}`
            }
          }
        ).then((response) => {
          return response.json()
        }).then((response) => {
          console.log(response.data)
          return response.data
        })

        if (paymentIntentData.attributes.last_payment_error) {
          setPaymentStatus(JSON.stringify(paymentIntentData.attributes.last_payment_error))
        }
        else if (paymentIntentData.attributes.status === "succeeded") {
          setPaymentStatus("Payment Success")
        }
        else {
          i = 5;
        }
      }
    }
  }


  // Function to Create a Payment Intent by calling the site's api
  const createPaymentIntent = async () => {
    setPaymentStatus("Creating Payment Intent");
    const paymentIntent = await fetch("/api/createPaymentIntent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: amount * 100,
            payment_method_allowed: ["card"],
            payment_method_options: {
              card: { request_three_d_secure: "any" },
            },
            currency: "PHP",
            description: description,
            statement_descriptor: "descriptor business name",
          },
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.body.data;
      });

    return paymentIntent;
  };


  // Function to Create a Payment Method by calling the PayMongo API
  const createPaymentMethod = async () => {
    setPaymentStatus("Creating Payment Method");
    const paymentMethod = fetch("https://api.paymongo.com/v1/payment_methods", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC).toString("base64")}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            details: {
              card_number: `${number}`, //"4343434343434345",
              exp_month: parseInt(`${month}`), //2
              exp_year: parseInt(`${year}`), //22
              cvc: `${code}`, //"123",
            },
            billing: {
              name: `${name}`,
              email: `${email}`,
              phone: `${phone}`,
            },
            type: "card",
          },
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        setPaymentStatus(err);
        return err;
      });

    return paymentMethod;
  };


  // Function to Attach a Payment Method to the Intent by calling the PayMongo API
  const attachIntentMethod = async (intent, method) => {
    setPaymentStatus("Attaching Intent to Method");
    fetch(`https://api.paymongo.com/v1/payment_intents/${intent.id}/attach`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC).toString("base64")}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            payment_method: `${method.id}`,
            client_key: `${intent.attributes.client_key}`,
          },
        },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const paymentIntent = response.data;
        console.log(paymentIntent)
        const paymentIntentStatus = paymentIntent.attributes.status;
        if (paymentIntentStatus === 'awaiting_next_action') {
          // Render your modal for 3D Secure Authentication since next_action has a value. You can access the next action via paymentIntent.attributes.next_action.
          setPaymentStatus(paymentIntentStatus);
          window.open(
            paymentIntent.attributes.next_action.redirect.url, "_blank");
          listenToPayment(paymentIntent.attributes.client_key);
        } else {
          setPaymentStatus(paymentIntentStatus);
        }
      })
      .catch((err) => {
        console.log(err);
        setPaymentStatus(JSON.stringify(err));
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const paymentIntent = await createPaymentIntent();
    const paymentMethod = await createPaymentMethod();
    await attachIntentMethod(paymentIntent, paymentMethod);
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
