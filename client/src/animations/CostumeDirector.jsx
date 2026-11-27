import React from 'react';
import { getCostume } from '../costumes';
import Royal from './Royal';
import Ladybug from './Ladybug';
import Superhero from './Superhero';
import Spiderman from './Spiderman';
import Fairy from './Fairy';
import Pirate from './Pirate'
import Astronaut from './Astronaut'

const ANIMATION_MAP = {
  'Royal': Royal,
  'Ladybug': Ladybug,
  'Superhero': Superhero,
  'Spiderman': Spiderman, 
  'Fairy' : Fairy,
  'Pirate' : Pirate,
  'Astronaut' : Astronaut,
};



export default function CostumeDirector({ costume, childName }) {
  const costumeData = typeof costume === 'string' ? getCostume(costume) : costume;
  const animationFile = costumeData?.animationFile;

  // --- DEBUGGING LINE ---
  console.log("Director Check:", { costumeData, animationFile, foundComponent: !!ANIMATION_MAP[animationFile] });

  if (!animationFile || !ANIMATION_MAP[animationFile]) {
    return <h1 className="stage-child-name">{childName}</h1>;
  }

  const AnimationComponent = ANIMATION_MAP[animationFile];

  return (
    <AnimationComponent type={costumeData.id}>
      <h1 className="stage-child-name">{childName}</h1>
    </AnimationComponent>
  );
}