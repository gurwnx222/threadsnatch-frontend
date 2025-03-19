import './App.css'
import Aurora from './Components/Aurora';

import Homepage from './Pages/Homepage';


export default function App() {
  return (
    
    // Aurora background
    <div className="relative h-screen w-full">
          <Aurora className="fixed top-0 left-0 w-full h-full z-[-1]"
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
      />

      {/* Main content */}
      <div className='flex items-center justify-center h-full text-3xl'>
        <Homepage />
      </div>

    </div>
  )
}
