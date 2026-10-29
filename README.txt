YUMMIES UPDATED WEBSITE

Files included:
- index.html: existing menu page with profile link and checkout connected
- style1.css: existing green/beige menu styling
- script1.js: cart/search/category behavior plus localStorage cart and checkout redirect
- profile.html: profile page; Back to Home points to index.html
- payment.html, payment.css, payment.js: payment page with UPI and QR options
- qr-code-placeholder.svg: placeholder visual until you upload the café's real QR image

HOW TO RUN
1. Extract all files into the SAME folder. Do not move the HTML files into separate folders.
2. Open index.html in a browser. Add an item, then click Checkout.
3. Profile icon opens profile.html; Back to Home opens index.html with style1.css present.

WHERE TO PUT THE QR IMAGE
1. Save the café's actual UPI QR image as qr-code.png (or another image name).
2. Copy it into this same folder beside payment.html.
3. In payment.html, find: src="qr-code-placeholder.svg" and replace it with src="qr-code.png".
4. The upload button on the payment page can preview an image for the current browser session. For a permanent project QR, use the steps above.

PAYMENT NOTE
This is a front-end demo only. It does not verify UPI transactions. Update CAFE_UPI_ID in payment.js to the real UPI ID and use a payment gateway/verification backend for real orders. Never mark an order paid based only on the demo confirmation button.
