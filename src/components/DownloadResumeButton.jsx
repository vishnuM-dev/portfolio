import React from 'react';
import { Download } from 'lucide-react';
import './DownloadResumeButton.css';

export default function DownloadResumeButton({
  href = "/resume.pdf",
  download = "M_Vishnu_Vardhan_Reddy_Resume.pdf",
  className = ""
}) {
  return (
    <a
      href={href}
      download={download}
      className={`dl-button ${className}`}
      aria-label="Download Resume PDF"
    >
      <span>Download Resume</span>
      <Download size={16} className="dl-button-icon" />
    </a>
  );
}
