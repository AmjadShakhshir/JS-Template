import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from "@/data";
import { useState } from "react";
import { User } from "lucide-react";

const Introduction = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="z-20 w-full bg-darkBg/60">
      <div className="z-20 grid items-center h-full p-6 py-20 md:py-0 md:grid-cols-2">
        <div className="flex justify-center md:justify-start">
          {imageError ? (
            <Image 
              src="/fallback/avatar-placeholder.svg"
              width="400" 
              height="400" 
              alt="Avatar placeholder" 
              className="rounded-full border-4 border-primary/30 shadow-2xl opacity-70"
            />
          ) : (
            <Image 
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=2" 
              priority 
              width="400" 
              height="400" 
              alt="Amjad Shakhshir Avatar" 
              className="rounded-full border-4 border-primary/30 shadow-2xl"
              quality={80}
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="flex flex-col justify-center max-w-md">
          <h1 className="mb-5 text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-10">
            {personalInfo.tagline}, <br />
            <TypeAnimation
              sequence={[
                'I build web applications',
                2000,
                'I create mobile apps',
                2000,
                'I design user interfaces',
                2000,
              ]}
              wrapper="span"
              speed={70}
              repeat={Infinity}
              className="font-bold gradient-text"
            />
          </h1>
          
          <p className="mx-auto mb-2 text-xl md:text-xl md:mx-0 md:mb-8 text-gray-300">
            {personalInfo.description}
          </p>

          <div className="flex items-center justify-center gap-3 md:justify-start md:gap-10">
            <a 
              href="/portfolio" 
              className="px-6 py-3 my-2 transition-all border-2 border-primary cursor-pointer text-md w-fit rounded-xl hover:shadow-xl hover:shadow-primary/50 hover:bg-primary/10"
            >
              View Projects
            </a>
            <a 
              href="/contact"
              className="px-6 py-3 my-5 transition-all border-2 cursor-pointer text-md w-fit text-primary border-primary rounded-xl hover:shadow-xl hover:shadow-primary bg-primary/10 hover:bg-primary hover:text-white"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
