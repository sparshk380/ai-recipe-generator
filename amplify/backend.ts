import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";

const backend = defineBackend({
  auth,
  data,
});

const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  "https://bedrock-runtime.us-east-1.amazonaws.com",  // ✅ Change to ap-south-1
  {
    authorizationConfig: {
      signingRegion: "us-east-1", // ✅ Change to ap-south-1
      signingServiceName: "bedrock",
    },
  }
);

bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [
      "arn:aws:bedrock:us-east-1::foundation-model/meta.llama3-8b-instruct-v1:0", // ✅ Change to Llama 3 ARN
    ],
    actions: ["bedrock:InvokeModel"],
  })
);
