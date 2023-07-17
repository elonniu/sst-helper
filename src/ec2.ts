import {DescribeRegionsCommand, EC2Client} from "@aws-sdk/client-ec2";

const client = new EC2Client({region: process.env.AWS_REGION});

export async function getAllRegions() {

    const command = new DescribeRegionsCommand({});
    try {
        const response = await client.send(command);
        if(!response.Regions){
            return [];
        }
        return response.Regions && response.Regions.map(region => region.RegionName);
    } catch (e) {
        console.error(e);
        return [];
    }
}
