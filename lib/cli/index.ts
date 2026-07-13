/**
This is the entry point for the command-line interface.

Its job is to:
    .Read the command-line arguments
    .Decide which command the user wants
    .Call the appropriate file
 **/

import createConfig from "../config/createConfig";
import start from "../bin"

const command = process.argv.slice(2)[0]

switch (command) {
    case "init":
        createConfig();
        break;

    case "analyze":
        start()
        break;
}