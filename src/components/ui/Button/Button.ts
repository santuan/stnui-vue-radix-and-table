import { tv } from 'tailwind-variants'

export const Button = tv({
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 gap-1 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    intent: {
      default: 'bg-primary ring-1 ring-gray-500/50 text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input border-dashed border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-200/30 hover:dark:bg-gray-950',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 rounded-md text-xs px-3',
      lg: 'h-11 rounded-md px-8',
    }
  },
  compoundVariants: [
    {
      size: ['sm', 'lg'],
      class: 'px-3 py-1'
    }
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})