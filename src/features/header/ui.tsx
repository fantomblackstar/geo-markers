import React from "react";
import { PropsWithChildren } from "src/shared/model";
import { twMerge } from "tailwind-merge";

type HeaderProps = {
  className?: string;
  bodyClassName?: string;
} & PropsWithChildren;
export const Header: React.FC<HeaderProps> = ({
  children,
  className,
  bodyClassName,
}) => {
  return (
    <header
      className={twMerge("w-full px-0 py-2 bg-blue-500 shrink-0", className)}
    >
      <div className={twMerge("container", bodyClassName)}>{children}</div>
    </header>
  );
};
