import { CheckboxHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends CheckboxHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all duration-200",
              className || ''
            )}
            ref={ref}
            id={id}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={id} className="font-medium text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200">
            {label}
          </label>
          {description && (
            <p className="text-gray-500">{description}</p>
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }