const AccessDenied = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Доступ запрещен
                </h2>
                <p className="text-gray-600 mb-6">
                    У вас недостаточно прав для просмотра этой страницы.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                    Вернуться назад
                </button>
            </div>
        </div>
    );
};

export default AccessDenied;