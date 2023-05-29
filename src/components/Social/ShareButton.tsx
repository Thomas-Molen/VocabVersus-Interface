import { useState } from "react";
import { IconButton } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import "./ShareButton.css";

type ShareButtonProps = {
  url: string
};

function ShareButton({ url }: ShareButtonProps) {
  const [showCopied, setShowCopied] = useState(false);

  return (
    <div>
      <IconButton
        aria-label="share"
        color="inherit"
        onClick={Share}>
        <ShareIcon className="share-icon"/>
      </IconButton>
      {showCopied &&
        <span className="share-text">Link copied!</span>
      }
    </div>
  );

  function Share() {
    // Check if browser supports share API
    if (navigator.share) {
      navigator.share({
        title: 'VocabVersus game invite',
        url: url
      })
        .catch(console.error);
    }
    // If share API is not supported, copy to clipboard 
    else {
      navigator.clipboard.writeText(url);
      setShowCopied(true);
    }
  }
}


export default ShareButton