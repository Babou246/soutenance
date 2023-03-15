import psycopg2
from faker import Faker
from datetime import datetime
import random as rn

f = Faker('Fr')
# Connecter à la base de données PostgresQl
conn = psycopg2.connect(
    host="localhost",
    database="new",
    user="postgres",
    password="passer"
)

try:
    # Créer un curseur pour exécuter des requêtes
    cur = conn.cursor()
    try:
        # Création de la table "customers"
        sql1 = "CREATE TABLE IF NOT EXISTS customers (id_customers SERIAL PRIMARY KEY, nom VARCHAR(200), pays VARCHAR(160),sexe VARCHAR(3),quantite INT, benefice FLOAT, produit VARCHAR(200), prix_unitaire FLOAT,date date)"
        cur.execute(sql1)
        print("ok la table est créee")
    except Exception as e:
        print("==================>",e)
    #conn.commit()
except Exception as e:
    print(e)
print("Chargement des données en continue .......")


# Charger les données en continue .............
while True:
    def customers(n):
        start_date = datetime.strptime('02-02-2021', '%d-%m-%Y').date()
        end_date = datetime.strptime('02-02-2022', '%d-%m-%Y').date()

        producer = ["Tomate","Sel","Arachide","Oigno"]
        sexe = ["M","F"]

        data=[]
        for i in range(n):
            d = {
                'nom':f.name(),
                'pays':f.country(),
                'sexe':rn.choices(sexe)[0],
                'quantite':f.random.randrange(50),
                'benefice':f.random.randrange(1090),
                'produit':rn.choices(producer)[0],
                'prix_unitaire':f.random.randrange(120),
                'date':f.date_between(start_date=start_date, end_date=end_date)
            }
            data.append(d)
        sql = "INSERT INTO customers (nom,pays,sexe,quantite,benefice,produit,prix_unitaire,date) VALUES (%s, %s,%s,%s, %s, %s,%s,%s)"
        for i in range(len(data)):
            val = (data[i].get('nom'), data[i].get('pays'),data[i].get('sexe'),data[i].get('quantite'), data[i].get('benefice'), data[i].get('produit'), data[i].get('prix_unitaire'),data[i].get('date'))
            cur.execute(sql, val)
            conn.commit()
    customers(2000)
    