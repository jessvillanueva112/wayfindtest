"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
// If your AI assistant is a layout-level component, import it here:
import AssistantWidget from '@/components/AssistantWidget'

export default function DashboardPage() {
  const router = useRouter()
  const { user, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        // Cast the user to the expected type to handle nullable fields
        setUser(data.user as unknown as User)
      } else {
        router.push('/auth/login')
      }
      setLoading(false)
    }
    if (!user) getUser()
  }, [router, setUser, setLoading, user])

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold mb-2 text-blue-700">Hello, {user.user_metadata?.name || user.email} 👋</h1>
      <p className="text-lg text-gray-600 mb-8">Welcome to your Wayfind dashboard.</p>
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Wayfind AI Assistant</h2>
          {/* Place your AI assistant widget here */}
          <AssistantWidget />
        </div>
      </div>
    </div>
  )
}