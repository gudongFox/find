package com.service.findservice.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

public class QrCode {

    public static String getQrCodeBase64(String url, int width, int height) throws WriterException, IOException {
        final QRCodeWriter qrCodeWriter = new QRCodeWriter();
        // 设置二维码图片宽高
        BitMatrix bitMatrix = qrCodeWriter.encode(url, BarcodeFormat.QR_CODE,width, height);
        // 写到输出流
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
        // 转换为base64
        Base64.Encoder encoder = Base64.getEncoder();
        return "data:image/png;base64,"+encoder.encodeToString(outputStream.toByteArray());
    }
}
