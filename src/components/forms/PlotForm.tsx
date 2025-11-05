"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userInputSchema, type UserInput } from "@/lib/validation"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Checkbox } from "@/components/ui/Checkbox"
import { Button } from "@/components/ui/Button"
import { useState } from "react"

interface PlotFormProps {
  onSubmit: (data: UserInput) => void
  initialData?: Partial<UserInput>
}

const configurationOptions = [
  { value: "1BHK", label: "1BHK (1 Bedroom, Hall, Kitchen)" },
  { value: "2BHK", label: "2BHK (2 Bedroom, Hall, Kitchen)" },
  { value: "3BHK", label: "3BHK (3 Bedroom, Hall, Kitchen)" }
]

const facingOptions = [
  { value: "North", label: "North" },
  { value: "South", label: "South" },
  { value: "East", label: "East" },
  { value: "West", label: "West" }
]

export function PlotForm({ onSubmit, initialData }: PlotFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<UserInput>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      plotLength: initialData?.plotLength || 30,
      plotWidth: initialData?.plotWidth || 40,
      configuration: initialData?.configuration || '2BHK',
      facing: initialData?.facing || 'East',
      requirements: {
        balcony: initialData?.requirements?.balcony || false,
        separateDining: initialData?.requirements?.separateDining || false,
        poojaRoom: initialData?.requirements?.poojaRoom || false,
        utilityArea: initialData?.requirements?.utilityArea || false,
      },
      kitchenSize: initialData?.kitchenSize || 100
    }
  })

  const watchedValues = watch()
  const totalArea = (watchedValues.plotLength || 0) * (watchedValues.plotWidth || 0)

  const handleFormSubmit = async (data: UserInput) => {
    setIsSubmitting(true)
    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Store form data in URL parameters for results page
      const params = new URLSearchParams({
        plotLength: data.plotLength.toString(),
        plotWidth: data.plotWidth.toString(),
        configuration: data.configuration,
        facing: data.facing,
        ...(data.requirements?.balcony && { balcony: 'true' }),
        ...(data.requirements?.separateDining && { separateDining: 'true' }),
        ...(data.requirements?.poojaRoom && { poojaRoom: 'true' }),
        ...(data.requirements?.utilityArea && { utilityArea: 'true' }),
        ...(data.kitchenSize && { kitchenSize: data.kitchenSize.toString() })
      })

      // Navigate to results page
      window.location.href = `/results?${params.toString()}`
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
        <div className="flex items-center mb-2">
          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-2xl font-bold">Tell us about your plot</h2>
        </div>
        <p className="text-blue-100">Enter your requirements to generate a custom floor plan</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-8">
        {/* Plot Dimensions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Plot Dimensions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              id="plotLength"
              type="number"
              label="Plot Length (feet)"
              {...register("plotLength", { valueAsNumber: true })}
              error={errors.plotLength?.message}
              placeholder="30"
              helperText="Enter the length of your plot in feet"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />
            <Input
              id="plotWidth"
              type="number"
              label="Plot Width (feet)"
              {...register("plotWidth", { valueAsNumber: true })}
              error={errors.plotWidth?.message}
              placeholder="40"
              helperText="Enter the width of your plot in feet"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
          </div>

          {/* Area Display */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="text-sm font-medium text-blue-900">Total Plot Area</span>
              </div>
              <span className="text-2xl font-bold text-blue-900">
                {totalArea.toLocaleString()} sq ft
              </span>
            </div>
          </div>
        </div>

        {/* Room Configuration */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Room Configuration
          </h3>
          <Select
            id="configuration"
            label="Select Room Configuration"
            {...register("configuration")}
            error={errors.configuration?.message}
            options={configurationOptions}
            helperText="Choose the number of bedrooms you need"
          />
        </div>

        {/* Plot Facing */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
            Plot Orientation
          </h3>
          <Select
            id="facing"
            label="Plot Facing Direction"
            {...register("facing")}
            error={errors.facing?.message}
            options={facingOptions}
            helperText="Important for Vastu compliance and natural lighting"
          />
        </div>

        {/* Additional Requirements */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Additional Requirements
          </h3>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <Checkbox
              id="balcony"
              label="Include Balcony"
              description="Add a balcony for outdoor space"
              {...register("requirements.balcony")}
            />
            <Checkbox
              id="separateDining"
              label="Separate Dining Room"
              description="Dedicated space for dining"
              {...register("requirements.separateDining")}
            />
            <Checkbox
              id="poojaRoom"
              label="Pooja Room"
              description="Space for prayers and meditation"
              {...register("requirements.poojaRoom")}
            />
            <Checkbox
              id="utilityArea"
              label="Utility Area"
              description="Additional space for washing/storage"
              {...register("requirements.utilityArea")}
            />
          </div>
        </div>

        {/* Kitchen Size */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Kitchen Specifications
          </h3>
          <Input
            id="kitchenSize"
            type="number"
            label="Kitchen Size (sq ft) - Optional"
            {...register("kitchenSize", { valueAsNumber: true })}
            error={errors.kitchenSize?.message}
            placeholder="100"
            helperText="Standard Indian kitchen: 80-120 sq ft. Large kitchen: 120-200 sq ft"
            icon={
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            }
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 py-4 text-lg font-semibold"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Floor Plan...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Floor Plan
              </div>
            )}
          </Button>

          <p className="mt-3 text-center text-sm text-gray-500">
            It only takes 60 seconds to generate your custom floor plan
          </p>
        </div>
      </form>
    </div>
  )
}