import { motion } from 'motion/react';
import { Layers, Users, Star, Handshake } from 'lucide-react';

interface StatsProps {
  sellersCount: number;
}

export default function Stats({ sellersCount }: StatsProps) {
  const statsData = [
    {
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      value: "5,000+",
      label: "Contracts Fulfilled",
      color: "from-emerald-500/10 to-emerald-400/10"
    },
    {
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      value: sellersCount.toString(),
      label: "Premium Experts",
      color: "from-cyan-500/10 to-teal-500/10"
    },
    {
      icon: <Star className="w-5 h-5 text-amber-400" fill="currentColor" />,
      value: "4.9 / 5.0",
      label: "Average Score Matrix",
      color: "from-amber-500/10 to-orange-500/10"
    },
    {
      icon: <Handshake className="w-5 h-5 text-rose-400" />,
      value: "99.2%",
      label: "Retention Standard",
      color: "from-rose-500/10 to-pink-500/10"
    }
  ];

  return (
    <section className="bg-slate-950/60 border-y border-slate-900 py-12 backdrop-blur-md relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl group hover:bg-slate-900/30 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center mb-3 shadow`}>
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:scale-105 transition-transform duration-200">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-500 tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
