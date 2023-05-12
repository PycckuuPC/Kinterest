# Kinterest

### Социальная сеть в мире кино. Приложение сайта, с возможностью поиска практически любых фильмов (использована API tmdb.com), создания кинобордов - "досок", в которые можно добавлять фильмы, описание и название, добавления популярных досок других пользователей в избранное.

![Demo Main](/readme-assets/k1.gif)

## Стек:

<img align="left" alt="JavaScript" width="32px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
<img align="left" alt="JavaScript" width="32px" src="https://user-images.githubusercontent.com/32282846/148977795-7849d063-c0ed-4196-aaa0-77d12f54319f.png" />
<img align="left" alt="Node.js" width="32px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<img align="left" alt="PostgreSQL" width="32px" src="https://img.icons8.com/color/50/000000/postgreesql.png"/>

<br/>
<br/>
<br/>

- Фронтенд: TS, React, Redux, TailwindCSS
- Бекенд: JS, Node.js, Express, PostgreSQL, Sequelize ORM

## Функционал

#### Форма авторизации/регистрации:

![Demo login](/readme-assets/k2.gif)

#### Добавление и удаление киноборда в избранное и понравившиеся

![Demo like](/readme-assets/k3.gif)

#### Просмотр киноборда с подробным описанием фильма в модальном окне по клику

![Demo info](/readme-assets/k4.gif)

#### "Бесконечный скролл" с динамической подгрузкой фильмов

![Demo scroll](/readme-assets/k5.gif)

#### "Живой поиск" с запросом к API введенного текста

![Demo search](/readme-assets/k6.gif)

#### Возможности

- [x] Регистрация и авторизация с использованием сессий
- [x] Создание коллекций из огромной базы фильмов
- [x] Добавление/Удаление киноборда в избранное и в понравившиеся
- [x] Поиск пользователей и их коллекций

### Установка:

Для запуска проекта в режиме разработки:

В директории 2 папки:

server/ Отвечает за back-end. Запуск в терминале командами:

- > cd server
- > npm i
- > npm start

client/ - front-end.

- > cd client
- > npm i
- > npm run dev
