# Outdoor Climbing
SuuntoPlus App para Escalada Exterior (Deportiva, Clásica y Varios Largos)

Esta aplicación transforma tu reloj Suunto en un guía y entrenador de escalada exterior. Está diseñada para evitar el uso de pantallas genéricas de montaña y centrarse exclusivamente en las métricas que importan durante la aproximación, la escalada en pared y las reuniones de varios largos.

### Características Principales (v1.0):
La aplicación cuenta con una **Máquina de Estados Inteligente** que altera dinámicamente la interfaz en tu reloj según la fase de la actividad en la que te encuentres, sin necesidad de tocar el reloj (aunque soportado también manualmente mediante el botón LAP).

#### 1. Fases y Pantallas Dinámicas:
- **Aproximación (Approach):** Pantalla enfocada en la distancia horizontal recorrida, la altitud base a la que te encuentras y tu Frecuencia Cardíaca actual (cambia de color según la zona).
- **Escalando (Climbing):** UI extremadamente simple con números gigantes para leerlos mientras escalas. Muestra los metros ascendidos en el largo actual, el tiempo de pegue, tu FC actual y **la Inclinación media del largo en grados (ej. 85°)** basada en triangulación espacial (desnivel vs distancia recorrida).
- **Reunión / Reposo (Belay):** Al llegar a la reunión (o si estás descansando a pie de vía), muestra el tiempo que llevas parado asegurando, el número del largo actual que acabas de encadenar y tu eficiencia de movimiento (Ratio Movimiento/Reposo).

#### 2. Algoritmos Avanzados de Escalada:
- **Time Under Tension (TUT):** Calcula el tiempo real en el que tu cuerpo está ejerciendo fuerza sostenida ascendiendo, excluyendo el tiempo detenido chapando o buscando presas.
- **Ratio de Movimiento/Reposo:** Una métrica de eficiencia que calcula tu ritmo de escalada frente al tiempo de descanso en la reunión.
- **Detección Automática del Crux:** Si detecta pulsaciones muy altas combinadas con una velocidad vertical casi nula, asume que estás superando un tramo clave y guarda esa Altitud como el Crux de la vía.
- **Inclinación del Largo:** En lugar de calcular una inclinación inestable en tiempo real, calcula el ángulo medio estructural del largo combinando el vector GPS con la presión barométrica mediante teorema de Pitágoras.

### Uso y Transición de Estados:
1. **Inicio**: Al arrancar la actividad empieza en estado **APPROACH**.
2. **Escalar**: Transiciona automáticamente a **CLIMBING** si detecta que empiezas a ganar verticalidad. También puedes forzar el inicio del largo pulsando el botón **LAP** a pie de vía.
3. **Llegar a la Reunión**: Pulsa el botón **LAP** al anclarte a la reunión para aislar el largo y pasar al modo **BELAY** (descanso/asegurar).
4. **Siguiente Largo**: Al salir de la reunión, presiona **LAP** otra vez. El contador de largos (Pitch) subirá, y comenzará la medición de tu nuevo tramo.

### Métricas Exportadas a Suunto App (.fit):
Una vez sincronices la actividad, podrás ver en tu teléfono:
- **Pitches**: Número total de largos.
- **Pitch Ascent**: Ascensión detallada.
- **Time Under Tension (TUT)**.
- **Crux Height**: Altitud en metros donde se detectó el paso más duro de la vía.
- **Move/Rest Ratio**: Eficiencia.
- **Inclination**: Inclinación media en grados.
