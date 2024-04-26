
import Decryption from "./pages/Decryption";
import Encryption from "./pages/Encryption";



export default function App() {


  return (
    <div>
      <div className="text-center bg-blue-500 text-white font-bold text-7xl">
        HILL CIPHER <div className="text-base">Bahri Mohamed El Amine</div>
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