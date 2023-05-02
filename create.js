// added the 'readline' module to allow user input
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// created a new class called Atm
class Atm {

    // constructor for the Atm class. It sets up instance variables
    constructor(fName, lName, accType, accNo, pin, bal) {
        this.fName = fName;
        this.lName = lName;
        this.accType = accType;
        this.accNo = accNo;
        this.pin = pin;
        this.bal = bal;
    }

    // this method allows the user to log in to the ATM
    logIn() {

        // sets up a counter for the number of incorrect PIN attempts
        let i = 0

        // defines a function that asks for the PIN and checks it
        const askForPin = () => {

            rl.question("\nWhat is your pin number?\n", pins => {

                // if the pin is correct, welcome the user and go to the userQ method
                if (pins == this.pin) {
                    console.log("\nWelcome " + this.fName + "!\n")
                    this.userQ()
                }

                // if the pin is incorrect and the user has attempted it 4 times, close the program
                else if (i == 4) {
                    console.log("\nTOO MANY ATTEMPTS!!")
                    rl.close()
                }

                // if the pin is incorrect and the user has not attempted it 4 times, inform the user and ask again
                else {
                    console.log("\nIncorrect input")
                    askForPin()
                    i++
                }
            })
        }

        // call the askForPin function to start the login process
        askForPin()
    }


    // method to ask the user which action they would like to take
    userQ() {
        // define a function that asks the user for a number and takes an action based on that number
        const askForNum = () => {

            console.log("*******************************************")


            rl.question("Press the number you would like: \n1. View Account \n2. Withdraw \n3. Lodge \n4. Change Pin \n5. View Balance\n*******************************************\n--> ", ans => {

                // if the user presses 1, view their account
                if (ans == 1) {
                    this.#viewAcc()
                }

                // if the user presses 2, bring them to the withdraw money method
                else if (ans == 2) {
                    this.#withdraw()
                }

                // if the user presses 3, bring them to the lodge money method 
                else if (ans == 3) {
                    this.#lodge()
                }

                // if the user presses 4, allow them to change their pin
                else if (ans == 4) {
                    this.#changePin()
                }

                // if the user presses 5, allow them to view their balance
                else if (ans == 5) {
                    this.#viewBal()
                }

                // if the user enters an invalid number, inform them and ask again
                else {
                    console.log("\nInvalid Choice. Please Try Again");
                    askForNum()
                }
            })
        }

        // call the askForNum function to start the userQ process
        askForNum()
    }

    // private method to view the account
    #viewAcc() {
        // print some formatting and account details
        console.log("\n*******************************************")

        console.log("Name: " + this.fName + " " + this.lName 
            + "\nAccount Type: " + this.accType
            + "\nAccount Number: " + this.accNo
            + "\nBalance: ####")

        console.log("*******************************************")

