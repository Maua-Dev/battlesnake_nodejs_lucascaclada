var tileTemplate;
var board;

const tileNames = [
    'Empty',
    'Food',
    'SnakeHead',
    'SnakeBody',
    'SnakeTail'
];

window.onload = () => {
    getMatchData();

    board = document.querySelector('#board');

    let turnDisplay = document.querySelector('#currentTurn');
    document.querySelector('#previousTurn').addEventListener('click', _ => {
        if(turnIndex > 0) turnIndex -= 1;
        turnDisplay.innerText = turnIndex;
        renderTurn()
    });
    document.querySelector('#nextTurn').addEventListener('click', _ => {
        if(turnIndex < turnCount - 1) turnIndex += 1;
        turnDisplay.innerText = turnIndex;
        renderTurn()
    });
}

var turnIndex = 0;
var turnCount = 0;
var matchData = [];

// Create tile label
function createLabel(value){
    let label = document.createElement('p');
    label.innerText = value;
    return label;
}

// Create tile element
function createTile(type, danger, reward){
    let tile = document.createElement('div');
    tile.classList = ['cell'];
    if(type == "Food"){
        tile.classList.add('food');
    }
    if(type == "SnakeTail" || type == "SnakeBody" || type == "SnakeHead"){
        tile.classList.add('snake');
    }
    tile.appendChild(createLabel(type));
    tile.appendChild(createLabel(`d${danger}`));
    tile.appendChild(createLabel(`r${reward}`));
    return tile;
}

// Generate board
function renderTurn(data = matchData){
    board.innerHTML = '';
    let turn = data[turnIndex];
    for(let y = 0; y < 11; y++){
        for(let x = 0; x < 11; x++){
            let tileData = turn.tiles[`x${x}-y${y}`].content;
            let tile = createTile(tileNames[tileData.tileType], tileData.danger, tileData.reward);
            board.appendChild(tile);
        }
    }
}

// Fetch match data
function getMatchData(){
    fetch('/latestMatch').then((res) => {
        if(!res.ok){
            throw new Error(`HTTP error ${response.status}`);
        }
        return res.json();
    }).then(data => {
        matchData = data;
        turnIndex = 0;
        turnCount = matchData.length;
        renderTurn(matchData);
    });
}