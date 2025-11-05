import { useMemo } from "react"
import type { Layout } from "@/types/layout"

interface FloorPlanProps {
  layout: Layout
  className?: string
}

export function FloorPlan({ layout, className = "" }: FloorPlanProps) {
  const { plotDimensions, rooms, doors, windows, furniture } = layout

  const scale = 8 // 1 foot = 8 pixels for better display

  const svgWidth = plotDimensions.width * scale
  const svgHeight = plotDimensions.length * scale

  const roomColors: Record<string, string> = {
    living: '#DBEAFE', // Light blue
    bedroom: '#DCFCE7', // Light green
    kitchen: '#FEF3C7', // Light amber
    bathroom: '#E0E7FF', // Light indigo
    balcony: '#CCFBF1', // Light teal
    dining: '#F3E8FF', // Light purple
    pooja: '#FEE2E2', // Light red
    utility: '#F1F5F9' // Light slate
  }

  const roomBorderColors: Record<string, string> = {
    living: '#3B82F6', // Blue
    bedroom: '#22C55E', // Green
    kitchen: '#F59E0B', // Amber
    bathroom: '#6366F1', // Indigo
    balcony: '#14B8A6', // Teal
    dining: '#A855F7', // Purple
    pooja: '#EF4444', // Red
    utility: '#64748B' // Slate
  }

  const furnitureColors: Record<string, string> = {
    sofa: '#6B7280',
    'double-bed': '#4B5563',
    wardrobe: '#92400E',
    'tv-unit': '#1F2937',
    stove: '#DC2626',
    sink: '#0891B2'
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Your Floor Plan
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Professional layout optimized for Indian homes
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Plot Dimensions</p>
              <p className="font-semibold text-gray-900">
                {plotDimensions.length} × {plotDimensions.width} ft
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Area</p>
              <p className="font-semibold text-blue-600">
                {(plotDimensions.length * plotDimensions.width).toLocaleString()} sq ft
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floor Plan Visualization */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-white rounded-xl shadow-inner border border-gray-200 p-4 overflow-auto">
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="border-2 border-gray-300 rounded-lg"
            style={{ maxWidth: '100%', height: 'auto' }}
          >
            {/* Grid pattern for background */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Plot boundary */}
            <rect
              x="0"
              y="0"
              width={svgWidth}
              height={svgHeight}
              fill="white"
              stroke="#374151"
              strokeWidth="3"
              rx="4"
            />

            {/* Rooms */}
            {rooms.map((room) => (
              <g key={room.id}>
                {/* Room background with gradient */}
                <defs>
                  <linearGradient id={`gradient-${room.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={roomColors[room.type]} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={roomColors[room.type]} stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                <rect
                  x={room.x * scale}
                  y={room.y * scale}
                  width={room.width * scale}
                  height={room.height * scale}
                  fill={`url(#gradient-${room.id})`}
                  stroke={roomBorderColors[room.type]}
                  strokeWidth="2"
                  rx="2"
                  className="transition-all duration-200 hover:opacity-80"
                />

                {/* Room label background */}
                <rect
                  x={(room.x + room.width / 2) * scale - 40}
                  y={(room.y + room.height / 2) * scale - 20}
                  width="80"
                  height="30"
                  fill="white"
                  stroke={roomBorderColors[room.type]}
                  strokeWidth="1"
                  rx="4"
                  opacity="0.95"
                />

                {/* Room label */}
                <text
                  x={(room.x + room.width / 2) * scale}
                  y={(room.y + room.height / 2) * scale - 5}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill={roomBorderColors[room.type]}
                >
                  {room.name}
                </text>

                {/* Room dimensions */}
                <text
                  x={(room.x + room.width / 2) * scale}
                  y={(room.y + room.height / 2) * scale + 8}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#6B7280"
                >
                  {room.dimensions}
                </text>
              </g>
            ))}

            {/* Doors */}
            {doors.map((door) => (
              <g key={door.id}>
                <rect
                  x={(door.x - door.width / 2) * scale}
                  y={(door.y - 1) * scale}
                  width={door.width * scale}
                  height={scale * 2}
                  fill="white"
                  stroke="#1F2937"
                  strokeWidth="2"
                />
                {/* Door arc */}
                {door.rotation === 0 ? (
                  <path
                    d={`M ${(door.x - door.width / 2) * scale} ${door.y * scale}
                        A ${door.width * scale / 2} ${door.width * scale / 2} 0 0 1 ${(door.x + door.width / 2) * scale} ${door.y * scale}`}
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    opacity="0.7"
                  />
                ) : (
                  <path
                    d={`M ${door.x * scale} ${(door.y - door.width / 2) * scale}
                        A ${door.width * scale / 2} ${door.width * scale / 2} 0 0 1 ${door.x * scale} ${(door.y + door.width / 2) * scale}`}
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    opacity="0.7"
                  />
                )}
              </g>
            ))}

            {/* Windows */}
            {windows.map((window) => (
              <g key={window.id}>
                <rect
                  x={(window.x - window.width / 2) * scale}
                  y={(window.y - 0.5) * scale}
                  width={window.width * scale}
                  height={scale}
                  fill="#87CEEB"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  rx="2"
                  opacity="0.8"
                />
                {/* Window lines */}
                <line
                  x1={(window.x - window.width / 2 + 0.5) * scale}
                  y1={(window.y - 0.5) * scale}
                  x2={(window.x - window.width / 2 + 0.5) * scale}
                  y2={(window.y + 0.5) * scale}
                  stroke="#1F2937"
                  strokeWidth="0.8"
                />
                <line
                  x1={(window.x + window.width / 2 - 0.5) * scale}
                  y1={(window.y - 0.5) * scale}
                  x2={(window.x + window.width / 2 - 0.5) * scale}
                  y2={(window.y + 0.5) * scale}
                  stroke="#1F2937"
                  strokeWidth="0.8"
                />
              </g>
            ))}

            {/* Furniture */}
            {furniture.map((item) => (
              <g key={item.id} opacity="0.7">
                <rect
                  x={item.x * scale}
                  y={item.y * scale}
                  width={item.width * scale}
                  height={item.height * scale}
                  fill={furnitureColors[item.type] || '#D1D5DB'}
                  stroke="#374151"
                  strokeWidth="1"
                  rx="1"
                  transform={`rotate(${item.rotation}, ${(item.x + item.width / 2) * scale}, ${(item.y + item.height / 2) * scale})`}
                  className="transition-opacity duration-200 hover:opacity-100"
                />
              </g>
            ))}

            {/* Compass */}
            <g transform={`translate(${svgWidth - 50}, 50)`}>
              <circle cx="0" cy="0" r="30" fill="white" stroke="#374151" strokeWidth="2" opacity="0.95"/>
              <path d="M 0,-25 L 4,-6 L 0,0 L -4,-6 Z" fill="#DC2626" />
              <path d="M 0,25 L 4,6 L 0,0 L -4,6 Z" fill="#374151" />
              <text x="0" y="-32" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1F2937">N</text>
              <text x="32" y="4" textAnchor="middle" fontSize="12" fill="#6B7280">E</text>
              <text x="0" y="40" textAnchor="middle" fontSize="12" fill="#6B7280">S</text>
              <text x="-32" y="4" textAnchor="middle" fontSize="12" fill="#6B7280">W</text>
            </g>

            {/* Scale indicator */}
            <g transform={`translate(20, ${svgHeight - 20})`}>
              <line x1="0" y1="0" x2="50" y2="0" stroke="#374151" strokeWidth="2"/>
              <line x1="0" y1="-5" x2="0" y2="5" stroke="#374151" strokeWidth="2"/>
              <line x1="50" y1="-5" x2="50" y2="5" stroke="#374151" strokeWidth="2"/>
              <text x="25" y="15" textAnchor="middle" fontSize="10" fill="#6B7280">5 ft</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white px-6 py-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Room Legend
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {Object.entries(roomColors).map(([type, color]) => (
            <div key={type} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded border border-gray-300"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-600 capitalize">
                {type.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>

        {/* Additional indicators */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-8 h-2 bg-white border border-gray-400 rounded-sm mr-2"></div>
            <span>Door</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-2 bg-sky-200 border border-gray-400 rounded-sm mr-2"></div>
            <span>Window</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-2 bg-gray-400 border border-gray-400 rounded-sm mr-2"></div>
            <span>Furniture</span>
          </div>
        </div>
      </div>
    </div>
  )
}