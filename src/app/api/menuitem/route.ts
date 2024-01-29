import { getRandomUndiplicatedMenuItems } from "@/lib/actions/menuitems";

export async function GET() {
  const data = await getRandomUndiplicatedMenuItems();

  return Response.json({ data });
}
