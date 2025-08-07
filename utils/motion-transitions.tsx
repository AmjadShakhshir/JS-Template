export const transitionVariantsPage = {
  initial: {
    x: "100%",
    width: "100%",
  },
  animate: {
    x: "0%",
    width: "0%",
  },
  exit: {
    x: ["0%", "100%"],
    width: ["0%", "100%"],
  },
};

export const motionTransitionsAbout = {
  initial: {
    opacity: 0,
    bottom: "2rem",
    transform: "translateY(50px)",
  },
  transition: {
    duration: 0.8,
    type: "tween",
    ease: [0.25, 0.6, 0.3, 0.8],
  },
  animate: {
    opacity: 1,
    transform: "translateY(0px)",
  },
};

export const fadeIn = (position: string) => {
  return {
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.6,
        delay: 0.1,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
    hidden: {
      y: position === 'bottom' ? -40 : 0,
      x: position === 'right' ? 40 : 0,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.1,
        ease: [0.25, 0.25, 0.25, 0.25],
      },
    },
  };
};

export const slideIn = (direction: string, delay: number = 0) => {
  return {
    hidden: {
      x: direction === 'left' ? '-50%' : direction === 'right' ? '50%' : 0,
      y: direction === 'up' ? '50%' : direction === 'down' ? '-50%' : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
  };
};

export const staggerContainer = (staggerChildren?: number, delayChildren?: number) => {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};
