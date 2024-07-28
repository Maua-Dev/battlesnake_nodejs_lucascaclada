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
    'PlayerTail',
    'NextMove'
];

window.onload = () => {
    getMatchData();

    board = document.querySelector('#board');

    let turnDisplay = document.querySelector('#currentTurn');
    document.querySelector('#previousTurn').addEventListener('click', _ => {
        if(turnIndex < 1) turnIndex -= 1;
        turnDisplay.innerText = turnIndex;
        renderTurn()
    });
    document.querySelector('#nextTurn').addEventListener('click', _ => {
        if(turnIndex < turnCount - 2) turnIndex += 1;
        turnDisplay.innerText = turnIndex;
        renderTurn()
    });
    document.addEventListener('wheel', event => {
        if(event.wheelDelta > 0){
            if(turnIndex > turnCount - 2) return;
            turnIndex += 1;
            turnDisplay.innerText = turnIndex;
        } else{
            if(turnIndex < 1) return;
            turnIndex -= 1;
            turnDisplay.innerText = turnIndex;
        }
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
function createTile(tileData){
    let tile = document.createElement('div');
    tile.classList = ['cell'];

    if(tileData.rewardStats.food) tile.classList.add('food');
    
    let type = tileData.tileType;
    if(type == 0){

    }
    else if(type > 1 && type < 5){
        tile.classList.add('snake');
    }
    else if(type >= 5 && type < 8){
        tile.classList.add('player');
    }
    else if(type == 8){
        tile.classList.add('next-move');
    }

    tile.appendChild(createLabel(tileNames[tileData.tileType]));
    tile.appendChild(createLabel(`d${tileData.dangerValue}`));
    tile.appendChild(createLabel(`r${tileData.rewardValue}`));
    tile.appendChild(createLabel(`s${tileData.section}`));

    return tile;
}

// Generate board
function renderTurn(data = matchData){
    board.innerHTML = '';
    let turn = data[turnIndex];
    for(let y = 10; y >= 0; y--){
        for(let x = 0; x < 11; x++){
            let tileData = turn.tiles[`x${x}-y${y}`];
            let tile = createTile(tileData);
            tile.onclick = () => {
                console.log(tileData.dangerStats)
            }
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
