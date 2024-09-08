# Wordz

This README provides an explanation of the main components and functionality in the project.

## Main Components

### 1. Home Component

The `Home` component is the main container for the application. It sets up the overall layout and includes the `ProjectInfo` and `WordDisplay` components.

```jsx
const Home = () => (
  <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white p-4 md:p-8">
    <div className="flex w-full max-w-md flex-col items-center justify-center space-y-8">
      <ProjectInfo />
      <WordDisplay />
    </div>
  </main>
);
```

### 2. ProjectInfo Component

This component displays the project title.

```jsx
const ProjectInfo = () => (
  <div className="text-center">
    <h1 className="mb-2 text-4xl font-bold text-green-700">Wordz</h1>
    <p className="text-lg text-green-600">
      A project by <a href='https://github.com/gtchakama' target='_blank' rel='noopener noreferrer' className='text-green-500 underline hover:text-green-600'>George Chakama</a>
    </p>
  </div>
);
```

### 3. WordDisplay Component

This is the core component that manages the state of the current word and renders the `AnimatedText` and `WordSelector` components.

```jsx
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
```

### 4. AnimatedText Component

This component is responsible for rendering the animated text using Framer Motion.

```jsx
const AnimatedText = React.memo(({ characters }) => (
  <p className="flex h-44 w-full items-center justify-center rounded-3xl bg-green-100 p-8 text-4xl font-medium text-green-800 shadow-lg">
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
```

### 5. WordSelector and WordButton Components

These components create the interactive buttons for selecting words.

```jsx
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
    whileHover={{ scale: 1.05, backgroundColor: "rgb(220, 252, 231)" }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
    className={`m-1 rounded-full px-4 py-2 text-sm font-medium shadow-md ${
      isActive ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
    }`}
    onClick={onClick}
  >
    {word}
  </motion.button>
));
```

## Key Functionalities

1. **Word State Management**: The current word is managed using React's `useState` hook in the `WordDisplay` component.

2. **Character Generation**: The `useMemo` hook in `WordDisplay` generates an array of character objects, each with a unique ID and label.

3. **Word Selection**: The `handleWordChange` function updates the current word when a new word is selected.

4. **Animation**: Framer Motion is used to animate the appearance, disappearance, and repositioning of characters in the `AnimatedText` component.

5. **Performance Optimization**: `React.memo` is used to optimize performance by preventing unnecessary re-renders of components.

6. **Interactive UI**: The `WordButton` component uses Framer Motion for hover and tap animations, providing visual feedback to user interactions.
