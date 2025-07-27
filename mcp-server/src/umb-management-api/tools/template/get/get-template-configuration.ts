import { UmbracoManagementClient } from "@umb-management-client";
import { CreateUmbracoTool } from "@/helpers/create-umbraco-tool.js";

const GetTemplateConfigurationTool = CreateUmbracoTool(
  "get-template-configuration",
  "Gets the template configuration settings. Returns configuration information for template management.",
  {},
  async () => {
    const client = UmbracoManagementClient.getClient();
    const response = await client.getTemplateConfiguration();
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

export default GetTemplateConfigurationTool;
