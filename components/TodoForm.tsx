'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Todo, todoApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { Header } from '@/components/Header'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface TodoFormProps {
  initialData?: Todo
  isEditMode: boolean
}

const defaultFormData: Todo = {
  title: '',
  description: '',
  completed: false,
}

/**
 * TodoForm component for creating and editing todos
 * Reusable form that handles both create and update operations
 */
export function TodoForm({
  initialData = defaultFormData,
  isEditMode,
}: TodoFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Todo>(initialData)

  useEffect(() => {
    // Update form data if initialData changes (useful when fetching data in edit mode)
    setFormData(initialData)
  }, [initialData])

  /**
   * Handles input field changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /**
   * Handles checkbox changes
   */
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      completed: checked,
    }))
  }

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    setIsSubmitting(true)

    try {
      if (isEditMode && formData.id) {
        // Update existing todo
        await todoApi.updateTodo(formData.id, formData)
        toast.success('Todo updated successfully')
      } else {
        // Create new todo
        await todoApi.createTodo(formData)
        toast.success('Todo created successfully')
      }

      router.push('/todos')
      router.refresh()
    } catch (error) {
      console.error(
        `Error ${isEditMode ? 'updating' : 'creating'} todo:`,
        error
      )
      toast.error(
        `Failed to ${isEditMode ? 'update' : 'create'} todo. Please try again.`
      )
      setIsSubmitting(false)
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
        >
          <Button
            variant='ghost'
            className='mb-6 group'
            onClick={() => router.push('/todos')}
          >
            <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
            Back to Todos
          </Button>

          <Card className='max-w-md mx-auto gradient-border hover-lift'>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl'>
                {isEditMode ? 'Edit Todo' : 'Create New Todo'}
              </CardTitle>
              <CardDescription>
                {isEditMode
                  ? 'Update your task details'
                  : 'Add a new task to your todo list'}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Title</Label>
                  <Input
                    id='title'
                    name='title'
                    placeholder='Enter todo title'
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className='focus-visible:ring-primary'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    name='description'
                    placeholder='Enter todo description'
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className='focus-visible:ring-primary resize-none'
                  />
                </div>

                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='completed'
                    checked={formData.completed}
                    onCheckedChange={handleCheckboxChange}
                    className='data-[state=checked]:bg-success data-[state=checked]:border-success'
                  />
                  <Label
                    htmlFor='completed'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Mark as completed
                  </Label>
                </div>
              </CardContent>

              <CardFooter className='flex justify-between'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => router.push('/todos')}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-primary hover:bg-primary/90'
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      {isEditMode ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save className='mr-2 h-4 w-4' />
                      {isEditMode ? 'Update Todo' : 'Create Todo'}
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </main>
    </>
  )
}
