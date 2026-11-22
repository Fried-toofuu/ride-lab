// Educational models of the repository's mechanisms; never live backend state.
import {
    visualStateFor,
    visualStateAt,
    visualTiming,
    ribbonMarkup,
    paintVisualState,
    reconcileActors,
} from "./visual-state.mjs";
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

const phaseSets = {
    "ride-journey": [
        [
            "Chọn điểm đón và điểm đến",
            "Gửi cùng danh tính yêu cầu",
            "Gateway nhận POST /trips",
        ],
        [
            "Tra khóa yêu cầu trước",
            "Lưu Trip và fare snapshot",
            "Commit một giao dịch cục bộ",
        ],
        [
            "Trip chuyển sang MATCHING",
            "Ghi ý định RideRequested",
            "Relay chuyển ý định sang broker",
        ],
        [
            "Tìm trong vùng lân cận",
            "Lọc và xếp hạng ứng viên",
            "Lưu snapshot trước khi reserve",
        ],
        [
            "Các yêu cầu cùng tranh một hàng",
            "Driver khóa và kiểm tra phiên bản",
            "Một reservation được commit",
        ],
        [
            "Tài xế chấp nhận assignment",
            "Trip tạo Saga và authorize intent",
            "Ủy quyền đang chờ kết quả",
        ],
        [
            "Payment nhận đúng operationKey",
            "Ghi nhận kết quả authorize",
            "Trip có thể READY_TO_START",
        ],
        [
            "Chuyến được bắt đầu",
            "Tài xế hoàn tất hành trình",
            "Saga tiếp tục nghĩa vụ capture",
        ],
    ],
    authority: [
        [
            "Mỗi miền có quyền ghi riêng",
            "Database không được dùng chung",
            "Không có commit xuyên các miền",
        ],
        [
            "Trip giữ vòng đời chuyến",
            "Lưu assignment reference",
            "Không được ghi driver_db",
        ],
        [
            "Yêu cầu đi tới Driver",
            "Guard chạy tại database sở hữu",
            "Driver quyết định reservation",
        ],
        [
            "Projection nhận sự kiện",
            "Dữ liệu đọc có thể tạm trễ",
            "Quyền cấp reservation vẫn ở Driver",
        ],
    ],
    "trip-lifecycle": [
        [
            "Yêu cầu được tạo",
            "Mở matching round",
            "Chưa có lời hứa giữ được tài xế",
        ],
        [
            "Driver xác lập reservation",
            "Trip ghi đúng assignment",
            "Tài xế chấp nhận riêng biệt",
        ],
        [
            "Chờ authorize hợp lệ",
            "READY_TO_START mới được start",
            "Chuyến tiến tới COMPLETED",
        ],
        [
            "Chuyến đã terminal",
            "Sự kiện muộn vẫn có thể đến",
            "Chỉ cleanup, không hồi sinh",
        ],
    ],
    idempotency: [
        [
            "Request đầu đã tới database",
            "Phản hồi có thể biến mất",
            "Client gửi lại cùng key",
        ],
        [
            "Tra scope và exact key",
            "So fingerprint với dữ liệu gốc",
            "Trả lại đúng chuyến đã tạo",
        ],
        [
            "Key cũ được dùng với payload khác",
            "Fingerprint không còn khớp",
            "Conflict; không ghi đè dữ liệu",
        ],
        [
            "Hai request cùng qua precheck",
            "Unique constraint phân xử lúc ghi",
            "Bên thua đọc lại kết quả chuẩn",
        ],
    ],
    matching: [
        [
            "Nhận RideRequestedV1",
            "Lưu round trước khi ACK",
            "Worker tìm lại việc từ database",
        ],
        [
            "Tìm tài xế gần điểm đón",
            "Loại location cũ và không AVAILABLE",
            "Chỉ còn ứng viên đủ điều kiện",
        ],
        [
            "Xếp khoảng cách và phá hòa",
            "Cố định snapshot của round",
            "Lưu attempt với identity ổn định",
        ],
        [
            "Worker giữ lease theo round",
            "Reserve hoặc reconcile attempt cũ",
            "UNKNOWN chặn ứng viên tiếp theo",
        ],
        [
            "Driver phát thay đổi",
            "Lua kiểm tra version và session",
            "Projection không lùi về sự kiện cũ",
        ],
    ],
    "driver-race": [
        [
            "Hai chuyến cùng thấy một ứng viên",
            "Hai yêu cầu reserve cùng đến",
            "Cache không thể phân xử người thắng",
        ],
        [
            "Yêu cầu A khóa hàng Driver",
            "B chờ, A kiểm tra trạng thái mới",
            "Quyết định nằm trong transaction",
        ],
        [
            "A commit reservation và Outbox",
            "B đọc trạng thái/phiên bản mới",
            "B conflict; chỉ một reservation",
        ],
        [
            "Cleanup cũ mang token cũ",
            "So với reservation hiện tại",
            "Không được giải phóng nhầm chuyến",
        ],
    ],
    outbox: [
        [
            "Ghi business state",
            "Process có thể chết ở khoảng hở",
            "Publish trực tiếp có thể bị mất",
        ],
        [
            "Business row và intent cùng transaction",
            "Hai phần cùng commit",
            "Ý định vẫn còn sau restart",
        ],
        [
            "Relay claim hàng PENDING",
            "Gửi tới broker và chờ confirm",
            "Chỉ sau confirm mới PUBLISHED",
        ],
        [
            "Broker đã nhận message",
            "Crash trước khi lưu PUBLISHED",
            "Cùng messageId có thể được gửi lại",
        ],
    ],
    delivery: [
        [
            "Broker giao message",
            "Consumer commit effect và receipt",
            "ACK chỉ theo sau commit",
        ],
        [
            "Message được giao lại",
            "Tra receipt đã commit",
            "Không lặp effect nghiệp vụ",
        ],
        [
            "Phân loại lỗi trước",
            "UNKNOWN phải hỏi lại authority",
            "Reconcile giữ cùng identity",
        ],
        [
            "Transient đi vào retry có hạn",
            "Hết ngân sách hoặc poison",
            "Chuyển sang đường dead-letter",
        ],
    ],
    saga: [
        [
            "DriverAccepted mở workflow",
            "Lưu Saga cùng authorize intent",
            "AUTHORIZE_PENDING bền vững",
        ],
        [
            "Authorize dùng một key ổn định",
            "Nhận sự thật từ Payment",
            "AUTHORIZED; replay không đổi version",
        ],
        [
            "Trip đã COMPLETED",
            "Saga gửi capture cùng lineage",
            "Thu tiền tiếp tục theo hướng tiến",
        ],
        [
            "Hủy tạo nghĩa vụ bù trừ",
            "Release đúng reservation",
            "Void authorization khi phù hợp",
        ],
        [
            "Ngân sách phục hồi có giới hạn",
            "Authority vẫn chưa được giải quyết",
            "Giữ REQUIRES_REVIEW rõ ràng",
        ],
    ],
    unknown: [
        [
            "Một logical authorization",
            "Giữ nguyên operationKey",
            "Provider là mô phỏng có ledger",
        ],
        [
            "Provider effect đã commit",
            "Đường phản hồi bị mất",
            "Caller chỉ có thể ghi UNKNOWN",
        ],
        [
            "Không tạo operationKey mới",
            "Đọc lại đúng provider ledger",
            "Kết quả cũ giải quyết uncertainty",
        ],
        [
            "Nhận kết quả có thẩm quyền",
            "Hoặc chờ backoff có giới hạn",
            "Không tự đoán thành công/thất bại",
        ],
    ],
    cancellation: [
        [
            "Rider yêu cầu hủy",
            "Trip lưu terminal state",
            "Cleanup intent còn phải thực hiện",
        ],
        [
            "Cancel đi trước RideRequested",
            "Matching lưu tombstone",
            "Request muộn không mở attempt mới",
        ],
        [
            "Round ngừng tạo attempt",
            "Attempt UNKNOWN vẫn cần hỏi lại",
            "Effect tồn tại phải được release",
        ],
        [
            "Authorize thành công đến muộn",
            "Saga đi theo đường void",
            "Trip CANCELLED không hồi sinh",
        ],
    ],
    security: [
        [
            "User đăng nhập với Identity",
            "Identity cấp JWT có chữ ký",
            "Token mang danh tính và quyền",
        ],
        [
            "Request mang header tự khai",
            "Gateway loại header và kiểm JWT",
            "Chỉ validated principal được tin",
        ],
        [
            "Service xác thực token riêng",
            "Resolve user sang Driver profile",
            "Kiểm actor với assignment hiện tại",
        ],
        [
            "Client ở ranh giới public",
            "Matching và Payment nằm bên trong",
            "Service grant bảo vệ đường nội bộ",
        ],
    ],
    notification: [
        [
            "Owner xác định đúng recipient",
            "Ghi NotificationRequested intent",
            "Message chuyển sang inbox worker",
        ],
        [
            "Delivery và source ledger",
            "Ghi inbox theo business key",
            "Sau commit mới ACK",
        ],
        [
            "Inbox worker tạm ngừng",
            "Trip vẫn tiến triển độc lập",
            "Restart tiếp tục delivery bền vững",
        ],
        [
            "JWT sub xác định người đọc",
            "Chỉ truy vấn inbox của caller",
            "Notification người khác: not found",
        ],
    ],
    observability: [
        [
            "HTTP mang trace context",
            "Context được chuyển qua message",
            "Nối các span cùng workflow",
        ],
        [
            "Ghi nhận từng ranh giới",
            "Đọc trace và metric theo ngữ cảnh",
            "Quan sát không thay thế authority",
        ],
        [
            "Tạo tình huống race/fault thật",
            "Đọc các authority độc lập",
            "Đối chiếu invariant của hệ thống",
        ],
        [
            "Xác định revision được kiểm chứng",
            "Đọc evidence và cách tái hiện",
            "Kết luận đúng phạm vi đã chứng minh",
        ],
    ],
};

