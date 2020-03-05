export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateGrid(size: number) {
  const grid: number[][] = [];
  for (let row = 0; row < size; row++) {
    grid[row] = [];
    for (let col = 0; col < size; col++) {
      grid[row][col] = getRandom(0, 1);
    }
  }

  return grid;
}

export function getAllConnectedAreas(grid: number[][]) {
  const rows = grid.length;
  if (rows === 0) {
    throw new Error('Grid must have at least 1 row');
  }

  const cols = grid[0].length;
  let count = 0;

  // Each connected area is saved as a Set
  const sets: Set<number>[] = [];

  const visited: boolean[][] = new Array(rows)
    .fill(false)
    .map(() => new Array(cols).fill(false));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1 && !visited[r][c]) {
        sets[count] = new Set();
        sets[count].add(getIndexInGrid(rows, r, c));
        dfs(grid, r, c, visited, sets[count]);
        count++;
      }
    }
  }

  return sets;
}

function dfs(
  grid: number[][],
  row: number,
  col: number,
  visited: boolean[][],
  set: Set<number>
) {
  const rows = grid.length;
  const cols = grid[0].length;

  const isOutOfBounds = row >= rows || col >= cols || row < 0 || col < 0;

  if (isOutOfBounds || grid[row][col] === 0 || visited[row][col]) {
    return;
  }

  set.add(getIndexInGrid(rows, row, col));
  visited[row][col] = true;

  dfs(grid, row + 1, col, visited, set);
  dfs(grid, row - 1, col, visited, set);
  dfs(grid, row, col + 1, visited, set);
  dfs(grid, row, col - 1, visited, set);
}

/**
 * Get the unique index of a cell in a grid, given its row & col
 */
export function getIndexInGrid(totalRows: number, row: number, col: number) {
  return row * totalRows + col;
}

// From: https://css-tricks.com/snippets/javascript/lighten-darken-color/
export function lightenDarkenColor(col: string, amount: number) {
  var usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}
