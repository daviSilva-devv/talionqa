import type { ProjectGraph } from "@talion/contracts";

export const demoProjectGraph: ProjectGraph = {
  projectLabel: "Preview project",
  nodes: [
    { id: "project", kind: "project", label: "Project", status: "warning" },
    { id: "runtime", kind: "service", label: "Runtime", status: "warning" },
    { id: "network", kind: "service", label: "Network", status: "critical" },
    { id: "security", kind: "module", label: "Security", status: "healthy" },
    {
      id: "finding-console",
      kind: "finding",
      label: "Console error",
      status: "warning",
      findingId: "finding_demo_console",
    },
    {
      id: "finding-request",
      kind: "finding",
      label: "Failed request",
      status: "critical",
      findingId: "finding_demo_request",
    },
  ],
  edges: [
    { id: "project-runtime", source: "project", target: "runtime", relation: "observes" },
    { id: "project-network", source: "project", target: "network", relation: "observes" },
    { id: "project-security", source: "project", target: "security", relation: "observes" },
    {
      id: "runtime-console",
      source: "runtime",
      target: "finding-console",
      relation: "contains",
    },
    {
      id: "network-request",
      source: "network",
      target: "finding-request",
      relation: "contains",
    },
  ],
};
