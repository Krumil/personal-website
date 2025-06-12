"use client";

import React from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export default function QuantumLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <Loader2 className="w-12 h-12 text-blue-400" />
        </motion.div>
        
        <motion.h2
          className="text-xl font-semibold text-white"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Quantum State Loading...
        </motion.h2>
        
        <p className="text-blue-200 text-sm">
          Preparing the universe for observation
        </p>
      </motion.div>
    </div>
  );
}