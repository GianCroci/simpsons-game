import { useEffect, useState } from "react";
import { PersonajeCard } from "./PersonajeCard";
import confetti from 'canvas-confetti'

export function GridPersonajes() {

    interface Personaje {
        id: number,
        name: string,
        age: number
    }

    interface GameState {
        nivel: number,
        aciertos: number,
        personajes: Personaje[],
        personajesDescubiertos: number[],
        nextPage: string | undefined
    }

    const background: { [key: number]: string } = {
        1: 'https://wallpapercave.com/wp/wp4267795.jpg',
        2: 'https://images.alphacoders.com/591/thumb-1920-591066.jpg',
        3: 'https://images6.alphacoders.com/133/thumb-1920-1333180.png'
    }



    const [personajes, setPersonajes] = useState<Personaje[]>([])
    const [nextPage, setNextPage] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [aciertos, setAciertos] = useState(0)
    const [nivel, setNivel] = useState(1)
    const [personajesDescubiertos, setPersonajesDescubiertos] = useState<number[]>([])
    const [guardando, setGuardando] = useState(false)
    const [juegoGanado, setJuegoGanado] = useState(false)


    async function obtenerPersonajes() {
        const response = await fetch('https://thesimpsonsapi.com/api/characters')
        const json = await response.json()
        setPersonajes(json.results)
        setNextPage(json.next)
    }

    async function obtenerSiguientesPersonajes() {
        if (!nextPage || loading) return

        setLoading(true)

        const response = await fetch(nextPage)
        const json = await response.json()

        setPersonajes(prev => [...prev, ...json.results])
        setNextPage(json.next)

        setLoading(false)
    }

    function handleMorePersonajes() {
        obtenerSiguientesPersonajes()
        setNivel(n => n + 1)
        setAciertos(0)
    }

    function handleAcertar(personajeId: number) {
        if (!personajesDescubiertos.includes(personajeId)) {
            setPersonajesDescubiertos(prev => [...prev, personajeId])
            setAciertos(p => p + 1)
        }}

        async function guardarPartida() {
            if (guardando) return

            setGuardando(true)
            try {
                const state: GameState = {
                    nivel,
                    aciertos,
                    personajes,
                    personajesDescubiertos,
                    nextPage
                }
                await window.localStorage.setItem('partida', JSON.stringify(state))
                console.log('Partida guardada')
            } catch (error) {
                console.error('Error al guardar partida: ', error)
            } finally {
                setGuardando(false)
            }
        }

        async function cargarPartida() {
            try {
                const result = await window.localStorage.getItem('partida')
                if(result){
                    const state: GameState = JSON.parse(result)
                    setNivel(state.nivel)
                    setAciertos(state.aciertos)
                    setPersonajes(state.personajes)
                    setPersonajesDescubiertos(state.personajesDescubiertos)
                    setNextPage(state.nextPage)
                    return true
                }
                return false
            } catch (error) {
                console.log('No hay partida guardada')
                return false
            }
        }

    
    useEffect(() => {
        async function iniciar(){
                            const partidaCargada = await cargarPartida()
                if(!partidaCargada){
                    await obtenerPersonajes()
                }            
        }
        iniciar()
    }, [])

    useEffect(()=>{
        if(personajes.length>0){
            guardarPartida()
        }
    },[nivel, aciertos, personajes, personajesDescubiertos])

    useEffect(() => {
  if (nivel === 3 && personajes.length > 0 && personajesDescubiertos.length === personajes.length) {
    setJuegoGanado(true)
    window.localStorage.removeItem('partida')

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 }
    })
  }
}, [nivel, aciertos, personajes])

useEffect(() => {
  if (juegoGanado) {
    const audio = new Audio('/television-simpsons.mp3')
    audio.volume = 0.4
    audio.play()
  }
}, [juegoGanado])


    if (juegoGanado) {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background[3]})` }}
    >
      <div className="
        bg-yellow-300
        border-4 border-blue-700
        rounded-3xl
        p-8
        shadow-[6px_6px_0_0_#000]
        max-w-xl
      ">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4">
          🎉 ¡GANASTE EL JUEGO! 🎉
        </h1>

        <p className="text-xl sm:text-2xl font-bold text-orange-700 mb-6">
          Descubriste todos los personajes de Springfield
        </p>

        <button
          onClick={() => window.location.reload()}
          className="
            px-8 py-3
            bg-green-500 hover:bg-green-600
            text-white text-xl font-bold
            border-4 border-green-800
            rounded-full
            cursor-pointer
            shadow-[4px_4px_0_0_#000]
            transition-all
          "
        >
          Volver a jugar
        </button>
      </div>
    </section>
  )
}

    return (
        <section
  className="
    min-h-screen bg-cover bg-center bg-no-repeat bg-fixed md:bg-auto flex flex-col items-center justify-center
  "
  style={{ backgroundImage: `url(${background[nivel]})` }}
>
  {/* Título */}
  <div
  className="
    mt-6 mb-4
    flex flex-col items-center gap-2
    bg-blue-700/80
    border-4 border-yellow-400
    rounded-3xl
    px-6 py-4
    shadow-[4px_4px_0_0_#000]
  "
>
  <h2
    className="
      text-2xl sm:text-3xl md:text-4xl
      font-extrabold
      text-yellow-300
    "
  >
    NIVEL {nivel}
  </h2>

  <p
    className="
      text-lg sm:text-xl
      font-bold
      text-white
      tracking-wide
    "
  >
    Aciertos: <span className="text-yellow-300">{personajesDescubiertos.length}</span> / {personajes.length}
  </p>
</div>





  {/* Grid */}
  <ul
    className="
      w-full max-w-7xl
      grid grid-cols-1
      px-4
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-3 sm:gap-4 md:gap-6
    "
  >
    {personajes.map((pj) => (
      <PersonajeCard
        key={pj.id}
        pj={pj}
        onAcertar={() => handleAcertar(pj.id)}
        yaDescubierto={personajesDescubiertos.includes(pj.id)}
      />
    ))}
  </ul>

  {/* Botón */}
  <button
    onClick={handleMorePersonajes}
    disabled={!nextPage || loading || aciertos < 20}
    hidden={nivel==3}
    className="
      my-8
      px-8 py-3
      text-lg sm:text-xl
      font-bold
      bg-green-500 hover:bg-green-600
      text-white
      border-4 border-green-800
      rounded-full
      cursor-pointer
      shadow-[4px_4px_0_0_#000]
      disabled:opacity-40 disabled:cursor-not-allowed
      transition-all
    "
  >
    {loading ? 'Cargando...' : 'Siguiente nivel'}
  </button>
</section>

    )
}