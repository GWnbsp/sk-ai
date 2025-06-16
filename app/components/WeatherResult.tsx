import { MapPin, Thermometer, Droplets, Wind } from 'lucide-react';
import { WeatherResult as WeatherResultType } from '@/app/types';
import { getWeatherIcon } from '@/app/utils';

/**
 * 天气结果展示组件属性接口
 */
interface WeatherResultProps {
    /** 天气结果数据 */
    result: WeatherResultType;
}

/**
 * 天气结果展示组件
 * 用于展示天气查询工具返回的天气信息
 * 
 * @param props - 组件属性
 * @returns 天气结果展示组件
 */
export function WeatherResult({ result }: WeatherResultProps) {
    return (
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
            {/* 天气信息头部 */}
            <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{getWeatherIcon(result.condition)}</span>
                <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {result.location}
                    </h3>
                    <p className="text-sm text-muted-foreground">{result.timestamp}</p>
                </div>
            </div>

            {/* 天气详细信息网格 */}
            <div className="grid grid-cols-2 gap-3">
                {/* 温度信息 */}
                <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">
                        <span className="font-medium">{result.temperature}°C</span>
                        <span className="text-muted-foreground ml-1">{result.condition}</span>
                    </span>
                </div>

                {/* 湿度信息 */}
                <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">
                        <span className="font-medium">{result.humidity}%</span>
                        <span className="text-muted-foreground ml-1">湿度</span>
                    </span>
                </div>

                {/* 风速信息 */}
                <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                        <span className="font-medium">{result.windSpeed} km/h</span>
                        <span className="text-muted-foreground ml-1">风速</span>
                    </span>
                </div>
            </div>
        </div>
    );
} 