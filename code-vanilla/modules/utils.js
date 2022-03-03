export function drawRandomElementFromArray(array) {
    if (array && array.length > 0)
        return array[Math.floor(Math.random() * array.length)];
    else
        return null;
}

export function getMaxIdFromArray(array, key) {
    let maxId = 0;
    for (let element of array) {
        if (element[key] > maxId) {
            maxId = element[key];
        }
    }
    return maxId;
}