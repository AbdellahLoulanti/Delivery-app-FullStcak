import { useState } from 'react';
import { useAuth } from '../../api/AuthContext'; // Ensure correct path for your context
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, fetchGestionnaireData } = useAuth(); // Retrieve method for fetching gestionnaire data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Error state for handling login errors
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const credentials = {
            email,
            password,
        };
    
        try {
            const user = await login(credentials); // Tentez de vous connecter
            
            // Vérifiez les informations de l'utilisateur
            if (!user || !user.role) {
                throw new Error('User role not found');
            }
            
            // Naviguez selon le rôle de l'utilisateur
            switch (user.role) {
                case 'CLIENT':
                    navigate('/');
                    window.location.reload();
                    break;
                case 'GESTIONNAIRE':
                    navigate('/espace-gestionnaire');
                    break;
                case 'ADMIN':
                    navigate('/admin-dashboard');
                    break;
                case 'LIVREUR':
                    navigate('/espace-livreur');
                    break;
                default:
                    throw new Error('Unknown role');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid email or password.'); // Mettre à jour le message d'erreur si nécessaire
        }
    };
    
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#007784]">Connexion</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
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
                    <p className="text-sm text-gray-600">
                        Pas encore de compte? <a href="/register" className="text-[#007784] font-medium hover:underline">Inscrivez-vous</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
