"use client"

import { socialNetworks, personalInfo } from "@/data";
import Link from "next/link";
import { MotionTransition } from "./transition-component";

const Header = () => {
  return (
    <MotionTransition position="bottom" className="absolute z-40 inline-block w-full top-5 md:top-10">
      <header>
        <div className="container justify-between max-w-6xl mx-auto md:flex px-4">
          <Link href="/">
            <h1 className="my-3 text-4xl font-bold text-center md:text-left gradient-text">
              {personalInfo.name.split(' ')[0]}
              <span className="text-secondary">
                {personalInfo.name.split(' ')[1]}
              </span>
            </h1>
          </Link>
          <div className="flex items-center justify-center gap-7">
            {socialNetworks.map(({ logo, src, id, name }) => (
              <Link
                key={id}
                href={src}
                target="_blank"
                className="transition-all duration-300 hover:text-primary hover:scale-110"
                title={name}
              >
                {logo}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </MotionTransition>
  );
};

export default Header;
