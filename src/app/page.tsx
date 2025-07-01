"use client";

import MinimalistNavbar from "@/components/MinimalistNavbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TransitionWrapper from "@/components/TransitionWrapper";

export default function MinimalistPortfolio() {
    return (
        <TransitionWrapper>
            <div className="min-h-screen bg-transparent text-white">
                <MinimalistNavbar />
                <HeroSection />
                <ProjectsSection />
                <AboutSection />
                <ContactSection />
                <Footer />
            </div>
        </TransitionWrapper>
    );
}
