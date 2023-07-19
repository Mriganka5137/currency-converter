import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(result);
  function handleFromChange(e) {
    setFrom(e.target.value);
    // console.log(from);
  }
  function handleToChange(e) {
    setTo(e.target.value);
    // console.log(to);
  }

  function handleResult(val) {
    setResult(val);
  }
  useEffect(
    function () {
      const controller = new AbortController();
      async function getResults() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        // console.log(data);
        handleResult(data.rates[to]);
        setIsLoading(false);
      }

      if (to === from) {
        setResult(amount);
        return;
      }
      getResults();
      return function () {
        controller.abort();
      };
    },
    [amount, from, to]
  );

  return (
    <div>
      <input
        type="Number"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        // disabled={isLoading}
      />
      <select value={from} onChange={handleFromChange} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={handleToChange} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{result === 0 ? "OUTPUT" : `${result} ${to}`}</p>
    </div>
  );
}
