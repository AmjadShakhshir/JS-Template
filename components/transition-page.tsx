"use client"

import { transitionVariantsPage } from "@/utils/motion-transitions";
import { AnimatePresence, motion } from "framer-motion";

const TransitionPage = () => {
  return (
    <AnimatePresence mode="wait">
      <div>
        <motion.div
          className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-gradient-to-r from-primary to-accent"
          variants={transitionVariantsPage}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.1, duration: 0.4, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionPage;
