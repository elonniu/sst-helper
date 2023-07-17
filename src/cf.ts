import {CloudFormationClient, DescribeStacksCommand} from "@aws-sdk/client-cloudformation";
import {getAllRegions} from "./ec2.js";
import {stackUrl} from "./console.js";
import {Stack} from "@aws-sdk/client-cloudformation/dist-types/models/models_0.js";

export async function stackExistsAndCompleteInAllRegions(stackName: string) {
    const regions = await getAllRegions();
    const promises = regions.map(async region => {

        if (!region) {
            return {region, deployed: false};
        }

        const client = new CloudFormationClient({region});
        try {
            const command = new DescribeStacksCommand({StackName: stackName});
            const response = await client.send(command);
            if (!response || !response.Stacks || response.Stacks.length === 0) {
                return {region, deployed: false};
            }
            const stack: Stack = response.Stacks[0];
            return {
                region,
                url: stack.StackId ? stackUrl(stack.StackId, region) : "",
                deployed: stack.StackStatus && stack.StackStatus.indexOf("COMPLETE") !== -1
            };
        } catch (err: any) {
            if (err.code !== "ValidationError") {
                return {region, deployed: false};
            }
            return {region, deployed: false};
        }

    });

    return (await Promise.all(promises)).filter(item => item.deployed);
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
            throw new Error(`${appName} not in [${notDeployRegions.join(', ')}] yet, available regions [${deployRegions.join(', ')}]`);
        } else {
            throw new Error(`${appName} not in [${notDeployRegions.join(', ')}] yet`);
        }
    }
}
