function fakeEncrypt(number) {
  return btoa(number + "-" + Math.random().toString(36).substring(2, 5));
}

function fakeDecrypt(encryptedA, encryptedB) {
  const a = parseInt(atob(encryptedA).split("-")[0]);
  const b = parseInt(atob(encryptedB).split("-")[0]);
  return a + b;
}

function calculate() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const output = document.getElementById("output");

  if (num1 === "" || num2 === "") {
    output.innerText = "❌ Please enter both numbers.";
    return;
  }

  const enc1 = fakeEncrypt(num1);
  const enc2 = fakeEncrypt(num2);

  const result = fakeDecrypt(enc1, enc2);

  output.innerHTML = `
    🔐 Encrypted A: <code>${enc1}</code><br>
    🔐 Encrypted B: <code>${enc2}</code><br><br>
    ✅ Decrypted Sum: <strong>${result}</strong>
  `;
}
