import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Leaf, Heart, Lock, MapPin, Globe, Bitcoin } from "lucide-react";

interface SectorInterestsDialogProps {
  currentSectors: string[];
  onSave: (sectors: string[]) => void;
}

const SectorInterestsDialog = ({ currentSectors, onSave }: SectorInterestsDialogProps) => {
  const [selectedSectors, setSelectedSectors] = useState<string[]>(currentSectors);
  const [open, setOpen] = useState(false);

  const sectors = [
    { id: "ecology", label: "🌱 Écologie", icon: Leaf },
    { id: "health", label: "❤️ Santé", icon: Heart },
    { id: "defense", label: "🛡️ Défense", icon: Lock },
    { id: "local", label: "📍 Économie Locale", icon: MapPin },
    { id: "developing", label: "🌍 Pays en Développement", icon: Globe },
    { id: "blockchain", label: "₿ Blockchain", icon: Bitcoin },
  ];

  const toggleSector = (sectorId: string) => {
    setSelectedSectors(prev =>
      prev.includes(sectorId)
        ? prev.filter(s => s !== sectorId)
        : [...prev, sectorId]
    );
  };

  const handleSave = () => {
    onSave(selectedSectors);
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      parsedProfile.preferredSectors = selectedSectors;
      localStorage.setItem('userProfile', JSON.stringify(parsedProfile));
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Secteurs d'Intérêt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Sélectionnez les secteurs qui vous intéressent pour personnaliser votre expérience d'investissement.
          </p>
          <div className="space-y-3">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <div
                  key={sector.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/5 transition-colors cursor-pointer"
                  onClick={() => toggleSector(sector.id)}
                >
                  <Checkbox
                    checked={selectedSectors.includes(sector.id)}
                    onCheckedChange={() => toggleSector(sector.id)}
                  />
                  <Icon className="w-5 h-5 text-primary" />
                  <label className="flex-1 text-sm font-medium cursor-pointer">
                    {sector.label}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave} className="bg-[hsl(var(--bnp-green))] hover:bg-[hsl(var(--bnp-green-light))]">
              Enregistrer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SectorInterestsDialog;
