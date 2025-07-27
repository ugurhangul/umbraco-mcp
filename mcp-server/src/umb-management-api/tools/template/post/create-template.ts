import { UmbracoManagementClient } from "@umb-management-client";
import { CreateUmbracoTool } from "@/helpers/create-umbraco-tool.js";
import { postTemplateBody } from "@/umb-management-api/umbracoManagementAPI.zod.js";

const CreateTemplateTool = CreateUmbracoTool(
  "create-template",
  "Creates a new template. Provide name, alias, content, and optionally a master template ID to create a new template.",
  postTemplateBody.shape,
  async (model) => {
    const client = UmbracoManagementClient.getClient();
    const validated = postTemplateBody.parse(model);
    await client.postTemplate(validated);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            { 
              success: true, 
              message: `Template '${validated.name}' created successfully`,
              alias: validated.alias 
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

export default CreateTemplateTool;
