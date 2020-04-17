# Крестики-нолики в режиме реального времени для двух игроков

Идея проекта состоит в том, чтобы позволить двум игрокам в разных окнах браузера проводить игру в крестики-нолики 
в режиме реального времени.

Исход каждой игры будет сохранен для последующего вывода рейтинга игроков.

Каждый пользователь однозначно идентифицироуется по имени.

## Авторизация
Каждый пользователь будет обязан авторизоваться на сервере с минимальным набором полей, а именно:
1. Логин
2. Пароль

После получения положительного ответа сервера, данные будут сохранены в кеш, а выход из учетной записи
будет осуществлен по кнопке "logout". 

## Обращение к серверу
Потребуется два вида запросов: 
1) WebSocket
2) GET/POST

При ходе одного игрока, отправляется запрос на сервер с помощью WebSocket.
Сервер будет осуществлять некоторую валидацию хода,
Выявлять победителя или выдавать сообщение об ошибке.
Backend- является связующим звеном между игроками и только после проверки им сделанного хода одного игрока
будет отправлен ответ второму игроку, либо же оповещение соперников о результате матча.
 
Такой подход к общению игроков является наиболее удобным и эффективным, т.к это лишает нас необходимости
посылать get запросы с заданым интервалом.


Более простые данные вроде ключа авторизации или рейтинга игроков будут получены стандартным Get запросом.

## Клиент
Интерфейс будет разработам с помощью стека:
1) Typescript
2) ReactJs
3) Axios
...
Возможно дополнение необходимыми инструментами во время работы.

Весь интерфейс будет разделен на несколько страниц
1) Домашний экран с навигацией
2) Страница регистрации/авторизации
3) Страница вывода рейтинга игроков
4) Игровое поле

#### Предположительные сущности:
1) HttpService для работы и отправки http-запросов.
2) WebSocketService для подключения во время начала игры.
3) AuthorisationService для получения и обработки данных пользователя.
4) GameRequestService - для формировани и получения запросов о ходе игрока.
5) ScoreService - для формирвоания запросов получения рейтинга игроков.

6) AuthorisationForm для регистрации/логина пользователей.
7) GameScene - игровое поле.
8) ScoreDisplay - отображение рейтинга игроков.

9) Router - для смены страниц

## Сервер
Стек:
1) Python
2) MongoDb
...

Здесь будут логгирвоаться данные об исходах игр.
Сервер будет анализировать правильность хода, а также выявлять победителей после каждого шага одного из пользователей.

###Предположительные сущности
1) Сущность для установления соединения с БД.
2) CRUD для операция с БД (create, read, update, delete)
3) WebSocketServer - для развертывания сервера игры (для получения и отправки мета-данных игры).
4) UserService - для операции с пользвоателями.
5) AuthorisationService
6) StepAnalyseService - для валидации хода игрока.
7) ScoreService - для операций над ретингом игроков (занесение данных и т.д)
8) Router - для объявления эндпоинтов для обращения с клента. 
