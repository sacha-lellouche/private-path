const BNPBanner = () => {
  return (
    <div className="bg-bnp-green border-b border-bnp-green-light">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-bnp-gold animate-pulse" />
          <p className="text-sm text-white font-medium">
            Services de Banque Privée - Accompagnement personnalisé et expertise patrimoniale
          </p>
        </div>
      </div>
    </div>
  );
};

export default BNPBanner;
