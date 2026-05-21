const { AgentsClient } = require("@google-cloud/dialogflow-cx");

process.env.GOOGLE_APPLICATION_CREDENTIALS = "d:\\portfolio\\google-credentials.json";
const projectId = "portfolio-f3a7b";

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

async function findAgent() {
  console.log("Searching for your agent across all regions...");
  let found = false;

  for (const loc of regions) {
    try {
      const apiEndpoint = loc === "global" ? "global-dialogflow.googleapis.com" : `${loc}-dialogflow.googleapis.com`;
      const client = new AgentsClient({ apiEndpoint });
      const parent = client.locationPath(projectId, loc);
      
      const [agents] = await client.listAgents({ parent });
      if (agents.length > 0) {
        found = true;
        console.log(`\n✅ FOUND in region: ${loc}`);
        agents.forEach(agent => {
          console.log(`- Name: ${agent.displayName}`);
          const uuid = agent.name.split("/").pop();
          console.log(`- UUID: ${uuid}`);
          console.log(`\n(Put this UUID in your .env.local file under DIALOGFLOW_CX_AGENT_ID)`);
          console.log(`(Also update DIALOGFLOW_CX_LOCATION=${loc})`);
        });
      }
    } catch (err) {
      // Ignore errors for regions that might not be enabled
    }
  }

  if (!found) {
    console.log("\n❌ Could not find any Dialogflow CX agents in this project.");
  }
}

findAgent();
