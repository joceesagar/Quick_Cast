// packages/shared/src/index.ts
export interface Poll {
    id: string
    question: string
    options: Record<string, number>
}
