import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import Hero from './components/Hero'
import JourneyCards from './components/JourneyCards'
import Navbar from './components/Navbar'
import Stories from './components/Stories'
import Questions from './components/Questions'
import JourneyPage from './components/JourneyPage'

// Home page component
const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <JourneyCards />
      <Stories />
      <Questions />
    </>
  )
}

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journeys" element={<JourneyPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/stories" element={<Stories />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App