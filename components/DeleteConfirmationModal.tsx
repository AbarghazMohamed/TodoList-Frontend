import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  todoTitle: string
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  todoTitle,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm'
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='relative bg-card rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden gradient-border'
          >
            <div className='p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10'>
                  <AlertTriangle className='h-5 w-5 text-destructive' />
                </div>
                <h3 className='text-lg font-semibold'>Confirm Deletion</h3>
              </div>
              <p className='text-muted-foreground mb-6'>
                Are you sure you want to delete the todo:{' '}
                <span className='font-medium text-foreground'>{todoTitle}</span>
                ? This action cannot be undone.
              </p>
              <div className='flex justify-end gap-3'>
                <Button
                  variant='outline'
                  onClick={onClose}
                  className='hover-lift'
                >
                  Cancel
                </Button>
                <Button
                  variant='destructive'
                  onClick={onConfirm}
                  className='hover-lift bg-destructive hover:bg-destructive/90'
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
