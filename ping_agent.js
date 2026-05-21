const { SessionsClient } = require("@google-cloud/dialogflow-cx");

process.env.GOOGLE_APPLICATION_CREDENTIALS = "d:\\portfolio\\google-credentials.json";
const projectId = "portfolio-f3a7b";
const agentId = "agent_1779340266049";
const sessionId = Math.random().toString(36).substring(7);

const regions = [
  "global",
  "us-central1",
  "us-east1",
  "us-east4",
  "us-west1",
  "europe-west1",
  "europe-west2",
  "europe-west4",
  "asia-northeast1",
  "asia-south1",
  "australia-southeast1"
];

async function pingAgent() {
  console.log(`Trying to connect to agent ${agentId} across all regions...`);
  
  for (const loc of regions) {
    try {
      const apiEndpoint = loc === "global" ? "global-dialogflow.googleapis.com" : `${loc}-dialogflow.googleapis.com`;
      const client = new SessionsClient({ apiEndpoint });
      
      const sessionPath = client.projectLocationAgentSessionPath(projectId, loc, agentId, sessionId);
      
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: "Hello",
          },
          languageCode: "en",
        },
      };

      console.log(`Pinging region: ${loc}...`);
      const [response] = await client.detectIntent(request);
      
      console.log(`\n✅ SUCCESS! The agent lives in region: ${loc}`);
      console.log(`Response from agent:`, response.queryResult.responseMessages[0].text.text[0]);
      return; // Exit on success
    } catch (err) {
      // It will throw NOT_FOUND if it's not in this region
      // console.log(`Failed in ${loc}: ${err.message}`);
    }
  }

  console.log("\n❌ Could not connect to the agent in ANY region.");
}

pingAgent();
