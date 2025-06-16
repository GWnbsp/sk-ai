import { Search, Calculator, Activity, CheckCircle, XCircle } from 'lucide-react';
import { ToolStatusMap } from '@/app/types';

/**
 * 工具状态指示器组件属性接口
 */
interface ToolStatusIndicatorProps {
    /** 工具执行状态 */
    status: string;
}

/**
 * 工具状态配置映射
 * 定义不同状态对应的图标、颜色和标签
 */
const statusConfig: ToolStatusMap = {
    searching: {
        icon: Search,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        label: '搜索中'
    },
    calculating: {
        icon: Calculator,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        label: '计算中'
    },
    processing: {
        icon: Activity,
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/10',
        label: '处理中'
    },
    completed: {
        icon: CheckCircle,
        color: 'text-green-400',
        bg: 'bg-green-400/10',
        label: '已完成'
    },
    error: {
        icon: XCircle,
        color: 'text-red-400',
        bg: 'bg-red-400/10',
        label: '错误'
    },
};

/**
 * 工具状态指示器组件
 * 用于显示工具执行的当前状态，包括图标和文字说明
 * 
 * @param props - 组件属性
 * @returns 工具状态指示器组件
 */
export function ToolStatusIndicator({ status }: ToolStatusIndicatorProps) {
    // 获取状态配置，如果状态不存在则使用默认的处理中状态
    const config = statusConfig[status as keyof ToolStatusMap] || statusConfig.processing;
    const Icon = config.icon;

    return (
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.bg} ${config.color}`}>
            <Icon className="w-3 h-3" />
            <span>{config.label}</span>
        </div>
    );
} 