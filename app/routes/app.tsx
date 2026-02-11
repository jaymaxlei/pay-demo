import { Dashboard } from "~/components/features/Dashboard/Dashboard";
import type { Route } from "./+types/app";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard | Meridian" },
    { name: "description", content: "Your stablecoin neobank dashboard" },
  ];
}

export default function AppRoute() {
  return <Dashboard />;
}
