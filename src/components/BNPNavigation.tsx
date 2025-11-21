import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, TrendingUp, User, Grid3x3 } from "lucide-react";

const BNPNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { path: "/investments", label: "Investissements", icon: TrendingUp },
    { path: "/profile", label: "Mon profil", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-bnp-dark sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-bnp-green p-2 rounded-lg">
              <Grid3x3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-wide">BNP PARIBAS</h1>
              <p className="text-bnp-green text-xs font-semibold tracking-widest">BANQUE PRIVÉE</p>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    active
                      ? "bg-bnp-green text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User greeting */}
          <div className="text-right hidden lg:block">
            <p className="text-gray-400 text-sm">Bienvenue,</p>
            <p className="text-bnp-green font-semibold">Jean Dupont</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BNPNavigation;
