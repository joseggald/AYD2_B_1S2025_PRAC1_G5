import { createFileRoute } from "@tanstack/react-router";
import { Onboarding } from "@/features";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Onboarding />;
}
