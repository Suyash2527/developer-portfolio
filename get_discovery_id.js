const { EngineServiceClient } = require("@google-cloud/discoveryengine");

process.env.GOOGLE_APPLICATION_CREDENTIALS = "d:\\portfolio\\google-credentials.json";
const projectId = "portfolio-f3a7b";
const location = "global";

async function listEngines() {
  const client = new EngineServiceClient();
  const parent = `projects/${projectId}/locations/${location}/collections/default_collection`;
  
  try {
    const [engines] = await client.listEngines({ parent });
    console.log("FOUND_ENGINES_COUNT:", engines.length);
    engines.forEach(engine => {
      console.log(`ENGINE_NAME: ${engine.displayName}`);
      console.log(`ENGINE_ID_PATH: ${engine.name}`); 
    });
  } catch (err) {
    console.error("Error listing engines:", err);
  }
}

listEngines();
