/* ==========================================================================
   Brother's House · lógica de la página
   Lee todo desde window.SITE_CONFIG (config.js). No hace falta editar este
   archivo para cambiar textos, precios u horarios.
   ========================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONFIG;
  if (!C) { console.error("Falta config.js o tiene un error de sintaxis."); return; }
  document.documentElement.classList.add("js");

  /* ---------- Utilidades ---------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  // *texto* → <em>texto</em> (se pinta de color según el contexto)
  function rich(s) { return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>"); }
  function icon(name) { return '<svg class="ico" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  function get(path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, C); }
  function fill(tpl, data) { return String(tpl).replace(/\{(\w+)\}/g, function (m, k) { return data[k] != null ? data[k] : m; }); }
  function price(n) { return "$" + Number(n).toLocaleString("es-AR"); }
  function waUrl(msg) { return "https://wa.me/" + C.whatsapp.numero + "?text=" + encodeURIComponent(msg); }
  function findPlan(id) { return C.planes.items.filter(function (p) { return p.id === id; })[0]; }

  /* ---------- Medición (GA4) ---------- */
  var GA_ID = (C.analytics && C.analytics.ga4Id) || "";
  var gaOn = /^G-[A-Z0-9]+$/i.test(GA_ID) && GA_ID !== "G-XXXXXXXXXX";
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  if (gaOn) {
    gtag("js", new Date());
    gtag("config", GA_ID);
    // Se carga después de que la página terminó de cargar, para no frenar la primera pantalla.
    var loadGA = function () {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
      document.head.appendChild(s);
    };
    if (document.readyState === "complete") loadGA();
    else window.addEventListener("load", function () { setTimeout(loadGA, 1500); });
  }

  function track(name, params) {
    params = params || {};
    if (gaOn) window.gtag("event", name, params);
    else console.info("[GA4 demo] " + name, params);
  }

  // Un solo listener para TODOS los botones de WhatsApp (data-wa="seccion").
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-wa]");
    if (!a) return;
    var params = { section: a.getAttribute("data-wa") };
    if (a.getAttribute("data-plan")) params.plan = a.getAttribute("data-plan");
    track("whatsapp_click", params);
  });

  /* ---------- Textos simples (data-c="ruta.en.config") ---------- */
  function renderTexts(root) {
    $$("[data-c]", root).forEach(function (el) {
      var v = get(el.getAttribute("data-c"));
      if (v == null) return;
      if (el.hasAttribute("data-rich")) el.innerHTML = rich(v);
      else el.textContent = v;
    });
    // Links genéricos de WhatsApp (los que no tienen un href propio)
    $$("a[data-wa]", root).forEach(function (a) {
      if (!a.getAttribute("href")) a.href = waUrl(C.whatsapp.mensajeGeneral);
    });
  }

  /* ---------- 1. Hero ----------
     Se pinta apenas el navegador lee el HTML del hero (antes de mostrar la
     página), así el titular no "salta" cuando carga. */
  function renderHero() {
    var hero = $("#inicio");
    renderTexts(hero);
    $("#hero-title").innerHTML = C.hero.titulo.map(function (l) { return "<span>" + rich(l) + "</span>"; }).join("");
  }

  /* ---------- Resto de la página ---------- */
  function init() {
  renderTexts(document);

  // Cinta: se duplica el contenido para que el loop sea continuo
  var tick = C.cinta.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
  $("#ticker").innerHTML = tick + tick + tick + tick;

  /* ---------- 2. Beneficios ---------- */
  $("#benefits").innerHTML = C.beneficios.items.map(function (b) {
    return '<li class="benefit reveal">' +
      '<div class="benefit__icon">' + icon(b.icono || "rayo") + "</div>" +
      "<h3>" + esc(b.titulo) + "</h3><p>" + esc(b.texto) + "</p></li>";
  }).join("");

  // Frase de marca
  $("#manifesto").innerHTML = C.manifiesto.map(function (l) {
    return '<span class="s-' + esc(l.tamano || "m") + (l.negro ? " is-black" : "") + '">' + esc(l.texto) + "</span>";
  }).join("");
  var mig = $("#manifesto-ig");
  mig.href = C.redes.instagram;
  $("span", mig).textContent = C.redes.instagramUsuario;

  /* ---------- 3. Planes ---------- */
  $("#plans").innerHTML = C.planes.items.map(function (p) {
    var msg = fill(C.planes.mensajeWhatsapp, { plan: p.nombre });
    return '<article class="plan reveal' + (p.destacado ? " plan--featured" : "") + '">' +
      (p.destacado ? '<span class="plan__tag">' + esc(C.planes.textoDestacado) + "</span>" : "") +
      '<h3 class="plan__name">' + esc(p.nombre) + "</h3>" +
      '<p class="plan__freq">' + esc(p.frecuencia) + "</p>" +
      '<p class="plan__price"><span class="plan__amount">' + price(p.precio) + '</span><span class="plan__period">' + esc(C.planes.periodo) + "</span></p>" +
      '<ul class="plan__list">' + p.incluye.map(function (i) { return "<li>" + icon("check") + "<span>" + esc(i) + "</span></li>"; }).join("") + "</ul>" +
      '<a class="btn ' + (p.destacado ? "btn--red" : "btn--ghost") + ' btn--block" href="' + esc(waUrl(msg)) + '" target="_blank" rel="noopener" data-wa="planes" data-plan="' + esc(p.nombre) + '">' +
      icon("wa") + "<span>" + esc(C.planes.textoBoton) + "</span></a></article>";
  }).join("");

  /* ---------- 4. Horarios + "Abierto ahora" ---------- */
  var DAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function toMin(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  function nowAR() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Argentina/Buenos_Aires", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
      }).formatToParts(new Date());
      var o = {};
      parts.forEach(function (x) { o[x.type] = x.value; });
      var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
      return { day: day, min: (+o.hour % 24) * 60 + +o.minute };
    } catch (err) {
      var d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }
  function shiftsFor(day) {
    var row = C.horarios.items.filter(function (r) { return r.dias.indexOf(day) !== -1; })[0];
    return row ? row.turnos : [];
  }
  function openStatus() {
    var n = nowAR();
    var today = shiftsFor(n.day);
    for (var i = 0; i < today.length; i++) {
      if (n.min >= toMin(today[i][0]) && n.min < toMin(today[i][1])) return { open: true, text: "Abierto ahora · cierra " + today[i][1] };
    }
    for (var j = 0; j < today.length; j++) {
      if (toMin(today[j][0]) > n.min) return { open: false, text: "Cerrado · abre hoy a las " + today[j][0] };
    }
    for (var k = 1; k <= 7; k++) {
      var d = (n.day + k) % 7, s = shiftsFor(d);
      if (s.length) return { open: false, text: "Cerrado · abre " + (k === 1 ? "mañana" : "el " + DAYS[d]) + " a las " + s[0][0] };
    }
    return { open: false, text: "Cerrado" };
  }

  var todayIdx = nowAR().day;
  $("#hours-body").innerHTML = C.horarios.items.map(function (r) {
    var isToday = r.dias.indexOf(todayIdx) !== -1;
    var times = r.turnos.length
      ? r.turnos.map(function (t) { return "<span>" + esc(t[0]) + " – " + esc(t[1]) + "</span>"; }).join("")
      : '<span class="is-closed">Cerrado</span>';
    return '<tr' + (isToday ? ' class="is-today"' : "") + '><th scope="row">' + esc(r.etiqueta) + "</th><td>" + times + "</td></tr>";
  }).join("");

  function renderStatus() {
    var st = openStatus();
    $$("[data-status]").forEach(function (el) {
      el.hidden = false;
      el.classList.toggle("is-open", st.open);
      el.innerHTML = '<span class="status-dot" aria-hidden="true"></span><span>' + esc(st.text) + "</span>";
    });
  }
  renderStatus();
  setInterval(renderStatus, 60000);

  /* ---------- 6. Ubicación ---------- */
  var N = C.negocio;
  $("#loc-street").textContent = N.direccion;
  $("#loc-city").textContent = N.ciudad + ", " + N.provincia;
  $("#loc-directions").href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(C.ubicacion.busquedaMaps);
  $("#loc-directions").addEventListener("click", function () { track("directions_click", { section: "ubicacion" }); });
  var map = document.createElement("iframe");
  map.setAttribute("loading", "lazy");
  map.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
  map.title = "Mapa: " + N.nombre + ", " + N.direccion + ", " + N.ciudad;
  map.src = "https://www.google.com/maps?q=" + encodeURIComponent(C.ubicacion.busquedaMaps) + "&output=embed";
  $("#map").appendChild(map);

  /* ---------- 7. Footer ---------- */
  $("#ft-address").textContent = N.direccion + ", " + N.ciudad;
  $("#ft-hours").innerHTML = C.horarios.items.filter(function (r) { return r.turnos.length; }).map(function (r) {
    return esc(r.etiqueta) + ": " + r.turnos.map(function (t) { return '<span class="nowrap">' + esc(t[0] + "–" + t[1]) + "</span>"; }).join(" y ");
  }).join("<br>");
  $("#ft-phone").textContent = C.whatsapp.numeroVisible;
  $("#ft-ig").href = C.redes.instagram;
  $("#ft-ig").textContent = C.redes.instagramUsuario;
  $("#ft-year").textContent = new Date().getFullYear();

  /* ---------- Datos estructurados para Google (negocio local) ---------- */
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ld = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: N.nombre + " " + N.bajada,
    image: new URL("assets/img/og-image.jpg", location.href).href,
    logo: new URL("assets/img/logo.png", location.href).href,
    url: location.origin + location.pathname,
    telephone: "+" + C.whatsapp.numero,
    priceRange: price(Math.min.apply(null, C.planes.items.map(function (p) { return p.precio; }))) + "+",
    address: {
      "@type": "PostalAddress", streetAddress: N.direccion, addressLocality: N.ciudad,
      addressRegion: N.provincia, postalCode: N.codigoPostal, addressCountry: "AR",
    },
    sameAs: [C.redes.instagram],
    openingHoursSpecification: [],
  };
  C.horarios.items.forEach(function (r) {
    r.turnos.forEach(function (t) {
      ld.openingHoursSpecification.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: r.dias.map(function (d) { return dayNames[d]; }), opens: t[0], closes: t[1],
      });
    });
  });
  var ldEl = document.createElement("script");
  ldEl.type = "application/ld+json";
  ldEl.textContent = JSON.stringify(ld);
  document.head.appendChild(ldEl);

  /* ======================================================================
     5. QUIZ "TU RUTINA GRATIS"
     ====================================================================== */
  var Q = C.quiz;
  var steps = Q.preguntas;
  var total = steps.length;
  var state = { i: 0, answers: {}, started: false, done: false };
  var body = $("#quiz-body");
  var bar = $("#quiz-bar");
  var quizEl = $("#quiz");

  // El botón flotante se esconde mientras el botón de WhatsApp del resultado está en pantalla
  // (son el mismo llamado y si no se tapan entre sí).
  var waFloat = $(".wa-float");
  var floatIO = "IntersectionObserver" in window ? new IntersectionObserver(function (en) {
    waFloat.classList.toggle("wa-float--hidden", en[0].isIntersecting);
  }) : null;
  function watchResultCta(btn) {
    if (!floatIO) return;
    floatIO.disconnect();
    waFloat.classList.remove("wa-float--hidden");
    if (btn) floatIO.observe(btn);
  }

  function setProgress(pct, label) {
    bar.firstElementChild.style.width = pct + "%";
    bar.setAttribute("aria-valuenow", Math.round(pct));
    $("#quiz-step-label").textContent = label;
    $("#quiz-pct").textContent = Math.round(pct) + "%";
  }

  function startOnce() {
    if (state.started) return;
    state.started = true;
    track("quiz_start", { section: "rutina" });
  }

  function backBtn() {
    return state.i > 0
      ? '<div class="quiz__nav"><button type="button" class="link-btn" data-back>' + icon("back") + "<span>Atrás</span></button></div>"
      : "";
  }

  function optionBtn(value, label, detail, selected) {
    return '<button type="button" class="opt" data-value="' + esc(value) + '" aria-pressed="' + (selected ? "true" : "false") + '">' +
      '<span class="opt__radio" aria-hidden="true"></span><span class="opt__txt"><span class="opt__label">' + esc(label) + "</span>" +
      (detail ? '<span class="opt__detail">' + esc(detail) + "</span>" : "") + "</span></button>";
  }

  function renderStep(focus) {
    state.done = false;
    watchResultCta(null);
    var q = steps[state.i];
    var prev = state.answers[q.id];
    setProgress((state.i / total) * 100, "Pregunta " + (state.i + 1) + " de " + total);
    var html = '<div class="quiz__step"><h3 class="quiz__q" tabindex="-1">' + esc(q.pregunta) + "</h3>";

    if (q.tipo === "opciones") {
      html += '<div class="quiz__options" role="group" aria-label="' + esc(q.pregunta) + '">' +
        q.opciones.map(function (o) { return optionBtn(o.id, o.texto, o.detalle, prev && prev.id === o.id); }).join("") + "</div>";
    } else if (q.tipo === "lesion") {
      var yes = prev && prev.id === "si";
      html += '<div class="quiz__options quiz__options--row" role="group" aria-label="' + esc(q.pregunta) + '">' +
        optionBtn("no", q.textoNo, "", prev && prev.id === "no") + optionBtn("si", q.textoSi, "", yes) + "</div>" +
        '<div class="quiz__extra" id="injury-extra"' + (yes ? "" : " hidden") + ">" +
        '<label class="sr-only" for="injury-text">Detalle de la lesión (opcional)</label>' +
        '<textarea class="field" id="injury-text" maxlength="200" placeholder="' + esc(q.placeholder) + '">' + esc(yes ? prev.detalle || "" : "") + "</textarea>" +
        '<button type="button" class="btn btn--red btn--lg btn--block" data-injury-next>' + esc(q.botonContinuar) + icon("arrow") + "</button></div>";
    } else if (q.tipo === "nombre") {
      html += '<form class="quiz__extra" id="name-form" novalidate>' +
        '<label class="sr-only" for="quiz-name">' + esc(q.pregunta) + "</label>" +
        '<input class="field" id="quiz-name" name="nombre" type="text" autocomplete="given-name" autocapitalize="words" maxlength="40" required placeholder="' + esc(q.placeholder) + '" value="' + esc(prev ? prev.texto : "") + '">' +
        '<p class="field-error" id="name-error" hidden>' + esc(q.error) + "</p>" +
        '<button type="submit" class="btn btn--red btn--lg btn--block">' + esc(q.botonContinuar) + icon("arrow") + "</button></form>";
    }
    html += backBtn() + "</div>";
    body.innerHTML = html;
    if (focus) focusTop();
  }

  // Lleva el foco a la pregunta (lectores de pantalla) y acomoda el scroll si quedó arriba.
  function focusTop() {
    var h = $(".quiz__q, .result__title", body);
    if (h) h.focus({ preventScroll: true });
    var top = quizEl.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) quizEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function next() {
    var q = steps[state.i];
    track("quiz_step", { step: state.i + 1, question: q.id });
    if (state.i < total - 1) { state.i++; renderStep(true); }
    else renderResult();
  }

  function recommendation() {
    var dias = state.answers.dias;
    var r = dias && Q.recomendacion[dias.id];
    var plan = r && findPlan(r.plan);
    if (!plan) plan = C.planes.items.filter(function (p) { return p.destacado; })[0] || C.planes.items[0];
    return { plan: plan, motivo: r ? r.motivo : "" };
  }

  function renderResult() {
    state.done = true;
    var A = state.answers;
    var rec = recommendation();
    var nombre = A.nombre.texto;
    var lesiones = A.lesiones.id === "si" ? "Sí" + (A.lesiones.detalle ? " – " + A.lesiones.detalle : "") : "No";
    var data = {
      nombre: nombre,
      objetivo: A.objetivo.texto,
      experiencia: A.experiencia.texto,
      dias: A.dias.texto,
      horario: A.horario.texto,
      lesiones: lesiones,
      plan: rec.plan.nombre + " (" + price(rec.plan.precio) + C.planes.periodo + ")",
    };
    var msg = fill(Q.mensajeWhatsapp, data);
    var R = Q.resultado;
    setProgress(100, "¡Completado!");

    var summary = steps.filter(function (q) { return q.resumen; }).map(function (q) {
      return "<div><dt>" + esc(q.resumen) + "</dt><dd>" + esc(data[q.id]) + "</dd></div>";
    }).join("");

    body.innerHTML = '<div class="quiz__step result">' +
      '<h3 class="result__title" tabindex="-1">' + fill(esc(R.titulo), { nombre: "<em>" + esc(nombre) + "</em>" }) + "</h3>" +
      '<p class="result__text">' + esc(fill(R.texto, { nombre: nombre })) + "</p>" +
      '<div class="result__plan"><p class="result__plan-label">' + esc(R.etiquetaPlan) + "</p>" +
      '<div class="result__plan-row"><span class="result__plan-name">' + esc(rec.plan.nombre) + "</span>" +
      '<span class="result__plan-price">' + price(rec.plan.precio) + " <small>" + esc(C.planes.periodo) + "</small></span></div>" +
      (rec.motivo ? '<p class="result__plan-why">' + esc(rec.motivo) + "</p>" : "") + "</div>" +
      '<dl class="result__summary">' + summary + "</dl>" +
      '<div class="result__cta"><a class="btn btn--red btn--lg" href="' + esc(waUrl(msg)) + '" target="_blank" rel="noopener" data-wa="quiz_resultado" data-plan="' + esc(rec.plan.nombre) + '">' +
      icon("wa") + "<span>" + esc(R.boton) + "</span></a></div>" +
      '<div class="result__restart"><button type="button" class="link-btn" data-restart>' + icon("redo") + "<span>" + esc(R.reiniciar) + "</span></button></div>" +
      "</div>";

    track("quiz_complete", {
      objetivo: A.objetivo.id, experiencia: A.experiencia.id, dias: A.dias.id,
      horario: A.horario.id, lesion: A.lesiones.id, plan_recomendado: rec.plan.id,
    });
    watchResultCta($(".result__cta .btn", body));
    focusTop();
  }

  // Delegación de eventos del quiz
  body.addEventListener("click", function (e) {
    var t = e.target;
    var opt = t.closest(".opt");
    if (opt) {
      startOnce();
      var q = steps[state.i];
      var val = opt.getAttribute("data-value");
      $$(".opt", body).forEach(function (b) { b.setAttribute("aria-pressed", b === opt ? "true" : "false"); });

      if (q.tipo === "lesion" && val === "si") {
        var prevSi = state.answers.lesiones;
        state.answers.lesiones = { id: "si", texto: q.textoSi, detalle: prevSi && prevSi.detalle || "" };
        var extra = $("#injury-extra");
        extra.hidden = false;
        $("#injury-text").focus();
        return;
      }
      if (q.tipo === "lesion") {
        state.answers.lesiones = { id: "no", texto: q.textoNo };
      } else {
        var o = q.opciones.filter(function (x) { return x.id === val; })[0];
        state.answers[q.id] = { id: o.id, texto: o.texto };
      }
      setTimeout(next, 220); // pequeña pausa para que se vea la selección
      return;
    }
    if (t.closest("[data-injury-next]")) {
      state.answers.lesiones.detalle = $("#injury-text").value.trim();
      next();
      return;
    }
    if (t.closest("[data-back]")) { state.i = Math.max(0, state.i - 1); renderStep(true); return; }
    if (t.closest("[data-restart]")) {
      state = { i: 0, answers: {}, started: false, done: false };
      renderStep(true);
    }
  });

  body.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = $("#quiz-name");
    var name = input.value.trim().replace(/\s+/g, " ");
    var err = $("#name-error");
    if (name.length < 2) {
      err.hidden = false;
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", "name-error");
      input.focus();
      return;
    }
    startOnce();
    // Primera letra en mayúscula para que el mensaje quede prolijo
    name = name.replace(/(^|\s)(\S)/g, function (m, sp, ch) { return sp + ch.toUpperCase(); });
    state.answers.nombre = { id: "nombre", texto: name };
    next();
  });

  renderStep(false);

  /* ---------- Animación al aparecer (respeta "reducir movimiento") ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }
  }

  window.BH = { hero: renderHero, init: init };
})();