const kinds = {
    authority: "authority",
    "trip-lifecycle": "lifecycle",
    idempotency: "idempotency",
    matching: "matching",
    "driver-race": "race",
    outbox: "transaction",
    delivery: "queue",
    saga: "saga",
    unknown: "payment",
    cancellation: "cancellation",
    security: "security",
    notification: "notification",
    observability: "trace",
};
export function sceneFor(lesson, index) {
    if (!phaseSets[lesson.id]?.[index])
        throw new Error(`Missing scene: ${lesson.id}/${index}`);
    return {
        kind: lesson.id === "ride-journey" ? "journey" : kinds[lesson.id],
        index,
        lessonId: lesson.id,
        step: lesson.steps[index],
        phases: phaseSets[lesson.id][index],
        title: lesson.steps[index].title,
        visual: visualStateFor(
            lesson.id,
            index,
            lesson.id === "ride-journey" ? "journey" : kinds[lesson.id],
        ),
    };
}

const text = (x, y, label, cls = "") =>
    `<text x="${x}" y="${y}" class="${cls}">${esc(label)}</text>`;
const group = (key, x, y, body, cls = "", phase = null) =>
    `<g data-key="${key}" transform="translate(${x} ${y})" class="scene-object ${cls}"${phase === null ? "" : ` data-reveal="${phase}"`}>${body}</g>`;
const card = (key, x, y, w, h, title, body = "", cls = "", phase = null) =>
    group(
        key,
        x,
        y,
        `<rect width="${w}" height="${h}" rx="12" class="scene-card"/>${text(16, 29, title, "scene-heading")}${body}`,
        cls,
        phase,
    );
const badge = (x, y, label, cls = "") =>
    `<g transform="translate(${x} ${y})" class="scene-badge ${cls}"><rect width="${Math.max(72, label.length * 7.4 + 24)}" height="27" rx="13.5"/>${text(12, 18, label)}</g>`;
const line = (x1, y1, x2, y2, cls = "") =>
    `<path d="M${x1} ${y1}L${x2} ${y2}" class="scene-route ${cls}"/>`;
const moving = (key, path, label, phase = 0, cls = "") =>
    `<g data-key="${key}" data-travel="${path}" data-travel-phase="${phase}" class="scene-packet ${cls}" transform="translate(${path
        .split(/[MLC, ]+/)
        .filter(Boolean)
        .slice(-2)
        .join(
            " ",
        )})"><rect x="-30" y="-15" width="60" height="30" rx="8"/>${text(0, 5, label, "scene-center")}</g>`;
const lock = (x, y, cls = "") =>
    `<g transform="translate(${x} ${y})" class="scene-lock ${cls}"><path d="M6 14V8a9 9 0 0 1 18 0v6"/><rect x="0" y="14" width="30" height="25" rx="6"/><path d="M15 22v9"/></g>`;
const db = (key, x, y, label, lines, cls = "") =>
    group(
        key,
        x,
        y,
        `<path class="scene-db-body" d="M0 18v106c0 28 164 28 164 0V18"/><ellipse cx="82" cy="18" rx="82" ry="18" class="scene-db-top"/>${text(82, 61, label, "scene-center scene-heading")}${lines.map((l, i) => text(82, 86 + i * 22, l, "scene-center scene-small")).join("")}<path d="M0 112c0 26 164 26 164 0" class="scene-db-line"/>`,
        cls,
    );
const car = (key, x, y, cls = "", label = "") =>
    group(
        key,
        x,
        y,
        `<ellipse cx="0" cy="23" rx="35" ry="12" class="scene-shadow"/><g transform="rotate(-12)"><rect x="-29" y="-15" width="58" height="35" rx="11" class="scene-car-body"/><rect x="-16" y="-10" width="29" height="25" rx="5" class="scene-car-window"/><path d="M-7-10V15M-29-2H-22M-29 8H-22M22-4h5M22 10h5" class="scene-detail"/></g>${label ? text(0, 49, label, "scene-center scene-small") : ""}`,
        cls,
    );
const person = (key, x, y, label) =>
    group(
        key,
        x,
        y,
        `<ellipse cx="0" cy="42" rx="22" ry="7" class="scene-shadow"/><circle cy="-10" r="12" class="scene-person-head"/><path d="M-17 32V13a17 17 0 0 1 34 0v19Z" class="scene-person-body"/>${text(0, 65, label, "scene-center scene-small")}`,
    );
const row = (y, key, value, cls = "") =>
    `<g class="scene-row ${cls}" transform="translate(0 ${y})"><rect width="264" height="38" rx="6"/>${text(12, 24, key, "scene-small")}${text(252, 24, value, "scene-right scene-small")}</g>`;
