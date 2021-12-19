// This function is called to create a Payment intent
// Step 1 of https://developers.paymongo.com/docs/accepting-cards

export default async function handler(req, res) {
  if (req.method === "POST") {

    // Creating our options for the Create a Payment Intent Call
    const optionsIntent = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          process.env.PAYMONGO_SECRET
        ).toString("base64")}`, // HTTP Basic Auth and Encoding
      },
      body: JSON.stringify(req.body),
      // The req.body should follow this specific format
      //   {
      //     "data": {
      //          "attributes": {
      //               "amount": 10000 (int32) note that 10000 = PHP 100.00,
      //               "payment_method_allowed": [
      //                    "card",
      //                    "paymaya"
      //               ](string array),
      //               "payment_method_options": {
      //                    "card": {
      //                         "request_three_d_secure": "any"
      //                    }
      //               },
      //               "currency": "PHP" (string),
      //               "description": "description" (string),
      //               "statement_descriptor": "descriptor business name" (string)
      //          }
      //     }
      //  }
    };

    // Calling the Create a Payment Intent API
    await fetch("https://api.paymongo.com/v1/payment_intents", optionsIntent)
      .then((response) => response.json())
      .then(async (response) => {
        if (response.errors) {
          console.log(JSON.stringify(response.errors));
        } else {
          res.status(200).json({ body: response });
        }
      });
  } else {
  }
}
