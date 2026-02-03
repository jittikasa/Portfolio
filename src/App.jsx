import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CollectionPage from './pages/CollectionPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<CollectionPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
