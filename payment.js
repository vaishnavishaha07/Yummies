const cart = JSON.parse(localStorage.getItem("yummiesCart") || "[]");
const upiIdInput = document.getElementById("upiId");
const upiPanel = document.getElementById("upiPanel");
const qrPanel = document.getElementById("qrPanel");
const qrUpload = document.getElementById("qrUpload");
const qrPreview = document.getElementById("qrPreview");
const qrMessage = document.getElementById("qrMessage");
const status = document.getElementById("paymentStatus");

// Replace with the café's real receiving UPI ID before using this demo.
const CAFE_UPI_ID = "yummies@okaxis";
upiIdInput.value = CAFE_UPI_ID;

function renderOrder() {
  const list = document.getElementById("orderItems");
  list.innerHTML = "";
  let sum = 0;
  cart.forEach(item => {
    const line = document.createElement("div");
    line.className = "order-line";
    const label = document.createElement("span");
    label.textContent = `${item.name} × ${item.quantity}`;
    const amount = document.createElement("strong");
    amount.textContent = `₹${(Number(item.price) * Number(item.quantity)).toFixed(2)}`;
    line.append(label, amount);
    list.appendChild(line);
    sum += Number(item.price) * Number(item.quantity);
  });
  document.getElementById("subtotalAmount").textContent = sum.toFixed(2);
  document.getElementById("totalAmount").textContent = sum.toFixed(2);
  if (!cart.length) {
    const message = document.createElement("p");
    message.className = "empty-message";
    message.textContent = "Your cart is empty. Return to the menu and add items before checkout.";
    list.appendChild(message);
    document.getElementById("confirmPayment").disabled = true;
    document.getElementById("confirmPayment").style.opacity = ".55";
  }
}

function switchMethod() {
  const method = document.querySelector('input[name="paymentMethod"]:checked').value;
  upiPanel.hidden = method !== "upi";
  qrPanel.hidden = method !== "qr";
  status.textContent = "";
}
document.querySelectorAll('input[name="paymentMethod"]').forEach(input => input.addEventListener("change", switchMethod));

document.getElementById("copyUpi").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(upiIdInput.value.trim());
    status.textContent = "UPI ID copied. Open your UPI app to complete payment.";
  } catch {
    upiIdInput.select();
    status.textContent = "Select and copy the UPI ID manually, then open your UPI app.";
  }
});

qrUpload.addEventListener("change", () => {
  const file = qrUpload.files && qrUpload.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    status.textContent = "Please select an image file for the QR code.";
    qrUpload.value = "";
    return;
  }
  qrPreview.src = URL.createObjectURL(file);
  qrMessage.textContent = `QR image selected: ${file.name}`;
  status.textContent = "QR preview loaded. For future sessions, copy the image into this project folder and update payment.html to use its filename.";
});

document.getElementById("confirmPayment").addEventListener("click", () => {
  if (!cart.length) return;
  const method = document.querySelector('input[name="paymentMethod"]:checked').value;
  if (method === "upi" && (!upiIdInput.value.trim() || upiIdInput.value.trim() === "your-upi-id@bank")) {
    status.textContent = "Set the café's real UPI ID in payment.js before using this payment option.";
    return;
  }
  status.textContent = "Demo only: this page cannot verify payment. Confirm the transaction in your UPI app before treating the order as paid.";
});

renderOrder();
switchMethod();
