export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const res = `Hello ${name}`;

  return Response.json(res);
}

export const runtime = "edge";

// [TODO] SwaggerUI
