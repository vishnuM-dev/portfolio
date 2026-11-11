import cv2
import numpy as np
import os

def recolor_crm():
    src_path = r'C:\Users\Lenovo\.gemini\antigravity\brain\36190301-8d3a-4231-8347-82f071086991\.user_uploaded\media_1794377190549_a48eb55a.jpg'
    if not os.path.exists(src_path):
        raise FileNotFoundError(f'Source image not found: {src_path}')

    src = cv2.imread(src_path)
    if src is None:
        raise ValueError('Failed to read image')

    h, w, _ = src.shape
    print(f'Original dimensions: {w}x{h}')
    out = src.copy()

    # -------------------------------------------------------------------------
    # 1. DONUT CHART (Leads by Stage)
    # -------------------------------------------------------------------------
    cx, cy = 797.5, 286.5
    donut_crop = out[200:380, 720:875]
    hsv = cv2.cvtColor(donut_crop, cv2.COLOR_BGR2HSV)
    yy, xx = np.ogrid[:donut_crop.shape[0], :donut_crop.shape[1]]
    dist = np.sqrt((xx + 720 - cx)**2 + (yy + 200 - cy)**2)
    ring_mask = (dist >= 43) & (dist <= 67) & (hsv[:, :, 1] > 25)

    # A. Proposal (14%): Orange -> Elegant Rose Orchid
    m_orange = ring_mask & (hsv[:, :, 0] >= 10) & (hsv[:, :, 0] <= 32)
    hsv[m_orange, 0] = 163
    hsv[m_orange, 1] = np.clip(hsv[m_orange, 1] * 0.90, 0, 255).astype(np.uint8)
    hsv[m_orange, 2] = np.clip(hsv[m_orange, 2] * 0.92, 0, 255).astype(np.uint8)

    # B. Contacted (24%): Blue -> Royal Periwinkle Lavender
    m_blue = ring_mask & (hsv[:, :, 0] >= 86) & (hsv[:, :, 0] <= 125)
    hsv[m_blue, 0] = 124
    hsv[m_blue, 1] = np.clip(hsv[m_blue, 1] * 0.90, 0, 255).astype(np.uint8)
    hsv[m_blue, 2] = np.clip(hsv[m_blue, 2] * 0.95, 0, 255).astype(np.uint8)

    # C. Qualified (18%): Green -> Soft Sage Emerald
    m_green = ring_mask & (hsv[:, :, 0] >= 33) & (hsv[:, :, 0] <= 85)
    hsv[m_green, 0] = 78
    hsv[m_green, 1] = np.clip(hsv[m_green, 1] * 1.05, 0, 255).astype(np.uint8)
    hsv[m_green, 2] = np.clip(hsv[m_green, 2] * 0.95, 0, 255).astype(np.uint8)

    # D. New (32%): Purple -> Deep Royal Lavender
    m_purple = ring_mask & (hsv[:, :, 0] >= 126) & (hsv[:, :, 0] <= 165) & (hsv[:, :, 1] >= 80)
    hsv[m_purple, 0] = 137
    hsv[m_purple, 1] = np.clip(hsv[m_purple, 1] * 0.95, 0, 255).astype(np.uint8)

    out[200:380, 720:875] = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

    # -------------------------------------------------------------------------
    # 2. LEGEND DOTS
    # -------------------------------------------------------------------------
    dots_spec = [
        (252, 887, 137, 0.95, 1.0),   # New -> Deep Royal Lavender
        (274, 887, 124, 0.90, 0.95),  # Contacted -> Periwinkle Lavender
        (297, 887, 78,  1.05, 0.95),  # Qualified -> Soft Sage Emerald
        (319, 887, 163, 0.90, 0.92),  # Proposal -> Rose Orchid
        (342, 887, 135, 1.00, 1.00),  # Closed Won -> Lavender Mist
    ]

    for cy_d, cx_d, target_h, s_scale, v_scale in dots_spec:
        crop = out[cy_d-6:cy_d+7, cx_d-6:cx_d+7]
        hsv_d = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
        yy_d, xx_d = np.ogrid[:crop.shape[0], :crop.shape[1]]
        d = np.sqrt((xx_d - 6)**2 + (yy_d - 6)**2)
        m = (d <= 5.5) & (hsv_d[:, :, 1] > 20)
        hsv_d[m, 0] = target_h
        hsv_d[m, 1] = np.clip(hsv_d[m, 1] * s_scale, 0, 255).astype(np.uint8)
        hsv_d[m, 2] = np.clip(hsv_d[m, 2] * v_scale, 0, 255).astype(np.uint8)
        out[cy_d-6:cy_d+7, cx_d-6:cx_d+7] = cv2.cvtColor(hsv_d, cv2.COLOR_HSV2BGR)

    # -------------------------------------------------------------------------
    # 3. TOP TENANTS BADGES (HealthPlus & EduSmart)
    # -------------------------------------------------------------------------
    hp_crop = out[488:510, 215:238]
    hp_hsv = cv2.cvtColor(hp_crop, cv2.COLOR_BGR2HSV)
    hp_m = (hp_hsv[:, :, 1] > 50) & (hp_hsv[:, :, 0] >= 85) & (hp_hsv[:, :, 0] <= 110)
    hp_hsv[hp_m, 0] = 78
    hp_hsv[hp_m, 1] = np.clip(hp_hsv[hp_m, 1] * 0.9, 0, 255).astype(np.uint8)
    out[488:510, 215:238] = cv2.cvtColor(hp_hsv, cv2.COLOR_HSV2BGR)

    edu_crop = out[518:540, 215:238]
    edu_hsv = cv2.cvtColor(edu_crop, cv2.COLOR_BGR2HSV)
    edu_m = (edu_hsv[:, :, 1] > 50) & (edu_hsv[:, :, 0] >= 105) & (edu_hsv[:, :, 0] <= 125)
    edu_hsv[edu_m, 0] = 128
    out[518:540, 215:238] = cv2.cvtColor(edu_hsv, cv2.COLOR_HSV2BGR)

    # -------------------------------------------------------------------------
    # 4. SIDEBAR REFINEMENT (x < 188)
    # -------------------------------------------------------------------------
    sb = out[:, :188].astype(np.float32)
    lum = 0.299 * sb[:, :, 2] + 0.587 * sb[:, :, 1] + 0.114 * sb[:, :, 0]
    target_bg = np.array([40.0, 19.0, 26.0], dtype=np.float32)
    blend = np.clip((50 - lum) / 50.0, 0, 1)[:, :, np.newaxis]
    sb = sb * (1 - blend * 0.45) + target_bg * (blend * 0.45)
    out[:, :188] = np.clip(sb, 0, 255).astype(np.uint8)

    # -------------------------------------------------------------------------
    # 5. CANVAS BACKGROUND LIFT (x >= 188)
    # -------------------------------------------------------------------------
    canvas = out[:, 188:].astype(np.float32)
    b_diff = canvas[:, :, 0] - 254
    g_diff = canvas[:, :, 1] - 244
    r_diff = canvas[:, :, 2] - 244
    bg_dist = np.sqrt(b_diff**2 + g_diff**2 + r_diff**2)
    canvas_mask = (bg_dist < 12)[:, :, np.newaxis]

    target_pearl = np.array([253.0, 248.0, 251.0], dtype=np.float32)
    canvas = np.where(canvas_mask, canvas * 0.2 + target_pearl * 0.8, canvas)
    out[:, 188:] = np.clip(canvas, 0, 255).astype(np.uint8)

    # -------------------------------------------------------------------------
    # SAVE FILES
    # -------------------------------------------------------------------------
    destinations = [
        'public/images/saas-crm.png',
        'public/images/saas-crm.jpg',
        'dist/images/saas-crm.png',
        'dist/images/saas-crm.jpg'
    ]

    for d in destinations:
        d_dir = os.path.dirname(d)
        if os.path.exists(d_dir):
            if d.endswith('.png'):
                cv2.imwrite(d, out, [cv2.IMWRITE_PNG_COMPRESSION, 3])
            else:
                cv2.imwrite(d, out, [cv2.IMWRITE_JPEG_QUALITY, 98])
            print(f'Successfully wrote: {d} ({out.shape[1]}x{out.shape[0]})')

if __name__ == '__main__':
    recolor_crm()
