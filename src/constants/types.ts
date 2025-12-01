export type StepConfig = {
  id: number
  title: string
  description: string
  options?: string[]
  type: "single" | "multiple" | "review"
}