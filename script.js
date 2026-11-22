
"use strict";

// =====================================
// MATH SOLVER 💜
// Complete JavaScript engine
// =====================================

const $ = (id) => document.getElementById(id);

let mode = "equation";
let language = "ar";
let history = [];

const translations = {
  ar: {
    tagline: "Math Solver 💜",
    welcome: "الرياضيات أصبحت أسهل 💜",
    intro: "اكتب مسألتك ودع Math Solver يساعدك على فهم الحل.",
    equation: "حل معادلة",
    integral: "حل تكامل",
    inputEquation: "اكتب المعادلة هنا",
    inputIntegral: "اكتب الدالة المراد تكاملها",
    hint: "استعمل x للمتغير و ^ للأسس.",
    examples: "أمثلة:",
    solve: "حل المسألة ✨",
    clear: "مسح",
    result: "الحل",
    steps: "شرح الخطوات",
    history: "السجل",
    clearHistory: "مسح السجل",
    empty: "لا توجد عمليات سابقة.",
    noSolution: "لا يوجد حل حقيقي لهذه المعادلة.",
    infinite: "للمعادلة عدد لا نهائي من الحلول.",
    invalid: "المسألة غير صحيحة. تحقق من كتابتها.",
    degree: "هذه النسخة تدعم المعادلات حتى الدرجة الثانية.",
    integralError: "التكامل يدعم كثيرات الحدود ذات الأسس الصحيحة غير السالبة.",
    step1: "نرتب المعادلة على الصورة ax² + bx + c = 0.",
    step2: "نحدد معاملات المعادلة: a و b و c.",
    step3: "نحسب المميز Δ = b² - 4ac.",
    step4: "نطبق قانون حل المعادلة التربيعية.",
    stepLinear: "نستعمل العمليات الحسابية لعزل المتغير x.",
    integralStep1: "نطبق قاعدة تكامل القوى.",
    integralStep2: "نكامل كل حد على حدة.",
    integralStep3: "نضيف ثابت التكامل C.",
    resultLabel: "النتيجة:",
    error: "حدث خطأ. تحقق من صيغة المسألة.",
    cleared: "تم مسح السجل."
  },

  en: {
    tagline: "Math Solver 💜",
    welcome: "Math just got easier 💜",
    intro: "Enter your problem and let Math Solver explain the solution.",
    equation: "Solve equation",
    integral: "Solve integral",
    inputEquation: "Enter your equation",
    inputIntegral: "Enter the function to integrate",
    hint: "Use x as the variable and ^ for powers.",
    examples: "Examples:",
    solve: "Solve problem ✨",
    clear: "Clear",
    result: "Solution",
    steps: "Solution steps",
    history: "History",
    clearHistory: "Clear history",
    empty: "No previous calculations.",
    noSolution: "There are no real solutions.",
    infinite: "The equation has infinitely many solutions.",
    invalid: "Invalid problem. Check your expression.",
    degree: "This version supports equations up to degree two.",
    integralError: "Integrals support polynomials with non-negative integer powers.",
    step1: "Arrange the equation as ax² + bx + c = 0.",
    step2: "Identify the coefficients a, b and c.",
    step3: "Calculate the discriminant Δ = b² - 4ac.",
    step4: "Apply the quadratic formula.",
    stepLinear: "Use arithmetic operations to isolate x.",
    integralStep1: "Apply the power rule of integration.",
    integralStep2: "Integrate each term separately.",
    integralStep3: "Add the integration constant C.",
    resultLabel: "Result:",
    error: "An error occurred. Check your expression.",
    cleared: "History cleared."
  },

  ko: {
    tagline: "Math Solver 💜",
    welcome: "수학이 더 쉬워집니다 💜",
    intro: "문제를 입력하면 Math Solver가 풀이를 도와줍니다.",
    equation: "방정식 풀기",
    integral: "적분 풀기",
    inputEquation: "방정식을 입력하세요",
    inputIntegral: "적분할 함수를 입력하세요",
    hint: "변수는 x를 사용하고 거듭제곱은 ^로 입력하세요.",
    examples: "예시:",
    solve: "문제 풀기 ✨",
    clear: "지우기",
    result: "풀이",
    steps: "풀이 과정",
    history: "기록",
    clearHistory: "기록 지우기",
    empty: "이전 계산이 없습니다.",
    noSolution: "실수 해가 없습니다.",
    infinite: "무한히 많은 해가 있습니다.",
    invalid: "수식을 확인하고 다시 입력하세요.",
    degree: "이 버전은 2차 이하 방정식을 지원합니다.",
    integralError: "음이 아닌 정수 차수의 다항식만 지원합니다.",
    step1: "방정식을 ax² + bx + c = 0 형태로 정리합니다.",
    step2: "계수 a, b, c를 확인합니다.",
    step3: "판별식 Δ = b² - 4ac를 계산합니다.",
    step4: "이차방정식의 근의 공식을 적용합니다.",
    stepLinear: "x를 구하기 위해 식을 정리합니다.",
    integralStep1: "거듭제곱 적분 공식을 적용합니다.",
    integralStep2: "각 항을 따로 적분합니다.",
    integralStep3: "적분 상수 C를 추가합니다.",
    resultLabel: "결과:",
    error: "오류가 발생했습니다. 수식을 확인하세요.",
    cleared: "기록이 삭제되었습니다."
  }
};

