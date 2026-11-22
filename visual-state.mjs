// Educational states, not backend telemetry. Outcomes are deliberately specific
// to the example shown, and UNKNOWN is never colored or worded as a failure.
const state = (before, working, after, tone = "success") => ({
    before,
    working,
    after,
    tone,
});
const models = {
    "ride-journey": [
        state("Chưa gửi yêu cầu", "Đã gửi yêu cầu đặt xe", "Gateway đã nhận"),
        state(
            "Chưa có chuyến mới",
            "Đang lưu hồ sơ chuyến",
            "Trip đã lưu CREATED",
        ),
        state(
            "Chuyến vừa được tạo",
            "Đã lưu ý định tìm xe",
            "Matching nhận việc tìm xe",
        ),
        state(
            "Chưa chọn ứng viên",
            "Đang lọc vị trí và trạng thái",
            "Đã lưu danh sách ứng viên",
        ),
        state(
            "Chưa giữ được tài xế",
            "Driver kiểm tra và giữ An",
            "Trip ghi DRIVER_RESERVED",
        ),
        state(
            "Tài xế chưa chấp nhận",
            "Tài xế đã nhận đúng chuyến",
            "Saga chờ cho phép thanh toán",
        ),
        state(
            "Đang chờ cho phép thu",
            "Payment kiểm tra cùng mã",
            "Trip sẵn sàng khởi hành",
        ),
        state(
            "Sẵn sàng khởi hành",
            "Đang chạy, chờ hoàn tất",
            "Chuyến xong; Saga theo dõi thu",
            "neutral",
        ),
    ],
    authority: [
        state(
            "Các bộ phận sở hữu sổ riêng",
            "Trao đổi qua cửa quy định",
            "Không ghi chéo kho dữ liệu",
            "neutral",
        ),
        state(
            "Trip cần đổi chuyến",
            "Ghi vào trip_db",
            "Chỉ vòng đời chuyến thay đổi",
        ),
        state(
            "Chưa có quyền giữ xe",
            "Driver kiểm tra tại kho riêng",
            "Driver mới cấp reservation",
        ),
        state(
            "Bản tra cứu có thể cũ",
            "Đọc bản sao để tìm ứng viên",
            "Quyết định vẫn thuộc authority",
            "neutral",
        ),
    ],
    "trip-lifecycle": [
        state(
            "CREATED: chưa có tài xế",
            "Đã mở lượt tìm đầu tiên",
            "MATCHING: bắt đầu tìm xe",
        ),
        state(
            "Đang tìm tài xế",
            "Đã giữ đúng tài xế",
            "Đúng người đã chấp nhận",
        ),
        state(
            "Chưa được khởi hành",
            "Được phép thu; bắt đầu chuyến",
            "Hoàn tất theo đúng trình tự",
        ),
        state(
            "Nhánh hủy / tìm xe thất bại",
            "Tin cũ tới muộn",
            "Giữ terminal; chỉ dọn tác động",
            "neutral",
        ),
    ],
    idempotency: [
        state(
            "Client chưa biết kết quả",
            "Gửi lại bằng cùng mã K",
            "Tìm lại lần đặt trước",
        ),
        state(
            "K và nội dung đã tồn tại",
            "Đọc đúng hồ sơ đã lưu",
            "Trả lại cùng TripId",
        ),
        state(
            "K đã gắn với nội dung P",
            "Nhận K nhưng nội dung Q",
            "Xung đột; không ghi đè",
            "conflict",
        ),
        state(
            "Hai yêu cầu cùng qua kiểm tra",
            "Ràng buộc phân xử lúc ghi",
            "Một kết quả chuẩn được giữ",
        ),
    ],
    matching: [
        state(
            "Thông điệp chưa được lưu",
            "Lưu lượt tìm vào matching_db",
            "Lưu xong mới ACK",
        ),
        state(
            "Có nhiều xe trong vùng",
            "Loại vị trí cũ và xe bận",
            "Còn ứng viên hợp lệ",
        ),
        state(
            "Thứ tự chưa được cố định",
            "Lưu danh sách và mã lần thử",
            "Snapshot và attempt bền vững",
        ),
        state(
            "Lần giữ trước chưa rõ",
            "Hỏi lại đúng reservation",
            "UNKNOWN: chưa thử người tiếp",
            "uncertain",
        ),
        state(
            "Có tin vị trí đến muộn",
            "So phiên bản và phiên hoạt động",
            "Tin cũ không ghi đè tin mới",
        ),
    ],
    "driver-race": [
        state(
            "A và B cùng thấy xe rảnh",
            "Hai yêu cầu tới Driver",
            "Chưa có người thắng",
            "neutral",
        ),
        state(
            "Chưa khóa hàng tài xế",
            "A giữ khóa; B phải đợi",
            "Chờ giao dịch A chốt",
            "neutral",
        ),
        state(
            "AVAILABLE / phiên bản N",
            "A đã giữ; B đọc lại hàng",
            "A giữ R-A; B xung đột",
        ),
        state(
            "Đang có lần giữ R-new",
            "Lệnh cũ mang R-old tới",
            "Từ chối lệnh cũ; giữ R-new",
            "conflict",
        ),
    ],
    outbox: [
        state(
            "Chưa lưu thay đổi",
            "State đã chốt; chưa gửi tin",
            "Crash: ý định gửi bị mất",
            "conflict",
        ),
        state(
            "Chưa chốt cả hai phần",
            "State và ý định cùng chốt",
            "Khởi động lại vẫn nhớ việc",
        ),
        state(
            "Outbox còn PENDING",
            "Relay gửi và chờ xác nhận",
            "Broker confirm rồi PUBLISHED",
        ),
        state(
            "Broker đã nhận m1",
            "Chưa lưu PUBLISHED thì crash",
            "m1 có thể được giao lại",
            "neutral",
        ),
    ],
    delivery: [
        state(
            "Message chưa được áp dụng",
            "Commit effect cùng receipt",
            "ACK sau khi lưu thành công",
        ),
        state(
            "Receipt m1 đã tồn tại",
            "m1 được giao lại và đối chiếu",
            "Không tạo effect thứ hai",
        ),
        state(
            "Tác động trước chưa rõ",
            "Hỏi authority bằng mã cũ",
            "Reconcile; không retry mù",
            "uncertain",
        ),
        state(
            "Lỗi đang được xử lý",
            "Thử trong giới hạn cho phép",
            "Hết ngân sách: vào queue.dead",
            "conflict",
        ),
    ],
    saga: [
        state(
            "Chưa có Saga cho lần nhận",
            "Driver chấp nhận đúng chuyến",
            "Saga và authorize intent đã lưu",
        ),
        state(
            "Đang chờ authorize",
            "Nhận kết quả đúng operationKey",
            "AUTHORIZED: đã được cho phép",
        ),
        state(
            "Trip đã COMPLETED",
            "Capture vẫn cần được theo dõi",
            "Chuyến không bị lùi trạng thái",
            "neutral",
        ),
        state(
            "Chuyến không tiếp tục",
            "Release và void đúng danh tính",
            "Nghĩa vụ bù trừ được lưu",
            "neutral",
        ),
        state(
            "Vẫn chưa đủ bằng chứng",
            "Hỏi lại có giới hạn",
            "REQUIRES_REVIEW, không đoán",
            "uncertain",
        ),
    ],
    unknown: [
        state(
            "Chưa có thao tác tiền",
            "Gửi cùng operationKey K",
            "Một key cho một ý định",
        ),
        state(
            "Chưa biết effect xảy ra chưa",
            "Provider đã chốt; phản hồi mất",
            "UNKNOWN: caller chưa biết",
            "uncertain",
        ),
        state(
            "K đang chưa rõ kết quả",
            "Tra provider ledger theo K",
            "Tìm thấy effect đã có",
        ),
        state(
            "Chưa thể kết luận",
            "Phục hồi trong ngân sách",
            "Có bằng chứng hoặc cần review",
            "uncertain",
        ),
    ],
    cancellation: [
        state(
            "Chuyến có thể được hủy",
            "Lưu hủy và nghĩa vụ cleanup",
            "Trip giữ CANCELLED",
        ),
        state(
            "Chưa thấy RideRequested",
            "Cancel đến trước, lưu dấu hủy",
            "Request muộn không mở attempt",
        ),
        state(
            "Đã hủy nhưng attempt chưa rõ",
            "Hỏi lại effect đã phát đi",
            "Không thử mới; dọn effect cũ",
            "uncertain",
        ),
        state(
            "Trip đã CANCELLED",
            "Authorize thành công đến muộn",
            "Void phù hợp; không hồi sinh",
        ),
    ],
    security: [
        state(
            "Chưa có giấy đăng nhập",
            "Identity kiểm tra tài khoản",
            "Cấp JWT có chữ ký",
        ),
        state(
            "Có danh tính client tự khai",
            "Bỏ header, kiểm tra JWT",
            "Chỉ tin principal đã xác thực",
        ),
        state(
            "Chưa biết đúng tài xế không",
            "Tra tài khoản và phân công",
            "Đúng người mới được thao tác",
        ),
        state(
            "Client ở phía công khai",
            "Kiểm ranh giới và service grant",
            "Không đi tắt vào Payment",
            "neutral",
        ),
    ],
    notification: [
        state(
            "Chưa có thông báo mới",
            "Owner chọn đúng tài khoản nhận",
            "Ý định gửi có recipient",
        ),
        state(
            "Chưa lưu inbox entry",
            "Lưu delivery cùng nội dung",
            "Một entry cho cùng business key",
        ),
        state(
            "Worker thông báo đang dừng",
            "Trip vẫn tiến triển độc lập",
            "Tin phục hồi khi worker trở lại",
            "neutral",
        ),
        state(
            "Chưa xác định chủ tin",
            "Lấy tài khoản từ JWT đã kiểm",
            "Chỉ đọc hộp của chính mình",
        ),
    ],
    observability: [
        state(
            "Các đoạn ghi còn tách rời",
            "Truyền trace context theo request",
            "Ghép được cùng workflow",
        ),
        state(
            "Chưa biết chỗ cần điều tra",
            "Xem trace và các số đo",
            "Quan sát rồi hỏi authority",
            "neutral",
        ),
        state(
            "Chưa có bằng chứng cho race",
            "Tạo lỗi và đọc dữ liệu thật",
            "Đối chiếu invariant đã chốt",
        ),
        state(
            "Kết quả cần gắn phiên bản",
            "Đọc SHA và cách tái hiện",
            "Kết luận đúng phạm vi evidence",
            "neutral",
        ),
    ],
};

