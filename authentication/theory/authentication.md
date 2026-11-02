## What is Authentication

Authentication is the process of verifying that someone (or something) is really who they claim to be. It answers the question: "Are you really who you say you are?"

**Real-world example (food delivery and e-commerce):** Imagine thousands of people using a food delivery app (like Zomato or Swiggy) or an e-commerce app (like Amazon or Flipkart) at the same time. When an order is placed, the server needs to know exactly which person is ordering. Without authentication, it wouldn't know whose cart to charge or whose address to deliver the food or parcel to. By logging in, the user proves their identity to the server.

Authentication usually relies on one or more of these kinds of evidence:

- **Something you know:** a password, security PIN, or security question
- **Something you have:** a phone that receives a code, a hardware security key, or an authenticator app
- **Something you are:** a fingerprint, face scan, or other biometric
- **Somewhere you are:** location or network context, sometimes used as an extra signal

When you use two or more of these together, it's called multi-factor authentication (MFA) or two-factor authentication (2FA). This makes accounts much harder to break into, since a stolen password alone isn't enough.

Authentication is often confused with two related ideas:

- **Authorization** decides what an authenticated person is allowed to do, such as reading a file versus editing it.
- **Identification** is simply claiming an identity, like typing a username. Authentication is the step that proves the claim.

In practice, you encounter authentication when you log into an email account, enter a one-time code from your phone, or use "Sign in with Google" on another website. Behind the scenes, systems often use protocols like OAuth, OpenID Connect, or SAML, and computers talking to each other often use API keys, tokens, or certificates.
