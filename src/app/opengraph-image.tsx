import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "Suyash Chaudhari Portfolio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Fetch Anton font from Google Fonts to use in the OG image
  const fontData = await fetch(
    new URL("https://fonts.gstatic.com/s/anton/v25/1Ptgg87LROyAm3K8-C8.ttf")
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f0e8", // var(--bg)
          border: "24px solid #0f0f0f", // var(--ink)
          position: "relative",
        }}
      >
        {/* Background grid lines for brutalist aesthetic */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "linear-gradient(#0f0f0f15 2px, transparent 2px), linear-gradient(90deg, #0f0f0f15 2px, transparent 2px)",
            backgroundSize: "60px 60px",
            zIndex: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "80%",
            height: "100%",
            zIndex: 1,
          }}
        >
          {/* Accent square */}
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#dd4433", // var(--red)
              border: "6px solid #0f0f0f",
              marginBottom: "40px",
              boxShadow: "12px 12px 0 #0f0f0f",
            }}
          />

          <div
            style={{
              fontSize: 120,
              fontFamily: '"Anton"',
              color: "#0f0f0f",
              lineHeight: 0.9,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            SUYASH
            <br />
            CHAUDHARI
          </div>
          
          <div
            style={{
              display: "flex",
              borderTop: "6px solid #0f0f0f",
              paddingTop: "20px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontFamily: '"Anton"',
                color: "#dd4433",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginRight: "40px",
              }}
            >
              FULL-STACK DEVELOPER
            </div>
            <div
              style={{
                fontSize: 32,
                fontFamily: '"Anton"',
                color: "#0f0f0f",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              SELECTED WORKS
            </div>
          </div>
        </div>
        
        {/* Serial number / deco in bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            fontSize: "24px",
            fontFamily: '"Anton"',
            color: "#0f0f0f",
            border: "4px solid #0f0f0f",
            padding: "8px 16px",
            backgroundColor: "#f5f0e8",
          }}
        >
          NO. 01
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Anton",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
