import { groups, lessons, nodes, edges, sources } from "./course.mjs";
import { createScenePlayer } from "./scenes.mjs";
import { beginnerFor, vocabulary } from "./beginner.mjs";
import { readerMarkup, mountReader } from "./reader.mjs";

const sourceRepository =
    "https://github.com/minhqng/ride-hailing-microservices-system";

const $ = (selector) => document.querySelector(selector);
const escape = (value) =>
    String(value).replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[c],
    );
const iconPaths = {
    book: '<path d="M12 5c-4-3-8-2-9-1v15c4-2 7-1 9 1 2-2 5-3 9-1V4c-1-1-5-2-9 1Z"/><path d="M12 5v15"/>',
    spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
    layers: '<path d="m12 3 10 5-10 5L2 8Z"/><path d="m2 12 10 5 10-5M2 16l10 5 10-5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
    moon: '<path d="M20 14A8 8 0 0 1 10 4a8.5 8.5 0 1 0 10 10Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    folder: '<path d="M3 7V5h7l2 3h9v12H3Z"/>',
    file: '<path d="M5 3h9l5 5v13H5Z"/><path d="M14 3v6h5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    circleCheck: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    code: '<path d="m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18"/>',
    replay: '<path d="M3 11a9 9 0 1 1 1 6M3 4v7h7"/>',
    play: '<path d="m8 4 12 8-12 8Z"/>',
    pause: '<path d="M7 4h3v16H7zm7 0h3v16h-3z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    list: '<path d="M9 5h12M9 12h12M9 19h12M3 5h1m-1 7h1m-1 7h1"/>',
    light: '<path d="M8 17c0-3-3-4-3-8a7 7 0 0 1 14 0c0 4-3 5-3 8ZM9 21h6M9 17h6"/>',
    user: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0 1 16 0v3"/>',
    gateway:
        '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h4"/>',
    shield: '<path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6Z"/><path d="m8 11 3 3 5-6"/>',
    trip: '<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M5 7v9a3 3 0 0 0 3 3h9M10 5h6a3 3 0 0 1 0 6h-4"/>',
    database:
        '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/>',
    broker: '<rect x="2" y="8" width="5" height="8" rx="1"/><rect x="17" y="2" width="5" height="7" rx="1"/><rect x="17" y="15" width="5" height="7" rx="1"/><path d="M7 12h5V5h5m-5 7v7h5"/>',
    matching:
        '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="19" r="3"/><path d="m7 9 4 7m6-7-4 7M9 6h6"/>',
    car: '<path d="m4 10 2-6h12l2 6M3 17V10h18v7ZM5 17v3m14-3v3M6 13h2m8 0h2"/>',
    card: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 9h20M6 15h4"/>',
    bell: '<path d="M5 16V9a7 7 0 0 1 14 0v7l2 2H3ZM9 21h6"/>',
    link: '<path d="m10 13 4-4m-5 7-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 0 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"/>',
    print: '<path d="M6 8V2h12v6M6 17H3V8h18v9h-3M6 14h12v8H6Z"/>',
};
const icon = (name) =>
    `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">${iconPaths[name] || iconPaths.file}</svg>`;
function hydrateIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach((el) => {
        el.innerHTML = icon(el.dataset.icon);
    });
}

