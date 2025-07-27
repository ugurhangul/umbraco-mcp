import { UmbracoManagementClient } from "@umb-management-client";
import { CreateUmbracoTool } from "@/helpers/create-umbraco-tool.js";
import { getTreeTemplateRootQueryParams } from "@/umb-management-api/umbracoManagementAPI.zod.js";

const GetTemplateTreeRootTool = CreateUmbracoTool(
  "get-template-tree-root",
  "Gets the root level templates in the template tree. Returns paginated list of templates at the root level.",
  getTreeTemplateRootQueryParams.shape,
  async (params) => {
    const client = UmbracoManagementClient.getClient();
    const response = await client.getTreeTemplateRoot(params);
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

export default GetTemplateTreeRootTool;
