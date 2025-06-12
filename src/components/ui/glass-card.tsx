import * as React from "react";
import { ChevronDown } from "lucide-react";

// Props types for external icon component
type SVGIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    Icon: SVGIcon;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, title, description, Icon, ...props }, ref) => {
        return (
            <div ref={ref} className={`group h-[300px] w-[290px] [perspective:1000px] ${className}`} {...props}>
                <div className="relative h-full rounded-[50px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,30deg)]">
                    <div className="absolute inset-2 rounded-[44px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]"></div>
                    <div className="absolute [transform:translate3d(0,0,26px)]">
                        <div className="px-7 pt-[80px] pb-0 text-start space-y-2">
                            <Icon className="h-10 w-10 text-white" />
                            <span className="block text-xl font-black text-white">{title}</span>
                            <span className="mt-2 block text-[15px] text-zinc-300">{description}</span>
                        </div>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between [transform-style:preserve-3d] [transform:translate3d(0,0,26px)]">
                        {/* <div className="flex gap-2.5 [transform-style:preserve-3d]">
                            {[
                                { icon: Instagram, delay: "400ms" },
                                { icon: Twitter, delay: "600ms" },
                                { icon: Github, delay: "800ms" },
                            ].map(({ icon: Icon, delay }, index) => (
                                <button
                                    key={index}
                                    className="group/social grid h-[30px] w-[30px] place-content-center rounded-full border-none bg-white shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-200 ease-in-out group-hover:[box-shadow:rgba(0,0,0,0.2)_-5px_20px_10px_0px] group-hover:[transform:translate3d(0,0,50px)] hover:bg-black active:bg-yellow-400"
                                    style={{ transitionDelay: delay }}
                                >
                                    <Icon className="h-4 w-4 stroke-black transition-colors" />
                                </button>
                            ))}
                        </div> */}
                        {/* <div className="flex w-2/5 cursor-pointer items-center justify-end transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,10px)]">
                            <button className="border-none bg-none text-xs font-bold text-white">View more</button>
                            <ChevronDown className="h-4 w-4 stroke-white" strokeWidth={3} />
                        </div> */}
                    </div>
                    <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
                        {[
                            { size: "170px", pos: "8px", z: "20px", delay: "0s" },
                            { size: "140px", pos: "10px", z: "40px", delay: "0.2s" },
                            { size: "110px", pos: "17px", z: "60px", delay: "0.4s" },
                            { size: "80px", pos: "23px", z: "80px", delay: "0.6s" },
                        ].map((circle, index) => (
                            <div
                                key={index}
                                className={`absolute aspect-square rounded-full bg-white/10 shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out [transform:translate3d(0,0,calc(var(--z)))] ${
                                    index > 0 ? "group-hover:[transform:translate3d(0,0,calc(var(--z)+20px))]" : ""
                                }`}
                                style={
                                    {
                                        width: circle.size,
                                        top: circle.pos,
                                        right: circle.pos,
                                        "--z": circle.z,
                                        transitionDelay: circle.delay,
                                    } as React.CSSProperties
                                }
                            ></div>
                        ))}
                        <div
                            className="absolute grid aspect-square w-[50px] place-content-center rounded-full bg-white shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] [transition-delay:0.9s] group-hover:[transform:translate3d(0,0,120px)]"
                            style={{ top: "32px", right: "32px" }}
                        >
                            <Icon className="w-5 h-5 stroke-black" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
