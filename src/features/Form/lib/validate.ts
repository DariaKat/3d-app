export const checkOfNumber = (value: string) => {
    const matches = value.match(
        /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
    );
    return (
        matches?.length > 0 || "Введенное значение не является числом"
    )
}