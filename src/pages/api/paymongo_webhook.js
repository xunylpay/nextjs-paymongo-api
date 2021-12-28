// Webhook for paymongo payments


const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log("===Webhook triggered===")
    const data = req.body.data
    console.log(data)
    console.log("===webhook end===")
    if (data.attributes.type === "source.chargeable") {
      // Gcash and Grab Pay
      console.log("E-wallet Payment Chargeable")

      // Create a payment resource
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            process.env.PAYMONGO_SECRET
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          data: {
            attributes: {
              amount: data.attributes.data.attributes.amount,
              source: { id: `${data.attributes.data.id}`, type: `${data.attributes.data.type}` },
              description: data.attributes.data.attributes.description,
              currency: 'PHP',
              statement_descriptor: data.attributes.data.attributes.statement_descriptor
            }
          }
        })
      };

      fetch('https://api.paymongo.com/v1/payments', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    }
    if (data.attributes.type === "payment.paid") {
      // All Payment Types
      // Add next steps for you
      console.log("Payment Paid")
    }
    if (data.attributes.type === "payment.failed") {
      // Failed Payments - Cards Paymaya
      // Add next steps for you
      console.log("Payment Failed")
    }
    res.status(200).send("Webhook Received")
  }
  else {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method Not Allowed");
  }
};

export default handler;
