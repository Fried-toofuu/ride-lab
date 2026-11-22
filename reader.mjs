import { beginnerFor, vocabulary } from "./beginner.mjs";

const esc = (value) =>
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
const fragment = (label, html) =>
    `<section class="reading-fragment" data-reading-label="${esc(label)}">${html}</section>`;

export function readerMarkup(lesson, index) {
    const content = beginnerFor(lesson, index),
        technical = lesson.steps[index];
    const blocks = [
        fragment(
            "Bắt đầu",
            `<div class="beginner-foundation"><span class="eyebrow">BỐI CẢNH CẦN BIẾT</span><p>${esc(content.foundation)}</p></div>`,
        ),
        fragment(
            "Chuyện đang xảy ra",
            `<h3>Chuyện đang xảy ra</h3><p class="beginner-lead">${esc(content.explain)}</p>`,
        ),
        ...content.actions.map((action, i) =>
            fragment(
                `Diễn biến ${i + 1}`,
                `<div class="reading-action"><span>${i + 1}</span><div>${i === 0 ? "<h3>Diễn ra từng việc như thế nào?</h3>" : ""}<p>${esc(action)}</p></div></div>`,
            ),
        ),
        fragment(
            "Ví dụ",
            `<div class="beginner-example"><h3>Ví dụ để hình dung</h3><p>${esc(content.example)}</p><span class="beginner-example-label">Tình huống minh họa, không phải dữ liệu đang chạy</span></div>`,
        ),
        fragment(
            "Vì sao",
            `<h3>Vì sao cần làm như vậy?</h3><p>${esc(content.why)}</p>`,
        ),
        fragment(
            "Ghi nhớ",
            `<div class="insight-box"><div><span class="eyebrow">CHỈ CẦN NHỚ</span><p>${esc(content.remember)}</p></div></div>`,
        ),
        ...content.terms.map((key, i) =>
            fragment(
                `Từ mới ${i + 1}: ${vocabulary[key][0]}`,
                `<div class="beginner-vocabulary">${i === 0 ? "<h3>Từ mới trong bước này</h3>" : ""}<dl><div data-term="${key}"><dt>${esc(vocabulary[key][0])}</dt><dd>${esc(vocabulary[key][1])}</dd></div></dl></div>`,
            ),
        ),
        fragment(
            "Tên trong code",
            `<h3>Đối chiếu với mã nguồn</h3><p>${esc(technical.body)}</p>`,
        ),
        fragment(
            "Lưu ý kỹ thuật",
            `<h3>Lưu ý khi đọc code</h3><p>${esc(technical.insight)}</p>`,
        ),
        fragment(
            "Thao tác trong code",
            `<div class="code-state"><span class="eyebrow">TÊN THAO TÁC / TRẠNG THÁI</span><pre>${esc(technical.code)}</pre></div><button class="small-button" data-source-list="${lesson.id}">Đọc file nguồn của bài</button>`,
        ),
    ];
    return `<div class="explanation-reading" aria-label="Giải thích chi tiết"><h2 id="step-title">${esc(content.title)}</h2><div class="reading-pages">${blocks.join("")}</div><nav class="reading-navigation" aria-label="Các phần giải thích"><button type="button" data-reading-dir="-1" aria-label="Phần giải thích trước">‹</button><label><select class="reading-select" aria-label="Chọn phần giải thích"></select></label><button type="button" data-reading-dir="1" aria-label="Phần giải thích tiếp">›</button></nav></div>`;
}

export function mountReader(root, initialPage = 0) {
    const area = root.querySelector(".reading-pages"),
        select = root.querySelector(".reading-select");
    const fragments = Array.from(area.querySelectorAll(".reading-fragment"));
    let pages = [],
        active = initialPage,
        raf = 0;
    function show(index) {
        active = Math.max(0, Math.min(pages.length - 1, index));
        pages.forEach((page, i) => (page.hidden = i !== active));
        select.value = String(active);
        root.dataset.readingPage = String(active);
        root.dataset.readingPages = String(pages.length);
        root.querySelector('[data-reading-dir="-1"]').disabled = active === 0;
        root.querySelector('[data-reading-dir="1"]').disabled =
            active === pages.length - 1;
    }
    function layout() {
        const height = area.clientHeight;
        if (height < 100) return;
        area.replaceChildren();
        pages = [];
        const addPage = () => {
            const page = document.createElement("div");
            page.className = "reading-page";
            area.append(page);
            pages.push(page);
            return page;
        };
        let page = addPage();
        for (const frag of fragments) {
            page.append(frag);
            if (page.scrollHeight > height + 1 && page.children.length > 1) {
                frag.remove();
                page = addPage();
                page.append(frag);
            }
        }
        select.innerHTML = pages
            .map(
                (page, i) =>
                    `<option value="${i}">Phần ${i + 1}/${pages.length} · ${esc(page.firstElementChild.dataset.readingLabel)}</option>`,
            )
            .join("");
        show(active);
    }
    function resize() {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(layout);
    }
    function click(event) {
        const button = event.target.closest("[data-reading-dir]");
        if (button) show(active + Number(button.dataset.readingDir));
    }
    function change() {
        show(Number(select.value));
    }
    root.addEventListener("click", click);
    select.addEventListener("change", change);
    const observer = new ResizeObserver(resize);
    observer.observe(area);
    layout();
    return {
        get page() {
            return active;
        },
        layout,
        destroy() {
            observer.disconnect();
            cancelAnimationFrame(raf);
            root.removeEventListener("click", click);
            select.removeEventListener("change", change);
        },
    };
}
