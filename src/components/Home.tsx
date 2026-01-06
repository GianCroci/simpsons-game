export function Home(){

    function scrollToGrid(){
        const element = document.getElementById('grid-personajes');
    if (element) {
      const yOffset = -10; // Ajusta este valor según necesites
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    }

    return (
        <section
  className="min-h-screen bg-cover bg-center bg-no-repeat md:bg-fixed flex flex-col items-center justify-center text-center px-4"
  style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp4267790.jpg')" }}
>
  <div className="bg-yellow-300 border-4 border-blue-600 rounded-3xl p-8 shadow-[6px_6px_0_0_#000] max-w-2xl">
    <p className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 drop-shadow">
      ¿Sos capaz de adivinar todos los nombres de los personajes de  
      <span className="text-orange-600"> Los Simpsons</span>?
    </p>

    <button
      onClick={scrollToGrid}
      className="px-10 py-4 bg-orange-500 hover:bg-orange-600 
                 text-3xl font-extrabold text-yellow-100
                 border-4 border-blue-700 rounded-full
                 shadow-[4px_4px_0_0_#000]
                 cursor-pointer
                 active:translate-x-1 active:translate-y-1
                 transition-all"
    >
      ¡JUGAR!
    </button>
  </div>
</section>

    )
}