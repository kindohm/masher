import { Howl } from 'howler';

import DisDrum1 from './sounds/dis/drum1.mp3';
import DisDrum1Accent from './sounds/dis/drum1Accent.mp3';
import DisDrum2 from './sounds/dis/drum2.mp3';
import DisDrum2Accent from './sounds/dis/drum2Accent.mp3';
import DisDrum3 from './sounds/dis/drum3.mp3';
import DisDrum3Accent from './sounds/dis/drum3Accent.mp3';
import DisSynth1 from './sounds/dis/synth1.mp3';
import DisSynth2 from './sounds/dis/synth2.mp3';
import DisSynth3 from './sounds/dis/synth3.mp3';
import DisSynth4 from './sounds/dis/synth4.mp3';
import DisSynth5 from './sounds/dis/synth5.mp3';

import LikeBd1 from './sounds/like/bd1.mp3';
import LikeBd2 from './sounds/like/bd2.mp3';
import LikeCp1 from './sounds/like/cp1.mp3';
import LikeCp2 from './sounds/like/cp2.mp3';
import LikeSynth1a from './sounds/like/synth1a.mp3';
import LikeSynth1b from './sounds/like/synth1b.mp3';
import LikeSynth1c from './sounds/like/synth1c.mp3';
import LikeSynth1d from './sounds/like/synth1d.mp3';
import LikeSynth1e from './sounds/like/synth1e.mp3';
import LikeSynth2a from './sounds/like/synth2a.mp3';
import LikeSynth2b from './sounds/like/synth2b.mp3';
import LikeSynth2c from './sounds/like/synth2c.mp3';
import LikeSynth2d from './sounds/like/synth2d.mp3';
import LikeSynth2e from './sounds/like/synth2e.mp3';

import FriendBd1 from './sounds/friend/bd01.mp3';
import FriendSd1 from './sounds/friend/sd01.mp3';
import FriendBd2 from './sounds/friend/bd02.mp3';
import FriendSd2 from './sounds/friend/sd02.mp3';
import FriendSynth1a from './sounds/friend/synth1a.mp3';
import FriendSynth1b from './sounds/friend/synth1b.mp3';
import FriendSynth1c from './sounds/friend/synth1c.mp3';
import FriendSynth1d from './sounds/friend/synth1d.mp3';
import FriendSynth1e from './sounds/friend/synth1e.mp3';
import FriendSynth2a from './sounds/friend/synth2a.mp3';
import FriendSynth2b from './sounds/friend/synth2b.mp3';
import FriendSynth2c from './sounds/friend/synth2c.mp3';
import FriendSynth2d from './sounds/friend/synth2d.mp3';
import FriendSynth2e from './sounds/friend/synth2e.mp3';

const makeSound = (p, sound) => {
  let hSound = new Howl({
    src: [sound],
    volume: 0.8,
  });

  return hSound;
};

const getSounds = p => {
  return {
    dis: {
      drum1: makeSound(p, DisDrum1),
      drum1Accent: makeSound(p, DisDrum1Accent),
      drum2: makeSound(p, DisDrum2),
      drum2Accent: makeSound(p, DisDrum2Accent),
      drum3: makeSound(p, DisDrum3),
      drum3Accent: makeSound(p, DisDrum3Accent),
      synth1: makeSound(p, DisSynth1),
      synth2: makeSound(p, DisSynth2),
      synth3: makeSound(p, DisSynth3),
      synth4: makeSound(p, DisSynth4),
      synth5: makeSound(p, DisSynth5)
    },
    like: {
      bd1: makeSound(p, LikeBd1),
      bd2: makeSound(p, LikeBd2),
      cp1: makeSound(p, LikeCp1),
      cp2: makeSound(p, LikeCp2),
      synth1a: makeSound(p, LikeSynth1a),
      synth1b: makeSound(p, LikeSynth1b),
      synth1c: makeSound(p, LikeSynth1c),
      synth1d: makeSound(p, LikeSynth1d),
      synth1e: makeSound(p, LikeSynth1e),
      synth2a: makeSound(p, LikeSynth2a),
      synth2b: makeSound(p, LikeSynth2b),
      synth2c: makeSound(p, LikeSynth2c),
      synth2d: makeSound(p, LikeSynth2d),
      synth2e: makeSound(p, LikeSynth2e)
    },
    friend: {
      bd1: makeSound(p, FriendBd1),
      sd1: makeSound(p, FriendSd1),
      bd2: makeSound(p, FriendBd2),
      sd2: makeSound(p, FriendSd2),
      synth1a: makeSound(p, FriendSynth1a),
      synth1b: makeSound(p, FriendSynth1b),
      synth1c: makeSound(p, FriendSynth1c),
      synth1d: makeSound(p, FriendSynth1d),
      synth1e: makeSound(p, FriendSynth1e),
      synth2a: makeSound(p, FriendSynth2a),
      synth2b: makeSound(p, FriendSynth2b),
      synth2c: makeSound(p, FriendSynth2c),
      synth2d: makeSound(p, FriendSynth2d),
      synth2e: makeSound(p, FriendSynth2e)
    }
  };
};

export { getSounds };
