import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

/** Report process liveness only; this does not claim backend readiness. */
export const GET: RequestHandler = () =>
  json(
    { status: "ok" },
    {
      headers: { "cache-control": "no-store" },
    },
  );
