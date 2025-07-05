async function vote(choice) {
  const status = document.getElementById("status");

  if (!window.ethereum) {
    status.innerText = "🦊 Please install MetaMask!";
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contractAddress = "0x0000000000000000000000000000000000000000";

    const abi = [
      "function vote(bool) public",
      "function getYesCount() view returns (uint)",
      "function getNoCount() view returns (uint)"
    ];

    const contract = new ethers.Contract(contractAddress, abi, signer);

    status.innerText = "🕒 Sending vote...";
    const tx = await contract.vote(choice);
    await tx.wait();

    const yes = await contract.getYesCount();
    const no = await contract.getNoCount();

    status.innerText = `✅ Yes: ${yes}, ❌ No: ${no}`;
  } catch (err) {
    console.error(err);
    status.innerText = "⚠️ Error sending vote.";
  }
}
