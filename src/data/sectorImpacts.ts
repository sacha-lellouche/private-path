// Données d'impact par secteur d'investissement

export interface ImpactProduct {
  type: string;
  name: string;
  impacts: string[];
  companies?: {
    name: string;
    metric: string;
  }[];
}

export const sectorImpacts: Record<string, ImpactProduct[]> = {
  ecologie: [
    {
      type: "Private Equity",
      name: "Fonds PE « Mirova Impact Environnement »",
      impacts: [
        "Ton investissement a permis d'éviter X tonnes de CO₂ via des entreprises en portefeuille (ex : Vestack, Naïo).",
        "Ton investissement a économisé Y m³ d'eau grâce à des technologies durables.",
        "Ton capital a réduit l'utilisation d'intrants chimiques de Z tonnes dans l'agriculture.",
      ],
    },
    {
      type: "Crowdfunding",
      name: "Enerfip - e-Totem Méditerranée",
      impacts: [
        "Ton investissement a financé 279 bornes de recharge EV dans la région Sud (Var + Hérault).",
        "Grâce à toi, le réseau de recharge électrique s'étend et rend l'électromobilité plus accessible.",
        "Ton argent soutient la fabrication locale de bornes (France), ce qui réduit l'empreinte carbone de la chaîne de production.",
        "Ton financement aide à construire une infrastructure durable avec un business model pérenne (refinancement prévu).",
      ],
    },
    {
      type: "ETF",
      name: "iShares S&P Global Clean Energy",
      impacts: [
        "Ton allocation soutient 117 entreprises engagées dans la réduction des émissions.",
        "Ton investissement contribue à une réduction de 0,6 tonne de CO₂ par an via les portefeuilles décarbonés du fonds.",
      ],
      companies: [
        {
          name: "JinkoSolar",
          metric: "nombre de panneaux solaires construits",
        },
        {
          name: "Yara International ASA",
          metric: "% de baisse des émissions de CO2",
        },
        {
          name: "Foresight Sustainable",
          metric: "nombre d'arbres plantés",
        },
      ],
    },
  ],
  sante: [
    {
      type: "Private Equity Santé",
      name: "Fonds BioMedTech MEDEOR de Truffle Capital",
      impacts: [
        "Ton investissement a permis le développement de 1 thérapie cellulaire innovante (ex : HepaStem®) pour traiter une maladie sévère du foie (ACLF).",
        "Grâce à toi, un appareil implantable (ex : Kalios™) permet de réparer des valves cardiaques de façon moins invasive, réduisant les risques chirurgicaux.",
      ],
    },
    {
      type: "Actions",
      name: "Entreprises pharmaceutiques mid-cap",
      companies: [
        {
          name: "Stryker Corporation",
          metric: "équipements médicaux",
        },
        {
          name: "Evotec SE",
          metric: "biopharmaceutique",
        },
      ],
      impacts: [],
    },
    {
      type: "Crowdfunding",
      name: "Clinique Futura / INSA ADN Concept Club",
      impacts: [
        "Ton investissement permet l'acquisition de 3 lits médicalisés.",
        "Tu aides à réduire le temps d'attente des patients de 7 %.",
      ],
    },
  ],
  defense: [
    {
      type: "ETF",
      name: "Global Defense & Cybersecurity",
      impacts: [
        "Ton investissement renforce la capacité de 27 entreprises de cybersécurité engagées dans la protection des infrastructures.",
        "Tu contribues à la défense numérique de plus de 500 millions de comptes utilisateurs.",
      ],
    },
    {
      type: "Action",
      name: "AeroSecure (aérospatial & sécurité)",
      impacts: [
        "Tu soutiens le développement de nouvelles technologies de surveillance spatiale.",
        "Tu participes à la protection de 6 pays européens contre les menaces aériennes.",
      ],
    },
    {
      type: "Private Equity",
      name: "Fonds spécialisé « CyberShield Capital »",
      impacts: [
        "Ton investissement finance 1 startup de cybersécurité 'early-stage' supplémentaire chaque année.",
        "Tu aides indirectement à prévenir plus de 200 000 cyberattaques/an.",
      ],
    },
  ],
  localite: [
    {
      type: "SCI",
      name: "Immo Bretagne Durable",
      impacts: [
        "Ton investissement soutient la rénovation énergétique de 18 m² de bâtiments dans ta région.",
        "Tu participes indirectement à la création de 0,1 emploi local dans la filière BTP.",
      ],
    },
    {
      type: "Crowdfunding",
      name: "Brasserie de la Côte",
      impacts: [
        "Ton financement a permis l'achat de 1 fermenteur supplémentaire.",
        "Tu contribues à 2 emplois locaux et au maintien de la production artisanale.",
      ],
    },
    {
      type: "Obligations",
      name: "Ville de Lyon — Transition",
      impacts: [
        "Tu participes au financement de 0,4 arbre planté dans les espaces publics.",
        "Ton investissement contribue à la rénovation de 1,2 m² d'école publique.",
      ],
    },
  ],
  "pays-dev": [
    {
      type: "Fonds",
      name: "Global Microfinance Emerging",
      impacts: [
        "Ton investissement finance en moyenne 1,3 microcrédit pour un entrepreneur d'Afrique de l'Ouest.",
        "Tu participes à soutenir 0,8 emploi féminin dans des zones rurales.",
      ],
    },
    {
      type: "Crowdfunding",
      name: "AgriGrowth Kenya",
      impacts: [
        "Tu permets à un agriculteur d'acquérir 15 kg de semences certifiées.",
        "Ton investissement augmente les revenus agricoles de 12 % en moyenne.",
      ],
    },
    {
      type: "Actions",
      name: "Entreprises émergentes",
      companies: [
        {
          name: "Aspen Pharmacare Holdings",
          metric: "tu as permis à X personnes d'accéder à X traitements",
        },
        {
          name: "IHS Towers",
          metric: "tu as permis de connecter X villages en Afrique",
        },
      ],
      impacts: [],
    },
  ],
  blockchain: [
    {
      type: "Token",
      name: "CarbonX (offset carbone)",
      impacts: [
        "Tu as compensé 42 kg de CO₂ via des projets certifiés.",
        "Tu contribues à la régénération de 0,3 m² de forêt tropicale.",
      ],
    },
    {
      type: "Crypto",
      name: "XRP",
      impacts: [
        "Facilite les paiements internationaux rapides et à faible coût.",
        "Ton investissement soutient l'infrastructure de transactions transfrontalières.",
      ],
    },
  ],
};
