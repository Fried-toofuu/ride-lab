// Plain-language teaching material. Examples illustrate contracts, not live data.
export const vocabulary = {
    service: [
        "Bộ phận xử lý riêng (service)",
        "Một chương trình phụ trách một phần công việc. Ví dụ Trip quản lý chuyến xe, Driver quản lý tài xế. Các chương trình phải gửi yêu cầu hoặc thông điệp để trao đổi.",
    ],
    database: [
        "Kho dữ liệu có tổ chức (database)",
        "Nơi chương trình lưu thông tin để đọc lại về sau. Mỗi bộ phận trong repo có kho riêng; chương trình tắt rồi bật lại không đồng nghĩa dữ liệu đã lưu biến mất.",
    ],
    request: [
        "Yêu cầu (request)",
        "Một lời nhờ chương trình làm việc, chẳng hạn tạo chuyến xe. Gửi được yêu cầu chưa có nghĩa công việc đã làm xong.",
    ],
    http: [
        "Cách gửi yêu cầu và nhận trả lời (HTTP)",
        "Quy tắc trao đổi thường dùng giữa trình duyệt và máy chủ, hoặc giữa hai chương trình. Người gọi có thể chờ trả lời; câu trả lời vẫn có thể bị mất trên mạng.",
    ],
    gateway: [
        "Cổng tiếp nhận (Gateway)",
        "Bộ phận đứng trước các đường truy cập công khai, kiểm tra giấy đăng nhập rồi chuyển yêu cầu đến đúng nơi. Gateway không quyết định chuyến xe hay giữ tài xế.",
    ],
    api: [
        "Cửa giao tiếp của chương trình (API)",
        "Một cách được quy định để chương trình khác yêu cầu công việc. Ví dụ POST /trips là cửa tạo chuyến; POST là thao tác gửi yêu cầu thực hiện công việc.",
    ],
    jwt: [
        "Giấy đăng nhập có chữ ký (JWT)",
        "JSON Web Token: một chuỗi dữ liệu do Identity cấp, mang danh tính và quyền của người gọi. Chữ ký giúp phát hiện giấy giả hoặc bị sửa. Có giấy hợp lệ vẫn phải được kiểm quyền với tài nguyên cụ thể.",
    ],
    role: [
        "Nhóm quyền (role)",
        "Cho biết người gọi thuộc nhóm nào, như hành khách hay tài xế. Đúng nhóm tài xế chưa đủ để điều khiển chuyến của một tài xế khác.",
    ],
    principal: [
        "Danh tính đã kiểm chứng (principal)",
        "Thông tin người gọi mà chương trình lấy được sau khi xác thực giấy đăng nhập. Nó khác với tên hay mã mà người dùng tự ghi vào yêu cầu.",
    ],
    userDriver: [
        "Mã tài khoản và mã tài xế",
        "userId xác định tài khoản đăng nhập; driverId xác định hồ sơ tài xế. Một tài khoản có thể gắn với hồ sơ, nhưng hai mã không mặc nhiên giống nhau.",
    ],
    transaction: [
        "Nhóm thay đổi cùng thành công (transaction)",
        "Một giao dịch trong một kho dữ liệu: các thay đổi bên trong cùng được chốt hoặc cùng bị hủy. Repo không có một giao dịch chung bao trùm mọi bộ phận.",
    ],
    commit: [
        "Chốt thay đổi (commit)",
        "Kho dữ liệu xác nhận một nhóm thay đổi đã được lưu chính thức. Việc người gọi chưa nhận được câu trả lời không chứng minh thay đổi chưa được chốt.",
    ],
    rollback: [
        "Hủy thay đổi chưa chốt (rollback)",
        "Kho dữ liệu bỏ những thay đổi của một giao dịch chưa thành công. Nó không tự hủy một việc đã được chốt độc lập ở bộ phận khác.",
    ],
    outbox: [
        "Sổ việc cần gửi (Outbox)",
        "Bảng trong kho dữ liệu ghi các thông điệp còn phải gửi ra ngoài. Ghi sổ cùng thay đổi nghiệp vụ giúp chương trình nhớ việc gửi sau khi khởi động lại.",
    ],
    event: [
        "Tin báo việc đã xảy ra (event)",
        "Một thông điệp cho biết một sự thật, như tài xế đã được giữ. Bên nhận vẫn phải kiểm tra tin có đúng chuyến và đúng lượt hiện tại không.",
    ],
    command: [
        "Lời nhờ thực hiện công việc (command)",
        "Thông điệp yêu cầu bộ phận khác làm một việc, như giải phóng tài xế. Gửi được lời nhờ chưa phải bằng chứng bên kia đã làm xong.",
    ],
    broker: [
        "Trạm chuyển thông điệp (broker)",
        "RabbitMQ là chương trình nhận và chuyển thông điệp tới các hàng chờ. Nó giúp bên gửi và bên xử lý không cần hoạt động cùng một thời điểm.",
    ],
    queue: [
        "Hàng chờ (queue)",
        "Nơi giữ thông điệp đợi chương trình nhận xử lý. Một thông điệp có thể được giao lại nếu trạm chuyển chưa nhận xác nhận xử lý.",
    ],
    ack: [
        "Xác nhận đã xử lý (ACK)",
        "Acknowledgement: lời báo từ chương trình nhận về RabbitMQ rằng nó đã xử lý xong thông điệp. Trong repo, phải lưu kết quả và dấu đã xử lý trước khi báo xong.",
    ],
    confirm: [
        "Xác nhận đã nhận tin gửi (publisher confirm)",
        "Lời xác nhận từ RabbitMQ cho bên gửi rằng broker đã nhận lần gửi. Nó không chứng minh chương trình nhận đã làm xong công việc.",
    ],
    dedup: [
        "Nhận biết việc đã xử lý (deduplication)",
        "Dùng mã thông điệp và bản ghi đã xử lý để không thực hiện lại tác động nghiệp vụ khi cùng thông điệp được giao thêm lần nữa.",
    ],
    replay: [
        "Trả lại kết quả đã có (replay)",
        "Khi nhận lại đúng yêu cầu cũ, chương trình trả kết quả cũ thay vì tạo một chuyến hay một thao tác thanh toán mới.",
    ],
    idempotency: [
        "Gửi lại vẫn chỉ một việc (idempotency)",
        "Tính chất cho phép lặp lại cùng yêu cầu mà không tạo thêm tác động nghiệp vụ. Cùng mã nhưng đổi nội dung phải bị báo xung đột, không được xem là yêu cầu cũ hợp lệ.",
    ],
    key: [
        "Mã nhận diện yêu cầu (key)",
        "Một giá trị được giữ nguyên cho cùng một ý định. Đổi mã khi thử lại có thể khiến hệ thống hiểu đó là một việc mới.",
    ],
    fingerprint: [
        "Dấu nhận diện nội dung (fingerprint)",
        "Giá trị được tính từ các dữ liệu quan trọng của yêu cầu để nhận ra nội dung có đổi hay không. Nó không phải dấu vân tay của người dùng.",
    ],
    scope: [
        "Phạm vi của mã (scope)",
        "Cho biết một mã yêu cầu thuộc ai hoặc thuộc nhóm xử lý nào. Ví dụ mã tạo chuyến của hành khách này không được nhầm với cùng chuỗi mã của hành khách khác.",
    ],
    unique: [
        "Ràng buộc không trùng (unique constraint)",
        "Quy tắc ngay trong kho dữ liệu ngăn hai bản ghi vi phạm cùng điều kiện. Nó còn bảo vệ được khi hai yêu cầu chạy gần như đồng thời.",
    ],
    authority: [
        "Nơi có quyền quyết định (authority)",
        "Bộ phận sở hữu sự thật cuối cùng cho một loại dữ liệu. Driver quyết định việc giữ tài xế; bản danh sách ứng viên trong Redis không có quyền đó.",
    ],
    projection: [
        "Bản sao phục vụ tra cứu (projection)",
        "Dữ liệu được dựng từ các thay đổi ở nơi sở hữu sự thật, giúp tìm kiếm hoặc hiển thị thuận tiện. Bản sao có thể cập nhật chậm và không được tự cấp quyền giữ tài xế.",
    ],
    redis: [
        "Kho tra cứu nhanh (Redis)",
        "Trong repo, Redis giữ bản sao vị trí và trạng thái để tìm ứng viên. Nó không phải nơi chốt việc tài xế đã được giữ cho chuyến nào.",
    ],
    geo: [
        "Tra cứu theo vị trí (GEOSEARCH)",
        "Lệnh Redis dùng để tìm các điểm gần một tọa độ. Khoảng cách gần không tự chứng minh tài xế còn sẵn sàng nhận chuyến.",
    ],
    round: [
        "Một lượt tìm tài xế (matching round)",
        "Mã của lượt tìm thuộc một chuyến. Gắn kết quả với đúng lượt giúp tránh nhầm tin cũ với công việc hiện tại.",
    ],
    snapshot: [
        "Danh sách đã được chốt để xử lý (snapshot)",
        "Bản ghi các ứng viên và thứ tự được dùng cho một lượt. Lưu nó giúp lần phục hồi tiếp tục công việc đã chọn thay vì chọn lại tùy theo bản tra cứu vừa cập nhật.",
    ],
    attempt: [
        "Một lần thử giữ ứng viên (attempt)",
        "Bản ghi cho việc thử giữ một tài xế cụ thể. Nó có mã reservation ổn định và kết quả để chương trình biết cần tiếp tục hay hỏi lại.",
    ],
    lease: [
        "Quyền xử lý tạm thời (lease)",
        "Cách giúp một tiến trình xử lý một lượt tại một thời điểm. Matching dùng khóa tư vấn theo lượt trong PostgreSQL; tiến trình chết thì khóa được thả để tiến trình khác tiếp tục.",
    ],
    version: [
        "Số lần dữ liệu đã đổi (version)",
        "Một con số tăng khi trạng thái được thay đổi thành công. Gửi kèm phiên bản mình đã đọc giúp phát hiện mình đang quyết định dựa trên dữ liệu cũ.",
    ],
    lock: [
        "Khóa một hàng dữ liệu (row lock)",
        "Cơ chế buộc những yêu cầu cùng sửa một hàng phải chờ nhau. Driver đọc lại hàng mới nhất trong lúc giữ khóa, rồi mới kiểm tra và ghi.",
    ],
    fencing: [
        "Kiểm đúng quyền của lần hiện tại (fencing)",
        "So mã chuyến, mã giữ chỗ, lượt tìm và các điều kiện liên quan trước khi sửa. Nhờ vậy một lệnh cũ không được làm hỏng lần giữ chỗ mới.",
    ],
    reservation: [
        "Giữ tài xế cho một chuyến (reservation)",
        "Cam kết do Driver chốt rằng tài xế đang được dành cho chuyến đó. Đây chưa phải việc tài xế đã bấm chấp nhận, cũng chưa phải chuyến đã bắt đầu.",
    ],
    saga: [
        "Sổ theo dõi việc qua nhiều bộ phận (Saga)",
        "Quy trình được Trip lưu để biết đang chờ thanh toán hay còn việc dọn dẹp nào. Mỗi bộ phận vẫn tự chốt dữ liệu riêng; Saga không phải một giao dịch database khổng lồ.",
    ],
    authorize: [
        "Cho phép thu tiền về sau (authorize)",
        "Bước xác nhận khả năng thanh toán trước khi chuyến khởi hành. Nó khác với thu tiền thực sự. Trong repo, bên thanh toán là bộ mô phỏng, không gọi ngân hàng thật.",
    ],
    capture: [
        "Thực hiện thu tiền (capture)",
        "Thao tác thu khoản đã được cho phép. Nó là nghĩa vụ riêng có thể còn đang phục hồi sau khi chuyến đã hoàn tất. Repo mô phỏng thao tác này.",
    ],
    void: [
        "Hủy quyền thu chưa dùng (void)",
        "Thao tác hủy một lần cho phép thu tiền khi không còn cần dùng. Nó khác với hoàn tiền sau khi đã thu. Repo dùng thao tác mô phỏng.",
    ],
    compensation: [
        "Làm việc bù trừ (compensation)",
        "Thực hiện công việc mới để xử lý hậu quả của việc trước, như bỏ giữ tài xế hoặc hủy quyền thu tiền. Việc này có thể gặp lỗi và cần làm tiếp sau đó.",
    ],
    unknown: [
        "Chưa biết kết quả (UNKNOWN)",
        "Chương trình chưa có bằng chứng đáng tin việc đã xảy ra hay chưa. Không được tự đổi thành thành công hoặc thất bại chỉ vì chờ quá lâu.",
    ],
    timeout: [
        "Chờ quá hạn (timeout)",
        "Người gọi không nhận được câu trả lời trong thời gian cho phép. Bên nhận vẫn có thể đã chốt công việc trước khi câu trả lời bị mất.",
    ],
    reconcile: [
        "Hỏi lại nơi quyết định (reconcile)",
        "Đọc kết quả tại nơi có thẩm quyền bằng đúng mã của thao tác cũ. Mục đích là biết việc trước đã xảy ra chưa, thay vì tạo một việc mới.",
    ],
    retry: [
        "Thử lại (retry)",
        "Gửi hoặc xử lý lại sau lỗi có thể tạm thời. Phải giữ danh tính phù hợp, có giới hạn và không dùng thử lại mù khi tác động trước còn chưa rõ.",
    ],
    backoff: [
        "Chờ giữa các lần phục hồi (backoff)",
        "Khoảng nghỉ trước lần thử hoặc hỏi lại tiếp theo, giúp tránh dồn yêu cầu liên tục vào một bộ phận đang gặp sự cố.",
    ],
    dlq: [
        "Hàng chờ lỗi cần xem xét (DLQ)",
        "Dead-letter queue: nơi nhận thông điệp không xử lý được theo chính sách. Đưa vào đây không có nghĩa nghiệp vụ đã thành công.",
    ],
    poison: [
        "Thông điệp lỗi không tự hết (poison message)",
        "Thông điệp sai nội dung hoặc không hợp lệ mà gửi lại y nguyên cũng không sửa được. Nó cần đi vào đường lỗi thay vì quay vòng vô hạn.",
    ],
    tombstone: [
        "Bản ghi nhớ việc đã hủy (tombstone)",
        "Dấu hủy được lưu ngay cả khi yêu cầu gốc chưa tới. Nhờ vậy yêu cầu đến muộn vẫn biết không được bắt đầu việc mới.",
    ],
    terminal: [
        "Trạng thái đã kết thúc (terminal)",
        "Một trạng thái mà chuyến không được quay lại hoạt động, như đã hủy hoặc tìm xe thất bại. Công việc dọn dẹp bên ngoài vẫn có thể còn phải làm tiếp.",
    ],
    trace: [
        "Dấu vết của một lần xử lý (trace)",
        "Chuỗi ghi nhận giúp lần theo yêu cầu đi qua những bộ phận nào. Một dấu vết tốt không tự chứng minh hệ thống an toàn trong mọi tình huống cạnh tranh.",
    ],
    span: [
        "Một đoạn trong dấu vết (span)",
        "Bản ghi cho một phần công việc, chẳng hạn một lần gọi Driver. Các đoạn có quan hệ giúp ghép thành hành trình xử lý.",
    ],
    metric: [
        "Số đo hoạt động (metric)",
        "Các số như lượng yêu cầu, lỗi hoặc việc đang chờ. Chúng giúp tìm vấn đề nhưng không thay thế việc đọc dữ liệu ở nơi có quyền quyết định.",
    ],
    evidence: [
        "Bằng chứng kiểm chứng (evidence)",
        "Kết quả được giữ kèm cách chạy lại và mã phiên bản code. Kết luận chỉ áp dụng trong phạm vi tình huống và phiên bản đã được kiểm tra.",
    ],
    sha: [
        "Mã phiên bản code (commit SHA)",
        "Chuỗi định danh một bản lưu trong Git. Dùng nó để biết chính xác bộ mã nào đã được kiểm thử, thay vì chỉ nói “bản mới nhất”.",
    ],
    simulator: [
        "Bộ mô phỏng (simulator)",
        "Chương trình tạo hành vi để nghiên cứu các tình huống thành công hoặc lỗi. Payment của repo có sổ dữ liệu bền vững nhưng không thực sự thu tiền từ ngân hàng.",
    ],
    receipt: [
        "Dấu đã xử lý (receipt)",
        "Bản ghi rằng một thông điệp đã được áp dụng trong một phạm vi xử lý. Lưu dấu cùng tác động nghiệp vụ mới tránh được khoảng hở giữa hai việc.",
    ],
};

