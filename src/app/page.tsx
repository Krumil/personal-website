import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function MinimalistPortfolio() {
    return (
        <div className="min-h-screen bg-transparent text-white">
            <HeroSection />
            <ProjectsSection />
            <AboutSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
