/**
 * @file translation.js
 * @description Contains translations for the website in English and Vietnamese, covering various sections such as navbar, RSVP, registry, and more.
 * @author Linh Nhi & Như Quỳnh
 * @date 24 January 2026
 */

const translations = {};

// English translations
translations.en = {
  couple: {
    her: "Như Quỳnh",
    him: "Linh Nhi",
    footer_her: "Như Quỳnh",
    footer_him: "Linh Nhi",
  },
  navbar: {
    welcome: "Welcome",
    save_the_date: "Save the Date",
    schedule: "Schedule",
    info: "Info",
    rsvp: "RSVP",
    registry: "Registry",
    music: "Music",
  },
  welcome_section: {
    small_text: "The wedding of...",
    days: "Days",
    day: "Day",
    hours: "Hours",
    hour: "Hour",
    minutes: "Minutes",
    minute: "Minute",
    seconds: "Seconds",
    second: "Second",
    button: "Save the Date",
  },
  saveTheDate_section: {
    title: "SAVE",
    title_cursive: "The Date",
    date: "5,6 February 2026",
    place: "Hậu Mỹ Phú, Cái Bè, Tiền Giang",
    story_1: "We met",
    story_2: "We got engaged",
    story_3_future: "We will get married",
    story_3_past: "We got married",
  },
  schedule_section: {
    title: { main: "SCHEDULE", sub: "Overview" },
    description:
      "Pre-wedding party on Thursday, 5th February. Main wedding ceremony on Friday, 6th February 2026.",
    day_1: {
      title: "Day 1 - Pre-Wedding",
      events: {
        ceremony: { time: "18:00", title: "Pre-wedding party begins" },
        dinner: { time: "19:00", title: "Dinner & gathering" },
        dance: { time: "20:00", title: "Entertainment & music" },
        photo: { time: "21:00 - 22:00", title: "Photo session" },
        pig: { time: "22:00", title: "Special dishes served" },
        games: { time: "22:30", title: "Traditional games & activities" },
        party: { time: "23:00 - Late", title: "Party continues" },
      },
    },
    day_2: {
      title: "Day 2 - Wedding Day",
      events: {
        after: { time: "08:00", title: "Groom's family arrives at bride's house" },
        cake_cutting: { time: "10:00", title: "Cake cutting ceremony" },
        party_continues: { time: "10:10", title: "Main wedding ceremony begins" },
        end: { time: "12:00", title: "Wedding concludes" },
      },
    },
  },
  info_section: {
    title: { main: "DETAILS", sub: "Information" },
    details: {
      when_where: "When & Where",
      dates: [
        { bold: true, text: "Date: " },
        "Thursday, 5th February & Friday, 6th February 2026.",
      ],
      location: [
        { bold: true, text: "Location: " },
        'Hậu Mỹ Phú Venue, Cái Bè, Tiền Giang.',
      ],
      button_loc: "VIEW LOCATION",
    },
    contact: { title: "Contact" },
  },
  rsvp_section: {
    top_title: "RSVP",
    title: { main: "RSVP", sub: "Attendance" },
    description_1: [
      { bold: true, text: "Please RSVP by 5th January 2026!" },
      " Find your name in the form and confirm your attendance.",
    ],
    description_2:
      "Please leave a note if you have any special requests, dietary requirements, or anything else to inform us about.",
    label: "Find your name in the guest list",
    placeholder: "Search for your name",
    no_found: "No guest found with this name",
    multiple_guests_1: {
      hi: "Hello ",
      you: ", ",
      and: " and ",
      are_invited: ", you are cordially invited to our special day.",
    },
    multiple_guests_2: "Select who will attend. We hope everyone can make it.",
    single_guest_1: {
      hi: "Hello ",
      are_invited: ", you are cordially invited to our special day.",
    },
    single_guest_2: "Will you be attending the wedding?",
    answers: { yes: "Yes", no: "No", unknown: "Undecided" },
    note_placeholder: "Would you like to leave a note?",
    rsvp_success: {
      thanks: "Thank you!",
      submitted: " Your RSVP has been submitted.",
      change_by: [
        "You can change your attendance at any time before ",
        { bold: true, text: "5th January 2026" },
        ".",
      ],
    },
    error_enter_name: "Please enter a response before submitting",
    error_submitting: "Error submitting RSVP. Please try again.",
    button: { submit: "Submit RSVP", loading: "Submitting..." },
  },
  registry_section: {
    title: { main: "Registry", sub: "List" },
    description_1: "Your presence is the most precious gift!",
    description_2:
      "However, if you wish to give a gift, we appreciate contributions via bank transfer to build our future together.",
    description_3:
      "In lieu of flowers and physical gifts, we would also be delighted to receive scratch cards or lottery tickets as a fun way to celebrate.",
    description_4:
      "International guests are kindly requested to consider sending gifts via bank transfer. Click the button below and enter the password found on the invitation card.",
    button: "View Bank Information",
    thanks: "THANK YOU!",
    error_from_api: "There was an error. Please try again later or contact us",
    error_incorrect_password: "Incorrect password",
    error_insert_password: "Insert password",
    account_holder: "Account Holder: ",
    iban: "IBAN: ",
    bank_name: "Bank Address: ",
    bic: "BIC / SWIFT: ",
    sort_code: "Sort Code: ",
    account_number: "Account Number: ",
    eur: "Eur",
    gbp: "GBP",
    pln: "Złoty",
    toast_copied: "Copied to clipboard",
    toast_error: "Unable to copy",
    dialog_title: { before: "Enter Password", after: "Correct Password" },
    placeholder: "Enter password",
    submit_button: { submit: "Submit", loading: "Verifying..." },
    copy_all: "Copy All",
  },
  music_section: {
    title: { main: "PLAYLIST", sub: "Our" },
    description:
      "Add your favorite songs to the playlist to create the perfect soundtrack for the wedding!",
    placeholder: "Enter song name",
    small_note:
      "* Some songs may not be playable here, but you can still add them to the playlist.",
    toast_success: { title: "Song Added", description: "Would you like to add another?" },
    toast_error: { title: "Unable to Add Song", description: "An error occurred. Please try again later." },
  },
  attending_guests_section: {
    title: { main: "GUESTS", sub: "Attending" },
    description: "List of guests who will attend our wedding",
    loading_text: "Loading guest list...",
    no_guests: "No guests have confirmed attendance yet.",
    total_attending: "Total attending",
  },
  footer: { text_1: "Website made with ", text_2: "by ", text_3: "Photos by" },
  not_found: { message: "The page you are looking for does not exist.", button: "Go Back" },
};


