import { methods, route } from "@/server/http/route";
import { getUser } from "@/server/modules/auth/auth.service";

/** GET /api/auth/me → { user } (signed in, never cached). */
export const { GET, POST, PUT, PATCH, DELETE } = methods({
  GET: route({ auth: "user", cache: "no-store" }, async (ctx) => ({ user: await getUser(ctx.user.id) })),
});
