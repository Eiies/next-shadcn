"use client";
import React, { useState } from "react";
import { SignInFolw } from "../types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

export default function AuthScreen() {
  const [state, setState] = useState<SignInFolw>("signIn");
  return (
    <section className="h-full flex items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </section>
  );
}