const switchAt = (time, before, after) =>
    `<g data-before="${time}" class="scene-before">${before}</g><g data-after="${time}">${after}</g>`;
const sheet = (x, y, label, cls = "") =>
    `<g transform="translate(${x} ${y})" class="scene-sheet ${cls}"><rect width="104" height="66" rx="7"/><path d="M13 17h60M13 29h77M13 41h42"/>${text(12, 57, label, "scene-tiny")}</g>`;

function journey(s) {
    const visible = (key, first, markup) => markup.replace(
        `data-key="${key}"`,
        `data-key="${key}" data-journey-visible="${s.index >= first}"`,
    );
    const routes = [
        ["rider", 0, "M140 230C140 290 210 300 270 300"],
        ["broker", 2, "M380 235V175"],
        ["driver", 3, "M460 128H515"],
        ["return", 4, "M610 275C610 300 530 310 485 310"],
        ["payment", 5, "M485 370H515"],
    ].map(([key, first, path]) => visible(`journey-route-${key}`, first,
        `<g data-key="journey-route-${key}"><path class="scene-route" d="${path}"/></g>`)).join("");
    const requests = [
        ["M140 230C140 290 210 300 265 300", "đặt", 0],
        ["M180 230C180 290 250 300 290 300", "K", 0],
        ["M380 235L380 185", "m1", 1],
        ["M470 128L510 128", "tìm", 0],
        ["M470 128L510 128", "R-A", 0],
        ["M610 275C610 300 530 310 490 310", "nhận", 0],
        ["M485 370L510 370", "K", 0],
        ["M610 275C610 300 530 310 490 310", "start", 0],
    ];
    const response =
        s.index === 4
            ? moving(
                  "journey-fact",
                  "M610 275C610 300 530 310 490 310",
                  "giữ",
                  1,
                  "scene-response",
              )
            : s.index === 6
              ? moving(
                    "journey-fact",
                    "M515 395C490 395 470 390 455 390",
                    "OK",
                    1,
                    "scene-response",
                )
              : s.index === 7
                ? moving(
                      "journey-complete",
                      "M610 275C610 300 530 310 490 310",
                      "xong",
                      1,
                  )
                : "";
    return `${routes}
      ${card("journey-rider", 55, 85, 175, 145, "Hành khách", person("journey-person", 42, 70, "") + text(75, 68, "Mai", "scene-heading") + text(75, 92, "mã K", "scene-small") + text(16, 125, "Gateway · cổng vào", "scene-small"))}
      ${group("journey-trip", 275, 235, `<path class="scene-plinth" d="M-12 164 100 123 222 164 100 210Z"/><path class="scene-plinth-side" d="M-12 164v16l112 45 122-45v-16l-122 46Z"/><rect width="210" height="160" rx="14" class="scene-card"/>${text(16, 30, "Trip · hồ sơ chuyến", "scene-heading")}<path d="M16 45h178" class="scene-detail"/>${text(16, 73, "TRẠNG THÁI", "scene-tiny")}<text x="16" y="99" class="scene-live-value" data-journey-field="trip"></text>${text(16, 129, "trip_db · Saga · Outbox", "scene-small")}`)}
      ${visible("journey-broker", 2, card("journey-broker", 290, 85, 170, 90, "RabbitMQ", text(16, 59, "sổ việc → hàng chờ", "scene-small")))}
      ${visible("journey-driver", 3, card("journey-driver", 520, 95, 190, 180, "Matching / Driver", car("journey-car", 94, 75, "", "") + text(15, 121, "TÀI XẾ AN", "scene-tiny") + '<text x="15" y="147" class="scene-live-value" data-journey-field="driver"></text>'))}
      ${visible("journey-payment", 5, card("journey-payment", 520, 335, 190, 110, "Payment mô phỏng", '<text x="15" y="60" class="scene-live-value" data-journey-field="payment"></text>' + text(15, 88, "không gọi ngân hàng", "scene-tiny")))}
      ${moving("journey-request", ...requests[s.index])}${response}
      ${s.index === 5 ? moving("journey-authorize", "M420 235C420 195 495 195 545 230L600 325", "auth", 1) : ""}
      ${s.index === 7 ? moving("journey-capture", "M485 370L510 370", "thu", 2) : ""}`;
}

