import sqlite3

# Підключення до бази даних (створення файлу, якщо його не існує)
conn = sqlite3.connect('D:/PetsMap/PetsMap/database/animals.db')
cursor = conn.cursor()

# Створення таблиці для запису даних про тварин
# cursor.execute('''
# CREATE TABLE IF NOT EXISTS animals (
#     id INTEGER PRIMARY KEY AUTOINCREMENT, -- Унікальний ідентифікатор
#     name TEXT NOT NULL, -- Ім'я тваринки
#     type TEXT NOT NULL, -- Тип тваринки (Собака, Кіт, Птах, Гризун, Інше)
#     reason TEXT NOT NULL, -- Причина здачі (Переїзд, Алергія, Фінансові труднощі, Знайдено на вулиці, Інше)
#     age INTEGER NOT NULL, -- Вік тваринки
#     gender TEXT NOT NULL, -- Стать (Хлопчик, Дівчинка)
#     breed TEXT NOT NULL, -- Порода
#     sterilization TEXT NOT NULL, -- Стерилізований (Так, Ні)
#     vaccination TEXT NOT NULL, -- Щеплення (Так, Ні, Не знаю)
#     microchip TEXT NOT NULL, -- Мікрочіп (Так, Ні)
#     vet_passport TEXT NOT NULL, -- Ветеринарний паспорт (Так, Ні)
#     image_path TEXT NOT NULL, -- Шлях до фотографії тваринки
#     description TEXT NOT NULL -- Інформація про тваринку
# )
# ''')

# Видалення всіх записів з таблиці
cursor.execute('DELETE FROM animals')

# За потреби — скидання лічильника AUTOINCREMENT
cursor.execute('DELETE FROM sqlite_sequence WHERE name="animals"')

# Підтвердження змін
conn.commit()

# Закриття з'єднання
conn.close()