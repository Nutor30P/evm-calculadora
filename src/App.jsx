import { useColorScheme } from './theme'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Footer from './components/Footer'
import VideoExplainer from './sections/VideoExplainer'
import Theory from './sections/Theory'
import Infografia from './sections/Infografia'
import KidsSimulator from './sections/KidsSimulator'
import Glossary from './sections/Glossary'
import Formulas from './sections/Formulas'
import Interpretation from './sections/Interpretation'
import CalculatorSection from './sections/CalculatorSection'
import CaseStudy from './sections/CaseStudy'

function App() {
  const { theme } = useColorScheme()

  return (
    <div
      style={{
        background: theme.page,
        color: theme.textPrimary,
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        minHeight: '100vh',
      }}
    >
      <Nav theme={theme} />
      <Hero theme={theme} />
      <VideoExplainer theme={theme} />
      <Theory theme={theme} />
      <Infografia theme={theme} />
      <KidsSimulator theme={theme} />
      <Glossary theme={theme} />
      <Formulas theme={theme} />
      <Interpretation theme={theme} />
      <CalculatorSection theme={theme} />
      <CaseStudy theme={theme} />
      <Footer theme={theme} />
    </div>
  )
}

export default App
