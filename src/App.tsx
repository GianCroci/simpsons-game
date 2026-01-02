
import './App.css'
import { Home } from './components/Home'
import { GridPersonajes } from './components/GridPersonajes'

function App() {

  return (
    <>
      <main >
        <Home/>
        <div id='grid-personajes' className="min-h-screen">
          <GridPersonajes/>
        </div>
        
      </main>
    </>
  )
}

export default App
