export const DLG = {
simple:{glyph:'😴', title:'Simple', text:[
  'A man lies fast asleep beside the path, an iron fetter loose about his ankle.',
  `<p class="speech">You shake his shoulder. He blinks up at you. "Wake? Why? I see no danger here."</p>`,
  'He is asleep again before you have taken three steps.'],
 choices:[{label:'Leave him to his rest — and his fetter.', end:true}]},

sloth:{glyph:'😴', title:'Sloth', text:[
  'A second sleeper, fettered like the first, waves you off without opening his eyes.',
  `<p class="speech">"Yet a little more sleep…"</p>`],
 choices:[{label:'Walk on. You cannot want a soul awake more than it wants itself.', fx:{wisdom:1}, toast:'+1 Wisdom', end:true}]},

presumption:{glyph:'😴', title:'Presumption', text:[
  'The third sleeper does not even trouble to look up.',
  `<p class="speech">"Every tub must stand upon its own bottom. I don't need your help."</p>`],
 choices:[{label:'"Then may you wake before the roaring lion finds you." Go on.', fx:{hope:1}, toast:'+1 Hope', end:true}]},

formalist_hypocrisy:{glyph:'🥸', title:'Formalist & Hypocrisy', text:[
  'Two men come tumbling over the low wall beside the road, dust themselves off, and fall into step beside you.',
  `<p class="speech">"We are pilgrims too, bound for the Celestial City — by the shorter road. Why waste time walking all the way round to that narrow gate?"</p>`],
 onEnd:{verse:{ref:'John 10:1', text:'He that entereth not by the door into the sheepfold, but climbeth up some other way, the same is a thief and a robber.'}},
 choices:[
  {label:'"The one who climbs in some other way, and not by the door, is a thief and a robber." Walk on ahead of them.',
   req:{stat:'faith', min:3}, fx:{faith:1}, toast:'+1 Faith · They only laugh, and fall behind.', end:true},
  {label:'Say nothing, and simply outpace them.', end:true}]},

timorous_mistrust:{glyph:'😨', title:'Timorous & Mistrust', text:[
  'Two men come running down the hill toward you, faces white with fear.',
  `<p class="speech">"Turn back! There are lions in the narrow passage ahead — we could not tell if they were chained or loose, and we dared not find out!"</p>`],
 choices:[
  {label:'"To go back is certain ruin. To go on is, at worst, a fearful road. I must go on."', fx:{endurance:1}, toast:'+1 Endurance · They run on past you, down the hill.', end:true},
  {label:'"Thank you for the warning, friends — go safely." Go on anyway.', fx:{hope:1}, toast:'+1 Hope', end:true}]},

watchful:{glyph:'🛡', title:'Watchful, the Porter', text:[
  'A steady man stands before the Palace gate, eyeing the passage behind you.',
  `<p class="speech">"Is your strength so small? Those lions are chained — set there for the trial of faith, and to discover who is faithless. Keep to the middle of the path and no harm will come to you."</p>`],
 onEnd:{verse:{ref:'Psalm 91:11-13', text:'For he shall give his angels charge over thee… thou shalt tread upon the lion and adder.'}},
 choices:[{label:'"Then I will not turn aside for their roaring." Steady yourself, and go on.', fx:{faith:1}, toast:'+1 Faith', end:true}]},

arbor:{glyph:'🪑', title:'The Arbor', text:[
  'Part-way up the steep hill, a wooden bench sits beneath a leafy roof — built, it seems, by the Lord of the hill himself, for weary travelers.'],
 choices:[
  {label:'Sit down and rest a while.', act:'restAtArbor', toast:'😴 Sleep overtakes you… when you wake, your scroll is gone from your hand!', end:true},
  {label:'Press on without stopping. The day is not yet spent.', end:true}]},

arbor_found:{glyph:'📜', title:'The Arbor', text:[
  'You search beneath the bench where you slept — and there, half-hidden in the leaves, is your scroll.'],
 choices:[{label:'Snatch it up and hold it close.', act:'scrollFound', toast:'📜 Your scroll is found! With sorrow for the lost time, you turn again to climb.', end:true}]},

discretion:{glyph:'🚪', title:'Discretion', text:[
  `<p class="speech">A grave, gentle woman opens the door. "Whence do you come, and whither are you bound?"</p>`,
  `<p class="speech">You tell her your errand. She studies you a moment, then smiles. "Come in — this house was built by the Lord of the hill, for the relief and safety of pilgrims."</p>`],
 choices:[{label:'Enter the Palace Beautiful.', act:'palaceReached', end:true}]},

discretion_noscroll:{glyph:'🚪', title:'Discretion', text:[
  `<p class="speech">Discretion looks at your empty hands, and her face falls kind but firm.</p>`,
  `<p class="speech">"Where is your scroll, pilgrim? It is your pass, and without it I cannot bring you in to the family. Go back and find it — I will wait."</p>`],
 choices:[{label:'Go back down the hill for it.', end:true}]},

prudence:{glyph:'🧭', title:'Prudence', text:[
  `<p class="speech">"Tell me," she asks, "do you ever think of the country you came from?"</p>`],
 choices:[
  {label:'"With shame — I am glad to be free of it, and bound for a better country."', fx:{humility:1}, toast:'+1 Humility', end:true},
  {label:'"Sometimes — but the thought only quickens my steps forward."', fx:{hope:1}, toast:'+1 Hope', end:true}]},

piety:{glyph:'📖', title:'Piety', text:[
  `<p class="speech">"What moved you to become a pilgrim at all?" she asks.</p>`,
  `<p class="speech">You tell her of the Burden, and of Evangelist, and of the Cross where it fell away.</p>`],
 choices:[{label:'"I love Him, because He first eased me of my heavy burden."', fx:{faith:1}, toast:'+1 Faith', end:true}]},

charity:{glyph:'❤', title:'Charity', text:[
  `<p class="speech">"Have you a family?" Charity asks. "Why did you not bring them with you?"</p>`,
  `<p class="speech">"I begged them to come," you say. "But they thought me a madman, and stayed behind."</p>`],
 choices:[
  {label:'"I pray for them still, every day, that they will follow."', fx:{love:1}, toast:'+1 Love', end:true},
  {label:'Say nothing — the grief is still close.', fx:{resolve:-1}, toast:'−1 Resolve', end:true}]},

room5:{glyph:'📜', title:'The Study', text:[
  'Along the walls hang records of great age — the deeds of the Lord of the hill, and the names of pilgrims He has led home before you.',
  `<p class="speech">You read of ordinary travelers who shut the mouths of lions, quenched raging fire, and were made strong out of weakness.</p>`],
 choices:[{label:'Take courage from what you have read.', fx:{wisdom:1}, toast:'+1 Wisdom', end:true}]},

room6:{glyph:'⚔', title:'The Armory', text:[
  'Racks of gleaming equipment line this room — enough, it seems, to arm as many pilgrims as there are stars in the sky.',
  `<p class="speech">"Take what you need for the road ahead," says the armorer, and fits you with a sword, a shield, a helmet, a breastplate, the shoes of readiness, and the belt of all-prayer.</p>`],
 onEnd:{verse:{ref:'Ephesians 6:11', text:'Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.'}},
 choices:[{label:'Put on the whole armor of God.', act:'armorGiven', toast:'⚔ You are armed for what lies ahead.', end:true}]},

act2Finale:{glyph:'🏔', title:'End of Act II', text:[
  'Discretion, Piety, Charity and Prudence walk with you down to the foot of the hill, and press bread, wine, and a cluster of raisins into your hands before turning back.',
  'Ahead lies the Valley of Humiliation — and somewhere in it, they say, a foul fiend named Apollyon does not intend to let you pass.',
  '<b>— ACT II COMPLETE —</b>'],
 choices:[
  {label:'View your pilgrim\'s record.', next:'summary'},
  {label:'Keep wandering the map.', end:true},
  {label:'Begin the journey again.', act:'restart'}]}
};
