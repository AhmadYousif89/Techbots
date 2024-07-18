import { NextRequest } from 'next/server';

let data = {};

export function GET() {
  return Response.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  data = body;
  return Response.json({ msg: 'Filters sent' });
}
