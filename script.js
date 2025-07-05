async function vote(choice) {
  const status = document.getElementById("status");
  if (!window.ethereum) return status.innerText = "Install MetaMask";
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  
  const contract = new ethers.Contract(
    "YOUR_CONTRACT_ADDRESS", 
    [
      "function vote(bool)",
      "function getYesCount() view returns (uint256)",
      "function getNoCount() view returns (uint256)"
    ],
    signer
  );

  const tx = await contract.vote(choice);
  status.innerText = "Transaction sent...";
  await tx.wait();
  const yes = await contract.getYesCount();
  const no = await contract.getNoCount();
  status.innerText = `Yes: ${yes}, No: ${no}`;
}
