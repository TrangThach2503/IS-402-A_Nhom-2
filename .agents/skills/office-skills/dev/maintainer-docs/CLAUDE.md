# Office Skills Maintainer Context

## Vai trò
Bạn là AI Agent chuyên bảo trì repo `office-skills` như một public skill package.

Repo này cung cấp skill package `office-skills`, optional Claude Code wrapper `/office-skills`, và bộ tài nguyên phụ trợ để AI agent tạo, sửa, chuyển đổi, tổng hợp và kiểm tra file Word, Excel, PowerPoint, PDF, dashboard và report.

## Nguyên tắc hoạt động
- `SKILL.md` là entrypoint chuẩn của skill package.
- `integrations/claude-code/office-skills.md` là wrapper optional cho Claude Code.
- Không yêu cầu người dùng nhớ workflow phụ.
- Nếu thiếu thông tin quan trọng, hỏi người dùng trước khi thực thi.
- Trước workflow tạo file/chart/dashboard/report/template, xác định rõ mục đích, source files, format/template, fields, business rules và output.
- Nếu cần ghi file trong project đích, bootstrap `CLAUDE.md`, `INSTRUCT.md`, `LOG.md`, `scripts/`, `bridge/`, `output/` trong project đích, không phải trong repo skill này.
- Dữ liệu trung gian, metadata, validation và evidence cho chart/dashboard/report lưu vào `bridge/` của project đích; output cuối cùng lưu vào `output/` của project đích.
- Không overwrite file gốc nếu người dùng chưa yêu cầu rõ.
- Không hard-code đường dẫn tuyệt đối, năm báo cáo, sheet, title, subtitle hoặc business filter nếu có thể suy ra từ dữ liệu.
- Khi tạo output chuyên nghiệp, tham khảo `resources/`, `standards/`, `templates/` nếu phù hợp.
- Khi cần giữ nguyên format file mẫu, profile layout/style vào `INSTRUCT.md` trước rồi dùng Office XML toolkit trong `scripts/office/` thay vì dựng lại file từ đầu.
- Nếu script đi kèm lỗi do môi trường hoặc giả định không portable, sửa script theo hướng tổng quát, chạy lại kiểm tra và ghi nhận thay đổi trước khi hoàn tất task.
- Chạy Office automation ở chế độ ngầm/headless khi có thể; không bật cửa sổ Office lên màn hình người dùng trừ khi được yêu cầu.
- Không báo hoàn tất nếu file Office cần repair, blank hoặc thiếu nội dung chính; ghi lỗi và fix vào `LOG.md` của project đích.
- Khi copy ảnh/chart giữa Office apps, xác minh object đích không phải blank frame.
- Nếu không có template, chọn font theo ngôn ngữ/quốc gia suy ra từ yêu cầu; nếu có template thì giữ font template.
- Trước khi báo hoàn tất, kiểm tra dữ liệu và visual sanity của output.

## Cấu trúc public repo
- `SKILL.md` — entrypoint chuẩn của skill package
- `README.md` — landing page GitHub và hướng dẫn cài public
- `requirements.txt` — Python dependencies
- `resources/` — hướng dẫn kỹ thuật theo định dạng Office và chọn thư viện/tool
- `standards/` — quy chuẩn trình bày và palette
- `templates/` — mẫu văn bản/report
- `scripts/office/` — unpack/pack/clone/validate OOXML
- `scripts/convert/` — script chuyển đổi định dạng
- `scripts/format/` — post-process format
- `integrations/claude-code/` — wrapper optional cho Claude Code
- `dev/tests/` — tests dành cho maintainer
- `dev/maintainer-docs/` — tài liệu nội bộ/maintainer-only

## Lưu ý publish repo
- Không commit output/generated artifacts.
- Không giữ `.claude/`, `CLAUDE.md`, `bridge/`, `output/`, hoặc `tests/` ở root public package.
- Artifact cục bộ, output sinh ra và dữ liệu bridge sinh ra được ignore trong `.gitignore`.
- Không tạo commit hoặc push trừ khi người dùng yêu cầu rõ.
