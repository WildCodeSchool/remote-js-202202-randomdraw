export function drawRandomElementFromArray(array) {
    if (array && array.length > 0)
        return array[Math.floor(Math.random() * array.length)];
    else
        return null;
}