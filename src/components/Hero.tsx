import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Mail, Link, ArrowLeft } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Howl } from 'howler';
import { Scene } from './Scene';
import { LoadingScreen } from './LoadingScreen';
import { getCloudinaryUrl } from '../utils/cloudinary';

export function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const ambientSoundUrl = getCloudinaryUrl('ftp3wymgpbjc6xfy1myr', {
      resourceType: 'video',
      secure: true
    });

    const ambientSound = new Howl({
      src: [ambientSoundUrl],
      loop: true,
      volume: 0.3,
    });
    setSound(ambientSound);

    // Start loading assets
    setTimeout(() => setIsLoading(false), 3000);

    return () => {
      ambientSound.unload();
    };
  }, []);

  const handleSectionClick = (section: string) => {
    setIsTransitioning(true);
    document.body.style.overflow = 'hidden';
    setCurrentSection(section);
    sound?.play();
    setTimeout(() => {
      setIsTransitioning(false);
      document.body.style.overflow = 'auto';
    }, 1000);
  };

  const handleBackClick = () => {
    setIsTransitioning(true);
    document.body.style.overflow = 'hidden';
    setCurrentSection(null);
    setTimeout(() => {
      setIsTransitioning(false);
      document.body.style.overflow = 'auto';
    }, 1000);
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-black via-blue-950 to-purple-950">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [8, 4, 8] }}>
          <Scene 
            onSectionClick={handleSectionClick}
            currentSection={currentSection}
            isTransitioning={isTransitioning}
          />
        </Canvas>
      </div>

      {/* Back Button */}
      <AnimatePresence>
        {currentSection && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={handleBackClick}
            className="fixed top-4 left-4 z-20 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Section Content */}
      <AnimatePresence>
        {currentSection && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="relative z-10 h-full overflow-y-auto scrollbar-hide px-4 py-20"
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg">
                {currentSection === 'projects' && (
                  <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-white mb-8">Projects</h2>
                    
                    <div className="space-y-12">
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2">Bolt</h3>
                        <p className="text-gray-300 mb-4">
                          A powerful AI assistant and exceptional senior software developer with vast knowledge across multiple programming languages, frameworks, and best practices.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">TypeScript</span>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">React</span>
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Node.js</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2">Webcontainer API Demo</h3>
                        <p className="text-gray-300 mb-4">
                          A demonstration of the WebContainer API capabilities, showcasing browser-based development environments.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">JavaScript</span>
                          <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">WebAssembly</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2">Portfolio</h3>
                        <p className="text-gray-300 mb-4">
                          A creative and interactive 3D portfolio website built with Three.js and React, featuring a unique Japanese ramen shop theme.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Three.js</span>
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">React</span>
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">TypeScript</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentSection === 'about' && (
                  <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-white mb-8">About t2ne</h2>
                    
                    <div className="prose prose-invert">
                      <p className="text-gray-300">
                        I'm a passionate software developer with a focus on creating innovative solutions and pushing the boundaries of web technology. Currently working at StackBlitz, I'm dedicated to making development environments more accessible and efficient.
                      </p>
                      
                      <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Skills</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">Languages</h4>
                          <ul className="list-disc list-inside text-gray-300">
                            <li>TypeScript</li>
                            <li>JavaScript</li>
                            <li>Python</li>
                            <li>Rust</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">Technologies</h4>
                          <ul className="list-disc list-inside text-gray-300">
                            <li>React</li>
                            <li>Node.js</li>
                            <li>WebAssembly</li>
                            <li>Three.js</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-2xl font-semibold text-white mt-8 mb-4">Experience</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-medium text-white">Software Developer @ StackBlitz</h4>
                          <p className="text-gray-400">Present</p>
                          <p className="text-gray-300 mt-2">
                            Working on innovative web development tools and browser-based development environments.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentSection === 'skills' && (
                  <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-white mb-8">Skills & Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-4">Frontend</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li>• React & Next.js</li>
                          <li>• Three.js & WebGL</li>
                          <li>• TypeScript</li>
                          <li>• Modern CSS & Tailwind</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-4">Backend</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Node.js</li>
                          <li>• WebAssembly</li>
                          <li>• API Design</li>
                          <li>• Database Architecture</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                {currentSection === 'contact' && (
                  <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-white mb-8">Get in Touch</h2>
                    <p className="text-gray-300 mb-6">
                      I'm always interested in hearing about new projects and opportunities. Feel free to reach out through any of these channels:
                    </p>
                    <div className="space-y-4">
                      <a href="mailto:hi@t2ne.eu" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                        <Mail size={24} />
                        <span>hi@t2ne.eu</span>
                      </a>
                      <a href="https://github.com/t2ne" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                        <Github size={24} />
                        <span>github.com/t2ne</span>
                      </a>
                      <a href="https://linkedin.com/in/t2ne" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                        <Linkedin size={24} />
                        <span>linkedin.com/in/t2ne</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Links */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-6 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full"
        >
          <a
            href="https://github.com/t2ne"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/t2ne"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:hi@t2ne.eu"
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://linktr.ee/t2ne"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Linktree"
          >
            <Link size={20} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}