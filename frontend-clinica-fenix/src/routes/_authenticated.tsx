import { createGuard } from "@/utils/functions/guards/route.guard";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: createGuard({ requireAuth: true }),
});

function RouteComponent() {
  return <Outlet />;
}