function paintJourney(svg, spec, time) {
    const i = spec.index,
        arrived = time >= visualTiming.arrival,
        returned = time >= visualTiming.outcome;
    let trip =
        i === 0
            ? "Chưa tạo hồ sơ"
            : i === 1
              ? arrived
                  ? "CREATED"
                  : "Chưa tạo hồ sơ"
              : i === 2
                ? arrived
                    ? "MATCHING"
                    : "CREATED"
                : i === 3
                  ? "MATCHING"
                  : i === 4
                    ? returned
                        ? "DRIVER_RESERVED"
                        : "MATCHING"
                    : i === 5
                      ? arrived
                          ? "DRIVER_ACCEPTED"
                          : "DRIVER_RESERVED"
                      : i === 6
                        ? returned
                            ? "READY_TO_START"
                            : "DRIVER_ACCEPTED"
                        : time >= 4600
                          ? "COMPLETED"
                          : arrived
                            ? "IN_PROGRESS"
                            : "READY_TO_START";
    const driver =
        i < 4
            ? "AVAILABLE"
            : i === 4
              ? arrived
                  ? "RESERVED · R-A"
                  : "AVAILABLE"
              : i < 7
                ? "RESERVED · R-A"
                : time >= 4600
                  ? "Chờ đồng bộ xong"
                  : arrived
                    ? "ON_TRIP"
                    : "RESERVED · R-A";
    const payment =
        i < 5
            ? "Chưa yêu cầu"
            : i === 5
              ? returned
                  ? "Chờ authorize"
                  : "Chưa yêu cầu"
              : i === 6
                ? arrived
                    ? "Đã cho phép thu"
                    : "Chờ authorize"
                : time >= 6800
                  ? "Chờ capture"
                  : "Đã cho phép thu";
    for (const [key, value] of Object.entries({ trip, driver, payment })) {
        const el = svg.querySelector(`[data-journey-field="${key}"]`);
        if (el && el.textContent !== value) el.textContent = value;
    }
}
function transaction(s) {
    const gap = s.lessonId === "outbox" && s.index === 0,
        replay = s.lessonId === "outbox" && s.index === 3;
    return `${group("tx-boundary", 65, 85, `<rect width="430" height="275" rx="18" class="scene-boundary"/>${text(22, 29, "POSTGRESQL · LOCAL TRANSACTION", "scene-small")}${sheet(32, 60, "business row", "scene-good")}${gap ? "" : sheet(214, 60, "outbox intent", "scene-purple") + line(142, 94, 211, 94)}${badge(30, 160, gap ? "BUSINESS COMMIT" : "CÙNG COMMIT", "scene-good")}${text(30, 220, gap ? "Không có intent bền vững" : "Business state + outgoing obligation", "scene-small")}${text(30, 244, gap ? "Publish có thể bị mất" : "Cả hai cùng tồn tại sau restart", "scene-small")}`)}${group("relay", 540, 103, `<rect width="175" height="116" rx="14" class="scene-machine"/>${text(88, 36, "OUTBOX RELAY", "scene-center scene-heading")}<path d="M30 58h115M30 76h115M30 94h70" class="scene-detail"/>`)}${line(496, 181, 537, 181)}${db("broker", 550, 285, "RabbitMQ", ["publisher confirm"])}${line(627, 222, 627, 279)}${moving("outbox-message", "M462 181L627 181L627 260", replay ? "m1 ×2" : "m1", 1)}${gap ? "" : moving("broker-confirm", "M627 285L627 235", "OK", 2, "scene-response")}${card("commit", 75, 385, 420, 64, gap ? "CRASH WINDOW" : replay ? "AT-LEAST-ONCE" : "PENDING → CONFIRM → PUBLISHED", "", gap ? "scene-danger" : "scene-good", 2)}${gap ? group("crash", 501, 242, `<path d="m0-27 9 18 20-2-12 17 11 16-22-3-11 18-1-22-19-10 20-7Z" class="scene-crash"/>${text(0, 51, "process chết", "scene-center scene-small")}`) : badge(540, 435, "messageId ổn định", "scene-purple")}`;
}
function matching(s) {
    const phase = s.lessonId === "ride-journey" ? 1 : s.index;
    return `${group("map", 55, 70, `<rect width="430" height="340" rx="18" class="scene-map"/><path d="M0 85h430M0 170h430M0 255h430M108 0v340M215 0v340M322 0v340" class="scene-grid"/><circle cx="215" cy="170" r="125" class="scene-radius"/><circle cx="215" cy="170" r="70" class="scene-radius"/><circle cx="215" cy="170" r="12" class="scene-pickup"/>${text(215, 202, "điểm đón", "scene-center scene-small")}<path d="M215 170 280 110M215 170 145 95M215 170 330 245" class="scene-candidate-lines"/>`)}${car("driver-a", 335, 180, "scene-good", "A · gần, còn mới")}${car("driver-b", 200, 165, phase >= 1 ? "scene-rejected" : "", "B · location cũ")}${car("driver-c", 385, 315, phase >= 1 ? "scene-rejected" : "", "C · không AVAILABLE")}${card("snapshot", 525, 95, 210, 285, phase >= 2 ? "SNAPSHOT BỀN VỮNG" : "CANDIDATE FILTER", text(16, 60, "01  AVAILABLE", "scene-small") + text(16, 91, "02  location fresh", "scene-small") + text(16, 122, "03  policy eligible", "scene-small") + text(16, 166, "A → attempt R", "scene-heading") + badge(14, 190, phase === 3 ? "UNKNOWN: chờ" : "stable identity", "scene-purple") + text(16, 251, "matching_db", "scene-small"), "scene-emphasis")}${line(487, 240, 522, 240)}${moving("candidate", "M400 240L508 240", "A", 1)}${text(65, 447, phase === 4 ? "Lua guard: version + session + sequence" : "Redis GEO đề xuất · Driver PostgreSQL mới cấp quyền", "scene-small")}`;
}
function race(s) {
    const index = s.lessonId === "ride-journey" ? 2 : s.index,
        release = index === 3;
    const reserveRow = (y, key, value, cls = "") =>
        !release && index >= 2
            ? switchAt(
                  2200,
                  row(
                      y,
                      key,
                      key === "status"
                          ? "AVAILABLE"
                          : key === "version"
                            ? "vN"
                            : "—",
                  ),
                  row(y, key, value, cls),
              )
            : row(y, key, value, cls);
    return `${card("trip-a", 48, 90, 190, 85, release ? "Cleanup cũ" : "Trip A", text(16, 59, release ? "reservation: R-old" : "reserve · vN", "scene-small"), "scene-peach")}${card("trip-b", 48, 290, 190, 85, release ? "Chuyến hiện tại" : "Trip B", text(16, 59, release ? "reservation: R-new" : "reserve · vN", "scene-small"), "scene-purple")}${group("row-lock", 335, 90, `<rect width="365" height="280" rx="16" class="scene-boundary"/>${text(22, 32, "DRIVER POSTGRESQL", "scene-heading")}${lock(295, 15)}<g transform="translate(24 65)">${row(0, "driver", "D")}${reserveRow(48, "status", index >= 2 ? "RESERVED" : "AVAILABLE", index >= 2 ? "scene-good" : "")}${reserveRow(96, "version", index >= 2 ? "vN + 1" : "vN")}${reserveRow(144, "reservation", index >= 2 ? (release ? "R-new" : "R-A") : "—", index >= 2 ? "scene-good" : "")}</g>`)}${line(240, 132, 330, 132)}${line(240, 332, 285, 332)}<path d="M285 332V230H330" class="scene-route scene-blocked"/>${moving("a-request", "M255 132L312 132", release ? "R-old" : "A", 0)}${moving("b-request", "M255 332L285 332L285 240", "B", 1, "scene-purple")}${badge(50, 199, release ? "TOKEN CẦN KHỚP" : "SELECT FOR UPDATE", "scene-good")}${badge(340, 405, index >= 2 ? (release ? "TOKEN CŨ: KHÔNG RELEASE" : "A COMMIT · B CONFLICT") : "B CHỜ HÀNG ĐƯỢC KHÓA", index >= 2 ? "scene-good" : "scene-purple")}${text(50, 453, release ? "Chỉ đúng identity mới được giải phóng reservation" : "Khóa hàng tuần tự hóa contenders · commit xác lập kết quả", "scene-small")}`;
}
function queue(s) {
    const dedup = s.index === 1,
        uncertain = s.index === 2,
        dlq = s.index === 3;
    const description = dedup
        ? "receipt m1 đã tồn tại"
        : uncertain
          ? "effect trước chưa rõ"
          : dlq
            ? "hết ngân sách thử lại"
            : "business effect + receipt";
    return `${group("queue", 55, 95, `<rect width="650" height="95" rx="16" class="scene-queue-tray"/>${text(18, -20, "RABBITMQ · DURABLE QUEUE", "scene-heading")}${[0, 1, 2, 3, 4].map((_, i) => sheet(22 + i * 120, 15, i === 0 ? "m1" : "message")).join("")}`)}
      ${card("consumer", 70, 260, 330, 156, uncertain ? "ĐỐI CHIẾU KẾT QUẢ" : dlq ? "XỬ LÝ LỖI" : "CONSUMER TRANSACTION", text(18, 64, description, "scene-small") + badge(16, 95, dedup ? "NO SECOND EFFECT" : uncertain ? "RECONCILE" : "COMMIT BEFORE ACK", "scene-good"), "scene-emphasis")}
      ${db("receipt-db", 500, 270, dlq ? "queue.dead" : uncertain ? "Authority" : "Receipt store", [dlq ? "visible error path" : uncertain ? "cùng operationKey" : "scope + messageId"], dlq ? "scene-danger" : "")}
      ${line(135, 194, 135, 254)}${moving("delivery", "M135 209L135 238", "m1", 0)}${line(403, 335, 493, 335)}
      ${uncertain ? moving("reconcile-query", "M410 335L475 335", "K", 1) + moving("reconcile-result", "M475 355L425 355", "?", 2, "scene-response") : moving("ack", "M380 250C380 225 390 215 415 215L600 215L620 198", "ACK", 2, "scene-response")}
      ${dlq ? moving("dead-letter", "M410 335L475 335", "lỗi", 1) : ""}
      ${badge(70, 435, dlq ? "RETRY HỮU HẠN → DEAD-LETTER" : dedup ? "REDELIVERY ≠ EFFECT MỚI" : uncertain ? "HỎI KẾT QUẢ CŨ, KHÔNG TẠO MỚI" : "DELIVERY ≠ COMMIT", "scene-purple")}`;
}
function lifecycle(s) {
    const terminal = s.index === 3;
    const states = [
        ["CREATED", 80, 165],
        ["MATCHING", 270, 165],
        ["DRIVER_RESERVED", 460, 165],
        ["DRIVER_ACCEPTED", 650, 165],
        ["READY_TO_START", 650, 330],
        ["IN_PROGRESS", 365, 330],
        ["COMPLETED", 80, 330],
    ];
    const stages = [
        [0, 1, 1],
        [1, 2, 3],
        [3, 4, 6],
        [1, 1, 1],
    ][s.index];
    const [before, during, after] = stages.map((i) => ({
        x: states[i][1],
        y: states[i][2],
    }));
    const stops = JSON.stringify([
        { at: 0, ...before },
        { at: 250, ...before },
        { at: 2000, ...during },
        { at: 2650, ...during },
        ...(s.index === 2 ? [{ at: 4600, x: 365, y: 330 }] : []),
        { at: 6500, ...after },
        { at: 7200, ...after },
    ]);
    return `${group("road", 0, 0, `<path d="M80 165H650V330H80" class="scene-lifecycle-road"/><path d="M80 165H650V330H80" class="scene-road-center"/>${states.map(([label, x, y], i) => `<g data-road-state="${i}"><circle cx="${x}" cy="${y}" r="17" class="scene-state-dot"/>${text(x, y + (i < 4 ? -36 : 46), label, "scene-center scene-small")}</g>`).join("")}`)}
      ${car("ride-car", before.x, before.y, terminal ? "scene-rejected" : "").replace('data-key="ride-car"', `data-key="ride-car" ${terminal ? "" : `data-road-stops='${stops}'`}`)}
      ${terminal ? card("terminal", 225, 218, 310, 80, "NHÁNH HỦY / TÌM XE THẤT BẠI", text(16, 56, "Tin muộn chỉ tạo cleanup", "scene-small"), "scene-danger") : badge(220, 245, "đúng điều kiện mới chuyển trạng thái", "scene-good")}
      ${text(55, 453, terminal ? "Không có đường từ terminal về active" : "Trip theo hành trình · Saga theo nghĩa vụ liên service", "scene-small")}`;
}

