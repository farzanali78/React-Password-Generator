import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8); // for pass length
  const [numAllowed, setNumAllowed] = useState(false); // for numbers
  const [char, setChar] = useState(false); // for characters
  const [pass, setPass] = useState(""); // for passInput
  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (char) {
      str += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPass(pass);
  }, [length, numAllowed, char, setPass]);
  
const passwordRef= useRef(null);

  useEffect(() => {
    passGenerator();
  }, [length, char, numAllowed]);
const copyPass= useCallback(()=>{
  passwordRef.current?.select()
window.navigator.clipboard.writeText(pass)
},[pass])
  return (
    <>
      <h1 className="text-center text-xl font-bold text-white">
        Password Generator
      </h1>
      <div className="flex justify-center">
        <div className="text-center rounded-2xl  bg-gray-700 text-white w-[40vw] h-[20vh]">
          <div className=" w-full  mt-1 rounded h-[5vh]">
            <div className="flex my-5 justify-center ">
              <input
                className="w-70 outline-none font-medium bg-white rounded-l-xl text-black text-[15px] text-center  "
                type="text"
                placeholder="Password"
                value={pass}
                readOnly
                ref={passwordRef}
              />
              <button className=" h-[5vh] px-2 cursor-pointer text-[15px] font-semibold bg-blue-400" onClick={copyPass}>
                copy
              </button>
            </div>
          </div>
          <div className="flex gap-1.5 justify-center mt-1 text-orange-400">
            <input
              type="range"
              value={length}
              min={6}
              max={16}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length: {length}</label>
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
              defaultChecked={numAllowed}
            />
            <label htmlFor="char">Numbers</label>
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="num">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
