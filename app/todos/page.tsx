'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Todo, todoApi } from '@/lib/api'
import Link from 'next/link'
import { TodoItem } from '@/components/TodoItem'
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal'
import { toast } from 'sonner'
import { Header } from '@/components/Header'
import { PlusCircle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Todos page component
 * Displays a list of todos with options to create, edit, and delete
 */
export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState<{
    id: number
    title: string
  } | null>(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  /**
   * Fetches all todos from the API
   */
  const fetchTodos = async () => {
    try {
      setIsLoading(true)
      const data = await todoApi.getAllTodos()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
      toast.error('Failed to load todos. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Refreshes the todo list
   */
  const refreshTodos = async () => {
    try {
      setIsRefreshing(true)
      const data = await todoApi.getAllTodos()
      setTodos(data)
      toast.success('Todo list refreshed')
    } catch (error) {
      console.error('Error refreshing todos:', error)
      toast.error('Failed to refresh todos. Please try again.')
    } finally {
      setIsRefreshing(false)
    }
  }

  /**
   * Opens the delete confirmation modal
   */
  const openDeleteModal = (id: number, title: string) => {
    setTodoToDelete({ id, title })
    setIsDeleteModalOpen(true)
  }

  /**
   * Closes the delete confirmation modal
   */
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setTodoToDelete(null)
  }

  /**
   * Handles todo deletion
   */
  const handleDelete = async (id: number) => {
    try {
      await todoApi.deleteTodo(id)
      // Update the state by filtering out the deleted todo
      setTodos(todos.filter((todo) => todo.id !== id))
      toast.success('Todo deleted successfully')
      closeDeleteModal()
    } catch (error) {
      console.error('Error deleting todo:', error)
      toast.error('Failed to delete todo. Please try again.')
    }
  }

  return (
    <>
      <Header />
      <main className='container mx-auto py-10 px-4 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-8'
        >
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>Todo List</h1>
              <p className='text-muted-foreground mt-1'>
                Manage your tasks and stay organized
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={refreshTodos}
                disabled={isRefreshing}
                className='flex items-center gap-1'
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                />
                Refresh
              </Button>
              <Button className='flex items-center gap-1'>
                <PlusCircle className='h-4 w-4' />
                <Link href='/todos/create'>Add Todo</Link>
              </Button>
            </div>
          </div>

          <div className='bg-card rounded-lg border shadow-sm overflow-hidden'>
            {isLoading ? (
              <div className='py-20 text-center'>
                <div
                  className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                  role='status'
                >
                  <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                    Loading...
                  </span>
                </div>
                <p className='mt-4 text-muted-foreground'>
                  Loading your todos...
                </p>
              </div>
            ) : todos.length === 0 ? (
              <div className='py-20 text-center'>
                <div className='rounded-full bg-primary/10 p-3 inline-flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-6 w-6 text-primary'
                  >
                    <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' />
                    <path d='m9 12 2 2 4-4' />
                  </svg>
                </div>
                <h3 className='mt-4 text-lg font-semibold'>No todos found</h3>
                <p className='mt-2 text-muted-foreground max-w-sm mx-auto'>
                  You haven't created any todos yet. Get started by creating
                  your first todo.
                </p>
                <Button className='mt-4'>
                  <Link href='/todos/create'>Create your first todo</Link>
                </Button>
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead className='text-xs border-b'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left font-medium'
                      >
                        Status
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left font-medium'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left font-medium'
                      >
                        Description
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-right font-medium'
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y'>
                    {todos.map((todo, index) => (
                      <motion.tr
                        key={todo.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <TodoItem todo={todo} onDeleteClick={openDeleteModal} />
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={() => todoToDelete && handleDelete(todoToDelete.id)}
          todoTitle={todoToDelete?.title || ''}
        />
      </main>
    </>
  )
}
