import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Todo } from '@/lib/api'
import { Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'

interface TodoItemProps {
  todo: Todo
  onDeleteClick: (id: number, title: string) => void
}

/**
 * TodoItem component
 * Displays a single todo item in the table
 */
export function TodoItem({ todo, onDeleteClick }: TodoItemProps) {
  return (
    <>
      <td className='px-6 py-4 whitespace-nowrap'>
        {todo.completed ? (
          <div className='flex items-center'>
            <div className='h-8 w-8 rounded-full bg-success/10 flex items-center justify-center mr-2'>
              <CheckCircle className='h-5 w-5 text-success' />
            </div>
            <span className='text-success font-medium'>Completed</span>
          </div>
        ) : (
          <div className='flex items-center'>
            <div className='h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center mr-2'>
              <XCircle className='h-5 w-5 text-warning' />
            </div>
            <span className='text-warning font-medium'>Pending</span>
          </div>
        )}
      </td>
      <td className='px-6 py-4 max-w-[200px]'>
        <div
          className={`font-medium truncate ${
            todo.completed ? 'text-muted-foreground' : 'text-foreground'
          }`}
        >
          {todo.title}
        </div>
      </td>
      <td className='px-6 py-4 max-w-[300px]'>
        <div className='truncate text-muted-foreground'>
          {todo.description || 'No description'}
        </div>
      </td>
      <td className='px-6 py-4 text-right whitespace-nowrap'>
        <div className='flex justify-end gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='h-8 w-8 p-0 hover-lift'
          >
            <Link
              href={`/todos/${todo.id}`}
              className='flex items-center justify-center'
            >
              <Edit className='h-4 w-4' />
              <span className='sr-only'>Edit</span>
            </Link>
          </Button>
          <Button
            variant='destructive'
            size='sm'
            className='h-8 w-8 p-0 hover-lift'
            onClick={() => todo.id && onDeleteClick(todo.id, todo.title)}
          >
            <Trash2 className='h-4 w-4' />
            <span className='sr-only'>Delete</span>
          </Button>
        </div>
      </td>
    </>
  )
}
