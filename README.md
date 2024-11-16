# Final Project - Casino

This project is a casino system implemented in TypeScript. It is structured into different folders that group the game logic, interfaces, models, and data necessary for its operation. This README details the project structure and the steps needed to set up the development environment.

## Project Structure

```plaintext
.
├── Data/                    # Folder containing data files such as balance and registered users
│   ├── balance.txt          # Text file where the casino balance is stored
│
├── Docs/                    # Folder for project documentation
│   └── UML.png              # UML diagram representing the project design
│
├── Interfaces/              # Folder containing project interfaces
│   └── IBet.ts              # Interface for betting games
│
├── src/                      # Main source code folder
│   ├── Models/               # Contains the main classes and system models
│   │   ├── Casino.ts         # Main class that manages the casino
│   │   ├── GameManager.ts    # Class for managing games
│   │   ├── Balance.ts        # Class for managing balance
│   │   └── Games.ts          # Abstract class defining the base structure for casino games
│   │
│   ├── Games/                     # Contains specific game classes
│   │   ├── Blackjack.ts           # Implementation of the Blackjack game
│   │   ├── Sicbo.ts               # Implementation of the Sicbo game
│   │   ├── SlotMachine.ts         # Slot machine game class
│   │   ├── SlotMachineDeluxe.ts   # Implementation of the Deluxe Slot Machine game
│   │   └── SlotMachineSimple.ts   # Implementation of the Simple Slot Machine game
│
├── README.md               # File with the project description and usage instructions
├── index.ts                # Main file to run the project
├── menu.ts                 # Console menu for interacting with the casino
│
├── package.json            # npm configuration file, including project dependencies
└── .gitignore              # Files and folders to be excluded from the repository










