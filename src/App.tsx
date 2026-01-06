
import './App.css'
import { Home } from './components/Home'
import { GridPersonajes } from './components/GridPersonajes'
import { Footer } from './components/Footer'

function App() {

  return (
    <>
      <main >
        <Home/>
        <div id='grid-personajes' className="min-h-screen">
          <GridPersonajes/>
        </div>
        <Footer/>
      </main>
    </>
  )
}

export default App
