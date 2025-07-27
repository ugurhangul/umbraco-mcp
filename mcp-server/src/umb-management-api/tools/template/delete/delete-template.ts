import { UmbracoManagementClient } from "@umb-management-client";
import { CreateUmbracoTool } from "@/helpers/create-umbraco-tool.js";
import { deleteTemplateByIdParams } from "@/umb-management-api/umbracoManagementAPI.zod.js";

const DeleteTemplateTool = CreateUmbracoTool(
  "delete-template",
  "Deletes a template by its ID. Warning: This action cannot be undone. Ensure the template is not in use before deletion.",
  deleteTemplateByIdParams.shape,
  async ({ id }: { id: string }) => {
    const client = UmbracoManagementClient.getClient();
    await client.deleteTemplateById(id);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            { 
              success: true, 
              message: `Template with ID '${id}' deleted successfully` 
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

export default DeleteTemplateTool;