const b = (title, explain, actions, example, why, remember, terms) => ({
    title,
    explain,
    actions,
    example,
    why,
    remember,
    terms,
});

export const beginnerLessons = {
    "ride-journey": {
        foundation:
            "Hãy xem hệ thống như một công ty có nhiều bộ phận. Trip quản lý chuyến; Matching tìm ứng viên; Driver quản lý tài xế; Payment mô phỏng thanh toán. Mỗi bộ phận là một chương trình riêng nên phải trao đổi qua mạng.",
        objectives: [
            "Lần theo yêu cầu đặt xe từ đầu đến cuối",
            "Biết ai được quyết định giữ tài xế",
            "Hiểu vì sao chuyến xong mà thanh toán còn phải theo dõi",
        ],
        steps: [
            b(
                "Bấm đặt xe mới chỉ là bắt đầu",
                "Khi bạn bấm đặt xe, ứng dụng gửi một lời nhờ tạo chuyến. Hệ thống chưa hứa đã tìm được tài xế. Trước hết nó cần biết ai đang đặt và bạn muốn đi đâu.",
                [
                    "Ứng dụng gửi điểm đón, điểm đến và giấy đăng nhập đến Gateway, tức cổng tiếp nhận.",
                    "Yêu cầu có thêm một mã riêng. Nếu phải gửi lại cùng lần đặt này, ứng dụng giữ nguyên mã đó.",
                    "Gateway kiểm tra quyền rồi chuyển yêu cầu tới Trip để xử lý chuyến.",
                ],
                "Ví dụ minh họa: Mai đặt từ nhà đến trường. Nếu mạng chập chờn và ứng dụng gửi lại, mã của lần đặt vẫn giữ nguyên để hệ thống nhận ra đây là cùng một việc.",
                "Mạng có thể đứt giữa lúc xử lý. Nếu cứ mỗi lần gửi lại đều tạo chuyến mới, một lần bấm có thể thành nhiều chuyến.",
                "Nhận yêu cầu khác với tìm được xe.",
                ["request", "gateway", "service", "key"],
            ),
            b(
                "Lưu chuyến trước khi tìm tài xế",
                "Trip là bộ phận quản lý chuyến. Nó cần ghi lại yêu cầu một cách chắc chắn để sau này có thể đọc lại, kể cả khi chương trình phải khởi động lại.",
                [
                    "Trip kiểm tra mã yêu cầu đã từng được xử lý chưa; nếu rồi thì đọc lại kết quả cũ.",
                    "Với yêu cầu mới, Trip tính và lưu giá chốt cùng thông tin chuyến và dấu nhận diện yêu cầu.",
                    "Kho dữ liệu chốt các phần đó cùng nhau. Quy tắc trong kho còn ngăn một hành khách có hai chuyến đang hoạt động.",
                ],
                "Mai gửi lại đúng lần đặt trước. Trip tìm thấy chuyến đã tạo và trả mã chuyến đó, thay vì tính giá rồi tạo thêm một chuyến.",
                "Lưu các phần liên quan cùng nhau tránh tình trạng có chuyến nhưng mất dấu để nhận biết lần gửi lại. Việc tìm tài xế diễn ra sau đó.",
                "Trip là nơi quyết định vòng đời chuyến.",
                ["database", "transaction", "commit", "replay"],
            ),
            b(
                "Ghi nhớ việc phải nhờ bộ phận tìm xe",
                "Sau khi bắt đầu tìm xe, Trip phải nhờ Matching làm phần tìm ứng viên. Trip ghi lời nhờ vào kho dữ liệu trước, rồi một bộ phận gửi tin mới chuyển nó đi.",
                [
                    "Trip đổi chuyến sang trạng thái đang tìm xe để biết công việc tìm tài xế đã bắt đầu.",
                    "Trong cùng lần chốt dữ liệu, nó ghi một mục vào sổ việc cần gửi: thông điệp RideRequestedV1.",
                    "Chương trình gửi tin đọc sổ và chuyển thông điệp qua RabbitMQ. Matching lưu việc đã nhận trước khi báo nhận xong.",
                ],
                "Có thể hình dung Trip vừa ghi đơn vừa ghi việc cần chuyển đơn. Nếu chương trình tắt sau đó, lần khởi động lại vẫn đọc được việc chưa gửi.",
                "Nếu lưu đơn xong rồi chỉ nhớ việc gửi trong bộ nhớ tạm, một lần tắt chương trình có thể làm đơn không bao giờ được tìm xe.",
                "Lưu ý định gửi trước giúp không quên công việc.",
                ["outbox", "event", "broker", "ack"],
            ),
            b(
                "Xe gần nhất chưa chắc nhận được chuyến",
                "Matching là bộ phận tìm tài xế. Nó tra vị trí để có danh sách ứng viên, nhưng danh sách này chưa phải cam kết giữ được xe.",
                [
                    "Redis tìm các tài xế ở gần điểm đón dựa trên vị trí đã nhận được.",
                    "Matching loại người không sẵn sàng, vị trí quá cũ hoặc không đáp ứng điều kiện.",
                    "Nó xếp thứ tự và lưu danh sách, rồi mới yêu cầu Driver giữ một tài xế cụ thể.",
                ],
                "Tài xế An gần Mai nhất nhưng vị trí đã lâu không cập nhật. Matching có thể loại An và xét người có vị trí còn mới, thay vì tin khoảng cách cũ.",
                "Danh sách tra cứu có thể cập nhật chậm. Quyết định giữ xe phải kiểm tra lại tại Driver, nơi sở hữu trạng thái tài xế.",
                "Redis đề xuất; Driver mới được cấp quyền giữ xe.",
                ["redis", "geo", "snapshot", "authority"],
            ),
            b(
                "Chốt tài xế cho đúng một chuyến",
                "Nhiều chuyến có thể cùng muốn giữ một tài xế. Driver là bộ phận duy nhất được phân xử để tài xế không bị dành cho hai chuyến cùng lúc.",
                [
                    "Matching gửi yêu cầu giữ tài xế với đúng mã chuyến và mã lần giữ.",
                    "Driver khóa hàng dữ liệu của tài xế rồi đọc lại trạng thái mới nhất.",
                    "Nếu còn hợp lệ, Driver chốt việc giữ cùng thông điệp cần gửi. Trip nhận tin này và ghi đúng tài xế cho chuyến.",
                ],
                "Mai và Lan cùng đặt, cùng được đề xuất An. Một yêu cầu được Driver chốt trước. Yêu cầu còn lại phải thấy An đã được giữ và không được ghi đè.",
                "Chỉ kiểm tra “còn rảnh” trước đó là chưa đủ vì người khác có thể vừa giữ xe trong khoảng chờ. Phải kiểm tra và chốt tại cùng nơi.",
                "Một hàng dữ liệu được kiểm soát bảo vệ một tài xế.",
                ["reservation", "lock", "version", "commit"],
            ),
            b(
                "Tài xế đồng ý rồi mới kiểm tra thanh toán",
                "Giữ tài xế chỉ là dành người đó cho chuyến. Tài xế vẫn cần bấm chấp nhận. Khi chấp nhận hợp lệ, Trip bắt đầu theo dõi các bước thanh toán.",
                [
                    "Trip kiểm tra người bấm có đúng tài xế đang được gán cho chuyến không.",
                    "Nó ghi trạng thái đã chấp nhận và tạo sổ theo dõi các việc liên bộ phận, gọi là Saga.",
                    "Cùng lần chốt đó, Trip ghi lời nhờ Payment kiểm tra khả năng thanh toán trước khi khởi hành.",
                ],
                "An được dành cho chuyến của Mai nhưng chưa bấm nhận. Hệ thống không được tự coi An đã đồng ý. Sau khi An nhận đúng chuyến, bước kiểm tra thanh toán mới bắt đầu.",
                "Tách các bước giúp tránh bắt đầu một chuyến khi người lái chưa đồng ý hoặc việc cho phép thanh toán chưa được xác nhận.",
                "Giữ xe, chấp nhận và khởi hành là ba việc khác nhau.",
                ["reservation", "saga", "authorize", "outbox"],
            ),
            b(
                "Chờ kết quả cho phép thanh toán",
                "Payment kiểm tra một thao tác cho phép thu tiền về sau. Trong repo đây là bộ mô phỏng có lưu dữ liệu, không phải việc gọi ngân hàng thật.",
                [
                    "Trip gửi yêu cầu với một mã ổn định dành riêng cho việc cho phép thanh toán của chuyến.",
                    "Payment xử lý rồi gửi kết quả về. Chỉ gửi được yêu cầu chưa có nghĩa đã được cho phép.",
                    "Trip nhận đúng kết quả thành công thì chuyến mới có thể sẵn sàng khởi hành.",
                ],
                "Mai thấy hệ thống đang chờ. Điều đó có thể là Payment đã làm nhưng tin trả về chưa tới. Trip cần hỏi hoặc nhận kết quả đáng tin, không tự suy ra thành công.",
                "Việc liên quan thanh toán cần một danh tính xuyên suốt để không biến lần hỏi lại thành một lần thanh toán mới.",
                "Cần kết quả từ nơi xử lý, không chỉ bằng chứng đã gửi.",
                ["authorize", "key", "simulator", "unknown"],
            ),
            b(
                "Chuyến xong vẫn có thể còn việc thu tiền",
                "Khi hành khách đến nơi, chuyến có thể hoàn tất nhưng hệ thống còn phải theo dõi việc thu tiền. Hai việc này có kết quả riêng.",
                [
                    "Tài xế gọi bắt đầu rồi gọi hoàn tất trên đúng chuyến của mình.",
                    "Trip ghi nhận chuyến hoàn tất và giao cho Saga tiếp tục yêu cầu thu tiền.",
                    "Các lời nhờ cập nhật trạng thái tài xế và gửi thông báo cũng đi theo đường được lưu để phục hồi nếu cần.",
                ],
                "Mai đã xuống xe đúng điểm đến. Nếu phản hồi thu tiền bị mất, không thể biến chuyến thành “chưa đi”. Hệ thống giữ chuyến hoàn tất và giải quyết riêng phần tiền.",
                "Lùi trạng thái chuyến để che một kết quả thanh toán chưa rõ sẽ làm mất sự thật đã xảy ra. Saga giữ nghĩa vụ chưa xong hoặc yêu cầu người vận hành xem xét.",
                "Hoàn tất chuyến không tự chứng minh đã thu tiền.",
                ["capture", "saga", "unknown", "reconcile"],
            ),
        ],
    },
    authority: {
        foundation:
            "Một bản sao thông tin có thể hữu ích để tìm kiếm nhưng không có quyền quyết định. Bài này giúp bạn luôn hỏi: bộ phận nào sở hữu dữ liệu và được phép chốt kết quả?",
        objectives: [
            "Phân biệt nơi quyết định với bản sao tra cứu",
            "Hiểu vì sao mỗi bộ phận có kho riêng",
            "Biết giới hạn của một lần chốt dữ liệu",
        ],
        steps: [
            b(
                "Mỗi bộ phận giữ sổ riêng",
                "Hệ thống không có một kho dùng chung mà mọi bộ phận tùy ý sửa. Mỗi chương trình giữ dữ liệu thuộc trách nhiệm của mình.",
                [
                    "Identity giữ tài khoản; Driver giữ tài xế; Trip giữ chuyến.",
                    "Matching giữ các lượt tìm; Payment giữ thao tác thanh toán; Notification giữ hộp thông báo.",
                    "Một bộ phận muốn nhờ bộ phận khác đổi dữ liệu phải đi qua cửa giao tiếp hoặc thông điệp đã quy định.",
                ],
                "Trip ghi nhận chuyến đã hủy không có nghĩa tài xế trong kho Driver đã được giải phóng ngay cùng thời điểm. Trip còn phải gửi nghĩa vụ giải phóng.",
                "Không có một nút chốt duy nhất khiến mọi kho thay đổi đồng thời. Phải thiết kế cách tiếp tục khi một phần xong mà phần khác còn chờ.",
                "Sổ riêng tạo ranh giới trách nhiệm và ranh giới chốt dữ liệu.",
                ["service", "database", "transaction", "command"],
            ),
            b(
                "Trip quyết định chuyện của chuyến",
                "Trip biết chuyến đang tìm xe, đang chạy hay đã hủy. Nó có thể giữ một tham chiếu đến tài xế, nhưng không được tự sửa dữ liệu tài xế.",
                [
                    "Trip lưu trạng thái chuyến và giá đã chốt cho yêu cầu đó.",
                    "Nó lưu mã tài xế và mã lần giữ được báo về từ nơi có quyền quyết định.",
                    "Khi cần giải phóng tài xế hoặc xử lý tiền, nó ghi lời nhờ để bộ phận sở hữu tự thực hiện.",
                ],
                "Trong sổ chuyến có tên An không có nghĩa Trip có quyền tự ghi “An rảnh rồi”. Chỉ Driver mới được kiểm tra và đổi trạng thái của An.",
                "Nếu nhiều bộ phận cùng tự quyết một sự thật, chúng có thể đưa ra hai kết quả trái nhau. Quyền sở hữu rõ ràng giúp tìm nơi cần kiểm tra khi có nghi ngờ.",
                "Có tham chiếu đến dữ liệu không có nghĩa được quyền sửa nó.",
                ["authority", "reservation", "saga", "outbox"],
            ),
            b(
                "Driver quyết định tài xế có được giữ không",
                "Chỉ Driver được xác lập việc một tài xế đang được dành cho chuyến nào. Các bộ phận khác phải nhờ nó, kể cả khi đang có dữ liệu tra cứu.",
                [
                    "Yêu cầu giữ xe đi tới Driver với thông tin nhận diện lần giữ.",
                    "Driver đọc trạng thái mới nhất trong giao dịch được bảo vệ.",
                    "Chỉ lần chốt thành công mới làm việc giữ trở thành sự thật; lệnh không hợp lệ không được thay đổi hàng.",
                ],
                "Nếu danh sách tìm kiếm vẫn nói An rảnh nhưng Driver đã giữ An cho Mai, yêu cầu mới phải bị từ chối dù danh sách trông có vẻ hợp lệ.",
                "Độ mới của bản tra cứu không thể thay thế một nơi duy nhất phân xử cạnh tranh. Quy tắc bảo vệ phải nằm ở đường ghi thật.",
                "Muốn biết ai giữ tài xế, hỏi Driver thay vì đoán từ bản sao tra cứu.",
                ["authority", "lock", "commit", "fencing"],
            ),
            b(
                "Bản sao có thể trễ mà vẫn hữu ích",
                "Redis giúp tìm xe nhanh; hộp thông báo giúp người dùng xem tin. Cả hai là dữ liệu phục vụ đọc, không được tự quyết sự thật của chuyến hoặc tiền.",
                [
                    "Các thay đổi từ nơi sở hữu được gửi ra thành thông điệp.",
                    "Bộ phận nhận cập nhật bản tra cứu hoặc hộp thông báo riêng của mình.",
                    "Trong khoảng tin chưa tới, bản sao có thể còn cũ. Hành động quan trọng vẫn phải được nơi sở hữu kiểm tra.",
                ],
                "Mai có thể nhận thông báo chậm sau khi chuyến đã hoàn tất. Thông báo chưa tới không biến chuyến thành chưa hoàn tất; Trip vẫn giữ trạng thái đã kết thúc của hành trình.",
                "Chấp nhận bản sao cập nhật dần giúp tách các bộ phận. Tuy nhiên không được dùng sự chậm trễ đó để cho phép hai chuyến cùng giữ một tài xế.",
                "Dữ liệu đọc có thể chậm; quyền quyết định vẫn phải rõ.",
                ["projection", "redis", "event", "authority"],
            ),
        ],
    },
    "trip-lifecycle": {
        foundation:
            "Một chuyến giống một hồ sơ có các chặng hợp lệ. Mỗi thao tác phải kiểm tra hồ sơ đang ở chặng nào; không thể tùy ý nhảy từ vừa tạo sang đã hoàn tất.",
        objectives: [
            "Hiểu từng chặng của một chuyến",
            "Phân biệt giữ xe với tài xế đồng ý",
            "Biết vì sao chuyến đã hủy không được sống lại",
        ],
        steps: [
            b(
                "Tạo hồ sơ rồi mới bắt đầu tìm xe",
                "Một chuyến vừa được lưu chỉ ghi nhận nhu cầu đi lại. Hệ thống còn phải chuyển nó sang giai đoạn tìm tài xế.",
                [
                    "CREATED là tên trong code cho trạng thái vừa tạo.",
                    "Một thay đổi hợp lệ đưa chuyến sang MATCHING, nghĩa là đang tìm tài xế.",
                    "Cùng với thay đổi đó, Trip lưu việc cần báo cho Matching. Nó chưa có tài xế để hứa với hành khách.",
                ],
                "Mai vừa đặt thành công nhưng màn hình vẫn đang tìm xe. Đây là hai kết quả khác nhau: hồ sơ đã tồn tại, còn công việc tìm người đang tiếp tục.",
                "Mỗi lần đổi chặng đều có điều kiện. Nếu chương trình cho nhảy tùy ý, các bước kiểm tra cần thiết sẽ bị bỏ qua.",
                "Một yêu cầu hợp lệ phải được xét theo trạng thái hiện tại.",
                ["transaction", "outbox", "reservation"],
            ),
            b(
                "Được dành xe khác với tài xế đã nhận",
                "Trip cần phân biệt việc Driver đã giữ một người với việc chính người đó bấm chấp nhận chuyến. Dành xe không phải là tự nhận lời thay tài xế.",
                [
                    "Driver báo việc giữ với mã chuyến, mã giữ và lượt tìm cụ thể.",
                    "Trip chỉ nhận thông tin khớp với lượt và phân công hiện tại của mình.",
                    "Tài xế đúng phân công mới được bấm chấp nhận hoặc từ chối; không tin một mã tài xế do người gọi tự khai.",
                ],
                "An được giữ cho Mai. Một tài khoản tài xế khác không được bấm nhận thay An, dù họ biết mã chuyến của Mai. Trip cần kiểm đúng người đang được phân công.",
                "Danh tính người thao tác và mã lần giữ đều quan trọng. Chỉ kiểm tra trạng thái “đã có tài xế” là chưa đủ để bảo vệ chuyến.",
                "Phải đúng người, đúng chuyến và đúng lần giữ.",
                ["reservation", "fencing", "principal", "userDriver"],
            ),
            b(
                "Đủ điều kiện mới được khởi hành",
                "Tài xế đã nhận chưa đồng nghĩa được bắt đầu ngay. Trip còn cần kết quả cho phép thanh toán hợp lệ trước khi chấp nhận yêu cầu khởi hành.",
                [
                    "Sau chấp nhận, Trip chờ bước cho phép thu tiền về sau.",
                    "Thành công hợp lệ đưa chuyến sang READY_TO_START, tức sẵn sàng bắt đầu.",
                    "Tài xế gọi bắt đầu để chuyến đang chạy; sau đó mới gọi hoàn tất. Saga theo dõi phần nghĩa vụ thanh toán riêng.",
                ],
                "Mai và An đã đồng ý đi nhưng việc kiểm tra thanh toán đang chờ. Cho xe khởi hành ngay sẽ bỏ qua điều kiện mà repo yêu cầu.",
                "Hai sổ theo dõi có mục đích khác nhau: trạng thái chuyến nói hành trình đến đâu, Saga nói còn nghĩa vụ liên bộ phận nào chưa xong.",
                "Đọc trạng thái chuyến và trạng thái thanh toán riêng biệt.",
                ["authorize", "capture", "saga"],
            ),
            b(
                "Chuyến đã hủy không được tự sống lại",
                "Một chuyến đã hủy hoặc tìm xe thất bại phải giữ kết quả đó. Tin đến muộn có thể tạo việc dọn dẹp, không được làm chuyến hoạt động trở lại.",
                [
                    "Trip lưu trạng thái kết thúc cùng lý do phù hợp.",
                    "Sau đó vẫn có thể nhận tin cũ, như báo vừa giữ được xe hoặc vừa cho phép thanh toán.",
                    "Trip nhận ra chuyến đã kết thúc và lưu nghĩa vụ bỏ giữ xe hoặc hủy quyền thu tiền khi cần.",
                ],
                "Mai hủy trong khi tin “An đã được giữ” còn trên đường. Khi tin tới, hệ thống cần bỏ giữ An đúng cách, không tự đặt lại chuyến cho Mai.",
                "Kết thúc hồ sơ không làm mọi tác động bên ngoài biến mất. Bỏ qua tin muộn hoàn toàn có thể khiến xe hoặc tiền bị kẹt.",
                "Không khởi động lại chuyến; vẫn giải quyết nghĩa vụ còn lại.",
                ["terminal", "compensation", "void", "outbox"],
            ),
        ],
    },
    idempotency: {
        foundation:
            "Ứng dụng có thể phải gửi lại một yêu cầu vì mạng không ổn định. Ta cần phân biệt “gửi lại cùng một việc” với “yêu cầu một việc mới”. Đây là nền tảng để tránh tạo trùng chuyến và tác động thanh toán.",
        objectives: [
            "Gửi lại yêu cầu mà không tạo chuyến mới",
            "Biết vì sao cùng mã nhưng đổi nội dung là lỗi",
            "Hiểu cách kho dữ liệu chặn yêu cầu đua nhau",
        ],
        steps: [
            b(
                "Không thấy câu trả lời chưa chắc là chưa làm",
                "Trip có thể đã lưu chuyến nhưng câu trả lời không về đến điện thoại. Lúc này điện thoại chưa biết kết quả thật, chứ không chứng minh Trip đã thất bại.",
                [
                    "Ứng dụng gửi một lần đặt có mã nhận diện để lần hỏi sau có thể tìm đúng việc này.",
                    "Trip có thể chốt chuyến trước khi đường mạng bị đứt.",
                    "Ứng dụng gửi lại bằng đúng mã cũ để Trip tìm ra lần đặt đã xử lý.",
                ],
                "Mai không thấy màn hình đổi nên ứng dụng thử lại. Nếu lần hai có mã mới, nó đang tự giới thiệu như một lần đặt khác dù Mai chỉ muốn đặt một chuyến.",
                "Câu trả lời và tác động là hai thứ có thể tách rời trên mạng. Mã ổn định giúp nối lần hỏi sau với việc trước.",
                "Mất phản hồi là lý do giữ nguyên mã, không phải đổi mã.",
                ["timeout", "key", "commit", "idempotency"],
            ),
            b(
                "Nhận ra yêu cầu cũ và trả kết quả cũ",
                "Trip tra mã trước để biết lần đặt này đã được xử lý hay chưa. Nếu cả mã và nội dung đều khớp, nó dùng kết quả đã có.",
                [
                    "Trip tìm theo hành khách và mã yêu cầu để không nhầm mã của hai người khác nhau.",
                    "Nó so dấu nhận diện nội dung để chắc đây vẫn là cùng điểm đón và điểm đến.",
                    "Nếu khớp, nó trả lại chuyến cũ trước cả bước kiểm tra hành khách đang có chuyến hoạt động.",
                ],
                "Mai vừa tạo chuyến nên đang có một chuyến hoạt động. Lần gửi lại của chính yêu cầu đó vẫn cần trả chuyến cũ, không được báo sai rằng Mai đang đặt thêm chuyến.",
                "Nếu kiểm tra “đã có chuyến” trước, chương trình có thể từ chối nhầm chính lần thử lại cần thiết sau mất phản hồi.",
                "Nhận biết yêu cầu cũ phải đi trước kiểm tra tạo việc mới.",
                ["scope", "fingerprint", "replay"],
            ),
            b(
                "Giữ mã cũ nhưng đổi điểm đến là xung đột",
                "Một mã nhận diện chỉ gắn với một ý định. Không được dùng nó để sửa ngầm nội dung của yêu cầu đã được chốt.",
                [
                    "Trip tìm thấy mã cũ đã thuộc về một yêu cầu trước.",
                    "Nó phát hiện điểm đón hoặc điểm đến đã đổi nên dấu nội dung không khớp.",
                    "Hệ thống báo xung đột và giữ nguyên dữ liệu gốc, thay vì ghi đè hay tạo hiệu ứng mới.",
                ],
                "Mai dùng mã K cho nhà → trường. Sau đó một yêu cầu khác dùng K cho nhà → sân bay. Hai hành trình không được coi là cùng một lần đặt.",
                "Nếu cứ thấy mã trùng là trả thành công hoặc ghi đè, ứng dụng sẽ không biết thực sự chuyến nào đã được tạo. Mã cũng không được tự đổi hoa thường hay cắt khoảng trắng.",
                "Cùng mã chỉ được gửi lại cùng nội dung.",
                ["key", "fingerprint", "idempotency"],
            ),
            b(
                "Hai yêu cầu đến cùng lúc vẫn phải có người phân xử",
                "Kiểm tra trước khi lưu giúp đưa ra thông báo dễ hiểu, nhưng hai chương trình có thể cùng kiểm tra trước khi bên nào kịp ghi.",
                [
                    "Cả hai yêu cầu có thể cùng thấy “chưa có mã này” hoặc “chưa có chuyến hoạt động”.",
                    "Quy tắc không trùng ngay trong PostgreSQL ngăn hai bản ghi vi phạm cùng được chốt.",
                    "Bên ghi thua đọc lại dữ liệu đã được chốt để trả kết quả chuẩn hoặc báo xung đột phù hợp.",
                ],
                "Hai cửa thu ngân cùng nhìn một chỗ còn trống chưa đủ để cả hai bán được chỗ đó. Trong hệ thống này, kho dữ liệu là nơi ngăn hai lần ghi cùng thắng.",
                "Ví dụ thu ngân chỉ mô tả sự cạnh tranh. Cơ chế thật là ràng buộc của PostgreSQL, không phải dựa vào một người điều phối bằng tay.",
                "Kiểm tra trước hỗ trợ trải nghiệm; ràng buộc kho mới chặn được đua nhau.",
                ["unique", "transaction", "commit", "replay"],
            ),
        ],
    },
};

