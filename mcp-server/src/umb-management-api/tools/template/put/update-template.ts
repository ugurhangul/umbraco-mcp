import { UmbracoManagementClient } from "@umb-management-client";
import { CreateUmbracoTool } from "@/helpers/create-umbraco-tool.js";
import { putTemplateByIdBody, putTemplateByIdParams } from "@/umb-management-api/umbracoManagementAPI.zod.js";
import { z } from "zod";

const updateTemplateSchema = z.object({
  ...putTemplateByIdParams.shape,
  ...putTemplateByIdBody.shape,
});

const UpdateTemplateTool = CreateUmbracoTool(
  "update-template",
  "Updates an existing template. Provide the template ID and updated properties including name, alias, content, and master template.",
  updateTemplateSchema.shape,
  async (model) => {
    const client = UmbracoManagementClient.getClient();
    const { id, ...updateData } = updateTemplateSchema.parse(model);
    const validated = putTemplateByIdBody.parse(updateData);
    await client.putTemplateById(id, validated);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            { 
              success: true, 
              message: `Template '${validated.name}' updated successfully`,
              id: id 
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

export default UpdateTemplateTool;
