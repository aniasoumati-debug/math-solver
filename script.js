use strict";

/* =================================
   MATH SOLVER
   Main Application
================================= */

let mode = "equation";
let currentLanguage = "ar";
let history = [];

/* =================================
   TRANSLATIONS
================================= */

const translations = {
  ar: {
    heroLabel: "مرحبًا بك في عالم الرياضيات",
    title: "مساعدك الرياضي الذكي",
    subtitle: "اجعل حل المسائل الرياضية أسهل وأسرع ✨",
    equation: "حل معادلة",
    integral: "حل تكامل",
    label: "أدخل المسألة الرياضية",
    hint: "استخدم x للمتغير الرياضي",
    solve: "حل المسألة ✨",
    clear: "مسح",
    examples: "أمثلة للتجربة",
    solution: "الحل والشرح",
    history: "سجل العمليات",
    clearHistory: "مسح السجل",
    waiting: "سيظهر الحل هنا بعد إدخال المسألة.",
    empty: "الرجاء إدخال مسألة أولاً.",
    error: "تعذر حل المسألة. تحقق من كتابتها.",
    noHistory: "لا توجد عمليات سابقة.",
    result: "النتيجة",
    steps: "خطوات الحل",
    equationStep: "نبسّط المعادلة وننقل جميع الحدود إلى طرف واحد.",
    linearStep: "هذه معادلة من الدرجة الأولى.",
    quadraticStep: "هذه معادلة من الدرجة الثانية.",
    discriminant: "نحسب المميز: Δ = b² - 4ac.",
    noRealRoots: "لا توجد حلول حقيقية لهذه المعادلة.",
    infinite: "المعادلة صحيحة لكل قيم x.",
    impossible: "المعادلة مستحيلة ولا تملك حلاً.",
    integralStep: "نحسب التكامل بالنسبة إلى x.",
    integralConstant: "نضيف ثابت التكامل C.",
    degreeError: "يدعم الإصدار الحالي المعادلات من الدرجة الأولى والثانية فقط.",
    invalid: "صيغة المسألة غير صحيحة.",
    footer: "صُنع بشغف من أجل عشاق الرياضيات 💜",
    equationExamples: [
      "x^2 - 5*x + 6 = 0",
      "2*x + 4 = 10",
      "x^2 - 9 = 0",
      "3*x - 12 = 0",
      "x^2 + 4*x + 4 = 0"
    ],
    integralExamples: [
      "x^2",
      "sin(x)",
      "3*x^2 + 2*x",
      "cos(x)",
      "5*x^4"
    ]
  },

  en: {
    heroLabel: "Welcome to the world of mathematics",
    title: "Your Smart Math Assistant",
    subtitle: "Make solving math problems easier and faster ✨",
    equation: "Solve Equation",
    integral: "Solve Integral",
    label: "Enter your mathematical problem",
    hint: "Use x as your mathematical variable",
    solve: "Solve Problem ✨",
    clear: "Clear",
    examples: "Try These Examples",
    solution: "Solution & Explanation",
    history: "Calculation History",
    clearHistory: "Clear History",
    waiting: "Your solution will appear here.",
    empty: "Please enter a problem first.",
    error: "Unable to solve the problem. Check its format.",
    noHistory: "No previous operations.",
    result: "Result",
    steps: "Solution Steps",
    equationStep: "Simplify the equation and move all terms to one side.",
    linearStep: "This is a linear equation.",
    quadraticStep: "This is a quadratic equation.",
    discriminant: "Calculate the discriminant: Δ = b² - 4ac.",
    noRealRoots: "This equation has no real solutions.",
    infinite: "The equation is true for every value of x.",
    impossible: "The equation has no solution.",
    integralStep: "Calculate the integral with respect to x.",
    integralConstant: "Add the integration constant C.",
    degreeError: "This version supports only linear and quadratic equations.",
    invalid: "Invalid mathematical expression.",
    footer: "Made with passion for mathematics lovers 💜",
    equationExamples: [
      "x^2 - 5*x + 6 = 0",
      "2*x + 4 = 10",
      "x^2 - 9 = 0",
      "3*x - 12 = 0",
      "x^2 + 4*x + 4 = 0"
    ],
    integralExamples: [
      "x^2",
      "sin(x)",
      "3*x^2 + 2*x",
      "cos(x)",
      "5*x^4"
    ]
  },

  ko: {
    heroLabel: "수학의 세계에 오신 것을 환영합니다",
    title: "스마트 수학 도우미",
    subtitle: "수학 문제를 더 쉽고 빠르게 해결하세요 ✨",
    equation: "방정식 풀기",
    integral: "적분 계산",
    label: "수학 문제를 입력하세요",
    hint: "수학 변수로 x를 사용하세요",
    solve: "문제 풀기 ✨",
    clear: "지우기",
    examples: "예제",
    solution: "풀이 및 설명",
    history: "계산 기록",
    clearHistory: "기록 지우기",
    waiting: "여기에 풀이가 표시됩니다.",
    empty: "먼저 문제를 입력하세요.",
    error: "문제를 해결할 수 없습니다. 입력을 확인하세요.",
    noHistory: "이전 기록이 없습니다.",
    result: "결과",
    steps: "풀이 단계",
    equationStep: "식을 정리하고 모든 항을 한쪽으로 이동합니다.",
    linearStep: "일차방정식입니다.",
    quadraticStep: "이차방정식입니다.",
    discriminant: "판별식을 계산합니다: Δ = b² - 4ac.",
    noRealRoots: "실수 해가 없습니다.",
    infinite: "모든 x 값에서 성립하는 방정식입니다.",
    impossible: "해가 없는 방정식입니다.",
    integralStep: "x에 대한 적분을 계산합니다.",
    integralConstant: "적분 상수 C를 더합니다.",
    degreeError: "현재 버전은 일차 및 이차방정식만 지원합니다.",
    invalid: "수학식이 올바르지 않습니다.",
    footer: "수학을 사랑하는 사람들을 위해 만들었습니다 💜",
    equationExamples: [
      "x^2 - 5*x + 6 = 0",
      "2*x + 4 = 10",
      "x^2 - 9 = 0",
      "3*x - 12 = 0",
      "x^2 + 4*x + 4 = 0"
    ],
    integralExamples: [
      "x^2",
      "sin(x)",
      "3*x^2 + 2*x",
      "cos(x)",
      "5*x^4"
    ]
  }
};

