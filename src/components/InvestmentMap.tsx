import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Investment {
  name: string;
  location: [number, number]; // [longitude, latitude]
  amount: number;
  sector: string;
}

const InvestmentMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  // Sample investments based on user profile
  const investments: Investment[] = [
    { name: "Fonds Infrastructures Vertes", location: [2.3522, 48.8566], amount: 50000, sector: "Écologie" },
    { name: "Private Equity Santé", location: [-0.5792, 44.8378], amount: 30000, sector: "Santé" },
    { name: "Microcrédit Afrique", location: [3.8480, 11.5021], amount: 15000, sector: "Développement" },
    { name: "SCI Bretagne", location: [-1.6778, 48.1173], amount: 40000, sector: "Local" },
    { name: "ETF Defense Tech", location: [-77.0369, 38.9072], amount: 25000, sector: "Défense" },
    { name: "AgriGrowth Kenya", location: [36.8219, -1.2921], amount: 10000, sector: "Développement" },
    { name: "Solar Infrastructure", location: [12.4964, 41.9028], amount: 35000, sector: "Écologie" },
  ];

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 1.5,
      center: [15, 25],
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      // Add markers for each investment
      investments.forEach((investment) => {
        const el = document.createElement('div');
        el.className = 'investment-marker';
        el.style.cssText = `
          width: ${Math.sqrt(investment.amount / 1000) * 4}px;
          height: ${Math.sqrt(investment.amount / 1000) * 4}px;
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7));
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: transform 0.2s;
        `;
        
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.2)';
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
        });

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">${investment.name}</h3>
            <p style="color: #666; font-size: 14px; margin-bottom: 2px;">${investment.sector}</p>
            <p style="font-weight: 600; color: hsl(var(--primary));">${(investment.amount).toLocaleString('fr-FR')} €</p>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat(investment.location)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTokenInput(false);
  };

  if (!mapboxToken) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carte de vos Investissements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Pour afficher la carte interactive de vos investissements, veuillez entrer votre token Mapbox.
            </p>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mapbox-token">Token Mapbox</Label>
                <Input
                  id="mapbox-token"
                  type="text"
                  placeholder="pk.eyJ1IjoiZXhhbXBsZS..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Obtenez votre token gratuit sur{' '}
                  <a
                    href="https://mapbox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Afficher la carte
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carte de vos Investissements</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={mapContainer} className="w-full h-[500px] rounded-b-lg" />
      </CardContent>
    </Card>
  );
};

export default InvestmentMap;
