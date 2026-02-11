import type { LoaderFunctionArgs } from "react-router";
import { sessionStorage } from "~/providers/sessions.server";
import { generateKrakenUrl } from "~/providers/kraken.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const currentUrl = new URL(request.url);
  const type = currentUrl.searchParams.get("type");
  const session = await sessionStorage.getSession(request.headers.get("cookie"));
  const user = session.get("user");

  if (!user) {
    throw new Error("User not found in session");
  }

  const url = await generateKrakenUrl(type ?? "sumsub", user.address);

  return Response.json({ url });
}
