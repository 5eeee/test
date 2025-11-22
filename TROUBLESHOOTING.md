# Устранение неполадок для Studio <4:30/> Mini App

## Проблема: Отображается только надпись "test"

Если вы видите только надпись "test" вместо полноценного приложения, это может быть связано с несколькими причинами:

### 1. Проверьте исходный код приложения

Убедитесь, что в файле `/src/main.tsx` нет временного кода, выводящего "test". Правильный файл должен выглядеть примерно так:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 2. Проверьте файл App.tsx

Убедитесь, что компонент App.tsx содержит полноценное приложение, а не просто тестовый текст.

### 3. Настройки сборки

В файле `vite.config.ts` должны быть следующие настройки:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ВАЖНО: для GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
})
```

### 4. Очистка и пересборка

Если вы разрабатываете локально, выполните:

```bash
cd studio-mini-app
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 5. Проверка на GitHub Pages

После настройки GitHub Actions:

1. Проверьте логи Actions на наличие ошибок
2. Убедитесь, что файлы действительно генерируются в папке dist
3. Проверьте, что GitHub Pages настроен на использование GitHub Actions как источника

## Проблема: Приложение не загружается в Telegram

### 1. Проверьте HTTPS

GitHub Pages автоматически обеспечивает HTTPS, но убедитесь, что URL начинается с https://

### 2. Проверьте URL в BotFather

Используйте команду `/setwebapp` и убедитесь, что URL введен корректно:
- Не должно быть завершающей косой черты, если она не нужна
- URL должен указывать на корень приложения

### 3. Проверьте консоль браузера

Откройте инструменты разработчика (F12) и проверьте вкладку Console на наличие ошибок.

## Проблема: Ошибки при сборке

Если GitHub Actions завершается с ошибками:

1. Проверьте файлы конфигурации на синтаксические ошибки
2. Убедитесь, что все зависимости указаны корректно в package.json
3. Проверьте, что версии Node.js совместимы

## Контрольный список для запуска

- [ ] Файл `vite.config.ts` содержит `base: './'`
- [ ] GitHub Actions workflow настроен корректно
- [ ] В `index.html` нет тестового контента
- [ ] Компонент App.tsx содержит полноценное приложение
- [ ] GitHub Pages настроен на использование GitHub Actions
- [ ] URL в BotFather указан правильно