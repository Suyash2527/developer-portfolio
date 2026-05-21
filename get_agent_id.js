const { AgentsClient } = require("@google-cloud/dialogflow-cx");

// Use the local credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = "d:\\portfolio\\google-credentials.json";
const projectId = "portfolio-f3a7b";
const location = "us-central1";

async function listAgents() {
  const client = new AgentsClient({
    apiEndpoint: `${location}-dialogflow.googleapis.com`
  });
  const parent = client.locationPath(projectId, location);
  
  try {
    const [agents] = await client.listAgents({ parent });
    console.log("FOUND_AGENTS_COUNT:", agents.length);
    agents.forEach(agent => {
      console.log(`AGENT_NAME: ${agent.displayName}`);
      console.log(`AGENT_ID_PATH: ${agent.name}`); // projects/.../locations/.../agents/<UUID>
      
      const uuid = agent.name.split("/").pop();
      console.log(`REAL_UUID: ${uuid}`);
    });
  } catch (err) {
    console.error("Error listing agents:", err);
  }
}

listAgents();
