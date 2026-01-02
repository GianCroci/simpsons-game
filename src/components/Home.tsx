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
  className="min-h-screen bg-cover bg-center bg-no-repeat md:bg-fixed flex flex-col items-center justify-center"
  style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp4267790.jpg')" }}>
    <p className="font-bold mb-4">Sos capaz de adivinar todos los nombres de los personajes de Los Simpons?</p>
  <button
  onClick={scrollToGrid} 
  className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-2xl font-bold rounded-lg shadow-lg transition">
    Jugar
  </button>
</section>
    )
}