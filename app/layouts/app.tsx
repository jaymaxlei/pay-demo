import { Outlet, redirect, useRouteLoaderData } from "react-router";
// import { sessionStorage } from "~/providers/sessions.server";
import type { Route } from "./+types/app";

// export async function loader({ request }: Route.LoaderArgs) {
//   const session = await sessionStorage.getSession(request.headers.get("cookie"));
//   const user = session.get("user");

//   if (!user || !user.isAuthenticated) {
//     throw redirect("/");
//   }

//   return { user };
// }

export async function clientLoader() {
  const user = { isAuthenticated: true, address: "0x123..." }; // Mock user for demo
  // In a real SPA, check localStorage or global auth state here
  // if (!user) throw redirect("/");
  return { user };
}

export const useUser = () => {
  const data = useRouteLoaderData<typeof clientLoader>("layouts/app");

  if (!data) {
    // throw new Error("useUser must be used inside a route which is a child of app/layout");
    return { isAuthenticated: false, address: "" };
  }

  return data.user;
};

import { Sidebar } from "~/components/layout/Sidebar";
import { Topbar } from "~/components/layout/Topbar";
import { MachineContext } from "~/providers/state";
import { COMMON_ENV } from "~/providers/envFlags.common";
import { useCallback, useEffect } from "react";

export default function AppLayout() {
  // Use actor ref but handle potential initialization issues
  const actor = MachineContext.useActorRef();
  const send = actor?.send;

  // biome-ignore lint/suspicious/noExplicitAny: false positive
  const messageReceiver = useCallback((message: any) => {
    if (!send) return;

    // React only messages from ID iframe
    if (COMMON_ENV.KRAKEN_API_URL && message.origin.replace(/\/$/, "") === COMMON_ENV.KRAKEN_API_URL.replace(/\/$/, "")) {
      if (message.data.error) {
        // Hide iframe ...
        console.error(message.data.error);
      } else if (message.data.open) {
        // If you want to use wallet-sign-in, this is required
        // since there are security limitations, especially with
        // opening metamask protocol link in mobile device
        window.open(message.data.open, message.data.target, message.data.features);
      } else if (message.data.response) {
        send({ type: "kycCompleted" });
      }
    }

    // Noah callback from /callbacks/noah
    if (message.data.type === "noah-done") {
      send({ type: "revokeAccessGrant" });
    }

    if (message.data.type === "hifi-tos-done") {
      send({ type: "acceptHifiTos", signedAgreementId: message.data.signedAgreementId });
    }

    if (message.data.type === "monerium-callback") {
      console.log("-> monerium callback", message.data.code);
      send({ type: "accessTokenFromCode", code: message.data.code });
    }
  }, [send]);

  useEffect(() => {
    window.addEventListener("message", messageReceiver);
    return () => window.removeEventListener("message", messageReceiver);
  }, [messageReceiver]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 font-sans text-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
          {/* <div id="idOS-enclave" className="hidden" /> */}
        </main>
      </div>
    </div>
  );
}
