const min: number = 2000;
const max: number = 8000;
let startTime: number = 0;
let endTime: number = 0;
let reactionTimeDelay: number = 0;
let delayComplete: boolean = false;  // Flag to track if delay is complete

basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
`);

input.onButtonPressed(Button.A, function () {
    reactionTimeDelay = Math.randomRange(min, max); // Random delay
    basic.showLeds(`
        . . . . .
        . # # # .
        . # . # .
        . # # # .
        . . . . .
    `);
    delayComplete = false;  // Reset the flag before starting new round
    basic.pause(reactionTimeDelay); // Wait for random time
    delayComplete = true;  // Set flag to true, allowing button B press
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
    `);
    startTime = control.millis(); // Record start time
});

input.onButtonPressed(Button.B, function () {
    if (delayComplete) {  // Only process Button B after delayComplete is true
        endTime = control.millis(); // Record end time
        let reactionTime = (endTime - startTime) / 10; // Calculate reaction time
        basic.showNumber(reactionTime); // Display reaction time

        // Reset the game after displaying the time
        basic.pause(1000); // Show result for 1 second
        basic.clearScreen(); // Clear the display
        startTime = 0; // Reset start time
        endTime = 0; // Reset end time
        reactionTimeDelay = 0; // Reset the random delay
        delayComplete = false;  // Reset the flag for next round

        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
        `); // Ready for next round
    }
});