import invariant from "tiny-invariant"

import db from "../db.server"
import { useLoaderData } from "react-router";

export const loader = async ({params}: any) => {
  invariant(params.id, "Could not find QR code");
  
  const id = Number(params.id);
  const qrCode = await db.qRCode.findFirst({ where: { id } });

  invariant(qrCode, "Could not find QR code");

  return Response.json({
    title: qrCode.title,
    destination: qrCode.destination,
  });
}

export default function QRCode(){
  const { image, title }: any = useLoaderData();

  return (
    <>
      <h1>{title}</h1>
      <img src={image} alt="QR Code for product" />
    </>
  )
}