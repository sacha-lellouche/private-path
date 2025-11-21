import { X } from "lucide-react";
import { useState } from "react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-banner border-b border-white/10">
      <div className="container mx-auto px-6 py-2.5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-white font-medium">
            Découvrez votre profil d'investisseur en quelques minutes
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white transition-colors"
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
