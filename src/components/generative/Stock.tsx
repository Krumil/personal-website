import { motion } from "motion/react";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

type StockProps = {
    price: number;
    symbol: string;
    change: string;
    marketCap: string;
};

export const Stock = ({ price, symbol, change, marketCap }: StockProps) => {
    const isPositive = change.startsWith("+");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-gradient-to-br from-card to-accent p-6 rounded-xl border border-border max-w-md"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-foreground">{symbol}</h3>
                        <p className="text-sm text-muted-foreground">Stock Price</p>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">${price.toFixed(2)}</div>
                    <div
                        className={`flex items-center gap-1 text-sm ${isPositive ? "text-secondary" : "text-destructive"}`}
                    >
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>{change}</span>
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-border">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Market Cap</span>
                    <span className="font-semibold">{marketCap}</span>
                </div>
            </div>
        </motion.div>
    );
};
