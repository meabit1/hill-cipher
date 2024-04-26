
import Decryption from "./pages/Decryption";
import Encryption from "./pages/Encryption";



export default function App() {


  return (
    <div>
      <div className="text-center bg-blue-500 text-white font-bold p-2 text-7xl">
        HILL CIPHER <div className="text-base">Bahri Mohamed El Amine <a className="bg-green-500 rounded-md p-1" target="_blank" href="https://github.com/meabit1/hill-cipher">Source Code</a></div>
      </div>
      <div className="flex flex-row justify-center items-center h-screen">
        <div>
          <Encryption />
        </div>
        <div>
          <Decryption />
        </div>

      </div>
    </div>

  )
}