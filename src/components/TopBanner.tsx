import { X } from "lucide-react";
import { useState } from "react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-gold border-b border-bnp-gold/20 animate-fade-in">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-bnp-green font-medium">
            ✨ Découvrez votre profil d'investisseur en quelques minutes
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="text-bnp-green/70 hover:text-bnp-green transition-colors"
            aria-label="Fermer le bandeau"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
