import GetTemplateByIdTool from "./get/get-template-by-id.js";
import GetTemplateConfigurationTool from "./get/get-template-configuration.js";
import GetTemplateQuerySettingsTool from "./get/get-template-query-settings.js";
import GetTemplateItemsTool from "./items/get/get-template-items.js";
import SearchTemplatesTool from "./items/get/search-templates.js";
import GetTemplateTreeRootTool from "./items/get/get-template-tree-root.js";
import CreateTemplateTool from "./post/create-template.js";
import ExecuteTemplateQueryTool from "./post/execute-template-query.js";
import UpdateTemplateTool from "./put/update-template.js";
import DeleteTemplateTool from "./delete/delete-template.js";
import { AuthorizationPolicies } from "@/helpers/umbraco-auth-policies.js";
import { CurrentUserResponseModel } from "@/umb-management-api/schemas/index.js";
import { ToolDefinition } from "types/tool-definition.js";

export const TemplateTools = (user: CurrentUserResponseModel) => {
  const tools: ToolDefinition<any>[] = [];

  // Basic template access - available to users with template access
  if (AuthorizationPolicies.TreeAccessTemplates(user)) {
    tools.push(GetTemplateByIdTool());
    tools.push(GetTemplateConfigurationTool());
    tools.push(GetTemplateQuerySettingsTool());
    tools.push(GetTemplateItemsTool());
    tools.push(SearchTemplatesTool());
    tools.push(GetTemplateTreeRootTool());
    tools.push(ExecuteTemplateQueryTool());
  }

  // Template management - requires settings section access for create/update/delete operations
  if (AuthorizationPolicies.SectionAccessSettings(user)) {
    tools.push(CreateTemplateTool());
    tools.push(UpdateTemplateTool());
    tools.push(DeleteTemplateTool());
  }

  return tools;
};
