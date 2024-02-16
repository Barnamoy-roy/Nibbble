import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

// custom font
import localFont from "next/font/local";
const telma = localFont({ src: "../../public/fonts/Telma/Telma-Bold.woff2" });

export default function Page() {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 relative">
      <h1 className={`${telma.className} text-black absolute top-5 left-5 z-10 text-3xl`}>Nibbble</h1>
        <Image
          src="/images/signin.jpeg"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="h-screen col-span-3 place-items-center">
        <SignIn
          afterSignInUrl={"/dashboard"}
          appearance={{
            elements: {
              rootBox: {
                position: "relative",
                top: "50%",
                left: "50%",
                transform: "translate(-80%, -50%)",
              },
              card: {
                border: "none",
                boxShadow: "none",
                width: "100%",
              },
              headerTitle: {
                fontSize: "1.5rem",
              },
              socialButtonsBlockButton: {
                textAlign: "center",
                borderRadius: "3rem",
                padding: "1.5rem 3rem",
              },
              socialButtonsBlockButtonText: {
                textAlign: "center",
                fontSize: "0.85rem",
                fontWeight: "normal",
                fontFamily: "sans-serif",
                margin: "auto",
                width: "100%",
                textOverflow: "none",
              },
              formFieldLabel: {
                fontSize: "1rem",
              },
              formFieldInput: {
                padding: "1rem 1.5rem",
                fontSize: "1rem",
                borderRadius: "0.75rem",
              },
              formButtonPrimary: {
                fontSize: "0.75rem",
                backgroundColor: "#000000",
                borderRadius: "2rem",
                textAlign: "center",
                padding: "1rem 2rem",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
