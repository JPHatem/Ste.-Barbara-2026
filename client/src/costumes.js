// ============================================================
// Costume presets — each defines how the Stage page looks
// when a child wearing that costume is presented.
// ============================================================

export const COSTUMES = [
  { id: 'none',         label: 'None',                 theme: 'classic',  animation: 'fade',      icon: 'none',      animationFile: null },
  { id: 'princess',     label: 'Princess',             theme: 'royal',    animation: 'zoom',      icon: 'crown',     animationFile: 'Royal' },
  { id: 'ballerina',    label: 'Ballerina',            theme: 'classic',  animation: 'slide-up',  icon: 'ballet',    animationFile: null },
  { id: 'ladybug',      label: 'Ladybug',              theme: 'royal',    animation: 'glitter',   icon: 'ladybug',   animationFile: 'Ladybug' },
  { id: 'superhero',    label: 'Superhero',            theme: 'midnight', animation: 'flip',      icon: 'cape',      animationFile: 'Superhero' },
  { id: 'prince',       label: 'Prince',               theme: 'royal',    animation: 'fade',      icon: 'crown',     animationFile: 'Royal' },
  { id: 'fairy',        label: 'Fairy',                theme: 'classic',  animation: 'glitter',   icon: 'fairy',     animationFile: 'Fairy' },
  { id: 'pirate',       label: 'Pirate',               theme: 'sunset',   animation: 'slide-up',  icon: 'pirate',    animationFile: 'Pirate' },
  { id: 'astronaut',    label: 'Astronaut',            theme: 'midnight', animation: 'zoom',      icon: 'rocket',    animationFile: 'Astronaut' },
  { id: 'chef',         label: 'Chef',                 theme: 'sunset',   animation: 'fade',      icon: 'chef',      animationFile: null },
  { id: 'doctor',       label: 'Doctor',               theme: 'classic',  animation: 'fade',      icon: 'doctor',    animationFile: null },
  { id: 'cat',          label: 'Cat',                  theme: 'sunset',   animation: 'slide-up',  icon: 'cat',       animationFile: null },
  { id: 'butterfly',    label: 'Butterfly',            theme: 'classic',  animation: 'glitter',   icon: 'butterfly', animationFile: null },
  { id: 'flower',       label: 'Flower',               theme: 'sunset',   animation: 'fade',      icon: 'flower',    animationFile: null },
  { id: 'angel',        label: 'Angel',                theme: 'classic',  animation: 'glitter',   icon: 'angel',     animationFile: null },
  { id: 'snowman',      label: 'Snowman',              theme: 'midnight', animation: 'zoom',      icon: 'snowman',   animationFile: null },
  { id: 'ice-princess', label: 'Ice Princess',         theme: 'midnight', animation: 'glitter',   icon: 'snow',      animationFile: null },
  { id: 'superman',     label: 'Superman',             theme: 'neon',     animation: 'zoom',      icon: 'cape',      animationFile: 'Superhero' },
  { id: 'batman',       label: 'Batman',               theme: 'midnight', animation: 'flip',      icon: 'bat',       animationFile: null },
  { id: 'spiderman',    label: 'Spiderman',            theme: 'royal',    animation: 'zoom',      icon: 'spider',    animationFile: 'Spiderman' },
  { id: 'policeman',    label: 'Policeman',            theme: 'classic',  animation: 'fade',      icon: 'badge',     animationFile: null },
  { id: 'firefighter',  label: 'Firefighter',          theme: 'sunset',   animation: 'fade',      icon: 'fire',      animationFile: null },
  { id: 'cowboy',       label: 'Cowboy',               theme: 'sunset',   animation: 'slide-up',  icon: 'hat',       animationFile: null },
  { id: 'ninja',        label: 'Ninja',                theme: 'midnight', animation: 'flip',      icon: 'ninja',     animationFile: null },
  { id: 'dinosaur',     label: 'Dinosaur',             theme: 'neon',     animation: 'zoom',      icon: 'dino',      animationFile: null },
  { id: 'unicorn',      label: 'Unicorn',              theme: 'classic',  animation: 'glitter',   icon: 'unicorn',   animationFile: null },
  { id: 'mermaid',      label: 'Mermaid',              theme: 'neon',     animation: 'glitter',   icon: 'fairy',     animationFile: null },
  { id: 'witch',        label: 'Witch',                theme: 'midnight', animation: 'glitter',   icon: 'hat',       animationFile: null },
  { id: 'vampire',      label: 'Vampire',              theme: 'royal',    animation: 'flip',      icon: 'bat',       animationFile: null },
  { id: 'ghost',        label: 'Ghost',                theme: 'classic',  animation: 'fade',      icon: 'angel',     animationFile: null },
  { id: 'robot',        label: 'Robot',                theme: 'neon',     animation: 'zoom',      icon: 'rocket',    animationFile: null },
  { id: 'dragon',       label: 'Dragon',               theme: 'sunset',   animation: 'zoom',      icon: 'dino',      animationFile: null },
  { id: 'knight',       label: 'Knight',               theme: 'midnight', animation: 'flip',      icon: 'badge',     animationFile: null },
  { id: 'wizard',       label: 'Wizard',               theme: 'royal',    animation: 'glitter',   icon: 'fairy',     animationFile: null },
  { id: 'queen',        label: 'Queen',                theme: 'royal',    animation: 'fade',      icon: 'crown',     animationFile: null },
  { id: 'king',         label: 'King',                 theme: 'royal',    animation: 'fade',      icon: 'crown',     animationFile: null },
  
  // --- NEW COSTUMES ---
  { id: 'bessara',      label: 'Bessara',              theme: 'royal',    animation: 'glitter',   icon: 'fairy',     animationFile: null }, 
  { id: 're2asa',       label: 'Re2asa',               theme: 'sunset',   animation: 'glitter',   icon: 'flower',    animationFile: null }, 
  { id: 'spiritual',    label: 'Spiritual',            theme: 'classic',  animation: 'fade',      icon: 'angel',     animationFile: null }, 
  { id: 'teacher',      label: 'Teacher',              theme: 'classic',  animation: 'fade',      icon: 'badge',     animationFile: null },
  { id: 'clown',        label: 'Clown',                theme: 'neon',     animation: 'slide-up',  icon: 'hat',       animationFile: null },
  { id: 'pop-corn',     label: 'Pop Corn Bucket',      theme: 'sunset',   animation: 'zoom',      icon: 'chef',      animationFile: null },
  { id: 'animal',       label: 'Animal',               theme: 'classic',  animation: 'zoom',      icon: 'cat',       animationFile: null }, 
  { id: 'grandpa',      label: 'Grandpa',              theme: 'classic',  animation: 'fade',      icon: 'none',      animationFile: null },
  { id: 'grandma',      label: 'Grandma',              theme: 'classic',  animation: 'fade',      icon: 'none',      animationFile: null },
  { id: 'royal-girl',   label: 'Royal Girl',           theme: 'royal',    animation: 'glitter',   icon: 'crown',     animationFile: 'Royal' },
  { id: 'royal-boy',    label: 'Royal Boy',            theme: 'royal',    animation: 'glitter',   icon: 'crown',     animationFile: 'Royal' },
  { id: 'bride',        label: 'Bride',                theme: 'classic',  animation: 'fade',      icon: 'flower',    animationFile: null },
  { id: 'tic-tac',      label: 'Tic Tac / Candy',      theme: 'sunset',   animation: 'zoom',      icon: 'none',      animationFile: null }, 
  { id: 'tea-bag',      label: 'Tea Bag',              theme: 'classic',  animation: 'fade',      icon: 'none',      animationFile: null },
  { id: 'magician',     label: 'Magician',             theme: 'midnight', animation: 'flip',      icon: 'hat',       animationFile: null }
];

// Get a costume by id
export const getCostume = (id) =>
  COSTUMES.find((c) => c.id === id) || COSTUMES[0];

// Find a costume by free-text label (case-insensitive, ignores spaces)
export const findCostumeByLabel = (text) => {
  if (!text) return null;
  const normalized = text.trim().toLowerCase().replace(/\s+/g, '');
  if (!normalized) return null;
  return (
    COSTUMES.find(
      (c) => c.label.toLowerCase().replace(/\s+/g, '') === normalized
    ) || null
  );
};

// Suggest costumes matching the user's text (for autocomplete)
export const suggestCostumes = (text) => {
  if (!text) return [];
  const normalized = text.trim().toLowerCase();
  if (!normalized) return [];
  return COSTUMES.filter(
    (c) =>
      c.id !== 'none' &&
      (c.label.toLowerCase().includes(normalized) ||
        c.id.toLowerCase().includes(normalized))
  ).slice(0, 8);
};