/* =================================
   ELEMENT HELPERS
================================= */

function getElement(id) {
  return document.getElementById(id);
}

function getText() {
  return translations[currentLanguage];
}

/* =================================
   LANGUAGE SYSTEM
================================= */

function updateLanguage() {
  const languageSelect = getElement("language");

  currentLanguage = languageSelect.value;

  const t = getText();

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir =
    currentLanguage === "ar" ? "rtl" : "ltr";

  getElement("heroLabel").textContent = t.heroLabel;
  getElement("title").textContent = t.title;
  getElement("subtitle").textContent = t.subtitle;

  getElement("equationText").textContent = t.equation;
  getElement("integralText").textContent = t.integral;

  getElement("problemLabel").textContent = t.label;
  getElement("inputHint").textContent = t.hint;

  getElement("solveBtn").textContent = t.solve;
  getElement("clearBtn").textContent = t.clear;

  getElement("examplesTitle").textContent = t.examples;
  getElement("resultTitle").textContent = t.solution;
  getElement("historyTitle").textContent = t.history;
  getElement("historyClear").textContent = t.clearHistory;

  getElement("waitingText").textContent = t.waiting;
  getElement("footerText").textContent = t.footer;

  renderExamples();
  renderHistory();
}

getElement("language").addEventListener(
  "change",
  updateLanguage
);

/* =================================
   MODE SYSTEM
================================= */

