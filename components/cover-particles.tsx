"use client"

import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";

export const CoverParticles = () => {
  const [init, setInit] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);

    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Don't render particles if user prefers reduced motion
  if (reducedMotion) {
    return null;
  }

  return (
    init && (
      <div className="w-full absolute inset-0">
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                },
                onHover: {
                  enable: true,
                  mode: "grab",
                },
              },
              modes: {
                grab: {
                  distance: 100,
                  links: {
                    opacity: 0.4,
                  },
                },
              },
            },
            particles: {
              color: {
                value: "#3b82f6",
              },
              links: {
                color: "#06b6d4",
                distance: 120,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: true,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 30,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
    )
  );
};
