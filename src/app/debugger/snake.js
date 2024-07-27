var tileTemplate;
var board;

const tileNames = [
    'Empty',
    'Food',
    'EnemyHead',
    'EnemyBody',
    'EnemyTail',
    'PlayerHead',
    'PlayerBody',
    'PlayerTail'
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
function createTile(type, danger, reward, set){
    let tile = document.createElement('div');
    tile.classList = ['cell'];

    if(type == 0){

    }
    else if(type == 1){
        tile.classList.add('food');
    }
    else if(type > 1 && type < 5){
        tile.classList.add('snake');
    }
    else{
        tile.classList.add('player');
    }

    tile.appendChild(createLabel(tileNames[type]));
    tile.appendChild(createLabel(`d${danger}`));
    tile.appendChild(createLabel(`r${reward}`));
    tile.appendChild(createLabel(`s${set}`));
    return tile;
}

// Generate board
function renderTurn(data = matchData){
    board.innerHTML = '';
    let turn = data[turnIndex];
    for(let y = 0; y < 11; y++){
        for(let x = 0; x < 11; x++){
            let tileData = turn.tiles[`x${x}-y${y}`];
            let tile = createTile(tileData.tileType, tileData.dangerValue, tileData.reward, tileData.set);
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