export interface UserInput {
  plotLength: number
  plotWidth: number
  configuration: '1BHK' | '2BHK' | '3BHK'
  facing: 'North' | 'South' | 'East' | 'West'
  requirements?: {
    balcony?: boolean
    separateDining?: boolean
    poojaRoom?: boolean
    utilityArea?: boolean
  }
  kitchenSize?: number
}

export interface Room {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  dimensions: string
  type: 'bedroom' | 'kitchen' | 'living' | 'bathroom' | 'balcony' | 'dining' | 'pooja' | 'utility'
}

export interface Door {
  id: string
  x: number
  y: number
  width: number
  rotation: number
  roomIds: string[]
}

export interface Window {
  id: string
  x: number
  y: number
  width: number
  rotation: number
  roomId: string
}

export interface Furniture {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  roomId: string
}

export interface Layout {
  rooms: Room[]
  doors: Door[]
  windows: Window[]
  furniture: Furniture[]
  totalArea: number
  plotDimensions: { length: number; width: number }
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface LayoutResult {
  layout: Layout
  suggestions: string[]
  dimensions: { totalArea: number; roomSizes: Record<string, number> }
}