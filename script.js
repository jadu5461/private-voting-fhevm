window.onload = async function () {
  const status = document.getElementById("status");

  if (!window.ethereum) {
    status.innerText = "🦊 Please install MetaMask!";
    return;
  }

  try {
    // Ask for connection right when page loads
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    status.innerText = "✅ Connected to MetaMask!";
    window.contract = new ethers.Contract(
      "0x0000000000000000000000000000000000000000", // placeholder
      [
        "function vote(bool) public",
        "function getYesCount() view returns (uint)",
        "function getNoCount() view returns (uint)"
      ],
      signer
    );
  } catch (error) {
    console.error(error);
    status.innerText = "❌ Connection failed";
  }
};

async function vote(choice) {
  const status = document.getElementById("status");

  if (!window.contract) {
    status.innerText = "❌ Contract not ready!";
    return;
  }

  try {
    status.innerText = "🕒 Sending vote...";
    const tx = await window.contract.vote(choice);
    await tx.wait();

    const yes = await window.contract.getYesCount();
    const no = await window.contract.getNoCount();

    status.innerText = `✅ Yes: ${yes}, ❌ No: ${no}`;
  } catch (err) {
    console.error(err);
    status.innerText = "⚠️ Error sending vote.";
  }
}
