import { useCallback, useEffect, useState, useRef } from 'react';
import { RefreshCcw } from 'lucide-react';

function App() {
  const [password, setPassword] = useState('');
  const [len, setLen] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [spcl, setSpcl] = useState(false);
  const inputRef = useRef(null);

  const handleRange = (e) => {
    setLen(e.target.value);
  };

  const handleNumbers = () => {
    setNumbers(!numbers);
  };

  const handleSpcl = () => {
    setSpcl(!spcl);
  };

  const generatePassword = useCallback(() => {
    let newPass = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let nums = '1234567890';
    let spclChars = '!@#$%^&*€[]{}";\\/|';
    if (numbers) {
      chars += nums;
    }
    if (spcl) {
      chars += spclChars;
    }

    for (let i = 1; i <= len; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
  }, [len, numbers, spcl]);

  useEffect(() => {
    generatePassword();
  }, [len, numbers, spcl]);

  const handleCopy = () => {
    inputRef.current.focus();
    inputRef.current.setSelectionRange(0, inputRef.current.value.length);
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="bg-slate-950 grid justify-center h-screen text-slate-200">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-center mb-8 mt-24">Password Generator</h1>
        <div className="flex w-full">
          <input
            type="text"
            value={password}
            ref={inputRef}
            className="p-1 text-black outline-none w-full rounded-s-md"
          />
          <button
            className="bg-slate-600 p-1 px-2"
            onClick={() => generatePassword()}
          >
            <RefreshCcw />{' '}
          </button>
          <button
            onClick={handleCopy}
            className="bg-blue-600 p-1 px-2 rounded-e-md"
          >
            Copy
          </button>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1">
            <input
              type="range"
              min="4"
              max="100"
              value={len}
              onChange={handleRange}
              className="p-1 text-black outline-none"
            />
            <label>characters : {len}</label>
          </div>
          <div className="flex gap-1">
            <input
              type="checkbox"
              checked={numbers}
              onChange={handleNumbers}
              className="p-1 text-black outline-none"
            />
            <label>Numbers</label>
          </div>
          <div className="flex gap-1">
            <input
              type="checkbox"
              checked={spcl}
              onChange={handleSpcl}
              className="p-1 text-black outline-none"
            />
            <label>Special</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
