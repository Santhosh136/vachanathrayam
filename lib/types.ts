export type VachanamForm = 'singular' | 'dual' | 'plural'

export interface Vachanam {
  singular: string
  dual: string
  plural: string
}

export interface Word {
  id: number
  sanskrit: string
  english: string
  tamil: string
  type: string
  vachanam: Vachanam
}
