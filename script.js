//Variables
var userDraw = "x"; //Default value for drawing pattern
var compDraw = "o"; //Default value for computer pattern
var spaces = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //an array containing all the board spaces (default empty)
var terminalValue = false;
var xScore = 0; // computer score
var oScore = 0; // user score
var tieScore = 0;
var generalScore; // a variable that holds temporary which draw each player has to assign the respective score
var generalTag; // a variable tat holds temporary which score to write on bard
var score; //collects the score for Hard mode
var mode = "easy"; //default mode for the game [easy/hard]
var line; // a variable that holds the value to which board condition won to pass on the drawLine func




// choosing X/O player board
window.onload = function() {
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


modal.style.display = "block";
    
//Choosing Draw pattern (X/O)
$("#pickX").click(function() {
  modal.style.display = "none";
  userDraw = "x";
  compDraw = "o";
  resetScores();
});
$("#pickO").click(function() {
  modal.style.display = "none";
  userDraw = "o";
  compDraw = "x";
  resetScores();
});


// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Choosing Difficulties
$("#easy").click(function() {
  mode = "easy";
  $(this).css("background", 'url("http://i.imgur.com/TdXhjSI.jpg")');
  $("#hard").css("background", 'url("http://i.imgur.com/epcX3i8.jpg")');
});

$("#hard").click(function() {
  mode = "hard";
  $(this).css("background", 'url("http://i.imgur.com/xpHwnIC.jpg")');
  $("#easy").css("background", 'url("http://i.imgur.com/jmGMiCO.jpg")');
});

}




// function that initiates when you click on the board
function init(space) {
  if (typeof spaces[space - 1] === "number") {
    spaces[space - 1] = userDraw;
    $("#" + space).text(userDraw);
    if (terminalState(spaces, userDraw)) {
      assigningScores(userDraw);
      reset();
    } else if (boardfull(spaces)) {
      tieScore++;
      $("#tieNum").text(tieScore);
      reset();
    } else {
      if (mode=="easy"){
      compEasy();
      }
      else{
      compHard();
      }
    }
  }
}

//assigning scores for the win to the board
function assigningScores(drawing) {
  if (drawing == "o") {
    oScore++;
    generalScore = oScore;
    generalTag = "O";
  } else {
    xScore++;
    generalScore = xScore;
    generalTag = "X";
  }
  drawLine(line);
  $("#scoreNum" + generalTag).text(generalScore);
  reset();
}

//Easy calculation for the computer
function compEasy() {
  var randomSpace = Math.floor(Math.random() * 9) + 1;
  if (typeof spaces[randomSpace - 1] === "number") {
    $("#" + randomSpace).text(compDraw);
    spaces[randomSpace - 1] = compDraw;
    if (terminalState(spaces, compDraw)) {
      assigningScores(compDraw);
    } else if (boardfull(spaces)) {
      tieScore++;
      $("#tieNum").text(tieScore);
      reset();
    }
  } else {
    compEasy();
  }
}


//Hard calculation for the computer
function compHard(){
  var bestSpot = minimax(spaces, compDraw);
  $("#"+(bestSpot.position+1)).text(compDraw);
  spaces[bestSpot.position] = compDraw;
   if (terminalState(spaces,compDraw)) {
      assigningScores(compDraw);
   }
      else if (boardfull(spaces)) {
      tieScore++;
      $("#tieNum").text(tieScore);
      reset();
}
}

//Checks for win states for the current board state & also for the minimax algorithm
function terminalState(board, player) {
  if (board[0] == player && board[1] == player && board[2] == player) {
    line = 1;
    return true;
  } else if (board[3] == player && board[4] == player && board[5] == player) {
    line = 2;
    return true;
  } else if (board[6] == player && board[7] == player && board[8] == player) {
    line = 3;
    return true;
  } else if (board[0] == player && board[3] == player && board[6] == player) {
    line = 4;
    return true;
  } else if (board[1] == player && board[4] == player && board[7] == player) {
    line = 5;
    return true;
  } else if (board[2] == player && board[5] == player && board[8] == player) {
    line = 6;
    return true;
  } else if (board[0] == player && board[4] == player && board[8] == player) {
    line = 7;
    return true;
  } else if (board[2] == player && board[4] == player && board[6] == player) {
    line = 8;
    return true;
  } else {
    return false;
  }
}

//a function that draws a line if someone wins
function drawLine(pattern) {
  switch (pattern) {
    case 1:
      $(".lines").attr("src", "http://i.imgur.com/LwFldaA.png");
      break;
    case 2:
      $(".lines").attr("src", "http://i.imgur.com/U1pvXLU.png");
      break;
    case 3:
      $(".lines").attr("src", "http://i.imgur.com/eiM6Yzr.png");
      break;
    case 4:
      $(".lines").attr("src", "http://i.imgur.com/RGofq99.png");
      break;
    case 5:
      $(".lines").attr("src", "http://i.imgur.com/XczOXDh.png");
      break;
    case 6:
      $(".lines").attr("src", "http://i.imgur.com/dAIp12n.png");
      break;
    case 7:
      $(".lines").attr("src", "http://i.imgur.com/VFPnjcr.png");
      break;
    default:
      $(".lines").attr("src", "http://i.imgur.com/B9Thqkm.png");
  }
}

//function that resets the board
function reset() {
  setTimeout(function pame() {
    $(".lines").attr("src", "");

    for (i = 1; i < 10; i++) {
      $("#" + [i]).text("");
    }
    spaces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }, 3000);
}

//a function that checks if a board is full
function boardfull(board) {
  var collect = board.filter(function(s) {
    return s != "x" && s != "o";
  });
  if (collect.length == 0) {
    return true;
  }
}

//a function that collects all the emptyIndexes for minimax algorithm
function emptyIndexies(board) {
  var collect = board.filter(function(s) {
    return s != "x" && s != "o";
  });
  return collect;
}

var bestSpot = minimax(spaces, compDraw);

//minimax algorithm (bread & butter of hard mode)
function minimax(boardArray, player) {
    var newIndex = emptyIndexies(boardArray);

  //assigning scores for predicted moves
    if (terminalState(boardArray, userDraw)){
     return {score:-10};
  }
	else if (terminalState(boardArray, compDraw)){
    return {score:10};
	}
  else if (newIndex.length === 0){
  	return {score:0};
  }

  var moves = [];

 //itterates through empty space on the board using recursive process
  for (var i = 0; i < newIndex.length; i++) {
    var move = {};
    move.position = boardArray[newIndex[i]];
    boardArray[newIndex[i]] = player;

    if (player == compDraw) {
      var result = minimax(boardArray, userDraw);
      move.score = result.score;
    } else {
      var result = minimax(boardArray, compDraw);
      move.score = result.score;
    }
    boardArray[newIndex[i]] = move.position;
    moves.push(move);
  }

  //calculates what is the bestMove from the moves object
  var bestMove;
  if (player === compDraw) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}


// a function that resets the scores variables and the board
function resetScores() {
  xScore = 0; // computer score
  oScore = 0; // user score
  tieScore = 0;
  line=0;
  $("#scoreNumX").text("");
  $("#scoreNumO").text("");
  $("#tieNum").text("");
}

