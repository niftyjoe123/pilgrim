export const DLG = {
shepherd:{glyph:'🐑', title:'The Shepherd Boy', text:[
  'Down in the green hollow of the valley, a boy sits piping to his flock, as easy and content as a king in his palace.',
  `<p class="speech">"I am well content with what I have," he says, between verses of his song. "Little is much, when the Lord is with it."</p>`],
 onEnd:{verse:{ref:'Psalm 23:1', text:'The LORD is my shepherd; I shall not want.'}},
 choices:[{label:'Sit with him a while, and learn his contentment.', fx:{humility:1}, toast:'+1 Humility', act:'metShepherd', end:true}]},

apollyon:{glyph:'🐉', title:'Apollyon', text:[
  'The path narrows between the trees — and there, filling the whole breadth of the way, stands a monster with scales like a fish, wings like a dragon, and a mouth like a lion.',
  `<p class="speech">"I am the king of this valley," it says. "Thou art one of my subjects — all this country is mine. Turn back to thy king, or prepare to die."</p>`,
  '"I have let myself to another, even to the King of princes," you answer. There is no way around him — only through.'],
 choices:[{label:'Draw the Sword of the Spirit, and stand your ground.', act:'startApollyonBattle', end:true}]},

apollyonVictory:{glyph:'✝', title:'Apollyon Flees', text:[
  'Apollyon spreads his dragon wings, and speeds him away, that you see him no more.',
  `<p class="speech">In all this fight, you had one who helped you — and though you have suffered much, you have won the day.</p>`],
 onEnd:{verse:{ref:'James 4:7', text:'Resist the devil, and he will flee from you.'}},
 choices:[{label:'Give thanks, bind your wounds, and go on.', act:'apollyonWon', toast:'⚔ Apollyon is defeated!', end:true}]},

shadow_dread:{glyph:'😰', title:'The Valley of the Shadow of Death', text:[
  'The road narrows into deep darkness. On one hand a ditch, on the other a dangerous quag — and between them, only the narrowest path, and voices that are not quite voices, murmuring just past what you can make out.',
  `<p class="speech">Every step feels like it might be your last. And yet — somehow — your feet keep finding the path.</p>`],
 choices:[{label:'Keep to the center, and press on by feel more than sight.', fx:{faith:1}, toast:'+1 Faith', act:'shadowPassed', end:true}]},

faithful:{glyph:'🚶', title:'Faithful', text:[
  'A familiar figure catches up to you on the road — a fellow-townsman, fled from the City of Destruction not long after you did.',
  `<p class="speech">"Christian! I hoped to overtake you. Shall we go on together, as companions?"</p>`],
 choices:[{label:'"With all my heart — and glad of the company." Walk on together.', fx:{love:1}, toast:'+1 Love', act:'metFaithful', end:true}]},

act3Finale:{glyph:'🌄', title:'End of Act III', text:[
  'The Valley of the Shadow of Death lies behind you, and the sun is up. Faithful walks beside you now, and the road ahead no longer feels quite so lonely.',
  '<b>— ACT III COMPLETE —</b>'],
 choices:[
  {label:'Continue toward Vanity Fair.', act:'startAct4', end:true},
  {label:'View your pilgrim\'s record.', next:'summary'},
  {label:'Keep wandering the map.', end:true},
  {label:'Begin the journey again.', act:'restart'}]}
};
