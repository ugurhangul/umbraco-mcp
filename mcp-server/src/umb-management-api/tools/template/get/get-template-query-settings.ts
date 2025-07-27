import { UmbracoManagementClient } from "@umb-management-client";
import { CreateUmbracoTool } from "@/helpers/create-umbraco-tool.js";

const GetTemplateQuerySettingsTool = CreateUmbracoTool(
  "get-template-query-settings",
  "Gets the template query settings. Returns available document type aliases, properties, and operators for template queries.",
  {},
  async () => {
    const client = UmbracoManagementClient.getClient();
    const response = await client.getTemplateQuerySettings();
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }
);

export default GetTemplateQuerySettingsTool;
