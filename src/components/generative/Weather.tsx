import { motion } from "motion/react";
import { Cloud, Sun, Wind, Droplet } from "lucide-react";

type WeatherProps = {
    temperature: number;
    weather: string;
    location: string;
    humidity: number;
    windSpeed: number;
    description: string;
};

export const Weather = ({ temperature, weather, location, humidity, windSpeed, description }: WeatherProps) => {
    const getWeatherIcon = () => {
        switch (weather.toLowerCase()) {
            case "sunny":
                return <Sun className="w-8 h-8 text-secondary" />;
            case "cloudy":
                return <Cloud className="w-8 h-8 text-muted-foreground" />;
            default:
                return <Sun className="w-8 h-8 text-secondary" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-gradient-to-br from-card to-accent p-6 rounded-xl border border-border max-w-md"
        >
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">{location}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {getWeatherIcon()}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{temperature}°C</div>
                    <div className="text-sm text-muted-foreground capitalize">{weather}</div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Droplet className="w-4 h-4" />
                        <span>{humidity}% Humidity</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Wind className="w-4 h-4" />
                        <span>{windSpeed} km/h Wind</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
