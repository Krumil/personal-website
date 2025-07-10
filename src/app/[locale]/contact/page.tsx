"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HoleBackground } from "@/components/ui/hole";

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormStatus {
    type: "success" | "error" | null;
    message: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<FormStatus>({ type: null, message: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: "" });

        try {
            // Simulate form submission
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            // Here you would typically send the form data to your backend
            // TODO: Implement actual form submission logic
            
            setStatus({
                type: "success",
                message: "Thank you! Your message has been sent successfully. I'll get back to you soon.",
            });
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch {
            setStatus({
                type: "error",
                message: "There was an error sending your message. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="h-5 w-5" />,
            label: "Email",
            value: "simone@example.com",
            href: "mailto:simone@example.com",
        },
        {
            icon: <Phone className="h-5 w-5" />,
            label: "Phone",
            value: "+1 (555) 123-4567",
            href: "tel:+15551234567",
        },
        {
            icon: <MapPin className="h-5 w-5" />,
            label: "Location",
            value: "San Francisco, CA",
            href: null,
        },
    ];

    const socialLinks = [
        {
            icon: <Github className="h-5 w-5" />,
            label: "GitHub",
            href: "https://github.com/simonesaletti",
        },
        {
            icon: <Linkedin className="h-5 w-5" />,
            label: "LinkedIn",
            href: "https://linkedin.com/in/simonesaletti",
        },
        {
            icon: <Twitter className="h-5 w-5" />,
            label: "Twitter",
            href: "https://twitter.com/simonesaletti",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <HoleBackground
                strokeColor="#d4d4d4"
                animationIntensity={0.2}
                className="absolute inset-0 opacity-50"
            />
            
            <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 font-technor">
                        Get In Touch
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        I'm always interested in discussing new opportunities, innovative projects, and 
                        collaborations in AI and blockchain technology.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="text-2xl">Send a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">
                                                Name *
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">
                                                Email *
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">
                                            Subject *
                                        </label>
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                            placeholder="What would you like to discuss?"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">
                                            Message *
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="min-h-[120px] w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                                            placeholder="Tell me about your project, ideas, or how we can work together..."
                                        />
                                    </div>

                                    {/* Status Message */}
                                    {status.type && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex items-center gap-2 p-3 rounded-md ${
                                                status.type === "success"
                                                    ? "bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                                                    : "bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                                            }`}
                                        >
                                            {status.type === "success" ? (
                                                <CheckCircle className="h-4 w-4" />
                                            ) : (
                                                <AlertCircle className="h-4 w-4" />
                                            )}
                                            <span className="text-sm">{status.message}</span>
                                        </motion.div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full md:w-auto"
                                        size="lg"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Contact Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">{item.label}</p>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="font-medium hover:text-primary transition-colors"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="font-medium">{item.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Social Links */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Connect Online</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                                            className="flex items-center gap-3 p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                {social.icon}
                                            </div>
                                            <span className="font-medium">{social.label}</span>
                                        </motion.a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Availability */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Availability</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium">Available for new projects</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        I typically respond to messages within 24 hours. For urgent inquiries, 
                                        please indicate so in your subject line.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}