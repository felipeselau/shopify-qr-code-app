import invariant from "tiny-invariant";
import db from "../db.server";
import { redirect } from "@remix-run/node";
import { getDestinationUrl } from "app/models/QRCode.server";

export const loader = async ({ params }: any) => {
  invariant(params.id, "Could not find QR code");

  const id = Number(params.id);
  const qrCode = await db.qRCode.findFirst({ where: { id } });

  invariant(qrCode, "Could not find QR code");

  await db.qRCode.update({
    where: { id },
    data: { scans: { increment: 1 } },
  });

  return redirect(await getDestinationUrl(qrCode)); 
};