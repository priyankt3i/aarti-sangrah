import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Aarti } from '../types';

/**
 * Generates a branded, watermarked PDF for an Aarti and handles sharing or downloading.
 */
export async function generateAartiPdf(
  aarti: Aarti,
  action: 'share' | 'download' = 'share'
): Promise<{ success: boolean; shared: boolean; filename: string; error?: string }> {
  const filename = `${aarti.title.replace(/[\s\/\\]+/g, '_')}_Aarti_Sangrah.pdf`;

  // Create temporary offscreen container
  const container = document.createElement('div');
  container.id = 'pdf-export-container';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // Standard A4 width in px at 96 DPI
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#2d1515';
  container.style.zIndex = '-999';

  // Determine font family based on language
  const fontFamily = 
    aarti.language === 'gu' ? "'Noto Sans Gujarati', sans-serif" :
    aarti.language === 'bn' ? "'Noto Sans Bengali', sans-serif" :
    "'Noto Sans Devanagari', 'Yantramanav', sans-serif";

  // Render verses
  const versesHtml = aarti.verses.map((verse, index) => {
    const isChorus = !!verse.isChorus || index === 0;

    return `
      <div style="margin-bottom: 22px; padding: ${isChorus ? '12px 18px' : '6px 12px'}; background: ${isChorus ? '#fffaf4' : 'transparent'}; border-left: ${isChorus ? '3px solid #c2410c' : 'none'}; border-radius: 6px;">
        ${verse.lines.map(line => `
          <div style="font-size: 17px; line-height: 1.8; color: ${isChorus ? '#781f19' : '#2d1515'}; font-weight: ${isChorus ? '600' : '500'};">
            ${line}
          </div>
        `).join('')}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="font-family: ${fontFamily}; width: 794px; min-height: 1123px; padding: 48px 52px; box-sizing: border-box; position: relative; background: #ffffff; border: 8px solid #fcf7ef; outline: 2px solid #e8d7c3; outline-offset: -4px;">
      
      <!-- SUBTLE SACRED WATERMARK -->
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-25deg); pointer-events: none; z-index: 1; text-align: center; opacity: 0.055; user-select: none; width: 600px;">
        <div style="font-size: 260px; line-height: 1; font-family: 'Noto Sans Devanagari', serif; color: #781f19;">ॐ</div>
        <div style="font-size: 38px; font-weight: 800; letter-spacing: 6px; color: #781f19; margin-top: -20px;">AARTI SANGRAH</div>
        <div style="font-size: 24px; font-weight: 700; color: #781f19; letter-spacing: 2px;">आरती संग्रह</div>
      </div>

      <!-- SACRED BRANDING HEADER -->
      <div style="position: relative; z-index: 2; text-align: center; border-bottom: 2px solid #e8d7c3; padding-bottom: 20px; margin-bottom: 28px;">
        <div style="font-size: 13px; font-weight: 700; letter-spacing: 4px; color: #c2410c; margin-bottom: 6px;">
          ॥ श्री गणेशाय नमः ॥ ॐ ॥
        </div>
        
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 4px;">
          <span style="font-size: 24px;">🪔</span>
          <span style="font-size: 26px; font-weight: 800; color: #781f19; letter-spacing: 2px;">AARTI SANGRAH</span>
          <span style="font-size: 24px;">🪔</span>
        </div>

        <div style="font-size: 14px; font-weight: 600; color: #8a6b6b; letter-spacing: 1px;">
          पावन आरती व स्तोत्र संग्रह • Devotional Reader
        </div>
      </div>

      <!-- AARTI TITLE & METADATA -->
      <div style="position: relative; z-index: 2; text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 32px; font-weight: 800; color: #5c1616; margin: 0 0 10px 0; line-height: 1.3;">
          ${aarti.title}
        </h1>
        
        <div style="display: inline-flex; align-items: center; gap: 12px; background: #fdfbf7; border: 1px solid #e2d5c3; border-radius: 20px; padding: 4px 18px; font-size: 13px; color: #781f19; font-weight: 600;">
          <span>${aarti.deity ? `देवता: ${aarti.deity}` : `वर्ग: ${aarti.category}`}</span>
          <span>•</span>
          <span>भाषा: ${aarti.language.toUpperCase()}</span>
          <span>•</span>
          <span>Aarti Sangrah Edition</span>
        </div>
      </div>

      <!-- AARTI LYRICS -->
      <div style="position: relative; z-index: 2; text-align: center; max-width: 650px; margin: 0 auto 36px auto;">
        ${versesHtml}
      </div>

      <!-- BRANDED FOOTER -->
      <div style="position: relative; z-index: 2; margin-top: 40px; pt-6; border-top: 1px dashed #d9c4af; text-align: center; font-size: 12px; color: #8a6b6b; line-height: 1.6;">
        <div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-bottom: 4px; font-weight: 600; color: #781f19;">
          <span>✦</span>
          <span>Shared via Aarti Sangrah (आरती संग्रह) • 100% Offline Devotional Reader</span>
          <span>✦</span>
        </div>
        <div>
          Carry the divine presence with you anywhere. Discover 100+ Aartis with synchronized auto-scrolling.
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(container);

  try {
    // Wait for DOM & font rasterization
    await new Promise(resolve => setTimeout(resolve, 250));

    const canvas = await html2canvas(container, {
      scale: 2, // High resolution retina rendering
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    let sharedSuccessfully = false;

    if (Capacitor.isNativePlatform()) {
      try {
        const base64Data = pdf.output('datauristring').split(',')[1];
        const savedFile = await Filesystem.writeFile({
          path: filename,
          data: base64Data,
          directory: Directory.Cache,
        });

        await Share.share({
          title: `${aarti.title} - Aarti Sangrah`,
          text: `Here is the sacred lyrics of ${aarti.title} formatted in PDF with Aarti Sangrah branding.`,
          url: savedFile.uri,
          dialogTitle: action === 'share' ? `Share ${aarti.title} PDF` : `Save / Share ${aarti.title} PDF`,
        });
        sharedSuccessfully = true;
      } catch (nativeShareErr) {
        console.warn('Native share/save failed, falling back to web download', nativeShareErr);
      }
    }

    if (!sharedSuccessfully) {
      const pdfBlob = pdf.output('blob');

      // If user requested share and Web Share API supports file sharing:
      if (action === 'share' && typeof navigator !== 'undefined' && navigator.canShare) {
        try {
          const file = new File([pdfBlob], filename, { type: 'application/pdf' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: `${aarti.title} - Aarti Sangrah`,
              text: `Here is the sacred lyrics of ${aarti.title} formatted in PDF with Aarti Sangrah branding.`,
            });
            sharedSuccessfully = true;
          }
        } catch (shareErr) {
          // User cancelled share or share failed; fallback to download
          console.info('Share cancelled or not supported for files, triggering download', shareErr);
        }
      }

      // If not shared through native file dialog (or action was 'download'), trigger download
      if (!sharedSuccessfully) {
        pdf.save(filename);
      }
    }

    return {
      success: true,
      shared: sharedSuccessfully,
      filename
    };
  } catch (err: unknown) {
    console.error('Failed to generate Aarti PDF', err);
    return {
      success: false,
      shared: false,
      filename,
      error: err instanceof Error ? err.message : String(err)
    };
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