const focus = {
    journey: [
        ["journey-rider", "journey-trip"],
        ["journey-trip", "journey-broker"],
        ["journey-driver", "journey-payment"],
    ],
    city: [["phone", "passenger"], ["request-packet", "request"], ["request"]],
    transaction: [["tx-boundary"], ["relay"], ["broker", "commit"]],
    matching: [
        ["map", "driver-a", "driver-b", "driver-c"],
        ["snapshot"],
        ["driver-a", "snapshot"],
    ],
    race: [["trip-a", "trip-b"], ["row-lock"], ["row-lock"]],
    queue: [["queue"], ["consumer"], ["receipt-db"]],
    lifecycle: [["road"], ["ride-car"], ["road", "terminal"]],
    authority: [
        ["island-0", "island-1", "island-2"],
        ["store-0", "store-1", "store-2"],
        ["store-0", "store-1", "store-2"],
    ],
    idempotency: [["request-one", "request-two"], ["merge"], ["canonical"]],
    saga: [["saga-track"], ["saga-progress"], ["obligation"]],
    payment: [
        ["caller"],
        ["provider", "provider-before", "provider-after"],
        ["caller", "ledger-proof"],
    ],
    cancellation: [["lanes"], ["tombstone"], ["terminal-wall"]],
    security: [["caller", "token"], ["gate"], ["trusted"]],
    notification: [
        ["trip-truth"],
        ["notification", "mailbox"],
        ["recipient", "mailbox"],
    ],
    trace: [["waterfall"], ["waterfall"], ["proof"]],
};

