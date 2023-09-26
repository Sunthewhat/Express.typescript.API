import dotenv from "dotenv";
function DotEnvConfig() {
  const result = dotenv.config({ path: ".env.local" });

  if (result.error) {
    dotenv.config({ path: ".env" });
  }
}

export default DotEnvConfig;
