import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isGlowing?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isGlowing = false, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-rajdhani font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      primary: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 shadow-lg hover:shadow-yellow-400/25',
      secondary: 'bg-gray-900 text-yellow-400 border border-yellow-400/30 hover:border-yellow-400/50 hover:bg-gray-800',
      outline: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black',
      ghost: 'text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300'
    }
    
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-13 px-8 text-lg'
    }
    
    const glowEffect = isGlowing ? 'neon-glow animate-pulse-gold' : ''
    
    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          glowEffect,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }