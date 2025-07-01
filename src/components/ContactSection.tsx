"use client";

import { ArrowUpRight, ExternalLink, Github, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            <span className="text-white/20">REMARKABLE</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Ready to transform your business with intelligent automation? Let's discuss your project.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-white/90 text-lg px-8 py-4"
            onClick={() => window.open('mailto:hello@simo.dev', '_blank')}
          >
            START A CONVERSATION
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-16 border-t border-white/10">
          <div>
            <h3 className="font-bold mb-4">EMAIL</h3>
            <a href="mailto:hello@simo.dev" className="text-white/60 hover:text-white transition-colors">
              hello@simo.dev
            </a>
          </div>
          <div>
            <h3 className="font-bold mb-4">SOCIAL</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">LOCATION</h3>
            <div className="text-white/60">Available Worldwide</div>
          </div>
        </div>
      </div>
    </section>
  );
}