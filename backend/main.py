import os
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from typing import Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Tải cấu hình từ tệp .env nếu có
load_dotenv()

app = FastAPI(
    title="SalesDSS WinMart API - Hệ Thống Hỗ Trợ Ra Quyết Định Bán Lẻ",
    version="1.0.0"
)

# Cấu hình CORS để Frontend React (Vite) kết nối không bị chặn
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lưu trữ tạm mã OTP trong bộ nhớ RAM
# { "email": { "otp": "849201", "expires_at": datetime } }
otp_storage: Dict[str, dict] = {}

class SendOtpRequest(BaseModel):
    email: str

class VerifyOtpRequest(BaseModel):
    email: str
    otp: str
    new_password: str

# Thông tin cấu hình SMTP Gmail
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "").strip()
SENDER_APP_PASSWORD = os.getenv("SENDER_APP_PASSWORD", "").strip()

def send_real_email_via_smtp(recipient_email: str, otp_code: str):
    """
    Hàm gửi email thực tế qua máy chủ SMTP của Google (smtp.gmail.com).
    Yêu cầu: SENDER_EMAIL và SENDER_APP_PASSWORD (Mật khẩu ứng dụng 16 chữ số của Google).
    """
    if not SENDER_EMAIL or not SENDER_APP_PASSWORD:
        return False, "Chưa cấu hình tài khoản gửi SENDER_EMAIL hoặc Mật khẩu ứng dụng SENDER_APP_PASSWORD trong backend/.env"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[{otp_code}] Mã xác thực cấp lại mật khẩu - SalesDSS WinMart Đà Nẵng"
    msg["From"] = f"SalesDSS WinMart <{SENDER_EMAIL}>"
    msg["To"] = recipient_email

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px;">
        <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">SalesDSS</h1>
                <p style="margin: 6px 0 0 0; font-size: 13px; font-weight: 600; opacity: 0.95;">
                    Chuỗi Tiện Lợi WinMart+ Đà Nẵng • Masan WinCommerce
                </p>
            </div>

            <!-- Body -->
            <div style="padding: 32px 28px;">
                <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 800; color: #0f172a;">
                    Xác Thực Cấp Lại Mật Khẩu
                </h2>
                <p style="margin: 0 0 20px 0; font-size: 13px; line-height: 1.6; color: #475569;">
                    Chúng tôi nhận được yêu cầu cấp lại mật khẩu tài khoản điều hành hệ thống cho địa chỉ email: <strong>{recipient_email}</strong>.
                </p>

                <!-- OTP Code Box -->
                <div style="background: #f1f5f9; border: 2px dashed #93c5fd; border-radius: 16px; padding: 20px; text-align: center; margin: 24px 0;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                        MÃ XÁC THỰC BẢO MẬT OTP (6 CHỮ SỐ)
                    </div>
                    <div style="font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #1e40af; font-family: monospace;">
                        {otp_code}
                    </div>
                </div>

                <div style="background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px;">
                    <p style="margin: 0; font-size: 12px; color: #1e40af; line-height: 1.5;">
                        ⏱️ Mã xác thực này có hiệu lực trong vòng <strong>5 phút</strong>.<br>
                        🔒 Vì lý do bảo mật, tuyệt đối không tiết lộ mã xác thực cho bất kỳ ai.
                    </p>
                </div>

                <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                    Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email hoặc liên hệ với Quản trị viên hệ thống SalesDSS.
                </p>
            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 24px; text-align: center; font-size: 11px; color: #64748b;">
                Hệ Thống Hỗ Trợ Ra Quyết Định Bán Lẻ SalesDSS • Masan WinCommerce<br>
                Trụ sở điều hành: TP. Đà Nẵng
            </div>
        </div>
    </body>
    </html>
    """

    msg.attach(MIMEText(html_content, "html"))

    try:
        # Kết nối máy chủ SMTP Gmail
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=12)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_APP_PASSWORD)
        server.sendmail(SENDER_EMAIL, recipient_email, msg.as_string())
        server.quit()
        return True, "Đã gửi email thực tế thành công qua máy chủ Google SMTP!"
    except Exception as e:
        return False, f"Lỗi khi gửi qua Google SMTP: {str(e)}"

@app.get("/")
def root():
    return {
        "system": "SalesDSS WinMart API",
        "status": "Online",
        "smtp_configured": bool(SENDER_EMAIL and SENDER_APP_PASSWORD)
    }

@app.post("/api/auth/send-otp")
def send_otp(req: SendOtpRequest):
    email = req.email.strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Vui lòng nhập định dạng email hợp lệ!")

    # Sinh mã OTP 6 số ngẫu nhiên
    otp = f"{random.randint(100000, 999999)}"
    expires_at = datetime.now() + timedelta(minutes=5)
    
    otp_storage[email] = {
        "otp": otp,
        "expires_at": expires_at
    }

    # Thử gửi email thực tế
    sent, msg = send_real_email_via_smtp(email, otp)

    return {
        "success": True,
        "email": email,
        "otp": otp,  # Trả về mã OTP để hiển thị và hỗ trợ người dùng ngay cả khi chưa thiết lập App Password
        "real_email_sent": sent,
        "message": msg,
        "expires_in_minutes": 5
    }

@app.post("/api/auth/verify-otp")
def verify_otp(req: VerifyOtpRequest):
    email = req.email.strip().lower()
    record = otp_storage.get(email)

    if not record:
        raise HTTPException(status_code=400, detail="Chưa có yêu cầu gửi OTP cho email này!")

    if datetime.now() > record["expires_at"]:
        raise HTTPException(status_code=400, detail="Mã OTP đã hết hiệu lực 5 phút, vui lòng lấy mã mới!")

    if record["otp"] != req.otp.strip():
        raise HTTPException(status_code=400, detail="Mã OTP không chính xác, vui lòng thử lại!")

    # Xóa OTP sau khi xác thực thành công
    del otp_storage[email]

    return {
        "success": True,
        "message": "Cấp lại mật khẩu thành công! Bạn có thể sử dụng mật khẩu mới để đăng nhập."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
