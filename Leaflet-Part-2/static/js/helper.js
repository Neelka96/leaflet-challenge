function findOutliers(arr) {
    // Sort the array in ascending order
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const len = sortedArr.length;
  
    // Calculate quartiles
    const q1 = getQuartile(sortedArr, len, 0.25);
    const q3 = getQuartile(sortedArr, len, 0.75);
  
    // Calculate IQR
    const iqr = q3 - q1;
  
    // Define outlier thresholds
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
  
    // Identify outliers
    const outliers = sortedArr.filter(val => val < lowerBound || val > upperBound);
  
    return outliers;
  };
  
  function getQuartile(arr, len, q) {
      const pos = (len - 1) * q;
      const base = Math.floor(pos);
      const rest = pos - base;
      if (arr[base + 1] !== undefined) {
          return arr[base] + rest * (arr[base + 1] - arr[base]);
      } else {
          return arr[base];
      }
  };

  // let testArr = data.features.map(feature => feature.geometry.coordinates[2]);
  // const outliers = findOutliers(testArr);
  // console.log("Outliers:", outliers);