export const visualTiming = Object.freeze({
    arrival: 2200,
    outcome: 7000,
    duration: 7200,
    hold: 1200,
});
export function visualStateFor(lessonId, index, kind) {
    const model = models[lessonId]?.[index];
    if (!model) throw new Error(`Missing visual state ${lessonId}/${index}`);
    const journeyFocus = [
        [["journey-rider"], ["journey-rider"], ["journey-trip"]],
        [["journey-rider"], ["journey-trip"], ["journey-trip"]],
        [
            ["journey-trip"],
            ["journey-broker"],
            ["journey-broker", "journey-driver"],
        ],
        [["journey-broker"], ["journey-driver"], ["journey-driver"]],
        [["journey-driver"], ["journey-driver"], ["journey-trip"]],
        [
            ["journey-driver"],
            ["journey-trip"],
            ["journey-trip", "journey-payment"],
        ],
        [["journey-payment"], ["journey-payment"], ["journey-trip"]],
        [["journey-driver"], ["journey-trip"], ["journey-payment"]],
    ];
    return {
        ...model,
        kind,
        lessonId,
        index,
        focus: kind === "journey" ? journeyFocus[index] : focus[kind] || [],
    };
}
export function visualStateAt(model, time) {
    const stage =
        time >= visualTiming.outcome ? 2 : time >= visualTiming.arrival ? 1 : 0;
    return {
        stage,
        value:
            stage === 0
                ? model.before
                : stage === 1
                  ? model.working
                  : model.after,
        tone: stage === 2 ? model.tone : "pending",
        resolved: stage === 2,
    };
}
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
export function ribbonMarkup() {
    return `<g class="state-ribbon" aria-label="Trạng thái trước, đang xử lý và kết quả">${["TRƯỚC KHI XỬ LÝ", "ĐANG XỬ LÝ", "KẾT QUẢ"].map((label, i) => `<g data-state-cell="${i}" transform="translate(${55 + i * 220} 4)"><rect width="210" height="56" rx="9"/><text x="12" y="16" class="state-ribbon-label">${label}</text><text x="12" y="34" class="state-ribbon-value" data-state-value="${i}"></text></g>`).join("")}</g>`;
}
function setLines(el, value) {
    const words = value.split(" "),
        lines = [""];
    for (const word of words) {
        const i = lines.length - 1;
        if (lines[i] && lines[i].length + word.length > 27) lines.push(word);
        else lines[i] += (lines[i] ? " " : "") + word;
    }
    el.innerHTML = lines
        .map(
            (line, i) =>
                `<tspan x="12" dy="${i ? 15 : 0}">${escape(line)}</tspan>`,
        )
        .join("");
}
export function paintVisualState(svg, model, time, phase) {
    const state = visualStateAt(model, time);
    svg.dataset.stateStage = String(state.stage);
    svg.dataset.stateTone = state.tone;
    const texts = [
        model.before,
        state.stage === 0 ? "Chưa có tác động mới" : model.working,
        state.resolved ? model.after : "Chưa kết luận",
    ];
    texts.forEach((value, i) =>
        setLines(svg.querySelector(`[data-state-value="${i}"]`), value),
    );
    svg.querySelectorAll("[data-state-cell]").forEach((el, i) => {
        el.dataset.active = String(i === state.stage);
        el.dataset.tone =
            i === 2 && state.resolved
                ? model.tone
                : i === state.stage
                  ? "pending"
                  : "neutral";
    });
    const highlighted = new Set(model.focus[phase] || []);
    svg.querySelectorAll(".scene-object[data-key]").forEach((el) => {
        el.dataset.actorState = highlighted.has(el.dataset.key)
            ? state.resolved
                ? model.tone
                : "active"
            : "idle";
    });
    function liveBadge(selector, value) {
        const badge = svg.querySelector(selector);
        if (!badge) return;
        const text = badge.querySelector("text"),
            rect = badge.querySelector("rect");
        if (text) {
            text.textContent = value;
            if (rect)
                rect.setAttribute(
                    "width",
                    String(text.getComputedTextLength() + 24),
                );
        }
    }
    if (model.kind === "transaction") {
        const i = model.lessonId === "outbox" ? model.index : 1;
        const values =
            i === 0
                ? ["CHƯA CHỐT", "STATE ĐÃ CHỐT", "Ý ĐỊNH GỬI ĐÃ MẤT"]
                : i === 1
                  ? ["CHƯA CHỐT", "ĐÃ CHỐT CẢ HAI", "Ý ĐỊNH CÒN BỀN VỮNG"]
                  : i === 2
                    ? ["PENDING", "ĐÃ GỬI, CHỜ CONFIRM", "PUBLISHED"]
                    : [
                          "BROKER ĐÃ NHẬN m1",
                          "CHƯA LƯU DẤU ĐÃ GỬI",
                          "CÓ THỂ PHÁT LẠI",
                      ];
        liveBadge('[data-key="tx-boundary"] .scene-badge', values[state.stage]);
    }
    if (model.kind === "queue") {
        const i = model.index;
        const values =
            i === 1
                ? ["ĐÃ CÓ RECEIPT", "ĐỐI CHIẾU m1", "KHÔNG THÊM EFFECT"]
                : i === 2
                  ? [
                        "EFFECT CHƯA RÕ",
                        "HỎI THEO MÃ CŨ",
                        "RECONCILE, KHÔNG ĐOÁN",
                    ]
                  : i === 3
                    ? [
                          "ĐANG XỬ LÝ LỖI",
                          "GỬI SANG ĐƯỜNG LỖI",
                          "ĐÃ VÀO DEAD-LETTER",
                      ]
                    : ["CHƯA XỬ LÝ", "ĐÃ LƯU EFFECT + RECEIPT", "ĐÃ GỬI ACK"];
        liveBadge('[data-key="consumer"] .scene-badge', values[state.stage]);
    }
    if (model.kind === "saga") {
        const dots = Array.from(
            svg.querySelectorAll('[data-key="saga-track"] .scene-state-dot'),
        );
        const complete =
            model.index === 0
                ? state.stage
                    ? 0
                    : -1
                : model.index === 1
                  ? state.stage
                      ? 1
                      : 0
                  : model.index === 2
                    ? 1
                    : model.index === 3
                      ? 0
                      : 0;
        dots.forEach((dot, i) =>
            dot.parentElement.classList.toggle("scene-good", i <= complete),
        );
    }
    if (model.kind === "lifecycle") {
        const done = [
            [0, 1, 1],
            [1, 2, 3],
            [3, 4, 6],
            [-1, -1, -1],
        ][model.index][state.stage];
        svg.querySelectorAll("[data-road-state]").forEach((el) =>
            el.classList.toggle(
                "scene-good",
                Number(el.dataset.roadState) <= done,
            ),
        );
    }
    return state;
}

