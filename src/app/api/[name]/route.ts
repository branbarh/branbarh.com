export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.pathname.split("/").at(-1);
  const res = `Hello ${name}`;

  return Response.json(res);
}

export const runtime = "edge";
