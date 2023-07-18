import {CloudFormationClient, DescribeStacksCommand} from "@aws-sdk/client-cloudformation";
import {getAllRegions} from "./ec2.js";
import {stackUrl} from "./console.js";

export async function stackInAllRegions(stackName: string) {
    const regions = await getAllRegions();
    const promises = regions.map(async region => {

        if (!region) {
            return null;
        }

        const client = new CloudFormationClient({region});
        try {
            const command = new DescribeStacksCommand({StackName: stackName});
            const response = await client.send(command);
            if (!response || !response.Stacks || response.Stacks.length === 0) {
                return null;
            }
            return {
                ...response.Stacks[0],
                region,
            };
        } catch (err: any) {
            if (err.code !== "ValidationError") {
                return null;
            }
            return null;
        }

    });

    return (await Promise.all(promises)).filter(item => item);
}

export async function stackExistsAndCompleteInAllRegions(stackName: string) {
    const stacks = await stackInAllRegions(stackName);

    let list = [];

    for (const stack of stacks) {

        if (!stack) {
            continue;
        }

        list.push({
            ...stack,
            url: stack.StackId ? stackUrl(stack.StackId, stack.region) : "",
            deployed: stack.StackStatus && stack.StackStatus.indexOf("COMPLETE") !== -1
        });

    }

    return list.filter(item => item.deployed);
}

export async function getStackDeploymentsRegionIds(stackName: string) {
    const list = await stackExistsAndCompleteInAllRegions(stackName);
    return list.map(item => item.region);
}

export async function checkStackInRegions(StackName: string, regions: string[], appName: string) {
    const deployRegions = await getStackDeploymentsRegionIds(StackName);
    const notDeployRegions = regions.filter((region) => !deployRegions.includes(region));
    if (notDeployRegions.length > 0) {
        if (deployRegions.length > 0) {
            throw new Error(`${appName} not in [${notDeployRegions.join(',')}] yet, available regions [${deployRegions.join(',')}]`);
        } else {
            throw new Error(`${appName} not in [${notDeployRegions.join(',')}] yet`);
        }
    }
}
