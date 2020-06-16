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
            colDiv.setAttribute('data-col-number', y);
            colDiv.setAttribute('data-is-start', "false");
            colDiv.setAttribute('data-is-end', "false");
            colDiv.style.width = gridBoxSize + 'px';
            colDiv.style.height = gridBoxSize + 'px';

            rowDiv.appendChild(colDiv);

            // Attach click events for selecting / deselecting grid
            // elements for pathfinder functionality

            colDiv.addEventListener('click', function(e){

                if(colDiv.getAttribute('data-is-start') == "false"){

                    resetStartPoints();

                    colDiv.setAttribute('data-is-start', "true");
                    colDiv.style.backgroundColor = 'black';

                }

            });

            // Set the initial start and end points where appropriate

            if(x == 2 && y == 2){

                // This is the default starting location

                colDiv.setAttribute('data-is-start', "true");
                colDiv.style.backgroundColor = 'black';

            }else if(x == 47 && y == 47){

                // This is the default ending location

                colDiv.setAttribute('data-is-end', "true");
                colDiv.style.backgroundColor = 'blue';

            }

        }

    }

    function resetStartPoints(){

        let cols = document.getElementsByClassName('col');

        for(let x = 0; x < cols.length; x++){

            cols[x].setAttribute('data-is-start', "false");
            cols[x].style.backgroundColor = "white";

        }

    }


    

})();