# Mi2U: Анонимный Мессенджер в Стиле 2b2t

## Описание

Mi2U — это анонимный мессенджер, вдохновленный культовой игрой 2b2t. Это пространство для свободного общения без регистрации, идентификации или модерации. Чат работает в режиме реального времени через P2P (peer-to-peer), что делает его децентрализованным и устойчивым к цензуре.

Основные принципы Mi2U:

- **Анонимность**: Никаких аккаунтов, никнеймов или данных пользователей.
- **Децентрализация**: Сообщения передаются напрямую между участниками без центрального сервера.
- **Минимализм**: Простой интерфейс, похожий на текстовый чат Minecraft.
- **Свобода**: Полная свобода выражения без ограничений.

---

## Особенности

1. **Один глобальный чат**:

   - Все сообщения видны всем участникам.
   - Нет приватных комнат или личных сообщений.

2. **P2P-архитектура**:

   - Сообщения передаются напрямую между пользователями.
   - Отсутствие центрального сервера снижает риск блокировки или цензуры.

3. **Простота использования**:

   - Минималистичный дизайн, похожий на текстовый чат Minecraft.
   - Легко подключиться и начать общение.

4. **Реальное время**:

   - Сообщения доставляются мгновенно благодаря технологии WebSocket или P2P.

5. **Кроссплатформенность**:
   - Работает на всех устройствах: ПК, смартфоны, планшеты.

---

## Как использовать

### Для пользователей

1. **Запустите приложение**:

   - Скачайте Mi2U на свой телефон или откройте веб-версию.
   - Никакой регистрации не требуется.

2. **Начните общаться**:

   - Введите сообщение в поле ввода и нажмите "Отправить".
   - Ваше сообщение будет видно всем участникам чата.

3. **Используйте reply**:

   - Двойное нажатие на сообщение позволяет ответить на него.
   - Ответ будет отображаться с указанием исходного текста.

4. **Оставайтесь анонимным**:
   - Не используйте личную информацию в сообщениях.
   - Ваш IP-адрес скрыт благодаря P2P-соединению.

---

### Для разработчиков

#### Установка и запуск

1. **Клонируйте репозиторий**:

   ```bash
   git clone https://github.com/your-repo/mi2u.git
   cd mi2u
   ```

2. **Запустите бэкенд**:

   - Убедитесь, что у вас установлен Go.
   - Запустите сервер:
     ```bash
     go run server.go
     ```

3. **Запустите фронтенд**:

   - Убедитесь, что у вас установлен Node.js и npm.
   - Установите зависимости:
     ```bash
     npm install
     ```
   - Запустите приложение:
     ```bash
     npm start
     ```

4. **Настройте P2P**:
   - Если вы хотите использовать P2P вместо HTTP, интегрируйте библиотеку WebRTC или аналогичную технологию.

---

## Технологии

- **Frontend**: React Native (для мобильных устройств) или React.js (для веб-версии).
- **Backend**: Go (HTTP-сервер для тестирования) или WebRTC (для P2P).
- **База данных**: Не используется. Все сообщения передаются напрямую между пользователями.
- **Реальное время**: WebSocket или WebRTC.

---

## Правила

1. **Нет правил**:

   - Mi2U не имеет модерации или цензуры.
   - Пользователи сами решают, как им общаться.

2. **Помните о безопасности**:

   - Не делитесь личной информацией.
   - Будьте осторожны с ссылками и файлами.

3. **Уважайте других**:
   - Хотя правила отсутствуют, старайтесь сохранять базовое уважение к другим участникам.

---

## Лицензия

Mi2U распространяется под лицензией MIT. Вы можете свободно использовать, изменять и распространять код.

---

## Контакты

Если у вас есть вопросы или предложения, свяжитесь с нами:

- Email: your-email@example.com
- Discord: your-discord-server-link

---

## Признательность

Mi2U вдохновлен духом свободы и хаоса 2b2t. Мы благодарим сообщество за поддержку и идеи.

---

**Важно**: Mi2U — это экспериментальный проект. Используйте его на свой страх и риск.
