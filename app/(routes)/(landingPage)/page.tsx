import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {" "}
      <div>LandingPage</div>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign Up</RegisterLink>;
    </>
  );
}
