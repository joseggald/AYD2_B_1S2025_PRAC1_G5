import { createFileRoute } from "@tanstack/react-router";
import { Onboarding } from "@/features";
import { createPublicGuard } from "@/utils/functions/guards/public.guard";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: createPublicGuard({
      redirectTo: "/home",
    }),
});

function RouteComponent() {
  return <Onboarding />;
}
