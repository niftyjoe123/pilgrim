export const DLG = {
shepherds:{glyph:'🏔', title:'The Delectable Mountains', text:[
  'Four shepherds — Knowledge, Experience, Watchful, and Sincere — keep their flocks here, where the road climbs into open, sunlit country.',
  `<p class="speech">"Come," says one, "and look." From the mountaintop they show you a distant gate, gleaming faint and far off. "That is the place you are bound for. The road grows strange before it grows easy — mind the Enchanted Ground ahead, and do not grow proud of how far you have already come."</p>`],
 onEnd:{verse:{ref:'Isaiah 40:11', text:'He shall feed his flock like a shepherd: he shall gather the lambs with his arm, and carry them in his bosom.'}},
 choices:[{label:'Take their counsel to heart.', fx:{wisdom:1}, toast:'+1 Wisdom', act:'metShepherds', end:true}]},

ignorance:{glyph:'😊', title:'Ignorance', text:[
  'A cheerful young man walks the road a little ahead of you, whistling, sure of his own step.',
  `<p class="speech">"I have always thought good thoughts, and lived an honest life," he says, when you ask how he means to enter the City. "My heart tells me it will be well with me. I never troubled myself with any Wicket Gate — I came in by a pleasanter path, and it has served me fine so far."</p>`,
  'You try, gently, to tell him that a good heart by his own reckoning is not the same as a burden truly laid down at the Cross. He only laughs, and walks on ahead, whistling still.'],
 onEnd:{verse:{ref:'Matthew 7:21', text:'Not every one that saith unto me, Lord, Lord, shall enter into the kingdom of heaven; but he that doeth the will of my Father.'}},
 choices:[
  {label:'"There is a way that seems right to a man..." Try once more to reach him.', fx:{wisdom:1}, toast:'+1 Wisdom', act:'metIgnorance', end:true},
  {label:'Let him go his way, and grieve for him.', fx:{love:1}, toast:'+1 Love', act:'metIgnorance', end:true}]},

flatterer_intro:{glyph:'🎩', title:'Flatterer', text:[
  'A smooth, well-dressed man falls into step, admiring your endurance. "Such a long, steep road you have chosen! I know a shorter way — it rejoins the true path again just ahead, and saves you the worst of the climb."'],
 choices:[
  {label:'"We know this is not our road." Refuse, and walk on past him.', req:{stat:'wisdom', min:4}, fx:{wisdom:1}, toast:'+1 Wisdom · You see through him, and are not caught.', act:'flatteredAndFreed', end:true},
  {label:'Follow him, trusting his confident manner.', next:'flatterer_net'}]},

flatterer_net:{glyph:'🕸', title:'Flatterer', text:[
  'The path narrows, and before you know it a fine net drops from the trees above, tangling you both fast. Flatterer is nowhere to be seen.',
  `<p class="speech">A Shining One finds you struggling, and cuts you free without a word of scorn — only a gentle rebuke. "You were warned to trust no guide but the road itself. Go on, and be more watchful."</p>`],
 onEnd:{verse:{ref:'Psalm 25:15', text:'Mine eyes are ever toward the LORD; for he shall pluck my feet out of the net.'}},
 choices:[{label:'Accept the correction, and be more watchful.', fx:{wisdom:1}, toast:'+1 Wisdom', act:'flatteredAndFreed', end:true}]},

atheist:{glyph:'🙄', title:'An Atheist', text:[
  'A man comes toward you, walking the other way — away from the City you seek.',
  `<p class="speech">"I have gone twenty years down this road looking for the place you're chasing," he says, laughing. "There is nothing at the end of it but more road. Turn back with me, and save yourself the walk."</p>`],
 onEnd:{verse:{ref:'Hebrews 11:1', text:'Now faith is the substance of things hoped for, the evidence of things not seen.'}},
 choices:[{label:'"We walk by faith, not by sight." Walk on.', fx:{faith:1}, toast:'+1 Faith', act:'metAtheist', end:true}]},

enchanted_ground:{glyph:'🥱', title:'The Enchanted Ground', text:[
  'The road grows warm and hazy here; a drowsiness settles over the ground itself, and your eyelids grow heavy despite the daylight.'],
 onEnd:{verse:{ref:'Romans 13:11', text:'Now it is high time to awake out of sleep: for now is our salvation nearer than when we believed.'}},
 choices:[
  {label:'Sit down, just for a moment, to rest your eyes.', fx:{resolve:-2}, toast:'😴 −2 Resolve · You wake with a start, unsure how long you slept.', act:'metEnchanted', end:true},
  {label:'Keep talking with Hopeful, and stay on your feet.', fx:{endurance:1}, toast:'+1 Endurance', act:'metEnchanted', end:true}]},

beulah:{glyph:'🌼', title:'Beulah Land', text:[
  'Gardens heavy with fruit, birds singing day and night, the sun always shining — this is Beulah Land, the last resting place before the River. A resident greets you warmly.',
  `<p class="speech">"Rest here a while," she says. "Everyone gathers strength here, before the last crossing."</p>`],
 onEnd:{verse:{ref:'Isaiah 62:4', text:'Thou shalt no more be termed Forsaken... but thou shalt be called Hephzibah... for the LORD delighteth in thee.'}},
 choices:[{label:'Rest a while, and let your strength return.', fx:{hope:1, love:1}, toast:'+1 Hope, +1 Love', act:'metBeulah', end:true}]},

river_edge:{glyph:'🌊', title:'The River of Death', text:[
  'The road ends at a wide, dark river, with no bridge and no ford. On the far side — you can just make it out — shining gates, and towers of light.'],
 choices:[{label:'"We must go through, or not at all." Step into the water.', next:'river_crossing1'}]},

river_crossing1:{glyph:'🌊', title:'Crossing the River', text:[
  'The water is colder and deeper than you feared, and the current pulls hard. For a moment, old fears rise up with the water — every doubt you have carried the whole road returns at once.',
  `<p class="speech">"Be of good cheer!" Hopeful calls, gripping your hand. "I feel the bottom, and it is good!"</p>`],
 choices:[{label:"Hold to Hopeful's hand, and keep wading.", next:'river_crossing2'}]},

river_crossing2:{glyph:'✨', title:'Crossing the River', text:[
  'Little by little the fear loosens its grip. The far bank draws nearer. Two Shining Ones wait at the water\'s edge to receive you.'],
 onEnd:{verse:{ref:'Isaiah 43:2', text:'When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.'}},
 choices:[{label:'Come up out of the river, into the light.', act:'riverCrossed', end:true}]},

shining_welcome:{glyph:'✨', title:'A Shining One', text:[
  `<p class="speech">"Your rags are changed, pilgrim," says the Shining One, taking your hand. "The King himself has sent for you."</p>`],
 choices:[{label:'Bow your head, and give thanks.', end:true}]},

act5Finale:{glyph:'👑', title:'The Celestial City', text:[
  'The gates open before you. Bells ring across a City you cannot see the end of. A great voice cries, "Enter ye into the joy of your Lord."',
  'Every burden this road ever cost you — the swamp, the lions, Apollyon, Vanity Fair, the dark valley, the river itself — is not forgotten. It is, somehow, part of the welcome.',
  '<b>— YOU HAVE REACHED THE CELESTIAL CITY —</b>',
  '<b>— PILGRIM: PART I COMPLETE —</b>'],
 onEnd:{verse:{ref:'Revelation 22:14', text:'Blessed are they that do his commandments, that they may have right to the tree of life, and may enter in through the gates into the city.'}},
 choices:[
  {label:'View your pilgrim\'s record.', next:'summary'},
  {label:'Keep wandering the map.', end:true},
  {label:'Begin the journey again.', act:'restart', end:true}]}
};
