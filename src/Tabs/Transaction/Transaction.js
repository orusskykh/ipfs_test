import React, {useState} from 'react'
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";



const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No wallet found.");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

const Transaction = ({addItems}) => {

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };
  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered p-1 text-slate-700 border-2 border-gray-700 rounded-md border-gray-700 border-color-black block w-full focus:ring focus:outline-none"
                placeholder="recipient"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered p-1 text-slate-700 border-2 border-gray-700 rounded-md block w-full focus:ring focus:outline-none"
                placeholder="amount"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="block font-bold w-full p-4 border-2 border-gray-700 rounded-md text-sm text-slate-600 bg-yellow-400 hover:bg-yellow-500"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>

  )
}
export default Transaction