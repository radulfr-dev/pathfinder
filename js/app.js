(function() {

    // On initialisation, size up the grid depending on the available area  

    const pathfinderGrid = document.getElementsByClassName('pathfinder-grid')[0];
    let startingPoint;
    let endPoint;

    // Get the height of the document

    let bodyHeight = document.querySelector('body').clientHeight;

    // Set the height of the grid space to 75% of this height

    let gridDimension = (bodyHeight * 0.75) + "px";

    pathfinderGrid.style.height = gridDimension;
    pathfinderGrid.style.width = gridDimension;

    let gridBoxSize = parseInt(gridDimension) / 50;
    console.log(gridBoxSize);

    for(let y = 0; y < 50; y++){

        let rowDiv = document.createElement('div');
        rowDiv.setAttribute('class', 'row');
        rowDiv.setAttribute('data-row-number', y);
        rowDiv.style.height = gridBoxSize + 'px';
        pathfinderGrid.appendChild(rowDiv);

        for(let x = 0; x < 50; x++){

            let colDiv = document.createElement('div');
            colDiv.setAttribute('class', 'col x' + x + '-y' + y);
            colDiv.setAttribute('data-col-number-x', x);
            colDiv.setAttribute('data-col-number-y', y);
            colDiv.setAttribute('data-type', "blank");
            colDiv.style.width = gridBoxSize + 'px';
            colDiv.style.height = gridBoxSize + 'px';

            rowDiv.appendChild(colDiv);

            // Set the initial start and end points where appropriate

            if(y == 2 && x == 2){

                // This is the default starting location

                colDiv.setAttribute('data-type', "start");
                colDiv.style.backgroundColor = 'black';
                startingPoint = colDiv;

            }else if(y == 47 && x == 47){

                // This is the default ending location

                colDiv.setAttribute('data-type', "end");
                colDiv.style.backgroundColor = 'blue';
                endPoint = colDiv;

            }

        }

    }

    pathfinderGrid.addEventListener('mousedown', function(e){
        
        let hoveredSq = e.target;

        if(hoveredSq.getAttribute("data-type") == "start"){

            trackNewSquare(pathfinderGrid, hoveredSq, "start");

        }else if(hoveredSq.getAttribute("data-type") == "end"){

            trackNewSquare(pathfinderGrid, hoveredSq, "end");

        }else{
            /* alert("There has been an error! Please refresh the browser and try again!"); */
        }

        switch(hoveredSq.getAttribute("data-type")){

            case "start":
                trackNewSquare(pathfinderGrid, hoveredSq, "start");
                break;

            case "end":
                trackNewSquare(pathfinderGrid, hoveredSq, "end");
                break;

            case "blank":

                // Start making walls

                hoveredSq.setAttribute('data-type', "wall");
                hoveredSq.classList.toggle('wall');

                break;

            case "wall":
                
                break;

            default:

                break;

        }


    });

    // The below is a quick and nasty way to make walls for testing with

    pathfinderGrid.addEventListener('click', function(e){

        let selectedSquare = e.target;

        if(selectedSquare.getAttribute("data-type") == "blank"){

            hoveredSq.setAttribute('data-type', "wall");
            hoveredSq.classList.toggle('wall');

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

                    currentSquare.setAttribute("data-type", "blank");
                    currentSquare.style.backgroundColor = "white";

                    newSquare.setAttribute("data-type", "start");
                    newSquare.style.backgroundColor = "black";

                    startingPoint = newSquare;
                    
                break;

                case "end":

                    currentSquare.setAttribute("data-type", "blank");
                    currentSquare.style.backgroundColor = "white";

                    newSquare.setAttribute("data-type", "end");
                    newSquare.style.backgroundColor = "blue";

                    endPoint = newSquare;

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

    // Attach functionality to the Go button

    const goButton = document.querySelector('.go-button');

    goButton.addEventListener('click', function(e){

        console.log(document.getElementsByClassName('dfdsfdfds'));

        delayedLoop();

    });

    // FUNCTION FOR SCANNING

    // A square can have a number of different states :-
    // Blank - The default state. Yet to be checked, can be converted to an active or wall state.
    // Active - The square is ready to identify the squares around it.
    // Wall - The square cannot be passed through or converted to anything.
    // Inactive - This square was blank, active and now having scanned it's surrounding squares is inactive.
    // Start - The starting point. Active by default.
    // End - The as-of-yet unknown end to our to-be-found path.

    // Methodology
    
    // Create an array to store active squares in. The loops that runs through and drives
    // the algorithm will be designed to continue whilst this array is not empty. The loop
    // in question will also be converting blank squares into active squares as part of it's
    // functionality, therefore driving it continually until all blank squares are gone, or
    // when the path is found.

    

    // The square object

    // Each square needs to keep account of it's state, and it's resistance factor. The resistance
    // factor is a number allocated which is used to calculate the likelihood of this square being
    // in the final path that the algorithm provides.

    // State
    // Resistance
    // Scan function

    let activeSquares = [startingPoint];

    let index = 1;
    

    function mainScan(){

        for(let x = 0; x < index; x++){

            console.log('Iteration: ' + x);
            console.log(activeSquares);

            let thisSquare = activeSquares.shift();
            let thisSquareIndices = {
                "x": thisSquare.getAttribute('data-col-number-x'),
                "y": thisSquare.getAttribute('data-col-number-y')
            }

            // Check top, then right, then bottom, then left squares for status
            // Up : reduce Y by 1
            // Right : increase X by 1
            // Down : increase Y by 1
            // Left : reduce X by 1

            let squaresToCheck = [
                [parseInt(thisSquareIndices['x']), parseInt(thisSquareIndices['y']) - 1],
                [parseInt(thisSquareIndices['x']) + 1, parseInt(thisSquareIndices['y'])],
                [parseInt(thisSquareIndices['x']), parseInt(thisSquareIndices['y']) + 1],
                [parseInt(thisSquareIndices['x']) - 1, parseInt(thisSquareIndices['y'])]
            ];

            for(let t = 0; t < squaresToCheck.length; t++){

                getSquareData(squaresToCheck[t]);

            }

           
            index = activeSquares.length;
    
        }

    }

    function getSquareData(indices){

        let classString = 'x' + indices[0] + '-y' + indices[1];
        let newSquare = document.getElementsByClassName(classString);

        let validSquare = !(newSquare.length < 1);

        if(validSquare){
            newSquare = newSquare[0];
        }
        
        if(validSquare && newSquare.getAttribute('data-type') == "blank"){

            newSquare.setAttribute('data-type', 'active');
            newSquare.classList.toggle("active");
            activeSquares.push(newSquare);

        }else if(validSquare && newSquare.getAttribute('data-type') == "end"){
            alert('End found! Now make the path!');
        }

    }

    function delayedLoop(){
        
        setTimeout(function(){

            console.log(activeSquares);

            let thisSquare = activeSquares.shift();
            let thisSquareIndices = {
                "x": thisSquare.getAttribute('data-col-number-x'),
                "y": thisSquare.getAttribute('data-col-number-y')
            }

            // Check top, then right, then bottom, then left squares for status
            // Up : reduce Y by 1
            // Right : increase X by 1
            // Down : increase Y by 1
            // Left : reduce X by 1

            let squaresToCheck = [
                [parseInt(thisSquareIndices['x']), parseInt(thisSquareIndices['y']) - 1],
                [parseInt(thisSquareIndices['x']) + 1, parseInt(thisSquareIndices['y'])],
                [parseInt(thisSquareIndices['x']), parseInt(thisSquareIndices['y']) + 1],
                [parseInt(thisSquareIndices['x']) - 1, parseInt(thisSquareIndices['y'])]
            ];
            
            for(let t = 0; t < squaresToCheck.length; t++){

                getSquareData(squaresToCheck[t]);

            }

            if(activeSquares.length > 0){
                delayedLoop();
            }

        }, 5);

    }
  

})();