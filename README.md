## Avito Frontend Trainee Assignment
Проект развернут при помощи Vite. Используется React, React Router v6, Redux Toolkit, RTK Query, Material UI. 

Для лучшей оптимизации фильтрация выполнена при помощи отдельных запросов, раз была такая возможность. Но мне не хотелось хардкодить лишь несколько проверенных значений для фильтров, поэтому решил собирать все возможные значения из ответа API. И так как там приходят только заголовки, зачастую не подходящие для параметров запроса, то в некоторых местах встречаются костыли для фильтрации. В результате фильтры собираются с бэка, но некоторые жанровые так и не получилось приспособить (например MMOARPG). Зато можно проверить, что ошибки обрабатываются корректно :) 

Для запуска необходимо:
1. Установить последнюю версию Node
2. Из корневой папки репозитория выполнить команду `npm install` для установки зависимостей
3. Запустить локальный сервер командой `npm run dev`
4. Переайти по адресу `http://localhost:3001/`
