import sqlite3

# Підключення до бази даних (створення файлу, якщо його не існує)
conn = sqlite3.connect('D:/PetsMap/PetsMap/database/animals.db')
cursor = conn.cursor()



# Додавання запису до таблиці
cursor.execute('''
INSERT INTO animals (name, description, image_path, city, volunteer)
VALUES (
    'Мурчик',
    'Мурчик пухнастий котик із яскравим рудим забарвленням та муркотливим характером. Йому 2 роки, він здоровий і готовий стати вашим найвірнішим другом.',
    'http://localhost:3000/images/find1.png',
    'Київ',
    'Олена К., волонтер'
)
''')

# Збереження змін і закриття з'єднання
conn.commit()
conn.close()