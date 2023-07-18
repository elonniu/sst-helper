import {execSync} from "child_process";
import {promises as fs} from "fs";

export function getRoot(packageName: string) {
    return execSync('npm root -g').toString().trim() + '/' + packageName;
}

export async function getPackageProperty(packageName: string, key: string, defaultVal: any = undefined) {
    const packages = getRoot(packageName) + '/package.json';
    const packageData = await fs.readFile(packages, 'utf-8');
    const json = JSON.parse(packageData);

    return json[key] ? json[key] : defaultVal;
}

export async function currentVersion(packageName: string) {
    return getPackageProperty(packageName, 'version');
}
