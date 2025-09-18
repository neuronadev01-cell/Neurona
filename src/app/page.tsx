"use client"
/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useRef, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Brain,
  Heart,
  Users,
  Shield,
  ArrowRight,
  Sparkles,
  MessageCircle,
  FileText,
  Calendar,
  ClipboardList,
  Bot,
  MessageSquare, // For WhatsApp
  Loader2, // For loading spinner
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, type Variants, useAnimation, useInView } from "framer-motion"

// --- Animation Variants ---
const fadeInUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }
const fadeInLeft: Variants = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } }
const fadeInRight: Variants = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } }
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }

// --- Reusable Animated Component ---
function Animated({ children, variants = fadeInUp, className = "" }: { children: React.ReactNode; variants?: Variants; className?: string }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [inView, controls])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

// --- Main Page Component ---
export default function HomePage() {
  const [formState, setFormState] = useState({ submitting: false, success: false, error: false })
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", suggestions: "" })
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [userReferralCode, setUserReferralCode] = useState<string | null>(null)

  // Extract referral code from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const refCode = urlParams.get("ref")
      if (refCode) setReferralCode(refCode)
    }
  }, [])

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormState({ submitting: true, success: false, error: false })

    try {
      const payload = { ...formData, ...(referralCode && { ref: referralCode }) }

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Signup failed")

      setUserReferralCode(data.referralCode)
      setFormState({ submitting: false, success: true, error: false })
      setFormData({ name: "", email: "", phone: "", suggestions: "" })
    } catch (error) {
      console.error("Signup error:", error)
      setFormState({ submitting: false, success: false, error: true })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const howItWorksSteps = [
    {
      icon: MessageCircle,
      title: "1. Chat with Our AI",
      description: "Start with a friendly, private chat. Our AI listens to understand what's on your mind—no judgment, no pressure. It's like a warm-up for your mind.",
    },
    {
      icon: Users,
      title: "2. Get Your Match",
      description: "Based on your chat, the AI generates a confidential report and suggests the right path—connecting you with a licensed psychiatrist or therapist who fits your needs.",
    },
    {
      icon: Calendar,
      title: "3. Book Your Session",
      description: "Easily find and book an available slot with your matched clinician. The pre-session report means you can dive right into what matters most.",
    },
    {
      icon: ClipboardList,
      title: "4. Receive Your Plan",
      description: "After your session, your clinician crafts a structured, personalized therapy plan just for you, accessible anytime in your Wellness Centre.",
    },
    {
      icon: Bot,
      title: "5. Stay on Track",
      description: "Our 'Engaging AI' sends helpful nudges, tracks your progress, and helps you stick to your plan, making your wellness journey a collaborative effort.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      {/* HERO SECTION */}
      <section className="px-4 py-24 md:py-32" id="hero">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <div className="space-y-6">
              <motion.h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight" variants={fadeInLeft}>
                Mental Healthcare That's{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Actually Intelligent</span>
              </motion.h1>
              <motion.p className="text-lg leading-relaxed tracking-wide text-slate-600 dark:text-slate-300 max-w-prose" variants={fadeInLeft}>
                Neurona is your smart co-pilot for mental wellness. We blend expert clinicians with helpful AI to deliver care that's precise, private,
                and finally fits *your* brain.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg transform hover:scale-105 transition-transform">
                  <Link href="#join">Get Early Access</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="transform hover:scale-105 transition-transform">
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <Animated variants={fadeInRight}>
            <div className="relative rounded-3xl overflow-hidden shadow-xl p-4 bg-slate-100 dark:bg-slate-800">
              <Image src="/image1.jpg" alt="AI and Clinician working together" width={600} height={400} className="rounded-2xl object-cover" />
            </div>
          </Animated>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-4 py-20 bg-slate-50 dark:bg-slate-900" id="why">
        <div className="max-w-6xl mx-auto">
          <Animated>
            <h2 className="text-center text-4xl font-bold font-serif mb-4">The Neurona Difference</h2>
            <p className="text-center text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">We&apos;re not just another app. We&apos;re a complete care system designed for real, lasting results.</p>
          </Animated>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            {[ { icon: Sparkles, title: "AI-Powered Precision", desc: "Our smart AI intake gets to the heart of the matter, making your sessions ultra-efficient." }, { icon: Heart, title: "Human-Led Empathy", desc: "Technology is our tool, but licensed professionals are always at the center of your care." }, { icon: ClipboardList, title: "Structured Plans", desc: "No more guessing games. Get clear, actionable therapy plans designed by your clinician." }, { icon: Shield, title: "Privacy You Control", desc: "Your data is locked down tighter than a pickle jar. Encrypted, secure, and you hold the key." } ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}><Card className="h-full hover:shadow-xl hover:-translate-y-2 transition-transform rounded-2xl border-transparent shadow-md dark:bg-slate-800"><CardContent className="text-center p-8"><item.icon className="mx-auto w-10 h-10 text-emerald-600 mb-4" /><h3 className="font-semibold text-lg">{item.title}</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.desc}</p></CardContent></Card></motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-24" id="how-it-works">
        <div className="max-w-4xl mx-auto">
          <Animated className="text-center mb-16"><h2 className="text-4xl font-bold font-serif">Your Journey, Simplified</h2><p className="mt-4 text-lg text-slate-600 dark:text-slate-300">A clear path from feeling stuck to feeling supported.</p></Animated>
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
            <div className="space-y-12">{howItWorksSteps.map((step, i) => (<Animated key={i} variants={fadeInUp}><div className="flex items-start gap-6"><div className="flex-shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10"><step.icon size={24}/></div><div><h3 className="font-semibold text-xl mb-1">{step.title}</h3><p className="text-slate-600 dark:text-slate-400">{step.description}</p></div></div></Animated>))}</div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="px-4 py-20 bg-slate-50 dark:bg-slate-900" id="features">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Animated variants={fadeInLeft}><div className="relative rounded-3xl overflow-hidden shadow-2xl p-4 bg-slate-200 dark:bg-slate-800"><Image src="/image3.png" alt="Dashboard showing therapy tools" width={600} height={450} className="rounded-2xl object-cover" /></div></Animated>
          <Animated variants={fadeInRight}><div className="flex items-center gap-3"><div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center"><Brain className="text-indigo-600"/></div><h2 className="text-3xl font-bold font-serif">A Glimpse of What's Inside</h2></div><p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">Neurona is more than just sessions. We’re building a powerful toolkit to support your entire wellness journey.</p><div className="grid gap-4 mt-8"><div className="p-4 rounded-lg flex items-start gap-4"><FileText className="text-indigo-600 w-6 h-6 shrink-0 mt-1"/><div><h4 className="font-semibold">The Wellness Centre</h4><p className="text-sm text-slate-600 dark:text-slate-400">A library of clinician-approved tools (meditations, journaling, games) assigned by your therapist to help you between sessions.</p></div></div><div className="p-4 rounded-lg flex items-start gap-4"><Sparkles className="text-emerald-600 w-6 h-6 shrink-0 mt-1"/><div><h4 className="font-semibold">AI-Powered Reporting</h4><p className="text-sm text-slate-600 dark:text-slate-400">Our AI summarizes your progress and tool usage, giving your doctor valuable insights to fine-tune your therapy plan.</p></div></div><div className="p-4 rounded-lg flex items-start gap-4"><Heart className="text-rose-500 w-6 h-6 shrink-0 mt-1"/><div><h4 className="font-semibold">Personalized Dashboards</h4><p className="text-sm text-slate-600 dark:text-slate-400">Visualize your progress, review session summaries, and manage your therapy plan from one simple, private dashboard.</p></div></div></div></Animated>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20" id="faq">
        <div className="max-w-4xl mx-auto">
          <Animated><h2 className="text-4xl font-bold font-serif text-center mb-12">Curious Questions, Answered</h2></Animated>
          <div className="mt-8 space-y-4">{[ { q: "Is Neurona a replacement for a human therapist?", a: "Not at all. Neurona is a 'co-pilot'. It supercharges the work you do with a licensed clinician, making your time together more effective. We connect you to real professionals." }, { q: "What does the AI actually do with my chat?", a: "The AI's job is to listen and structure your concerns into a secure report that only your chosen clinician can see. It's a smart assistant that preps your doctor, saving you time and effort." }, { q: "Are the therapy tools just generic wellness exercises?", a: "Nope! Every tool in our Wellness Centre is designed or vetted by our clinical team. They are grounded in proven methodologies like CBT to ensure they provide real therapeutic value." }, { q: "Can I cancel if it's not for me?", a: "Absolutely. We're here to reduce stress, not add to it. You can cancel your plan anytime, no hidden fees or long-term contracts involved." } ].map((item, idx) => (<Animated key={idx} variants={fadeInUp}><details className="group rounded-xl border bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-lg transition-shadow"><summary className="cursor-pointer list-none font-medium flex items-center justify-between">{item.q}<ArrowRight className="shrink-0 transition-transform group-open:rotate-90 ml-4" /></summary><p className="mt-4 text-slate-600 dark:text-slate-400">{item.a}</p></details></Animated>))}</div>
        </div>
      </section>

      {/* WhatsApp Community Section */}
      <section className="px-4 py-20 bg-slate-50 dark:bg-slate-900" id="community">
        <Animated>
          <div className="max-w-4xl mx-auto">
            <Card className="rounded-2xl shadow-lg bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/30 dark:to-blue-900/30 overflow-hidden">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold font-serif mb-3">Join the Conversation</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">Connect with others on a similar journey in our private, supportive WhatsApp community. Share, listen, and grow together.</p>
                  <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg transform hover:scale-105 transition-transform">
                    {/* --- IMPORTANT: Add your WhatsApp group link here --- */}
                    <a href="https://wa.me/YOUR_GROUP_LINK_HERE" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-5 w-5" /> Join on WhatsApp
                    </a>
                  </Button>
                </div>
                <div className="hidden md:flex items-center justify-center p-8 bg-emerald-100 dark:bg-emerald-900/50 h-full">
                  <MessageSquare className="w-24 h-24 text-emerald-500 opacity-50"/>
                </div>
              </div>
            </Card>
          </div>
        </Animated>
      </section>
      
       {/* Signup Form Section */}
      <section id="join" className="px-4 py-24 bg-white dark:bg-slate-950">
        <Animated>
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Be the First to Experience Neurona</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Join our launch list for early access, exclusive updates, and a front-row seat to the future of mental healthcare.
            </p>
          </div>

          <div className="mt-12 max-w-xl mx-auto">
            <Card className="p-8 shadow-lg dark:bg-slate-900">
              {formState.success ? (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-emerald-600">🎉 Welcome to Neurona!</h3>
                  <p className="text-slate-600 dark:text-slate-300">You're officially on the list! Check your email for a welcome message.</p>
                  {userReferralCode && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-4">
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-2">Your Referral Link:</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-white dark:bg-slate-800 px-3 py-2 rounded border text-sm font-mono">
                          {typeof window !== "undefined" ? `${window.location.origin}?ref=${userReferralCode}` : ""}
                        </code>
                        <Button
                          size="sm"
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              navigator.clipboard.writeText(`${window.location.origin}?ref=${userReferralCode}`)
                              alert("Referral link copied!")
                            }
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-2">Share this link with friends to earn referral points!</p>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {referralCode && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3 text-center">
                      <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                        🎉 You were referred by: <strong>{referralCode}</strong>
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="suggestions">Any Suggestions? (Optional)</Label>
                    <Textarea id="suggestions" name="suggestions" value={formData.suggestions} onChange={handleTextareaChange} />
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg" disabled={formState.submitting}>
                    {formState.submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Get My Invite"
                    )}
                  </Button>

                  {formState.error && <p className="text-sm text-red-500 text-center">Oops! Something went wrong. Please try again.</p>}
                </form>
              )}
            </Card>
          </div>
        </Animated>
      </section>
    </div>
  )
}