function authority(s) {
    const owners = [
        ["Trip", "trip_db", "vòng đời"],
        ["Driver", "driver_db", "reservation"],
        ["Payment", "payment_db", "payment effect"],
    ];
    return `${owners.map(([name, store, role], i) => group(`island-${i}`, 48 + i * 242, 90, `<path d="M0 95 106 38 212 95 106 152Z" class="scene-island"/><path d="M0 95v32l106 58 106-58V95L106 152Z" class="scene-island-side"/>${text(106, 4, name, "scene-center scene-heading")}${db(`store-${i}`, 24, 60, store, [role], s.index === i + 1 ? "scene-good" : "")} ${badge(27, 249, "QUYỀN GHI RIÊNG", "scene-good")}`)).join("")}${line(250, 385, 523, 385, "scene-blocked")}${badge(247, 369, "KHÔNG GHI CHÉO DB", "scene-danger")}${text(380, 448, s.index === 3 ? "Redis / Inbox là projection có thể trễ" : "Không có một transaction chung cho toàn hệ thống", "scene-center scene-small")}`;
}
function idempotency(s) {
    const conflict = s.index === 2;
    return `${card("request-one", 45, 90, 230, 100, "REQUEST 1", text(16, 57, "key K · payload P", "scene-small") + badge(13, 66, "rider scope", "scene-peach"))}${card("request-two", 45, 275, 230, 100, "REQUEST 2", text(16, 57, conflict ? "key K · payload Q" : "key K · payload P", "scene-small") + badge(13, 66, "retry", "scene-purple"))}${group("merge", 342, 226, `<path d="m0-60 60 60-60 60-60-60Z" class="scene-diamond"/>${text(0, -8, "KEY +", "scene-center scene-small")}${text(0, 14, "FINGERPRINT", "scene-center scene-tiny")}`)}<path d="M275 140H320V167M275 325H320V285M402 226H468" class="scene-route"/>${moving("retry-request", "M285 325L320 325L320 283", "K", 0)}${db("canonical", 480, 160, "Canonical Trip", [conflict ? "P ≠ Q → conflict" : "K + P → same TripId"], "scene-good")}${badge(465, 363, conflict ? "CONFLICT · NO OVERWRITE" : "MỘT LOGICAL EFFECT", conflict ? "scene-danger" : "scene-good")}${text(46, 439, s.index === 3 ? "Unique constraint chặn race; precheck không đủ" : "Tra key trước active-trip check để replay đúng yêu cầu", "scene-small")}`;
}
function saga(s) {
    const index = s.lessonId === "ride-journey" ? 0 : s.index,
        compensate = index === 3,
        review = index === 4;
    const labels = compensate
        ? ["CANCEL", "RELEASE", "VOID"]
        : ["ACCEPT", "AUTHORIZE", "CAPTURE"];
    return `${group("saga-track", 70, 80, `<rect width="625" height="240" rx="18" class="scene-boundary"/>${text(22, 30, "TRIP_DB · PERSISTED RIDE SAGA", "scene-heading")}<path d="M80 120H545" class="scene-saga-track ${compensate ? "scene-purple" : ""}"/>${labels.map((label, i) => `<g class="${i <= index ? "scene-good" : ""}"><circle cx="${80 + i * 232}" cy="120" r="26" class="scene-state-dot"/>${text(80 + i * 232, 126, String(i + 1), "scene-center scene-heading")}${text(80 + i * 232, 175, label, "scene-center scene-small")}</g>`).join("")}${badge(22, 195, "step_version + stable operationKey", "scene-purple")}`)}${moving("saga-progress", compensate ? "M615 200L383 200L150 200" : "M150 200L383 200L615 200", compensate ? "VOID" : "key", 1)}${card("obligation", 100, 365, 565, 80, review ? "REQUIRES_REVIEW" : compensate ? "BÙ TRỪ LÀ NGHIỆP VỤ MỚI" : "NGHĨA VỤ CÒN LẠI ĐƯỢC LƯU", text(16, 57, review ? "Không đoán kết quả để đóng Saga" : compensate ? "release đúng reservation · void đúng authorization" : "Crash → đọc workflow bền vững → tiếp tục", "scene-small"), review ? "scene-danger" : "scene-good", 2)}`;
}
function payment(s) {
    const unknown = s.lessonId === "unknown" && s.index === 1,
        reconcile = s.lessonId === "unknown" && s.index >= 2;
    const providerView = unknown
        ? switchAt(
              2200,
              db("provider-before", 485, 105, "Provider ledger", [
                  "K: chưa commit",
              ]),
              db(
                  "provider-after",
                  485,
                  105,
                  "Provider ledger",
                  ["K → effect đã commit"],
                  "scene-good",
              ),
          )
        : "";
    return `${card("caller", 45, 105, 255, 200, "PAYMENT OPERATION", text(16, 62, "operationKey = K", "scene-small") + text(16, 93, "authorize · trip · amount", "scene-small") + (unknown ? switchAt(4200, badge(14, 136, "PENDING"), badge(14, 136, "UNKNOWN", "scene-purple")) : badge(14, 136, reconcile ? "RECONCILE K" : "PENDING", "scene-good")))}${providerView || db("provider", 485, 105, "Provider ledger", ["K → effect đã commit"], "scene-good")}${line(300, 175, 478, 175)}${moving("payment-command", "M325 175L450 175", "K", 0)}<path d="M485 257H300" class="scene-route ${unknown ? "scene-blocked" : ""}"/>${unknown ? group("lost-response", 390, 258, `<path d="m-14-14 28 28m-28 0 28-28" class="scene-broken"/>${text(0, 40, "mất phản hồi", "scene-center scene-small")}`) : moving("provider-result", "M456 257L325 257", reconcile ? "FOUND" : "result", 1)}${card("ledger-proof", 70, 360, 610, 90, unknown ? "EFFECT ĐÃ XẢY RA ≠ CALLER ĐÃ BIẾT" : reconcile ? "HỎI LẠI CÙNG IDENTITY" : "MỘT KEY · MỘT LOGICAL OPERATION", text(16, 62, unknown ? "Không suy ra thất bại từ timeout" : reconcile ? "Không tạo key mới; đọc sự thật đã có" : "Provider trong repo là mô phỏng có ledger bền vững", "scene-small"), unknown ? "scene-purple" : "scene-good", 2)}`;
}
function cancellation(s) {
    return `${group("lanes", 45, 65, `${text(0, 25, "THỨ TỰ GỬI ≠ THỨ TỰ NHẬN", "scene-heading")}<path d="M0 115H665M0 255H665" class="scene-route"/>${badge(0, 67, "RideRequested", "scene-peach")}${badge(0, 207, "CancelMatching", "scene-purple")}`)}${card("tombstone", 447, 245, 245, 105, "TOMBSTONE", text(16, 60, "round đã hủy", "scene-small") + text(16, 84, "không mở attempt mới", "scene-small"), "scene-purple", 1)}${moving("cancel-first", "M160 320L425 320", "cancel", 0, "scene-purple")}${moving("ride-late", "M160 180L425 180", "ride", 1)}${group("terminal-wall", 575, 135, `<path d="M0 0v90" class="scene-terminal-wall"/>${lock(-15, 22)}${text(0, -15, "CANCELLED", "scene-center scene-small")}`)}${badge(90, 399, s.index === 3 ? "AUTHORIZE MUỘN → VOID" : "LATE FACT → CLEANUP ONLY", "scene-good")}${text(90, 454, "Hủy chặn công việc mới; effect đã phát vẫn cần giải quyết", "scene-small")}`;
}
function security(s) {
    return `${person("caller", 105, 220, "client")}${group("token", 202, 165, `<rect width="145" height="100" rx="12" class="scene-token"/>${text(18, 32, "SIGNED JWT", "scene-heading")}<path d="M18 48h105M18 63h69" class="scene-detail"/>${text(18, 86, "sub + roles", "scene-small")}`)}${group("gate", 402, 95, `<path d="M0 248V32a32 32 0 0 1 32-32h100a32 32 0 0 1 32 32v216" class="scene-gate"/>${lock(67, 82)}${text(82, 181, "JWT VALIDATION", "scene-center scene-tiny")}${text(82, 207, "+ OWNERSHIP", "scene-center scene-tiny")}`)}${card("trusted", 594, 160, 135, 115, s.index === 3 ? "INTERNAL" : "PRINCIPAL", text(14, 62, s.index === 2 ? "actor guard" : "verified sub", "scene-small"), "scene-good")}${line(350, 215, 396, 215)}${line(568, 215, 588, 215)}${moving("grant", "M350 215L588 215", "JWT", 1)}${badge(210, 355, s.index === 1 ? "X-Driver-Id: BỊ LOẠI" : "CHỮ KÝ + ROLE + OWNERSHIP", "scene-danger")}${text(76, 443, s.index === 2 ? "JWT sub không đồng nghĩa driverId" : "Mỗi service nhận vẫn phải xác thực và phân quyền riêng", "scene-small")}`;
}
function notification(s) {
    const outage = s.index === 2;
    return `${card("trip-truth", 45, 85, 230, 110, "TRIP AUTHORITY", text(16, 61, outage ? "vẫn tiến triển" : "NotificationRequested", "scene-small") + badge(14, 73, "không chờ inbox", "scene-good"))}${group("mailbox", 470, 200, `<path d="M0 100V35a35 35 0 0 1 35-35h145a35 35 0 0 1 35 35v65Z" class="scene-mailbox"/><path d="M15 38h185M35 105v65m145-65v65" class="scene-detail"/>${text(108, 80, "IN-APP INBOX", "scene-center scene-heading")}`)}${sheet(502, 220, "recipient user", "scene-peach")}${sheet(515, 205, "source message", "scene-purple")}${line(277, 140, 578, 140)}<path d="M578 140V190" class="scene-route"/>${moving("notification", "M300 140L578 140L578 178", "m1", 0)}${outage ? badge(465, 150, "WORKER TẠM DỪNG", "scene-danger") : badge(465, 150, "DELIVERY + RECEIPT", "scene-good")}${card("recipient", 65, 310, 325, 120, s.index === 3 ? "JWT sub → owned inbox" : "DEDUP BUSINESS KEY", text(16, 61, "source + recipient + type", "scene-small") + text(16, 91, "m1 giao lại ≠ inbox entry mới", "scene-small"), "scene-purple", 2)}${text(445, 424, "Không có SMS / email / push", "scene-small")}`;
}
function trace(s) {
    const spans = [
        ["Gateway", 30, 210],
        ["Trip", 92, 320],
        ["Broker / consumer", 275, 280],
        ["Driver / Payment", 410, 200],
    ];
    return `${group("waterfall", 50, 65, `<rect width="650" height="278" rx="16" class="scene-boundary"/>${text(22, 31, "TRACE CONTEXT · CÙNG WORKFLOW", "scene-heading")}${spans.map(([name, x, width], i) => `<g transform="translate(20 ${61 + i * 48})">${text(0, 16, name, "scene-tiny")}<rect x="${120 + x * 0.65}" width="${width * 0.65}" height="25" rx="6" class="scene-span span-${i}" data-reveal="${Math.min(i, 2)}"/></g>`).join("")}`)}${card("proof", 80, 375, 580, 73, s.index >= 2 ? "ĐỐI CHIẾU AUTHORITY & CODE SHA" : "TRACE LÀ QUAN SÁT, KHÔNG PHẢI AUTHORITY", text(16, 52, s.index >= 2 ? "test / fault → final state → source-anchored evidence" : "Độ dài span minh họa quan hệ; không phải latency đo thực tế", "scene-small"), "scene-good", 2)}`;
}

