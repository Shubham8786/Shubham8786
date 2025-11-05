import { z } from "zod"

export const userInputSchema = z.object({
  plotLength: z.number()
    .min(15, "Plot length must be at least 15 feet")
    .max(100, "Plot length must not exceed 100 feet"),
  plotWidth: z.number()
    .min(15, "Plot width must be at least 15 feet")
    .max(100, "Plot width must not exceed 100 feet"),
  configuration: z.enum(['1BHK', '2BHK', '3BHK'], {
    required_error: "Please select a room configuration"
  }),
  facing: z.enum(['North', 'South', 'East', 'West'], {
    required_error: "Please select a facing direction"
  }),
  requirements: z.object({
    balcony: z.boolean().optional(),
    separateDining: z.boolean().optional(),
    poojaRoom: z.boolean().optional(),
    utilityArea: z.boolean().optional(),
  }).optional(),
  kitchenSize: z.number()
    .min(80, "Kitchen must be at least 80 sq ft")
    .max(200, "Kitchen must not exceed 200 sq ft")
    .optional()
})

export type UserInput = z.infer<typeof userInputSchema>