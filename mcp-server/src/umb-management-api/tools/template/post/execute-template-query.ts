import { UmbracoManagementClient } from "@umb-management-client";
import { CreateUmbracoTool } from "@/helpers/create-umbraco-tool.js";
import { postTemplateQueryExecuteBody } from "@/umb-management-api/umbracoManagementAPI.zod.js";

const ExecuteTemplateQueryTool = CreateUmbracoTool(
  "execute-template-query",
  "Executes a template query to find content. Provide query parameters including filters, sorting, and document type to search for content.",
  postTemplateQueryExecuteBody.shape,
  async (model) => {
    const client = UmbracoManagementClient.getClient();
    const validated = postTemplateQueryExecuteBody.parse(model);
    const response = await client.postTemplateQueryExecute(validated);
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

export default ExecuteTemplateQueryTool;