function t(key) {
  return translations[language][key];
}

// =====================================
// POLYNOMIAL OPERATIONS
// =====================================

// Coefficients are stored from lowest
// power to highest power.
// Example: 3x² + 2x + 1 = [1, 2, 3]

function clean(poly) {
  while (
    poly.length > 1 &&
    Math.abs(poly[poly.length - 1]) < 1e-10
  ) {
    poly.pop();
  }

  return poly.map(v =>
    Math.abs(v) < 1e-10 ? 0 : v
  );
}

function add(a, b) {
  const result = Array(
    Math.max(a.length, b.length)
  ).fill(0);

  for (let i = 0; i < result.length; i++) {
    result[i] = (a[i] || 0) + (b[i] || 0);
  }

  return clean(result);
}

function negate(a) {
  return a.map(v => -v);
}

function multiply(a, b) {
  const result = Array(
    a.length + b.length - 1
  ).fill(0);

  a.forEach((v, i) => {
    b.forEach((w, j) => {
      result[i + j] += v * w;
    });
  });

  return clean(result);
}

function divide(a, b) {
  if (
    b.length !== 1 ||
    Math.abs(b[0]) < 1e-10
  ) {
    throw new Error("Invalid division");
  }

  return clean(a.map(v => v / b[0]));
}

function power(a, n) {
  if (
    !Number.isInteger(n) ||
    n < 0 ||
    n > 8
  ) {
    throw new Error("Invalid exponent");
  }

  let result = [1];

  for (let i = 0; i < n; i++) {
    result = multiply(result, a);
  }

  return clean(result);
}

// =====================================
// EXPRESSION TOKENIZER
// =====================================

function tokenize(source) {
  let s = source.toLowerCase()
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/\s+/g, "");

  if (!s) throw new Error("Empty expression");

  const tokens = s.match(
    /\d*\.?\d+(?:e[+-]?\d+)?|[a-z]+|[()+\-*/^]/g
  );

  if (!tokens || tokens.join("") !== s) {
    throw new Error("Invalid characters");
  }

  const result = [];

  for (const token of tokens) {
    const previous = result[result.length - 1];

    const startsValue =
      /^\d/.test(token) ||
      /^[a-z]$/.test(token) ||
      token === "(";

    const endsValue = previous && (
      /^\d/.test(previous) ||
      /^[a-z]$/.test(previous) ||
      previous === ")"
    );

    if (startsValue && endsValue) {
      result.push("*");
    }

    result.push(token);
  }

  return result;
}

// =====================================
// POLYNOMIAL PARSER
// =====================================

function parsePolynomial(source) {
  const tokens = tokenize(source);
  let position = 0;

  function peek() {
    return tokens[position];
  }

  function expression() {
    let value = term();

    while (
      peek() === "+" ||
      peek() === "-"
    ) {
      const operator = tokens[position++];
      const next = term();

      value = operator === "+"
        ? add(value, next)
        : add(value, negate(next));
    }

    return value;
  }

  function term() {
    let value = unary();

    while (
      peek() === "*" ||
      peek() === "/"
    ) {
      const operator = tokens[position++];
      const next = unary();

      value = operator === "*"
        ? multiply(value, next)
        : divide(value, next);
    }

    return value;
  }

  function unary() {
    if (peek() === "+") {
      position++;
      return unary();
    }

    if (peek() === "-") {
      position++;
      return negate(unary());
    }

    return factor();
  }

  function factor() {
    let value;

    if (peek() === "(") {
      position++;
      value = expression();

      if (peek() !== ")") {
        throw new Error("Missing closing bracket");
      }

      position++;
    }

    else if (peek() === "x") {
      position++;
      value = [0, 1];
    }

    else if (
      peek() &&
      /^\d/.test(peek())
    ) {
      value = [Number(tokens[position++])];
    }

    else {
      throw new Error("Invalid expression");
    }

    if (peek() === "^") {
      position++;

      const exponentToken = peek();

      if (
        !exponentToken ||
        !/^\d+$/.test(exponentToken)
      ) {
        throw new Error("Invalid exponent");
      }

      const exponent = Number(tokens[position++]);
      value = power(value, exponent);
    }

    return value;
  }

  const result = expression();

  if (position !== tokens.length) {
    throw new Error("Unexpected token");
  }

  return clean(result);
}

