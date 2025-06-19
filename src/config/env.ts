import { config } from 'dotenv';
config();


// export const aiSearchConnectionId = process.env.AI_SEARCH_CONNECTION_ID || '';
// export const bingGroundingConnectionId = process.env.BING_GROUNDING_CONNECTION_ID || '';
export const projectEndpoint = process.env.PROJECT_ENDPOINT|| '';
export const apiKey = process.env.AZURE_API_KEY || '';
export const agentId = process.env.AGENT_ID || '';
export const modelDeploymentName = process.env.MODEL_DEPLOYMENT_NAME || 'gpt-4o';

validateEnvironment();

function validateEnvironment(): void {
    if (!projectEndpoint) {
        throw new Error('Please set the project Endpoint environment variable.');
    }

    if (!apiKey) {
        console.warn('apiKey is not set. apiKey will not work.');
    }

    if (!modelDeploymentName) {
        throw new Error('Please set the AI_MODEL environment variable.');
    }

    if (!agentId) {
        throw new Error('Please set the agentId environment variable.');
    }
}