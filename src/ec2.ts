import {DescribeRegionsCommand, EC2Client} from "@aws-sdk/client-ec2";

export async function getAllRegions(configuration = {}) {

    const client = new EC2Client(configuration);

    const command = new DescribeRegionsCommand({AllRegions: true});

    const response = await client.send(command);
    if (!response.Regions) {
        return [];
    }

    return response.Regions && response.Regions.map(region => region.RegionName);

}