// =====================================
// FORMAT NUMBERS
// =====================================

function formatNumber(number) {
  if (Math.abs(number) < 1e-10) return "0";

  if (Math.abs(number - Math.round(number)) < 1e-10) {
    return String(Math.round(number));
  }

  return Number(number.toFixed(6)).toString();
}

function formatPolynomial(poly) {
  const parts = [];

  for (let i = poly.length - 1; i >= 0; i--) {
    const coefficient = poly[i];

    if (Math.abs(coefficient) < 1e-10) continue;

    const absolute = Math.abs(coefficient);

    let term;

    if (i === 0) {
      term = formatNumber(absolute);
    } else {
      const variable = i === 1 ? "x" : `x^${i}`;

      term = absolute === 1
        ? variable
        : formatNumber(absolute) + variable;
    }

    if (parts.length === 0) {
      parts.push(
        coefficient < 0 ? "-" + term : term
      );
    } else {
      parts.push(
        coefficient < 0
          ? " - " + term
          : " + " + term
      );
    }
  }

  return parts.join("") || "0";
}

// =====================================
// EQUATION SOLVER
// =====================================

function solveEquation(input) {
  const sides = input.split("=");

  if (sides.length > 2 || !sides[0].trim()) {
    throw new Error("Invalid equation");
  }

  const left = parsePolynomial(sides[0]);

  const right = sides.length === 2
    ? parsePolynomial(sides[1])
    : [0];

  const poly = add(left, negate(right));

  const c = poly[0] || 0;
  const b = poly[1] || 0;
  const a = poly[2] || 0;

  const degree = poly.length - 1;

  if (degree > 2) {
    throw new Error("Degree");
  }

  if (degree === 0) {
    if (Math.abs(c) < 1e-10) {
      return {
        answer: t("infinite"),
        steps: [t("step1"), t("step2")]
      };
    }

    return {
      answer: t("noSolution"),
      steps: [t("step1"), t("step2")]
    };
  }

  if (degree === 1) {
    const x = -c / b;

    return {
      answer: `x = ${formatNumber(x)}`,
      steps: [
        t("stepLinear"),
        `${formatNumber(b)}x = ${formatNumber(-c)}`,
        `x = ${formatNumber(x)}`
      ]
    };
  }

  const delta = b * b - 4 * a * c;

  const steps = [
    t("step1"),
    t("step2"),
    `a = ${formatNumber(a)}, b = ${formatNumber(b)}, c = ${formatNumber(c)}`,
    `Δ = b² - 4ac = ${formatNumber(delta)}`
  ];

  if (delta < -1e-10) {
    return {
      answer: t("noSolution"),
      steps
    };
  }

  if (Math.abs(delta) < 1e-10) {
    const x = -b / (2 * a);

    steps.push(t("step4"));

    return {
      answer: `x = ${formatNumber(x)}`,
      steps
    };
  }

  const sqrtDelta = Math.sqrt(delta);

  const x1 = (-b + sqrtDelta) / (2 * a);
  const x2 = (-b - sqrtDelta) / (2 * a);

  steps.push(t("step4"));

  return {
    answer:
      `x₁ = ${formatNumber(x1)}\n` +
      `x₂ = ${formatNumber(x2)}`,
    steps
  };
}

// =====================================
// INTEGRAL SOLVER
// =====================================

function integratePolynomial(input) {
  if (input.includes("=")) {
    throw new Error("Invalid integral");
  }

  const poly = parsePolynomial(input);

  const result = [];

  for (let i = 0; i < poly.length; i++) {
    const coefficient = poly[i];

    if (i > 8) {
      throw new Error("Invalid power");
    }

    result[i + 1] = coefficient / (i + 1);
  }

  const formatted = formatPolynomial(result);

  return {
    answer: `${formatted} + C`,
    steps: [
      t("integralStep1"),
      t("integralStep2"),
      `${input}  →  ${formatted}`,
      t("integralStep3")
    ]
  };
}

// =====================================
// DISPLAY RESULTS
// =====================================

function showResult(result) {
  $("result").classList.remove("hidden");

  $("resultTitle").textContent = t("result");
  $("stepsTitle").textContent = t("steps");
  $("answer").textContent = result.answer;

  $("steps").replaceChildren();

  result.steps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    $("steps").appendChild(li);
  });

  $("error").textContent = "";
}

