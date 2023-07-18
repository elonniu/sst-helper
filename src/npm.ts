import {execSync} from "child_process";
import {promises as fs} from "fs";

export function getRoot() {
    return execSync('npm root -g').toString().trim() + '/ibench';
}

export async function getPackageProperty(key: string, defaultVal: any = undefined) {
    const packages = getRoot() + '/package.json';
    const packageData = await fs.readFile(packages, 'utf-8');
    const json = JSON.parse(packageData);

    return json[key] ? json[key] : defaultVal;
}

export async function currentVersion() {
    return getPackageProperty('version');
}