// Vietnamese translations
translations.vi = {
  couple: {
    her: "Như Quỳnh",
    him: "Linh Nhi",
    footer_her: "Như Quỳnh",
    footer_him: "Linh Nhi",
  },
  navbar: {
    welcome: "Chào mừng",
    save_the_date: "Save the Date",
    schedule: "Lịch trình",
    info: "Thông tin",
    rsvp: "Xác nhận",
    registry: "Registry",
    music: "Playlist",
  },
  welcome_section: {
    small_text: "Đám cưới của...",
    days: "Ngày",
    day: "Ngày",
    hours: "Giờ",
    hour: "Giờ",
    minutes: "Phút",
    minute: "Phút",
    seconds: "Giây",
    second: "Giây",
    button: "Save the Date",
  },
  saveTheDate_section: {
    title: "LƯU",
    title_cursive: "Ngày",
    date: "5,6 tháng 2 năm 2026",
    place: "Hậu Mỹ Phú, Cái Bè, Tiền Giang",
    story_1: "Chúng tôi gặp nhau",
    story_2: "Chúng tôi đính hôn",
    story_3_future: "Chúng tôi sẽ kết hôn",
    story_3_past: "Chúng tôi đã kết hôn",
  },
  schedule_section: {
    title: { main: "LỊCH", sub: "Trình tự" },
    description:
      "Tiệc trước đám cưới vào Thứ Năm, 5 tháng 2. Lễ cưới chính thức vào Thứ Sáu, 6 tháng 2 năm 2026.",
    day_1: {
      title: "Ngày 1 - Tiệc Trước Đám",
      events: {
        ceremony: { time: "18:00", title: "Bắt đầu tiệc trước đám cưới" },
        dinner: { time: "19:00", title: "Tiệc chiêu đãi & gặp mặt" },
        dance: { time: "20:00", title: "Giải trí & âm nhạc" },
        photo: { time: "21:00 - 22:00", title: "Chụp ảnh" },
        pig: { time: "22:00", title: "Dọn món đặc biệt" },
        cake_cutting: { time: "", title: "" },
        games: { time: "22:30", title: "Trò chơi dân gian & hoạt động" },
        party: { time: "23:00 - Khuya", title: "Tiệc tiếp tục" },
      },
    },
    day_2: {
      title: "Ngày 2 - Ngày Cưới",
      events: {
        after: { time: "08:00", title: "Nhà trai đến nhà cô dâu" },
        cake_cutting: { time: "10:00", title: "Nghi thức cắt bánh" },
        party_continues: { time: "10:10", title: "Bắt đầu lễ cưới chính thức" },
        end: { time: "12:00", title: "Kết thúc đám cưới" },
      },
    },
  },
  info_section: {
    title: { main: "CHI TIẾT", sub: "Thông tin" },
    details: {
      when_where: "Khi nào & Ở đâu",
      dates: [
        { bold: true, text: "Ngày: " },
        "Thứ Năm,6 tháng 2 & Thứ 6, 6 tháng 2 năm 2026.",
      ],
      location: [
        { bold: true, text: "Địa điểm: " },
        'Địa điểm Hậu Mỹ Phú, Cái Bè, Tiền Giang.',
      ],
      button_loc: "XEM ĐỊA ĐIỂM",
    },
    
    contact: { title: "Liên hệ" },
  },
  rsvp_section: {
    top_title: "RSVP",
    title: { main: "Xác nhận", sub: "Tham dự" },
    description_1: [
      { bold: true, text: "Vui lòng RSVP trước ngày 5 tháng 2 năm 2026!" },
      " Hãy tìm tên bạn trong form và xác nhận tham dự.",
    ],
    description_2:
      "Vui lòng để lại ghi chú nếu bạn có yêu cầu đặc biệt, chế độ ăn kiêng, hoặc điều gì khác muốn thông báo.",
    label: "Tìm tên bạn trong danh sách khách mời",
    placeholder: "Tìm tên của bạn",
    no_found: "Không tìm thấy khách mời với tên này",
    multiple_guests_1: {
      hi: "Xin chào ",
      you: " Bạn, ",
      and: " và ",
      are_invited: ", được trân trọng mời tham dự ngày trọng đại của chúng tôi.",
    },
    multiple_guests_2: "Chọn những ai sẽ tham dự. Hy vọng tất cả mọi người đều có thể tới.",
    single_guest_1: {
      hi: "Xin chào ",
      are_invited: " bạn được trân trọng mời tham dự ngày trọng đại của chúng tôi.",
    },
    single_guest_2: "Bạn có tham dự lễ cưới không?",
    answers: { yes: "Có", no: "Không", unknown: "Chưa biết" },
    note_placeholder: "Bạn muốn để lại ghi chú?",
    rsvp_success: {
      thanks: "Cảm ơn!",
      submitted: " RSVP của bạn đã được gửi.",
      change_by: [
        "Bạn có thể thay đổi việc tham dự bất kỳ lúc nào trước ",
        { bold: true, text: "5 tháng 2 năm 2026" },
        ".",
      ],
    },
    error_enter_name: "Vui lòng nhập câu trả lời trước khi gửi",
    error_submitting: "Lỗi khi gửi RSVP. Vui lòng thử lại.",
    button: { submit: "Gửi RSVP", loading: "Đang gửi..." },
  },
  registry_section: {
    title: { main: "Registry", sub: "Danh sách" },
    description_1: "Sự hiện diện của bạn là món quà quý giá nhất!",
    description_2:
      "Tuy nhiên, nếu bạn muốn tặng quà, chúng tôi đánh giá cao sự đóng góp bằng chuyển khoản để xây dựng tương lai chung.",
    description_3:
      "Thay cho hoa và quà vật chất, chúng tôi cũng vui nếu nhận vé cào hoặc vé số như một cách vui vẻ để chúc mừng.",
    description_4:
      "Khách quốc tế vui lòng cân nhắc gửi quà qua chuyển khoản ngân hàng. Nhấn nút bên dưới và nhập mật khẩu trên thiệp mời.",
    button: "Xem thông tin ngân hàng",
    thanks: "CẢM ƠN!",
    error_from_api: "Có lỗi. Thử lại sau hoặc liên hệ chúng tôi",
    error_incorrect_password: "Mật khẩu không đúng",
    error_insert_password: "Nhập mật khẩu",
    account_holder: "Người hưởng: ",
    iban: "IBAN: ",
    bank_name: "Địa chỉ ngân hàng: ",
    bic: "BIC / SWIFT: ",
    sort_code: "Mã sort: ",
    account_number: "Số tài khoản: ",
    eur: "Eur",
    gbp: "Bảng",
    pln: "Złoty",
    toast_copied: "Đã sao chép vào bộ nhớ tạm",
    toast_error: "Không thể sao chép",
    dialog_title: { before: "Nhập mật khẩu", after: "Mật khẩu đúng" },
    placeholder: "Nhập mật khẩu",
    submit_button: { submit: "Gửi", loading: "Đang kiểm tra..." },
    copy_all: "Sao chép tất cả",
  },
  music_section: {
    title: { main: "PLAYLIST", sub: "Của chúng tôi" },
    description:
      "Thêm bài hát yêu thích của bạn vào playlist để tạo nên bản nhạc hoàn hảo cho đám cưới!",
    placeholder: "Nhập tên bài hát",
    small_note:
      "* Một số bài hát có thể không phát được ở đây, nhưng bạn vẫn có thể thêm vào playlist.",
    toast_success: { title: "Đã thêm bài hát", description: "Bạn có muốn thêm bài khác không?" },
    toast_error: { title: "Không thể thêm bài hát", description: "Đã xảy ra lỗi. Vui lòng thử lại sau." },
  },
  attending_guests_section: {
    title: { main: "KHÁCH", sub: "Tham dự" },
    description: "Danh sách những người sẽ tham dự đám cưới của chúng tôi",
    loading_text: "Đang tải danh sách...",
    no_guests: "Chưa có khách nào xác nhận tham dự.",
    total_attending: "Tổng số khách sẽ tham dự",
  },
  footer: { text_1: "Website được tạo bằng ", text_2: "bởi ", text_3: "Ảnh bởi" },
  not_found: { message: "Trang bạn tìm không tồn tại.", button: "Quay lại" },
};

export default translations;
