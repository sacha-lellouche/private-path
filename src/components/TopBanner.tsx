import { X } from "lucide-react";
import { useState } from "react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-white dark:bg-background border-b border-border/50">
      <div className="container mx-auto px-6 py-2.5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Découvrez votre profil d'investisseur en quelques minutes
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fermer le bandeau"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
