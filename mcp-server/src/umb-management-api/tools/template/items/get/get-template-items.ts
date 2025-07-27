import { UmbracoManagementClient } from "@umb-management-client";
import { CreateUmbracoTool } from "@/helpers/create-umbraco-tool.js";
import { getItemTemplateQueryParams } from "@/umb-management-api/umbracoManagementAPI.zod.js";

const GetTemplateItemsTool = CreateUmbracoTool(
  "get-template-items",
  "Gets template items by their IDs. Returns a list of template items with basic information.",
  getItemTemplateQueryParams.shape,
  async (params) => {
    const client = UmbracoManagementClient.getClient();
    const response = await client.getItemTemplate(params);
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

export default GetTemplateItemsTool;
