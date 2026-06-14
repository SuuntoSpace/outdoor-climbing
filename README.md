# Outdoor Climbing
SuuntoPlus App for Outdoor Climbing (Sport, Trad, and Multipitch)

This application transforms your Suunto watch into an outdoor climbing guide and coach. It is designed to avoid generic mountaineering screens and focus exclusively on the metrics that matter during the approach, the actual wall climbing, and multipitch belays.

### Key Features (v1.0):
The application features a **Smart State Machine** that dynamically alters the interface on your watch depending on the phase of the activity you are in. It uses a multi-template architecture (`approach.html`, `climbing.html`, `belay.html`) for native, high-performance UI transitions.

#### 1. Dynamic Phases and Screens:
- **Approach:** Screen focused on horizontal distance covered, base altitude, and your current Heart Rate (with the iconic dynamic color heart rate gauge).
- **Climbing:** Extremely simple UI with giant numbers to read them while climbing. It shows the meters ascended in the current pitch, the pitch duration, your current HR, and **the average Pitch Inclination in degrees (e.g., 85°)** based on spatial triangulation (ascent vs horizontal distance).
- **Belay / Resting:** Upon reaching the belay station, it shows the time spent resting/belaying, the current number of pitches climbed, and your movement efficiency (Move/Rest Ratio).

#### 2. Advanced Climbing Algorithms:
- **Time Under Tension (TUT):** Calculates the actual time your body is exerting sustained upward force, excluding time spent resting, clipping, or searching for holds.
- **Move/Rest Ratio:** An efficiency metric that calculates your climbing pace versus resting time at the belay.
- **Automatic Crux Detection:** If it detects very high heart rates combined with almost zero vertical speed, it assumes you are overcoming a key section and saves that altitude as the Crux of the route.
- **Pitch Inclination:** Instead of calculating an unstable real-time inclination, it calculates the structural average angle of the pitch combining the GPS vector with barometric pressure using the Pythagorean theorem.

### Usage and State Transitions:
1. **Start**: Upon starting the activity, it begins in the **APPROACH** state.
2. **Climb**: It automatically transitions to **CLIMBING** if it detects consistent vertical gain. You can also force the start of the pitch by pressing the **LAP** button at the base of the route.
3. **Reach Belay**: Press the **LAP** button when anchoring to the belay station to isolate the pitch and switch to the **BELAY** mode (rest/belay).
4. **Next Pitch**: When leaving the belay, press **LAP** again. The Pitch counter will increase, and the measurement of your new pitch will begin.

### Metrics Exported to Suunto App (.fit):
Once you sync the activity, you will be able to see in your phone:
- **Pitches**: Total number of pitches.
- **Pitch Ascent**: Detailed ascent in meters.
- **Time Under Tension (TUT)**.
- **Crux Height**: Altitude in meters where the hardest move of the route was detected.
- **Move/Rest Ratio**: Efficiency.
- **Inclination**: Average pitch inclination in degrees.