const storageKey = "ridelab-progress-v1";
function loadProgress() {
    try {
        const data = JSON.parse(localStorage.getItem(storageKey)) || {};
        return {
            completed: Array.isArray(data.completed)
                ? data.completed.filter((id) =>
                      lessons.some((l) => l.id === id),
                  )
                : [],
            answers: Object.fromEntries(
                lessons
                    .filter(
                        (l) =>
                            Number.isInteger(data.answers?.[l.id]) &&
                            data.answers[l.id] >= 0 &&
                            data.answers[l.id] < l.quiz.options.length,
                    )
                    .map((l) => [l.id, data.answers[l.id]]),
            ),
            theme: data.theme === "light" ? "light" : "dark",
        };
    } catch {
        return { completed: [], answers: {}, theme: "dark" };
    }
}
const progress = loadProgress();
let current = { view: "learn", lesson: lessons[0], index: 0 };
let lastLearnIndex = 0;
let sceneHost = null;
let scenePlayer = null;
let reader = null;
let sourceRequest = 0;
let toastTimer;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function persist() {
    try {
        localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
        toast(
            "Trình duyệt đang chặn lưu trữ; tiến độ chỉ giữ trong phiên này.",
        );
    }
}
function toast(text) {
    $("#toast").textContent = text;
    $("#toast").classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
        () => $("#toast").classList.remove("visible"),
        3200,
    );
}
function setTheme() {
    document.documentElement.dataset.theme = progress.theme;
    $("#theme-toggle").innerHTML = icon(
        progress.theme === "dark" ? "moon" : "sun",
    );
    $("#theme-toggle").setAttribute(
        "aria-label",
        `Chuyển sang giao diện ${progress.theme === "dark" ? "sáng" : "tối"}`,
    );
    $('meta[name="theme-color"]').content =
        progress.theme === "dark" ? "#25231e" : "#f5f2e9";
}
function href(lesson, index = 0) {
    return `#/learn/${lesson.id}/${index + 1}`;
}

function renderSidebar() {
    $("#lesson-count").textContent = `${lessons.length} bài học`;
    $("#course-nav").innerHTML = groups
        .map((group, groupIndex) => {
            const members = lessons.filter((l) => l.group === groupIndex);
            const count = members.filter((l) =>
                progress.completed.includes(l.id),
            ).length;
            const isCurrent = current.lesson.group === groupIndex;
            return `<details name="course-sections" class="course-group" ${isCurrent ? "open" : ""}><summary><span class="folder-color" style="--folder-color:${group.color}"></span><span class="group-title">${String(groupIndex + 1).padStart(2, "0")}. ${group.title}</span><span class="group-total">${count}/${members.length}</span></summary><ul class="lesson-list">${members.map((l) => `<li><a href="${href(l)}" class="lesson-link ${current.lesson.id === l.id && current.view === "learn" ? "active" : ""} ${progress.completed.includes(l.id) ? "completed" : ""}" ${current.lesson.id === l.id && current.view === "learn" ? 'aria-current="page"' : ""}>${icon(progress.completed.includes(l.id) ? "circleCheck" : "file")}<span>${l.title}</span></a></li>`).join("")}</ul></details>`;
        })
        .join("");
    $("#progress-count").textContent =
        `${progress.completed.length} / ${lessons.length}`;
    $("#progress-fill").style.width =
        `${(100 * progress.completed.length) / lessons.length}%`;
}

