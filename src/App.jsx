
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

const WHATSAPP = "+91 9022095489"; // ← Replace with your number (digits only, no + or spaces)
const WHATSAPP_MSG = encodeURIComponent("Hi MD Cool Care! 👋 I need help with my AC.");

function App() {
  return (
    <div>
      <Navbar />
      <div className='pt-14 md:pt-12'>
        <Outlet />
      </div>

      {/* ── Floating WhatsApp Button ── */}
      <a
        href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-green-300/50 hover:scale-110 active:scale-95 transition-all duration-200"
        style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
        aria-label="Chat on WhatsApp"
      >
        {/* Ping ring animation */}
        <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-40 animate-ping" />

        {/* WhatsApp Icon */}
        <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.853L.057 23.885a.5.5 0 00.606.628l6.188-1.63A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.893 9.893 0 01-5.031-1.374l-.361-.214-3.732.983.998-3.648-.235-.374A9.862 9.862 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z" />
        </svg>
      </a>
    </div>
  );
}

export default App;
