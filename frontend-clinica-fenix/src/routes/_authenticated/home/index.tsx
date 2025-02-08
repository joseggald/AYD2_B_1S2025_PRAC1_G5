import { createFileRoute } from '@tanstack/react-router'
import { DashboardView } from '@/layout'

export const Route = createFileRoute('/_authenticated/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardView />
}
