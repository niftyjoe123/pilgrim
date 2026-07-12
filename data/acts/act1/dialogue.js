export const DLG = {
family:{glyph:'🏚', title:'Your Family', text:[
  'Your wife and children look at you with worry. You speak once more of the Book, the fire to come, and the Burden on your back.',
  `<p class="speech">"Rest, dear heart. This frenzy will pass by morning."</p>`,
  'They will not come. Not yet.'],
 choices:[
  {label:'“Then I will go before you — and one day, I pray, you will follow the same road.”', fx:{hope:1}, toast:'+1 Hope', end:true},
  {label:'Say nothing, and hold them a while.', end:true}]},

child:{glyph:'🧒', title:'A Child of the City', text:[
  'A small boy chases a hoop down the lane, stops, and stares at your Burden.',
  `<p class="speech">"Where are you going, Mister Christian? Father says you've gone mad. Will you come back?"</p>`],
 choices:[
  {label:'“To a City brighter than the sun, little one. Learn your letters — and one day read the Book that tells of it.”',
   fx:{hope:1}, toast:'+1 Hope · The boy watches you go, hoop forgotten', end:true},
  {label:'“Pray for me — and for this city.”', fx:{faith:1}, toast:'+1 Faith', end:true}]},

obstinate:{glyph:'🧔', title:'Obstinate & Pliable', text:[
  'Two neighbors block the road out of the city.',
  `<p class="speech">Obstinate: "What! Leave your friends and comforts for a book of fables? Come back with us, you fool."</p>`],
 choices:[
  {label:'“The things I seek are better than all you would leave behind. Read the Book yourself — come with me.”',
   fx:{faith:1}, toast:'Obstinate storms home, cursing. +1 Faith', act:'obstinateLeaves', end:true},
  {label:'Answer his mockery with mockery of your own.',
   fx:{resolve:-1, wisdom:1}, toast:'The words feel good, then sour. He leaves anyway. −1 Resolve, +1 Wisdom', act:'obstinateLeaves', end:true},
  {label:'Say nothing. Step around him and keep walking.', req:{stat:'endurance', min:2},
   fx:{endurance:1}, toast:'Silence is a kind of strength. He gives up. +1 Endurance', act:'obstinateLeaves', end:true}]},

obstinate_home:{glyph:'🧔', title:'Obstinate, at Home', text:[
  'Obstinate sits by his cold hearth, arms crossed. He scowls when you enter.',
  `<p class="speech">"Come to gloat before you throw your life away? I'll not hear another word of your City. This chair, this roof — THIS is what a man can hold in his hands."</p>`],
 choices:[
  {label:'“Then I came only to say farewell, neighbor. The Book will still be here when your hands are empty.”',
   fx:{hope:1}, toast:'+1 Hope · He does not answer. But he does not curse you either.', end:true},
  {label:'Leave him to his hearth.', end:true}]},

pliable:{glyph:'😟', title:'Pliable', text:[
  `<p class="speech">"Is it true, what the Book promises? Crowns of glory, and no more crying?" He looks down the road east, then back at the city. "…I dare not yet. But if the swamp does not swallow you, perhaps I will follow."</p>`],
 choices:[
  {label:'“Watch for me from the walls, then — and keep the Book near.”', fx:{hope:1}, toast:'+1 Hope', end:true}]},

timorous:{glyph:'😨', title:'Mrs. Timorous', text:[
  'A pale woman peers at you from behind her table, wringing her hands.',
  `<p class="speech">"You're the one going east! Oh, don't. My cousin tried the road once — swamps that swallow oxen whole, and they say LIONS further on. The further you go, the more dangers you meet. Turn back, turn back while you can!"</p>`],
 choices:[
  {label:'“There are dangers, mother — but there is also a Gate that opens to all who knock. Come to the window and watch me reach it.”',
   req:{stat:'hope', min:3}, fx:{hope:1}, toast:'+1 Hope · She does not stop wringing her hands. But she moves nearer the window.', end:true},
  {label:'Listen patiently to every fear, and learn what the road ahead holds.',
   fx:{wisdom:1}, toast:'+1 Wisdom · Beneath the fear, useful truth: the swamp has swallowed many who crossed carelessly.', end:true}]},

sagacity:{glyph:'🧓', title:'Old Sagacity', text:[
  'An old man with a white beard sits wrapped in a blanket by his fire, eyes bright as a boy\'s.',
  `<p class="speech">"Ah — a pilgrim! Sit, sit. I have watched this road sixty years. Many set out; few knock at the Gate; fewer still climb past it. But those who do…" he leans close, "…they say the air itself begins to sing, out past the Delectable Mountains."</p>`],
 choices:[
  {label:'“Tell me of the Celestial City, father.”',
   fx:{hope:1}, toast:'+1 Hope · "Streets of gold, and no more tears. My own name is written there, boy — set down YOURS."', end:true},
  {label:'“Tell me of the road. What should I fear most?”',
   fx:{wisdom:1}, toast:'+1 Wisdom · "Not the lions — they are chained, though you cannot see it. Fear the FLATTERERS. Fear the smooth paths that bend away from the light."', end:true}]},

evangelist:{glyph:'🕯', title:'Evangelist', text:[
  'A man stands in the fields as though he had been waiting for you. <i>“Why do you cry?”</i> You tell him of the Book, the fire to come, and the Burden you cannot loose.',
  `<p class="speech">"If this is your condition, why do you stand still?" He hands you a parchment: <b>Flee from the wrath to come.</b></p>`,
  `<p class="speech">"Do you see that narrow Wicket Gate, far to the east in the great wall? Keep the shining light in your eye and go directly to it. But beware — the way crosses the Swamp of Despond, and flatterers walk the road."</p>`],
 onEnd:{verse:{ref:'Matthew 7:13', text:'Enter ye in at the strait gate…'}},
 choices:[
  {label:'“Life! Life! Eternal life!” — take the parchment and set your face to the east.',
   fx:{faith:1}, toast:'+1 Faith · New objective: reach the Wicket Gate', act:'metEvangelist', end:true}]},

evangelist2:{glyph:'🕯', title:'Evangelist', text:[
  `<p class="speech">"Keep the light in your eye, pilgrim. The Gate stands in the great wall to the east. Turn not aside — not for swamps, and not for well-dressed advice."</p>`],
 choices:[{label:'“I will remember.”', end:true}]},

help:{glyph:'🤝', title:'Help', text:[
  'A plain, strong man leans on a staff at the edge of the mire.',
  `<p class="speech">"This is the Swamp of Despond — the scum of doubt and fear drains here, and burdened folk sink deepest. There are good stepping stones laid across the SOUTH end of the swamp, if you have eyes for them. And if you founder, cry out — I will hear."</p>`],
 choices:[
  {label:'“Thank you, friend. I will look for the stones.”', fx:{wisdom:1}, toast:'+1 Wisdom · The stones lie across the south end of the swamp', act:'helpMet', end:true}]},

worldly:{glyph:'🎩', title:'Mr. Worldly Wiseman', text:[
  'A well-dressed gentleman of Carnal Policy eyes your Burden with theatrical pity.',
  `<p class="speech">"My good fellow — who told you to go THIS way? In the village of Morality lives a gentleman named Legality who removes burdens like yours daily. Take the path NORTH from this crossroads, just past yon hill. No gates, no swamps — and you could send for your family after."</p>`,
  'He points north, away from the shining light.'],
 choices:[
  {label:'“Perhaps I will see this hill for myself.” (You may walk north… if you choose.)', toast:'The northern path lies open. So does the road east. The choice — and the map — is yours.', end:true},
  {label:'“Evangelist told me to keep the light in my eye. Good day, sir.”', req:{stat:'faith', min:3},
   fx:{faith:1}, toast:'+1 Faith · He shakes his head at the “fanatic” and departs', end:true},
  {label:'“If Legality removes burdens, why does the hill above his village smoke and tremble?”', req:{stat:'wisdom', min:3},
   fx:{wisdom:1}, toast:'+1 Wisdom · Flattery always runs out of answers one question too soon', end:true}]},

worldly2:{glyph:'🎩', title:'Mr. Worldly Wiseman', text:[
  'The gentleman is studying his shoes with great interest.'],
 choices:[{label:'Walk on.', end:true}]},

wary:{glyph:'😰', title:'A Wary Traveler', text:[
  'A dusty man hurries westward, glancing over his shoulder at the great wall.',
  `<p class="speech">"Turn around, friend. I reached the very Gate — and an arrow split the post beside my ear! There's a dark castle by that wall, and its lord hates all who knock. I stood there thinking it over and another shaft near took my hat off. Thinking it over! At THAT door!"</p>`],
 choices:[
  {label:'“Then the fault was the lingering, not the knocking. I will knock and not stand thinking.”',
   fx:{wisdom:1}, toast:'+1 Wisdom · He stares at you, then hurries on west.', end:true},
  {label:'“May you find courage to try again one day.”', fx:{hope:1}, toast:'+1 Hope', end:true}]},

sinai:{glyph:'🌋', title:'The Hill of Sinai', text:[
  'The "easy" path dead-ends beneath a monstrous hill that overhangs the way. Fire flashes from its side, and the Burden on your back grows so heavy you cannot take another step.',
  `<p class="speech">Evangelist appears, grief and severity in his face: "Are you not the man I found crying outside the City? Worldly Wiseman's counsel has nearly cost you your life. No one was ever yet rid of a burden by Legality. Go back — the Gate still stands open."</p>`],
 choices:[
  {label:'“Sir — is there hope? May I still go to the Gate?”',
   fx:{hope:1, wisdom:1, resolve:-3}, toast:'−3 Resolve · +1 Hope, +1 Wisdom · “Only turn not aside again.”', act:'sinaiDone', end:true}]},

gate_locked:{glyph:'🚪', title:'The Wicket Gate', text:[
  'A narrow, weathered gate in the great wall. Over it is written: <i>Knock, and it shall be opened unto you.</i>',
  'But you do not yet know why you knock, or what you flee. <b>Someone in the fields west of the city was said to counsel travelers.</b>'],
 choices:[{label:'Turn back and seek counsel first.', end:true}]},

gate:{glyph:'🚪', title:'The Wicket Gate', text:[
  'The narrow gate at last. Over it: <i>Knock, and it shall be opened unto you.</i>',
  'A stone\'s throw off stands a dark castle — from which, they say, arrows are shot at those who linger before this door.'],
 choices:[
  {label:'Knock — once, twice, and keep knocking.', fx:{faith:1},
   toast:'+1 Faith · The gate swings open!', act:'openGate', next:'goodwill'},
  {label:'Hesitate. Are you truly worthy to knock?', fx:{resolve:-2},
   toast:'−2 Resolve · An arrow hisses past your ear! Hesitation here is the most dangerous ground in the world.', next:'gate'}]},

goodwill:{glyph:'🤝', title:'Goodwill', text:[
  `<p class="speech">A grave person pulls you through quickly — "lest an arrow find you." Then, kindly: "We make no objections against any. Notwithstanding all that they have done before they come hither, they are in no wise cast out."</p>`,
  'You ask if he cannot also remove the Burden from your back.',
  `<p class="speech">"Be content to bear it until you come to the place of Deliverance — for there it will fall from your back of itself. Visit the Interpreter's House, north of the road — go inside, and look well at what is shown you."</p>`],
 onEnd:{verse:{ref:'Luke 11:9', text:'Knock, and it shall be opened unto you.'}},
 choices:[{label:'Pass through the Gate.', fx:{hope:1}, toast:'+1 Hope · New objective: the Interpreter\'s House', end:true}]},

interp_welcome:{glyph:'🏛', title:'The Interpreter', text:[
  `<p class="speech">"Come in — I will show thee that which will be profitable to thee." He gestures to the living pictures hung along the north wall. "Walk to them. Look closely. Each one is a lesson for the road."</p>`],
 choices:[{label:'“I will look at them, sir.”', end:true}]},

room1:{glyph:'🧹', title:'The Parlor of Dust', text:[
  'A picture of a parlor never swept. A man begins to sweep, and the dust rises so thick it chokes everyone in the room — until a maid sprinkles water, and it is cleansed with ease.',
  `<p class="speech">"The parlor is the heart; the dust, sin. The Law's sweeping only stirs it. Grace washes it clean."</p>`],
 choices:[{label:'Take the lesson to heart.', fx:{wisdom:1}, toast:'+1 Wisdom', act:'room', end:true}]},

room2:{glyph:'🔥', title:'The Fire Against the Wall', text:[
  'A fire burns against a wall, and a figure pours water on it constantly — yet it burns higher and hotter.',
  `<p class="speech">The Interpreter leads you behind the wall: a man stands hidden, secretly feeding the flame with oil. "The work of grace is maintained even when you cannot see how."</p>`],
 choices:[{label:'Take the lesson to heart.', fx:{faith:1}, toast:'+1 Faith', act:'room', end:true}]},

room3:{glyph:'⚔', title:'The Man of Courage', text:[
  'A palace, guarded by armed men. Many would enter; all hang back afraid. Then one man steps to the writing-table and says, <b>"Set down my name, sir."</b> He draws his sword and cuts his way through — wounded, but through — and walks among those clothed in gold.'],
 choices:[{label:'Take the lesson to heart.', fx:{endurance:1}, toast:'+1 Endurance', act:'room', end:true}]},

room4:{glyph:'⛓', title:'The Man in the Iron Cage', text:[
  'A man sits sighing in an iron cage. <i>"I left off to watch and be sober. I have grieved the Spirit, and he is gone."</i>',
  `<p class="speech">"Why is he kept here?" you ask. "To make thee watchful," says the Interpreter, "in dark places ahead."</p>`],
 choices:[{label:'Remember the cage — and choose hope.', fx:{hope:1, wisdom:1}, toast:'+1 Hope, +1 Wisdom', act:'room', end:true}]},

interp_done:{glyph:'🏛', title:'The Interpreter', text:[
  `<p class="speech">"The Comforter be always with thee, good Christian, to guide thee in the way. Now — the road climbs between two walls called Salvation, east of here. What waits at the top, I will not spoil."</p>`],
 choices:[{label:'Take the road east.', toast:'New objective: climb to the place of Deliverance', end:true}]},

cross:{glyph:'✝', title:'The Cross', text:[
  'The way runs up a small ascent between two walls called <b>Salvation</b>. At the top stands a Cross, and below it, a tomb.',
  'You do nothing. You <i>can</i> do nothing. But as you come level with the Cross, the straps simply part —',
  '— and the <b>Burden falls from your back</b>, tumbles down the hill, and drops into the mouth of the tomb, and is seen no more.',
  `<p class="speech">Three Shining Ones come. "Thy sins be forgiven thee." Your rags are changed for new clothes; a mark is set on your forehead; a sealed <b>Scroll</b> is pressed into your hand — to be given in at the Celestial Gate.</p>`],
 onEnd:{verse:{ref:'Isaiah 26:1', text:'Salvation will God appoint for walls and bulwarks.'}},
 choices:[
  {label:'Stand a while, and weep, and sing — then take the road with springs in your heels.',
   act:'crossDone', toast:'The Burden is gone. Resolve restored!', end:true}]},

finale:{glyph:'🌄', title:'End of Act I', text:[
  'You are lighter than you have been in years — but the road is long. Beyond this ridge wait the <b>Hill Difficulty</b>, the <b>Palace Beautiful</b>… and in the valley past it, a fiend called <b>Apollyon</b> does not intend to let you pass.',
  '<b>— ACT I COMPLETE —</b>'],
 choices:[
  {label:'View your pilgrim\'s record.', next:'summary'},
  {label:'Keep wandering the map.', end:true},
  {label:'Begin the journey again.', act:'restart'}]},

summary:{glyph:'📜', title:'Your Pilgrim\'s Record', dynamic:true,
 choices:[
  {label:'Keep wandering the map.', end:true},
  {label:'Begin the journey again.', act:'restart'}]},

satchel:{glyph:'🎒', title:'Your Satchel', dynamic:true,
 choices:[{label:'Close.', end:true}]}
};
