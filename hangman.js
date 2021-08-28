/*
Author:
Name:Chian ZhengHang
Student ID:p2025845

Date started: 9 July 2020
Date completed: 
*/

/*This programme is a hangman game. This game extracts 10 words from word pools depending on any of the 3 
theme player chooses. The player can guess the word a letter at a time or the whole word. The player
loses a life when he guessed a letter or whole word wrong. The player loses
and get hanged when he loses all the lives. The player has 3 different lifelines he can use once*/
var input = require('readline-sync');
var fs = require("fs");


//function to choose to output existing overall game data for player if any
function lookatstats(position) {
    //Advanced feature 1: Player can choose to display stats
    var gamedatapresent = true;
    try {
        fs.readFileSync(filename).toString('utf-8');
    }
    catch (err) {
        console.log("\n" + game.playername + " does not have any existing game data");
        gamedatapresent = false;
    }
    //Extracting overall game data to output if overall game data is present
    if (gamedatapresent) {
        while (true) {
            var statq = input.question("\nDo you want to look at your overall stats(Y for yes, N for no): ");
            if (statq == "Y" || statq == "y") {
                console.log()
                var gamedata = fs.readFileSync(filename).toString('utf-8');
                gamedata = gamedata.split(/\r?\n/);
                gamedata = gamedata.splice(0, 7);
                gamedata = gamedata.join("\n");
                console.log(gamedata);
                if (position == "start") {
                    input.question("\nPress enter to continue");
                }
                else {
                    console.log("\nThank you for playing hangman!");
                }
                break;
            }
            else if (statq == "N" || statq == "n") {
                break;
            }
            else {
                console.log(errortext);
            }
        }
    }
}

//Function to choose theme
function choosetheme() {
    while (true) {
        var themenum = input.question("\nChoose your theme:\nEnter 1 for Clothing\nEnter 2 for Weapons\nEnter 3 for Periodic Table\nEnter 0 to quit\nPlease enter your choice: ");
        if (Number.isInteger(+themenum) && themenum.length == 1) {
            themenum = parseInt(themenum);
            if ((0 <= themenum) && (themenum <= 3)) {
                break;
            }
        }
        else {
            console.log(errortext);
        }

    }
    //Advanced feature 2: 3 themes/categories of words
    if (themenum == 1) {
        themedefin = "Words_definition\\clothingdefinitions.txt";
        return "Words\\clothing.txt";
    }
    else if (themenum == 2) {
        themedefin = "Words_definition\\weaponsdefinitions.txt";
        return "Words\\weapons.txt";
    }
    else if (themenum == 3) {
        themedefin = "Words_definition\\periodic_tabledefinitions.txt";
        return "Words\\periodic_table.txt";
    }
    else {
        //Advanced feature 6: Player can quit the game
        process.exit();
    }
}

//Hangman display functions
function hangman0() {
    return ("");
}
function hangman1() {
    return ("\n\n\n\n\n\n\n\n _________ ");
}
function hangman2() {
    return ("\n\n\n\n _ _ \n|   |_____\n|\t  |\n|_________|\n");
}
function hangman3() {
    return ("\n  |\n  |\n  |\n  |\n _|_ \n|   |_____\n|\t  |\n|_________|\n");
}
function hangman4() {
    return ("  _____\n  |\t|\n  |\n  |\n  |\n _|_ \n|   |_____\n|\t  |\n|_________|\n");
}
function hangman5() {
    return ("  _____\n  |\t|\n  |\tO\n  |\n  |\n _|_ \n|   |_____\n|\t  |\n|_________|\n");
}
function hangman6() {
    return ("  _____\n  |\t|\n  |\tO\n  |     |  \n  |\n _|_\n|   |_____\n|\t  |\n|_________|");
}
function hangman7() {
    return ("  _____\n  |\t|\n  |\tO\n  |   - |\n  |\n _|_ \n|   |_____\n|\t  |\n|_________|");
}
function hangman8() {
    return ("  _____\n  |\t|\n  |\tO\n  |   - | -\n  |\n _|_ \n|   |_____\n|\t  |\n|_________|");
}
function hangman9() {
    return ("  _____\n  |\t|\n  |\tO\n  |   - | -\n  |    /\n _|_ \n|   |_____\n|\t  |\n|_________|");
}
function hangman10() {
    return ("  _____\n  |\t|\n  |\tO\n  |   - | -\n  |    / \\\n _|_\n|   |_____\n|\t  |\n|_________|\n");
}
var hangmanfuncarray = [hangman10(), hangman9(), hangman8(), hangman7(), hangman6(), hangman5(), hangman4(), hangman3(), hangman2(), hangman1(), hangman0()];

