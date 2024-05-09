// export const getMergseSortAnimations;

// export const mergeSort = array => { 
//     if (array.length == 1) return array;
//     const middleIdx = Math.floor(array.length / 2);
//     const firstHalf = mergeSort(array.slice(0, middleIdx));
//     const secondHalf = mergeSort(array.slice(middleIdx));
//     const sortedArray = [];
//     let i = 0, j = 0; 
//     while (i < firstHalf.length && j < secondHalf.length) { 
//         if (firstHalf[i] < secondHalf[j]) { 
//             sortedArray.push(firstHalf[i++]);
//         } else { 
//             sortedArray.push(secondHalf[j++]);
//         }
//     }

//     while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
//     while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
//     return sortedArray;
// };

export function getMergeSortAnimations(array) {
    // Initialising an empty array to store animations
    const animations = [];
    // Base Case: If the array has 1 or 0 elements, it's already sorted. 
    if (array.length <= 1) return array;
    // Creating a copy of the original array to be used in the sorting process. 
    const auxiliaryArray = array.slice();
    // Call helper function to perform the merge sort.
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    // Returning the array of animations to visualise the sorting process. 
    return animations;
}
// Helper function to recursively sort the array using merge sort.
function mergeSortHelper(
    mainArray, // Main array to be sorted.
    startIdx, // Starting index of the current subarray.
    endIdx, // Ending index of the current subarray.
    auxiliaryArray, // Auxillary array used for merging.
    animations, // An array used to store animations.
) { 
    // Base Case: If the start index equals the end index, the subarray has 1 element and is sorted. 
    if (startIdx === endIdx) return;
    // Calculating the middle index of the current subarray.
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    // Recursively sort the left half of the array.
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    // Recursively sort the right half of the array.    
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    //Merging the sorted halves together. 
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx; // Index for the main array where the next element will be placed.
    let i = startIdx; // Index for the left half of the subarray.
    let j = middleIdx + 1; // Index for the right half of the subarray.

    // Loop through both halves of the subarray.
    while (i <= middleIdx && j <= endIdx) { 
        // These are the values that we're comparing; we push them once to change their color. 
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second time to revert their color.
        animations.push([i, j]);
        // If the element in the left half is less than or equal to the element in the right half.
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array w/ the value at index i in the
            // auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++]; // Place the smaller element in the main array and move the indices.
        } else { 
            // We overwrite the value at index k in the original array w/ the value at index j 
            // in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++]; // Place the smaller element in the main array and move the indices.
        }
    }

    // If there are remaining elements in the left half, copy them to the main array.
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once to change their color. 
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second time to revert their color.
        animations.push([i, j]);
        // We overwrite the value at index k in the original array w/ the value at index i in the
        // auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    // If there are remaining elements in the right half, copy them to the main array.
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once to change their color.
        animations.push([j, j]);
         // These are the values that we're comparing; we push them a second time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array w/ the value at index j in the
        // auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}