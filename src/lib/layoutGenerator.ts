import type { UserInput, Room, Door, Window, Layout, LayoutResult } from "@/types/layout"

export class LayoutGenerator {
  private gridScale = 2 // 1 unit = 2 feet

  generateLayout(input: UserInput): LayoutResult {
    const { plotLength, plotWidth, configuration, facing, requirements } = input

    // Create base layout structure
    const layout: Layout = {
      rooms: [],
      doors: [],
      windows: [],
      furniture: [],
      totalArea: plotLength * plotWidth,
      plotDimensions: { length: plotLength, width: plotWidth }
    }

    // Generate room layout based on configuration
    this.generateRooms(layout, configuration, requirements, input)

    // Add doors and windows
    this.addDoorsAndWindows(layout, facing)

    // Add basic furniture
    this.addFurniture(layout, configuration)

    const suggestions = this.generateSuggestions(layout, input)
    const dimensions = this.calculateDimensions(layout)

    return {
      layout,
      suggestions,
      dimensions
    }
  }

  private generateRooms(
    layout: Layout,
    configuration: string,
    requirements: UserInput["requirements"],
    input: UserInput
  ): void {
    const plotLength = layout.plotDimensions.length
    const plotWidth = layout.plotDimensions.width
    const scale = this.gridScale

    switch (configuration) {
      case '1BHK':
        this.generate1BHKLayout(layout, requirements, input)
        break
      case '2BHK':
        this.generate2BHKLayout(layout, requirements, input)
        break
      case '3BHK':
        this.generate3BHKLayout(layout, requirements, input)
        break
    }
  }

