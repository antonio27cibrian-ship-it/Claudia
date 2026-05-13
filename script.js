// ============================================================
// SelectoTech – Portal de Comisiones (vanilla JS)
// ============================================================

const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
});

// ------------------------------------------------------------
// Año en footer
// ------------------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// ------------------------------------------------------------
// Animación de stats del hero (conteo)
// ------------------------------------------------------------
function animateCount(el) {
  const target = Number(el.dataset.count);
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll('.stat-num').forEach(animateCount);

// ------------------------------------------------------------
// Calculadora de comisiones
// ------------------------------------------------------------
const ventaInput = document.getElementById('ventaInput');
const ventaSlider = document.getElementById('ventaSlider');
const rateInput = document.getElementById('rateInput');
const resultAmount = document.getElementById('resultAmount');
const resultPeriodLabel = document.getElementById('resultPeriodLabel');
const projWeek = document.getElementById('projWeek');
const projMonth = document.getElementById('projMonth');
const projYear = document.getElementById('projYear');
const tabs = document.querySelectorAll('.calc-tab');

const periodConfig = {
  dia:    { label: 'por día trabajado', toWeek: 7,  toMonth: 30, toYear: 365 },
  semana: { label: 'por semana',        toWeek: 1,  toMonth: 4.33, toYear: 52 },
  mes:    { label: 'por mes',           toWeek: 1/4.33, toMonth: 1, toYear: 12 },
};
let currentPeriod = 'dia';

function updateCalc() {
  const ventas = Number(ventaInput.value) || 0;
  const rate = Math.max(0, Math.min(100, Number(rateInput.value) || 0));
  const commission = ventas * (rate / 100);
  const cfg = periodConfig[currentPeriod];

  resultAmount.textContent = formatter.format(commission);
  resultPeriodLabel.textContent = cfg.label;
  projWeek.textContent  = formatter.format(commission * cfg.toWeek);
  projMonth.textContent = formatter.format(commission * cfg.toMonth);
  projYear.textContent  = formatter.format(commission * cfg.toYear);

  resultAmount.classList.add('bump');
  setTimeout(() => resultAmount.classList.remove('bump'), 180);
}

ventaInput.addEventListener('input', () => {
  ventaSlider.value = Math.min(Number(ventaSlider.max), Math.max(0, Number(ventaInput.value) || 0));
  updateCalc();
});
ventaSlider.addEventListener('input', () => {
  ventaInput.value = ventaSlider.value;
  updateCalc();
});
rateInput.addEventListener('input', updateCalc);
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    currentPeriod = tab.dataset.period;
    updateCalc();
  });
});

updateCalc();

// ------------------------------------------------------------
// Metas / niveles
// ------------------------------------------------------------
const ventaMes = document.getElementById('ventaMes');
const ventaMesSlider = document.getElementById('ventaMesSlider');
const goalsList = document.getElementById('goalsList');

const goals = [
  { meta: 10000,  titulo: 'Arranque de mes',     desc: 'Calienta motores y asegura tu base.', bono: 0,    icon: 1 },
  { meta: 30000,  titulo: 'Vendedor activo',     desc: 'Comisión 20% + bono de constancia.',  bono: 500,  icon: 2 },
  { meta: 60000,  titulo: 'Top performer',       desc: 'Bono extra y reconocimiento.',         bono: 1500, icon: 3 },
  { meta: 100000, titulo: 'Élite SelectoTech',   desc: 'Bono mayor + acceso a premios.',       bono: 3500, icon: 4 },
  { meta: 150000, titulo: 'Leyenda del trimestre', desc: 'Bono especial + viaje sorpresa.',    bono: 6000, icon: 5 },
];

