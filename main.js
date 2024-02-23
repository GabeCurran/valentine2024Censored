let wordCounter = 0;
let pCounter = 0;
let letterDelay = 50;
let scrollCounter = 0;
let paragraphDelay = 1000;
let pauseDelay = 500;
let typing = false;
let german = false;
let translateEvent = false;
let originalTextFinished = false;

// If user scrolls down, type faster
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 200) {
//         letterDelay = 5;
//         paragraphDelay = 25;
//         pauseDelay = 0;
//     }
// });

// If user presses arrow down, type faster
window.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowDown') {
        letterDelay = 1;
        paragraphDelay = 1;
        pauseDelay = 0;
    }
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// import keyboard sound
let keyboardSound = new Audio('assets/keyboardSound.mp3');
keyboardSound.loop = true;
keyboardSound.volume = 0.1;

function iosAudioPolicy() {
    keyboardSound.muted = false
    song.muted = false
    keyboardSound.play();
    keyboardSound.pause();
    song.play();
    song.pause();
    iosWindow.removeEventListener('click', iosAudioPolicy);
}

// to handle ios audio policy
iosWindow = window;
iosWindow.addEventListener('click', iosAudioPolicy);

// import song
let song = new Audio('assets/flyMeToTheMoon.mp3');
song.volume = 0.25;

const mainParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fermentum orci eu ante pretium, a dapibus ipsum semper. Suspendisse egestas enim rutrum nibh laoreet finibus. Sed sollicitudin, arcu id pellentesque tempor, purus magna luctus sem, quis pretium magna massa in risus. Aliquam fringilla metus ante, nec sollicitudin enim vehicula eu. Aenean turpis nisl, bibendum quis ligula eu, varius aliquam diam. Suspendisse potenti. In eget ullamcorper turpis. Curabitur bibendum arcu urna, ac dictum risus ultrices eget. Suspendisse risus est, hendrerit vel mi ac, venenatis sodales erat. Aliquam magna urna, ultricies non rhoncus vitae, volutpat et mi. Pellentesque scelerisque libero sed velit lacinia euismod.";

const germanParagraph = "Der Kunde ist sehr wichtig, dem Kunden wird der Kunde folgen. Etwas Hefe-Klinikfußball vor dem Preis, ein Protein selbst immer. Suspendisse egestas enim rutrum nibh laoreet limits. Aber es tut mir leid, es tut mir leid, es tut mir leid, es tut mir leid, es tut mir leid, was ist der Preis für eine große Menge Gelächter? Manche Menschen fürchten sich davor und machen sich keine Sorgen um Fußballfahrzeuge. Aenean turpis nisl, wer sollte eine Tasse Fußball trinken, einen bestimmten Geldbetrag. Smartphones Brauche eine weiterführende Schule. Ich spreche vom Trinken aus der Lichtbogenurne, und das besagte Lachen muss gespielt werden. Er ist ein Gespött, der Hendrerit Vel Miac, die Mitglieder der Venenatis. Eine große Urne, die Unheil des Lebens, des Lebens und meines. Kinder wollen frei sein, aber sie wollen Lacinia Euismod."

const goodbye = "Vivamus bibendum cursus finibus.";

const germanGoodbye = "Lebe, um am Ende des Kurses zu trinken."

const signature = "- Gabe";

const paragraphs = [mainParagraph, goodbye, signature];

let typedParagraph = document.querySelector('.typedParagraph');

const translateButton = document.querySelector('#translateButton');

async function type(typedParagraph, paragraphs) {
    pauseLetters = ['.', '!', '?', ','];

    let counter = 0;
    for (paragraph of paragraphs) {

        for (letter of paragraph) {
            // Add current letter
            typedParagraph.innerHTML += letter;

            if (pauseLetters.includes(letter)) {
                keyboardSound.pause();
                await sleep(pauseDelay);
            }
            else {
                keyboardSound.play();
                await sleep(letterDelay);
            }
        }
        // Add line break
        typedParagraph.innerHTML += '<br><br>';
        counter++;

        if (counter == 3) {
            keyboardSound.pause();
        }

        await sleep(paragraphDelay);
    }
    keyboardSound.remove();
    typing = false;

    await sleep(1000);
    
    song.play();
    swapColors();
    originalTextFinished = true;

    if (originalTextFinished) {
        if (translateEvent == false) {
            translateButton.addEventListener('click', translate);
            translateEvent = true;
        }
    }
    
};

let heart = document.querySelector('#heart');
let heartText = document.querySelector('#heartText');
let heartImage = document.querySelector('#heartImage');

let pulseFlag = true;

// Make heart pulse with sinusoidal function
async function pulse() {
    let counter = 0;
    while (pulseFlag == true) {
        let scale = 1 + Math.sin(counter) / 75;
        heart.style.transform = `scale(${scale})`;
        counter += 0.1;
        await sleep(16);
    }
}

pulse();

// If user clicks on the heart, make it grow and fade out
heartImage.addEventListener('click', fadeOut);

// Add it to the text as well
heartText.addEventListener('click', fadeOut);

async function fadeOut() {
    heartText.removeEventListener('click', fadeOut);
    heart.removeEventListener('click', fadeOut);

    if (pulseFlag) {

        pulseFlag = false;

        // fix heart transform
        heart.style.transform = '';

        // make heart text fade out
        heartText.classList.toggle('fade');

        let heartImage = document.querySelector('#heartImage');

        // make heart grow to cover the screen and fade out
        heart.classList.toggle('grow');

        // after 3 seconds, fade out the heart
        await sleep(3000);

        heart.classList.toggle('fade');
        heartImage.classList.toggle('fade');

        let cover = document.querySelector('#cover');
        cover.classList.toggle('fade');

        // Delete heart, text and cover
        await sleep(2000);
        heart.remove();
        heartText.remove();
        heartImage.remove();
        cover.remove();

        type(typedParagraph, paragraphs);
    }
}


// Now, swap the color scheme slowly
function swapColors() {
    let body = document.querySelector('body');
    body.classList.toggle('swap');

    // Add translate button
    translateButton.classList.toggle('fadein');
}

// If user clicks on translate button, translate text
function translate() {

    const germanParagraphs = [germanParagraph, germanGoodbye, signature];

    if (german == false) {
        german = true;
        typedParagraph.innerHTML = germanParagraph + '<br><br>' + germanGoodbye + '<br><br>' + signature;

        // Translate button too
        translateButton.innerHTML = 'Translate to Latin';
    }
    else {
        german = false;
        typedParagraph.innerHTML = mainParagraph + '<br><br>' + goodbye + '<br><br>' + signature;

        // Translate button too
        translateButton.innerHTML = 'Übersetzen in Deutsch';
    }
}
