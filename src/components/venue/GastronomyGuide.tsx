import React from 'react';

interface Dish {
  name: string;
  nativeName: string;
  badge: string;
  description: string;
  pairing: string;
}

const DISHES: Dish[] = [
  {
    name: 'Slavonski Kulen',
    nativeName: 'Slavonski domaći kulen (PDO)',
    badge: 'EU Protected Origin',
    description:
      'The crown jewel of Slavonian charcuterie: handcrafted dry-cured pork sausage flavored with sweet and spicy ground red paprika and crushed garlic, slowly cold-smoked over beechwood and naturally cellared for up to 9 months.',
    pairing: 'Fresh cottage cheese, pickled peppers, and crusty homemade sourdough bread.',
  },
  {
    name: 'Fiš Paprikaš',
    nativeName: 'Baranjski fiš paprikaš u kotliću',
    badge: 'Danube & Drava Heritage',
    description:
      'The quintessential freshwater feast: fresh river carp, catfish, and pike simmered vigorously in outdoor copper cauldrons over an open beechwood blaze with deep-red Baranja ground paprika and white wine, served steaming with handmade wide egg noodles.',
    pairing: 'Chilled dry Graševina and hot Baranja pickled cherry peppers.',
  },
  {
    name: 'Čobanac',
    nativeName: 'Slavonski čobanac u kotliću',
    badge: 'Pannonian Shepherd’s Stew',
    description:
      'Traditional Slavonian shepherd’s cauldron stew slow-cooked for over four hours combining at least three meats (beef, pork, and wild game) with caramelized onions, carrots, and sweet-piquant paprika into a rich, velvety gravy.',
    pairing: 'Homemade potato dumplings (*njoki*) and a glass of robust Frankovka or Pinot Noir.',
  },
  {
    name: 'Graševina',
    nativeName: 'Vrhunska slavonska Graševina',
    badge: 'Flagship White Wine of Croatia',
    description:
      'Slavonia and the Danube hills are the spiritual home of Graševina (Welschriesling). Golden-hued, crisply refreshing with mineral elegance, green apple, and white blossom notes, produced in centuries-old cellars in Kutjevo, Đakovo, and Baranja.',
    pairing: 'Pairs exquisitely with all spicy freshwater fish and Slavonian roasted meats.',
  },
];

export function GastronomyGuide() {
  return (
    <section aria-labelledby="gastronomy-heading" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 mb-2">
            Authentic Slavonian Table · Local Gastronomy
          </div>
          <h2
            id="gastronomy-heading"
            className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white"
          >
            Slavonian Gastronomy & Wine
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
          Rich, hearty, and intensely flavorful: Slavonian and Baranjan culinary traditions honor open-flame cooking, red paprika, and fertile Pannonian harvests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DISHES.map((dish) => (
          <div
            key={dish.name}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {dish.badge}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">
                {dish.name}
              </h3>
              <p className="text-xs font-mono text-slate-500 mb-3">
                {dish.nativeName}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {dish.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-slate-900 dark:text-white font-bold">Recommended Pairing: </span>
              <span>{dish.pairing}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
