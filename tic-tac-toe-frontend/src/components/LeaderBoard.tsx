interface LeaderboardProps {
    data: Array<{
        id: number;
        winner: string;
        players: string[];
        createdAt: string;
    }>;
}

const Leaderboard = ({ data }: LeaderboardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="pb-2">Winner</th>
                            <th className="pb-2">Players</th>
                            <th className="pb-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((game) => (
                            <tr key={game.id} className="border-b">
                                <td className="py-2">{game.winner}</td>
                                <td className="py-2">{game.players.join(', ')}</td>
                                <td className="py-2">
                                    {new Date(game.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;