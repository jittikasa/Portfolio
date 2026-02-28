import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Play from './pages/Play'
import GrainOverlay from './components/GrainOverlay'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/play" element={<Play />} />
          </Routes>
        </main>
        
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  )
}

export default App
