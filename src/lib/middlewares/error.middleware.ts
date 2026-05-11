import { NextResponse } from "next/server";

const APIError = {
  "BadRequest": 400,
  "Unauthorized": 401,
  "Forbidden": 403,
  "NotFound": 404,
  "Conflict": 409,
  "InternalServerError": 500,
} as const

type APIErrorType = keyof typeof APIError;

export function throwAPIError(code: APIErrorType, error?: any) {
  console.error(error);

  return NextResponse.json(
    { error: error?.message ?? error ?? code },
    { status: APIError[code] }
  );
}