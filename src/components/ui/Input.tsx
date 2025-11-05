import { InputHTMLAttributes, forwardRef, useState } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  helperText?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, helperText, icon, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className={`w-5 h-5 transition-colors duration-200 ${
                focused ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {icon}
              </div>
            </div>
          )}
          <input
            className={cn(
              "flex h-11 w-full rounded-lg border bg-white px-3 py-2 text-sm placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
              icon && "pl-10",
              error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300",
              focused && !error && "border-blue-500 shadow-sm",
              className || ''
            )}
            ref={ref}
            onFocus={(e) => {
              setFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }