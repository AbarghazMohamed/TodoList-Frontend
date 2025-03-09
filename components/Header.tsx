import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='h-8 w-8 rounded-full gradient-bg-1 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-5 w-5 text-white'
              >
                <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' />
                <path d='m9 12 2 2 4-4' />
              </svg>
            </div>
            <span className='font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80'>
              TaskMaster
            </span>
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <nav className='hidden md:flex gap-6'>
            <Link
              href='/todos'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Todos
            </Link>
            <Link
              href='/todos/create'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Create Todo
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
