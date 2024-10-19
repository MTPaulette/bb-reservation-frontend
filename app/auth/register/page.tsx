'use client';

import RegisterForm from "@/app/components/form/Register";
import React from "react";

export default function RegisterPage() {
  return (
    <>
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <RegisterForm />
    </div>
    </>
  );
}