  private generate2BHKLayout(
    layout: Layout,
    requirements: UserInput["requirements"],
    input: UserInput
  ): void {
    const plotLength = layout.plotDimensions.length
    const plotWidth = layout.plotDimensions.width
    const scale = this.gridScale

    // Living Room (larger, front facing)
    const livingRoom: Room = {
      id: "living",
      name: "Living Room",
      x: 0,
      y: 0,
      width: Math.floor(plotWidth * 0.6 / scale) * scale,
      height: Math.floor(plotLength * 0.4 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.6 * plotLength * 0.4) / scale / scale)} sq ft`,
      type: 'living'
    }

    // Kitchen (smaller, efficient)
    const kitchenSize = input.kitchenSize || 100
    const kitchenWidth = Math.floor(Math.sqrt(kitchenSize * 1.2) / scale) * scale
    const kitchenHeight = Math.floor(kitchenSize / kitchenWidth / scale) * scale

    const kitchen: Room = {
      id: "kitchen",
      name: "Kitchen",
      x: livingRoom.width,
      y: 0,
      width: kitchenWidth,
      height: kitchenHeight,
      dimensions: `${kitchenSize} sq ft`,
      type: 'kitchen'
    }

    // Master Bedroom (larger bedroom)
    const masterBedroom: Room = {
      id: "master-bedroom",
      name: "Master Bedroom",
      x: 0,
      y: livingRoom.height,
      width: Math.floor(plotWidth * 0.5 / scale) * scale,
      height: Math.floor(plotLength * 0.35 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.5 * plotLength * 0.35) / scale / scale)} sq ft`,
      type: 'bedroom'
    }

    // Second Bedroom
    const secondBedroom: Room = {
      id: "second-bedroom",
      name: "Bedroom 2",
      x: masterBedroom.width,
      y: livingRoom.height,
      width: Math.floor(plotWidth * 0.4 / scale) * scale,
      height: Math.floor(plotLength * 0.35 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.4 * plotLength * 0.35) / scale / scale)} sq ft`,
      type: 'bedroom'
    }

    // Common Bathroom
    const bathroom: Room = {
      id: "bathroom",
      name: "Bathroom",
      x: masterBedroom.width + secondBedroom.width,
      y: livingRoom.height,
      width: Math.floor(plotWidth * 0.1 / scale) * scale,
      height: Math.floor(plotLength * 0.35 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.1 * plotLength * 0.35) / scale / scale)} sq ft`,
      type: 'bathroom'
    }

    layout.rooms = [livingRoom, kitchen, masterBedroom, secondBedroom, bathroom]

    // Add optional rooms based on requirements
    if (requirements?.balcony) {
      const balcony: Room = {
        id: "balcony",
        name: "Balcony",
        x: kitchen.x + kitchen.width,
        y: 0,
        width: Math.floor(plotWidth * 0.2 / scale) * scale,
        height: Math.floor(plotLength * 0.15 / scale) * scale,
        dimensions: `${Math.floor((plotWidth * 0.2 * plotLength * 0.15) / scale / scale)} sq ft`,
        type: 'balcony'
      }
      layout.rooms.push(balcony)
    }

    if (requirements?.poojaRoom) {
      const poojaRoom: Room = {
        id: "pooja-room",
        name: "Pooja Room",
        x: kitchen.x,
        y: kitchen.height,
        width: Math.floor(scale * 4),
        height: Math.floor(scale * 4),
        dimensions: "16 sq ft",
        type: 'pooja'
      }
      layout.rooms.push(poojaRoom)
    }

    if (requirements?.utilityArea) {
      const utility: Room = {
        id: "utility",
        name: "Utility Area",
        x: Math.floor(plotWidth * 0.8 / scale) * scale,
        y: Math.floor(plotLength * 0.6 / scale) * scale,
        width: Math.floor(plotWidth * 0.2 / scale) * scale,
        height: Math.floor(plotLength * 0.2 / scale) * scale,
        dimensions: `${Math.floor((plotWidth * 0.2 * plotLength * 0.2) / scale / scale)} sq ft`,
        type: 'utility'
      }
      layout.rooms.push(utility)
    }

    if (requirements?.separateDining) {
      const dining: Room = {
        id: "dining",
        name: "Dining Room",
        x: livingRoom.width,
        y: kitchen.height,
        width: Math.floor(plotWidth * 0.3 / scale) * scale,
        height: Math.floor(plotLength * 0.25 / scale) * scale,
        dimensions: `${Math.floor((plotWidth * 0.3 * plotLength * 0.25) / scale / scale)} sq ft`,
        type: 'dining'
      }
      layout.rooms.push(dining)
    }
  }

  private generate1BHKLayout(
    layout: Layout,
    requirements: UserInput["requirements"],
    input: UserInput
  ): void {
    const plotLength = layout.plotDimensions.length
    const plotWidth = layout.plotDimensions.width
    const scale = this.gridScale

    // Living Room
    const livingRoom: Room = {
      id: "living",
      name: "Living Room",
      x: 0,
      y: 0,
      width: Math.floor(plotWidth * 0.7 / scale) * scale,
      height: Math.floor(plotLength * 0.5 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.7 * plotLength * 0.5) / scale / scale)} sq ft`,
      type: 'living'
    }

    // Kitchen
    const kitchenSize = input.kitchenSize || 80
    const kitchenWidth = Math.floor(Math.sqrt(kitchenSize * 1.2) / scale) * scale
    const kitchenHeight = Math.floor(kitchenSize / kitchenWidth / scale) * scale

    const kitchen: Room = {
      id: "kitchen",
      name: "Kitchen",
      x: livingRoom.width,
      y: 0,
      width: kitchenWidth,
      height: kitchenHeight,
      dimensions: `${kitchenSize} sq ft`,
      type: 'kitchen'
    }

    // Bedroom
    const bedroom: Room = {
      id: "bedroom",
      name: "Bedroom",
      x: 0,
      y: livingRoom.height,
      width: Math.floor(plotWidth * 0.6 / scale) * scale,
      height: Math.floor(plotLength * 0.4 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.6 * plotLength * 0.4) / scale / scale)} sq ft`,
      type: 'bedroom'
    }

    // Bathroom
    const bathroom: Room = {
      id: "bathroom",
      name: "Bathroom",
      x: bedroom.width,
      y: livingRoom.height,
      width: Math.floor(plotWidth * 0.3 / scale) * scale,
      height: Math.floor(plotLength * 0.4 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.3 * plotLength * 0.4) / scale / scale)} sq ft`,
      type: 'bathroom'
    }

    layout.rooms = [livingRoom, kitchen, bedroom, bathroom]

    if (requirements?.balcony) {
      const balcony: Room = {
        id: "balcony",
        name: "Balcony",
        x: kitchen.x + kitchen.width,
        y: 0,
        width: Math.floor(plotWidth * 0.2 / scale) * scale,
        height: Math.floor(plotLength * 0.2 / scale) * scale,
        dimensions: `${Math.floor((plotWidth * 0.2 * plotLength * 0.2) / scale / scale)} sq ft`,
        type: 'balcony'
      }
      layout.rooms.push(balcony)
    }
  }

  private generate3BHKLayout(
    layout: Layout,
    requirements: UserInput["requirements"],
    input: UserInput
  ): void {
    const plotLength = layout.plotDimensions.length
    const plotWidth = layout.plotDimensions.width
    const scale = this.gridScale

    // This is a simplified 3BHK layout
    // Living Room (central)
    const livingRoom: Room = {
      id: "living",
      name: "Living Room",
      x: 0,
      y: 0,
      width: Math.floor(plotWidth * 0.5 / scale) * scale,
      height: Math.floor(plotLength * 0.3 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.5 * plotLength * 0.3) / scale / scale)} sq ft`,
      type: 'living'
    }

    // Kitchen
    const kitchenSize = input.kitchenSize || 120
    const kitchenWidth = Math.floor(Math.sqrt(kitchenSize * 1.2) / scale) * scale
    const kitchenHeight = Math.floor(kitchenSize / kitchenWidth / scale) * scale

    const kitchen: Room = {
      id: "kitchen",
      name: "Kitchen",
      x: livingRoom.width,
      y: 0,
      width: kitchenWidth,
      height: kitchenHeight,
      dimensions: `${kitchenSize} sq ft`,
      type: 'kitchen'
    }

    // Master Bedroom (largest)
    const masterBedroom: Room = {
      id: "master-bedroom",
      name: "Master Bedroom",
      x: 0,
      y: livingRoom.height,
      width: Math.floor(plotWidth * 0.4 / scale) * scale,
      height: Math.floor(plotLength * 0.35 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.4 * plotLength * 0.35) / scale / scale)} sq ft`,
      type: 'bedroom'
    }

    // Second Bedroom
    const secondBedroom: Room = {
      id: "second-bedroom",
      name: "Bedroom 2",
      x: masterBedroom.width,
      y: livingRoom.height,
      width: Math.floor(plotWidth * 0.3 / scale) * scale,
      height: Math.floor(plotLength * 0.35 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.3 * plotLength * 0.35) / scale / scale)} sq ft`,
      type: 'bedroom'
    }

    // Third Bedroom
    const thirdBedroom: Room = {
      id: "third-bedroom",
      name: "Bedroom 3",
      x: masterBedroom.width + secondBedroom.width,
      y: livingRoom.height,
      width: Math.floor(plotWidth * 0.3 / scale) * scale,
      height: Math.floor(plotLength * 0.35 / scale) * scale,
      dimensions: `${Math.floor((plotWidth * 0.3 * plotLength * 0.35) / scale / scale)} sq ft`,
      type: 'bedroom'
    }

    layout.rooms = [livingRoom, kitchen, masterBedroom, secondBedroom, thirdBedroom]

    if (requirements?.balcony) {
      const balcony: Room = {
        id: "balcony",
        name: "Balcony",
        x: kitchen.x + kitchen.width,
        y: 0,
        width: Math.floor(plotWidth * 0.2 / scale) * scale,
        height: Math.floor(plotLength * 0.15 / scale) * scale,
        dimensions: `${Math.floor((plotWidth * 0.2 * plotLength * 0.15) / scale / scale)} sq ft`,
        type: 'balcony'
      }
      layout.rooms.push(balcony)
    }
  }

  private addDoorsAndWindows(layout: Layout, facing: string): void {
    // Add basic doors between rooms
    layout.doors = [
      {
        id: "main-entrance",
        x: layout.plotDimensions.width / 2,
        y: 0,
        width: 3,
        rotation: 0,
        roomIds: ["living"]
      },
      {
        id: "kitchen-door",
        x: layout.rooms.find(r => r.id === "living")?.width || 0,
        y: 4,
        width: 3,
        rotation: 90,
        roomIds: ["living", "kitchen"]
      },
      {
        id: "master-bedroom-door",
        x: 4,
        y: layout.rooms.find(r => r.id === "living")?.height || 0,
        width: 3,
        rotation: 0,
        roomIds: ["living", "master-bedroom"]
      }
    ]

    // Add windows based on facing
    layout.windows = [
      {
        id: "living-window-1",
        x: 2,
        y: 0,
        width: 4,
        rotation: 0,
        roomId: "living"
      },
      {
        id: "kitchen-window",
        x: layout.plotDimensions.width - 2,
        y: 2,
        width: 3,
        rotation: 90,
        roomId: "kitchen"
      }
    ]
  }

  private addFurniture(layout: Layout, configuration: string): void {
    // Add basic furniture for each room type
    layout.rooms.forEach(room => {
      switch (room.type) {
        case 'living':
          layout.furniture.push(
            {
              id: `sofa-${room.id}`,
              type: "sofa",
              x: room.x + 2,
              y: room.y + 2,
              width: 6,
              height: 2,
              rotation: 0,
              roomId: room.id
            },
            {
              id: `tv-unit-${room.id}`,
              type: "tv-unit",
              x: room.x + 2,
              y: room.y + room.height - 3,
              width: 5,
              height: 1,
              rotation: 0,
              roomId: room.id
            }
          )
          break
        case 'bedroom':
          layout.furniture.push(
            {
              id: `bed-${room.id}`,
              type: "double-bed",
              x: room.x + 1,
              y: room.y + 1,
              width: 6,
              height: 7,
              rotation: 0,
              roomId: room.id
            },
            {
              id: `wardrobe-${room.id}`,
              type: "wardrobe",
              x: room.x + room.width - 2,
              y: room.y + 1,
              width: 1,
              height: 6,
              rotation: 0,
              roomId: room.id
            }
          )
          break
        case 'kitchen':
          layout.furniture.push(
            {
              id: `stove-${room.id}`,
              type: "stove",
              x: room.x + 1,
              y: room.y + 1,
              width: 2,
              height: 2,
              rotation: 0,
              roomId: room.id
            },
            {
              id: `sink-${room.id}`,
              type: "sink",
              x: room.x + room.width - 3,
              y: room.y + 1,
              width: 2,
              height: 1,
              rotation: 0,
              roomId: room.id
            }
          )
          break
      }
    })
  }

  private generateSuggestions(layout: Layout, input: UserInput): string[] {
    const suggestions: string[] = []

    // Room-specific suggestions
    suggestions.push("Place main entrance in North or East for positive energy flow")

    if (input.requirements?.poojaRoom) {
      suggestions.push("Pooja room should ideally be in North-East direction")
    }

    if (input.facing === 'East') {
      suggestions.push("East-facing plot is excellent for morning sunlight")
    }

    // Kitchen positioning based on Vastu
    suggestions.push("Kitchen should be placed in South-East for optimal energy")

    return suggestions
  }

  private calculateDimensions(layout: Layout) {
    const roomSizes: Record<string, number> = {}

    layout.rooms.forEach(room => {
      roomSizes[room.name] = (room.width * room.height) / (this.gridScale * this.gridScale)
    })

    return {
      totalArea: layout.totalArea,
      roomSizes
    }
  }
}