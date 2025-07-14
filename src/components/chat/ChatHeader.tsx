"use client";

import { BoxReveal } from "@/components/ui/box-reveal";
import { LineShadowText } from "@/components/ui/line-shadow-text";

export const ChatHeader = () => {
    return (
        <div className="size-full flex flex-col items-center justify-center overflow-hidden">
            <BoxReveal boxColor={"#f2612e"} duration={0.5} width="100%">
                <p className="text-[2.5rem] md:text-9xl font-bold font-mono">
                    Hi, I'm{" "}
                    <span className="text-primary italic">
                        <LineShadowText shadowColor="#f2612e">Simone</LineShadowText>
                    </span>
                </p>
            </BoxReveal>

            <BoxReveal boxColor={"#f2612e"} duration={0.5}>
                <div className="mt-[.5rem] text-[1rem] font-sans">
                    I'm a software engineer with a passion for building products that help people live better lives.
                </div>
            </BoxReveal>

            <BoxReveal boxColor={"#f2612e"} duration={0.5}>
                <div className="mt-6 font-sans">Chat with me about anything!</div>
            </BoxReveal>
        </div>
    );
};