function point(id) {
    return nodes.find((n) => n.id === id);
}
function connection(from, to) {
    const a = point(from),
        b = point(to);
    if (!a || !b || from === to) return "";
    const dx = b.x - a.x,
        dy = b.y - a.y;
    const scale = 1 / Math.max(Math.abs(dx) / 72, Math.abs(dy) / 47);
    return `M${a.x + dx * scale},${a.y + dy * scale} L${b.x - dx * scale},${b.y - dy * scale}`;
}
function topology() {
    const markup = (n, x = n.x, y = n.y) =>
        `<g class="node active" transform="translate(${x},${y})" role="button" tabindex="0" aria-label="Khám phá ${n.label}: ${n.sub}" data-node="${n.id}"><ellipse class="node-glow" rx="88" ry="65" fill="none"/><rect class="node-base" x="-72" y="-45" width="144" height="90" rx="12"/><g class="node-icon" transform="translate(-12,-33)" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${iconPaths[n.icon]}</g><text text-anchor="middle" y="11">${n.label}</text><text class="node-sub" text-anchor="middle" y="29">${n.sub}</text></g>`;
    return `<svg class="topology topology-desktop" viewBox="0 -4 1150 440" role="group" aria-label="Sơ đồ service; chọn một thành phần để khám phá">${edges.map(([from, to, type]) => `<path class="wire ${type}" d="${connection(from, to)}"/>`).join("")}${nodes.map((n) => markup(n)).join("")}</svg><svg class="topology topology-mobile" viewBox="0 0 360 1040" role="group" aria-label="Các thành phần hệ thống; chọn để khám phá">${nodes.map((n, i) => markup(n, i % 2 === 0 ? 88 : 272, 75 + Math.floor(i / 2) * 145)).join("")}</svg>`;
}
function diagram() {
    return `<div class="diagram-stage">${topology()}</div><div class="diagram-footer"><div class="legend"><span><i></i>HTTP</span><span><i></i>Event / command</span><span><i></i>Persistence</span></div><span class="educational-note">Sơ đồ học tập · không phải telemetry trực tiếp</span></div>`;
}
function renderLearn() {
    const { lesson: l, index } = current;
    const s = l.steps[index];
    const last = index === l.steps.length - 1;
    const completed = progress.completed.includes(l.id);
    const beginner = beginnerFor(l, index);
    const sameStep = sceneHost?.dataset.sceneKey === `${l.id}/${index}`;
    const readingPage = sameStep ? reader?.page || 0 : 0;
    reader?.destroy();
    // Keep the actual stage and player alive while the explanatory shell updates.
    // This preserves the scene clock when opening dialogs or changing playback controls.
    sceneHost?.remove();
    $("#main").innerHTML =
        `<div class="learning-layout view-entry"><section class="lesson-workspace" aria-labelledby="lesson-title">
    <header class="lesson-header"><div class="breadcrumb">${String(l.group + 1).padStart(2, "0")}. ${groups[l.group].title}<span>/</span>Bài ${lessons.indexOf(l) + 1} / ${lessons.length}</div><div class="title-row"><h1 id="lesson-title">${l.title}</h1><div class="lesson-badges"><span class="pill">${icon("clock")}${l.steps.length + 2} phút đọc</span><span class="pill green">${icon("list")}${l.steps.length} bước</span></div></div><p class="lesson-subtitle">${l.subtitle}</p></header>
    <div class="diagram-card"><div class="diagram-toolbar"><div class="stat-row"><div class="stat"><span>ĐANG THEO DÕI</span><strong>${escape(point(s.to).label)}</strong></div><div class="stat"><span>RANH GIỚI</span><strong>${s.from === s.to ? "Cục bộ" : edges.some(([a, b, t]) => t === "db" && ((a === s.from && b === s.to) || (a === s.to && b === s.from))) ? "Database" : "Liên service"}</strong></div><div class="stat"><span>TIẾN TRÌNH</span><strong>${index + 1} / ${l.steps.length} bước</strong></div></div><div class="play-controls"><button id="replay" class="small-button" aria-label="Phát lại bài học">${icon("replay")}Phát lại</button><button id="animation-toggle" class="small-button" aria-pressed="false"></button></div></div><div id="lesson-scene" class="learning-scene"></div></div>
    <div class="timeline-panel"><div class="section-label"><span>TRONG BÀI NÀY</span><span>Bước ${index + 1} / ${l.steps.length}</span></div><ol class="step-list">${l.steps.map((part, i) => `<li><button class="step-button ${i === index ? "current" : i < index ? "visited" : ""}" data-step="${i}" ${i === index ? 'aria-current="step"' : ""} aria-label="Bước ${i + 1}: ${part.label}"><span>${i + 1}</span><span>${part.label}</span></button></li>`).join("")}</ol></div>
    <div class="source-strip"><span>${icon("link")}Nội dung đối chiếu từ code & tài liệu repo</span><button data-source-list="${l.id}">Mở ${l.refs.length} nguồn tham chiếu ${icon("code")}</button></div>
    </section><aside class="explanation-column" aria-label="Giải thích bước học"><section class="explanation-panel"><div class="step-meta"><span>BƯỚC ${index + 1} / ${l.steps.length}</span><span class="type-tag">${s.kind}</span></div>${readerMarkup(l, index)}<div class="step-navigation"><button id="previous" class="action-button" ${index === 0 ? "disabled" : ""}>Quay lại</button><button id="next" class="action-button primary">${last ? (completed ? "Bài tiếp theo" : "Hoàn thành bài") : `Tiếp: ${l.steps[index + 1].label}`}</button></div><div class="shortcuts"><kbd>←</kbd><kbd>→</kbd> bước · <kbd>R</kbd> phát lại · <kbd>Space</kbd> dừng / phát</div></section><section class="objectives-panel"><h3>BẠN SẼ HIỂU</h3><ul>${beginner.objectives.map((objective) => `<li><span class="objective-check ${completed ? "done" : ""}" aria-hidden="true">${completed ? "✓" : ""}</span>${objective}</li>`).join("")}</ul><p class="objective-note">Hoàn thành bài để ghi nhận tiến độ.</p></section></aside></div>`;
    const placeholder = $("#lesson-scene");
    if (sceneHost) placeholder.replaceWith(sceneHost);
    else {
        sceneHost = placeholder;
        scenePlayer = createScenePlayer(sceneHost, syncAnimationButton);
    }
    scenePlayer.update(l, index);
    syncAnimationButton();
    reader = mountReader($(".explanation-reading"), readingPage);
    document.title = `${l.title} · RideLab`;
}