class Word {
    constructor(word, definition) {
        this.word = word;
        this.defin = definition;
    }
}

class WordCollection {
    constructor() {
        this.gameprogress = 1;
        this.score = 0;
        this.lives = 10;
        this.fullavalletterdis = "A B C D E F G H I J K L M\nN O P Q R S T U V W X Y Z";
        this.lifeline1 = true;
        this.lifeline2 = true;
        this.lifeline3 = true;
        this.lifeline3activate = false
        this.lifeline1text = "1:Show all vowels of the word";
        this.lifeline2text = "2:Show the definition of the word";
        this.lifeline3text = "3:Skip the word and score a point";
        this.correctlist = []
        this.skiplist = []
        this.wordanddefinobjarray = []
    }
    intro() {
        //method to introduce games and its rules
        console.log("Rules of this hangman game: \nChoose a theme and guess the words(you can guess the word or a letter at a time).\nYou have 10 lives, you lose when all lives are lost and you get hanged.\nEach wrong guess will result in a lost of a life\nEach word correctly guessed will score 1 point.\nThere are 10 words in total you have to guess\nYou have 3 different lifelines which you can use once each");
        console.log("If you choose to skip a word, you will not lose lives");
    }
    name() {
        //method to get player's name
        console.log("-= Welcome to Hangman =-\n");
        this.playername = input.question("Please enter your name: ");
    }
    randomword10() {
        //method to extract 10 random words and their definitions from a word pool, make into object and store in array wordanddefinobjarray
        for (var i = 1; i <= 10; i++) {
            this.wordindex = Math.floor(Math.random() * this.wordlist.length);
            this.wordanddefinobjarray.push(new Word(this.wordlist[this.wordindex], this.definitionslist[this.wordindex]))
            this.wordlist.splice(this.wordindex, 1);
            this.definitionslist.splice(this.wordindex, 1);
        }
    }
    changeto_() {
        //method to change letters of word to _
        this.displaywordprogress = this.wordnow.replace(/\S/g, '_ ');
        this.displaywordprogress = this.displaywordprogress.slice(0, this.displaywordprogress.length - 1);
        this.displaywordprogressarray = this.displaywordprogress.split(" ");
    }
    wordguess() {
        //Advanced feature 5: Player can guess whole word
        //method to check if whole word guess is correct or not
        this.guess = input.question("\nGuess the word: ");
        this.guess = this.guess.toUpperCase();
        if (this.guess == this.wordnow) {
            this.displaywordprogressarray = this.wordnowarray;
        }
        else {
            console.log("\nSorry " + this.playername + ", the word you guess is wrong");
            this.lives -= 1;
        }
    }
    checkletter() {
        //method to check if letter is part of the word and take them out of the available letters to guess
        this.avalletterdisplay = this.avalletterdisplay.replace(this.guess, " ");
        if (this.wordnow.includes(this.guess)) {
            console.log("\nGreat work! " + this.guess + " is one of the letters!");
            for (var i = 0; i < this.wordnowarray.length; i++) {
                if (this.guess == this.wordnowarray[i]) {
                    this.displaywordprogressarray[i] = this.wordnowarray[i];
                }
                this.displaywordprogress = this.displaywordprogressarray.join(" ");
            }
        }
        else {
            console.log("\nSorry. " + this.guess + " is not part of the word");
            this.lives -= 1;
        }
    }
    lifelinemenu() {
        //method to choose and use lifelines
        if (!this.lifeline1 && !this.lifeline2 && !this.lifeline3) {
            console.log("\nAll lifelines already used.");
            this.guessfun();
        }
        else {
            while (true) {
                console.log("\n-=Lifelinemenu=-\n\n" + this.lifeline1text + "\n" + this.lifeline2text + "\n" + this.lifeline3text);
                this.lifelinenum = input.question("Choose your life line using the numbers or input 0 to go back: ");
                if (Number.isInteger(+this.lifelinenum)) {
                    this.lifelinenum = parseInt(this.lifelinenum);
                    if (this.lifelinenum == 1 && this.lifeline1) {
                        this.lifeline1 = false;
                        this.lifeline1text = this.lifeline1text + "(used)";
                        //Make avaliable letter to guess not have vowels anymore
                        this.avalletterdisplay = this.avalletterdisplay.replace("A", " ");
                        this.avalletterdisplay = this.avalletterdisplay.replace("E", " ");
                        this.avalletterdisplay = this.avalletterdisplay.replace("I", " ");
                        this.avalletterdisplay = this.avalletterdisplay.replace("O", " ");
                        this.avalletterdisplay = this.avalletterdisplay.replace("U", " ");
                        //Fill in vowels of the word for the player
                        for (var i = 0; i < this.wordnowarray.length; i++) {
                            if (this.wordnowarray[i] == "A") {
                                this.displaywordprogressarray[i] = "A";
                            }
                            if (this.wordnowarray[i] == "E") {
                                this.displaywordprogressarray[i] = "E";
                            }
                            if (this.wordnowarray[i] == "I") {
                                this.displaywordprogressarray[i] = "I";
                            }
                            if (this.wordnowarray[i] == "O") {
                                this.displaywordprogressarray[i] = "O";
                            }
                            if (this.wordnowarray[i] == "U") {
                                this.displaywordprogressarray[i] = "U";
                            }
                        }
                        this.displaywordprogress = this.displaywordprogressarray.join(" ");
                        break;
                    }
                    else if (this.lifelinenum == 2 && this.lifeline2) {
                        this.lifeline2 = false;
                        this.lifeline2text = this.lifeline2text + "(used)";
                        //output definition for word for player to read
                        console.log("\nPress enter once you finish reading")
                        input.question("The definition of the word is " + this.wordanddefinobjarray[this.gameprogress - 1].defin);
                        break;
                    }
                    else if (this.lifelinenum == 3 && this.lifeline3) {
                        this.lifeline3 = false;
                        this.lifeline3text = this.lifeline3text + "(used)";
                        //Let the player skip the word and gain 1 point
                        console.log("\nLifeline 3 used." + this.playername + " gains 1 point and skips the word.");
                        this.score += 1;
                        this.skiplist.push(this.wordnow);
                        this.lifeline3activate = true;
                        break;
                    }
                    else if (this.lifelinenum == 1 && !this.lifeline1) {
                        console.log("\nLifeline 1 already used.");
                    }
                    else if (this.lifelinenum == 2 && !this.lifeline2) {
                        console.log("\nLifeline 2 already used.");
                    }
                    else if (this.lifelinenum == 3 && !this.lifeline3) {
                        console.log("\nLifeline 3 already used.");
                    }
                    else if (this.lifelinenum == 0) {
                        break;
                    }
                    else {
                        console.log(errortext);
                    }
                }
                else {
                    console.log(errortext);
                }
            }
        }
    }
    guessfun() {
        //method to accept input which would lead to guessing a letter(default), lifelines, guessing whole word, skipping word and quitting.
        while (true) {
            this.guess = input.question("\n" + this.playername + "'s" + " guess ( Enter 9 for lifelines, 2 to guess whole word, 1 to skip this word, 0 to quit): ");

            if (this.guess.length == 1) {
                //check if input is a single letter and not guessed before
                if (this.guess.match(/^[a-zA-Z]+$/)) {
                    this.guess = this.guess.toUpperCase();
                    if (this.avalletterdisplay.includes(this.guess)) {
                        this.checkletter();
                        break;
                    }
                    else {
                        console.log("\nLetter already guessed before.");
                    }
                }
                else if (Number.isInteger(+this.guess)) {
                    //check if input is integer and invoke the relevant methods
                    this.guess = parseInt(this.guess)
                    if (this.guess == 1) {
                        this.skiplist.push(this.wordnow);
                        this.skip = true;
                        break;
                    }
                    else if (this.guess == 9) {
                        this.lifelinemenu();
                        break;
                    }
                    else if (this.guess == 2) {
                        this.wordguess();
                        break;
                    }
                    else if (this.guess == 0) {
                        //Advanced feature 6: Player can quit the game
                        console.log("\nThis game session information will not be saved.");
                        process.exit();
                    }
                    else {
                        console.log(errortext);
                    }
                }
                else{
                    console.log(errortext);
                }
            }
            else {
                console.log(errortext);
            }
        }
    }
    displayhangman() {
        //Method to output hangman corresponding to lives left
        console.log("\x1b[31m", hangmanfuncarray[this.lives], "\x1b[0m");//Advanced feature 7: colour
    }
    checkforend() {
        //Method to check if the word is already fully guessed
        if (this.displaywordprogressarray.includes("_")) {
            return false;
        }
        else {
            this.score += 1;
            console.log("\nGood job " + this.playername + "! You guessed the word " + this.wordnow + " right! You gain 1 score!");
            this.correctlist.push(this.wordnow);
            return true;
        }
    }

}

