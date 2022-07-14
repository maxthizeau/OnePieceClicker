// Inner Square
// prettier-ignore
const pattern1 = {
    width:3, 
    height:3, 
    pattern: 
    [
      [3,0], [4,0], [5,0], 
      [3,1], [-1,-1], [5,1],
      [3,2], [4,2], [5,2],
    ]
  }

// Outer Square
// prettier-ignore
const pattern2 = {
    width:3, 
    height:3, 
    pattern: 
    [
      [0,0], [1,0], [2,0], 
      [0,1], [-1,-1], [2,1],
      [0,2], [1,2], [2,2],
    ]
  }
// Big Pattern
// prettier-ignore
const pattern3 = {
    width:7, 
    height:7, 
    pattern: 
    [
      [1,3], [2,3], [0,4], [1,0], [2,0], [1,1], [1,1], 
      [1,1], [1,1], [0,1], [1,1], [2,1], [1,1], [1,1], 
      [1,1], [0,0], [8,1], [1,2], [2,2], [1,1], [1,1], 
      [1,1], [0,2], [8,2], [4,2], [4,2], [4,2], [2,0], 
      [1,1], [1,1], [0,1], [1,1], [1,1], [3,0], [3,4], 
      [1,1], [1,1], [0,1], [1,1], [1,1], [3,1], [5,5], 
      [1,1], [1,1], [0,2], [1,2], [1,2], [2,2], [1,1], 
      
    ]
  }

// prettier-ignore
const pattern4 = {
    width:5, 
    height:5, 
    pattern: 
    [
      [0,0], [1,0], [1,0], [1,0], [2,0], 
      [0,1], [1,1], [1,1], [1,1], [2,1],
      [0,1], [3,0], [5,0], [1,1], [2,1],
      [0,1], [3,2], [5,2], [1,1], [2,1],
      [0,2], [1,2], [1,2], [1,2], [2,2],
    ]
  }
// prettier-ignore
const pattern5 = {
    width:5, 
    height:5, 
    pattern: 
    [
      [1,1], [0,0], [1,0], [1,0], [2,0], 
      [0,0], [5,2], [3,0], [5,0], [2,1],
      [0,1], [3,0], [8,2], [5,2], [2,1],
      [0,1], [3,2], [5,2], [1,1], [2,1],
      [0,2], [1,2], [1,2], [1,2], [5,5],
    ]
  }
// prettier-ignore
const pattern6 = {
    width:5, 
    height:7, 
    pattern: 
    [
      [1,1], [1,1], [0,0], [1,0], [2,0], 
      [0,0], [1,0], [6,5], [4,1], [2,1],
      [7,3], [7,1], [7,1], [5,0], [2,1],
      [6,3], [4,3], [4,3], [6,1], [2,1],
      [0,1], [7,5], [5,3], [4,2], [5,4],
      [0,2], [5,0], [0,2], [1,2], [3,4],
      [1,1], [0,2], [1,2], [1,2], [2,2],
    ]
  }
// prettier-ignore
const pattern7 = {
    width:3, 
    height:7, 
    pattern: 
    [
      [0,0], [1,0], [2,0], 
      [0,1], [1,1], [2,1],
      [0,1], [1,1], [2,1],
      [0,1], [1,1], [2,1],
      [0,1], [1,1], [2,1],
      [0,1], [1,1], [2,1],
      [0,2], [1,2], [2,2],
    ]
  
  }
// prettier-ignore
const pattern8 = {
    width:2, 
    height:2, 
    pattern: 
    [
      [0,3], [1,1],
      [1,1], [0,3]        
    ]
  }

// prettier-ignore
const pattern9 = {
    width: 5,
    height: 8,
    pattern: [
      [1, 1], [3, 5], [1, 1], [1, 1], [1, 1], 
      [1, 1], [4, 5], [1, 1], [1, 1], [1, 1], 
      [1, 1], [4, 5], [1, 1], [1, 1], [1, 1], 
      [1, 1], [4, 5], [1, 1], [3, 5], [1, 1], 
      [1, 1], [4, 5], [1, 1], [4, 5], [1, 1], 
      [1, 1], [4, 5], [1, 1], [4, 5], [1, 1], 
      [1, 3], [4, 3], [2, 3], [1, 5], [3, 3], 
      [1, 1], [5, 5], [1, 1], [1, 1], [1, 1],
    ],
  }

// prettier-ignore
const pattern10 = {
    width:1, 
    height:8, 
    pattern: 
    [
      [3,5], 
      [4,5], 
      [4,5], 
      [4,5], 
      [4,5], 
      [4,5], 
      [4,5], 
      [5,5], 
    ]
  
  }
// prettier-ignore
const pattern11 = {
    width:8, 
    height:3, 
    pattern: 
    [
      [1,1], [3,5], [1,1], [3,5], [1,1], [1,1], [3,5], [1,1], 
      [1,3], [1,5], [2,3],[1,5], [2,3], [1,4], [1,5], [3,3], 
      [1,1], [1,1], [1,1],[1,1], [1,1], [5,5], [1,1], [1,1], 
  
    ]
  
  }
// prettier-ignore
const pattern12 = {
    width:6, 
    height:2, 
    pattern: 
    [
      [1,1], [1,1], [1,1], [3,5], [1,1], [1,1], 
      [1,3], [2,3], [2,3],[1,5], [2,3], [3,3], 
  
    ]
  
  }
// prettier-ignore
const pattern13 = {
    width:3, 
    height:3, 
    pattern: 
    [    
      [1,3], [1,4], [3,3], 
      [1,1], [4,5], [1,1], 
      [1,3], [1,5], [3,3],        
    ]
  }
// prettier-ignore
const pattern14 = {
    width:9, 
    height:3, 
    pattern: 
    [    
      [1,3], [2,3], [2,3], [1,4], [2,3], [2,3], [2,3], [0,4], [2,0], 
      [1,1], [1,1], [1,1], [4,5], [1,1], [1,1], [1,1], [0,1], [2,1],     
      [1,3], [2,3], [2,3], [1,5], [2,3], [2,3], [2,3], [0,5], [2,2], 
     
    ]
  }
// prettier-ignore
const pattern15 = {
    width:3, 
    height:3, 
    pattern: 
    [    
      [1,1], [3,5], [1,1], 
      [1,3], [4,3], [3,3], 
      [1,1], [5,5], [1,1], 
    ]
  }
// prettier-ignore
const pattern16 = {
    width:1, 
    height:1, 
    pattern: 
    [    
      [4,1],   
    ]
  }
// prettier-ignore
const pattern17 = {
    width:6, 
    height:4, 
    pattern: 
    [
      
      [1,1], [1,1], [1,1], [3,0], [4,0], [5,0], 
      [1,1], [3,0], [7,1], [8,2], [4,2], [5,2], 
      [3,0], [8,2], [7,2], [8,1], [5,0], [1,1], 
      [3,2], [5,2], [1,1], [3,2], [5,2], [1,1],     
    ]
  
  }

const patternList = [
  pattern1,
  pattern2,
  pattern3,
  pattern4,
  pattern5,
  pattern6,
  pattern7,
  pattern8,
  pattern9,
  pattern10,
  pattern11,
  pattern12,
  pattern13,
  pattern14,
  pattern15,
  pattern16,
  pattern17,
]

export default patternList