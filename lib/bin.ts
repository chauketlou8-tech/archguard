/*
executable script for the application
starts the application
 */

import run from "./utils/run"

export default function start() {
    const root = process.cwd();
    run(root);
}