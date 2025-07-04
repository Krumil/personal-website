import { motion } from "motion/react";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

type StockProps = {
  price: number;
  symbol: string;
  change: string;
  marketCap: string;
};

export const Stock = ({ price, symbol, change, marketCap }: StockProps) => {
  const isPositive = change.startsWith('+');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 p-6 rounded-xl border border-green-200 dark:border-green-700 max-w-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-900 dark:text-green-100">{symbol}</h3>
            <p className="text-sm text-green-600 dark:text-green-300">Stock Price</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            ${price.toFixed(2)}
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-green-600' : 'text-red-500'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{change}</span>
          </div>
        </div>
      </div>
      
      <div className="pt-3 border-t border-green-200 dark:border-green-700">
        <div className="flex justify-between text-sm text-green-700 dark:text-green-200">
          <span>Market Cap</span>
          <span className="font-semibold">{marketCap}</span>
        </div>
      </div>
    </motion.div>
  );
};