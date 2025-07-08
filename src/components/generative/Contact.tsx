import { motion } from "motion/react";
import { Mail, Github, Linkedin, Twitter, Clock, CheckCircle } from "lucide-react";

type SocialInfo = {
    github: string;
    linkedin: string;
    twitter: string;
};

type AvailabilityInfo = {
    status: string;
    timezone: string;
    preferredContact: string;
};

type ContactProps = {
    type?: string;
    info?: string | SocialInfo | AvailabilityInfo;
    email?: string;
    social?: SocialInfo;
    availability?: AvailabilityInfo;
};

export const Contact = ({ type, info, email, social, availability }: ContactProps) => {
    // Handle the case where all contact info is provided
    if (!type && (email || social || availability)) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-gradient-to-br from-card to-accent p-6 rounded-xl border border-border max-w-md"
            >
                <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>

                {/* Email */}
                {email && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <Mail className="w-5 h-5 text-secondary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium text-foreground">{email}</p>
                        </div>
                    </motion.div>
                )}

                {/* Social Links */}
                {social && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4"
                    >
                        <p className="text-sm text-muted-foreground mb-2">Social</p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Github className="w-4 h-4 text-secondary" />
                                <span className="text-sm text-foreground">{social.github}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Linkedin className="w-4 h-4 text-secondary" />
                                <span className="text-sm text-foreground">{social.linkedin}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Twitter className="w-4 h-4 text-secondary" />
                                <span className="text-sm text-foreground">{social.twitter}</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Availability */}
                {availability && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="pt-4 border-t border-border"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium text-foreground">
                                {availability.status}
                            </span>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>{availability.timezone}</span>
                            </div>
                            <p>Preferred: {availability.preferredContact}</p>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        );
    }

    // Handle specific type requests
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-gradient-to-br from-card to-accent p-6 rounded-xl border border-border max-w-md"
        >
            <h3 className="text-lg font-bold text-foreground mb-4 capitalize">
                {type} Information
            </h3>

            {type === "email" && typeof info === "string" && (
                <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-secondary" />
                    <span className="text-foreground">{info}</span>
                </div>
            )}

            {type === "social" && info && typeof info === "object" && "github" in info && (
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-secondary" />
                        <span className="text-sm text-foreground">
                            {(info as SocialInfo).github}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Linkedin className="w-5 h-5 text-secondary" />
                        <span className="text-sm text-foreground">
                            {(info as SocialInfo).linkedin}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Twitter className="w-5 h-5 text-secondary" />
                        <span className="text-sm text-foreground">
                            {(info as SocialInfo).twitter}
                        </span>
                    </div>
                </div>
            )}

            {type === "availability" && info && typeof info === "object" && "status" in info && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-foreground">
                            {(info as AvailabilityInfo).status}
                        </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-3 h-3" />
                            <span>{(info as AvailabilityInfo).timezone}</span>
                        </div>
                        <p>Preferred: {(info as AvailabilityInfo).preferredContact}</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};
