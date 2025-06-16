import { CalculatorResult as CalculatorResultType } from '@/app/types';

/**
 * 计算器结果展示组件属性接口
 */
interface CalculatorResultProps {
    /** 计算结果数据 */
    result: CalculatorResultType;
}

/**
 * 计算器结果展示组件
 * 用于展示数学计算工具返回的计算结果
 * 
 * @param props - 组件属性
 * @returns 计算器结果展示组件
 */
export function CalculatorResult({ result }: CalculatorResultProps) {
    return (
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20">
            {/* 计算结果头部 */}
            <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🧮</span>
                <div>
                    <h3 className="font-semibold text-foreground">计算结果</h3>
                    <p className="text-sm text-muted-foreground">{result.timestamp}</p>
                </div>
            </div>

            {/* 计算表达式和结果展示 */}
            <div className="bg-black/20 rounded-lg p-3 font-mono">
                <div className="text-lg">
                    <span className="text-muted-foreground">{result.expression}</span>
                    <span className="text-primary mx-2">=</span>
                    <span className="text-green-400 font-bold">{result.result}</span>
                </div>
            </div>
        </div>
    );
} 