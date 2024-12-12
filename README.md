# Final Project - Casino

This project is a casino system implemented in TypeScript. It is structured into different folders that group the game logic, interfaces, models, menus, and data necessary for its operation. This README details the project structure and the steps needed to set up the development environment.

## Project Structure

```plaintext
├── Docs/                     # Folder for documentation
│   ├── UML_Diagram.png       # UML diagram image
│   └── functional_tests.pdf  # Document containing functional test details
|
|
├── Data/                    # Folder containing data files such as balance
│   ├── balance.txt          # Text file where the user's balance is stored
│
├── Interfaces/              # Folder containing project interfaces
│   └── IBet.ts              # Interface for betting games
│
├── View/                          # Folder for user interaction menus
│   ├── balanceMenu.ts             # Menu for managing user balance
│   ├── blackjackMenu.ts           # Menu for Blackjack game
│   ├── menuSlotMachines.ts        # Menu for Slot Machine games|
│   ├── menuSimpleSlotMachines.ts  # Menu for Simple Slot Machine games
│   └── sicboMenu.ts               # Menu for Sicbo game
│
├── src/                     # Main source code folder
│   ├── Models/              # Contains the main classes and system models
│   │   ├── Balance.ts       # Class for managing user balance
│   │   ├── Casino.ts        # Main class that manages the casino
│   │   ├── GameManager.ts   # Class for managing the available games
│   │   └── Games.ts         # Abstract class defining the base structure for casino games
│   │
│   ├── Games/                     # Contains specific game classes
│   │   ├── Blackjack.ts           # Implementation of the Blackjack game
│   │   ├── DeluxeSlotMachine.ts   # Implementation of the Deluxe Slot Machine game
│   │   ├── Sicbo.ts               # Implementation of the Sicbo game
│   │   ├── SimpleSlotMachine.ts   # Implementation of the Simple Slot Machine game
│   │   └── SlotMachine.ts         # Base class for slot machine games
│
├── README.md                # File with the project description and usage instructions
├── index.ts                 # Main file to run the project
├── menu.ts                  # Main console menu for interacting with the casino
│
├── package.json             # npm configuration file, including project dependencies
├── package-lock.json        # Lock file for project dependencies
└── tsconfig.json            # TypeScript configuration file



