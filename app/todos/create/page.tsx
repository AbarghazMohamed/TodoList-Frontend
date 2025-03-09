'use client'
import { TodoForm } from '@/components/TodoForm'

/**
 * CreateTodo page component
 * Displays the form for creating a new todo
 */
export default function CreateTodo() {
  return <TodoForm isEditMode={false} />
}
