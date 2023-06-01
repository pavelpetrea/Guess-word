let options = ['rock', 'box', 'paper', 'object', 'word', 'signer', 'laptop',
'clock', 'ronaldo', 'alphabet'];
let word = options[Math.floor(Math.random() * options.length)];
        let lives = 7;
        let guessedLetters = [];
        let wordContainer = document.getElementById("wordContainer");
        let livesCount = document.getElementById("livesCount");
        let guessInput = document.getElementById("guessInput");
        let guessButton = document.getElementById("guessButton");
        let message = document.getElementById("message");

        for (let i = 0; i < word.length; i++) {
            let span = document.createElement("span");
            span.className = "underline";
            wordContainer.appendChild(span);
            span.textContent = "_";
        }
        guessButton.addEventListener("click", function() {
            let guess = guessInput.value.toLowerCase();
            guessInput.value = "";
            if (guess.length === 1 && /^[a-z]$/.test(guess)) {
                if (guessedLetters.includes(guess)) {
                    message.textContent = "You've already guessed this letter.";
                } else if (word.includes(guess)) {
                    guessedLetters.push(guess);
                    for (let i = 0; i < word.length; i++) {
                        if (word[i] === guess) {
                            let spans = wordContainer.getElementsByTagName("span");
                            spans[i].textContent = guess;
                        }
                    }
                    if (guessedLetters.length == word.length) {
                        endGame(true);
                    }
                } else {
                    lives--;
                    livesCount.textContent = lives;
                    if (lives == 0) {
                        endGame(false);
                    }
                }
            } else {
                message.textContent = "Try using valid letter.";
            }
            if (message.textContent != "") {
                message.classList.remove("hidden");
                setTimeout(function() {
                    message.textContent = "";
                    message.classList.add("hidden");
                }, 3000);
            }
        });
        function endGame(hasWon) {
            guessInput.disabled = true;
            guessButton.disabled = true;
            if (hasWon) {
                message.textContent = "Congrats! You've won!";
                message.style.color = "green";
            } else {
                message.textContent = "You've lost! The word was: " + word;
                message.style.color = "red";
            }
            message.classList.remove("hidden");
        }
