import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#C6FF00",
          fontSize: 108,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: "-0.05em",
        }}
      >
        N
      </div>
    ),
    size
  );
}
