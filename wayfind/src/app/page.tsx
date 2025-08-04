"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const router = useRouter()
  const { user, setUser, isAuthenticated, setLoading } = useAuthStore()

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUser(data.user)
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }
    getUser()
  }, [router, setUser, setLoading])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Wayfind</h1>
      <p className="mb-8 text-lg text-gray-700">Your digital assistant for international student life in Canada.</p>
      <div className="flex gap-4">
        <Link href="/auth/login" className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Sign In</Link>
        <Link href="/auth/register" className="px-6 py-2 rounded bg-gray-100 text-blue-700 font-semibold hover:bg-blue-200">Register</Link>
      </div>
    </main>
  )
}
