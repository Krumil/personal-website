"use client";

import { BoxReveal } from "@/components/ui/box-reveal";
import { LineShadowText } from "@/components/ui/line-shadow-text";

export const ChatHeader = () => {
    return (
        <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8 font-mono">
            <BoxReveal boxColor={"#f2612e"} duration={0.5}>
                <p className="text-[2.5rem] md:text-[3.5rem] font-bold">
                    Hi, I'm{" "}
                    <span className="text-primary">
                        <LineShadowText shadowColor="#f2612e">Simone</LineShadowText>
                    </span>
                </p>
            </BoxReveal>

            <BoxReveal boxColor={"#f2612e"} duration={0.5}>
                <h2 className="mt-[.5rem] text-[1rem]">
                    I'm a software engineer with a passion for building products that help people live better lives.
                </h2>
            </BoxReveal>

            <BoxReveal boxColor={"#f2612e"} duration={0.5}>
                <div className="mt-6">Chat with me about anything!</div>
            </BoxReveal>
        </div>
    );
};
