import { UmbracoManagementClient } from "@umb-management-client";
import { CreateUmbracoTool } from "@/helpers/create-umbraco-tool.js";
import { getItemTemplateSearchQueryParams } from "@/umb-management-api/umbracoManagementAPI.zod.js";

const SearchTemplatesTool = CreateUmbracoTool(
  "search-templates",
  "Searches for templates by query parameters. Returns paginated results of templates matching the search criteria.",
  getItemTemplateSearchQueryParams.shape,
  async (params) => {
    const client = UmbracoManagementClient.getClient();
    const response = await client.getItemTemplateSearch(params);
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

export default SearchTemplatesTool;
