import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlayerSymbol } from '../types';
import Cell from './Cell';
import Leaderboard from './LeaderBoard';

// Add symbol to index mapping
const symbolToIndex: Record<PlayerSymbol, number> = {
    'X': 0,
    'O': 1,
    '△': 2
};

const GameBoard = () => {
    const [board, setBoard] = useState<(PlayerSymbol | null)[][]>(
        Array(5).fill(null).map(() => Array(5).fill(null))
    );
    const [currentPlayer, setCurrentPlayer] = useState<PlayerSymbol>('X');
    const [winner, setWinner] = useState<PlayerSymbol | 'draw' | null>(null);
    const [players] = useState<string[]>(['Player1', 'Player2', 'Player3']);
    const [leaderboard, setLeaderboard] = useState<Array<{ id: number; winner: string; players: string[]; createdAt: string }>>([]);

    // Get current player index using the mapping
    const currentPlayerIndex = symbolToIndex[currentPlayer];

    const checkWinner = (board: (PlayerSymbol | null)[][], row: number, col: number, symbol: PlayerSymbol): boolean => {
        // Check horizontal (row)
        if (board[row].every(cell => cell === symbol)) return true;

        // Check vertical (column)
        if (board.every(row => row[col] === symbol)) return true;

        // Check main diagonal (top-left to bottom-right)
        if (row === col) {
            if (board.every((_, i) => board[i][i] === symbol)) return true;
        }

        // Check anti-diagonal (top-right to bottom-left)
        if (row + col === 4) {
            if (board.every((_, i) => board[i][4 - i] === symbol)) return true;
        }

        return false;
    };
    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard`);
            setLeaderboard(response.data);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        }
    };

    const handleCellClick = async (row: number, col: number) => {
        if (board[row][col] || winner) return;

        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = currentPlayer;

        // Check for winner using the updated board
        const isWinner = checkWinner(newBoard, row, col, currentPlayer);

        setBoard(newBoard);

        if (isWinner) {
            setWinner(currentPlayer);
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/games`, {
                    winner: players[symbolToIndex[currentPlayer]],
                    players
                });
                fetchLeaderboard();
            } catch (error) {
                console.error('Error saving game:', error);
            }
            return; // Stop here if there's a winner
        }

        // Check for draw only if no winner
        if (newBoard.flat().every(cell => cell !== null)) {
            // Handle draw scenario
            setWinner('draw');
            return;
        }

        // Continue to next player
        setCurrentPlayer(prev => {
            const currentIndex = symbolToIndex[prev];
            const nextIndex = (currentIndex + 1) % 3;
            return ['X', 'O', '△'][nextIndex] as PlayerSymbol;
        });
    };

    // Add reset game function
    const resetGame = () => {
        setBoard(Array(5).fill(null).map(() => Array(5).fill(null)));
        setCurrentPlayer('X');
        setWinner(null);
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">5x5 Tic Tac Toe</h1>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-5 gap-2 mb-4">
                        {board.map((row, rowIndex) => (
                            row.map((cell, colIndex) => (
                                <Cell
                                    key={`${rowIndex}-${colIndex}`}
                                    value={cell}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                />
                            ))
                        ))}
                    </div>

                    <div className="text-center">
                        {winner === 'draw' ? (
                            <p className="text-xl font-bold text-yellow-600">Game Draw!</p>
                        ) : winner ? (
                            <p className="text-xl font-bold text-green-600">
                                Winner: {players[symbolToIndex[winner]]} ({winner})
                            </p>
                        ) : (
                            <p className="text-xl font-bold text-gray-700">
                                Current Player: {players[currentPlayerIndex]} ({currentPlayer})
                            </p>
                        )}
                    </div>
                    <div className="text-center mt-4">
                        <button
                            onClick={resetGame}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Reset Game
                        </button>
                    </div>
                </div>

                <Leaderboard data={leaderboard} />
            </div>
        </div>
    );
};

export default GameBoard;