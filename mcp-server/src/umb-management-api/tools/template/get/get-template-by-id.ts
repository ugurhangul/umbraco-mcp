import { UmbracoManagementClient } from "@umb-management-client";
import { CreateUmbracoTool } from "@/helpers/create-umbraco-tool.js";
import { getTemplateByIdParams } from "@/umb-management-api/umbracoManagementAPI.zod.js";

const GetTemplateByIdTool = CreateUmbracoTool(
  "get-template-by-id",
  "Gets a template by its ID. Returns template details including name, alias, content, and master template information.",
  getTemplateByIdParams.shape,
  async ({ id }: { id: string }) => {
    const client = UmbracoManagementClient.getClient();
    const response = await client.getTemplateById(id);
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

export default GetTemplateByIdTool;
