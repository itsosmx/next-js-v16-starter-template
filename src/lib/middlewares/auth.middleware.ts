import { NextRequest, NextResponse } from "next/server";
import { auth, getAuth } from "../auth";
import { headers } from "next/headers";
import { User } from "better-auth";
import { Member } from "better-auth/plugins";
import { EUserRole } from "@/types/enums";

type AuthContext = {
  user: User;
  organizationId: string | null;
  member?: Member;
  role?: EUserRole;
  params?: Promise<Record<string, string>>;
};

type Handler = (req: NextRequest, context?: AuthContext) => Promise<Response>;

type NextJSContext<T = any> = {
  params: Promise<T>;
};

export function requireAuth<T = any>(handler: Handler): (req: NextRequest, context?: NextJSContext<T>) => Promise<Response> {
  return async (req, nextContext) => {
    const _auth = await getAuth();

    if (!_auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    var member = null;
    if (_auth.session.activeOrganizationId) {
      member = await auth.api.getActiveMember({
        headers: await headers(),
      })
    }

    const resolvedParams = nextContext?.params ? await nextContext.params : undefined;

    // Create auth context
    const authContext: AuthContext = {
      user: _auth.user as any,
      organizationId: _auth.session.activeOrganizationId || null,
      member: member as any,
      role: member?.role as EUserRole || EUserRole.Member,
      params: resolvedParams as any,
    };

    return handler(req, authContext);
  }
}