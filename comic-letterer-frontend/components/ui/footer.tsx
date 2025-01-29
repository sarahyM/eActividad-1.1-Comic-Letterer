export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <img
              src="/Capa 1.png"
              alt="Logo"
              style={{ height: "100px", width: "100px" }}
            />
            <span className="font-bangers text-4xl text-white gap-5">
              Universidad <br />
              Valle del Momboy
            </span>
            <span className="text-2xl text-white/70">
              Sarahy Ocanto <br />
              C.I: 30.140.127.
              <p>Prof. Yerson González</p>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
