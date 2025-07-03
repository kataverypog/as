import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = () => {
    const qrRegionId = "reader";
    const messageRef = useRef(null);
    const html5QrCodeRef = useRef(null);

    const showMessage = (text, type = "info") => {
        const el = messageRef.current;
        if (!el) return;
        el.textContent = text;

        el.className = type;
        el.style.padding = "10px";
        el.style.borderRadius = "5px";
        el.style.maxWidth = "300px";
        el.style.fontFamily = "sans-serif";
        el.style.fontSize = "14px";

        if (type === "success") {
            el.style.backgroundColor = "#e6ffed";
            el.style.color = "#28a745";
            el.style.border = "1px solid #b3ffcc";
        } else if (type === "error") {
            el.style.backgroundColor = "#ffe6e6";
            el.style.color = "#ff4d4f";
            el.style.border = "1px solid #ffcccc";
        } else {
            el.style.backgroundColor = "#e6f7ff";
            el.style.color = "#1890ff";
            el.style.border = "1px solid #91d5ff";
        }
    };

    useEffect(() => {
        const html5QrCode = new Html5Qrcode(qrRegionId);
        html5QrCodeRef.current = html5QrCode;

        showMessage("📷 Запуск камеры...", "info");

        html5QrCode
            .start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 250 },
                (qrCodeMessage) => {
                    html5QrCode.stop().then(() => {
                        if (window.Telegram && window.Telegram.WebApp) {
                            window.Telegram.WebApp.sendData(qrCodeMessage);
                            showMessage("✅ Данные отправлены в Telegram", "success");
                            setTimeout(() => {
                                window.Telegram.WebApp.close();
                            }, 1000);
                        } else {
                            showMessage("⚠️ Не в Telegram. QR: " + qrCodeMessage, "info");
                        }
                    }).catch((err) => {
                        showMessage("❌ Ошибка остановки сканера: " + err, "error");
                    });
                }
            )
            .catch((err) => {
                showMessage("❌ Не удалось запустить сканер: " + err, "error");
            });

        return () => {
            if (html5QrCodeRef.current) {
                html5QrCodeRef.current.stop().catch(() => {});
            }
        };
    }, []);

    return (
        <div>
            <div id={qrRegionId} style={{ width: "300px", marginBottom: "10px" }}></div>
            <div ref={messageRef}></div>
        </div>
    );
};

export default QrScanner;
