import { useEffect, useState } from "react";
import { PersonajeCard } from "./PersonajeCard";

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

    return (
        <section className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed md:bg-auto flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${background[nivel]})` }}>
            <h2 className="text-4xl p-4">NIVEL: {nivel}</h2>
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    personajes.map((pj => (
                        <PersonajeCard
                            key={pj.id}
                            pj={pj}
                            onAcertar={() => handleAcertar(pj.id)}
                            yaDescubierto={personajesDescubiertos.includes(pj.id)} />
                    )))
                }
            </ul>
            <button
                onClick={handleMorePersonajes}
                disabled={!nextPage || loading || aciertos < 20}
                className="my-8 px-6 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
            >
                {loading ? 'Cargando...' : 'Siguiente nivel'}
            </button>
        </section>
    )
}