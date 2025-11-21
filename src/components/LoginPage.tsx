import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Lock } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo mode - accept any credentials
    // Check if user has completed onboarding
    const storedProfile = localStorage.getItem('userProfile');
    if (!storedProfile) {
      // No profile, redirect to onboarding
      navigate("/parcours");
    } else {
      // Profile exists, go to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-8 md:p-10 bg-background/80 backdrop-blur-sm border-bnp-green/20">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bnp-gold/10">
              <Lock className="w-8 h-8 text-bnp-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-semibold text-foreground mb-2">
                Connexion
              </h1>
              <p className="text-muted-foreground">
                Accédez à votre dashboard pour suivre vos investissements
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              variant="hero"
              className="w-full gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Me connecter
            </Button>
          </form>

          {/* Additional Info */}
          <div className="text-center space-y-3 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <button className="text-bnp-gold hover:underline font-medium">
                Contactez un conseiller
              </button>
            </p>
            <p className="text-xs text-muted-foreground">
              🔒 Connexion sécurisée et données protégées
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
