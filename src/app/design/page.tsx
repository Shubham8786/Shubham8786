"use client"

import { useState } from "react"
import { PlotForm } from "@/components/forms/PlotForm"
import { type UserInput } from "@/lib/validation"

export default function DesignPage() {
  const [formData, setFormData] = useState<UserInput | null>(null)

  const handleFormSubmit = (data: UserInput) => {
    setFormData(data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">AI Design Assistant Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700 mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Step 1 of 2: Enter Requirements
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Design Your Dream Home
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your plot and requirements, and our AI will create the perfect floor plan optimized for Indian homes.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-1">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Your Requirements</h2>
                    <p className="text-sm text-gray-600">Fill in all the details for best results</p>
                  </div>
                </div>
                <PlotForm onSubmit={handleFormSubmit} />
              </div>
            </div>
          </div>

          {/* Preview & Tips Section */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white">
                <h3 className="font-semibold flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Live Preview
                </h3>
              </div>

              <div className="p-6">
                {formData ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Your Requirements Summary:
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Plot Size:</span>
                          <span className="font-medium text-gray-900">
                            {formData.plotLength} × {formData.plotWidth} ft
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Area:</span>
                          <span className="font-medium text-gray-900">
                            {(formData.plotLength * formData.plotWidth).toLocaleString()} sq ft
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Configuration:</span>
                          <span className="font-medium text-gray-900">{formData.configuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Facing:</span>
                          <span className="font-medium text-gray-900">{formData.facing}</span>
                        </div>
                        {formData.kitchenSize && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Kitchen:</span>
                            <span className="font-medium text-gray-900">{formData.kitchenSize} sq ft</span>
                          </div>
                        )}
                        {(formData.requirements?.balcony || formData.requirements?.separateDining ||
                          formData.requirements?.poojaRoom || formData.requirements?.utilityArea) && (
                          <div className="pt-2 border-t border-blue-200">
                            <span className="text-gray-600">Additional:</span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {formData.requirements?.balcony && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Balcony
                                </span>
                              )}
                              {formData.requirements?.separateDining && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Dining
                                </span>
                              )}
                              {formData.requirements?.poojaRoom && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Pooja Room
                                </span>
                              )}
                              {formData.requirements?.utilityArea && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Utility
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-3">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">Ready to generate!</p>
                      <p className="text-sm text-gray-500 mt-1">Click the button to create your custom floor plan</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium mb-2">No data yet</p>
                    <p className="text-sm text-gray-400">
                      Fill in the form to see a live preview of your requirements
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6">
              <h3 className="font-semibold text-purple-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pro Tips
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">East-facing plots are considered most auspicious</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">Include a pooja room for traditional Indian homes</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">Kitchen size of 100-120 sq ft is ideal for Indian cooking</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">Balconies add valuable outdoor space</p>
                </div>
              </div>
            </div>

            {/* Expected Results */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
              <h3 className="font-semibold text-green-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What You'll Get
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional floor plan in 60 seconds
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Vastu-compliant room placement
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Furniture placement suggestions
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  PDF download for contractors
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}