const renderers = {
    journey,
    transaction,
    matching,
    race,
    queue,
    lifecycle,
    authority,
    idempotency,
    saga,
    payment,
    cancellation,
    security,
    notification,
    trace,
};
export function sceneMarkup(spec) {
    const render = renderers[spec.kind];
    if (!render) throw new Error(`Unknown illustration ${spec.kind}`);
    return `<svg class="mechanism-svg" viewBox="0 0 760 490" role="img" aria-label="${esc(spec.title)}"><title>${esc(spec.title)}</title><desc>${esc(spec.phases.join(". "))}. Minh họa học tập, không phải dữ liệu đang chạy.</desc>${render(spec)}${ribbonMarkup()}</svg>`;
}

export function createScenePlayer(host, onPlaybackChange = () => {}) {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const duration = 7200,
        phaseLength = duration / 3,
        outcomeHold = 1200;
    let animations = [],
        raf = 0,
        time = 0,
        playing = false,
        userPaused = false,
        spec = null,
        key = "",
        transitions = [],
        lastPhase = -1,
        lastVisual = "",
        loops = 0;
    host.innerHTML = `<div class="scene-heading-bar"><span class="eyebrow">XƯỞNG CƠ CHẾ</span><span class="scene-model-label">Minh họa học tập</span></div><div class="scene-pan-hint">Kéo ngang hình để xem chi tiết</div><div class="scene-viewport"><div class="scene-artboard"></div></div><div class="scene-story" aria-live="polite"><span class="scene-phase-number"></span><p></p></div><div class="scene-phase-rail" aria-label="Các pha của minh họa"></div>`;
    const board = host.querySelector(".scene-artboard");
    const register = (animation) => {
        animation.pause();
        animations.push(animation);
    };
    function paint() {
        const phase = Math.min(2, Math.floor(time / phaseLength));
        const changed = host.dataset.playing !== String(playing);
        host.dataset.playing = String(playing);
        if (changed) onPlaybackChange();
        host.dataset.time = String(Math.round(time));
        host.dataset.loops = String(loops);
        host.dataset.holding = String(playing && time >= duration);
        host.querySelector(".scene-model-label").textContent = media.matches
            ? "Minh họa tĩnh"
            : "Tự lặp · minh họa học tập";
        if (phase !== lastPhase) {
            lastPhase = phase;
            host.querySelector(".scene-phase-number").textContent =
                `0${phase + 1}`;
            host.querySelectorAll("[data-scene-phase]").forEach((el, i) => {
                el.classList.toggle("active", i === phase);
                el.setAttribute("aria-current", i === phase ? "step" : "false");
            });
        }
        const svg = board.querySelector(".mechanism-svg:not(.scene-outgoing)");
        if (svg) {
            const state = visualStateAt(spec.visual, time),
                code = `${phase}/${state.stage}`;
            if (code !== lastVisual) {
                lastVisual = code;
                paintVisualState(svg, spec.visual, time, phase);
                host.dataset.visualStage = String(state.stage);
                host.querySelector(".scene-story").dataset.tone = state.tone;
                host.querySelector(".scene-story p").textContent =
                    state.resolved
                        ? `Kết quả: ${state.value}`
                        : state.stage === 0
                          ? `Bắt đầu: ${state.value}`
                          : `Đang xử lý: ${state.value}`;
            }
            if (spec.kind === "journey") paintJourney(svg, spec, time);
        }
    }
    function tick() {
        if (media.matches) {
            pause();
            seek(duration);
            return;
        }
        const clock = Number(animations[0]?.currentTime) || 0;
        time = Math.min(duration, clock);
        if (clock >= duration + outcomeHold) {
            loops++;
            // Keep a single set of effects; reset their common playhead only
            // after the outcome has remained visible long enough to read.
            time = 0;
            animations.forEach((a) => {
                a.play();
                a.currentTime = 0;
            });
            host.querySelector(".scene-story").setAttribute("aria-live", "off");
        }
        paint();
        if (playing) raf = requestAnimationFrame(tick);
    }
    function pause() {
        playing = false;
        animations.forEach((a) => a.pause());
        transitions.forEach((a) => {
            if (a.playState === "running") a.pause();
        });
        cancelAnimationFrame(raf);
        if (spec) paint();
    }
    function seek(value) {
        const clamped = Math.max(0, Math.min(duration, value));
        time = clamped;
        animations.forEach((a) => {
            a.currentTime = clamped;
        });
        paint();
    }
    function start() {
        if (media.matches) return;
        const resumeTime = Math.max(time, Number(animations[0]?.currentTime) || 0);
        playing = true;
        transitions.forEach((a) => {
            if (a.playState === "paused") a.play();
        });
        // play() rewinds finished child effects by default. Restore the shared
        // time so resuming after a seek never replays an earlier packet.
        animations.forEach((a) => {
            a.play();
            a.currentTime = resumeTime;
        });
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
        paint();
    }
    function clear(freeze = false) {
        cancelAnimationFrame(raf);
        animations.forEach((a) => {
            if (freeze) {
                try {
                    a.commitStyles();
                } catch {
                    /* Detached SVGs may not support committing styles. */
                }
            }
            a.cancel();
        });
        animations = [];
        transitions.forEach((a) => a.cancel());
        transitions = [];
        playing = false;
    }
    function update(lesson, index) {
        const nextKey = `${lesson.id}/${index}`;
        if (key === nextKey) return;
        const next = sceneFor(lesson, index),
            old = board.querySelector(".mechanism-svg:not(.scene-outgoing)"),
            sameFamily = Boolean(old && spec?.kind === next.kind);
        clear(true);
        board.querySelectorAll(".scene-outgoing").forEach((el) => el.remove());
        spec = next;
        key = nextKey;
        time = 0;
        lastPhase = -1;
        lastVisual = "";
        loops = 0;
        host.querySelector(".scene-story").setAttribute("aria-live", "polite");
        host.dataset.sceneKind = spec.kind;
        host.dataset.sceneKey = key;
        board.insertAdjacentHTML("beforeend", sceneMarkup(spec));
        let svg = board.lastElementChild;
        const actorStarts = new Map();
        if (sameFamily) {
            const retained = reconcileActors(old, svg);
            retained.forEach(({ el, before }) =>
                actorStarts.set(el.dataset.key, before),
            );
            svg.remove();
            svg = old;
            if (!media.matches)
                for (const { el, before, opacity } of retained) {
                    const nextOpacity = getComputedStyle(el).opacity;
                    if (opacity !== nextOpacity)
                        transitions.push(el.animate(
                            [{ opacity }, { opacity: nextOpacity }],
                            { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" },
                        ));
                    const after = getComputedStyle(el).transform;
                    if (before !== after && !el.hasAttribute("data-road-stops"))
                        transitions.push(
                            el.animate(
                                [{ transform: before }, { transform: after }],
                                {
                                    duration: 480,
                                    easing: "cubic-bezier(.22,1,.36,1)",
                                },
                            ),
                        );
                }
        } else if (old) {
            old.setAttribute("aria-hidden", "true");
            old.classList.add("scene-outgoing");
            if (!media.matches) {
                const outgoing = old.animate(
                    [
                        { opacity: 1, transform: "translateY(0px)" },
                        { opacity: 0, transform: "translateY(-6px)" },
                    ],
                    {
                        duration: 280,
                        easing: "cubic-bezier(.25,1,.5,1)",
                        fill: "forwards",
                    },
                );
                transitions.push(outgoing);
                outgoing.finished
                    .then(() => old.remove())
                    .catch(() => old.remove());
                transitions.push(
                    svg.animate(
                        [
                            { opacity: 0, transform: "translateY(8px)" },
                            { opacity: 1, transform: "translateY(0px)" },
                        ],
                        { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" },
                    ),
                );
            } else old.remove();
        }
        // Verdicts stay absent until all phase-2 responses have arrived.
        const verdictSelectors = {
            race: 'g[transform="translate(340 405)"]',
            transaction: '[data-key="commit"]',
            payment: '[data-key="ledger-proof"]',
            saga: '[data-key="obligation"]',
            trace: '[data-key="proof"]',
        };
        const verdict = svg.querySelector(
            verdictSelectors[spec.kind] || "[data-no-verdict]",
        );
        if (verdict) {
            verdict.removeAttribute("data-reveal");
            verdict.dataset.showAt = String(visualTiming.outcome);
        }
        if (
            spec.kind === "payment" &&
            spec.lessonId === "unknown" &&
            spec.index === 1
        ) {
            const lost = svg.querySelector('[data-key="lost-response"]');
            if (lost) lost.dataset.showAt = "2600";
        }
        host.querySelector(".scene-phase-rail").innerHTML = spec.phases
            .map(
                (p, i) =>
                    `<button type="button" data-scene-phase="${i}" aria-label="Pha ${i + 1}: ${esc(p)}"><span>0${i + 1}</span><span>${esc(p)}</span></button>`,
            )
            .join("");
        // This native animation is the shared clock. Child animations share its time.
        register(
            svg.animate([], {
                duration: duration + outcomeHold,
                fill: "both",
            }),
        );
        svg.querySelectorAll("[data-travel]").forEach((el) => {
            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path",
            );
            path.setAttribute("d", el.dataset.travel);
            const length = path.getTotalLength(),
                phase = Number(el.dataset.travelPhase),
                delay = phase * phaseLength;
            const frames = Array.from({ length: 41 }, (_, i) => {
                const p = path.getPointAtLength((length * i) / 40);
                return {
                    transform: `translate(${p.x}px,${p.y}px)`,
                    opacity: i < 4 ? i / 4 : i > 36 ? (40 - i) / 4 : 1,
                    offset: i / 40,
                };
            });
            register(
                el.animate(frames, {
                    delay: delay + 250,
                    duration: 1750,
                    easing: "cubic-bezier(.45,0,.2,1)",
                    fill: "both",
                }),
            );
        });
        svg.querySelectorAll("[data-reveal]").forEach((el) =>
            register(
                el.animate([{ opacity: 0 }, { opacity: 1 }], {
                    delay: Number(el.dataset.reveal) * phaseLength + 200,
                    duration: 650,
                    easing: "cubic-bezier(.25,1,.5,1)",
                    fill: "both",
                }),
            ),
        );
        svg.querySelectorAll("[data-show-at]").forEach((el) =>
            register(
                el.animate([{ opacity: 0 }, { opacity: 1 }], {
                    delay: Number(el.dataset.showAt),
                    duration: 180,
                    fill: "both",
                    easing: "ease-out",
                }),
            ),
        );
        svg.querySelectorAll("[data-before],[data-after]").forEach((el) => {
            const before = el.dataset.before !== undefined;
            const at =
                Number(before ? el.dataset.before : el.dataset.after) /
                duration;
            register(
                el.animate(
                    [
                        { opacity: before ? 1 : 0, offset: 0 },
                        {
                            opacity: before ? 1 : 0,
                            offset: Math.max(0, at - 0.04),
                            easing: "ease-in-out",
                        },
                        { opacity: before ? 0 : 1, offset: at },
                        { opacity: before ? 0 : 1, offset: 1 },
                    ],
                    { duration, fill: "both" },
                ),
            );
        });
        svg.querySelectorAll("[data-drive]").forEach((el) => {
            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path",
            );
            path.setAttribute("d", el.dataset.drive);
            const length = path.getTotalLength();
            register(
                el.animate(
                    Array.from({ length: 41 }, (_, i) => {
                        const p = path.getPointAtLength((length * i) / 40);
                        return {
                            transform: `translate(${p.x}px,${p.y}px)`,
                            offset: i / 40,
                        };
                    }),
                    {
                        duration: 6500,
                        fill: "both",
                        easing: "cubic-bezier(.45,0,.2,1)",
                    },
                ),
            );
        });
        svg.querySelectorAll("[data-road-stops]").forEach((el) => {
            const frames = JSON.parse(el.dataset.roadStops).map(
                ({ at, x, y }) => ({
                    transform: `translate(${x}px,${y}px)`,
                    offset: at / duration,
                    easing: "cubic-bezier(.25,1,.5,1)",
                }),
            );
            const previous = actorStarts.get(el.dataset.key);
            if (previous && previous !== "none") frames[0].transform = previous;
            register(el.animate(frames, { duration, fill: "both" }));
        });
        svg.querySelectorAll(".scene-lock").forEach((el) =>
            register(
                el.animate([{ opacity: 0.4 }, { opacity: 1 }], {
                    delay: 2000,
                    duration: 200,
                    fill: "both",
                }),
            ),
        );
        svg.querySelectorAll(".scene-radius").forEach((el, i) =>
            register(
                el.animate(
                    [
                        { transform: "scale(.55)", opacity: 0.15 },
                        { transform: "scale(1)", opacity: 1 },
                    ],
                    {
                        duration: 1800,
                        delay: i * 180,
                        easing: "cubic-bezier(.22,1,.36,1)",
                        fill: "both",
                    },
                ),
            ),
        );
        svg.querySelectorAll(".scene-rejected").forEach((el) =>
            register(
                el.animate([{ opacity: 1 }, { opacity: 0.3 }], {
                    delay: phaseLength + 350,
                    duration: 700,
                    easing: "ease-in-out",
                    fill: "both",
                }),
            ),
        );
        userPaused = false;
        if (media.matches) {
            seek(duration);
            pause();
        } else {
            seek(0);
            start();
        }
        if (document.querySelector("dialog[open]")) pause();
    }
    function click(event) {
        const button = event.target.closest("button");
        if (!button) return;
        if (button.dataset.scenePhase !== undefined) {
            userPaused = false;
            pause();
            seek(
                Number(button.dataset.scenePhase) * phaseLength +
                    phaseLength / 2,
            );
            resume();
        }
    }
    function preference() {
        if (media.matches) {
            pause();
            transitions.forEach((animation) => {
                try {
                    animation.finish();
                } catch {
                    animation.cancel();
                }
            });
            seek(duration);
        } else resume();
    }
    function resume() {
        if (
            !media.matches &&
            !userPaused &&
            !document.hidden &&
            !document.querySelector("dialog[open]")
        )
            start();
    }
    function visibility() {
        if (document.hidden) pause();
        else resume();
    }
    host.addEventListener("click", click);
    media.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    return {
        update,
        pause,
        resume,
        syncMotionPreference: preference,
        toggle() {
            userPaused = !userPaused;
            if (userPaused) pause();
            else resume();
        },
        restart() {
            userPaused = false;
            pause();
            seek(media.matches ? duration : 0);
            resume();
        },
        get time() {
            return time;
        },
        get playing() {
            return playing;
        },
        destroy() {
            clear();
            host.removeEventListener("click", click);
            media.removeEventListener("change", preference);
            document.removeEventListener("visibilitychange", visibility);
            host.replaceChildren();
        },
    };
}