function renderGoals() {
  const ventas = Number(ventaMes.value) || 0;
  goalsList.innerHTML = '';
  goals.forEach((g) => {
    const pct = Math.min(100, (ventas / g.meta) * 100);
    const unlocked = ventas >= g.meta;
    const card = document.createElement('div');
    card.className = 'goal-card' + (unlocked ? ' unlocked' : '');
    card.innerHTML = `
      <div class="goal-icon">${g.icon}</div>
      <div class="goal-info">
        <h5>${g.titulo} · ${formatter.format(g.meta)}</h5>
        <p>${g.desc}</p>
        <div class="goal-bar"><span style="width:${pct}%"></span></div>
      </div>
      <div class="goal-reward">
        <strong>${g.bono ? '+' + formatter.format(g.bono) : '20%'}</strong>
        <p>${g.bono ? 'bono' : 'comisión base'}</p>
      </div>
    `;
    goalsList.appendChild(card);
  });
}

ventaMes.addEventListener('input', () => {
  ventaMesSlider.value = Math.min(Number(ventaMesSlider.max), Math.max(0, Number(ventaMes.value) || 0));
  renderGoals();
});
ventaMesSlider.addEventListener('input', () => {
  ventaMes.value = ventaMesSlider.value;
  renderGoals();
});
renderGoals();

// ------------------------------------------------------------
// Asistente de respuestas
// ------------------------------------------------------------
const clienteMsg = document.getElementById('clienteMsg');
const responderBtn = document.getElementById('responderBtn');
const copiarBtn = document.getElementById('copiarBtn');
const respuestaBox = document.getElementById('respuestaBox');

