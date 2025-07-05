const choices = ['rock', 'paper', 'scissors'];

function encrypt(choice) {
  return btoa(choice + '-' + Math.random().toString(36).substring(2, 6));
}

function decrypt(encrypted) {
  return atob(encrypted).split('-')[0];
}

function getWinner(user, computer) {
  if (user === computer) return "It's a draw!";
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'scissors' && computer === 'paper') ||
    (user === 'paper' && computer === 'rock')
  ) {
    return "🎉 You win!";
  }
  return "😢 You lose!";
}

function play(userChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  const encryptedUser = encrypt(userChoice);
  const encryptedComputer = encrypt(computerChoice);

  const decryptedUser = decrypt(encryptedUser);
  const decryptedComputer = decrypt(encryptedComputer);

  const result = getWinner(decryptedUser, decryptedComputer);

  document.getElementById("result").innerHTML = `
    🔐 Your encrypted choice: <code>${encryptedUser}</code><br>
    🔐 Computer encrypted choice: <code>${encryptedComputer}</code><br><br>
    🔓 Decrypted: You chose <b>${decryptedUser}</b>, Computer chose <b>${decryptedComputer}</b><br><br>
    👉 <strong>${result}</strong>
  `;
}