        // ask the user whether they want to view the balance or continue with additional services
        rl.question("\nPress enter when done", n => {

            // define a function to handle user input for balance viewing or additional services
            const viewing = () => {
                rl.question("\nView Balance? [Y/N]: ", yuh => {

                    // set variables to represent 'yes' and 'no' inputs
                    var l = "y"
                    var k = "n"

                    // if user wants to view balance, call viewBal method
                    if (yuh == l.toLowerCase()) {
                        this.#viewBal()
                    }

                    // if user wants additional services, call userQ method
                    else if (yuh == k.toLowerCase()) {

                        // define a function to handle user input for additional services
                        const add = () => {
                            rl.question("\nAdditional Services? [Y/N]: ", ye => {

                                // if user wants additional services, call userQ method
                                if (ye == l.toLowerCase()) {
                                    this.userQ()
                                }

                                // If user doesn't want additional services, close the program
                                else if (ye == k.toLowerCase()) {
                                    rl.close()
                                }

                                // If user inputs invalid response, prompt user again
                                else {
                                    console.log("Incorrect input")
                                    add()
                                }
                            })
                        }
                        add()
                    }

                    // If user inputs invalid response, prompt user again
                    else {
                        console.log("Incorrect input")
                        viewing()
                    }
                })
            }
            viewing()
        })
    }





    // private method to view the balance
    #viewBal() {

        // print balance
        console.log("\n*******************************************")
        console.log("Balance: $" + this.bal)
        console.log("*******************************************")

        // ask user if they need additional services
        rl.question("\nPress enter when done", n => {
            const add = () => {
                // ask for additional services
                rl.question("\nAdditional Services? [Y/N]: ", ye => {
                    var l = "y"
                    var k = "n"
                    if (ye == l.toLowerCase()) {
                        // if user needs additional services, go to userQ method
                        this.userQ()
                    }
                    else if (ye == k.toLowerCase()) {
                        // if user does not need additional services, close the program
                        rl.close()
                    }
                    else {
                        // if user inputs an incorrect value, ask again for additional services
                        console.log("Incorrect input")
                        add()
                    }
                })
            }
            add()
        })

    }




    // private method to withdraw money
    #withdraw() {
        console.log("\n*******************************************")
        // Define a function called 'wrong' to handle the withdrawal process.
        const wrong = () => {

            // Ask the user for the amount to withdraw.
            rl.question("How much are you withdrawing?\n--> ", lod => {

                // Convert the input into a floating point number.
                const amount = parseFloat(lod);

                // Check if the input is not a number.
                if (isNaN(amount)) {
                    // If the input is not a number, inform the user and prompt for input again.
                    console.log("\nInvalid amount!");
                    wrong();
                }

                // Check if the amount to withdraw is less than the balance in the account.
                else if (amount < this.bal) {
                    // If the amount to withdraw is less than the balance in the account, calculate the new balance and inform the user.
                    const newBalance = this.bal - amount;
                    console.log("\nNew Balance: $" + newBalance);
                    console.log("*******************************************");
                    // Prompt the user for additional services.
                    add();
                }

                else {
                    // If the amount to withdraw is greater than the balance in the account, inform the user and prompt for input again.
                    console.log("\nInsufficient funds!");
                    wrong();
                }

            })
        }
        wrong()






        // Define a function called 'add' to handle additional services.
        const add = () => {

            // Ask the user if they need additional services.
            rl.question("\nAdditional Services? [Y/N]: ", ye => {

                // Define lowercase string values for the user's input.
                var l = "y"
                var k = "n"

                // Check if the user needs additional services.
                if (ye == l.toLowerCase()) {
                    // If the user needs additional services, call the userQ() method.
                    this.userQ();
                }

                // Check if the user does not need additional services.
                else if (ye == k.toLowerCase()) {
                    // If the user does not need additional services, close the readline interface.
                    rl.close();
                }

                else {
                    // If the user enters an invalid input, inform the user and prompt for input again.
                    console.log("Incorrect input");
                    add();
                }
            })


        }
    }



    // private method to lodge money
    #lodge() {
        console.log("\n*******************************************")
        const wrong = () => {
            // ask the user for the amount to lodge.
            rl.question("How much are you lodging?\n--> ", lod => {
                // Convert the input into a floating point number.
                const amount = parseFloat(lod)

                // Check if the input is a valid number
                if (isNaN(amount)) {
                    console.log("\nInvalid amount!")
                    wrong()
                }

                // If the amount is valid, update the balance and display new balance
                else {
                    const newBalance = this.bal + amount;
                    console.log("\nNew Balance: $" + newBalance)
                    console.log("*******************************************")
                    add()
                }

            })
        }
        // Call the wrong function to prompt user for the amount to lodge
        wrong()

        // Private function to ask if user wants to perform additional operations
        const add = () => {
            rl.question("\nAdditional Services? [Y/N]: ", ye => {

                var l = "y"
                var k = "n"

                // If user selects 'y' for additional services, prompt for operation
                if (ye == l.toLowerCase()) {
                    this.userQ()
                }

                // If user selects 'n' for additional services, close the application
                else if (ye == k.toLowerCase()) {
                    rl.close()
                }

                // If the input is invalid, prompt again for input
                else {
                    console.log("Incorrect input")
                    add()
                }
            })


        }

    }




    // private method to change their pin
    #changePin() {
        console.log("\n*******************************************")

        // function to prompt user for their current pin number
        const wrong = () => {
            rl.question("Please enter your current pin number\n--> ", lod => {
                const pinn = parseFloat(lod)

                // if the user entered the correct pin, prompt for new pin number
                if (pinn == this.pin) {
                    const haa = () => {
                        rl.question("\nPlease enter your new pin number [FOUR DIGITS]\n-->", neh => {

                            // if the user enters a valid 4-digit pin, change the pin and return to main menu
                            if (neh.length == 4) {
                                console.log("\nPin Change Successful!")
                                add()
                            }

                            // if the user entered an invalid pin, prompt again
                            else {
                                console.log("\nInvalid Pin Input")
                                haa()
                            }
                        })
                    }
                    haa()
                }

                // if the user entered an invalid pin, prompt again
                else {
                    console.log("\nInvalid Pin Number")
                    wrong()
                }
            })
        }
        wrong()

        // function to handle additional services after changing pin
        const add = () => {
            rl.question("\nAdditional Services? [Y/N]: ", ye => {
                var l = "y"
                var k = "n"

                // if user chooses additional services, return to main menu
                if (ye == l.toLowerCase()) {
                    this.userQ()
                }

                // if user chooses to exit, close the program
                else if (ye == k.toLowerCase()) {
                    rl.close()
                }

                // if user enters an invalid input, prompt again
                else {
                    console.log("Incorrect input")
                    add()
                }
            })


        }

    }



}
// create an instance of the ATM class with a new customer
var xxx = new Atm("Graye", "Addams", "Student Account", 2908458, 1234, 7308.47)

// log in the customer using the logIn method and print the result to the console
console.log(xxx.logIn())