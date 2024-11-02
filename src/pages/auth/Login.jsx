import { useState } from 'react';
import { useAuth } from '../../api/AuthContext'; // Assure-toi du chemin correct pour ton contexte
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Réinitialise les erreurs

        try {
            await login({ email, password });
            navigate('/'); // Redirige vers la page d'accueil ou une autre page sécurisée après connexion
        } catch (error) {
            setError('Échec de la connexion. Vérifiez vos identifiants.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#007784]">Connexion</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:border-[#007784]"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:border-[#007784]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#007784] text-white py-2 px-4 rounded hover:bg-[#005f66] transition duration-200"
                    >
                        Se connecter
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Pas encore de compte? <a href="/register" className="text-[#007784] font-medium hover:underline">Inscrivez-vous</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
