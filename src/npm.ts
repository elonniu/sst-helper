import {execSync} from "child_process";
import {promises as fs} from "fs";

export function getRoot() {
    return execSync('npm root -g').toString().trim() + '/ibench';
}

export async function currentVersion() {
    const packages = getRoot() + '/package.json';
    const packageData = await fs.readFile(packages, 'utf-8');
    return JSON.parse(packageData).version;
}