function showError(message) {
  $("result").classList.add("hidden");
  $("error").textContent = message;
}

function saveHistory(problem, answer) {
  history.unshift({
    problem,
    answer
  });

  if (history.length > 10) {
    history.pop();
  }

  renderHistory();
}

function renderHistory() {
  const list = $("historyList");
  list.replaceChildren();

  if (history.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.id = "emptyHistory";
    empty.textContent = t("empty");
    list.appendChild(empty);
    return;
  }

  history.forEach(item => {
    const card = document.createElement("div");
    card.className = "history-item";

    const problem = document.createElement("strong");
    problem.textContent = item.problem;

    const answer = document.createElement("span");
    answer.textContent = item.answer;

    card.append(problem, answer);
    list.appendChild(card);
  });
}

// =====================================
// SOLVE BUTTON
// =====================================

function solve() {
  const input = $("problem").value.trim();

  if (!input) {
    showError(t("invalid"));
    return;
  }

  try {
    const result = mode === "equation"
      ? solveEquation(input)
      : integratePolynomial(input);

    showResult(result);
    saveHistory(input, result.answer);

  } catch (error) {
    if (error.message === "Degree") {
      showError(t("degree"));
    } else if (mode === "integral") {
      showError(t("integralError"));
    } else {
      showError(t("invalid"));
    }
  }
}

// =====================================
// MODE SWITCHING
// =====================================

function updateMode() {
  $("equationTab").classList.toggle(
    "active",
    mode === "equation"
  );

  $("integralTab").classList.toggle(
    "active",
    mode === "integral"
  );

  $("inputLabel").textContent = mode === "equation"
    ? t("inputEquation")
    : t("inputIntegral");

  $("problem").placeholder = mode === "equation"
    ? "2x + 3 = 7"
    : "3x^2 + 2x + 1";

  const examples = mode === "equation"
    ? [
        ["2x+3=7", "2x + 3 = 7"],
        ["x^2-5x+6=0", "x² - 5x + 6 = 0"],
        ["3x^2+2x-1=0", "3x² + 2x - 1 = 0"]
      ]
    : [
        ["3x^2+2x+1", "3x² + 2x + 1"],
        ["x^3+2x", "x³ + 2x"],
        ["5x^2-4x", "5x² - 4x"]
      ];

  const container = document.querySelector(".examples");

  container.querySelectorAll(".example").forEach(
    (button, index) => {
      button.dataset.value = examples[index][0];
      button.textContent = examples[index][1];
    }
  );

  $("error").textContent = "";
  $("result").classList.add("hidden");
  $("problem").value = "";
}

// =====================================
// LANGUAGE SWITCHING
// =====================================

function applyLanguage() {
  const direction = language === "ar" ? "rtl" : "ltr";

  document.documentElement.lang = language;
  document.documentElement.dir = direction;

  $("tagline").textContent = t("tagline");
  $("welcomeTitle").textContent = t("welcome");
  $("welcomeText").textContent = t("intro");

  $("equationTab").textContent = t("equation");
  $("integralTab").textContent = t("integral");

  $("hint").textContent = t("hint");
  $("examplesLabel").textContent = t("examples");
  $("solveButton").textContent = t("solve");
  $("clearButton").textContent = t("clear");

  $("historyTitle").textContent = t("history");
  $("clearHistory").textContent = t("clearHistory");

  $("inputLabel").textContent = mode === "equation"
    ? t("inputEquation")
    : t("inputIntegral");

  updateMode();
  renderHistory();
}

// =====================================
// BUTTON EVENTS
// =====================================

$("solveButton").addEventListener("click", solve);

$("problem").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    solve();
  }
});

$("clearButton").addEventListener("click", () => {
  $("problem").value = "";
  $("error").textContent = "";
  $("result").classList.add("hidden");
});

$("equationTab").addEventListener("click", () => {
  mode = "equation";
  updateMode();
});

$("integralTab").addEventListener("click", () => {
  mode = "integral";
  updateMode();
});

document.querySelectorAll(".example").forEach(button => {
  button.addEventListener("click", () => {
    $("problem").value = button.dataset.value;
    $("error").textContent = "";
    $("result").classList.add("hidden");
  });
});

$("clearHistory").addEventListener("click", () => {
  history = [];
  renderHistory();
  $("error").textContent = t("cleared");
});

$("language").addEventListener("change", event => {
  language = event.target.value;
  applyLanguage();
});

// =====================================
// INITIALIZATION
// =====================================

applyLanguage();
updateMode();
renderHistory();
