(function() {

    // On initialisation, size up the grid depending on the available area  

    const pathfinderGrid = document.getElementsByClassName('pathfinder-grid')[0];

    // Get the height of the document

    let bodyHeight = document.querySelector('body').clientHeight;

    // Set the height of the grid space to 75% of this height

    let gridDimension = (bodyHeight * 0.75) + "px";

    pathfinderGrid.style.height = gridDimension;
    pathfinderGrid.style.width = gridDimension;

    let gridBoxSize = parseInt(gridDimension) / 50;
    console.log(gridBoxSize);

    for(let x = 0; x < 50; x++){

        let rowDiv = document.createElement('div');
        rowDiv.setAttribute('class', 'row');
        rowDiv.setAttribute('data-row-number', x);
        rowDiv.style.height = gridBoxSize + 'px';
        pathfinderGrid.appendChild(rowDiv);

        for(let y = 0; y < 50; y++){

            let colDiv = document.createElement('div');
            colDiv.setAttribute('class', 'col');
            colDiv.setAttribute('data-col-number-x', x);
            colDiv.setAttribute('data-col-number-y', y);
            colDiv.setAttribute('data-is-start', "false");
            colDiv.setAttribute('data-is-end', "false");
            colDiv.style.width = gridBoxSize + 'px';
            colDiv.style.height = gridBoxSize + 'px';

            rowDiv.appendChild(colDiv);

            // Set the initial start and end points where appropriate

            if(x == 2 && y == 2){

                // This is the default starting location

                colDiv.setAttribute('data-is-start', "true");
                colDiv.setAttribute('data-is-end', "false");
                colDiv.style.backgroundColor = 'black';

            }else if(x == 47 && y == 47){

                // This is the default ending location

                colDiv.setAttribute('data-is-end', "true");
                colDiv.setAttribute('data-is-start', "false");
                colDiv.style.backgroundColor = 'blue';

            }

        }

    }

    pathfinderGrid.addEventListener('mousedown', function(e){
        
        let hoveredSq = e.target;

        if(hoveredSq.getAttribute("data-is-start") == "true" &&
        hoveredSq.getAttribute("data-is-end") == "false"){

            trackNewSquare(pathfinderGrid, hoveredSq, "start");

        }else if(hoveredSq.getAttribute("data-is-end") == "true" &&
        hoveredSq.getAttribute("data-is-start") == "false"){

            trackNewSquare(pathfinderGrid, hoveredSq, "end");

        }else{
            alert("There has been an error! Please refresh the browser and try again!");
        }
    });

    function trackHoveredSquares(event){

        console.log(event);

    }

    function getNewSquare(){


        let nodeList = document.querySelectorAll(":hover");
        return nodeList[nodeList.length - 1];

    }

    function trackNewSquare(grid, currentSquare, positionToChange){

        grid.addEventListener('mousemove', trackHoveredSquares);
        grid.addEventListener('mouseup', function(e2){

            grid.removeEventListener('mousemove', trackHoveredSquares);

            let newSquare = getNewSquare();

            switch(positionToChange){

                case "start":

                    currentSquare.setAttribute("data-is-start", "false");
                    currentSquare.setAttribute("data-is-end", "false");

                    currentSquare.style.backgroundColor = "white";
                    newSquare.setAttribute("data-is-end", "false");
                    newSquare.setAttribute("data-is-start", "true");
                    newSquare.style.backgroundColor = "black";
                    
                break;

                case "end":

                    currentSquare.setAttribute("data-is-end", "false");
                    currentSquare.setAttribute("data-is-start", "false");

                    currentSquare.style.backgroundColor = "white";
                    newSquare.setAttribute("data-is-end", "true");
                    newSquare.setAttribute("data-is-start", "false");
                    newSquare.style.backgroundColor = "blue";

                break;

                default:
                    alert("There has been an error! Please refresh the browser and try again!");
                    break;

            }

            

        });

    }

    // Attach click event to grid for the changing of the default start and finish positions

    function changeDefaultPosition(gridObject){



    }

    document.addEventListener('mouseup', function(e){
        pathfinderGrid.removeEventListener('mousemove', trackHoveredSquares);

    });


    

})();