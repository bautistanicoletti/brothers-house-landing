/* ==========================================================================
   BROTHER'S HOUSE · ARCHIVO DE CONFIGURACIÓN
   --------------------------------------------------------------------------
   Acá están TODOS los datos del negocio. Para cambiar un precio, un horario
   o un texto, editá este archivo y volvé a subirlo. No hace falta tocar el HTML.

   Reglas para no romper nada:
   - Los textos van entre comillas: "así". Si el texto lleva comillas dobles
     adentro, usá comillas simples afuera: 'Dijo "hola"'.
   - Cada elemento de una lista termina con coma.
   - En los títulos, lo que pongas entre *asteriscos* se pinta de rojo.
   - Después de guardar, recargá la página con Ctrl+F5 (o borrá caché en el
     celular) para ver el cambio.
   ========================================================================== */

window.SITE_CONFIG = {

  /* ---------- DATOS DEL NEGOCIO ---------- */
  negocio: {
    nombre: "Brother's House",
    bajada: "Centro Fitness",
    ciudad: "Villa Regina",
    provincia: "Río Negro",
    direccion: "20 de Junio 715",
    codigoPostal: "8336",
  },

  /* ---------- WHATSAPP ----------
     numero: formato internacional SIN "+", espacios ni guiones.
             Para celulares de Argentina va 54 + 9 + característica + número.
     numeroVisible: cómo se muestra escrito en la página.
     mensajeGeneral: texto precargado de los botones genéricos de WhatsApp. */
  whatsapp: {
    numero: "5492984228481",
    numeroVisible: "+54 298 422-8481",
    mensajeGeneral: "Hola! Vi la página de Brother's House y quiero hacer una consulta.",
  },

  /* ---------- REDES ---------- */
  redes: {
    instagram: "https://www.instagram.com/brothershouse.vr",
    instagramUsuario: "@brothershouse.vr",
  },

  /* ---------- HERO (primera pantalla) ---------- */
  hero: {
    etiqueta: "Centro Fitness · Villa Regina",
    // Cada línea es un renglón del titular. Entre *asteriscos* = en negro sobre el rojo.
    titulo: ["Entrená", "en serio.", "*Sin excusas.*"],
    subtitulo: "Sala completa, profes que te corrigen y una rutina armada para vos. La primera te la regalamos.",
    botonRutina: "Armá tu rutina gratis",
    botonWhatsapp: "Escribinos por WhatsApp",
  },

  /* ---------- CINTA ANIMADA (debajo del hero) ---------- */
  cinta: ["Sin excusas", "Entrená", "Luchá", "Brother's House", "Villa Regina"],

  /* ---------- BENEFICIOS ----------
     icono: "rutina" | "pesas" | "reloj" | "equipo" | "corazon" | "rayo"
     ⚠ PLACEHOLDERS: confirmar con el dueño antes de publicar. */
  beneficios: {
    titulo: "Por qué *Brother's*",
    subtitulo: "No es un gimnasio más. Es el lugar donde vas a cumplir lo que te propusiste.",
    items: [
      {
        icono: "rutina",
        titulo: "Rutina hecha para vos",
        texto: "El profe te arma un plan según tu objetivo y lo ajusta a medida que avanzás. Nada de rutinas copiadas.",
      },
      {
        icono: "pesas",
        titulo: "Sala completa",
        texto: "Máquinas, racks, barras y discos de sobra. Entrenás sin hacer fila para cada ejercicio.",
      },
      {
        icono: "reloj",
        titulo: "Horario que te sirve",
        texto: "Abrimos de mañana y de corrido a la tarde hasta las 22hs. Venís antes o después del laburo.",
      },
      {
        icono: "equipo",
        titulo: "Cero ego, mucha onda",
        texto: "Vengas de cero o con años de fierro, acá entrenás cómodo y acompañado.",
      },
    ],
  },

  /* ---------- FRASE DE MARCA (cartel rojo entre secciones) ----------
     Cada línea es un renglón. tamano: "xl" (gigante) | "l" (grande) | "m" (mediano)
     negro: true = la línea va en negro en vez de blanco. */
  manifiesto: [
    { texto: "Si", tamano: "xl" },
    { texto: "no luchás", tamano: "l" },
    { texto: "por algo", tamano: "m" },
    { texto: "no", tamano: "xl", negro: true },
    { texto: "te quejes", tamano: "m", negro: true },
    { texto: "por no tenerlo", tamano: "m", negro: true },
  ],

  /* ---------- PLANES Y PRECIOS ----------
     id: identificador interno (sin espacios). Se usa en "recomendacion" más abajo.
     precio: número sin puntos ni signo $ (ej: 35000). Se muestra como $35.000.
     destacado: true para marcarlo como "Más elegido" (solo uno).
     El botón de cada plan abre WhatsApp con: "Hola, me interesa el plan <nombre>". */
  planes: {
    titulo: "Elegí tu *plan*",
    subtitulo: "Precios por mes. Elegí según cuántos días querés venir.",
    moneda: "ARS",
    periodo: "/mes",
    textoDestacado: "Más elegido",
    textoBoton: "Quiero este plan",
    mensajeWhatsapp: "Hola, me interesa el plan {plan}",
    nota: "¿No sabés cuál te conviene? Hacé el test de 1 minuto y te recomendamos uno.",
    items: [
      {
        id: "3dias",
        nombre: "3 días",
        frecuencia: "3 veces por semana",
        precio: 35000,
        incluye: [
          "3 días por semana",
          "Rutina personalizada",
          "Acceso a toda la sala",
          "Asesoramiento del profe",
        ],
      },
      {
        id: "5dias",
        nombre: "5 días",
        frecuencia: "5 veces por semana",
        precio: 42000,
        destacado: true,
        incluye: [
          "5 días por semana",
          "Rutina personalizada",
          "Ajuste de rutina cada mes",
          "Acceso a toda la sala",
          "Asesoramiento del profe",
        ],
      },
      {
        id: "libre",
        nombre: "Pase libre",
        frecuencia: "7 días · todos los días que abrimos",
        precio: 48000,
        incluye: [
          "Sin límite de días",
          "Rutina personalizada",
          "Ajuste de rutina cada mes",
          "Acceso a toda la sala",
          "Seguimiento de progreso",
        ],
      },
    ],
  },

  /* ---------- HORARIOS ----------
     dias: números de día que abarca la fila (0 = domingo, 1 = lunes … 6 = sábado).
     turnos: lista de ["apertura", "cierre"] en formato 24 hs "HH:MM".
             Lista vacía [] = cerrado.
     Con estos datos la página calcula sola si está "Abierto ahora" (hora de Argentina). */
  horarios: {
    titulo: "*Horarios*",
    items: [
      { etiqueta: "Lunes a viernes", dias: [1, 2, 3, 4, 5], turnos: [["08:00", "11:30"], ["14:00", "22:00"]] },
      { etiqueta: "Sábado", dias: [6], turnos: [["10:00", "12:00"]] },
      { etiqueta: "Domingo", dias: [0], turnos: [] },
    ],
    nota: "Feriados: consultanos por WhatsApp.",
  },

  /* ---------- QUIZ "TU RUTINA GRATIS" ----------
     Podés cambiar los textos de preguntas y opciones.
     NO cambies el "id" de las preguntas ni el "tipo".
     El "id" de las opciones de "dias" se usa en "recomendacion". */
  quiz: {
    etiqueta: "100% gratis",
    titulo: "Tu rutina *gratis*",
    subtitulo: "Respondé 6 preguntas (menos de 1 minuto) y el profe te arma una rutina a medida.",
    preguntas: [
      {
        id: "objetivo",
        tipo: "opciones",
        pregunta: "¿Cuál es tu objetivo?",
        resumen: "Objetivo",
        opciones: [
          { id: "peso", texto: "Bajar de peso", detalle: "Quemar grasa y sentirme más liviano" },
          { id: "musculo", texto: "Ganar músculo", detalle: "Más fuerza y más volumen" },
          { id: "salud", texto: "Mejorar salud y energía", detalle: "Sentirme mejor día a día" },
          { id: "rendimiento", texto: "Rendimiento deportivo", detalle: "Rendir más en mi deporte" },
        ],
      },
      {
        id: "experiencia",
        tipo: "opciones",
        pregunta: "¿Cuánta experiencia tenés?",
        resumen: "Experiencia",
        opciones: [
          { id: "nunca", texto: "Nunca entrené" },
          { id: "deje", texto: "Entrené antes pero dejé" },
          { id: "actual", texto: "Entreno actualmente" },
        ],
      },
      {
        id: "dias",
        tipo: "opciones",
        pregunta: "¿Cuántos días por semana podés entrenar?",
        resumen: "Días por semana",
        opciones: [
          { id: "2", texto: "2 días" },
          { id: "3", texto: "3 días" },
          { id: "4", texto: "4 días" },
          { id: "5mas", texto: "5 o más" },
        ],
      },
      {
        id: "horario",
        tipo: "opciones",
        pregunta: "¿En qué horario preferís venir?",
        resumen: "Horario",
        opciones: [
          { id: "manana", texto: "Mañana" },
          { id: "mediodia", texto: "Mediodía" },
          { id: "tarde", texto: "Tarde" },
          { id: "noche", texto: "Noche" },
        ],
      },
      {
        id: "lesiones",
        tipo: "lesion",
        pregunta: "¿Tenés alguna lesión o limitación?",
        resumen: "Lesiones",
        textoNo: "No",
        textoSi: "Sí",
        placeholder: "Contanos brevemente (opcional). Ej: dolor de rodilla",
        botonContinuar: "Continuar",
      },
      {
        id: "nombre",
        tipo: "nombre",
        pregunta: "¿Cómo te llamás?",
        placeholder: "Tu nombre",
        botonContinuar: "Ver mi resultado",
        error: "Escribí tu nombre para que el profe sepa a quién le arma la rutina.",
      },
    ],

    // Lógica de recomendación: según los días que elige en el quiz → qué plan se sugiere.
    // plan: el "id" de un plan de la lista de arriba. motivo: texto que se muestra.
    recomendacion: {
      "2":    { plan: "3dias", motivo: "Con 2 días ya arrancás bien. El plan de 3 te deja un día extra para cuando quieras sumar." },
      "3":    { plan: "3dias", motivo: "Justo lo que necesitás para tus 3 días de entrenamiento." },
      "4":    { plan: "5dias", motivo: "Con 4 días por semana, el plan de 5 te da margen para recuperar si un día no llegás." },
      "5mas": { plan: "libre", motivo: "Si vas a venir 5 días o más, el pase libre te sale más conveniente." },
    },

    resultado: {
      titulo: "¡Listo, {nombre}!",
      texto: "El profe te va a armar una rutina personalizada gratis. Mandale tus datos por WhatsApp.",
      etiquetaPlan: "Plan recomendado para vos",
      boton: "Pedir mi rutina por WhatsApp",
      reiniciar: "Volver a empezar",
    },

    // Mensaje que se precarga en WhatsApp al terminar el quiz.
    // Las palabras entre {llaves} se reemplazan por las respuestas. \n = salto de línea.
    mensajeWhatsapp:
      "Hola! Soy {nombre} y quiero mi rutina gratis 💪\n" +
      "Objetivo: {objetivo}\n" +
      "Experiencia: {experiencia}\n" +
      "Días por semana: {dias}\n" +
      "Horario: {horario}\n" +
      "Lesiones: {lesiones}\n" +
      "Plan que me interesa: {plan}",
  },

  /* ---------- UBICACIÓN ---------- */
  ubicacion: {
    titulo: "Dónde *estamos*",
    texto: "Pasá a conocer el gimnasio o pedinos indicaciones por WhatsApp.",
    // Texto que se busca en Google Maps (para el mapa y el botón "Cómo llegar").
    busquedaMaps: "20 de Junio 715, Villa Regina, Río Negro, Argentina",
    botonComoLlegar: "Cómo llegar",
  },

  /* ---------- FOOTER / ÚLTIMO LLAMADO ---------- */
  footer: {
    titulo: "¿Arrancamos *hoy*?",
    texto: "Escribinos y en minutos te respondemos con todo lo que necesitás saber.",
    boton: "Escribinos por WhatsApp",
  },

  /* ---------- MEDICIÓN (Google Analytics 4) ----------
     Pegá acá tu ID de medición de GA4 (empieza con "G-").
     Mientras diga "G-XXXXXXXXXX", no se envía nada y los eventos solo se
     muestran en la consola del navegador (útil para probar). */
  analytics: {
    ga4Id: "G-XXXXXXXXXX",
  },
};