function viewHeader(eyebrow, title, text) {
    return `<header class="view-header"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${text}</p></header>`;
}
function renderArchitecture() {
    $("#main").innerHTML =
        `<div class="view-entry">${viewHeader("NHÌN TOÀN CẢNH", "Một hệ thống. Nhiều ranh giới.", "Chọn một thành phần trên bản đồ để xem trách nhiệm và bài học liên quan. Đường liền là HTTP, đường đứt là messaging; mỗi database thuộc về một service.")}<div class="diagram-card architecture-stage">${diagram()}<p class="architecture-caption">Bản đồ tập trung vào hành trình đặt xe. Matching có matching_db riêng; Notification có notification_db; Identity có identity_db. Sơ đồ lược bớt các cạnh phản hồi và một số đường HTTP để giữ dễ đọc.</p></div><div class="architecture-grid">${[
            [
                "trip",
                "Trip · điều phối vòng đời",
                "Sở hữu chuyến, fare snapshot, assignment reference và persisted Saga. Mọi nghĩa vụ gửi ra ngoài đi qua Outbox.",
                "trip-lifecycle",
            ],
            [
                "car",
                "Driver · cấp reservation",
                "Row lock, version guard và exact-token fencing giữ một tài xế không được nhận hai chuyến cùng lúc.",
                "driver-race",
            ],
            [
                "matching",
                "Matching · tìm ứng viên",
                "Redis GEO giúp discovery. Round, snapshot và attempt ledger được lưu trong matching_db để phục hồi.",
                "matching",
            ],
            [
                "card",
                "Payment · authority của effect",
                "Provider mô phỏng có ledger bền vững. operationKey bảo vệ authorize, capture và void khỏi effect trùng.",
                "unknown",
            ],
            [
                "broker",
                "RabbitMQ · chuyển ý định",
                "Topic exchanges, quorum queues, publisher confirms, manual ACK và đường dead-letter có giới hạn.",
                "delivery",
            ],
            [
                "bell",
                "Notification · bản chiếu inbox",
                "Inbox theo recipient, có dedup và ownership. Outage thông báo không làm thay đổi truth của chuyến.",
                "notification",
            ],
        ]
            .map(
                ([i, t, d, id]) =>
                    `<article class="service-card">${icon(i)}<h3>${t}</h3><p>${d}</p><button data-lesson="${id}">Khám phá trong bài học</button></article>`,
            )
            .join("")}</div></div>`;
    document.title = "Bản đồ hệ thống · RideLab";
}

