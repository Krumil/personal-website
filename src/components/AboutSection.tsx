"use client";

export default function AboutSection() {
    const capabilities = [
        { name: "AI Agent Development", percentage: "95%" },
        { name: "Blockchain Integration", percentage: "88%" },
        { name: "Full-Stack Development", percentage: "92%" },
        { name: "Business Intelligence", percentage: "85%" },
    ];

    return (
        <section id="about" className="py-20 px-8 bg-white text-black">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">APPROACH</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">UNDERSTAND FIRST</h3>
                                <p className="text-black/70 leading-relaxed">
                                    Before writing a single line of code, I dive deep into your business context,
                                    challenges, and goals. This understanding shapes every technical decision.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">BUILD FOR SCALE</h3>
                                <p className="text-black/70 leading-relaxed">
                                    Every system I create is designed for growth. From day one, the architecture
                                    supports expansion, integration, and evolution.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">MEASURE IMPACT</h3>
                                <p className="text-black/70 leading-relaxed">
                                    Success isn't just about working code—it's about measurable business outcomes. Every
                                    project includes clear metrics and continuous optimization.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">CAPABILITIES</h2>
                        <div className="space-y-6">
                            {capabilities.map((capability, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center py-4 border-b border-black/10"
                                >
                                    <span className="font-bold">{capability.name}</span>
                                    <span className="text-black/60">{capability.percentage}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 bg-black text-white">
                            <h3 className="text-xl font-bold mb-4">CURRENT FOCUS</h3>
                            <p className="text-white/80 leading-relaxed">
                                Developing next-generation AI agents that can autonomously manage complex business
                                workflows while maintaining human oversight and control.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
