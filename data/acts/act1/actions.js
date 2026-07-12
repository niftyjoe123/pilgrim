/* doAct() case bodies for Act I, keyed by the action name a DLG choice's `act` field names.
   Each receives an execution context {S, player, LIVE, toast} from engine/actions.js. */
export const ACTIONS = {
  obstinateLeaves({S}){ S.flags.obstinateGone = true; },

  metEvangelist({S}){ S.flags.metEvangelist = true; },

  helpMet({S}){ S.flags.helpMet = true; },

  sinaiDone({S, player}){
    S.flags.sinaiDone = true;
    player.x = 40; player.y = 6;
  },

  openGate({S, LIVE}){
    S.flags.gateOpen = true;
    LIVE.world[11][50] = '=';
  },

  room({S, toast}){
    S.flags.roomsSeen++;
    if(S.flags.roomsSeen === 2 && !S.flags.interpreterDone){
      S.flags.interpreterDone = true;
      setTimeout(()=>toast('You have seen enough to walk wisely — though more pictures remain, if you wish. Speak to the Interpreter when ready.'), 800);
    }
  },

  crossDone({S}){
    S.flags.crossDone = true;
    S.burden = false;
    S.resolve = S.maxResolve;
  }
};
