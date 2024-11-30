import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "api/api";

const LoginForm = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Хук для навигации

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/login", formData);
            localStorage.setItem("usererp", JSON.stringify(response.data.roles));
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Ошибка входа");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full transform transition duration-500">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                    Добро пожаловать!
                </h2>
                {error && (
                    <p className="text-center text-red-600 text-sm font-semibold mb-4">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label
                            htmlFor="username"
                            className="text-sm text-gray-600 font-medium mb-1 block"
                        >
                            Имя пользователя
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Введите имя пользователя"
                            required
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="text-sm text-gray-600 font-medium mb-1 block"
                        >
                            Пароль
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Введите пароль"
                            required
                            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 font-bold text-white rounded-lg transition duration-300 ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-500 hover:bg-indigo-600"
                            }`}
                    >
                        {loading ? "Вход..." : "Войти"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;