const intents = [
  {
    id: 'precio',
    keywords: ['precio', 'cuesta', 'cuánto', 'cuanto', 'vale', 'cotización', 'cotizar', 'costo'],
    plantilla: () => `¡Hola! Gracias por escribir a SelectoTech.\n\nCon gusto te paso la información del producto que te interesa. El precio incluye garantía y soporte directo con nosotros.\n\n¿Me confirmas el modelo o producto exacto para enviarte el precio actualizado y el link de pago? Si lo necesitas para hoy, podemos apartarlo de inmediato.`
  },
  {
    id: 'envio',
    keywords: ['envío', 'envio', 'entrega', 'mandar', 'enviar', 'paquetería', 'paqueteria', 'mensajería'],
    plantilla: () => `¡Claro que sí! Hacemos envíos a toda la república con guía de rastreo.\n\n• Tiempo estimado: 2 a 4 días hábiles.\n• Envío gratis en compras mayores a $1,500 MXN.\n• Para entregas urgentes manejamos servicio express.\n\n¿Me compartes tu código postal para confirmar tiempo y costo exacto?`
  },
  {
    id: 'garantia',
    keywords: ['garantía', 'garantia', 'falla', 'falló', 'defectuoso', 'devolución', 'devolver', 'cambio'],
    plantilla: () => `Por supuesto. Todos nuestros productos cuentan con garantía directa con SelectoTech.\n\n• 30 días por cualquier falla de fábrica con cambio físico.\n• Garantía extendida del fabricante (varía por marca).\n• Soporte técnico sin costo durante toda la garantía.\n\n¿Me puedes compartir el número de pedido o la fecha de compra para revisar tu caso?`
  },
  {
    id: 'descuento',
    keywords: ['descuento', 'rebaja', 'promoción', 'promocion', 'caro', 'precio bajar', 'mejor precio', 'oferta'],
    plantilla: () => `¡Te entiendo perfecto! Quiero ayudarte a que se ajuste a tu presupuesto.\n\nTe puedo ofrecer:\n• Precio especial por pago en una sola exhibición.\n• Combos con accesorios incluidos a mejor precio.\n• Meses sin intereses con tarjetas participantes.\n\n¿Cuál opción te conviene más para que avancemos hoy?`
  },
  {
    id: 'pagos',
    keywords: ['meses sin intereses', 'msi', 'mensualidades', 'tarjeta', 'efectivo', 'transferencia', 'pago', 'pagar', 'crédito', 'credito', 'depósito'],
    plantilla: () => `¡Sí, manejamos varias formas de pago!\n\n• Tarjeta de crédito/débito (Visa, Mastercard, Amex).\n• Meses sin intereses (3, 6, 9 y 12 con tarjetas participantes).\n• Transferencia SPEI o depósito en OXXO.\n• Efectivo en tienda.\n\n¿Cuál prefieres? Te genero la liga de pago en cuanto me confirmes.`
  },
  {
    id: 'queja',
    keywords: ['queja', 'molesto', 'molesta', 'reclamo', 'no llegó', 'no llego', 'mal servicio', 'pésimo', 'pesimo', 'enojado', 'inconforme'],
    plantilla: () => `Lamento mucho la situación y agradezco que nos lo hagas saber. Tu experiencia es muy importante para nosotros.\n\nVoy a revisar tu caso de inmediato. ¿Me puedes compartir el número de pedido y una breve descripción de lo ocurrido? Te aseguro que lo resolveremos hoy mismo.\n\nGracias por tu paciencia.`
  },
  {
    id: 'horario',
    keywords: ['horario', 'horarios', 'abren', 'cierran', 'abierto', 'atienden', 'atencion'],
    plantilla: () => `¡Hola! Nuestro horario de atención es:\n\n• Lunes a viernes: 9:00 a 19:00 hrs.\n• Sábados: 10:00 a 15:00 hrs.\n• Domingos: cerrado.\n\nPor WhatsApp también te respondemos lo más rápido posible. ¿En qué te puedo ayudar?`
  },
  {
    id: 'stock',
    keywords: ['stock', 'disponible', 'disponibilidad', 'inventario', 'tienen', 'queda', 'existe'],
    plantilla: () => `¡Déjame revisarlo en este momento! Para confirmarte disponibilidad exacta, ¿me puedes compartir el modelo o la marca específica que buscas?\n\nSi no lo tenemos en stock, lo conseguimos en 24-48 horas con nuestros proveedores y te lo apartamos sin compromiso.`
  },
  {
    id: 'factura',
    keywords: ['factura', 'facturar', 'cfdi', 'rfc', 'comprobante fiscal'],
    plantilla: () => `¡Por supuesto! Facturamos al instante.\n\n¿Me compartes los siguientes datos?\n• RFC y razón social.\n• Uso de CFDI.\n• Régimen fiscal.\n• Correo para enviar XML y PDF.\n\nEn cuanto confirmes el pago, te enviamos la factura en menos de 24 horas.`
  },
  {
    id: 'saludo',
    keywords: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal', 'que tal', 'saludos'],
    plantilla: () => `¡Hola! 👋 Soy parte del equipo de SelectoTech, tu tecnología de confianza.\n\n¿En qué producto o servicio te puedo ayudar hoy? Si me compartes un poco más del modelo o lo que buscas, te paso precio, disponibilidad y formas de pago.`
  },
];

function detectIntents(text) {
  const lower = text.toLowerCase();
  const matched = [];
  intents.forEach((intent) => {
    if (intent.keywords.some((k) => lower.includes(k))) matched.push(intent);
  });
  return matched;
}

function buildResponse(text) {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const matched = detectIntents(trimmed);

  if (matched.length === 0) {
    return `¡Hola! Gracias por escribir a SelectoTech.\n\nCon gusto te ayudo. Para darte la mejor respuesta, ¿me puedes compartir un poco más de detalle sobre lo que necesitas (producto, marca o modelo)?\n\nQuedo atento(a) para apoyarte y cerrar tu compra hoy mismo.`;
  }

  if (matched.length === 1) return matched[0].plantilla();

  // Combina varias intenciones en una sola respuesta
  const intro = `¡Hola! Gracias por escribir a SelectoTech. Te respondo cada punto:\n`;
  const body = matched.map((m, i) => `\n${i + 1}. ${m.plantilla()}`).join('\n');
  const cierre = `\n\n¿Procedemos a apartarte el producto y te paso la liga de pago?`;
  return intro + body + cierre;
}

