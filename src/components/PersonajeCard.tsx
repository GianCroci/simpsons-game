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
        texto
    .toLowerCase()
    .normalize('NFD')                 // elimina acentos
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')      // elimina comas, puntos, etc
    .trim()
    

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
  key={pj.id}
  className="
    flex flex-col items-center text-center
    bg-yellow-200
    border-4 border-blue-600
    rounded-3xl
    py-8 px-4
    shadow-[5px_5px_0_0_#000]
    transition-transform
    hover:-translate-y-1
  "
>
  <div className="bg-amber-300 border-4 border-blue-500 rounded-2xl p-4 mb-4">
    <img
      className={`
        h-24 w-24 object-contain
        transition-all duration-300
        ${acerto ? 'opacity-100 scale-110' : 'opacity-30'}
      `}
      src={`https://cdn.thesimpsonsapi.com/500/character/${pj.id}.webp`}
      alt={`Foto de ${pj.name}`}
    />
  </div>

  <h2
    className={`
      text-2xl font-extrabold text-blue-900 mb-3
      min-h-16
      transition-opacity duration-300
      ${acerto ? 'opacity-100' : 'opacity-0'}
    `}
  >
    {pj.name}
  </h2>

  <input
    type="text"
    value={respuesta}
    disabled={acerto}
    onChange={(e) => setRespuesta(e.target.value)}
    placeholder="¿Quién es?"
    className={`
      w-full max-w-40
      text-center text-lg font-bold
      bg-yellow-300
      border-4 border-blue-600
      rounded-xl px-3 py-2
      shadow-[3px_3px_0_0_#000]
      focus:outline-none focus:ring-2 focus:ring-blue-500
      transition-all duration-300
      disabled:bg-green-200 disabled:border-green-600
      ${acerto ? 'opacity-0' : 'opacity-100'}
    `}
  />
</li>

    )
}