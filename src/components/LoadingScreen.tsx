import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="relative">
        {/* Animated Torii Gate */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-56 relative"
        >
          {/* Main pillars */}
          <motion.div
            className="absolute left-8 bottom-0 w-4 h-full bg-red-600"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute right-8 bottom-0 w-4 h-full bg-red-600"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Horizontal beams */}
          <motion.div
            className="absolute top-8 left-4 right-4 h-4 bg-red-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <motion.div
            className="absolute top-0 left-2 right-2 h-4 bg-red-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          />

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 w-24 h-24"
          >
            <div className="absolute inset-0 border-4 border-red-600 rounded-full" />
            <div className="absolute inset-2 border-2 border-red-400 rounded-full" />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-2 border-red-300 rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Loading text with Japanese characters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-red-400 text-sm mb-1">ローディング中</p>
          <p className="text-white font-semibold tracking-wider">Loading...</p>
        </motion.div>
      </div>
    </motion.div>
  );
}