var errortext = "Error, input not accepted. Please enter acceptable input.\n";


//making game object using WordCollection class
var game = new WordCollection();

//inputting name
game.name();

var filename = "player_data\\" + game.playername + "data.txt";
//function to choose to output existing game data
lookatstats("start");

//Introduction to the hangman game
console.log();
game.intro();

//Choosing word themes
var theme = choosetheme();

//Advanced feature 3: All words and definitions stored in external file
var text = fs.readFileSync(theme).toString('utf-8');
var textbyline = text.split(/\r?\n/);
game.wordlist = textbyline;
text = fs.readFileSync(themedefin).toString('utf-8');
textbyline = text.split(/\r?\n/);
game.definitionslist = textbyline;

//Putting random 10 words and its definition in object form into wordanddefinobjarray
game.randomword10();

//getting rid of property that won't be used anymore
delete game.definitionslist;
delete game.wordlist;
delete game.wordindex;

//Getting date
var timebefore = Date.now()
var dateofgame = new Date()
dateofgame = "\nDate: " + dateofgame.getDate() + "/" + (dateofgame.getMonth() + 1) + "/" + dateofgame.getFullYear()

while (game.gameprogress < 11) {
    //Preparing for new word to guess
    game.avalletterdisplay = game.fullavalletterdis;
    game.wordnow = game.wordanddefinobjarray[game.gameprogress - 1].word.toUpperCase();
    game.wordnowarray = game.wordnow.split("");
    game.changeto_();
    console.log("\nWord " + game.gameprogress + " / 10");
    game.displayhangman();
    console.log(game.wordnow)
    while (true) {
        //Guessing the word
        console.log("\n" + game.displaywordprogress);
        console.log("\n" + game.avalletterdisplay);
        game.guessfun();
        if (game.checkforend()) {
            break;
        }
        if (game.lifeline3activate) {
            game.lifeline3activate = false;
            break;
        }
        game.displayhangman()
        if (game.lives == 0) {
            console.log("\n" + game.playername + " got hanged...");
            break;
        }
        if (game.skip) {
            game.skip = false;
            break;
        }

    }
    if (game.lives == 0) {
        break;
    }
    game.gameprogress += 1;
}
if (game.correctlist.length == 10) {
    console.log("\nAMAZING work! You guess all 10 words correct!");
}
else if (game.lives > 0) {
    console.log("\nGreat work " + game.playername + "! You did not get hanged and guessed " + game.correctlist.length + " word(s) right!");
}

