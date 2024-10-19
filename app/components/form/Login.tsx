'use client';

import React from "react";
import { Button, Checkbox, Input, Link} from "@nextui-org/react";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
    <h1 className="flex flex-col gap-1">Log in</h1>
    <form action="#" className="space-y-3">
      <Input
        autoFocus
        endContent={
          // <EnvelopeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          <EnvelopeIcon className="w-4" />
        }
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
      />
      <Input
        endContent={
          <LockClosedIcon className="w-4" />
        }
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="bordered"
      />
      <Input
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
            {isVisible ? (
              <EyeSlashIcon className="w-4" />
            ) : (
              <EyeIcon className="w-4" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        // className="max-w-xs"
      />
      <div className="flex py-2 px-1 justify-between">
        <Checkbox
          classNames={{
            label: "text-small",
          }}
        >
          Remember me
        </Checkbox>
        <Link color="primary" href="#" size="sm">
          Forgot password?
        </Link>
      </div>
      <div className="w-full">
        <Button color="primary" className="w-full">
          Sign in
        </Button>
      </div>
    </form>
    {/* <ModalFooter>
      <Button color="danger" variant="flat" onPress={onClose}>
        Close
      </Button>
      <Button color="primary" onPress={onClose}>
        Sign in
      </Button>
    </ModalFooter> */}
    </>
  );
}
