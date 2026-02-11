import { redirect } from "react-router";
// import { SiweMessage } from "siwe";
// import { sessionStorage } from "~/providers/sessions.server";
import type { Route } from "./+types/auth";

// Create a new user session
export async function clientLoader({ request }: Route.LoaderArgs) {
  // Mock client-side loader for auth check
  return new Response("OK");
}

// Validate signature and authenticate user
export async function clientAction({ request }: Route.ActionArgs) {
  // Mock client-side action
  return redirect("/app");
}
