import type { Status } from "../types/index";


export const STATUS_OPTIONS: Array<{ value: Status; label: string; color: string }> = [
{ value: "pending", label: "Pending", color: "#D0D0D0" },
  { value: "in-progress", label: "In Progress", color: "#FFB03C" },
  { value: "completed", label: "Completed", color: "#34A853" },
];