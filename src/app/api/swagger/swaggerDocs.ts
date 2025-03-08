import yaml from "js-yaml";
import fs from "fs";
import path from "path";


const swaggerYamlPath = path.join(process.cwd(), "src/app/api/swagger/swagger.yaml");


const swaggerDocument = yaml.load(fs.readFileSync(swaggerYamlPath, "utf-8")) as Record<string, any>;

export default swaggerDocument;