function setMode(newMode) {
  if (newMode !== "equation" && newMode !== "integral") {
    return;
  }

  mode = newMode;

  getElement("equationTab").classList.toggle(
    "active",
    mode === "equation"
  );

  getElement("integralTab").classList.toggle(
    "active",
    mode === "integral"
  );

  getElement("equationTab").setAttribute(
    "aria-pressed",
    String(mode === "equation")
  );

  getElement("integralTab").setAttribute(
    "aria-pressed",
    String(mode === "integral")
  );

  getElement("problem").value = "";

  showWaiting();
  renderExamples();
}

function showWaiting() {
  const t = getText();
  const container = getElement("solution");

  container.replaceChildren();

  const state = document.createElement("div");
  state.className = "empty-state";

  const icon = document.createElement("span");
  icon.className = "empty-icon";
  icon.textContent = "∑";

  const message = document.createElement("p");
  message.id = "waitingText";
  message.textContent = t.waiting;

  state.append(icon, message);
  container.appendChild(state);
}

/* =================================
   EXAMPLES
================================= */

function renderExamples() {
  const t = getText();

  const examples = mode === "equation"
    ? t.equationExamples
    : t.integralExamples;

  const container = getElement("examplesList");

  container.replaceChildren();

  examples.forEach(example => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "example-btn";
    button.textContent = example;

    button.addEventListener("click", () => {
      getElement("problem").value = example;
      getElement("problem").focus();
    });

    container.appendChild(button);
  });
}

/* =================================
   MATHEMATICAL HELPERS
================================= */

function cleanNumber(number) {
  if (!Number.isFinite(number)) {
    return String(number);
  }

  if (Math.abs(number) < 1e-10) {
    return "0";
  }

  return Number(number.toPrecision(10)).toString();
}

function evaluateExpression(expression, xValue) {
  return math.evaluate(expression, { x: xValue });
}

function solveEquation(input) {
  const t = getText();

  const parts = input.split("=");

  if (parts.length !== 2) {
    throw new Error("invalid");
  }

  const left = parts[0].trim();
  const right = parts[1].trim();

  if (!left || !right) {
    throw new Error("invalid");
  }

  const expression = `(${left}) - (${right})`;

  const simplified = math.simplify(expression).toString();

  const firstDerivative = math.derivative(
    simplified,
    "x"
  ).toString();

  const secondDerivative = math.derivative(
    firstDerivative,
    "x"
  ).toString();

  const a = evaluateExpression(secondDerivative, 0) / 2;
  const b = evaluateExpression(firstDerivative, 0);
  const c = evaluateExpression(simplified, 0);

  if (![a, b, c].every(Number.isFinite)) {
    throw new Error("invalid");
  }

  // Check that the expression is a polynomial
  // of degree at most two.

  for (const value of [-2, -1, 1, 2, 3]) {
    const actual = evaluateExpression(simplified, value);
    const expected = a * value * value + b * value + c;

    if (
      !Number.isFinite(actual) ||
      Math.abs(actual - expected) >
      1e-7 * Math.max(1, Math.abs(actual), Math.abs(expected))
    ) {
      throw new Error("degree");
    }
  }

  const steps = [t.equationStep];

  if (Math.abs(a) < 1e-10) {

    if (Math.abs(b) < 1e-10) {

      if (Math.abs(c) < 1e-10) {
        return {
          result: t.infinite,
          steps
        };
      }

      return {
        result: t.impossible,
        steps
      };
    }

    steps.push(t.linearStep);

    const root = -c / b;

    return {
      result: `x = ${cleanNumber(root)}`,
      steps: [
        ...steps,
        `x = -(${cleanNumber(c)}) / (${cleanNumber(b)})`,
        `x = ${cleanNumber(root)}`
      ]
    };
  }

  steps.push(t.quadraticStep);
  steps.push(t.discriminant);

  const delta = b * b - 4 * a * c;

  if (delta < -1e-10) {
    return {
      result: t.noRealRoots,
      steps: [
        ...steps,
        `Δ = ${cleanNumber(delta)}`
      ]
    };
  }

  if (Math.abs(delta) <= 1e-10) {
    const root = -b / (2 * a);

    return {
      result: `x = ${cleanNumber(root)}`,
      steps: [
        ...steps,
        `Δ = 0`,
        `x = -b / 2a`,
        `x = ${cleanNumber(root)}`
      ]
    };
  }

  const root1 = (-b + Math.sqrt(delta)) / (2 * a);
  const root2 = (-b - Math.sqrt(delta)) / (2 * a);

  return {
    result: `x₁ = ${cleanNumber(root1)} , x₂ = ${cleanNumber(root2)}`,
    steps: [
      ...steps,
      `Δ = ${cleanNumber(delta)}`,
      `x₁ = ${cleanNumber(root1)}`,
      `x₂ = ${cleanNumber(root2)}`
    ]
  };
}

