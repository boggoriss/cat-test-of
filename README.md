# Cats-booking
##### Rest API для бронирования котиков!

![kitten_image](https://cdn.vox-cdn.com/thumbor/_Dlv8Ujxuuemz7fhinmUnjLv0n0=/0x272:4197x3420/920x613/filters:focal(0x272:4197x3420):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/43927916/kittens_with_books.0.0.jpg)

###### **_- Бог_ с нами, _Бог_ с усами -**

### *Что я могу?*

- Добовлять котиков в **базу данных**!
- Удалять котиков из **базы данных**!
- Редактировать котиков прямо в базе данных!
- Бронировать **_(а также снимать бронирование *С*)_** котиков!
- Добавлять котикам фотографии!
- Получать разноматсные списки котиков! *(забронированные, НЕ забронированные, пагинированный список котиков, ОДИН КОТИК)*

### *Как установаить?*
Для начало нужно скачать данный репозиторий, после чего использовать команды `npm install` (для установки всех нужных пакетов) и `npm run start`, для запуска в режиме **продакшна**.

### *Интерактивная документация*

Ниже представлены все **методы** и **URL**, но также есть интерактивная документация, реализованная с помощью **swagger**. Для того чтобы открыть ее используйте **URL**: `/api/docs`
### *URL и методы*

- ### *`/cats`*
    - Данный **URL** вызывает метод `paginateCats()`, который ничего не принимает, но возвращает ***отпагинированный*** список котов.
    <br/>Пример вывода:
     
     ```json
      [
        {
          "id": 1,
          "name_cat": "Kirill",
          "breed": "{тут объект породы кота}",
          "color": "gray",
          "price": 600,
          "age": 3,
          "image": "{объект фотки}",
          "is_booked": "true | false",
          "created_at": "2021-10-03 19:35:44.458634"
         }
      ]
     ```
- ### *`/cats/{id}`*
  - Данный **URL** вызывает метод `getCat()` возвращает одного **КОТИКА** с соответствующим ID. <br/>Пример вывода:
  ```json
    {
      "id": 1,
      "name_cat": "Kirill",
      "breed": "{тут объект породы кота}",
      "color": "gray",
      "price": 600,
      "age": 3,
      "image": "{объект фотки}",
      "is_booked": "true | false",
      "created_at": "2021-10-03 19:35:44.458634"
    }
    ```

- ### *`/cats/get/booked_cats`*
    - Данный **URL** вызывает метод `getAllBookedCats()`, который возвращает **КОТИКОВ**, которые забронированы. <br/>Пример вывода:
  ```json
    {
      "id": 1,
      "name_cat": "Kirill",
      "breed": "{тут объект породы кота}",
      "color": "gray",
      "price": 600,
      "age": 3,
      "image": "{объект фотки}",
      "is_booked": "true | false",
      "created_at": "2021-10-03 19:35:44.458634"
    }
    ```


- ### *`/cats/get/not_booked_cats`*
    - Данный **URL** вызывает метод `getAllNotBookedCats()`, который возвращает **КОТИКОВ**, которые **НЕ** забронированы. <br/>Пример вывода:
  ```json
    {
      "id": 1,
      "name_cat": "Kirill",
      "breed": "{тут объект породы кота}",
      "color": "gray",
      "price": 600,
      "age": 3,
      "image": "{объект фотки}",
      "is_booked": "true | false",
      "created_at": "2021-10-03 19:35:44.458634"
    }
    ```


- ### *`/cats/get/get_all_breeds`*
    - Данный **URL** вызывает метод `getAllBreeds()`, который возвращает все породы. <br/>Пример вывода:
  ```json
    [
      {
        "breed_id": 1,
        "name_breed": "Большой русский",
        "created_at": "2021-10-03 01:47:34.342986"
      }
    ]
    ```

- ### *`/cats/create_cat`*
  - Данный **URL** вызывает метод `createCat()`, который добавляет кота в **базу данных** и возвращает его сущность.
  
  Пример входных данных:
  ```json
    {
      "name": "Черч",
      "price": 666,
      "color": "Черный",
      "name_breed": "Френчи"
    }
    ```
  Пример вывода:
  ```json
    {
      "id": 1,
      "name_cat": "Kirill",
      "breed": "{тут объект породы кота}",
      "color": "gray",
      "price": 600,
      "age": 3,
      "image": "{объект фотки}",
      "is_booked": "true | false",
      "created_at": "2021-10-03 19:35:44.458634"
    }
    ```
- ### *`/cats/add_image/{id}`*
  - Данный **URL** вызывает метод `addImage()`, который добавляет выбранному коту фотографию. 
  
  Пример входных данных:
  ```json
    {
      "name": "Черч",
      "price": 666,
      "color": "Черный",
      "name_breed": "Френчи"
    }
    ```
  
  Пример вывода:
  ```json
  {
    "url": "https://cat-bucket-test-kust.s3.eu-central-1.amazonaws.com/30cbd9c7-d6ad-4dbf-8871-d5fcb4c00d0e-kitten.jpg",
    "key": "30cbd9c7-d6ad-4dbf-8871-d5fcb4c00d0e-kitten.jpg",
    "id": 5
  }
  ```

- ### *`/cats/create_breed`*
  - Данный **URL** вызывает метод `createBreed()`, который добавляет новую породу.

  Пример входных данных:
  ```json
    {
      "name_breed": "herzen"
    }
    ```

  Пример вывода:
  ```json
  {
    "name_breed": "herzen",
    "breed_id": 5,
    "created_at": "2021-10-03T18:42:56.752Z"
  }
  ```

- ### *`/cats/update_cat/{id}`*
  - Данный **URL** вызывает метод `updateCat()`, который обновляет поля, которые были переданы в запросе. ***!ВАЖНО!*** нельзя обновить породу кота на ту, которая еще не была создана!.

  Пример входных данных:
  ```json
    {
      "name": "Черч",
      "price": 666,
      "color": "Черный",
      "name_breed": "Френчи"
    }
    ```

  Пример вывода:
  ```json
  {
    "id": 1,
    "name_cat": "Kirill",
    "breed": "{тут объект породы кота}",
    "color": "gray",
    "price": 600,
    "age": 3,
    "image": "{объект фотки}",
    "is_booked": "true | false",
    "created_at": "2021-10-03 19:35:44.458634"
  }
  ```
- ### *`/cats/book_cat/{id}` и `/cats/unbook_cat/{id}`*
  - Данные **URL** вызывают, соответственно методы `bookCat()` и `unbookCat()`, которые бронируют кота и снимать с него бронь.
  
  Пример вывода:
  ```json
  {
    "id": 1,
    "name_cat": "Kirill",
    "breed": "{тут объект породы кота}",
    "color": "gray",
    "price": 600,
    "age": 3,
    "image": "{объект фотки}",
    "is_booked": "true | false",
    "created_at": "2021-10-03 19:35:44.458634"
  }
  ```

- ### */cats/delete_cat/{id}*
  - Данный **URL** вызывает метод `deleteCat()`, который **удаляет** котика по id.

  Пример вывода:
  ```json
  {
    "id": 1,
    "name_cat": "Kirill",
    "breed": "{тут объект породы кота}",
    "color": "gray",
    "price": 600,
    "age": 3,
    "image": "{объект фотки}",
    "is_booked": "true | false",
    "created_at": "2021-10-03 19:35:44.458634"
  }
  ```


## Creditsы
#### Для создания данного REST API был использован фреймворк Nest JS ([документация тут][1]), ОРМка TypeORM ([документация которой тут][2]). В качестве S3 совместимого хранилища был использован AWS S3.
![kitten_image](https://www.petmd.com/sites/default/files/styles/article_image/public/small-kitten-walking-towards_127900829_0.jpg?itok=ah_gTtbS)

###### *У меня аллергия на котов((((*

[1][https://docs.nestjs.com/]
[2][https://orkhan.gitbook.io/typeorm/docs]
