import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  university: z.string().min(2),
  program: z.string().min(2),
  year: z.string().min(1),
  language: z.string().min(2),
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const [success, setSuccess] = React.useState('')

  const onSubmit = async (data: FormData) => {
    setSuccess('')
    const { email, password, name, university, program, year, language } = data
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          university,
          program,
          year,
          language_preferences: [language],
        },
      },
    })
    if (error) {
      setError('email', { message: error.message })
    } else {
      setSuccess('Check your email to verify your account!')
      reset()
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create your Wayfind account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">University Email</label>
          <input type="email" {...register('email')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.email && <p className="text-red-500 text-sm">{(errors.email as any)?.message || String(errors.email)}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" {...register('password')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.password && <p className="text-red-500 text-sm">{(errors.password as any)?.message || String(errors.password)}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input type="text" {...register('name')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.name && <p className="text-red-500 text-sm">{(errors.name as any)?.message || String(errors.name)}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">University</label>
          <input type="text" {...register('university')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.university && <p className="text-red-500 text-sm">{(errors.university as any)?.message || String(errors.university)}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Program</label>
          <input type="text" {...register('program')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.program && <p className="text-red-500 text-sm">{(errors.program as any)?.message || String(errors.program)}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Year of Study</label>
          <input type="text" {...register('year')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.year && <p className="text-red-500 text-sm">{(errors.year as any)?.message || String(errors.year)}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Preferred Language</label>
          <input type="text" {...register('language')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.language && <p className="text-red-500 text-sm">{(errors.language as any)?.message || String(errors.language)}</p>}
        </div>
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign Up
        </Button>
        {success && <p className="text-green-600 text-center mt-2">{success}</p>}
      </form>
    </div>
  )
} 