import { PlayerSymbol } from "../types";


interface CellProps {
    value: PlayerSymbol | null;
    onClick: () => void;
}

const Cell = ({ value, onClick }: CellProps) => {
    const getSymbolStyle = () => {
        switch (value) {
            case 'X': return 'text-red-500';
            case 'O': return 'text-blue-500';
            case '△': return 'text-green-500';
            default: return 'text-gray-400';
        }
    };

    return (
        <button
            className={`aspect-square border-2 border-gray-200 rounded-lg text-4xl font-bold 
        hover:bg-gray-50 transition-colors ${getSymbolStyle()}`}
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Cell;