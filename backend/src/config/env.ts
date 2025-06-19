import { config } from 'dotenv';
config();

export const projectEndpoint = process.env.PROJECT_ENDPOINT || '';
// export const aiSearchConnectionId = process.env.AI_SEARCH_CONNECTION_ID || '';
// export const bingGroundingConnectionId = process.env.BING_GROUNDING_CONNECTION_ID || '';
export const model = process.env.MODEL_DEPLOYMENT_NAME || 'gpt-4o';
export const agentId = process.env.AGENT_ID || '';

validateEnvironment();

function validateEnvironment(): void {
    if (!projectEndpoint) {
        throw new Error('Please set the endPoint environment variable.');
    }


    if (!model) {
        throw new Error('Please set the AI_MODEL environment variable.');
    }

    if (!agentId) {
        throw new Error('Please set the agentId environment variable.');
    }
}