/* =================================
   INTEGRAL SOLVER
================================= */

function solveIntegral(input) {
  if (
    typeof Algebrite === "undefined" ||
    typeof Algebrite.integral !== "function"
  ) {
    throw new Error("library");
  }

  const t = getText();

  const expression = math.parse(input).toString();

  const result = Algebrite.integral(expression).toString();

  if (
    !result ||
    result === "undefined" ||
    result.includes("stop")
  ) {
    throw new Error("invalid");
  }

  return {
    result: `${result} + C`,
    steps: [
      t.integralStep,
      `∫ ${input} dx = ${result}`,
      t.integralConstant
    ]
  };
}

/* =================================
   DISPLAY SOLUTION
================================= */

function displaySolution(data) {
  const t = getText();

  const container = getElement("solution");

  container.replaceChildren();

  const resultTitle = document.createElement("h3");
  resultTitle.textContent = t.result;

  const resultText = document.createElement("p");
  resultText.textContent = data.result;

  const stepsTitle = document.createElement("h3");
  stepsTitle.textContent = t.steps;
  stepsTitle.style.marginTop = "20px";

  container.append(resultTitle, resultText, stepsTitle);

  data.steps.forEach((step, index) => {
    const item = document.createElement("div");

    item.className = "step";
    item.textContent = `${index + 1}. ${step}`;

    container.appendChild(item);
  });
}

/* =================================
   SOLVE BUTTON
================================= */

function solveProblem() {
  const t = getText();

  const input = getElement("problem").value.trim();

  if (!input) {
    getElement("solution").textContent = t.empty;
    return;
  }

  try {
    let answer;

    if (mode === "equation") {
      answer = solveEquation(input);
    } else {
      answer = solveIntegral(input);
    }

    displaySolution(answer);

    history.unshift({
      question: input,
      answer: answer.result,
      mode: mode
    });

    // Keep the latest 30 operations.
    history = history.slice(0, 30);

    renderHistory();

  } catch (error) {
    console.error("Math Solver:", error);

    let message = t.error;

    if (error.message === "degree") {
      message = t.degreeError;
    }

    getElement("solution").textContent = message;
  }
}

/* =================================
   CLEAR INPUT
================================= */

function clearProblem() {
  getElement("problem").value = "";
  showWaiting();
}

/* =================================
   HISTORY
================================= */

function renderHistory() {
  const t = getText();

  const list = getElement("historyList");

  list.replaceChildren();

  if (history.length === 0) {
    const item = document.createElement("li");

    item.textContent = t.noHistory;

    list.appendChild(item);
    return;
  }

  history.forEach(entry => {
    const item = document.createElement("li");

    const modeName = entry.mode === "equation"
      ? t.equation
      : t.integral;

    item.textContent =
      `${modeName}: ${entry.question} = ${entry.answer}`;

    list.appendChild(item);
  });
}

function clearHistory() {
  history = [];
  renderHistory();
}

/* =================================
   INITIALIZATION
================================= */

function initializeApp() {
  updateLanguage();
  setMode("equation");
  renderHistory();
}

initializeApp();

