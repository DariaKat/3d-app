export const defaultData: any = {
    'бетон': {
        bulk_mass_dry_condition: 2330,
        thermal_conductivity: (t: number) => 1.2 - 0.00035 * t,
        heat_capacity: (t: number) => 0.71 + 0.00084 * t,
        reduced_radiation_coefficient: (t: number) => 3.26 - 0.0023 * t,
        blackness: (t: number) => 0.64 - 0.00045 * t,
    }
}