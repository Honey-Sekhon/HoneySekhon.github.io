function closeModal() {
    var collapseElements = document.querySelectorAll('.collapse');
    console.log(collapseElements);
    collapseElements.forEach(function (collapseElement) {
        var isCollapsed = collapseElement.classList.contains('show');
        if (isCollapsed) {
            collapseElement.classList.remove('show');
        }
    });
}

const collapses = document.querySelectorAll('.collapse');

// Create a Collapse instance for each element
const collapseInstances = Array.from(collapses).map(element => {
    return new bootstrap.Collapse(element, {
        toggle: false
    });
});

// Add event listeners to handle showing and hiding collapses
collapses.forEach((element, index) => {
    element.addEventListener('show.bs.collapse', function (event) {
        // Check if the clicked button or its ancestor should be excluded
        if (!shouldExcludeCollapseButton(event.relatedTarget)) {
            // Hide all other collapses except the one being shown
            collapseInstances.forEach((collapse, i) => {
                // Check if the collapse should be excluded
                if (shouldExcludeCollapseButton(collapses[i])) {
                    return;  // Skip hiding for excluded buttons
                }

                if (i !== index) {
                    collapse.hide();
                }
            });
        } else {
            // Prevent the collapse for excluded buttons
            event.preventDefault();
        }
    });
});

// Function to determine if a collapse button or its ancestor should be excluded
function shouldExcludeCollapseButton(buttonElement) {
    // Check if the clicked button or its ancestor has the id "detailCollapsor"
    return buttonElement && buttonElement.closest('#detailCollapsor') !== null;
}