function renderPractice() {
    const index = Math.min(current.index, lessons.length);
    const answered = Object.keys(progress.answers).length;
    const correct = lessons.filter(
        (l) => progress.answers[l.id] === l.quiz.answer,
    ).length;
    if (index === lessons.length) {
        $("#main").innerHTML =
            `${viewHeader("TỰ KIỂM TRA", "Đã đi hết bộ câu hỏi", "Kết quả dựa trên câu trả lời đầu tiên cho mỗi câu. Bạn có thể quay lại học và làm lại toàn bộ.")}<section class="wide-panel quiz-finish">${icon("circleCheck")}<h2>${correct} / ${lessons.length} câu đúng</h2><p>Đã trả lời ${answered} / ${lessons.length} câu. ${answered < lessons.length ? "Bạn còn câu chưa trả lời; chọn Luyện tập để quay lại." : "Đọc giải thích cho câu sai để tìm ranh giới còn chưa rõ."}</p><button id="quiz-restart" class="action-button primary">Làm lại bộ câu hỏi</button></section>`;
        return;
    }
    const l = lessons[index],
        q = l.quiz;
    const answer = progress.answers[l.id];
    const hasAnswer = Number.isInteger(answer);
    $("#main").innerHTML =
        `<div class="view-entry">${viewHeader("HIỂU CƠ CHẾ, KHÔNG CHỈ NHỚ TÊN", "Thử đặt mình vào điểm xảy ra lỗi.", "Mỗi câu hỏi gắn với một tình huống trong repo. Chọn câu trả lời rồi đọc lý do trước khi đi tiếp.")}<div class="practice-layout"><section class="wide-panel"><span class="quiz-count">CÂU ${index + 1} / ${lessons.length} · ${l.title}</span><h2 class="quiz-question">${q.question}</h2><div class="quiz-options">${q.options.map((o, i) => `<button class="quiz-option ${hasAnswer && i === q.answer ? "selected" : hasAnswer && i === answer ? "wrong" : ""}" data-answer="${i}" ${hasAnswer ? "disabled" : ""}><span class="option-letter">${String.fromCharCode(65 + i)}</span><span>${o}</span>${hasAnswer && i === q.answer ? icon("check") : ""}</button>`).join("")}</div>${hasAnswer ? `<div class="quiz-feedback ${answer !== q.answer ? "wrong" : ""}" role="status"><strong>${answer === q.answer ? "Chính xác." : "Chưa đúng. Hãy nhìn lại authority."}</strong> ${q.explanation}</div>` : ""}<div class="quiz-footer"><button data-lesson="${l.id}" class="text-button">Đọc lại bài liên quan</button><button id="quiz-next" class="action-button primary" ${!hasAnswer ? "disabled" : ""}>${index === lessons.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}</button></div></section><aside class="wide-panel practice-aside"><h3>Không đoán kết quả.</h3><p>Hãy hỏi: ai có quyền quyết định, effect đã commit chưa, và có identity nào để hỏi lại?</p><div class="quiz-dots">${lessons.map((item, i) => `<button data-question="${i}" class="${i === index ? "current" : ""} ${Number.isInteger(progress.answers[item.id]) ? "solved" : ""}" aria-label="Câu ${i + 1}: ${item.title}">${i + 1}</button>`).join("")}</div><p style="margin-top:20px">${answered} câu đã trả lời · ${correct} câu đúng</p></aside></div></div>`;
    document.title = "Luyện tập · RideLab";
}
function renderSummary() {
    $("#main").innerHTML =
        `<div class="view-entry"><div class="summary-heading">${viewHeader("MANG THEO KHI ĐỌC CODE", "Những điều cốt lõi.", "Một tờ ghi nhớ về các cơ chế của repo. Mở bài học hoặc mã nguồn khi cần kiểm tra một kết luận.")}<button id="print-summary" class="action-button">${icon("print")}In / lưu PDF</button></div><div class="summary-grid">${lessons.map((l, i) => `<article class="summary-card"><span class="eyebrow">${String(i + 1).padStart(2, "0")} / ${groups[l.group].title}</span><h2 style="font-size:17px">${l.title}</h2><p style="margin-top:12px">${l.steps[l.steps.length - 1].insight}</p><pre>${escape(l.steps[l.steps.length - 1].code)}</pre><button data-lesson="${l.id}">Mở bài học</button><span aria-hidden="true"> · </span><button data-source="${l.refs[0]}">Đối chiếu code</button></article>`).join("")}</div></div>`;
    document.title = "Tóm tắt cơ chế · RideLab";
}

