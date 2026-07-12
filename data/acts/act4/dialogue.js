export const DLG = {
talkative:{glyph:'🗣', title:'Talkative', text:[
  'A well-spoken man falls in beside you, full of fine words about faith, grace, and the pilgrim life — though he has walked no farther than the edge of town.',
  `<p class="speech">Faithful's words come back to you: "Does his life match his talk? Is there a change in his heart, and his house, and his daily walk — or only in his mouth?"</p>`,
  'You ask him plainly. His face falls, and he mutters that you are "too extreme," and turns back toward the town.'],
 choices:[
  {label:'"A saint abroad, and a devil at home, is no saint at all."', req:{stat:'wisdom', min:3}, fx:{wisdom:1}, toast:'+1 Wisdom · He will not follow.', act:'metTalkative', end:true},
  {label:'Say nothing, and simply walk on.', act:'metTalkative', end:true}]},

evangelist_fair:{glyph:'📯', title:'Evangelist', text:[
  `<p class="speech">Evangelist meets you again on the road. "You are near Vanity Fair now," he says, gravely. "One of you may be called to seal the truth with blood, not just words. Be faithful unto death, and He will give you a crown of life."</p>`,
  'He blesses you, and is gone before you can ask him more.'],
 choices:[{label:'Take courage from his words, and walk on toward the Fair.', fx:{faith:1}, toast:'+1 Faith', act:'warnedFair', end:true}]},

vanityfair_intro:{glyph:'🎪', title:'Vanity Fair', text:[
  'The road opens onto a wide, noisy market — stalls of every worldly good, criers shouting their wares, a crowd that stops to stare at your rough, plain cloak.',
  `<p class="speech">"Look — pilgrims! What will you buy?" a merchant calls. "Everything is sold here: houses, honors, pleasures, places, kingdoms, lusts — anything a heart could want."</p>`,
  '"We buy the truth," you and Faithful answer together. The crowd\'s laughter turns, in a moment, to anger.'],
 choices:[{label:'Stand your ground, and do not answer folly with folly.', fx:{endurance:1}, toast:'+1 Endurance', next:'vanityfair_trial'}]},

vanityfair_trial:{glyph:'⚖', title:'Vanity Fair', text:[
  'You and Faithful are seized and set before the court in a cage, mocked all the while. The judge — a man named Hate-good — asks Faithful to answer for his "crimes": that he called their prince, and their fair, and its whole way of life, worthless beside the truth.',
  `<p class="speech">Faithful does not flinch. "I have spoken nothing but the truth," he says, "and I will answer for it before a greater judge than this one."</p>`],
 choices:[{label:'Watch, and hold to what you both believe.', fx:{faith:1}, toast:'+1 Faith', next:'vanityfair_faithful_death'}]},

vanityfair_faithful_death:{glyph:'✝', title:'Vanity Fair', text:[
  'The crowd condemns him. It is done quickly, and Faithful does not cry out or beg — only prays, and commends himself into better hands than theirs.',
  'You are not permitted to go with him. You can only watch, and grieve, and remember. Where he stood, later, there is nothing at all — only the road, going on.',
  `<p class="speech">You have never felt so alone on this road. And yet — somehow — you find you are not walking it alone after all.</p>`],
 onEnd:{verse:{ref:'Revelation 2:10', text:'Be thou faithful unto death, and I will give thee a crown of life.'}},
 choices:[{label:'Wipe your eyes, and see who has come to walk beside you.', next:'hopeful_joins'}]},

hopeful_joins:{glyph:'🤝', title:'Hopeful', text:[
  'A man from the crowd falls into step with you — one who watched Faithful die, and could not un-see what he saw.',
  `<p class="speech">"My name is Hopeful," he says. "Faithful's death has done more for me alive than all his words could have. I am done with Vanity Fair. Will you have me as a companion?"</p>`],
 choices:[{label:'"Gladly — and welcome." Walk on together.', fx:{hope:1, love:1}, toast:'+1 Hope, +1 Love', act:'vanityFairDone', end:true}]},

byends:{glyph:'💰', title:'By-ends', text:[
  'A well-dressed traveler named By-ends catches up with you, along with two companions — Mr. Money-love and Mr. Save-all. He is glad to walk with pilgrims, he says, "so long as the times and the company favor it."',
  `<p class="speech">"Why bear such hardship," he asks, "when a little bending of your principles could see you through so much easier?"</p>`],
 choices:[{label:'"We will not change our minds for the world\'s good favor." Walk on without him.', fx:{wisdom:1}, toast:'+1 Wisdom · By-ends and his friends fall behind, unwilling to walk the harder road.', act:'metByends', end:true}]},

giantDespair_key:{glyph:'👹', title:'Giant Despair', text:[
  'A giant of a man named Despair looms over the cell, laughing at your plight. "There is no way out of Doubting Castle," he says, "save by the grave."',
  'He locks the door and leaves you in the dark. But as you search your pockets in despair, your hand closes on something small and warm — the Key of Promise, carried all this way since the road out of the City of Destruction.'],
 onEnd:{verse:{ref:'Psalm 142:7', text:'Bring my soul out of prison, that I may praise thy name.'}},
 choices:[{label:'Fit the Key of Promise to the lock, and turn it.', fx:{faith:1}, toast:'⚷ The lock gives way at once!', act:'castleEscaped', end:true}]},

giantDespair_nokey:{glyph:'👹', title:'Giant Despair', text:[
  'A giant of a man named Despair looms over the cell, laughing at your plight. "There is no way out of Doubting Castle," he says, "save by the grave."',
  'He locks the door and leaves you in the dark, with nothing in your hands but the plain conviction that a promise once made is not so easily broken — even here.'],
 onEnd:{verse:{ref:'Micah 7:8', text:'When I fall, I shall arise; when I sit in darkness, the LORD shall be a light unto me.'}},
 choices:[{label:'Search every corner, every day, undiscouraged — until, at last, a stone gives way.', fx:{endurance:1, resolve:-2}, toast:'−2 Resolve, +1 Endurance · You break free at last.', act:'castleEscaped', end:true}]},

act4Finale:{glyph:'🌄', title:'End of Act IV', text:[
  'The road rises again, out of shadow and into open country. Ahead, the Delectable Mountains catch the last light — a resting place, they say, before the road grows hard once more.',
  '<b>— ACT IV COMPLETE —</b>'],
 choices:[
  {label:'View your pilgrim\'s record.', next:'summary'},
  {label:'Keep wandering the map.', end:true},
  {label:'Begin the journey again.', act:'restart'}]}
};
