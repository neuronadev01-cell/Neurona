import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="text-slate-200 relative overflow-hidden" style={{backgroundColor: '#004652'}}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#004652] to-[#003240] opacity-90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#004652'}}>
                <Image 
                  src="/logo3.png" 
                  alt="Neurona Logo" 
                  width={40} 
                  height={40} 
                />
              </div>
              <span className="text-2xl font-bold text-white">Neurona</span>
            </Link>
            <div className="space-y-3">
              <p className="text-lg text-slate-300 leading-relaxed max-w-md">
                The future of mental healthcare is here. AI-powered precision meets human empathy.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <span>🔒</span>
                  <span>HIPAA Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✅</span>
                  <span>Licensed Providers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Platform</h3>
            <nav className="space-y-2">
              <Link href="#how-it-works" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors">How It Works</Link>
              <Link href="#features" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors">Features</Link>
              <Link href="#why" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors">Why Neurona</Link>
              <Link href="#faq" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors">FAQ</Link>
            </nav>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Community</h3>
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Join our growing community of mental health advocates.</p>
              <div className="space-y-2">
                <a 
                  href="https://wa.me/YOUR_GROUP_LINK" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  <span>💬</span>
                  Join WhatsApp
                </a>
                <Link 
                  href="#join" 
                  className="block text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Get Early Access →
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Neurona. All rights reserved. • Revolutionizing mental healthcare with AI.
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
              <span className="text-emerald-500">Made with 💚</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
