# SuuntoPlus App: Outdoor Climbing

This application transforms your Suunto watch into an advanced outdoor climbing guide and coach. Designed specifically for Sport, Trad, and Multipitch climbing, it abandons generic mountaineering layouts to focus exclusively on the precise metrics that matter during the approach, the vertical ascent, and the belay.

## 🌟 Key Features (v1.0)

The application features a **Smart State Machine** that dynamically alters the interface on your watch depending on your current phase. It uses a lightweight, multi-template architecture (`approach.html`, `climbing.html`, `belay.html`) optimized for Suunto's strict memory limits, ensuring instant native transitions.

### 1. Dynamic Phases and Screens

- **Approach Phase:** A screen dedicated to the hike in. Focuses on horizontal distance covered and your current Heart Rate, featuring a dynamic 5-segment Suunto corona gauge and needle to monitor your exertion before reaching the wall.
- **Climbing Phase:** Extremely clear UI with giant typography for quick glances while on the wall. It displays the meters ascended in the current pitch, pitch duration, your current HR, and the **average Pitch Inclination in degrees (e.g., 85°)** calculated via spatial triangulation.
- **Belay / Resting Phase:** Upon reaching the anchor, this screen isolates the belay time, displays the current number of pitches climbed, and tracks your movement efficiency (Move/Rest Ratio) so you don't over-rest.

### 2. Advanced Climbing Algorithms

- **Time Under Tension (TUT):** Calculates the actual time your body is exerting sustained upward force, excluding time spent resting, clipping, or searching for holds.
- **Move/Rest Ratio:** An efficiency metric evaluating your active climbing pace versus resting/belaying time.
- **Automatic Crux Detection:** If the app detects very high heart rates combined with almost zero vertical speed, it assumes you are fighting through the hardest section and logs that altitude as the Crux of the route.
- **Pitch Inclination:** Calculates the structural average angle of the pitch combining the GPS vector with barometric pressure using the Pythagorean theorem, providing a reliable grade indicator.

## 🧗 Usage and Navigation

The app is controlled primarily via the physical **LAP** button, but it also includes a smart detection algorithm to handle transitions automatically if you forget to press it.

1. **Start**: Upon starting the activity, the app begins in the **APPROACH** state.
2. **Start Climbing**: When you are tied in and leaving the ground, press the **LAP** button. The screen will instantly change to **CLIMBING**, starting the pitch metrics from zero.
   * *Auto-detect*: If you forget to press LAP, the app will automatically transition to **CLIMBING** once it detects 15 seconds of sustained vertical speed (> 4 m/min).
3. **Reach Belay**: When you reach the anchor and clip in, press the **LAP** button to isolate the pitch. The screen will switch to **BELAY** mode.
4. **Next Pitch**: When leaving the belay to start the next pitch, press **LAP** again. The Pitch counter will increase by 1, and the watch will return to the **CLIMBING** screen.

## 📊 Metrics Exported to Suunto App (.fit)

Once you sync your watch with the Suunto App on your phone, you will be able to analyze:

- **Total Pitches**: Number of pitches completed.
- **Pitch Ascent**: Total vertical meters climbed per pitch.
- **Time Under Tension (TUT)**: Total active effort time.
- **Crux Height**: Altitude in meters where the hardest move was detected.
- **Move/Rest Ratio**: Overall climbing efficiency.
- **Inclination**: Average pitch inclination in degrees.

## 🛠 Technical Notes
This app has been heavily optimized for Suunto physical watches. The data subscriptions (`in`) have been strictly limited to bypass firmware memory caps, and the UI layer relies on continuous dynamic event triggers (`onValueChanged`) to ensure the canvas gauge draws instantly upon template switching without blocking the main event loop.
