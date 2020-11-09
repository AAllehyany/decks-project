export interface TargetField {
    field: string
    value: number | string
}

export interface Rule {
    min: number
    max: number
}

export interface DeckRule {
    targetField: TargetField,
    rule: Rule
}