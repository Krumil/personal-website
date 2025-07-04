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
                className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-700 max-w-md"
            >
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-6">Contact Information</h3>

                {/* Email */}
                {email && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <div>
                            <p className="text-sm text-indigo-700 dark:text-indigo-300">Email</p>
                            <p className="font-medium text-indigo-900 dark:text-indigo-100">{email}</p>
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
                        <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-2">Social</p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Github className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-sm text-indigo-900 dark:text-indigo-100">{social.github}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Linkedin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-sm text-indigo-900 dark:text-indigo-100">{social.linkedin}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Twitter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-sm text-indigo-900 dark:text-indigo-100">{social.twitter}</span>
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
                        className="pt-4 border-t border-indigo-200 dark:border-indigo-700"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
                                {availability.status}
                            </span>
                        </div>
                        <div className="text-xs text-indigo-600 dark:text-indigo-300 space-y-1">
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
            className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-700 max-w-md"
        >
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-4 capitalize">
                {type} Information
            </h3>

            {type === "email" && typeof info === "string" && (
                <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-indigo-900 dark:text-indigo-100">{info}</span>
                </div>
            )}

            {type === "social" && info && typeof info === 'object' && 'github' in info && (
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm text-indigo-900 dark:text-indigo-100">
                            {(info as SocialInfo).github}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Linkedin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm text-indigo-900 dark:text-indigo-100">
                            {(info as SocialInfo).linkedin}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Twitter className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm text-indigo-900 dark:text-indigo-100">
                            {(info as SocialInfo).twitter}
                        </span>
                    </div>
                </div>
            )}

            {type === "availability" && info && typeof info === 'object' && 'status' in info && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-indigo-900 dark:text-indigo-100">
                            {(info as AvailabilityInfo).status}
                        </span>
                    </div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-300">
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
