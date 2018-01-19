(function () {
  'use strict';

  const board = [
    ['T', 'T', '.', 'F'],
    ['T', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['R', '.', '.', 'W']
  ];

  const robot = {
    x: 0,
    y: 0,
    dir: 'up'
  };

  let moves = 0;
  let turns = 0;
  let applesEaten = 0; //No apples yet. It seems this line is not for Robot-4.

  const trailIndicators = {
    left: '←',
    right: '→',
    up: '↑',
    down: '↓'
  };

  function renderAll() {
    board.reverse();
    /*Why do we need to reverse the array in the first place?
      Removing this line will indeed make the table looks not correct.
      The question here is: How arrays' elements are sorted in the memory?
      Do we always need to reverse arrays?
    */
    const root = document.getElementById('root');
    root.innerHTML = '';
    renderToolbar(root);
    renderBoardContainer(root);
    renderBoard();
  }

  function renderToolbar(root) {
    /**
     * Why we have used 'root' as an argument here?
     * Removing it from the function does not lead to any changes!
     */
    const toolbar = document.createElement('div');
    root.appendChild(toolbar);
    toolbar.setAttribute('id', 'toolbar');

    const turnLeftButton = document.createElement('button');
    turnLeftButton.innerHTML = 'TURN-LEFT';
    turnLeftButton.addEventListener('click', function () {
      turn('left');
    });

    /**
     * In the addEventListener function, the first argument is the event it self (which 
     * is 'click' in this case), while the second argument is the event that should be
     * triggered when the the event 'click' is fired up. In the case above, you have created 
     * a new local function that has an internal function "turn('left')". The question is:
     * Why you have created a new local function instead of using the "turn('left')" function
     * directly as the second argument?
     * I tried removing that new local function and using the turn('left') function as the second
     * argument, but it did not work. Why is that happening?
     */


    toolbar.appendChild(turnLeftButton);

    const moveButton = document.createElement('button');
    moveButton.innerHTML = 'MOVE';
    moveButton.addEventListener('click', function () {
      move();
    });
    toolbar.appendChild(moveButton);

    const turnRightButton = document.createElement('button');
    turnRightButton.innerHTML = 'TURN-RIGHT';
    turnRightButton.addEventListener('click', function () {
      turn('right');
    });
    toolbar.appendChild(turnRightButton);
  }

  function renderBoardContainer(root) {
    const board = document.createElement('div');
    board.setAttribute('id', 'board');
    root.appendChild(board);
  }

  function renderBoard() {
    console.log('rendering'); 
    // All console.log functions will not work in our case here because we are not using
    // node for debugging. I assume this line was added by mistake, isn't it?
    
    const elem = document.getElementById('board');
    
    elem.innerHTML = '';
    /**Commenting out elem.innerHTML = ''; will cause the board to be multiplied
     * each time I click on a button. Why is that?
    */

    board[robot.y][robot.x] = 'R' + trailIndicators[robot.dir];

    const table = document.createElement('table');
    elem.appendChild(table);
    for (let row = board.length - 1; row >= 0; row--) {
      const cells = board[row];
      /**
       * You have declared a new constant 'cells' which will equal to one row of the board.
       * Therefore, in the first iteration, the 'cells' will equal to [T,T,.,F]. Is that correct?
       * That means that 'cells' is now a new array. Am I understanding it correctly?
       */
      const tr = document.createElement('tr');
      table.appendChild(tr);
      let rowHtml = '';
      for (let col = 0; col < cells.length; col++) {
        const cell = cells[col] === '.' ? '' : cells[col];
        // alert(cells[col]);
        rowHtml += `<td>${cell}</td>`;
      }
      /** Is the purpose of this nested For loop to draw each element of each row?
       *  I have added an alert statement to show what cells[col] is actually doing.
       *  Since the parent FOR loop is actually drawing each row, 
       *  so why we need to draw each element in the second FOR loop? 
       */


      tr.innerHTML = rowHtml;
    }
  }

  function move() {
    console.log('executing move()'); //non-functional here.
    let x = robot.x;
    let y = robot.y;

    switch (robot.dir) {
      case 'up':
        y = y < board.length - 1 ? y + 1 : y;
        break;
      case 'down':
        y = y > 0 ? y - 1 : y;
        break;
      case 'left':
        x = x > 0 ? x - 1 : x;
        break;
      case 'right':
        x = x < board[y].length - 1 ? x + 1 : x;
        break;
    }

    const cell = board[y][x];

    if (cell === '.' || cell === 'F' || cell === 'A') { //Again, no Apples in this Robot-4 App.
      board[robot.y][robot.x] = trailIndicators[robot.dir];
      robot.x = x;
      robot.y = y;
      if (cell === 'F') {
        console.log(`flag reached in ${moves} moves and ${turns} turns`);// Non-functional.
        if (applesEaten > 0) { //These commands of Apples are not yet applicable.
          console.log('total apples eaten: ' + applesEaten);
        }
      } else if (cell === 'A') {
        applesEaten += 1;
        console.log('apple eaten: YUM');
      }
    } else {
      console.log('move blocked by obstacle');
    }

    moves += 1;
    renderBoard();
  }

  function turn(turnDirection) {
    //What is the purpose of the IF statement below? It seems that it does not do anything.
    //I have commented it out, and no changes happened.
    if (turnDirection !== 'left' && turnDirection !== 'right') {
      console.log('ignoring invalid turn', turnDirection);
      return;
    }

    console.log('executing turn()');

    switch (robot.dir) {
      case 'up':
        robot.dir = turnDirection === 'left' ? 'left' : 'right';
        break;
      case 'down':
        robot.dir = turnDirection === 'left' ? 'right' : 'left';
        break;
      case 'left':
        robot.dir = turnDirection === 'left' ? 'down' : 'up';
        break;
      case 'right':
        robot.dir = turnDirection === 'left' ? 'up' : 'down';
        break;
    }

    turns += 1;
    renderBoard();
  }

  window.onload = renderAll;
/**Using window.onload is not very clear. We are using IIFE at the top of this js file,
 * which means that this js will be executed automatically from the first instance. So why
 * we need to add window.onload?
 * 
 * One more point, the renderAll is a function, and no () were used. It is still working
 * with or without them. Is there anything special to mention here?
 */

})();
