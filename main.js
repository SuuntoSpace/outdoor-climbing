var appState, pitchCount, pitchAscent, pitchTime, belayTime;
var tut, cruxHeight, moveRestRatio, approachDist, startAlt, pitchStartDist;
var lapTriggered, hrMaxForCrux, lastTime, currentTemplate, appTick;

function onExerciseStart(input, output) {
  appState = 0; // 0 = Approach, 1 = Climbing, 2 = Belay
  pitchCount = 0;
  pitchAscent = 0;
  pitchTime = 0;
  belayTime = 0;
  tut = 0;
  cruxHeight = 0;
  moveRestRatio = 0.0;
  approachDist = 0;
  startAlt = 0;
  pitchStartDist = 0;
  lapTriggered = false;
  hrMaxForCrux = 0;
  lastTime = 0;
  currentTemplate = 'approach';
  appTick = 0;
}

function onLap(input, output) {
  lapTriggered = true;
}

function evaluate(input, output) {
  var vSpeed = (input.VerticalSpeed || 0) * 60; // m/min
  var hr = Math.round((input.HeartRate || 0) * 60);

  if (typeof appState === 'undefined') {
    appState = 0;
    pitchCount = 0;
    pitchAscent = 0;
    pitchTime = 0;
    belayTime = 0;
    tut = 0;
    cruxHeight = 0;
    moveRestRatio = 0.0;
    approachDist = 0;
    startAlt = 0;
    pitchStartDist = 0;
    lapTriggered = false;
    hrMaxForCrux = 0;
    lastTime = 0;
    currentTemplate = 'approach';
    appTick = 0;
  }

  // Handle delta time assuming 1 sec evaluates, but fallback just in case
  var dt = 1;

  if (appState === 0) {
    // Approach Phase
    approachDist = (input.Distance || 0);
    output.approachDist = approachDist;
    // Transition to Climbing ONLY if LAP pressed
    if (lapTriggered) {
      appState = 1; // Start climbing pitch 1
      pitchCount = 1;
      startAlt = (input.Altitude || 0);
      pitchStartDist = (input.Distance || 0);
      lapTriggered = false;
      currentTemplate = 'climbing';
      unload('_cm');
    }
  } else if (appState === 1) {
    // Climbing Phase
    pitchTime += dt;
    pitchAscent = (input.Altitude || 0) - startAlt;
    if (pitchAscent < 0) pitchAscent = 0;

    // TUT Calculation
    if (vSpeed > 1) {
      tut += dt;
    }

    // Crux detection (High HR, low vSpeed)
    if (hr > hrMaxForCrux && vSpeed < 2 && vSpeed > -1 && hr > 100) {
      hrMaxForCrux = hr;
      cruxHeight = (input.Altitude || 0);
    }

    // Transition to Belay on LAP
    if (lapTriggered) {
      appState = 2; // Belay
      lapTriggered = false;
      currentTemplate = 'belay';
      unload('_cm');
    }
  } else if (appState === 2) {
    // Belay / Resting Phase
    belayTime += dt;

    // Move/Rest ratio
    if (belayTime > 0) {
      moveRestRatio = tut / belayTime;
    }

    // Transition to next Pitch on LAP
    if (lapTriggered) {
      appState = 1;
      pitchCount += 1;
      pitchTime = 0;
      pitchAscent = 0;
      hrMaxForCrux = 0;
      startAlt = (input.Altitude || 0);
      pitchStartDist = (input.Distance || 0);
      lapTriggered = false;
      currentTemplate = 'climbing';
      unload('_cm');
    }
  }

  output.appState = appState;
  output.pitchCount = pitchCount;
  output.pitchAscent = pitchAscent;
  output.pitchTime = pitchTime;
  output.belayTime = belayTime;
  output.tut = tut;
  output.cruxHeight = cruxHeight;
  output.moveRestRatio = moveRestRatio;

  // Calculate HR Zone explicitly for emulator support
  var maxHR = input.MaxHR || 190;
  var zone = 0;
  if (hr > 0 && maxHR > 0) {
    if (hr >= Math.round(maxHR * 0.87)) zone = 5;
    else if (hr >= Math.round(maxHR * 0.82)) zone = 4;
    else if (hr >= Math.round(maxHR * 0.77)) zone = 3;
    else if (hr >= Math.round(maxHR * 0.72)) zone = 2;
    else zone = 1;
  }
  output.hrZoneNum = zone;

  var pitchDist = (input.Distance || 0) - pitchStartDist;
  var inclinationDeg = 0;
  if (appState === 1 && pitchDist > 0) {
    if (pitchDist > pitchAscent) {
      var rightTriangle = Math.sqrt(Math.pow(pitchDist, 2) - Math.pow(pitchAscent, 2));
      inclinationDeg = Math.round(Math.acos(rightTriangle / pitchDist) * (180 / Math.PI));
    } else {
      inclinationDeg = 90;
    }
  }
  output.inclinationDeg = inclinationDeg;
}


function getUserInterface(input, output) {
  return {
    template: currentTemplate || 'approach',
    zn: { input: '/Activity/Zones/HeartRate/CurrentZone' },
    segm: 5
  };
}

function getSummaryOutputs(input, output) {
  return [
    { id: 'pitchCount', name: "Total Pitches", format: 'Count_Threedigits', value: output.pitchCount },
    { id: 'tut', name: "Time Under Tension", format: 'Duration_Fourdigits', value: output.tut },
    { id: 'cruxHeight', name: "Crux Altitude", format: 'Count_Threedigits', value: output.cruxHeight },
    { id: 'moveRestRatio', name: "Move/Rest Ratio", format: 'Decimal_Onedigit', value: output.moveRestRatio }
  ];
}