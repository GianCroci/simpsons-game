export function Footer(){
    return(
        <footer
      className="
        w-full
        bg-blue-800
        border-t-4 border-yellow-400
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-4 py-6
          flex flex-col sm:flex-row
          items-center justify-center
          gap-4
          text-center sm:text-left
        "
      >
        {/* Texto */}
        <p className="text-yellow-300 font-bold text-lg">
          Desarrollado por <span className="text-white">Gian Croci</span>
        </p>

        <span>|</span>

        {/* Links */}
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/gian-croci/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold hover:text-yellow-300 transition"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/GianCroci/simpsons-game"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold hover:text-yellow-300 transition"
          >
            GitHub
          </a>

          <a
            href="https://portfolio-gian-croci.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold hover:text-yellow-300 transition"
          >
            Portfolio
          </a>
        </div>
      </div>
    </footer>
    )
}