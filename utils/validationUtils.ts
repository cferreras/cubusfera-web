export const areAllChecked = (values: boolean[] | null | undefined): boolean => {
    if (!values) return false; // Si values es null o undefined, retorna false
    return values.every(value => value === true);
};