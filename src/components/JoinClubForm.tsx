"use client"

import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export default function JoinClubForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", suggestions: "" })
  const [referralCode, setReferralCode] = useState<string | null>(null)

  // Extract referral code from URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const refCode = urlParams.get('ref')
      if (refCode) {
        setReferralCode(refCode)
      }
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        ...(referralCode && { ref: referralCode })
      }

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Signup failed")
      }
      
      // Reset form and close modal
      setForm({ name: "", email: "", phone: "", suggestions: "" })
      setOpen(false)
      
      // Show success message with referral link
      const currentDomain = window.location.origin
      const referralLink = `${currentDomain}?ref=${data.referralCode}`
      
      alert(
        `🎉 Welcome to the club! Your unique referral link:\n\n${referralLink}\n\nShare it with friends to earn referral points!`
      )
      
    } catch (err) {
      console.error('Signup error:', err)
      alert(err instanceof Error ? err.message : "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto my-12 text-center">
      <Button onClick={() => setOpen(!open)} className="bg-emerald-600 hover:bg-emerald-700">
        Join the Club — Early Access
      </Button>

      {open && (
        <form onSubmit={submit} className="mt-6 bg-white rounded-xl shadow p-6 space-y-4">
          {referralCode && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-700">
              🎉 You were referred by: <strong>{referralCode}</strong>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>

          <Input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Textarea placeholder="Suggestions or feedback (optional)" value={form.suggestions} onChange={(e) => setForm({ ...form, suggestions: e.target.value })} />

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-emerald-600" disabled={loading}>{loading ? "Sending..." : "Send"}</Button>
          </div>
        </form>
      )}
    </div>
  )
}
