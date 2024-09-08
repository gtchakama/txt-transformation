      "use client"

      import React, { useState, useMemo, useCallback } from 'react';
      import { AnimatePresence, motion } from 'framer-motion';

      const WORDS = ["Sparkle", "Whisper", "Bounce", "Glimmer", "Zephyr"];

      const Home = () => (
        <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-8">
          <div className="flex w-full max-w-md flex-col items-center justify-center space-y-8">
            <ProjectInfo />
            <WordDisplay />
          </div>
        </main>
      );

      const ProjectInfo = () => (
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold text-green-800">Wordz</h1>
          <p className="text-lg text-green-600"> A project by <a href='https://github.com/gtchakama' target='_blank' rel='noopener noreferrer' className='text-green-600 underline' >George Chakama</a> </p>
        </div>
      );

      const WordDisplay = () => {
        const [text, setText] = useState(WORDS[0]);

        const characters = useMemo(() => {
          return text.split('').map((char, index, array) => ({
            id: `${char.toLowerCase()}${array.slice(0, index).filter(c => c.toLowerCase() === char.toLowerCase()).length + 1}`,
            label: index === 0 ? char.toUpperCase() : char.toLowerCase()
          }));
        }, [text]);

        const handleWordChange = useCallback((word) => {
          setText(word);
        }, []);

        return (
          <div className="flex w-full flex-col items-center justify-center space-y-6">
            <AnimatedText characters={characters} />
            <WordSelector onSelectWord={handleWordChange} currentWord={text} />
          </div>
        );
      };

      const AnimatedText = React.memo(({ characters }) => (
        <p className="flex h-44 w-full items-center justify-center rounded-3xl p-8 text-4xl font-medium text-green-800 shadow-lg">
          <AnimatePresence mode="popLayout">
            {characters.map(({ id, label }) => (
              <motion.span
                key={id}
                layoutId={id}
                layout="position"
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
              >
                {label}
              </motion.span>
            ))}
          </AnimatePresence>
        </p>
      ));

      const WordSelector = React.memo(({ onSelectWord, currentWord }) => (
        <div className="flex w-full flex-wrap items-center justify-center">
          {WORDS.map((word) => (
            <WordButton
              key={word}
              word={word}
              isActive={word === currentWord}
              onClick={() => onSelectWord(word)}
            />
          ))}
        </div>
      ));

      const WordButton = React.memo(({ word, isActive, onClick }) => (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
          className={`m-1 rounded-full px-4 py-2 text-sm font-medium shadow-md ${
            isActive ? ' text-green-800' : ' text-green-600'
          }`}
          onClick={onClick}
        >
          {word}
        </motion.button>
      ));

      export default Home;
