import './App.css'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import Hero from './components/Hero'
import JourneyCards from './components/JourneyCards'
import Navbar from './components/Navbar'
import Stories from './components/Stories'

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <AboutUs></AboutUs>
      <JourneyCards></JourneyCards>
      <Stories></Stories>
    </div>
  )
}

export default App