function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    const view = ["learn", "practice", "architecture", "summary"].includes(
        parts[0],
    )
        ? parts[0]
        : "learn";
    const l =
        view === "learn"
            ? lessons.find((item) => item.id === parts[1]) || lessons[0]
            : current.lesson;
    const parsed = Number(view === "learn" ? parts[2] : parts[1]);
    const index = Math.max(
        0,
        Math.min(
            (Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1) -
                1,
            view === "learn" ? l.steps.length - 1 : lessons.length,
        ),
    );
    current = { view, lesson: l, index };
    document.body.dataset.view = view;
    if (view !== "learn") {
        reader?.destroy();
        reader = null;
    }
    if (view !== "learn" && scenePlayer) {
        scenePlayer.destroy();
        scenePlayer = null;
        sceneHost = null;
    }
    if (view === "learn") lastLearnIndex = index;
    document.querySelectorAll("[data-view]").forEach((button) => {
        button.classList.toggle("active", button.dataset.view === view);
        if (button.dataset.view === view)
            button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
    });
    renderSidebar();
    ({
        learn: renderLearn,
        architecture: renderArchitecture,
        practice: renderPractice,
        summary: renderSummary,
    })[view]();
    $("#announcer").textContent =
        view === "learn"
            ? `Bước ${index + 1}: ${beginnerFor(l, index).title}`
            : {
                  practice: "Luyện tập",
                  architecture: "Bản đồ hệ thống",
                  summary: "Tóm tắt",
              }[view];
    hydrateIcons();
}
function navigateStep(index) {
    const clamped = Math.max(
        0,
        Math.min(index, current.lesson.steps.length - 1),
    );
    location.hash = href(current.lesson, clamped);
}
function syncAnimationButton() {
    const button = $("#animation-toggle");
    if (!button) return;
    const playing = sceneHost?.dataset.playing === "true";
    const label = playing ? "Tạm dừng" : "Phát";
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", `${label} animation`);
    button.innerHTML = `${icon(playing ? "pause" : "play")}${label}`;
    hydrateIcons();
}
function toggleAnimation() {
    if (reducedMotion.matches) {
        toast("Animation đang tắt theo cài đặt giảm chuyển động của bạn.");
        return;
    }
    scenePlayer?.toggle();
}
function nextStep() {
    const l = current.lesson;
    if (current.index < l.steps.length - 1) navigateStep(current.index + 1);
    else if (!progress.completed.includes(l.id)) {
        progress.completed.push(l.id);
        persist();
        route();
        toast(
            "Đã ghi nhận hoàn thành bài. Thử Luyện tập để kiểm tra cách hiểu.",
        );
    } else {
        const next = lessons[lessons.indexOf(l) + 1];
        location.hash = next ? href(next) : "#/practice/1";
    }
}

const normalized = (s) =>
    s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");
