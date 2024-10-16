"use client";

import React, { ReactNode } from "react";
import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

interface LinkProps {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
  className?: string;
}

export function LinkComponent(props: LinkProps) {
  const className = props.className ?? "";
  const isExternal =
    props.href.match(/^([a-z0-9]*:|.{0})\/\/.*$/) || props.isExternal;

  if (isExternal) {
    return (
      <ChakraLink
        as={NextLink}
        className={className}
        href={props.href}
        isExternal
        style={{ textDecoration: "none" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.children}
      </ChakraLink>
    );
  }

  return (
    <ChakraLink
      as={NextLink}
      className={className}
      href={props.href}
      style={{ textDecoration: "none" }}
    >
      {props.children}
    </ChakraLink>
  );
}
