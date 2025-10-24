import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const CreateAccount = () => {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 via-transparent to-gray-900/5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
          Ready to Take the Next Step?
        </h2>

        {/* Subheading */}
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6">
          Start your developer journey with confidence. Whether you’re learning,
          sharing, or collaborating — this is your space to grow and create.
        </p>

        {/* Supporting Text */}
        <p className="text-gray-600 text-base max-w-2xl mx-auto mb-12">
          Build connections, share your ideas, and level up with others who are
          just as passionate about tech as you are. Let’s make something amazing
          together.
        </p>

        {/* Call to Action */}
        <Link to="/auth">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-gray-900 via-gray-800 to-black hover:from-black hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            Create Account
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>

        {/* Mini Note */}
        <p className="mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-900 font-semibold underline hover:opacity-80"
          >
            Sign in here
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default CreateAccount;
