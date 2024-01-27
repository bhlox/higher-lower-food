import { getMenuItems } from "@/lib/actions/menuActions";

export async function GET() {
  const data = await getMenuItems();

  return Response.json({ data });
}
