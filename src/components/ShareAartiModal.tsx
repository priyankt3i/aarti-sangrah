import { useState } from 'react';
import { X, FileText, Share2, Copy, Check, Loader2 } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Aarti } from '../types';
import { generateAartiPdf } from '../utils/pdfExport';

interface ShareAartiModalProps {
  isOpen: boolean;
  onClose: () => void;
  aarti: Aarti | null;
}

export function ShareAartiModal({ isOpen, onClose, aarti }: ShareAartiModalProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen || !aarti) return null;

  const handleSharePdf = async (action: 'share' | 'download' = 'share') => {
    setIsGeneratingPdf(true);
    setStatusMessage('Rendering branded PDF with watermark...');
    try {
      const result = await generateAartiPdf(aarti, action);
      if (result.success) {
        setStatusMessage(result.shared ? 'Shared successfully!' : 'Branded PDF downloaded!');
        setTimeout(() => {
          setStatusMessage(null);
          onClose();
        }, 1800);
      } else {
        setStatusMessage('Could not generate PDF. Please try again.');
      }
    } catch (e) {
      console.error(e);
      setStatusMessage('Error generating PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const shareUrl = typeof window !== 'undefined' && (window.location.origin.includes('localhost') || Capacitor.isNativePlatform())
    ? `https://aarti.yantralab.com/aarti/${aarti.language}/${aarti.slug}`
    : window.location.href;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyLyrics = async () => {
    try {
      const fullLyrics = aarti.verses.map(v => v.lines.join('\n')).join('\n\n');
      const textToCopy = `${aarti.title}\n${aarti.deity ? `देवता: ${aarti.deity}\n` : ''}\n${fullLyrics}\n\n— Shared from Aarti Sangrah (आरती संग्रह)\n${shareUrl}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Share.share({
          title: aarti.title,
          text: `Read and sing ${aarti.title} on Aarti Sangrah`,
          url: shareUrl,
          dialogTitle: `Share ${aarti.title}`,
        });
        onClose();
      } catch (err) {
        console.warn('Native share dismissed', err);
      }
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: aarti.title,
          text: `Read and sing ${aarti.title} on Aarti Sangrah`,
          url: shareUrl,
        });
        onClose();
      } catch (err) {
        console.warn('Share dismissed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#fdfbf7] rounded-t-2xl sm:rounded-2xl border border-[#e2d5c3] shadow-2xl overflow-hidden pb-6 sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2d5c3] bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪔</span>
            <div>
              <h3 className="font-semibold text-[#4a1515] text-base leading-tight">Share Aarti</h3>
              <p className="text-xs text-[#8a6b6b] truncate max-w-[240px]">{aarti.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#8a6b6b] hover:text-[#4a1515] hover:bg-black/5 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status banner */}
        {statusMessage && (
          <div className="bg-[#fff8f0] px-4 py-2.5 text-center text-xs font-medium text-[#c2410c] border-b border-[#fed7aa] flex items-center justify-center gap-2">
            {isGeneratingPdf ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Options */}
        <div className="p-4 space-y-3">
          {/* Option 1: Branded PDF */}
          <div className="p-4 rounded-xl bg-linear-to-br from-[#fff7ed] to-[#fef2f2] border-2 border-[#ea580c]/30 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-[#c2410c] text-white rounded-lg shadow-xs">
                  <FileText size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-[#4a1515]">Branded PDF Document</span>
                    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#c2410c] text-white">
                      Watermarked
                    </span>
                  </div>
                  <p className="text-xs text-[#8a6b6b] mt-0.5">
                    Formatted for WhatsApp sharing, printing & reading with Aarti Sangrah emblem
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleSharePdf('share')}
                disabled={isGeneratingPdf}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#781f19] hover:bg-[#5c1616] active:scale-[0.98] text-white rounded-lg text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
              >
                {isGeneratingPdf ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Share2 size={15} />
                )}
                <span>Share PDF</span>
              </button>

              <button
                onClick={() => handleSharePdf('download')}
                disabled={isGeneratingPdf}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-orange-50 active:scale-[0.98] text-[#781f19] border border-[#e2d5c3] rounded-lg text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
              >
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Quick Sharing Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-[#fbf7f0] border border-[#e2d5c3] rounded-xl text-xs font-medium text-[#4a1515] transition-colors"
            >
              <Share2 size={16} className="text-[#c2410c]" />
              <span>Share Link</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-[#fbf7f0] border border-[#e2d5c3] rounded-xl text-xs font-medium text-[#4a1515] transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check size={16} className="text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} className="text-[#8a6b6b]" />
                  <span>Copy Web Link</span>
                </>
              )}
            </button>
          </div>

          {/* Copy Lyrics */}
          <button
            onClick={handleCopyLyrics}
            className="w-full flex items-center justify-center gap-2 p-2.5 bg-white/70 hover:bg-white border border-[#e2d5c3] rounded-xl text-xs font-medium text-[#8a6b6b] hover:text-[#4a1515] transition-colors"
          >
            {copiedText ? (
              <>
                <Check size={14} className="text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Full Lyrics Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Full Lyrics Text</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
