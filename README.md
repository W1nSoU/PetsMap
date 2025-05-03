# PetShelterMap

**PetShelterMap** — це інтерактивна карта притулків для тварин. Проєкт допомагає швидко знаходити притулки на мапі, переглядати інформацію про них та контакти.

## Функціонал

- Відображення притулків для тварин на Google Maps
- Інтуїтивний інтерфейс для користувача
- Адаптивний дизайн

## Технології

- **HTML**
- **CSS**
- **JavaScript**
- **Google Maps API**

## Запуск проєкту

1. **Клонування репозиторію**

   ```sh
   git clone https://github.com/W1nSoU/petsheltermap.git
   cd petsheltermap
   ```

2. **Додайте ваш Google Maps API ключ:**

   - Знайдіть у проекті підключення скрипта Google Maps API у HTML, наприклад:
     ```html
     <script
       src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap"
       async
       defer
     ></script>
     ```
   - Замініть `YOUR_GOOGLE_MAPS_API_KEY` на свій особистий ключ.

3. **Запустіть локальний сервер (наприклад, через live-server):**
   - Якщо у вас встановлено live-server:
     ```sh
     live-server
     ```
   - Або відкрийте `index.html` у браузері (деякі функції можуть не працювати без сервера).

## Вимоги

- Сучасний браузер (Chrome, Firefox, Edge)
- Доступ до Інтернету (для Google Maps)
- Google Maps API ключ

## Автор

- Даніїл Душинський
- [GitHub: W1nSoU](https://github.com/W1nSoU)

---

Зворотній зв’язок, пропозиції та pull requests вітаються!
