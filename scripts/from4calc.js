let latRange = [2.5, 38.5];
    let longRange = [63.5, 99.5];
    let rows = 36, cols = 36;
    let myFrom4 = "";

    // Compute block at given level
    function getBlock(lat, long, currentLatRange, currentLongRange, r, c) {
      let latStep = (currentLatRange[1] - currentLatRange[0]) / r;
      let longStep = (currentLongRange[1] - currentLongRange[0]) / c;

      let row = Math.floor((lat - currentLatRange[0]) / latStep);
      let col = Math.floor((long - currentLongRange[0]) / longStep);

      row = Math.min(Math.max(row, 0), r - 1);
      col = Math.min(Math.max(col, 0), c - 1);

      let newLatRange = [
        currentLatRange[0] + row * latStep,
        currentLatRange[0] + (row + 1) * latStep
      ];
      let newLongRange = [
        currentLongRange[0] + col * longStep,
        currentLongRange[0] + (col + 1) * longStep
      ];

      let blockNum = row * c + col + 1;
      return { blockNum, newLatRange, newLongRange };
    }

    function getWords(lat, long) {
      let l1 = getBlock(lat, long, latRange, longRange, rows, cols);
      let word1 = words[(l1.blockNum - 1) % words.length];

      let l2 = getBlock(lat, long, l1.newLatRange, l1.newLongRange, rows, cols);
      let word2 = words[(l2.blockNum - 1) % words.length];

      let l3 = getBlock(lat, long, l2.newLatRange, l2.newLongRange, rows, cols);
      let word3 = words[(l3.blockNum - 1) % words.length];

      let l4 = getBlock(lat, long, l3.newLatRange, l3.newLongRange, 8, 8);
      let word4 = words[(l4.blockNum - 1) % words.length];

      return {
        words: [word1, word2, word3, word4],
        level4Range: { lat: l4.newLatRange, long: l4.newLongRange }
      };
    }

    function fetchLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,
          () => alert("Failed to get location."));
      } else {
        alert("Geolocation not supported.");
      }
    }

    function showPosition(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      document.getElementById("latByUser").value = lat;
      document.getElementById("longByUser").value = long;

      showFrom4(lat, long);
    }

    function showFrom4(lat, long) {
      if (isNaN(lat) || isNaN(long)) {
        alert("Invalid latitude/longitude");
        return;
      }

      const result = getWords(parseFloat(lat), parseFloat(long));
      myFrom4 = result.words.join("-");
      document.getElementById("fetchedFrom4").innerText =
        `Words: ${myFrom4}`;
      document.getElementById("latLongRange").innerText =
        `Level 4 Range → Lat: ${result.level4Range.lat[0].toFixed(6)} to ${result.level4Range.lat[1].toFixed(6)}, 
         Long: ${result.level4Range.long[0].toFixed(6)} to ${result.level4Range.long[1].toFixed(6)}`;
    }

    function findFrom4() {
      const lat = parseFloat(document.getElementById("latByUser").value);
      const long = parseFloat(document.getElementById("longByUser").value);
      showFrom4(lat, long);
    }

    // Event listeners
    


    function from4ToCoord(word1, word2, word3, word4) {
      const latRange = [2.5, 38.5];
      const longRange = [63.5, 99.5];
      const rows = 36;
      const cols = 36;

      // Helper function to find block number corresponding to a word
      function getBlockNum(word) {
        return words.indexOf(word) + 1;
      }

      // Helper function to compute lat/long ranges for a block number within given ranges and grid size
      function getBlockLatLongRange(blockNum, currentLatRange, currentLongRange, r, c) {
        const latStep = (currentLatRange[1] - currentLatRange[0]) / r;
        const longStep = (currentLongRange[1] - currentLongRange[0]) / c;

        const row = Math.floor((blockNum - 1) / c);
        const col = (blockNum - 1) % c;

        return {
          newLatRange: [
            currentLatRange[0] + row * latStep,
            currentLatRange[0] + (row + 1) * latStep
          ],
          newLongRange: [
            currentLongRange[0] + col * longStep,
            currentLongRange[0] + (col + 1) * longStep
          ]
        };
      }

      const start = performance.now();

      // Iteratively compute the ranges for each word level
      const b1 = getBlockNum(word1);
      const l1 = getBlockLatLongRange(b1, latRange, longRange, rows, cols);

      const b2 = getBlockNum(word2);
      const l2 = getBlockLatLongRange(b2, l1.newLatRange, l1.newLongRange, rows, cols);

      const b3 = getBlockNum(word3);
      const l3 = getBlockLatLongRange(b3, l2.newLatRange, l2.newLongRange, rows, cols);

      const b4 = getBlockNum(word4);
      const l4 = getBlockLatLongRange(b4, l3.newLatRange, l3.newLongRange, 8, 8);

      // Calculate averages
      const avgLat = (l4.newLatRange[0] + l4.newLatRange[1]) / 2;
      const avgLong = (l4.newLongRange[0] + l4.newLongRange[1]) / 2;

      const end = performance.now();

      return {
        latRange: l4.newLatRange,
        longRange: l4.newLongRange,
        avgLat: avgLat,
        avgLong: avgLong,
        debugTimeMs: end - start,
        word1,
        word2,
        word3,
        word4
      };
    }