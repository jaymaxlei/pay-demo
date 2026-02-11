import { sessionStorage } from "~/providers/sessions.server";
import { fetchSharedToken } from "~/providers/kraken.server";
import type { Route } from "./+types/token";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const credentialId = url.searchParams.get("credentialId");
  const session = await sessionStorage.getSession(request.headers.get("cookie"));
  const user = session.get("user");

  if (!credentialId || !user) {
    return Response.json({ error: "credentialId or user is required" }, { status: 400 });
  }

  try {
    // Call kraken to get the token
    const token = await fetchSharedToken(credentialId, "transak");

    return Response.json({ token });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