const lessonSearchIndex = new Map(
    lessons.map((lesson) => [
        lesson.id,
        normalized(
            [
                lesson.title,
                lesson.subtitle,
                ...lesson.objectives,
                ...lesson.steps.flatMap((step, index) => {
                    const beginner = beginnerFor(lesson, index);
                    return [
                        step.title,
                        step.body,
                        step.insight,
                        step.code,
                        beginner.title,
                        beginner.foundation,
                        beginner.explain,
                        ...beginner.actions,
                        beginner.example,
                        beginner.why,
                        beginner.remember,
                        ...beginner.terms.flatMap((key) => vocabulary[key]),
                    ];
                }),
            ].join(" "),
        ),
    ]),
);
function renderSearch() {
    const query = normalized($("#search-input").value.trim());
    const results = lessons.filter((l) =>
        lessonSearchIndex.get(l.id).includes(query),
    );
    $("#search-results").innerHTML = results.length
        ? results
              .map(
                  (l) =>
                      `<a href="${href(l)}" class="search-result"><span>${l.title}</span><small>${groups[l.group].title} · ${l.steps.length} bước</small></a>`,
              )
              .join("")
        : '<p class="empty-state">Chưa tìm thấy bài phù hợp. Thử “Saga”, “timeout” hoặc “tài xế”.</p>';
}
function openSearch() {
    if (current.view === "learn") renderLearn();
    scenePlayer?.pause();
    if ($("#source-dialog").open) $("#source-dialog").close();
    $("#search-input").value = "";
    renderSearch();
    $("#search-dialog").showModal();
    $("#search-input").focus();
}
function openSourceDialog(title) {
    if (current.view === "learn") renderLearn();
    scenePlayer?.pause();
    $("#source-title").textContent = title;
    if (!$("#source-dialog").open) $("#source-dialog").showModal();
}
function sourceList(id) {
    sourceRequest++;
    const l = lessons.find((item) => item.id === id);
    openSourceDialog(l.title);
    $("#source-content").innerHTML =
        `<p class="step-body">Các file dùng để biên soạn bài này. Chọn một file để đọc trực tiếp từ checkout đang phục vụ web.</p><ul class="source-list">${l.refs.map((key) => `<li><button data-source="${key}">${icon("file")} ${sources[key]}</button></li>`).join("")}</ul><p class="dialog-foot">Nhãn giao thức trong bài là diễn giải để học; file dưới đây là mã nguồn thực tế.</p>`;
}
async function showSource(key) {
    if (!Object.hasOwn(sources, key)) return;
    const request = ++sourceRequest;
    const path = sources[key];
    const repositoryFileUrl = `${sourceRepository}/blob/main/${path}`;
    openSourceDialog(path.split("/").pop());
    $("#source-content").innerHTML =
        `<p class="source-path">${escape(path)}</p><p role="status">Đang đọc file từ repository…</p>`;
    try {
        const response = await fetch(`./sources/${path}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const content = await response.text();
        if (/^\s*<!doctype html/i.test(content))
            throw new Error("Server trả trang HTML thay vì file nguồn");
        if (request !== sourceRequest) return;
        $("#source-content").innerHTML =
            `<p class="source-path">${escape(path)}</p><pre tabindex="0">${escape(content)}</pre><a href="${escape(repositoryFileUrl)}" target="_blank" rel="noopener">Mở file gốc trong GitHub</a><p class="dialog-foot">Nội dung lấy trực tiếp từ repository nguồn; không phải log hoặc kết quả test.</p>`;
    } catch (error) {
        if (request !== sourceRequest) return;
        $("#source-content").innerHTML =
            `<p class="source-path">${escape(path)}</p><p class="source-error">Không đọc được mã nguồn (${escape(error.message)}). Hãy chạy server từ thư mục gốc repository, rồi mở /docs/learn/. Bài học vẫn dùng được khi host riêng thư mục này.</p><pre>python -m http.server 4173 --bind 127.0.0.1</pre>`;
    }
}
function showNode(id) {
    sourceRequest++;
    const node = point(id),
        l = lessons.find((item) => item.id === node.lesson);
    openSourceDialog(node.label);
    $("#source-content").innerHTML =
        `<p class="source-path">${node.sub}</p><h3>${l.title}</h3><p class="step-body" style="margin-top:12px">${l.subtitle}</p><ul class="source-list">${l.refs
            .slice(0, 3)
            .map(
                (key) =>
                    `<li><button data-source="${key}">${sources[key]}</button></li>`,
            )
            .join(
                "",
            )}</ul><button data-lesson="${l.id}" class="action-button primary">Học về ${node.label}</button>`;
}

document.addEventListener("click", (event) => {
    const target = event.target.closest("button,a,[data-node]");
    if (!target) return;
    if (target.dataset.view) {
        location.hash =
            target.dataset.view === "learn"
                ? href(current.lesson, lastLearnIndex)
                : `#/${target.dataset.view}/1`;
    } else if (target.dataset.step !== undefined) {
        navigateStep(Number(target.dataset.step));
    } else if (target.dataset.sourceList) sourceList(target.dataset.sourceList);
    else if (target.dataset.source) showSource(target.dataset.source);
    else if (target.dataset.node) showNode(target.dataset.node);
    else if (target.dataset.lesson) {
        document.querySelectorAll("dialog[open]").forEach((d) => d.close());
        location.hash = href(
            lessons.find((l) => l.id === target.dataset.lesson),
        );
    } else if (target.dataset.answer !== undefined) {
        const l = lessons[current.index];
        if (Number.isInteger(progress.answers[l.id])) return;
        progress.answers[l.id] = Number(target.dataset.answer);
        persist();
        renderPractice();
    } else if (target.dataset.question !== undefined)
        location.hash = `#/practice/${Number(target.dataset.question) + 1}`;
    else if (target.classList.contains("close-dialog"))
        target.closest("dialog").close();
    else if (target.id === "next") nextStep();
    else if (target.id === "previous") {
        navigateStep(current.index - 1);
    } else if (target.id === "replay") {
        scenePlayer?.restart();
        navigateStep(0);
        renderLearn();
    } else if (target.id === "animation-toggle") toggleAnimation();
    else if (target.id === "search-open") openSearch();
    else if (target.id === "theme-toggle") {
        progress.theme = progress.theme === "dark" ? "light" : "dark";
        setTheme();
        persist();
    } else if (target.id === "quiz-next")
        location.hash = `#/practice/${current.index + 2}`;
    else if (target.id === "quiz-restart") {
        progress.answers = {};
        persist();
        location.hash = "#/practice/1";
    } else if (target.id === "print-summary") window.print();
    else if (target.id === "reset-progress") {
        openSourceDialog("Đặt lại tiến độ?");
        $("#source-content").innerHTML =
            '<p class="step-body">Xóa trạng thái hoàn thành và câu trả lời đã lưu trên trình duyệt này. Giao diện sáng/tối được giữ nguyên.</p><button id="confirm-reset" class="action-button" style="margin-top:20px">Xóa tiến độ đã lưu</button>';
    } else if (target.id === "confirm-reset") {
        progress.completed = [];
        progress.answers = {};
        persist();
        $("#source-dialog").close();
        route();
        toast("Đã đặt lại tiến độ.");
    }
    if (target.closest("#search-results")) $("#search-dialog").close();
});
document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!$("#search-dialog").open) openSearch();
        return;
    }
    if (event.key === "Escape") {
        const dialog = document.querySelector("dialog[open]");
        if (dialog) {
            event.preventDefault();
            dialog.close();
            return;
        }
    }
    if (
        event.target.closest("[data-node]") &&
        ["Enter", " "].includes(event.key)
    ) {
        event.preventDefault();
        showNode(event.target.closest("[data-node]").dataset.node);
        return;
    }
    if (
        document.querySelector("dialog[open]") ||
        event.target.closest(
            "input,textarea,select,[contenteditable],.explanation-reading",
        ) ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        current.view !== "learn"
    )
        return;
    if (["ArrowRight", "ArrowLeft"].includes(event.key)) {
        event.preventDefault();

        navigateStep(current.index + (event.key === "ArrowRight" ? 1 : -1));
    } else if (event.key.toLowerCase() === "r") {
        scenePlayer?.restart();
        navigateStep(0);
    } else if (event.key === " " && !event.target.closest("button,a,summary")) {
        event.preventDefault();
        toggleAnimation();
    }
});
$("#search-input").addEventListener("input", renderSearch);
document
    .querySelectorAll("dialog")
    .forEach((dialog) =>
        dialog.addEventListener("close", () => scenePlayer?.resume()),
    );
document.querySelectorAll("dialog").forEach((dialog) =>
    dialog.addEventListener("click", (event) => {
        if (
            event.target === dialog &&
            (event.clientX < dialog.getBoundingClientRect().left ||
                event.clientX > dialog.getBoundingClientRect().right ||
                event.clientY < dialog.getBoundingClientRect().top ||
                event.clientY > dialog.getBoundingClientRect().bottom)
        )
            dialog.close();
    }),
);
window.addEventListener("hashchange", route);
window.addEventListener("pagehide", () => {
    scenePlayer?.pause();
});
reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
        if (current.view === "learn") renderLearn();
    }
    scenePlayer?.syncMotionPreference();
});
setTheme();
hydrateIcons();
route();
