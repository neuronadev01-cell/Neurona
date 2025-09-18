export default function Footer() {
  return (
    <footer className="mt-10 bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <div className="text-lg font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Neurona</div>
          <p className="text-sm text-slate-400">Personalized, clinically backed mental healthcare.</p>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-300">Stay in touch</div>
          <p className="text-sm text-slate-400">Join our WhatsApp community for updates.</p>
          <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noreferrer" className="inline-flex text-sm px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white w-max">Join WhatsApp</a>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-slate-500 flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} Neurona. All rights reserved.</span>
          <span>Made with care.</span>
        </div>
      </div>
    </footer>
  )
}
