import type { Layout, Room, UserInput } from "@/types/layout"

export interface VastuRule {
  id: string
  name: string
  description: string
  check: (layout: Layout, input: UserInput) => boolean
  suggestion: string
}

export class VastuRulesEngine {
  private rules: VastuRule[] = [
    {
      id: 'kitchen-southeast',
      name: 'Kitchen Placement',
      description: 'Kitchen should be in South-East direction',
      check: (layout: Layout, input: UserInput) => {
        const kitchen = layout.rooms.find(r => r.type === 'kitchen')
        if (!kitchen) return true

        // Simplified check - in a real app, calculate actual direction based on plot facing
        const southeastQuadrant = input.facing === 'North' || input.facing === 'South'
        return southeastQuadrant
      },
      suggestion: 'Place kitchen in South-East corner for optimal fire element placement'
    },
    {
      id: 'master-bedroom-southwest',
      name: 'Master Bedroom Placement',
      description: 'Master bedroom should be in South-West direction',
      check: (layout: Layout, input: UserInput) => {
        const masterBedroom = layout.rooms.find(r => r.id === 'master-bedroom')
        if (!masterBedroom) return true

        // Simplified check - in a real app, calculate actual position
        return masterBedroom.x > layout.plotDimensions.width * 0.3 &&
               masterBedroom.y > layout.plotDimensions.length * 0.3
      },
      suggestion: 'Position master bedroom in South-West for stability and prosperity'
    },
    {
      id: 'pooja-northeast',
      name: 'Pooja Room Placement',
      description: 'Pooja room should be in North-East direction',
      check: (layout: Layout, input: UserInput) => {
        const poojaRoom = layout.rooms.find(r => r.type === 'pooja')
        if (!poojaRoom) return true

        // North-East quadrant
        return poojaRoom.x < layout.plotDimensions.width * 0.3 &&
               poojaRoom.y < layout.plotDimensions.length * 0.3
      },
      suggestion: 'Place pooja room in North-East for positive spiritual energy'
    },
    {
      id: 'living-north-east',
      name: 'Living Room Placement',
      description: 'Living room should be in North-East or East',
      check: (layout: Layout, input: UserInput) => {
        const livingRoom = layout.rooms.find(r => r.type === 'living')
        if (!livingRoom) return true

        // Should be in front/north-east area
        return livingRoom.y < layout.plotDimensions.length * 0.5
      },
      suggestion: 'Position living room in North-East or East for welcoming energy'
    },
    {
      id: 'bathroom-avoid-northeast',
      name: 'Bathroom Placement',
      description: 'Bathrooms should not be in North-East',
      check: (layout: Layout, input: UserInput) => {
        const bathrooms = layout.rooms.filter(r => r.type === 'bathroom')
        return !bathrooms.some(bathroom =>
          bathroom.x < layout.plotDimensions.width * 0.3 &&
          bathroom.y < layout.plotDimensions.length * 0.3
        )
      },
      suggestion: 'Move bathroom away from North-East to avoid negative energy flow'
    },
    {
      id: 'main-entrance-north-east',
      name: 'Main Entrance',
      description: 'Main entrance should face North or East',
      check: (layout: Layout, input: UserInput) => {
        return input.facing === 'North' || input.facing === 'East'
      },
      suggestion: 'Main entrance facing North or East brings prosperity and positive energy'
    },
    {
      id: 'balcony-north-east',
      name: 'Balcony Placement',
      description: 'Balcony should be in North or East',
      check: (layout: Layout, input: UserInput) => {
        const balcony = layout.rooms.find(r => r.type === 'balcony')
        if (!balcony) return true

        return balcony.y < layout.plotDimensions.length * 0.5 ||
               balcony.x < layout.plotDimensions.width * 0.5
      },
      suggestion: 'Place balcony in North or East for morning sunlight and fresh air'
    }
  ]

  evaluateLayout(layout: Layout, input: UserInput) {
    const results = this.rules.map(rule => ({
      ...rule,
      passed: rule.check(layout, input)
    }))

    const complianceScore = (results.filter(r => r.passed).length / results.length) * 100

    return {
      complianceScore: Math.round(complianceScore),
      rules: results,
      suggestions: results
        .filter(r => !r.passed)
        .map(r => r.suggestion)
    }
  }

  applyVastuCorrections(layout: Layout, input: UserInput): Layout {
    // This would reposition rooms to be more Vastu compliant
    // For MVP, we'll just add suggestions rather than auto-correct
    return layout
  }

  generateVastuReport(layout: Layout, input: UserInput) {
    const evaluation = this.evaluateLayout(layout, input)

    const overallScore = evaluation.complianceScore
    let grade = 'A+'

    if (overallScore >= 90) grade = 'A+'
    else if (overallScore >= 80) grade = 'A'
    else if (overallScore >= 70) grade = 'B'
    else if (overallScore >= 60) grade = 'C'
    else grade = 'D'

    return {
      overallScore,
      grade,
      passedRules: evaluation.rules.filter(r => r.passed).length,
      totalRules: evaluation.rules.length,
      criticalIssues: evaluation.rules.filter(r => !r.passed && this.isCriticalRule(r.id)),
      suggestions: evaluation.suggestions,
      detailedRules: evaluation.rules
    }
  }

  private isCriticalRule(ruleId: string): boolean {
    // Some rules are more critical than others
    const criticalRules = ['kitchen-southeast', 'pooja-northeast', 'bathroom-avoid-northeast']
    return criticalRules.includes(ruleId)
  }

  getRoomPlacementGuidelines(configuration: string, plotSize: { length: number; width: number }) {
    const guidelines: Record<string, string[]> = {
      '1BHK': [
        'Living room: North-East part of the house',
        'Kitchen: South-East corner',
        'Bedroom: South-West for stability',
        'Bathroom: West or North-West'
      ],
      '2BHK': [
        'Living room: North-East, near entrance',
        'Kitchen: South-East with fire element',
        'Master bedroom: South-West',
        'Second bedroom: West or North-West',
        'Common bathroom: West side',
        'Pooja room: North-East (if included)'
      ],
      '3BHK': [
        'Living room: North-East, maximum sunlight',
        'Kitchen: South-East corner',
        'Master bedroom: South-West corner',
        'Second bedroom: West or North-West',
        'Third bedroom: South or West',
        'Pooja room: North-East corner',
        'Common bathrooms: West or North-West'
      ]
    }

    return guidelines[configuration] || []
  }
}