//output information about how the player did for this game
console.log();
console.log(game.playername + "'s score for this game: " + game.score);
var timeafter = Date.now();
var timeused = (((timeafter - timebefore) / 1000) / 60).toFixed(2);
game.correctlist = game.correctlist.join(", ");
console.log("Words " + game.playername + " guessed correct: " + game.correctlist);
game.skiplist = game.skiplist.join(", ");
console.log("Words " + game.playername + " skipped: " + game.skiplist);

//Advanced feature 4: Allow player to save player info, game data in external txt file
//Saving player's game data to txt file or deleting them
var line = "\n------------------------------------------------------------------------------------------------------------------------"
while (true) {
    console.log("\n1: Save this game data\n2: Wipe previous game data of player and save this games data\n3: Exit without saving this game's data\n4: Delete all of " + game.playername + "'s game data");
    savinginput = input.question(">>");
    if (Number.isInteger(+savinginput)) {
        savinginput = parseInt(savinginput);
        if (1 <= savinginput && savinginput <= 4) {
            if (savinginput == 1) {
                var playerdatapresent = true;
                var fileinfoend = dateofgame + "\nScore: " + game.score + "\nWords guessed correct: " + game.correctlist
                    + "\nWords skipped: " + game.skiplist + "\nTime spent: " + timeused + "min";
                try {
                    fs.readFileSync(filename).toString('utf-8');
                }
                catch (err) {
                    //If there is no existing player game data txt file, make new player game data and save game data
                    var fileinfo = "Player Name: " + game.playername + "\nNumber of Hangman games played: 1" + "\nTotal time spent on Hangman games: " + timeused + "min"
                        + "\nAverage time spent on Hangman games: " + timeused + "min"
                        + "\nHighest Score: " + game.score + "\nLowest Score: " + game.score + "\nAverage Score: " + game.score
                        + line
                        + "\nGame 1" + fileinfoend;
                    fs.writeFileSync(filename, fileinfo);
                    playerdatapresent = false;
                    console.log("\nNo exisiting player game data found.\nNew player game data file created.");
                }
                //If there is a existing player game data txt file, save game data to existing player game data
                if (playerdatapresent) {
                    var existingdata = fs.readFileSync(filename).toString('utf-8');
                    existingdata = existingdata.split(/\r?\n/);
                    var gamesplayed = existingdata[1].replace("Number of Hangman games played: ", "");
                    var totalgamescore = existingdata[6].replace("Average Score: ", "")
                    totalgamescore = parseInt(totalgamescore) * parseInt(gamesplayed) + game.score
                    gamesplayed = parseInt(gamesplayed) + 1;
                    var totaltimeplayed = existingdata[2].replace("Total time spent on Hangman games: ", "");
                    totaltimeplayed = totaltimeplayed.replace("min", "");
                    totaltimeplayed = parseFloat(totaltimeplayed) + parseFloat(timeused);
                    var averagetimeplayed = (totaltimeplayed / gamesplayed).toFixed(2);
                    var highestscore = existingdata[4].replace("Highest Score: ", "");
                    highestscore = parseInt(highestscore);
                    if (highestscore < game.score) {
                        highestscore = game.score;
                    }
                    var lowestscore = existingdata[5].replace("Lowest Score: ", "");
                    lowestscore = parseInt(lowestscore);
                    if (lowestscore > game.score) {
                        lowestscore = game.score;
                    }
                    var averagescore = totalgamescore / gamesplayed;
                    existingdata.splice(0, 7);
                    var fileinfo = "Player Name: " + game.playername + "\nNumber of Hangman games played: " + gamesplayed + "\nTotal time spent on Hangman games: " + totaltimeplayed.toFixed(2) + "min"
                        + "\nAverage time spent on Hangman games: " + averagetimeplayed + "min"
                        + "\nHighest Score: " + highestscore + "\nLowest Score: " + lowestscore + "\nAverage Score: " + averagescore.toFixed(2);
                    fileinfo = fileinfo + "\n" + existingdata.join("\n") + line
                        + "\nGame " + gamesplayed + fileinfoend;
                    fs.writeFileSync(filename, fileinfo);
                    console.log("\nGame data saved.");
                }

                break;
            }
            else if (savinginput == 2) {
                //Wipe old player game data and save new one
                var fileinfoend = dateofgame + "\nScore: " + game.score + "\nWords guessed correct: " + game.correctlist
                var fileinfo = "Player Name: " + game.playername + "\nNumber of Hangman games played: 1" + "\nTotal time spent on Hangman games: " + timeused + "min"
                    + "\nAverage time spent on Hangman games: " + timeused + "min"
                    + "\nHighest Score: " + game.score + "\nLowest Score: " + game.score + "\nAverage Score: " + game.score
                    + line
                    + "\nGame 1" + fileinfoend;
                fs.writeFileSync(filename, fileinfo);
                console.log("\n" + game.playername + " previous game data(if any) wiped\nNew game data saved.");
                break;
            }
            else if (savinginput == 3) {
                break;
            }
            else {
                //Deleting player game data
                var deletedata = true
                try {
                    fs.unlinkSync(filename);
                }
                catch (err) {
                    console.log("\n" + game.playername + " does not have any game data.");
                    deletedata = false
                }
                if (deletedata) {
                    console.log("\n" + game.playername + " game data deleted.");
                }
            }
        }
        else { console.log(errortext) };
    }
    else { console.log(errortext) };
}

//function to choose to output existing game data
lookatstats("end");