function renderTyping(text) {
  respuestaBox.classList.add('has-content');
  respuestaBox.textContent = '';
  let i = 0;
  const speed = 8; // ms por carácter
  function step() {
    respuestaBox.textContent += text.charAt(i);
    i++;
    if (i < text.length) setTimeout(step, speed);
  }
  step();
}

responderBtn.addEventListener('click', () => {
  const respuesta = buildResponse(clienteMsg.value);
  if (!respuesta) {
    respuestaBox.classList.remove('has-content');
    respuestaBox.textContent = 'Escribe primero el mensaje del cliente y vuelve a pulsar Generar respuesta.';
    copiarBtn.disabled = true;
    return;
  }
  renderTyping(respuesta);
  copiarBtn.disabled = false;
  copiarBtn.dataset.text = respuesta;
});

copiarBtn.addEventListener('click', async () => {
  const text = copiarBtn.dataset.text || respuestaBox.textContent;
  try {
    await navigator.clipboard.writeText(text);
    const original = copiarBtn.textContent;
    copiarBtn.textContent = '¡Copiado!';
    setTimeout(() => (copiarBtn.textContent = original), 1400);
  } catch {
    copiarBtn.textContent = 'Selecciona y copia manualmente';
  }
});

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    clienteMsg.value = chip.dataset.sample;
    responderBtn.click();
  });
});

// ------------------------------------------------------------
// Lluvia de billetes (canvas)
// ------------------------------------------------------------
const canvas = document.getElementById('moneyCanvas');
const ctx = canvas.getContext('2d');
let bills = [];
let burstUntil = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Bill {
  constructor(burst = false) {
    this.reset(burst);
  }
  reset(burst = false) {
    this.x = Math.random() * canvas.width;
    this.y = burst ? -50 - Math.random() * 200 : -80 - Math.random() * canvas.height;
    this.w = 44 + Math.random() * 22;
    this.h = this.w * 0.46;
    this.vy = 1 + Math.random() * 1.6 + (burst ? 1.8 : 0);
    this.vx = (Math.random() - 0.5) * 0.6;
    this.rot = Math.random() * Math.PI * 2;
    this.vr = (Math.random() - 0.5) * 0.06;
    this.sway = Math.random() * 0.02 + 0.005;
    this.swayPhase = Math.random() * Math.PI * 2;
    this.color = Math.random() < 0.5 ? '#1ec27a' : '#ffd24a';
  }
  step(t) {
    this.swayPhase += this.sway;
    this.x += this.vx + Math.sin(this.swayPhase) * 0.7;
    this.y += this.vy;
    this.rot += this.vr;
    if (this.y > canvas.height + 60) this.reset(false);
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.globalAlpha = 0.85;
    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(-this.w / 2 + 2, -this.h / 2 + 2, this.w, this.h);
    // Billete
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    // Marco interior
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(-this.w / 2 + 3, -this.h / 2 + 3, this.w - 6, this.h - 6);
    // Círculo central
    ctx.beginPath();
    ctx.arc(0, 0, this.h * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.font = `bold ${Math.round(this.h * 0.42)}px Russo One, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', 0, 1);
    ctx.restore();
  }
}

function initBills(n = 22) {
  bills = [];
  for (let i = 0; i < n; i++) bills.push(new Bill(false));
}
initBills();

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = performance.now();
  // Burst: añadir billetes extra durante 2.5s
  if (now < burstUntil && bills.length < 120) {
    for (let i = 0; i < 3; i++) bills.push(new Bill(true));
  }
  bills.forEach((b) => { b.step(now); b.draw(ctx); });
  // Recortar si hay demasiados
  if (bills.length > 30 && now > burstUntil) bills = bills.slice(0, 30);
  requestAnimationFrame(loop);
}
loop();

document.getElementById('celebrateBtn').addEventListener('click', () => {
  burstUntil = performance.now() + 2500;
});
