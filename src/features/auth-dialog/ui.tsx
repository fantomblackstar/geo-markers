import { useState, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Lock, Eye, EyeOff } from "lucide-react";
import { verifyPassword } from "../../shared/lib/crypto";
import { useAuth } from "../../shared/model/auth-context";

export function AuthDialog() {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const storedHash = process.env.REACT_APP_PASSWORD_HASH;
      if (!storedHash) {
        setError("Додаток не налаштований правильно");
        setIsLoading(false);
        return;
      }

      const isValid = await verifyPassword(password, storedHash);

      if (isValid) {
        login();
      } else {
        setError("Неправильний пароль");
        setPassword("");
      }
    } catch (err) {
      setError("Виникла помилка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-md z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                Потрібна автентифікація
              </Dialog.Title>
              <Dialog.Description className="text-gray-600 text-center mt-2">
                Будь ласка, введіть пароль додатку для продовження
              </Dialog.Description>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Пароль
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-12"
                    placeholder="Введіть пароль"
                    autoFocus
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!password || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {isLoading ? "Перевірка..." : "Розблокувати"}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              Це додаток, захищений паролем
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
