# React + Redux + TypeScript + Vite
Добрый день!

Реализовал описанный в ТЗ функционал.

Запуск:
- скачать\склонировать
- npm i
- npm run dev

БД создается, если localStorage пустой (первая инициализация), далее, если пользователь
поставит хотя бы один выбор цвета, localStorage сохранит БД в виде JSON с изменениями, 
и при следующей инициализации приложения загрузит и распарсит JSON данные. 
База данных сделана на 15 месяцев с января 2023 по март 2024, чтобы было куда покликать,
и чтобы приложение не сломалось, если проверяться задание будет в марте 2024.

Тестирование проводил вручную. Использую ReduxDevTools-расширение в хроме, чтобы отслеживать состояния, 
как диспатчатся те или иные состояния. В т.ч. открываю с телефона и других браузеров.
Очень редко, но использую console.log чтобы отловить глупые ошибки.

Посмотреть загруженный на домен проект можно по ссылке справа в описании проекта.

Спасибо, было очень интересно!