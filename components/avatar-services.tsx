import Image from "next/image";
import { MotionTransition } from "./transition-component";

const AvatarServices = () => {
    return (
        <MotionTransition position='right' className="bottom-0 left-0 hidden md:inline-block md:absolute">
            <Image src="/avatar/about-avatar.png" width="400" height="400" className="w-[350px] h-full " alt="Services Avatar" />
        </MotionTransition>
    );
}

export default AvatarServices;
