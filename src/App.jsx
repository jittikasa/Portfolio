import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import GrainOverlay from './components/GrainOverlay'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <GrainOverlay />
        <CustomCursor />
        <ScrollProgress />
        
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
