'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Todo, todoApi } from '@/lib/api'
import { TodoForm } from '@/components/TodoForm'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner' // Updated to use sonner

/**
 * EditTodo page component
 * Fetches a todo by ID and displays the edit form
 */
export default function EditTodo() {
  const params = useParams()
  const todoId = Number(params.id)

  const [todo, setTodo] = useState<Todo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setIsLoading(true)
        const data = await todoApi.getTodoById(todoId)
        setTodo(data)
      } catch (err) {
        console.error('Error fetching todo:', err)
        setError('Failed to load todo. Please try again.')
        toast.error('Failed to load todo. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    if (todoId) {
      fetchTodo()
    }
  }, [todoId])

  if (isLoading) {
    return (
      <div className='container mx-auto py-10'>
        <div className='max-w-md mx-auto space-y-4'>
          <Skeleton className='h-8 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-40 w-full' />
        </div>
      </div>
    )
  }

  if (error || !todo) {
    return (
      <div className='container mx-auto py-10 text-center'>
        <h2 className='text-xl font-semibold text-red-600'>Error</h2>
        <p className='mt-2'>{error || 'Todo not found'}</p>
      </div>
    )
  }

  return <TodoForm initialData={todo} isEditMode={true} />
}
