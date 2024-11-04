import { useState } from "react";

const useCopy = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    /*const textarea = document.createElement("textarea");
    textarea.value = text;

    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);*/

    navigator.clipboard.writeText(text);

    setCopied(true);
  };

  const resetCopied = () => {
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return { copied, copyToClipboard, resetCopied };
};

export default useCopy;
