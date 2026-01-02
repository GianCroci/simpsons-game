import { useEffect, useState } from "react"

interface Personaje {
    id: number,
    name: string,
    age: number
  }

interface Props {
    pj: Personaje,
    onAcertar: () => void,
    yaDescubierto: boolean
}

export function PersonajeCard({pj, onAcertar, yaDescubierto}: Props){

    

    const normalizar = (texto: string)=>
        texto.trim().toLowerCase().replace(/\s+/g, ' ')
    

    const validarRespuesta = (nombre: string, respuesta: string) => {
        const n = normalizar(nombre)
        const r = normalizar(respuesta)

        if(!r) return false

        const palabrasNombre = n.split(' ')

        if(r === n) return true

        return palabrasNombre.includes(r)
        
    }

    const [respuesta, setRespuesta] = useState('')

    const acerto = yaDescubierto || validarRespuesta(pj.name, respuesta)

    useEffect(() => {
    if(acerto){
        onAcertar()
    }
  }, [acerto])

    return(
        <li 
              className='flex flex-col items-center text-center bg-amber-100 border rounded-2xl py-8 px-4'
              key={pj.id}>
                <img 
                className={`h-24 w-24 object-contain transition-opacity border p-3 rounded-2xl bg-amber-200 duration-300 ${acerto ? 'opacity-100' : 'opacity-25'}`}
                src={`https://cdn.thesimpsonsapi.com/500/character/${pj.id}.webp`} 
                alt={`Foto de ${pj.name}`} />
                <h2 className={`${!acerto ? 'opacity-0' : 'opacity-100'}`}>{pj.name}</h2>
                <input
                    type="text"
                    value={respuesta}
                    disabled={acerto}
                    onChange={(e) => setRespuesta(e.target.value)}
                    className={`border rounded px-2 py-1 text-center bg-amber-300 disabled:bg-green-100 ${!acerto ? 'opacity-100' : 'opacity-0'}`}
                    placeholder="¿Quién es?"
                />
              </li>
    )
}