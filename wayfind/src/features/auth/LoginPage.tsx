import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [success, setSuccess] = React.useState('')

  const onSubmit = async (data: FormData) => {
    setSuccess('')
    const { email, password } = data
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setError('email', { message: error.message })
    } else {
      setSuccess('Logged in!')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign in to Wayfind</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" {...register('email')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.email && <p className="text-red-500 text-sm">{(errors.email as any)?.message || String(errors.email)}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" {...register('password')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.password && <p className="text-red-500 text-sm">{(errors.password as any)?.message || String(errors.password)}</p>}
        </div>
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign In
        </Button>
        {success && <p className="text-green-600 text-center mt-2">{success}</p>}
      </form>
    </div>
  )
} 