/**
 * Represents the target field for the given rule.
 */
export interface TargetField {
    field: string
    value: number | string
}

/**
 * Rule for min/max number for the target field
 */
export interface Rule {
    min: number
    max: number
}

/**
 * Represents a rule to be used to check on the deck list.
 * 
 * @field targetField   the field the rule applies to.
 * @field rule  rule to check on the target field
 */
export interface DeckRule {
    targetField: TargetField,
    rule: Rule
}