Object.assign(beginnerLessons, {
    matching: {
        foundation:
            "Matching nghĩa là tìm người phù hợp cho chuyến. Tìm kiếm chỉ chọn ứng viên; việc giữ tài xế vẫn do Driver quyết định. Bài này còn giải thích cách tiếp tục tìm sau khi chương trình bị tắt.",
        objectives: [
            "Biết vì sao xe gần chưa đủ điều kiện",
            "Hiểu vì sao phải lưu cả danh sách và từng lần thử",
            "Biết khi nào được chuyển sang ứng viên khác",
        ],
        steps: [
            b(
                "Nhận việc xong phải nhớ được việc đó",
                "Matching cần lưu yêu cầu tìm xe trước khi báo đã nhận xong. Nếu chỉ giữ trong trí nhớ tạm của chương trình, một lần tắt có thể làm mất công việc.",
                [
                    "Thông điệp tới chứa chuyến cần tìm và điểm đón.",
                    "Matching lưu lượt tìm cùng mã thông điệp vào kho riêng rồi mới xác nhận xử lý.",
                    "Một chương trình làm việc nền quét các lượt chưa xong trong kho và tiếp tục xử lý.",
                ],
                "Máy chạy Matching tắt ngay sau khi báo nhận. Khi bật lại, nó đọc lượt tìm đã lưu và tiếp tục, thay vì phải trông chờ yêu cầu được gửi lại.",
                "Thông điệp đã được xác nhận có thể không được giao nữa. Vì vậy việc cần làm phải tồn tại trong dữ liệu bền vững trước thời điểm xác nhận.",
                "Báo đã nhận chỉ sau khi đủ dữ liệu để làm tiếp.",
                ["round", "database", "ack", "commit"],
            ),
            b(
                "Lọc xe không còn phù hợp",
                "Redis có thể cho biết xe nào gần, nhưng vị trí và tình trạng đó có thể đã cũ. Matching phải sàng lọc trước khi chọn người để thử giữ.",
                [
                    "Tìm nhiều ứng viên trong vùng quanh điểm đón, trong giới hạn đã cấu hình.",
                    "Loại tài xế không sẵn sàng, vị trí quá cũ, không đủ điều kiện hoặc từng bị loại theo chính sách.",
                    "Những người còn lại được đưa vào bước xếp thứ tự; họ vẫn chưa được giữ cho chuyến.",
                ],
                "An cách Mai gần nhất trên danh sách nhưng vị trí đã quá cũ. Bình xa hơn một chút nhưng còn sẵn sàng và vị trí mới có thể là ứng viên hợp lệ hơn.",
                "Danh sách chỉ giúp giảm việc thử vô ích. Dù qua bộ lọc, tài xế vẫn có thể vừa được chuyến khác giữ; Driver phải kiểm tra lần cuối.",
                "Gần nhất khác với hợp lệ, và hợp lệ khác với đã được giữ.",
                ["redis", "geo", "projection", "reservation"],
            ),
            b(
                "Chốt danh sách để khởi động lại vẫn theo đúng việc",
                "Matching lưu danh sách và thứ tự dùng cho lượt hiện tại. Nó cũng lưu mã cho từng lần thử giữ, để không quên mình đã nhờ Driver làm gì.",
                [
                    "Ứng viên được xếp theo quy tắc cố định, gồm khoảng cách và điều kiện cấu hình.",
                    "Nếu ngang nhau, mã tài xế giúp phân định thứ tự rõ ràng.",
                    "Danh sách cùng từng lần thử và mã giữ được lưu trong matching_db, kho của Matching.",
                ],
                "Matching đã chọn An trước Bình rồi máy tắt. Sau khi bật lại, nó đọc danh sách và lần thử cũ, thay vì nhìn bản tra cứu mới và vô tình khởi động một ý định khác.",
                "Không lưu đầu vào và danh tính công việc sẽ khiến lần phục hồi không biết mình đang tiếp tục hay làm lại từ đầu.",
                "Lưu cả thứ tự ứng viên lẫn mã của từng lần thử.",
                ["snapshot", "attempt", "key", "database"],
            ),
            b(
                "Chưa rõ đã giữ được xe thì phải hỏi lại",
                "Một chương trình làm nền được giao xử lý lượt tìm. Nếu nó chết, chương trình khác có thể tiếp quản, nhưng không được bỏ qua lần giữ xe còn chưa rõ kết quả.",
                [
                    "Một khóa theo lượt giúp tránh hai tiến trình cùng xử lý lượt đó.",
                    "Tiến trình đọc các lần thử chưa giải quyết và hỏi Driver bằng đúng mã giữ cũ.",
                    "Chỉ khi biết ứng viên bị từ chối dứt khoát mới được chuyển tiếp. Chưa biết kết quả thì phải chờ giải quyết.",
                ],
                "Matching nhờ giữ An rồi bị mất phản hồi. Nếu thử giữ Bình ngay, An có thể cũng đã được giữ. Hỏi lại việc giữ An trước sẽ tránh tạo hai tác động.",
                "Khóa của tiến trình tự mất khi nó chết, nhưng dữ liệu về lần thử vẫn còn. Hai cơ chế phục vụ hai mục đích khác nhau.",
                "Một lần thử chưa rõ phải được giải quyết trước khi thử người tiếp.",
                ["lease", "attempt", "unknown", "reconcile"],
            ),
            b(
                "Tin cũ không được ghi đè vị trí và trạng thái mới",
                "Thông điệp cập nhật tài xế có thể đến không theo thứ tự. Redis cần nhận biết bản nào mới để không làm danh sách ứng viên sai đi.",
                [
                    "Thông điệp mang thông tin phiên bản, phiên hoạt động và thứ tự vị trí liên quan.",
                    "Một đoạn xử lý trong Redis kiểm tra các điều kiện rồi cập nhật cùng nhau.",
                    "Tin thuộc phiên không hợp lệ hoặc đã cũ không được tự ghi đè dữ liệu hiện tại.",
                ],
                "Tin “An còn rảnh” được gửi trước nhưng tới sau tin “An đã được giữ”. Nếu cứ lấy tin đến sau cùng, danh sách sẽ nhầm An đang rảnh.",
                "Bản tra cứu sai có thể gây nhiều lần thử vô ích. Dù vậy nó vẫn không được cấp quyền giữ xe; quyền thật còn được Driver bảo vệ.",
                "Mới đến không đồng nghĩa là thông tin mới hơn.",
                ["projection", "version", "redis", "event"],
            ),
        ],
    },
    "driver-race": {
        foundation:
            "Khi hai hành khách cùng muốn một tài xế, ta cần một điểm quyết định ai được giữ người đó. Đây là bài toán cạnh tranh: các yêu cầu có thể chạy gần như đồng thời, không chờ nhau từ đầu.",
        objectives: [
            "Nhìn thấy khoảng hở giữa đọc và ghi",
            "Biết khóa hàng và phiên bản bảo vệ điều gì",
            "Hiểu vì sao lệnh giải phóng phải đúng mã giữ",
        ],
        steps: [
            b(
                "Hai chuyến cùng nhìn thấy một xe rảnh",
                "Hai lần tìm xe có thể cùng thấy An sẵn sàng trong Redis. Đây là tình huống hệ thống phải chịu được, không phải bằng chứng rằng dữ liệu chỉ được phép có một người đọc.",
                [
                    "Mai và Lan gửi hai yêu cầu đặt độc lập, mỗi người cần một chuyến riêng cho mình.",
                    "Matching của cả hai đều có thể đề xuất cùng An từ bản tra cứu.",
                    "Cả hai phải tới Driver xin giữ xe. Danh sách Redis không thể tự tuyên bố người thắng.",
                ],
                "Một bảng danh sách ghi “An rảnh” có thể được nhiều người xem cùng lúc. Người xem đầu tiên chưa có quyền mặc nhiên lấy An nếu chưa được Driver chốt.",
                "Đọc thông tin trước và hành động sau có khoảng cách thời gian. Trong khoảng đó, một yêu cầu khác có thể đã thay đổi sự thật.",
                "Nhiều người có thể cùng thấy rảnh; chỉ một lần giữ được chốt.",
                ["projection", "reservation", "authority"],
            ),
            b(
                "Cho từng yêu cầu kiểm tra đúng hàng mới nhất",
                "Driver dùng khóa trên hàng tài xế để các yêu cầu cùng sửa phải chờ nhau. Nó kiểm tra lại sau khi có khóa, thay vì tin dữ liệu đã đọc từ trước.",
                [
                    "Yêu cầu A vào giao dịch và khóa hàng dữ liệu của An.",
                    "Yêu cầu B cùng sửa hàng đó phải chờ; A đọc trạng thái và phiên bản mới nhất.",
                    "A chỉ ghi nếu điều kiện hợp lệ rồi chốt. Không thực hiện cuộc gọi mạng trong đoạn giữ khóa này.",
                ],
                "Có thể hình dung chỉ một người được cầm sổ của An để kiểm tra và ghi tại một thời điểm. Cơ chế thật do PostgreSQL thực hiện, không cần một người đứng canh.",
                "Khóa sắp thứ tự các người sửa; kết quả giữ xe chỉ thành chính thức khi giao dịch chốt thành công. Có khóa không tự đồng nghĩa đã giữ được xe.",
                "Khóa trước, đọc mới, kiểm tra rồi mới chốt.",
                ["lock", "transaction", "version", "commit"],
            ),
            b(
                "Một người thắng; người còn lại không được ghi đè",
                "Khi A chốt việc giữ An, dữ liệu đã đổi. B phải nhìn thấy sự thay đổi đó và chấp nhận không thể giữ An cho chuyến khác.",
                [
                    "A ghi trạng thái đã giữ, mã giữ và phiên bản mới cùng việc cần gửi tin.",
                    "Sau đó B đọc dữ liệu hiện tại, thấy An không còn sẵn sàng hoặc phiên bản không còn khớp.",
                    "B nhận kết quả xung đột. Nó không được ghi đè lần giữ của A để tự trở thành người thắng.",
                ],
                "Nếu Mai được giữ An trước, yêu cầu của Lan không được ghi mã chuyến Lan lên hàng đó. Matching có thể tìm người khác khi đã có kết quả từ chối rõ ràng.",
                "Chống hai lần giữ không dựa vào hy vọng yêu cầu tới khác thời điểm. Nó nằm ở đường ghi và quy tắc của Driver.",
                "Chỉ chốt thành công mới xác lập ai đang giữ tài xế.",
                ["reservation", "version", "commit", "outbox"],
            ),
            b(
                "Lệnh bỏ giữ cũ không được làm hỏng chuyến mới",
                "Sau một lần giữ, hệ thống còn cần bỏ giữ đúng lúc. Lệnh cũ có thể tới muộn, nên không thể chỉ ra lệnh “cho An rảnh lại” mà không kiểm mã.",
                [
                    "Lệnh giải phóng mang thông tin chuyến, lượt tìm và mã giữ của lần cần dọn.",
                    "Driver so chúng với lần giữ đang có trên hàng tài xế.",
                    "Nếu không khớp, nó không được xóa lần giữ hiện tại. Một lần giải phóng lặp đúng danh tính có thể trả lại kết quả phù hợp.",
                ],
                "Mai đã hủy và việc giữ cũ đã được dọn. Sau đó An được giữ cho Lan. Nếu một bản sao lệnh hủy cũ của Mai tới, nó không được làm An mất chuyến của Lan.",
                "Chỉ bảo vệ khi cấp quyền mà không bảo vệ khi thu hồi quyền vẫn có thể phá dữ liệu. Danh tính phải đi tới cả bước dọn dẹp.",
                "Giải phóng phải đúng lần giữ, không chỉ đúng tên tài xế.",
                ["fencing", "reservation", "replay", "round"],
            ),
        ],
    },
    outbox: {
        foundation:
            "Một chương trình thường vừa cần lưu thay đổi, vừa cần báo bộ phận khác. Outbox là sổ việc phải gửi nằm trong chính kho dữ liệu, giúp nối hai việc vốn không thể chốt chung với mạng.",
        objectives: [
            "Hiểu vì sao có thể lưu xong nhưng quên gửi tin",
            "Biết cách ghi thay đổi và việc cần gửi cùng nhau",
            "Hiểu vì sao vẫn phải chịu được thông điệp trùng",
        ],
        steps: [
            b(
                "Chương trình có thể tắt giữa lưu và gửi",
                "Giả sử Trip lưu chuyến rồi gửi thẳng lời nhờ tìm xe. Có một khoảng giữa hai việc mà chương trình có thể tắt, làm tin không bao giờ được gửi.",
                [
                    "Lưu trước rồi gửi: chương trình có thể chết sau khi có dữ liệu nhưng trước khi phát tin.",
                    "Gửi trước rồi lưu cũng có vấn đề: bên nhận có thể xử lý tin cho một thay đổi chưa chốt.",
                    "Repo cần lưu cả ý định gửi thay vì coi hai thao tác mạng và kho là một lần chốt chung.",
                ],
                "Mai có hồ sơ chuyến trong kho nhưng Matching không nhận được lời nhờ nào. Chỉ nhìn thấy hồ sơ tồn tại chưa giải thích được vì sao không có ai tìm xe.",
                "PostgreSQL và RabbitMQ không tham gia một giao dịch chung trong thiết kế này. Đảo thứ tự gửi và lưu không tự xóa khoảng hở.",
                "Cần ghi nhớ việc gửi một cách bền vững.",
                ["transaction", "commit", "broker", "outbox"],
            ),
            b(
                "Ghi thay đổi và sổ việc gửi trong cùng lần chốt",
                "Trip đặt thay đổi nghiệp vụ và mục thông điệp cần gửi vào cùng kho. Nhờ vậy cả hai cùng có hoặc cùng không có sau một giao dịch.",
                [
                    "Chương trình chuẩn bị thay đổi trạng thái chuyến.",
                    "Nó thêm mục vào bảng Outbox mô tả thông điệp phải gửi.",
                    "Kho dữ liệu chốt cả hai cùng nhau. Một chương trình gửi tin có thể đọc mục này sau đó, kể cả sau lần khởi động lại.",
                ],
                "Có thể hình dung ghi đơn và ghi phiếu cần chuyển trong cùng hồ sơ. Phiếu trong ví dụ chính là hàng Outbox; việc chuyển thực tế vẫn diễn ra sau.",
                "Không còn tình trạng thay đổi đã chốt mà ý định gửi chỉ tồn tại trong trí nhớ tạm. Tuy nhiên việc có ý định chưa chứng minh người nhận đã xử lý.",
                "Chốt nghiệp vụ cùng ý định; gửi tin là bước tiếp theo.",
                ["transaction", "outbox", "commit"],
            ),
            b(
                "Chờ trạm chuyển xác nhận rồi mới đánh dấu đã gửi",
                "Chương trình chuyển tin đọc các mục Outbox đang chờ. Nó chỉ đánh dấu đã gửi sau khi RabbitMQ xác nhận lần gửi.",
                [
                    "Chương trình chọn và nhận xử lý các mục đang chờ để tránh việc gửi tranh nhau không kiểm soát.",
                    "Nó gửi thông điệp rồi chờ xác nhận từ RabbitMQ.",
                    "Sau xác nhận mới lưu trạng thái PUBLISHED, nghĩa là đã phát. Nếu broker ngừng, ý định vẫn còn chờ theo đường phục hồi.",
                ],
                "Giống gửi một bưu phẩm và nhận biên nhận từ nơi chuyển. Biên nhận chứng minh nơi chuyển đã nhận, không chứng minh người cuối cùng đã mở và xử lý bưu phẩm.",
                "Nếu đánh dấu đã gửi trước xác nhận, hệ thống có thể quên một tin chưa tới broker. Nếu chờ xác nhận, nó có căn cứ rõ ràng hơn cho đường gửi.",
                "Broker đã nhận khác với người xử lý đã làm xong.",
                ["outbox", "broker", "confirm", "ack"],
            ),
            b(
                "Tin có thể được gửi lại mà vẫn phải an toàn",
                "Broker có thể đã nhận tin nhưng chương trình gửi tắt trước khi lưu dấu đã gửi. Sau khi bật lại, nó vẫn thấy mục chưa xong và gửi lại.",
                [
                    "Lần đầu broker nhận một thông điệp có mã ổn định.",
                    "Kho của bên gửi chưa kịp ghi đã phát thì chương trình chết.",
                    "Lần phục hồi có thể phát lại cùng mã; bên nhận dùng dấu đã xử lý để không tạo tác động lần nữa.",
                ],
                "Matching có thể nhận hai bản tin cùng nói về một yêu cầu tìm xe. Hệ thống cần nhận ra chúng là cùng một việc, không tạo hai lượt chỉ vì có hai lần giao.",
                "Outbox bảo vệ việc không quên ý định gửi; nó không hứa mạng giao đúng một lần. Bên nhận vẫn phải chống lặp tác động.",
                "Cho phép giao lại, nhưng nhận diện để không làm nghiệp vụ hai lần.",
                ["confirm", "key", "dedup", "receipt"],
            ),
        ],
    },
    delivery: {
        foundation:
            "Nhận được thông điệp, làm xong công việc và báo đã làm xong là ba thời điểm khác nhau. Phải sắp thứ tự và ghi dấu đúng để khi có lỗi vẫn biết cần làm gì tiếp.",
        objectives: [
            "Biết lúc nào được báo đã xử lý",
            "Phân biệt thử lại với hỏi kết quả cũ",
            "Hiểu cách xử lý thông điệp không sửa được bằng thử lại",
        ],
        steps: [
            b(
                "Làm xong và lưu lại rồi mới báo xong",
                "Chương trình nhận thông điệp không được báo xong ngay khi vừa đọc. Nó phải đảm bảo kết quả và dấu đã xử lý đều được lưu trước.",
                [
                    "RabbitMQ giao thông điệp cho chương trình nhận.",
                    "Chương trình chốt thay đổi nghiệp vụ cùng dấu đã xử lý trong cùng giao dịch.",
                    "Chốt xong mới gửi ACK, tức lời xác nhận đã xử lý, về RabbitMQ.",
                ],
                "Nếu báo xong rồi mới ghi kết quả, chương trình có thể tắt ở giữa. Broker tin việc đã xong nên không giao lại, trong khi kết quả chưa tồn tại.",
                "Thứ tự này chấp nhận thông điệp có thể đến lại khi mất lời xác nhận, nhưng vẫn tránh quên tác động cần thực hiện.",
                "Không báo xong trước khi dữ liệu đã chốt.",
                ["queue", "ack", "receipt", "transaction"],
            ),
            b(
                "Nhận lại tin cũ mà không làm lại tác động",
                "Có trường hợp công việc đã chốt nhưng lời báo xong bị mất. Broker giao lại để chắc việc không bị quên. Bên nhận cần nhận ra đã làm việc này.",
                [
                    "Thông điệp tới lại với cùng mã và cùng phạm vi xử lý.",
                    "Chương trình tra dấu đã xử lý được lưu cùng kết quả trước đó.",
                    "Nếu đúng việc đã làm, nó không áp dụng lại tác động nghiệp vụ rồi xác nhận theo đường phù hợp.",
                ],
                "Một thông điệp yêu cầu cập nhật chuyến được giao lại sau khi chương trình khởi động. Dấu lưu cho biết tác động đã xảy ra, nên không được cập nhật thêm lần nữa.",
                "Ghi dấu riêng trước kết quả có thể làm mất việc. Ghi dấu riêng sau kết quả có thể làm lặp việc. Hai phần phải cùng chốt.",
                "Dấu đã xử lý phải đi cùng kết quả trong một giao dịch.",
                ["dedup", "receipt", "ack", "commit"],
            ),
            b(
                "Lỗi khác nhau cần cách giải quyết khác nhau",
                "Không phải cứ gặp lỗi là gửi lại. Trước hết cần biết yêu cầu sai, sự cố tạm thời hay việc đã xảy ra nhưng chưa rõ kết quả.",
                [
                    "Dữ liệu sai, thiếu quyền hoặc xung đột nghiệp vụ đi theo đường từ chối.",
                    "Nếu tác động trước chưa rõ, hỏi lại nơi quyết định bằng đúng mã thao tác.",
                    "Nếu là lỗi có thể tạm thời, mới dùng chính sách thử lại phù hợp; lỗi không tự hết cần đường xem xét riêng.",
                ],
                "Không nhận được phản hồi thu tiền khác với bị từ chối vì nội dung sai. Gửi lại bằng mã mới sau mất phản hồi có thể thành thêm một thao tác tiền.",
                "Phân loại theo hậu quả giúp chọn hành động an toàn. Số lần thử nhiều hơn không biến một điều chưa biết thành một kết quả chắc chắn.",
                "Chưa rõ tác động: hỏi lại, đừng đoán rồi làm mới.",
                ["unknown", "reconcile", "retry", "poison"],
            ),
            b(
                "Thử có giới hạn rồi chuyển việc lỗi ra nơi thấy được",
                "Một thông điệp lỗi không nên chiếm chương trình mãi. Repo có giới hạn thử lại và một hàng chờ riêng cho việc không xử lý được theo chính sách.",
                [
                    "Lỗi tạm thời có thể được thử lại trong ngân sách cho phép.",
                    "Giữa các lần có thời gian chờ; hết ngân sách thì chuyển sang đường lỗi.",
                    "Thông điệp sai cố định hoặc lỗi cấu hình có thể đi thẳng vào nơi cần xem xét thay vì quay vòng.",
                ],
                "Một thông điệp thiếu dữ liệu bắt buộc không tự đủ dữ liệu khi gửi lại hàng trăm lần. Giữ nó ở hàng chờ lỗi giúp người vận hành nhìn thấy vấn đề.",
                "Hàng chờ lỗi không phải thùng rác vô hình và cũng không phải thành công. Nó giữ việc lỗi ở một trạng thái có thể quan sát và xử lý tiếp.",
                "Hết khả năng tự phục hồi thì để lại dấu vết rõ ràng.",
                ["retry", "backoff", "dlq", "poison"],
            ),
        ],
    },
});

