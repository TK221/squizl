/* eslint-disable @typescript-eslint/no-explicit-any */
export function areNumbers (elements: any[]): boolean {
    for (const element of elements) {
        if ((!element || isNaN(+element)) && element !== 0) return false;
    }
    return true;
}

export function areNotNullOrEmpty (elements: any[]): boolean {
    for (const element of elements) {
        if (!element) return false;
    }
    return true;
}

export function areNotNullButEmpty (elements: any[]): boolean {
    for (const element of elements) {
        if (!element && element !== '') return false;
    }
    return true;
}
