"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const MotionDiv = ({ children, ...props }: MotionWrapperProps) => {
  return <motion.div {...props}>{children}</motion.div>;
};