// Preserve the actual actor elements. Replacing complete scenes obscures what
// changed; keyed children instead move from their previously visible position.
export function reconcileActors(svg, next) {
    const existing = new Map(
        Array.from(svg.querySelectorAll("[data-key]"), (el) => [
            el.dataset.key,
            el,
        ]),
    );
    const positions = new Map(
        Array.from(existing, ([key, el]) => [
            key,
            { transform: getComputedStyle(el).transform, opacity: getComputedStyle(el).opacity },
        ]),
    );
    const retained = [];
    for (const candidate of Array.from(
        next.querySelectorAll("[data-key]"),
    ).reverse()) {
        const old = existing.get(candidate.dataset.key);
        if (!old || old.tagName !== candidate.tagName) continue;
        const { transform: before, opacity } = positions.get(candidate.dataset.key);
        for (const attr of Array.from(old.attributes))
            old.removeAttribute(attr.name);
        for (const attr of Array.from(candidate.attributes))
            old.setAttribute(attr.name, attr.value);
        old.replaceChildren(...Array.from(candidate.childNodes));
        candidate.replaceWith(old);
        retained.push({ el: old, before, opacity });
    }
    svg.replaceChildren(...Array.from(next.childNodes));
    for (const attr of Array.from(next.attributes))
        svg.setAttribute(attr.name, attr.value);
    return retained;
}
