import React, { useState } from "react";
import api from "api/api";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await api.post("/register", {
                username: formData.username,
                password: formData.password,
                role: formData.role,
            });

            setSuccess(response.data.message);
            setFormData({ username: "", password: "", role: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка регистрации");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Регистрация</h2>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Имя пользователя
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Пароль
                    </label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="role"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Роль
                    </label>
                    <input
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        placeholder="Введите роль (например, admin)"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;