Object.assign(beginnerLessons, {
    saga: {
        foundation:
            "Một chuyến cần nhiều bộ phận cùng làm việc nhưng không có một lần chốt chung cho tất cả. Saga là sổ mà Trip lưu để biết đang chờ việc nào, việc nào phải làm tiếp hoặc cần bù trừ.",
        objectives: [
            "Hiểu cách theo dõi công việc chưa xong",
            "Phân biệt bù trừ với xóa mọi thứ như chưa xảy ra",
            "Biết xử lý khi chưa thể xác định kết quả",
        ],
        steps: [
            b(
                "Mở sổ theo dõi khi tài xế chấp nhận",
                "Khi đúng tài xế nhận chuyến, Trip bắt đầu quy trình theo dõi các việc liên quan thanh toán. Nó cần nhớ việc đang chờ ngay cả sau lần khởi động lại.",
                [
                    "Trip kiểm tra tài xế và lần giữ hiện tại trước khi nhận thao tác chấp nhận.",
                    "Trip ghi trạng thái đã chấp nhận và tạo hồ sơ Saga.",
                    "Trong cùng lần chốt, nó ghi yêu cầu Payment cho phép thanh toán. Hồ sơ mới bắt đầu ở trạng thái đang chờ bước đó.",
                ],
                "An bấm nhận chuyến của Mai. Nếu Trip tắt sau khi chốt, hồ sơ vẫn chỉ ra rằng có một yêu cầu cho phép thanh toán cần được gửi hoặc chờ kết quả.",
                "Saga không tự sửa kho của Payment. Nó lưu lời nhờ và kết quả chờ để điều phối đúng qua các lần lỗi.",
                "Theo dõi việc còn phải làm bằng dữ liệu, không bằng trí nhớ tạm.",
                ["saga", "transaction", "outbox", "authorize"],
            ),
            b(
                "Một mã cho cùng một lần cho phép thanh toán",
                "Saga giữ mã ổn định cho bước cho phép thu tiền về sau. Mọi lần gửi hoặc hỏi lại của bước đó cần quy về đúng thao tác này.",
                [
                    "Trip chọn mã theo chuyến và mục đích, chẳng hạn phần đuôi authorize:v1.",
                    "Payment xử lý yêu cầu và trả lại kết quả gắn với mã đó.",
                    "Trip chỉ áp dụng kết quả hợp lệ với trạng thái hiện tại. Một bản sao đúng việc đã nhận không làm bước tiến thêm lần nữa.",
                ],
                "Mai mất phản hồi ở lần kiểm tra thanh toán. Hệ thống hỏi lại bằng cùng mã, giống hỏi tình trạng cùng một hồ sơ thay vì nộp thêm một hồ sơ khác.",
                "Tên mã gắn các lần trao đổi với cùng ý định. Nếu đổi mã để né lỗi, có thể vô tình biến việc cũ chưa rõ thành việc mới.",
                "Cùng một bước nghiệp vụ phải giữ cùng danh tính.",
                ["key", "authorize", "replay", "version"],
            ),
            b(
                "Chuyến hoàn tất rồi vẫn tiếp tục phần thu tiền",
                "Saga không ép mọi việc phải kết thúc cùng lúc. Nó có thể tiếp tục thu tiền sau khi Trip đã ghi nhận hành trình hoàn tất.",
                [
                    "Trip lưu rằng chuyến đã hoàn tất theo thao tác tài xế hợp lệ.",
                    "Saga dùng mã riêng dành cho việc thu tiền và ghi yêu cầu cần gửi.",
                    "Nếu kết quả chưa rõ, phần tiền tiếp tục được hỏi lại hoặc được đưa ra xem xét; chuyến không bị lùi trạng thái.",
                ],
                "Mai đã tới nơi và An đã kết thúc hành trình. Mạng ở phần thanh toán chập chờn không thể làm sự kiện Mai đã đi xong trở thành chưa xảy ra.",
                "Thu tiền là nghĩa vụ cần được theo dõi tiếp, không phải lý do bóp méo lịch sử chuyến. Repo mô phỏng việc thu tiền, không tác động ngân hàng thật.",
                "Giữ sự thật chuyến đã xong, giải quyết phần tiền riêng.",
                ["capture", "saga", "unknown", "simulator"],
            ),
            b(
                "Bù trừ bằng việc mới có kiểm tra",
                "Khi chuyến không tiếp tục, hệ thống cần xử lý những gì đã làm, như bỏ giữ tài xế hoặc hủy quyền thu tiền đã được cho phép.",
                [
                    "Trip ghi nhận ý định hủy và những nghĩa vụ cần dọn.",
                    "Driver nhận lời nhờ giải phóng với đúng mã lần giữ, không được đụng chuyến khác.",
                    "Nếu đã có quyền thu tiền không còn dùng, Payment nhận yêu cầu hủy quyền đó theo đúng thao tác.",
                ],
                "Mai hủy sau khi An đã nhận và thanh toán đã được cho phép. Hệ thống cần trả An về trạng thái phù hợp và hủy quyền thu chưa dùng, không chỉ xóa hồ sơ của Mai.",
                "Đây là những việc mới, có thể chậm hoặc lỗi và cần phục hồi. Nó không phải một nút làm mọi bộ phận trở lại tức thì như chưa từng có chuyện gì.",
                "Bù trừ có danh tính, điều kiện và quá trình phục hồi riêng.",
                ["compensation", "fencing", "void", "rollback"],
            ),
            b(
                "Không biết thì ghi rõ cần xem xét",
                "Có lúc hệ thống tự hỏi lại nhiều lần vẫn chưa đủ bằng chứng để kết luận. Nó cần một trạng thái trung thực để người vận hành biết còn điều chưa giải quyết.",
                [
                    "Các lần phục hồi có thời gian chờ và số lần cho phép.",
                    "Nếu vẫn chưa xác định được sự thật từ nơi xử lý, hệ thống giữ thông tin chưa rõ.",
                    "Saga có thể chuyển sang REQUIRES_REVIEW, tức cần xem xét, thay vì gán đại thành công hoặc thất bại.",
                ],
                "Không thể xác định thao tác tiền của Mai đã xảy ra sau ngân sách hỏi lại. Việc đánh dấu “thất bại” cho gọn hồ sơ có thể làm người khác thực hiện thêm một lần sai.",
                "Giới hạn nỗ lực không đồng nghĩa sự thật đã rõ. Trạng thái cần xem xét giúp tách “chưa tự xử lý được” khỏi một kết luận nghiệp vụ.",
                "Dừng tự phục hồi vẫn phải giữ nguyên điều chưa biết.",
                ["unknown", "reconcile", "backoff", "saga"],
            ),
        ],
    },
    unknown: {
        foundation:
            "Hai câu hỏi khác nhau: việc có xảy ra không, và bên gọi có biết nó đã xảy ra không? Mạng có thể làm chúng lệch nhau. Payment trong repo mô phỏng tình huống này bằng dữ liệu được lưu thật.",
        objectives: [
            "Hiểu chờ quá hạn không có nghĩa bị từ chối",
            "Biết vì sao tác động có thể tồn tại dù bên gọi lỗi",
            "Hỏi lại bằng đúng mã để không làm thêm việc mới",
        ],
        steps: [
            b(
                "Đặt tên ổn định cho một thao tác tiền",
                "Trước khi làm, Payment cần biết đây là thao tác nào, cho chuyến nào, số tiền và loại tiền gì. Mã thao tác giúp nhận biết nó về sau.",
                [
                    "Trip chọn một mã cho mục đích cho phép thanh toán của chuyến.",
                    "Payment lưu và kiểm tra nội dung quan trọng đi cùng mã.",
                    "Nếu cùng mã được dùng với loại thao tác, chuyến hoặc tiền khác, hệ thống báo xung đột thay vì ghi đè.",
                ],
                "Mã K đã dùng cho một lần cho phép thanh toán của Mai. Gửi K với số tiền khác không còn là hỏi lại đúng hồ sơ đó; Payment phải báo xung đột và giữ nội dung ban đầu.",
                "Repo dùng bên cung cấp thanh toán mô phỏng có sổ riêng. Bài học nói về cách bảo vệ một tác động, không khẳng định đang liên hệ ngân hàng.",
                "Mã giữ danh tính; nội dung giữ ý nghĩa của thao tác.",
                ["key", "authorize", "idempotency", "simulator"],
            ),
            b(
                "Bên kia đã làm nhưng câu trả lời bị mất",
                "Bên cung cấp có thể đã chốt tác động, trong khi bên gọi chỉ thấy chờ quá hạn. Trạng thái đúng lúc đó là chưa biết, không phải tự kết luận thất bại.",
                [
                    "Bộ mô phỏng ghi tác động vào sổ của nó bằng một giao dịch độc lập.",
                    "Phản hồi có thể bị mất, hoặc giao dịch phía gọi không hoàn tất.",
                    "Phía gọi ghi nhận UNKNOWN để còn hỏi lại đúng việc, không đoán rằng bên cung cấp chưa làm.",
                ],
                "Có thể hình dung bạn gửi một hồ sơ, nơi nhận đã xử lý nhưng giấy trả lời thất lạc. Trong repo, tác động được ghi vào sổ của bên mô phỏng, gọi là provider ledger; ví dụ này không phải giao dịch ngân hàng thật.",
                "Hủy giao dịch ở phía gọi không tự hủy giao dịch độc lập đã chốt ở bên mô phỏng. Hai phía không dùng chung một nút hoàn tác.",
                "Không nhận được trả lời khác với biết chắc chưa có tác động.",
                ["timeout", "unknown", "commit", "rollback"],
            ),
            b(
                "Hỏi tình trạng hồ sơ cũ trước khi làm lại",
                "Để thoát khỏi trạng thái chưa biết, hệ thống hỏi nơi có sổ tác động bằng đúng mã đã dùng từ đầu. Nó đang tìm kết quả của việc cũ, không xin làm một việc mới.",
                [
                    "Giữ nguyên mã của thao tác đang cần giải quyết.",
                    "Tra sổ của bên cung cấp để tìm tác động đã tồn tại cho mã đó.",
                    "Dùng kết quả đáng tin để xác định việc trước ra sao; không tự tạo mã mới rồi thực hiện lại.",
                ],
                "Nếu lần đầu của Mai có mã K, lần hỏi lại vẫn hỏi K. Đổi sang K2 giống nộp một hồ sơ mới trong lúc hồ sơ K có thể đã được xử lý.",
                "Mục đích là thu thập bằng chứng cho việc cũ. Việc gửi thêm thao tác mới không giải quyết được câu hỏi cũ và còn có thể tạo tác động thứ hai.",
                "Hỏi lại đúng danh tính để tìm kết quả, không nhân đôi công việc.",
                ["reconcile", "key", "unknown", "retry"],
            ),
            b(
                "Kết luận từ bằng chứng, hoặc để lại việc cần xem xét",
                "Một lần từ chối rõ ràng khác với nhiều lần chưa nhận được bằng chứng. Hệ thống phải giữ được sự khác biệt này.",
                [
                    "Có kết quả đáng tin thì Payment gửi về Trip theo đúng danh tính thao tác.",
                    "Nếu chưa có, chương trình chờ rồi hỏi lại trong giới hạn đã quy định.",
                    "Hết ngân sách mà vẫn chưa rõ thì giữ trạng thái cần xem xét, không tự ghi thành công hay thất bại.",
                ],
                "Bên mô phỏng trả “từ chối” là một kết quả xác định. Mạng im lặng qua nhiều lần chờ vẫn chỉ nói rằng ta chưa biết kết quả.",
                "Không thể biến thời gian chờ thành bằng chứng. Chính sách phục hồi vừa cần hữu hạn vừa phải trung thực với điều chưa rõ.",
                "Bằng chứng quyết định kết quả; số lần hỏi không thay thế bằng chứng.",
                ["reconcile", "backoff", "unknown", "saga"],
            ),
        ],
    },
    cancellation: {
        foundation:
            "Bấm hủy là gửi một ý định nghiệp vụ, không phải xóa sạch mọi thứ đã diễn ra. Thông điệp cũ vẫn có thể tới; việc giữ xe hoặc cho phép thanh toán có thể đang trên đường hoàn thành.",
        objectives: [
            "Hiểu vì sao hủy cần lưu dấu",
            "Xử lý yêu cầu và tin hủy đến ngược thứ tự",
            "Dọn tác động cũ mà không khởi động lại chuyến",
        ],
        steps: [
            b(
                "Lưu rằng chuyến đã hủy thay vì xóa chuyến",
                "Trip kiểm tra yêu cầu hủy và lưu kết quả vào hồ sơ. Dữ liệu này giúp mọi tin đến sau biết chuyến không còn được hoạt động.",
                [
                    "Hành khách gửi thao tác hủy đúng chuyến của mình.",
                    "Trip áp dụng điều kiện rồi lưu trạng thái đã hủy.",
                    "Những nghĩa vụ còn phải dọn cũng được lưu để có thể gửi và tiếp tục sau lỗi.",
                ],
                "Mai hủy khi xe chưa tới. Nếu xóa hồ sơ hoàn toàn, tin giữ xe đến muộn có thể không biết rằng yêu cầu đã bị hủy và còn cần giải phóng tài xế.",
                "Trạng thái kết thúc là thông tin cần được bảo vệ. Nó không chứng minh việc ở Driver và Payment đã tự được dọn xong cùng lúc.",
                "Lưu ý định hủy và lưu cả việc còn phải giải quyết.",
                ["terminal", "outbox", "compensation"],
            ),
            b(
                "Tin hủy có thể tới trước tin đặt",
                "Hai thông điệp không nhất thiết được xử lý theo thứ tự ta gửi. Matching cần nhớ việc hủy ngay cả khi chưa thấy yêu cầu bắt đầu tìm xe.",
                [
                    "Thông điệp hủy tới trước và chưa có lượt tìm tương ứng.",
                    "Matching vẫn lưu dấu hủy theo danh tính của lượt đó.",
                    "Khi yêu cầu tìm xe tới muộn, chương trình thấy dấu và không tạo lần thử mới.",
                ],
                "Trip phát việc tìm xe rồi phát hủy, nhưng do hai đường xử lý, Matching đọc hủy trước. Nếu bỏ qua vì “chưa thấy yêu cầu”, lần đặt tới sau sẽ làm việc không còn được phép.",
                "Nhớ bằng dữ liệu giúp ý định hủy sống qua khởi động lại. Chỉ giữ dấu trong bộ nhớ tạm sẽ mất bảo vệ sau khi chương trình chết.",
                "Chưa thấy yêu cầu gốc vẫn phải lưu được việc đã hủy.",
                ["tombstone", "round", "event", "database"],
            ),
            b(
                "Ngừng thử mới nhưng vẫn hỏi lại việc đã phát đi",
                "Hủy lượt tìm không làm một yêu cầu giữ xe đã gửi ra tự biến mất. Nếu lần thử đó còn chưa rõ kết quả, hệ thống vẫn phải giải quyết nó.",
                [
                    "Matching không khởi động lần thử giữ một ứng viên mới cho lượt đã hủy.",
                    "Nó hỏi lại Driver bằng đúng mã của lần thử chưa rõ.",
                    "Nếu có tác động giữ xe, đường dọn dẹp cần giải phóng đúng lần giữ đó.",
                ],
                "Mai bấm hủy ngay sau khi Matching nhờ giữ An. Nếu Driver đã chốt nhưng câu trả lời mất, chỉ ngừng tìm thêm người sẽ vẫn để An bị giữ.",
                "Tách công việc tương lai khỏi tác động quá khứ giúp hủy không làm rò rỉ việc giữ tài xế. Kết quả chưa rõ cần hỏi, không được coi là chưa xảy ra.",
                "Hủy chặn việc mới; tác động cũ vẫn cần được xử lý.",
                ["unknown", "reconcile", "reservation", "fencing"],
            ),
            b(
                "Tin thanh toán muộn phải đi vào đường dọn",
                "Kết quả cho phép thanh toán có thể tới khi chuyến đã hủy. Nó không được mở lại chuyến; hệ thống cần xử lý quyền thu tiền không còn dùng.",
                [
                    "Trip nhận kết quả muộn và đối chiếu với trạng thái hủy hiện tại.",
                    "Quy trình đang bù trừ tạo nghĩa vụ hủy quyền thu tiền phù hợp.",
                    "Lệnh bỏ giữ tài xế cũng phải kiểm đúng lần giữ, tránh tác động một chuyến mới của cùng tài xế.",
                ],
                "Mai đã hủy nhưng tin “đã cho phép thanh toán” vừa tới. Kết quả đó cần được dọn bằng thao tác void phù hợp, không phải tự đặt lại chuyến cho Mai.",
                "Bỏ qua tin hoàn toàn có thể để lại tác động không được dọn. Chấp nhận tin rồi hồi sinh chuyến lại vi phạm ý định hủy. Cần nhánh xử lý riêng.",
                "Sự thật đến muộn có thể tạo việc dọn, không đổi ý định hủy.",
                ["terminal", "compensation", "void", "fencing"],
            ),
        ],
    },
    security: {
        foundation:
            "Hệ thống phải biết người gọi là ai và có được làm việc đang yêu cầu hay không. “Có đăng nhập” và “được điều khiển chuyến này” là hai câu hỏi riêng.",
        objectives: [
            "Hiểu giấy đăng nhập và quyền truy cập",
            "Biết vì sao không tin mã người dùng tự khai",
            "Phân biệt tài khoản với hồ sơ tài xế",
        ],
        steps: [
            b(
                "Đăng nhập để nhận giấy có thể kiểm chứng",
                "Identity là bộ phận giữ tài khoản và cấp giấy đăng nhập. Các bộ phận khác có thể kiểm chữ ký của giấy để biết nó hợp lệ.",
                [
                    "Người dùng đăng nhập bằng thông tin tài khoản đã được tạo.",
                    "Identity kiểm tra rồi cấp giấy ngắn hạn, mang danh tính và nhóm quyền.",
                    "Khi gọi công việc được bảo vệ, người dùng gửi giấy đó; nơi nhận vẫn phải kiểm quyền với công việc cụ thể.",
                ],
                "Giấy ghi Mai là hành khách giúp xác định người gọi. Nó không cho Mai quyền đọc chuyến của Lan hoặc thực hiện thao tác chỉ dành cho tài xế.",
                "Chữ ký giúp phát hiện giấy giả hoặc sửa. Nó không phải lý do bỏ kiểm tra ai sở hữu tài nguyên đang được yêu cầu.",
                "Xác định được người gọi rồi vẫn phải kiểm họ được làm gì.",
                ["jwt", "role", "principal", "service"],
            ),
            b(
                "Không tin lời tự khai “tôi là tài xế này”",
                "Gateway là cổng vào công khai. Nó phải loại các thông tin danh tính người dùng tự gắn thêm và chỉ dùng giấy đăng nhập đã kiểm chứng.",
                [
                    "Người gọi có thể tự thêm các trường như X-Driver-Id trong phần đầu yêu cầu.",
                    "Gateway bỏ các trường tự khai đó và kiểm giấy đăng nhập theo đường đã quy định.",
                    "Thiếu giấy hợp lệ bị từ chối; sai nhóm quyền cũng bị từ chối trước khi thực hiện công việc được bảo vệ.",
                ],
                "Một người ghi tên An lên yêu cầu không được biến thành An. Danh tính phải đến từ giấy do Identity ký, không phải tên tự ghi.",
                "Nếu tin trường tùy ý từ ứng dụng người gọi, họ có thể giả tài xế hoặc hành khách khác. Gateway trong repo làm chuyển tiếp và xác thực, không giữ dữ liệu chuyến.",
                "Danh tính đáng tin đến từ quá trình kiểm chứng.",
                ["gateway", "jwt", "principal", "role"],
            ),
            b(
                "Đến đúng bộ phận vẫn phải kiểm đúng người",
                "Bộ phận nhận không chỉ tin rằng yêu cầu đã qua cổng. Nó tự xác thực, rồi kiểm người gọi có đúng người được phân công cho chuyến không.",
                [
                    "Service nhận kiểm giấy đăng nhập và quyền phù hợp.",
                    "Với thao tác tài xế, Trip tra hồ sơ tài xế gắn với tài khoản qua Driver.",
                    "Nó so tài xế đã xác định với phân công hiện tại trước khi nhận bắt đầu hoặc hoàn tất chuyến.",
                ],
                "Tài khoản của An có mã U, hồ sơ tài xế có mã D. Không thể mặc định U chính là D chỉ vì cả hai trông như những chuỗi mã. Trip cần hỏi Driver để nối tài khoản với đúng hồ sơ.",
                "Một người thuộc nhóm tài xế vẫn không được thao tác chuyến của tài xế khác. Quyền cần được gắn tới đúng hồ sơ và phân công hiện tại.",
                "Đúng nhóm quyền chưa đủ; còn phải đúng người của chuyến.",
                ["userDriver", "principal", "fencing", "jwt"],
            ),
            b(
                "Có cửa nội bộ không có nghĩa khách được gọi",
                "Không phải mọi chương trình trong repo đều có cửa cho người dùng gọi qua Gateway. Matching và Payment là các bộ phận nội bộ.",
                [
                    "Người dùng đi qua các đường công khai như tài khoản, chuyến, tài xế và hộp thông báo.",
                    "Các bộ phận trao đổi công việc nội bộ bằng quyền dành cho chương trình.",
                    "Những cửa phục vụ mô phỏng hoặc kiểm thử không được mở trong cấu hình Production, tức môi trường vận hành chính thức.",
                ],
                "Mai đặt xe qua Trip, không tự gọi Payment để đánh dấu “đã thanh toán”. Nếu khách được tự đi tắt như vậy, họ có thể vượt điều kiện nghiệp vụ.",
                "Nhìn thấy một cửa giao tiếp trong code chưa đủ để kết luận nó được bật trong mọi môi trường hoặc có thể được gọi từ bên ngoài.",
                "Quyền và phạm vi mở cửa là một phần của hợp đồng giao tiếp.",
                ["api", "gateway", "role", "simulator"],
            ),
        ],
    },
    notification: {
        foundation:
            "Notification là bộ phận giữ hộp thông báo trong ứng dụng. Nó phản ánh sự việc để người dùng xem, nhưng không có quyền quyết định chuyến đã hủy hay tiền đã được xử lý.",
        objectives: [
            "Hiểu vì sao tin đến chậm không làm chuyến thất bại",
            "Tránh tạo hai thông báo khi nhận lại cùng tin",
            "Giữ thông báo đúng người nhận",
        ],
        steps: [
            b(
                "Người sở hữu dữ liệu phải chỉ đúng người nhận",
                "Thông báo cần một địa chỉ tài khoản rõ ràng. Bộ phận biết nghiệp vụ phải chọn người nhận từ dữ liệu của mình, thay vì đoán.",
                [
                    "Trip dùng mã tài khoản hành khách của chuyến; Driver dùng mã tài khoản gắn với hồ sơ tài xế.",
                    "Nó ghi thông điệp yêu cầu thông báo cùng ý định gửi phù hợp.",
                    "Thông điệp được chuyển tới chương trình hộp thông báo với nội dung được giới hạn, không mang giấy đăng nhập hay bí mật.",
                ],
                "Mã hồ sơ tài xế của An không mặc nhiên là mã tài khoản của An. Gửi tới nhầm loại mã có thể làm thông báo không tới đúng người.",
                "Notification không được đọc chéo kho của bộ phận khác để tự đoán. Cũng không nên nhét thông tin nhạy cảm vào một thông điệp chỉ để hiển thị tin.",
                "Đúng nội dung thôi chưa đủ; phải đúng tài khoản nhận.",
                ["userDriver", "event", "outbox", "principal"],
            ),
            b(
                "Nhận lại cùng tin chỉ tạo một mục trong hộp",
                "Worker nhận thông điệp rồi ghi hộp thông báo cùng dấu đã xử lý. Những dấu nhận diện giúp phân biệt giao lại đúng tin với tin bị đổi ý nghĩa.",
                [
                    "Chương trình ghi việc giao nhận và nguồn thông điệp theo phạm vi xử lý.",
                    "Một mục hộp thư được nhận diện bằng nguồn tin, người nhận và loại thông báo.",
                    "Chốt xong mới xác nhận xử lý; bản giao lại không tạo thêm mục giống hệt. Cùng mã đổi nội dung hoặc người nhận phải đi theo đường lỗi.",
                ],
                "Mai chỉ cần một tin “tài xế đã được phân công”. Nếu broker giao lại cùng thông điệp sau lần mất xác nhận, hộp thư không được hiện thêm bản sao.",
                "Chống trùng phải bảo vệ cả ý nghĩa, không chỉ số lượng. Đổi người nhận mà dùng mã cũ không phải một lần giao lại hợp lệ.",
                "Cùng một tin cho cùng người không được nhân đôi.",
                ["receipt", "dedup", "ack", "poison"],
            ),
            b(
                "Bộ phận thông báo dừng, chuyến vẫn đi tiếp",
                "Một lỗi ở hộp thông báo không nên thay đổi sự thật của chuyến hoặc tiền. Nó chỉ làm chậm việc người dùng nhận tin.",
                [
                    "Trip, Driver và Payment tiếp tục công việc theo quyền riêng của mình.",
                    "Thông báo chưa xử lý còn nằm trên đường bền vững để có thể tiếp tục.",
                    "Khi chương trình nhận thông báo hoạt động lại, nó đọc và xử lý các tin theo quy tắc chống trùng.",
                ],
                "Mai có thể đi xong chuyến khi bộ phận hộp thông báo đang dừng. Khi nó hoạt động lại, tin được đưa tới sau; chuyến không phải bị hủy chỉ vì chưa hiện thông báo.",
                "Đây là phạm vi cô lập lỗi có chủ đích. Web chỉ minh họa; kiểm thử dừng chương trình thông báo thật nằm trong kịch bản release-smoke của repo.",
                "Chậm nhận tin khác với nghiệp vụ chính chưa thành công.",
                ["projection", "queue", "dedup", "authority"],
            ),
            b(
                "Chỉ chủ tài khoản được đọc hộp của mình",
                "Hộp thông báo là dữ liệu riêng của người nhận. Chương trình lấy danh tính từ giấy đã kiểm tra để chọn đúng dữ liệu cho người đọc.",
                [
                    "Người dùng gọi cửa đọc hộp thông báo của bản thân.",
                    "Worker lấy mã tài khoản từ giấy đăng nhập đã được xác thực.",
                    "Nếu hỏi một thông báo thuộc người khác, hệ thống trả kết quả không tìm thấy theo hợp đồng, không cho đọc nội dung.",
                ],
                "Mai biết mã thông báo của Lan cũng không được xem nó. Biết địa chỉ một tài nguyên không tự tạo quyền sở hữu tài nguyên đó.",
                "Bản sao phục vụ hiển thị vẫn cần bảo vệ quyền riêng. Repo hiện có hộp thông báo trong ứng dụng, không có đường SMS, email hay thông báo đẩy điện thoại.",
                "Hiển thị thuận tiện vẫn phải kiểm người nhận thật.",
                ["jwt", "principal", "api", "projection"],
            ),
        ],
    },
    observability: {
        foundation:
            "Khi một yêu cầu đi qua nhiều chương trình, cần dấu vết để điều tra nó đi tới đâu. Nhưng nhìn một lần chạy tốt khác với chứng minh hệ thống luôn giữ được quy tắc dưới lỗi và cạnh tranh.",
        objectives: [
            "Lần theo yêu cầu qua nhiều bộ phận",
            "Phân biệt quan sát với bằng chứng đúng đắn",
            "Đọc kết quả kiểm thử đúng phiên bản và phạm vi",
        ],
        steps: [
            b(
                "Gắn các đoạn xử lý thành một hành trình",
                "Mỗi bộ phận có thể ghi lại phần việc mình làm. Dữ liệu nối dấu vết giúp biết các đoạn đó thuộc cùng một yêu cầu thay vì những việc không liên quan.",
                [
                    "Yêu cầu đi qua mạng mang thông tin nhận diện dấu vết.",
                    "Khi chương trình gửi thông điệp, thông tin liên kết cũng được truyền theo.",
                    "Công cụ có thể ghép các đoạn để người đọc lần từ cổng vào tới bộ phận xử lý.",
                ],
                "Một lần đặt của Mai đi qua Trip, hàng chờ rồi Driver. Các đoạn ghi cùng mối liên hệ giúp tìm chỗ đang chờ thay vì đoán từ tên service.",
                "Dấu vết là điều quan sát được ở một lần chạy. Để biết tài xế thực sự đang được giữ cho ai, vẫn phải đọc nơi có quyền quyết định.",
                "Dấu vết chỉ đường điều tra, không thay thế dữ liệu sở hữu.",
                ["trace", "span", "event", "authority"],
            ),
            b(
                "Dùng số đo để tìm nơi cần kiểm tra",
                "Các công cụ giám sát giúp thấy nhiều yêu cầu, lỗi và việc đang chờ. Chúng hữu ích để phát hiện vấn đề, nhưng cần đọc trong đúng ngữ cảnh.",
                [
                    "Jaeger là công cụ giúp xem các đoạn trong hành trình của một lần xử lý.",
                    "Prometheus thu các số đo; Grafana hiển thị chúng thành bảng theo dõi.",
                    "Khi thấy bất thường, người vận hành kiểm tra chi tiết và đối chiếu trạng thái thật ở bộ phận sở hữu.",
                ],
                "Nhiều thao tác đang chờ thanh toán có thể gợi ý cần điều tra Payment hoặc đường tin. Con số đó tự nó chưa nói mỗi thao tác đã thành công hay thất bại.",
                "Các hình ở web này là mô hình học, không phải số đo hệ thống đang chạy. Độ dài thanh trong minh họa không phải thời gian đo được.",
                "Dùng số đo để đặt câu hỏi, dùng bằng chứng để kết luận.",
                ["metric", "trace", "span", "authority"],
            ),
            b(
                "Tạo đúng tình huống lỗi rồi đối chiếu kết quả",
                "Muốn tin một quy tắc như “không giữ một tài xế cho hai chuyến”, cần kiểm tra những tình huống có thể phá nó, không chỉ chạy một chuyến suôn sẻ.",
                [
                    "Kiểm thử nhỏ kiểm tra điều kiện và thuật toán trong từng phần.",
                    "Kiểm thử kết hợp chạy qua kho dữ liệu và hàng chờ thật để kiểm ranh giới.",
                    "Bộ kiểm tra quy tắc đọc các bên Trip, Driver, Matching và Payment để đối chiếu điều gì đã được chốt.",
                ],
                "Cho hai yêu cầu cùng tranh An mới chạm vào bài toán cạnh tranh. Chạy từng chuyến lần lượt và thấy đều thành công không chứng minh được tình huống đồng thời.",
                "Công cụ quan sát và kiểm thử hỗ trợ nhau. Kết luận cần gắn với kịch bản đã thử và sự thật đọc từ các bên, không chỉ một màn hình màu xanh.",
                "Kiểm thử phải đánh vào tình huống có thể làm quy tắc sai.",
                ["authority", "transaction", "commit", "evidence"],
            ),
            b(
                "Bằng chứng phải nói rõ đã kiểm tra bản nào",
                "Kết quả kiểm thử chỉ có ý nghĩa khi biết bộ code, cách chạy và điều kiện của lần kiểm tra. Không thể lấy kết quả cũ bảo đảm mọi thay đổi về sau.",
                [
                    "Đọc mã phiên bản mà bằng chứng đang nhắc tới để xác định đúng bộ mã được kiểm tra.",
                    "Xem thủ tục tái hiện, kết quả và trạng thái cuối được ghi nhận.",
                    "Giữ đúng phạm vi kết luận: Payment là mô phỏng; bằng chứng khả dụng và hiệu năng không bao trùm mọi cách triển khai.",
                ],
                "Một bài thử RabbitMQ trên một máy không chứng minh toàn hệ thống vẫn hoạt động khi nhiều vùng địa lý cùng gặp lỗi. Kết quả phải được đọc đúng điều kiện đã thử.",
                "Mã nguồn thay đổi có thể làm kết quả không còn áp dụng. Gắn bằng chứng với một phiên bản giúp người sau kiểm tra lại thay vì dựa vào lời khẳng định chung.",
                "Biết bản nào, thử cách nào, rồi mới nói đã chứng minh điều gì.",
                ["evidence", "sha", "simulator", "trace"],
            ),
        ],
    },
});

export function beginnerFor(lesson, index) {
    const chapter = beginnerLessons[lesson.id];
    if (!chapter?.steps[index])
        throw new Error(`Missing beginner explanation: ${lesson.id}/${index}`);
    return {
        ...chapter.steps[index],
        foundation: chapter.foundation,
        objectives: chapter.objectives,
    };
}
